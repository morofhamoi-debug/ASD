"""MOROF BOT MANAGER — полностью рабочий.

Все разделы реально работают:
  • Подключение и управление несколькими ботами
  • Редактор /start (текст, фото, inline-кнопки)
  • Публикация команд через setMyCommands
  • Рассылки с прогрессом
  • Статистика пользователей и запусков
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from typing import Any

import httpx
from aiogram import BaseMiddleware, Bot, Dispatcher, F, Router
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.exceptions import TelegramAPIError, TelegramForbiddenError
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import (
    BotCommand,
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
    TelegramObject,
    User as TgUser,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder
from cryptography.fernet import Fernet, InvalidToken
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    delete,
    func,
    select,
)
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

log = logging.getLogger("morof")

# ───────────────────────── СЕКРЕТЫ ─────────────────────────

try:
    import secrets as _secrets
    for _k in ("MAIN_BOT_TOKEN", "OWNER_IDS", "DATABASE_URL", "FERNET_KEY"):
        _v = getattr(_secrets, _k, None)
        if _v and not os.environ.get(_k):
            os.environ[_k] = str(_v)
except ImportError:
    pass


def _fernet_key() -> str:
    k = os.environ.get("FERNET_KEY")
    if k:
        return k
    f = Path(".fernet_key")
    if f.exists():
        return f.read_text().strip()
    new = Fernet.generate_key().decode()
    f.write_text(new)
    log.warning("FERNET_KEY сгенерирован и сохранён в .fernet_key")
    return new


# ───────────────────────── КОНФИГ ─────────────────────────

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    main_bot_token: str
    owner_ids: str = ""
    database_url: str
    fernet_key: str = ""

    @property
    def owners(self) -> set[int]:
        return {int(x) for x in self.owner_ids.split(",") if x.strip()}


settings = Settings()
if not settings.fernet_key:
    settings.fernet_key = _fernet_key()
_fernet = Fernet(settings.fernet_key.encode())


def enc(t: str) -> str:
    return _fernet.encrypt(t.encode()).decode()


def dec(c: str) -> str:
    try:
        return _fernet.decrypt(c.encode()).decode()
    except InvalidToken as e:
        raise RuntimeError("Ошибка расшифровки токена") from e


# ───────────────────── HEALTH-СЕРВЕР ─────────────────────

class _HH(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"MOROF BOT MANAGER works")

    def log_message(self, *a):
        pass


def _health() -> None:
    port = int(os.environ.get("PORT", 8080))
    try:
        HTTPServer(("0.0.0.0", port), _HH).serve_forever()
    except OSError as e:
        log.error("Health-сервер не поднялся: %s", e)


# ───────────────────────── БД ─────────────────────────

class Base(DeclarativeBase):
    pass


engine = create_async_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


def _now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str | None] = mapped_column(String(64), nullable=True)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)


class ManagedBot(Base):
    __tablename__ = "managed_bots"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    telegram_bot_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    username: Mapped[str] = mapped_column(String(64))
    title: Mapped[str] = mapped_column(String(255))
    token_encrypted: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)


class BotConfig(Base):
    __tablename__ = "bot_configs"
    bot_id: Mapped[int] = mapped_column(
        ForeignKey("managed_bots.id", ondelete="CASCADE"), primary_key=True
    )
    start_text: Mapped[str] = mapped_column(
        Text, default="👋 Привет! Я — бот.\nНастрой моё приветствие в панели."
    )
    start_photo: Mapped[str | None] = mapped_column(String(255), nullable=True)
    # JSON: [[{"text": "...", "type": "url|cb", "value": "..."}], ...]
    start_buttons: Mapped[str] = mapped_column(Text, default="[]")


class BotUser(Base):
    __tablename__ = "bot_users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    bot_id: Mapped[int] = mapped_column(
        ForeignKey("managed_bots.id", ondelete="CASCADE"), index=True
    )
    tg_user_id: Mapped[int] = mapped_column(BigInteger, index=True)
    username: Mapped[str | None] = mapped_column(String(64), nullable=True)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    launches: Mapped[int] = mapped_column(Integer, default=1)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    last_seen: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    is_blocked: Mapped[bool] = mapped_column(Boolean, default=False)
    __table_args__ = (Index("ix_bu_bot_user", "bot_id", "tg_user_id", unique=True),)


class BotCommandRow(Base):
    __tablename__ = "bot_commands"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    bot_id: Mapped[int] = mapped_column(
        ForeignKey("managed_bots.id", ondelete="CASCADE"), index=True
    )
    command: Mapped[str] = mapped_column(String(32))
    description: Mapped[str] = mapped_column(String(255))
    __table_args__ = (Index("ix_bc_bot_cmd", "bot_id", "command", unique=True),)


# ───────────────────── ПРОВЕРКА ТОКЕНА ─────────────────────

async def validate_token(token: str) -> dict | None:
    try:
        async with httpx.AsyncClient(timeout=10.0) as c:
            r = await c.get(f"https://api.telegram.org/bot{token}/getMe")
        d = r.json()
    except (httpx.HTTPError, ValueError):
        return None
    return d.get("result") if d.get("ok") else None


# ────────────── КЛАВИАТУРА ПОЛЬЗОВАТЕЛЯ ──────────────

def build_user_kb(buttons_json: str) -> InlineKeyboardMarkup | None:
    try:
        rows = json.loads(buttons_json or "[]")
    except (json.JSONDecodeError, TypeError):
        return None
    if not rows:
        return None
    b = InlineKeyboardBuilder()
    for i, row in enumerate(rows):
        btns = []
        for j, btn in enumerate(row):
            t = btn.get("text", "…")
            typ = btn.get("type", "cb")
            val = btn.get("value", "")
            if typ == "url" and val:
                btns.append(InlineKeyboardButton(text=t, url=val))
            else:
                btns.append(InlineKeyboardButton(text=t, callback_data=f"u:{i}:{j}"))
        if btns:
            b.row(*btns)
    return b.as_markup()


# ──────────────── RUNTIME ПОДКЛЮЧЁННОГО БОТА ────────────────

class Runtime:
    def __init__(self, bot_id: int, token: str) -> None:
        self.bot_id = bot_id
        self.bot = Bot(token=token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
        self.dp = Dispatcher()
        self.task: asyncio.Task | None = None
        self.dp.message(CommandStart())(self._on_start)
        self.dp.callback_query(F.data.startswith("u:"))(self._on_user_cb)

    async def _cfg(self) -> tuple[BotConfig, list]:
        async with SessionLocal() as s:
            c = await s.get(BotConfig, self.bot_id)
            if not c:
                c = BotConfig(bot_id=self.bot_id)
                s.add(c)
                await s.commit()
                await s.refresh(c)
            try:
                rows = json.loads(c.start_buttons or "[]")
            except json.JSONDecodeError:
                rows = []
            return c, rows

    async def _on_start(self, message: Message) -> None:
        cfg, _ = await self._cfg()
        # учёт пользователя
        async with SessionLocal() as s:
            u = (await s.execute(select(BotUser).where(
                BotUser.bot_id == self.bot_id,
                BotUser.tg_user_id == message.from_user.id,
            ))).scalar_one_or_none()
            if u:
                u.launches += 1
                u.last_seen = _now()
                u.username = message.from_user.username
                u.full_name = message.from_user.full_name
                u.is_blocked = False
            else:
                s.add(BotUser(
                    bot_id=self.bot_id,
                    tg_user_id=message.from_user.id,
                    username=message.from_user.username,
                    full_name=message.from_user.full_name,
                ))
            await s.commit()

        kb = build_user_kb(cfg.start_buttons)
        try:
            if cfg.start_photo:
                await message.answer_photo(
                    cfg.start_photo, caption=cfg.start_text, reply_markup=kb
                )
            else:
                await message.answer(cfg.start_text, reply_markup=kb)
        except TelegramAPIError:
            await message.answer(cfg.start_text or "…", reply_markup=kb)

    async def _on_user_cb(self, cb: CallbackQuery) -> None:
        # Нажатие на пользовательскую кнопку приветствия.
        # Кнопка-действие пока просто подтверждается. Пользователь может
        # назначить URL-кнопки для реальных переходов.
        await cb.answer("✅ Кнопка нажата", show_alert=False)

    async def start(self) -> None:
        self.task = asyncio.create_task(
            self.dp.start_polling(self.bot, handle_signals=False),
            name=f"managed-{self.bot_id}",
        )

    async def stop(self) -> None:
        if self.task:
            self.task.cancel()
            try:
                await self.task
            except asyncio.CancelledError:
                pass
            self.task = None
        await self.bot.session.close()


class BotManager:
    def __init__(self) -> None:
        self.runs: dict[int, Runtime] = {}

    def get(self, bot_id: int) -> Runtime | None:
        return self.runs.get(bot_id)

    async def start(self, bot_id: int, token: str) -> None:
        if bot_id in self.runs:
            return
        rt = Runtime(bot_id, token)
        try:
            await rt.start()
        except Exception:
            log.exception("Не стартанул бот id=%s", bot_id)
            await rt.stop()
            raise
        self.runs[bot_id] = rt

    async def stop(self, bot_id: int) -> None:
        rt = self.runs.pop(bot_id, None)
        if rt:
            await rt.stop()

    async def stop_all(self) -> None:
        for bid in list(self.runs):
            await self.stop(bid)

    async def restart(self, bot_id: int, token: str) -> None:
        await self.stop(bot_id)
        await self.start(bot_id, token)

    async def restore(self, session: AsyncSession) -> None:
        rows = await session.execute(
            select(ManagedBot).where(ManagedBot.status == "active")
        )
        for b in rows.scalars():
            try:
                await self.start(b.id, dec(b.token_encrypted))
            except Exception:
                log.exception("Не восстановился бот id=%s", b.id)


manager = BotManager()


# ───────────────────────── MIDDLEWARE ─────────────────────────

DENY = "⛔️ <b>Доступ запрещён</b>\n\nТы не владелец панели MOROF BOT MANAGER."


class DbMw(BaseMiddleware):
    async def __call__(self, handler, event: TelegramObject, data: dict[str, Any]) -> Any:
        async with SessionLocal() as s:
            data["session"] = s
            return await handler(event, data)


class AccessMw(BaseMiddleware):
    async def __call__(self, handler, event: TelegramObject, data: dict[str, Any]) -> Any:
        tg: TgUser | None = data.get("event_from_user")
        s: AsyncSession | None = data.get("session")
        if tg is None or s is None:
            return await handler(event, data)
        u = await s.get(User, tg.id)
        if u is None:
            u = User(id=tg.id, username=tg.username, full_name=tg.full_name,
                     is_admin=tg.id in settings.owners)
            s.add(u)
        else:
            u.username = tg.username
            u.full_name = tg.full_name
            if tg.id in settings.owners:
                u.is_admin = True
        await s.commit()
        if not u.is_admin:
            if isinstance(event, Message):
                await event.answer(DENY)
            elif isinstance(event, CallbackQuery):
                await event.answer("⛔️ Доступ запрещён", show_alert=True)
            return None
        data["db_user"] = u
        return await handler(event, data)


# ───────────────────── КЛАВИАТУРЫ ПАНЕЛИ ─────────────────────

def kb_main() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(
        InlineKeyboardButton(text="🤖 Мои боты", callback_data="menu:my_bots"),
        InlineKeyboardButton(text="➕ Подключить бота", callback_data="menu:add_bot"),
    )
    b.row(
        InlineKeyboardButton(text="⚙️ Управление ботами", callback_data="menu:manage"),
        InlineKeyboardButton(text="📊 Статистика", callback_data="menu:stats"),
    )
    b.row(
        InlineKeyboardButton(text="🖼 Оформление", callback_data="menu:style"),
        InlineKeyboardButton(text="📣 Рассылки", callback_data="menu:broadcast"),
    )
    b.row(
        InlineKeyboardButton(text="📝 Сообщения", callback_data="menu:messages"),
        InlineKeyboardButton(text="❓ Помощь", callback_data="menu:help"),
    )
    b.row(InlineKeyboardButton(text="👤 Профиль", callback_data="menu:profile"))
    return b.as_markup()


def kb_bots(bots: list[ManagedBot], prefix: str = "bot:open") -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    for x in bots:
        b.row(InlineKeyboardButton(
            text=f"🤖 {x.title} | @{x.username}",
            callback_data=f"{prefix}:{x.id}",
        ))
    b.row(InlineKeyboardButton(text="➕ Подключить нового бота", callback_data="menu:add_bot"))
    b.row(InlineKeyboardButton(text="🔄 Обновить список", callback_data="menu:my_bots"))
    b.row(InlineKeyboardButton(text="🏠 Главное меню", callback_data="menu:main"))
    return b.as_markup()


def kb_empty() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="➕ Подключить бота", callback_data="menu:add_bot"))
    b.row(InlineKeyboardButton(text="🏠 Главное меню", callback_data="menu:main"))
    return b.as_markup()


def kb_panel(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="⚙️ Настройки", callback_data=f"bot:set:{bot_id}"))
    b.row(InlineKeyboardButton(text="📝 Стартовое сообщение", callback_data=f"bot:start:{bot_id}"))
    b.row(InlineKeyboardButton(text="🖼 Фото и медиа", callback_data=f"bot:media:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔘 Inline-кнопки", callback_data=f"bot:buttons:{bot_id}"))
    b.row(InlineKeyboardButton(text="📋 Команды", callback_data=f"bot:cmds:{bot_id}"))
    b.row(InlineKeyboardButton(text="📣 Рассылки", callback_data=f"bot:bcast:{bot_id}"))
    b.row(InlineKeyboardButton(text="📊 Статистика", callback_data=f"bot:stats:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔐 Токен и безопасность", callback_data=f"bot:token:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔄 Проверить подключение", callback_data=f"bot:check:{bot_id}"))
    b.row(InlineKeyboardButton(text="🗑 Удалить бота", callback_data=f"bot:del:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад к списку", callback_data="menu:my_bots"))
    return b.as_markup()


def kb_token(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="👁 Показать токен", callback_data=f"tok:show:{bot_id}"))
    b.row(InlineKeyboardButton(text="📋 Скопировать токен", callback_data=f"tok:copy:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔄 Инструкция по смене", callback_data=f"tok:rotate:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_token_confirm(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="✅ Да, показать", callback_data=f"tok:show_ok:{bot_id}"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:token:{bot_id}"))
    return b.as_markup()


def kb_del_confirm(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="🗑 Да, удалить из панели", callback_data=f"bot:del_ok:{bot_id}"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_newbot_intro() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="📖 Как получить токен", callback_data="newbot:help"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data="newbot:cancel"))
    return b.as_markup()


def kb_newbot_confirm() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="✅ Подключить", callback_data="newbot:ok"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data="newbot:cancel"))
    return b.as_markup()


def kb_newbot_success() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="🤖 Мои боты", callback_data="menu:my_bots"))
    b.row(InlineKeyboardButton(text="➕ Подключить ещё", callback_data="menu:add_bot"))
    b.row(InlineKeyboardButton(text="🏠 Главное меню", callback_data="menu:main"))
    return b.as_markup()


def kb_settings(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="▶️ Запустить бота", callback_data=f"bot:run:{bot_id}"))
    b.row(InlineKeyboardButton(text="⏸ Остановить бота", callback_data=f"bot:halt:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_start_edit(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="✏️ Изменить текст", callback_data=f"st:text:{bot_id}"))
    b.row(InlineKeyboardButton(text="🖼 Изменить фото", callback_data=f"st:photo:{bot_id}"))
    b.row(InlineKeyboardButton(text="🗑 Убрать фото", callback_data=f"st:nophoto:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔘 Кнопки", callback_data=f"bot:buttons:{bot_id}"))
    b.row(InlineKeyboardButton(text="👁 Предпросмотр", callback_data=f"st:preview:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_buttons_list(bot_id: int, buttons: list) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    i = 0
    for row in buttons:
        for btn in row:
            b.row(InlineKeyboardButton(
                text=f"🗑 {btn.get('text','…')[:32]}",
                callback_data=f"btn:rm:{bot_id}:{i}",
            ))
            i += 1
    b.row(InlineKeyboardButton(text="➕ Добавить кнопку", callback_data=f"btn:add:{bot_id}"))
    b.row(InlineKeyboardButton(text="🧹 Очистить всё", callback_data=f"btn:clear:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:start:{bot_id}"))
    return b.as_markup()


def kb_btn_type(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="🔗 URL-кнопка", callback_data=f"btn:type:url:{bot_id}"))
    b.row(InlineKeyboardButton(text="⚡ Callback-кнопка", callback_data=f"btn:type:cb:{bot_id}"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:buttons:{bot_id}"))
    return b.as_markup()


def kb_cmds(bot_id: int, rows: list) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    for c in rows:
        b.row(InlineKeyboardButton(
            text=f"🗑 /{c.command}",
            callback_data=f"cmd:rm:{bot_id}:{c.id}",
        ))
    b.row(InlineKeyboardButton(text="➕ Добавить команду", callback_data=f"cmd:add:{bot_id}"))
    b.row(InlineKeyboardButton(text="📤 Опубликовать в Telegram", callback_data=f"cmd:pub:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_bcast(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="📝 Текст без фото", callback_data=f"bc:text:{bot_id}"))
    b.row(InlineKeyboardButton(text="🖼 Текст с фото", callback_data=f"bc:photo:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


def kb_bcast_confirm(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="✅ Отправить всем", callback_data=f"bc:ok:{bot_id}"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:bcast:{bot_id}"))
    return b.as_markup()


def kb_stats(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="🔄 Обновить", callback_data=f"bot:stats:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bot_id}"))
    return b.as_markup()


# ───────────────────────── ТЕКСТЫ ─────────────────────────

WELCOME = (
    "👋 <b>MOROF BOT MANAGER</b>\n\n"
    "Панель управления твоими Telegram-ботами.\n\n"
    "• Подключение и управление ботами\n"
    "• Редактор /start: текст, фото, кнопки\n"
    "• Команды, рассылки, статистика\n\n"
    "Выбери действие ниже."
)

NEWBOT_INTRO = (
    "🤖 <b>Подключение нового бота</b>\n\n"
    "Открой @BotFather, выбери своего бота и скопируй API-токен.\n\n"
    "⚠️ Отправляй токен только для своего бота."
)

NEWBOT_HELP = (
    "📖 <b>Как получить токен</b>\n\n"
    "1. Открой @BotFather.\n"
    "2. /newbot или /mybots → выбери бота.\n"
    "3. Скопируй строку вида <code>123456:AA...</code>.\n"
    "4. Отправь её сюда одним сообщением."
)

NEWBOT_INVALID = (
    "⚠️ <b>Не удалось проверить токен</b>\n\n"
    "Проверь, что токен скопирован полностью, не отозван в @BotFather "
    "и есть соединение с Telegram."
)


# ───────────────────────── FSM ─────────────────────────

class NewBot(StatesGroup):
    token = State()


class StEdit(StatesGroup):
    text = State()
    photo = State()


class BtnAdd(StatesGroup):
    text = State()
    typ = State()
    value = State()


class CmdAdd(StatesGroup):
    cmd = State()
    desc = State()


class Bcast(StatesGroup):
    content = State()
    photo = State()


# ───────────────────────── РОУТЕР ─────────────────────────

router = Router()


async def owned_bot(s: AsyncSession, bot_id: int, owner_id: int) -> ManagedBot | None:
    r = await s.execute(select(ManagedBot).where(
        ManagedBot.id == bot_id, ManagedBot.owner_id == owner_id))
    return r.scalar_one_or_none()


async def get_or_create_cfg(s: AsyncSession, bot_id: int) -> BotConfig:
    c = await s.get(BotConfig, bot_id)
    if not c:
        c = BotConfig(bot_id=bot_id)
        s.add(c)
        await s.commit()
        await s.refresh(c)
    return c


# ─── Стартовое меню ───

@router.message(CommandStart())
async def cmd_start(m: Message) -> None:
    await m.answer(WELCOME, reply_markup=kb_main())


@router.callback_query(F.data == "menu:main")
async def cb_main(c: CallbackQuery) -> None:
    await c.message.edit_text(WELCOME, reply_markup=kb_main())
    await c.answer()


@router.callback_query(F.data == "menu:help")
async def cb_help(c: CallbackQuery) -> None:
    await c.message.edit_text(
        "❓ <b>Помощь</b>\n\n"
        "• 🤖 Мои боты — список подключённых\n"
        "• ➕ Подключить бота — по токену из @BotFather\n"
        "• ⚙️ Управление — панели ботов\n"
        "• 📊 Статистика — сводка по всем ботам\n"
        "• 🖼 Оформление и 📝 Сообщения — редактор /start\n"
        "• 📣 Рассылки — сообщения всем пользователям бота\n\n"
        "В панели каждого бота: стартовое сообщение, фото, кнопки, "
        "команды, рассылки, статистика.",
        reply_markup=kb_main())
    await c.answer()


@router.callback_query(F.data == "menu:profile")
async def cb_profile(c: CallbackQuery, db_user: User, session: AsyncSession) -> None:
    cnt = (await session.execute(
        select(func.count(ManagedBot.id)).where(ManagedBot.owner_id == db_user.id)
    )).scalar() or 0
    await c.message.edit_text(
        "👤 <b>Профиль</b>\n\n"
        f"ID: <code>{db_user.id}</code>\n"
        f"Роль: <b>{'владелец' if db_user.is_admin else 'пользователь'}</b>\n"
        f"Подключено ботов: <b>{cnt}</b>\n"
        f"Зарегистрирован: {db_user.created_at.strftime('%d.%m.%Y %H:%M')}",
        reply_markup=kb_main())
    await c.answer()


# ─── Мои боты ───

@router.callback_query(F.data == "menu:my_bots")
async def cb_bots(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    rows = await session.execute(
        select(ManagedBot).where(ManagedBot.owner_id == db_user.id)
        .order_by(ManagedBot.created_at.asc()))
    bots = list(rows.scalars())
    if not bots:
        await c.message.edit_text(
            "🤖 <b>МОИ БОТЫ</b>\n\nУ тебя пока нет подключённых ботов.",
            reply_markup=kb_empty())
    else:
        await c.message.edit_text(
            f"🤖 <b>МОИ БОТЫ</b>\n\nПодключено ботов: <b>{len(bots)}</b>",
            reply_markup=kb_bots(bots))
    await c.answer()


# ─── Управление / Оформление / Сообщения / Рассылки (общие списки) ───

@router.callback_query(F.data.in_({"menu:manage", "menu:style", "menu:messages", "menu:broadcast"}))
async def cb_pick_section(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    rows = await session.execute(
        select(ManagedBot).where(ManagedBot.owner_id == db_user.id)
        .order_by(ManagedBot.created_at.asc()))
    bots = list(rows.scalars())
    titles = {
        "menu:manage": "⚙️ <b>Управление ботами</b>\n\nВыбери бота:",
        "menu:style": "🖼 <b>Оформление</b>\n\nВыбери бота для настройки:",
        "menu:messages": "📝 <b>Сообщения</b>\n\nВыбери бота для настройки:",
        "menu:broadcast": "📣 <b>Рассылки</b>\n\nВыбери бота:",
    }
    if not bots:
        await c.message.edit_text(
            titles[c.data] + "\n\n<i>Подключённых ботов пока нет.</i>",
            reply_markup=kb_empty())
    else:
        prefix = {
            "menu:manage": "bot:open",
            "menu:style": "bot:start",
            "menu:messages": "bot:start",
            "menu:broadcast": "bot:bcast",
        }[c.data]
        await c.message.edit_text(titles[c.data], reply_markup=kb_bots(bots, prefix))
    await c.answer()


# ─── Общая статистика ───

@router.callback_query(F.data == "menu:stats")
async def cb_stats_all(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bots = list((await session.execute(
        select(ManagedBot).where(ManagedBot.owner_id == db_user.id))).scalars())
    if not bots:
        await c.message.edit_text(
            "📊 <b>Статистика</b>\n\nПока нет подключённых ботов.",
            reply_markup=kb_main())
        await c.answer()
        return
    lines = ["📊 <b>Статистика по всем ботам</b>", ""]
    total_users = 0
    total_launches = 0
    for b in bots:
        u = (await session.execute(
            select(func.count(BotUser.id)).where(BotUser.bot_id == b.id)
        )).scalar() or 0
        l = (await session.execute(
            select(func.coalesce(func.sum(BotUser.launches), 0))
            .where(BotUser.bot_id == b.id)
        )).scalar() or 0
        total_users += u
        total_launches += l
        lines.append(f"🤖 <b>{b.title}</b> — 👥 {u}, 🚀 {l}")
    lines.append("")
    lines.append(f"👥 <b>Всего пользователей:</b> {total_users}")
    lines.append(f"🚀 <b>Всего запусков:</b> {total_launches}")
    await c.message.edit_text("\n".join(lines), reply_markup=kb_main())
    await c.answer()


# ─── Подключение бота ───

@router.message(Command("newbot"))
async def cmd_newbot(m: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(NewBot.token)
    await m.answer(NEWBOT_INTRO, reply_markup=kb_newbot_intro())


@router.callback_query(F.data == "menu:add_bot")
async def cb_addbot(c: CallbackQuery, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(NewBot.token)
    await c.message.edit_text(NEWBOT_INTRO, reply_markup=kb_newbot_intro())
    await c.answer()


@router.callback_query(F.data == "newbot:help")
async def cb_nb_help(c: CallbackQuery) -> None:
    await c.message.edit_text(NEWBOT_HELP, reply_markup=kb_newbot_intro())
    await c.answer()


@router.callback_query(F.data == "newbot:cancel")
async def cb_nb_cancel(c: CallbackQuery, state: FSMContext) -> None:
    await state.clear()
    await c.message.edit_text("❌ Подключение отменено.", reply_markup=kb_main())
    await c.answer()


@router.message(NewBot.token, F.text)
async def on_token(m: Message, state: FSMContext, session: AsyncSession, db_user: User) -> None:
    raw = (m.text or "").strip()
    try:
        await m.delete()
    except Exception:
        pass
    if ":" not in raw or not (20 <= len(raw) <= 128):
        await m.answer(NEWBOT_INVALID, reply_markup=kb_newbot_intro())
        return
    info = await validate_token(raw)
    if not info:
        await m.answer(NEWBOT_INVALID, reply_markup=kb_newbot_intro())
        return
    tg_id = int(info["id"])
    existing = (await session.execute(
        select(ManagedBot).where(ManagedBot.telegram_bot_id == tg_id)
    )).scalar_one_or_none()
    if existing and existing.owner_id != db_user.id:
        await m.answer("⚠️ Этот бот уже подключён другим пользователем.",
                       reply_markup=kb_main())
        await state.clear()
        return
    await state.update_data(token=raw, tg_id=tg_id,
                            username=info.get("username", ""),
                            title=info.get("first_name", ""))
    await m.answer(
        "🤖 <b>Проверка подключения</b>\n\n"
        f"Название: <b>{info.get('first_name','')}</b>\n"
        f"Username: @{info.get('username','')}\n"
        f"ID: <code>{tg_id}</code>\n\n"
        "Подтверди подключение.",
        reply_markup=kb_newbot_confirm())


@router.callback_query(F.data == "newbot:ok")
async def cb_nb_ok(c: CallbackQuery, state: FSMContext, session: AsyncSession, db_user: User) -> None:
    d = await state.get_data()
    token = d.get("token")
    if not token:
        await c.answer("Сессия устарела", show_alert=True)
        await state.clear()
        return
    tg_id = d["tg_id"]
    existing = (await session.execute(
        select(ManagedBot).where(ManagedBot.telegram_bot_id == tg_id)
    )).scalar_one_or_none()
    if existing is None:
        bot = ManagedBot(owner_id=db_user.id, telegram_bot_id=tg_id,
                         username=d["username"], title=d["title"],
                         token_encrypted=enc(token), status="active")
        session.add(bot)
    else:
        if existing.owner_id != db_user.id:
            await c.answer("Бот уже подключён", show_alert=True)
            await state.clear()
            return
        existing.token_encrypted = enc(token)
        existing.username = d["username"]
        existing.title = d["title"]
        existing.status = "active"
        bot = existing
    await session.commit()
    await session.refresh(bot)
    await get_or_create_cfg(session, bot.id)
    try:
        await manager.start(bot.id, token)
    except Exception:
        log.exception("Ошибка запуска id=%s", bot.id)
        bot.status = "invalid"
        await session.commit()
    await state.clear()
    await c.message.edit_text(
        "✅ <b>Бот успешно подключён!</b>\n\n"
        f"<b>{d['title']}</b> (@{d['username']}) доступен в разделе «🤖 Мои боты».",
        reply_markup=kb_newbot_success())
    await c.answer("Подключено")


# ─── Панель бота ───

@router.callback_query(F.data.startswith("bot:open:"))
async def cb_open(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    smap = {"active": "✅ подключён",
            "invalid": "⚠️ требуется повторное подключение",
            "disabled": "⏸ отключён"}
    await c.message.edit_text(
        "🤖 <b>УПРАВЛЕНИЕ БОТОМ</b>\n\n"
        f"Название: <b>{bot.title}</b>\n"
        f"Username: @{bot.username}\n"
        f"ID: <code>{bot.telegram_bot_id}</code>\n"
        f"Статус: {smap.get(bot.status, bot.status)}\n"
        f"Дата: {bot.created_at.strftime('%d.%m.%Y %H:%M')}",
        reply_markup=kb_panel(bot.id))
    await c.answer()


# ─── Настройки (запуск/остановка) ───

@router.callback_query(F.data.startswith("bot:set:"))
async def cb_settings(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    running = manager.get(bid) is not None
    await c.message.edit_text(
        "⚙️ <b>Настройки бота</b>\n\n"
        f"Бот: <b>{bot.title}</b>\n"
        f"Обслуживание: <b>{'запущено' if running else 'остановлено'}</b>",
        reply_markup=kb_settings(bid))
    await c.answer()


@router.callback_query(F.data.startswith("bot:run:"))
async def cb_run(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    try:
        token = dec(bot.token_encrypted)
        await manager.restart(bid, token)
        bot.status = "active"
        await session.commit()
        await c.answer("▶️ Бот запущен", show_alert=True)
    except Exception as e:
        await c.answer(f"Ошибка: {e}", show_alert=True)


@router.callback_query(F.data.startswith("bot:halt:"))
async def cb_halt(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    await manager.stop(bid)
    bot.status = "disabled"
    await session.commit()
    await c.answer("⏸ Бот остановлен", show_alert=True)


# ─── Проверка подключения ───

@router.callback_query(F.data.startswith("bot:check:"))
async def cb_check(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    try:
        token = dec(bot.token_encrypted)
    except Exception:
        await c.answer("Ошибка расшифровки", show_alert=True)
        return
    info = await validate_token(token)
    if info:
        bot.status = "active"
        await session.commit()
        await c.answer("✅ Подключение работает", show_alert=True)
    else:
        bot.status = "invalid"
        await session.commit()
        await c.answer("⚠️ Токен недействителен", show_alert=True)


# ─── Редактор стартового сообщения ───

@router.callback_query(F.data.startswith("bot:start:"))
async def cb_start(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    txt = cfg.start_text or "(пусто)"
    prev = txt if len(txt) < 300 else txt[:300] + "…"
    photo = "есть" if cfg.start_photo else "нет"
    btns = len(json.loads(cfg.start_buttons or "[]"))
    await c.message.edit_text(
        "📝 <b>Стартовое сообщение</b>\n\n"
        f"<b>Текст:</b>\n{prev}\n\n"
        f"<b>Фото:</b> {photo}\n"
        f"<b>Рядов кнопок:</b> {btns}",
        reply_markup=kb_start_edit(bid))
    await c.answer()


@router.callback_query(F.data.startswith("st:text:"))
async def cb_st_text(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(StEdit.text)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "✏️ Отправь новый текст приветствия одним сообщением.\n\n"
        "Можно использовать HTML: <b>жирный</b>, <i>курсив</i>, "
        '<a href="https://example.com">ссылка</a>, эмодзи.\n\n'
        "Отмена — /cancel",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:start:{bid}")
        ]]))
    await c.answer()


@router.message(Command("cancel"))
async def cmd_cancel(m: Message, state: FSMContext) -> None:
    await state.clear()
    await m.answer("❌ Отменено.", reply_markup=kb_main())


@router.message(StEdit.text, F.text)
async def st_text_save(m: Message, state: FSMContext, session: AsyncSession) -> None:
    d = await state.get_data()
    bid = d.get("bot_id")
    cfg = await get_or_create_cfg(session, bid)
    cfg.start_text = m.text
    await session.commit()
    await state.clear()
    await m.answer("✅ Текст сохранён.", reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(text="⬅️ К настройке", callback_data=f"bot:start:{bid}")
    ]]))


@router.callback_query(F.data.startswith("st:photo:"))
async def cb_st_photo(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(StEdit.photo)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "🖼 Отправь фото одним сообщением. Оно будет показываться в приветствии.",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:start:{bid}")
        ]]))
    await c.answer()


@router.message(StEdit.photo, F.photo)
async def st_photo_save(m: Message, state: FSMContext, session: AsyncSession) -> None:
    d = await state.get_data()
    bid = d.get("bot_id")
    cfg = await get_or_create_cfg(session, bid)
    cfg.start_photo = m.photo[-1].file_id
    await session.commit()
    await state.clear()
    await m.answer("✅ Фото сохранено.", reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(text="⬅️ К настройке", callback_data=f"bot:start:{bid}")
    ]]))


@router.callback_query(F.data.startswith("st:nophoto:"))
async def cb_st_nophoto(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    cfg.start_photo = None
    await session.commit()
    await c.answer("🗑 Фото убрано", show_alert=True)


@router.callback_query(F.data.startswith("st:preview:"))
async def cb_st_preview(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    kb = build_user_kb(cfg.start_buttons)
    try:
        if cfg.start_photo:
            await c.message.answer_photo(cfg.start_photo, caption=cfg.start_text, reply_markup=kb)
        else:
            await c.message.answer(cfg.start_text, reply_markup=kb)
        await c.answer("Предпросмотр отправлен")
    except TelegramAPIError as e:
        await c.answer(f"Ошибка: {e}", show_alert=True)


# ─── Кнопки приветствия ───

@router.callback_query(F.data.startswith("bot:buttons:"))
async def cb_buttons(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    rows = json.loads(cfg.start_buttons or "[]")
    flat = sum(rows, [])
    if not flat:
        txt = "🔘 <b>Кнопки приветствия</b>\n\nПока нет ни одной кнопки."
    else:
        lines = ["🔘 <b>Кнопки приветствия</b>", ""]
        for i, b in enumerate(flat):
            t = b.get("type", "cb")
            v = b.get("value", "")
            lines.append(f"{i+1}. <b>{b.get('text','…')}</b> [{t}] {v}")
        txt = "\n".join(lines)
    await c.message.edit_text(txt, reply_markup=kb_buttons_list(bid, rows))
    await c.answer()


@router.callback_query(F.data.startswith("btn:add:"))
async def cb_btn_add(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(BtnAdd.text)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "🔘 Отправь <b>название</b> новой кнопки одним сообщением.\n\n"
        "Например: <i>Открыть сайт</i>",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:buttons:{bid}")
        ]]))
    await c.answer()


@router.message(BtnAdd.text, F.text)
async def btn_text(m: Message, state: FSMContext) -> None:
    d = await state.get_data()
    bid = d.get("bot_id")
    await state.update_data(btn_text=m.text[:64])
    await state.set_state(BtnAdd.typ)
    await m.answer(
        f"Название: <b>{m.text}</b>\n\n"
        "Теперь выбери тип кнопки:",
        reply_markup=kb_btn_type(bid))


@router.callback_query(F.data.startswith("btn:type:"))
async def cb_btn_type(c: CallbackQuery, state: FSMContext) -> None:
    parts = c.data.split(":")
    typ, bid = parts[2], int(parts[3])
    d = await state.get_data()
    if typ == "cb":
        # callback-кнопка без параметра
        await _save_btn(state, bid, typ="cb", value="")
        await c.message.edit_text(
            "✅ Кнопка добавлена.",
            reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
                InlineKeyboardButton(text="⬅️ К кнопкам", callback_data=f"bot:buttons:{bid}")
            ]]))
        await c.answer()
        return
    await state.update_data(btn_type=typ)
    await state.set_state(BtnAdd.value)
    await c.message.edit_text(
        "Отправь URL кнопки (обязательно начинается с https://):")
    await c.answer()


@router.message(BtnAdd.value, F.text)
async def btn_value(m: Message, state: FSMContext) -> None:
    d = await state.get_data()
    bid = d.get("bot_id")
    text = d.get("btn_text", "Кнопка")
    val = (m.text or "").strip()
    if not (val.startswith("http://") or val.startswith("https://")):
        await m.answer("⚠️ URL должен начинаться с http:// или https://")
        return
    await _save_btn(state, bid, typ="url", value=val, text=text)
    await state.clear()
    await m.answer(
        "✅ Кнопка добавлена.",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="⬅️ К кнопкам", callback_data=f"bot:buttons:{bid}")
        ]]))


async def _save_btn(state: FSMContext, bot_id: int, typ: str, value: str,
                    text: str | None = None) -> None:
    d = await state.get_data()
    if text is None:
        text = d.get("btn_text", "Кнопка")
    async with SessionLocal() as s:
        cfg = await get_or_create_cfg(s, bot_id)
        rows = json.loads(cfg.start_buttons or "[]")
        rows.append([{"text": text, "type": typ, "value": value}])
        cfg.start_buttons = json.dumps(rows, ensure_ascii=False)
        await s.commit()
    await state.clear()


@router.callback_query(F.data.startswith("btn:rm:"))
async def cb_btn_rm(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    parts = c.data.split(":")
    bid, idx = int(parts[2]), int(parts[3])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    rows = json.loads(cfg.start_buttons or "[]")
    flat = [b for r in rows for b in r]
    if 0 <= idx < len(flat):
        flat.pop(idx)
    # пересобираем: каждая кнопка — в своём ряду
    new_rows = [[b] for b in flat]
    cfg.start_buttons = json.dumps(new_rows, ensure_ascii=False)
    await session.commit()
    await c.answer("🗑 Кнопка удалена", show_alert=False)
    # перерисуем список
    c2 = CallbackQuery.model_construct(**{
        **c.model_dump(),
        "data": f"bot:buttons:{bid}",
    })
    try:
        await cb_buttons(c, session, db_user)
    except Exception:
        pass


@router.callback_query(F.data.startswith("btn:clear:"))
async def cb_btn_clear(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    cfg.start_buttons = "[]"
    await session.commit()
    await c.answer("🧹 Все кнопки удалены", show_alert=True)
    await cb_buttons(c, session, db_user)


# ─── Медиа (ведёт на редактор фото) ───

@router.callback_query(F.data.startswith("bot:media:"))
async def cb_media(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cfg = await get_or_create_cfg(session, bid)
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="🖼 Загрузить / заменить фото", callback_data=f"st:photo:{bid}"))
    b.row(InlineKeyboardButton(text="🗑 Убрать фото", callback_data=f"st:nophoto:{bid}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад", callback_data=f"bot:open:{bid}"))
    await c.message.edit_text(
        "🖼 <b>Фото и медиа</b>\n\n"
        f"Текущее фото: {'есть' if cfg.start_photo else 'нет'}\n\n"
        "Фото используется в приветствии /start.",
        reply_markup=b.as_markup())
    await c.answer()


# ─── Команды ───

@router.callback_query(F.data.startswith("bot:cmds:"))
async def cb_cmds(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    rows = list((await session.execute(
        select(BotCommandRow).where(BotCommandRow.bot_id == bid))).scalars())
    text = "📋 <b>Команды бота</b>\n\n"
    if rows:
        text += "\n".join(f"/{x.command} — {x.description}" for x in rows)
    else:
        text += "Список пуст."
    text += ("\n\nПосле изменений нажми «📤 Опубликовать в Telegram», "
             "чтобы команды появились в меню бота.")
    await c.message.edit_text(text, reply_markup=kb_cmds(bid, rows))
    await c.answer()


@router.callback_query(F.data.startswith("cmd:add:"))
async def cb_cmd_add(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(CmdAdd.cmd)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "Отправь имя команды <b>без слэша</b>, латиницей, например: <code>help</code>",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:cmds:{bid}")
        ]]))
    await c.answer()


@router.message(CmdAdd.cmd, F.text)
async def cmd_name(m: Message, state: FSMContext) -> None:
    raw = (m.text or "").strip().lstrip("/").lower()
    if not raw.replace("_", "").isalnum() or not (1 <= len(raw) <= 32):
        await m.answer("⚠️ Только латиница, цифры и _, до 32 символов.")
        return
    await state.update_data(cmd=raw)
    await state.set_state(CmdAdd.desc)
    await m.answer(f"Команда: /{raw}\n\nТеперь отправь описание.")


@router.message(CmdAdd.desc, F.text)
async def cmd_desc(m: Message, state: FSMContext, session: AsyncSession) -> None:
    d = await state.get_data()
    bid = d["bot_id"]
    cmd = d["cmd"]
    desc = (m.text or "").strip()[:255]
    existing = (await session.execute(
        select(BotCommandRow).where(
            BotCommandRow.bot_id == bid, BotCommandRow.command == cmd)
    )).scalar_one_or_none()
    if existing:
        existing.description = desc
    else:
        session.add(BotCommandRow(bot_id=bid, command=cmd, description=desc))
    await session.commit()
    await state.clear()
    await m.answer("✅ Команда сохранена.",
                   reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
                       InlineKeyboardButton(text="⬅️ К командам", callback_data=f"bot:cmds:{bid}")
                   ]]))


@router.callback_query(F.data.startswith("cmd:rm:"))
async def cb_cmd_rm(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    parts = c.data.split(":")
    bid, cid = int(parts[2]), int(parts[3])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    await session.execute(delete(BotCommandRow).where(BotCommandRow.id == cid))
    await session.commit()
    await c.answer("🗑 Удалено", show_alert=False)
    await cb_cmds(c, session, db_user)


@router.callback_query(F.data.startswith("cmd:pub:"))
async def cb_cmd_pub(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    rows = list((await session.execute(
        select(BotCommandRow).where(BotCommandRow.bot_id == bid))).scalars())
    if not rows:
        await c.answer("Сначала добавь хотя бы одну команду", show_alert=True)
        return
    try:
        token = dec(bot.token_encrypted)
    except Exception:
        await c.answer("Ошибка расшифровки", show_alert=True)
        return
    bot_api = Bot(token=token)
    try:
        await bot_api.set_my_commands([
            BotCommand(command=r.command, description=r.description) for r in rows
        ])
        await c.answer("📤 Команды опубликованы в Telegram", show_alert=True)
    except TelegramAPIError as e:
        await c.answer(f"Ошибка: {e}", show_alert=True)
    finally:
        await bot_api.session.close()


# ─── Рассылки ───

@router.callback_query(F.data.startswith("bot:bcast:"))
async def cb_bcast(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    cnt = (await session.execute(
        select(func.count(BotUser.id)).where(
            BotUser.bot_id == bid, BotUser.is_blocked == False)  # noqa: E712
    )).scalar() or 0
    await c.message.edit_text(
        f"📣 <b>Рассылка</b>\n\n"
        f"Получателей: <b>{cnt}</b>\n\n"
        "Рассылка уйдёт всем, кто хотя бы раз запускал бота и не заблокировал его.",
        reply_markup=kb_bcast(bid))
    await c.answer()


@router.callback_query(F.data.startswith("bc:text:"))
async def cb_bc_text(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(Bcast.content)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "📝 Отправь текст рассылки одним сообщением.\n\n"
        "Поддерживается HTML-разметка.",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[[
            InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:bcast:{bid}")
        ]]))
    await c.answer()


@router.message(Bcast.content, F.text)
async def bc_text(m: Message, state: FSMContext) -> None:
    d = await state.get_data()
    bid = d["bot_id"]
    await state.update_data(text=m.html_text, photo=None)
    await state.set_state(Bcast.photo)
    # предложим прикрепить фото или сразу отправить
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="📎 Прикрепить фото", callback_data=f"bc:photo:{bid}"))
    b.row(InlineKeyboardButton(text="✅ Отправить без фото", callback_data=f"bc:ok:{bid}"))
    b.row(InlineKeyboardButton(text="❌ Отмена", callback_data=f"bot:bcast:{bid}"))
    await m.answer("Текст сохранён. Прикрепить фото или отправить?", reply_markup=b.as_markup())


@router.callback_query(F.data.startswith("bc:photo:"))
async def cb_bc_photo(c: CallbackQuery, state: FSMContext) -> None:
    bid = int(c.data.split(":")[2])
    await state.set_state(Bcast.photo)
    await state.update_data(bot_id=bid)
    await c.message.edit_text(
        "🖼 Отправь фото одним сообщением.\n"
        "Текст, который ты ввёл ранее, станет подписью.")
    await c.answer()


@router.message(Bcast.photo, F.photo)
async def bc_photo(m: Message, state: FSMContext) -> None:
    d = await state.get_data()
    bid = d["bot_id"]
    await state.update_data(photo=m.photo[-1].file_id)
    txt = d.get("text", "(без текста)")
    prev = txt if len(txt) < 200 else txt[:200] + "…"
    await m.answer_photo(
        m.photo[-1].file_id,
        caption=f"📣 Предпросмотр рассылки:\n\n{prev}",
        reply_markup=kb_bcast_confirm(bid))


@router.callback_query(F.data.startswith("bc:ok:"))
async def cb_bc_ok(c: CallbackQuery, state: FSMContext, session: AsyncSession, db_user: User) -> None:
    d = await state.get_data()
    bid = d.get("bot_id")
    text = d.get("text", "")
    photo = d.get("photo")
    if not bid:
        await c.answer("Сессия устарела", show_alert=True)
        return
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    try:
        token = dec(bot.token_encrypted)
    except Exception:
        await c.answer("Ошибка расшифровки", show_alert=True)
        return

    users = list((await session.execute(
        select(BotUser).where(BotUser.bot_id == bid)
    )).scalars())
    if not users:
        await state.clear()
        await c.answer("Нет получателей", show_alert=True)
        return

    await state.clear()
    bot_api = Bot(token=token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    progress = await c.message.answer(
        f"📣 Рассылка запущена.\n\nВсего: <b>{len(users)}</b>\n"
        "Отправлено: 0\nОшибок: 0\n\nОтмена — /cancel")

    async def run_bcast() -> None:
        ok = 0
        fail = 0
        blocked_ids = []
        for i, u in enumerate(users, 1):
            try:
                if photo:
                    await bot_api.send_photo(u.tg_user_id, photo, caption=text or None)
                else:
                    await bot_api.send_message(u.tg_user_id, text)
                ok += 1
            except TelegramForbiddenError:
                fail += 1
                blocked_ids.append(u.id)
            except TelegramAPIError as e:
                fail += 1
                log.warning("Ошибка рассылки %s: %s", u.tg_user_id, e)
            except Exception as e:  # noqa: BLE001
                fail += 1
                log.warning("Ошибка %s: %s", u.tg_user_id, e)
            if i % 10 == 0 or i == len(users):
                try:
                    await progress.edit_text(
                        f"📣 Рассылка идёт.\n\nВсего: <b>{len(users)}</b>\n"
                        f"Отправлено: <b>{ok}</b>\nОшибок: <b>{fail}</b>\n"
                        f"Прогресс: {i}/{len(users)}")
                except Exception:
                    pass
            await asyncio.sleep(0.05)  # защита от rate limit

        # помечаем заблокировавших
        if blocked_ids:
            async with SessionLocal() as s:
                for uid in blocked_ids:
                    u = await s.get(BotUser, uid)
                    if u:
                        u.is_blocked = True
                await s.commit()

        try:
            await progress.edit_text(
                f"✅ <b>Рассылка завершена</b>\n\n"
                f"Всего: <b>{len(users)}</b>\n"
                f"Доставлено: <b>{ok}</b>\nОшибок: <b>{fail}</b>")
        except Exception:
            pass
        await bot_api.session.close()

    asyncio.create_task(run_bcast())
    await c.answer("Рассылка запущена")


# ─── Статистика бота ───

@router.callback_query(F.data.startswith("bot:stats:"))
async def cb_stats_bot(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    total = (await session.execute(
        select(func.count(BotUser.id)).where(BotUser.bot_id == bid)
    )).scalar() or 0
    launches = (await session.execute(
        select(func.coalesce(func.sum(BotUser.launches), 0)).where(BotUser.bot_id == bid)
    )).scalar() or 0
    blocked = (await session.execute(
        select(func.count(BotUser.id)).where(
            BotUser.bot_id == bid, BotUser.is_blocked == True)  # noqa: E712
    )).scalar() or 0
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    new_today = (await session.execute(
        select(func.count(BotUser.id)).where(
            BotUser.bot_id == bid, BotUser.started_at >= today)
    )).scalar() or 0
    await c.message.edit_text(
        f"📊 <b>Статистика: {bot.title}</b>\n\n"
        f"👥 Всего пользователей: <b>{total}</b>\n"
        f"🆕 Новых за сегодня: <b>{new_today}</b>\n"
        f"🚀 Всего запусков: <b>{launches}</b>\n"
        f"🚫 Заблокировали бота: <b>{blocked}</b>",
        reply_markup=kb_stats(bid))
    await c.answer()


# ─── Токен ───

@router.callback_query(F.data.startswith("bot:token:"))
async def cb_token(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    await c.message.edit_text(
        "🔐 <b>Токен и безопасность</b>\n\n"
        f"Бот: <b>{bot.title}</b> (@{bot.username})\n"
        f"Токен: <code>{'•' * 12}</code>\n\n"
        "⚠️ Токен даёт полный доступ к управлению ботом.",
        reply_markup=kb_token(bid))
    await c.answer()


@router.callback_query(F.data.startswith("tok:show:"))
async def cb_tok_show(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    await c.message.edit_text(
        "⚠️ <b>Внимание</b>\n\n"
        "Токен даёт полный доступ к боту. Показывать только в личном чате.\n\n"
        "Показать?",
        reply_markup=kb_token_confirm(bid))
    await c.answer()


@router.callback_query(F.data.startswith("tok:show_ok:"))
async def cb_tok_show_ok(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    try:
        token = dec(bot.token_encrypted)
    except Exception:
        await c.answer("Ошибка расшифровки", show_alert=True)
        return
    await c.message.answer(
        f"🔐 <b>Токен</b>\n\n<code>{token}</code>\n\nНикому не передавай.")
    await c.answer("Токен отправлен", show_alert=True)


@router.callback_query(F.data.startswith("tok:copy:"))
async def cb_tok_copy(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    if not await owned_bot(session, bid, db_user.id):
        await c.answer("Не найден", show_alert=True)
        return
    await c.answer(
        "Telegram Bot API не позволяет программно копировать в буфер. "
        "Открой сообщение с токеном и скопируй вручную.",
        show_alert=True)


@router.callback_query(F.data.startswith("tok:rotate:"))
async def cb_tok_rotate(c: CallbackQuery) -> None:
    await c.message.answer(
        "🔄 <b>Смена токена</b>\n\n"
        "1. @BotFather → <code>/revoke</code> → выбери бота.\n"
        "2. Получи новый токен.\n"
        "3. Переподключи через /newbot.")
    await c.answer()


# ─── Удаление ───

@router.callback_query(F.data.startswith("bot:del:"))
async def cb_del(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    await c.message.edit_text(
        f"🗑 <b>Удаление бота</b>\n\n"
        f"Удалить <b>{bot.title}</b> (@{bot.username}) из панели?\n\n"
        "Удаление из панели не удаляет бота в Telegram и не отзывает токен.",
        reply_markup=kb_del_confirm(bid))
    await c.answer()


@router.callback_query(F.data.startswith("bot:del_ok:"))
async def cb_del_ok(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bid = int(c.data.split(":")[2])
    bot = await owned_bot(session, bid, db_user.id)
    if not bot:
        await c.answer("Не найден", show_alert=True)
        return
    await manager.stop(bid)
    # чистим связанные данные (FK с ondelete="CASCADE" сделает это сам,
    # но на всякий случай удаляем и вручную)
    await session.execute(delete(BotUser).where(BotUser.bot_id == bid))
    await session.execute(delete(BotCommandRow).where(BotCommandRow.bot_id == bid))
    await session.execute(delete(BotConfig).where(BotConfig.bot_id == bid))
    await session.delete(bot)
    await session.commit()
    await c.message.edit_text(
        "🗑 Бот удалён из панели.\n\n"
        "Чтобы отозвать токен — @BotFather → /revoke.")
    await c.answer("Удалено")


# ───────────────────────── ЗАПУСК ─────────────────────────

async def main() -> None:
    logging.basicConfig(level=logging.INFO,
                        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    threading.Thread(target=_health, daemon=True).start()

    bot = Bot(token=settings.main_bot_token,
              default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher(storage=MemoryStorage())
    dp.update.middleware(DbMw())
    dp.update.middleware(AccessMw())
    dp.include_router(router)

    async with SessionLocal() as s:
        await manager.restore(s)

    try:
        await dp.start_polling(bot)
    finally:
        await manager.stop_all()
        await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        pass
