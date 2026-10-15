"""MOROF BOT MANAGER — минимальное рабочее ядро.

Читает секреты в порядке приоритета:
  1) переменные окружения (для хостинга: Render, Railway, VPS)
  2) локальный файл secrets.py (для запуска на своём компьютере/сервере)

Файл secrets.py НЕ должен попадать в GitHub.
"""

from __future__ import annotations

import asyncio
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx
from aiogram import BaseMiddleware, Bot, Dispatcher, F, Router
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import (
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
from sqlalchemy import BigInteger, DateTime, ForeignKey, Index, String, Text, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

log = logging.getLogger("morof")

# ───────────────────────────── СЕКРЕТЫ ─────────────────────────────
# Приоритет: переменные окружения → secrets.py

try:
    import secrets as _secrets  # локальный файл secrets.py
    for _key in ("MAIN_BOT_TOKEN", "OWNER_IDS", "DATABASE_URL", "FERNET_KEY"):
        _val = getattr(_secrets, _key, None)
        if _val and not os.environ.get(_key):
            os.environ[_key] = str(_val)
except ImportError:
    pass


def _load_or_create_fernet() -> str:
    """Гарантированно возвращает рабочий Fernet-ключ.

    Порядок:
      1) FERNET_KEY из окружения / secrets.py
      2) локальный файл .fernet_key (сохраняется между запусками)
      3) сгенерировать новый и сохранить в .fernet_key
    """
    key = os.environ.get("FERNET_KEY")
    if key:
        return key

    key_file = Path(".fernet_key")
    if key_file.exists():
        return key_file.read_text().strip()

    new_key = Fernet.generate_key().decode()
    key_file.write_text(new_key)
    log.warning(
        "FERNET_KEY не задан — сгенерирован новый и сохранён в .fernet_key. "
        "НЕ удаляй этот файл, иначе подключённые боты станут недоступны."
    )
    return new_key


# ───────────────────────────── КОНФИГ ──────────────────────────────

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
    settings.fernet_key = _load_or_create_fernet()

_fernet = Fernet(settings.fernet_key.encode())


def encrypt_token(token: str) -> str:
    return _fernet.encrypt(token.encode()).decode()


def decrypt_token(cipher: str) -> str:
    try:
        return _fernet.decrypt(cipher.encode()).decode()
    except InvalidToken as e:
        raise RuntimeError("Не удалось расшифровать токен. Проверь FERNET_KEY.") from e


# ───────────────────────── БАЗА ДАННЫХ ─────────────────────────────

class Base(DeclarativeBase):
    pass


engine = create_async_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


def _now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str | None] = mapped_column(String(64))
    full_name: Mapped[str | None] = mapped_column(String(255))
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
    __table_args__ = (Index("ix_mb_owner_status", "owner_id", "status"),)


# ───────────────────────── ПРОВЕРКА ТОКЕНА ────────────────────────

async def validate_token(token: str) -> dict | None:
    """Возвращает результат getMe или None. Токен не логируется."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as c:
            r = await c.get(f"https://api.telegram.org/bot{token}/getMe")
        data = r.json()
    except (httpx.HTTPError, ValueError):
        return None
    return data.get("result") if data.get("ok") else None


# ───────────────── МЕНЕДЖЕР ПОДКЛЮЧЁННЫХ БОТОВ ────────────────────

class Runtime:
    def __init__(self, bot_id: int, token: str) -> None:
        self.bot_id = bot_id
        self.bot = Bot(token=token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
        self.dp = Dispatcher()
        self.task: asyncio.Task | None = None
        self.dp.message(CommandStart())(self._on_start)

    async def _on_start(self, message: Message) -> None:
        await message.answer(
            "🤖 Этот бот подключён к <b>MOROF BOT MANAGER</b>.\n"
            "Настройка приветствия появится в следующих обновлениях."
        )

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

    async def start(self, bot_id: int, token: str) -> None:
        if bot_id in self.runs:
            return
        rt = Runtime(bot_id, token)
        try:
            await rt.start()
        except Exception:
            log.exception("Не удалось запустить бота id=%s", bot_id)
            await rt.stop()
            raise
        self.runs[bot_id] = rt

    async def stop(self, bot_id: int) -> None:
        rt = self.runs.pop(bot_id, None)
        if rt:
            await rt.stop()

    async def stop_all(self) -> None:
        for bot_id in list(self.runs):
            await self.stop(bot_id)

    async def restore(self, session: AsyncSession) -> None:
        rows = await session.execute(
            select(ManagedBot).where(ManagedBot.status == "active")
        )
        for b in rows.scalars():
            try:
                await self.start(b.id, decrypt_token(b.token_encrypted))
            except Exception:
                log.exception("Не удалось восстановить бота id=%s", b.id)


manager = BotManager()


# ───────────────────────── MIDDLEWARE ──────────────────────────────

DENY = "⛔️ <b>Доступ запрещён</b>\n\nТы не владелец панели MOROF BOT MANAGER."


class DbMw(BaseMiddleware):
    async def __call__(self, handler, event: TelegramObject, data: dict[str, Any]) -> Any:
        async with SessionLocal() as session:
            data["session"] = session
            return await handler(event, data)


class AccessMw(BaseMiddleware):
    async def __call__(self, handler, event: TelegramObject, data: dict[str, Any]) -> Any:
        tg: TgUser | None = data.get("event_from_user")
        session: AsyncSession | None = data.get("session")
        if tg is None or session is None:
            return await handler(event, data)

        user = await session.get(User, tg.id)
        if user is None:
            user = User(
                id=tg.id,
                username=tg.username,
                full_name=tg.full_name,
                is_admin=tg.id in settings.owners,
            )
            session.add(user)
        else:
            user.username = tg.username
            user.full_name = tg.full_name
            if tg.id in settings.owners:
                user.is_admin = True
        await session.commit()

        if not user.is_admin:
            if isinstance(event, Message):
                await event.answer(DENY)
            elif isinstance(event, CallbackQuery):
                await event.answer("⛔️ Доступ запрещён", show_alert=True)
            return None

        data["db_user"] = user
        return await handler(event, data)


# ───────────────────────── КЛАВИАТУРЫ ─────────────────────────────

def kb_main() -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(
        InlineKeyboardButton(text="🤖 Мои боты", callback_data="menu:my_bots"),
        InlineKeyboardButton(text="➕ Подключить бота", callback_data="menu:add_bot"),
    )
    b.row(
        InlineKeyboardButton(text="⚙️ Управление ботами", callback_data="menu:soon"),
        InlineKeyboardButton(text="📊 Статистика", callback_data="menu:soon"),
    )
    b.row(
        InlineKeyboardButton(text="🖼 Оформление", callback_data="menu:soon"),
        InlineKeyboardButton(text="📣 Рассылки", callback_data="menu:soon"),
    )
    b.row(
        InlineKeyboardButton(text="📝 Сообщения", callback_data="menu:soon"),
        InlineKeyboardButton(text="❓ Помощь", callback_data="menu:help"),
    )
    b.row(InlineKeyboardButton(text="👤 Профиль", callback_data="menu:profile"))
    return b.as_markup()


def kb_bots(bots: list[ManagedBot]) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    for x in bots:
        b.row(InlineKeyboardButton(
            text=f"🤖 {x.title} | @{x.username}",
            callback_data=f"bot:open:{x.id}",
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
    labels = [
        ("⚙️ Настройки", "settings"),
        ("📝 Стартовое сообщение", "start"),
        ("🖼 Фото и медиа", "media"),
        ("🔘 Inline-кнопки", "buttons"),
        ("📋 Команды", "commands"),
        ("📣 Рассылки", "broadcast"),
        ("📊 Статистика", "stats"),
    ]
    for text, key in labels:
        b.row(InlineKeyboardButton(text=text, callback_data=f"bot:soon:{bot_id}:{key}"))
    b.row(InlineKeyboardButton(text="🔐 Токен и безопасность", callback_data=f"bot:token:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔄 Проверить подключение", callback_data=f"bot:check:{bot_id}"))
    b.row(InlineKeyboardButton(text="🗑 Удалить бота", callback_data=f"bot:del:{bot_id}"))
    b.row(InlineKeyboardButton(text="⬅️ Назад к списку", callback_data="menu:my_bots"))
    return b.as_markup()


def kb_token(bot_id: int) -> InlineKeyboardMarkup:
    b = InlineKeyboardBuilder()
    b.row(InlineKeyboardButton(text="👁 Показать токен", callback_data=f"tok:show:{bot_id}"))
    b.row(InlineKeyboardButton(text="📋 Скопировать токен", callback_data=f"tok:copy:{bot_id}"))
    b.row(InlineKeyboardButton(text="🔄 Инструкция по смене токена", callback_data=f"tok:rotate:{bot_id}"))
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


# ──────────────────────────── ТЕКСТЫ ──────────────────────────────

WELCOME = (
    "👋 <b>MOROF BOT MANAGER</b>\n\n"
    "Панель управления твоими Telegram-ботами в одном месте.\n\n"
    "• Подключай ботов по токену из @BotFather\n"
    "• Управляй приветствием, кнопками и командами\n"
    "• Следи за статистикой и делай рассылки\n\n"
    "Выбери действие ниже."
)

NEWBOT_INTRO = (
    "🤖 <b>Подключение нового бота</b>\n\n"
    "Сейчас мы подключим твоего Telegram-бота к системе управления.\n\n"
    "Для начала открой @BotFather, выбери своего бота и скопируй его API-токен.\n\n"
    "⚠️ Отправляй токен только для своего бота. Никому не передавай его посторонним."
)

NEWBOT_HELP = (
    "📖 <b>Как получить токен</b>\n\n"
    "1. Открой @BotFather в Telegram.\n"
    "2. Отправь /newbot (для нового) или /mybots и выбери существующего.\n"
    "3. Скопируй строку вида <code>123456:AA...</code>.\n"
    "4. Вернись сюда и отправь токен одним сообщением."
)

NEWBOT_INVALID = (
    "⚠️ <b>Не удалось проверить токен</b>\n\n"
    "Telegram отклонил запрос. Возможные причины:\n"
    "• токен скопирован не полностью;\n"
    "• токен отозван в @BotFather;\n"
    "• нет соединения с Telegram.\n\n"
    "Проверь токен и отправь заново либо нажми «Отмена»."
)


# ──────────────────────────── ХЕНДЛЕРЫ ────────────────────────────

class NewBot(StatesGroup):
    token = State()


router = Router()


async def owned_bot(session: AsyncSession, bot_id: int, owner_id: int) -> ManagedBot | None:
    r = await session.execute(select(ManagedBot).where(
        ManagedBot.id == bot_id, ManagedBot.owner_id == owner_id))
    return r.scalar_one_or_none()


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
        "• «🤖 Мои боты» — список подключённых ботов.\n"
        "• «➕ Подключить бота» или /newbot — добавить нового бота.\n\n"
        "Остальные разделы появятся по мере готовности этапов.",
        reply_markup=kb_main())
    await c.answer()


@router.callback_query(F.data == "menu:profile")
async def cb_profile(c: CallbackQuery, db_user: User) -> None:
    await c.message.edit_text(
        "👤 <b>Профиль</b>\n\n"
        f"ID: <code>{db_user.id}</code>\n"
        f"Роль: <b>{'владелец' if db_user.is_admin else 'пользователь'}</b>\n"
        f"Зарегистрирован: {db_user.created_at.strftime('%d.%m.%Y %H:%M')}",
        reply_markup=kb_main())
    await c.answer()


@router.callback_query(F.data == "menu:soon")
async def cb_soon(c: CallbackQuery) -> None:
    await c.answer("Раздел появится в следующих этапах", show_alert=True)


# ── Подключение бота ──

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
    username = info.get("username", "")
    title = info.get("first_name", "")

    existing = (await session.execute(
        select(ManagedBot).where(ManagedBot.telegram_bot_id == tg_id))).scalar_one_or_none()
    if existing and existing.owner_id != db_user.id:
        await m.answer("⚠️ Этот бот уже подключён другим пользователем панели.",
                       reply_markup=kb_main())
        await state.clear()
        return

    await state.update_data(token=raw, tg_id=tg_id, username=username, title=title)
    await m.answer(
        "🤖 <b>Проверка подключения</b>\n\n"
        f"Название: <b>{title}</b>\n"
        f"Username: @{username}\n"
        f"ID: <code>{tg_id}</code>\n\n"
        "Подтверди подключение этого бота к панели управления.",
        reply_markup=kb_newbot_confirm())


@router.callback_query(F.data == "newbot:ok")
async def cb_nb_ok(c: CallbackQuery, state: FSMContext, session: AsyncSession, db_user: User) -> None:
    d = await state.get_data()
    token = d.get("token")
    if not token:
        await c.answer("Сессия устарела, начни заново", show_alert=True)
        await state.clear()
        return

    tg_id = d["tg_id"]
    existing = (await session.execute(
        select(ManagedBot).where(ManagedBot.telegram_bot_id == tg_id))).scalar_one_or_none()

    if existing is None:
        bot = ManagedBot(
            owner_id=db_user.id, telegram_bot_id=tg_id,
            username=d["username"], title=d["title"],
            token_encrypted=encrypt_token(token), status="active",
        )
        session.add(bot)
    else:
        if existing.owner_id != db_user.id:
            await c.answer("Этот бот уже подключён другим пользователем", show_alert=True)
            await state.clear()
            return
        existing.token_encrypted = encrypt_token(token)
        existing.username = d["username"]
        existing.title = d["title"]
        existing.status = "active"
        bot = existing
    await session.commit()
    await session.refresh(bot)

    try:
        await manager.start(bot.id, token)
    except Exception:
        log.exception("Ошибка запуска бота id=%s", bot.id)
        bot.status = "invalid"
        await session.commit()

    await state.clear()
    await c.message.edit_text(
        "✅ <b>Бот успешно подключён!</b>\n\n"
        f"<b>{d['title']}</b> (@{d['username']}) доступен в разделе «🤖 Мои боты».\n\n"
        "Теперь ты можешь настраивать его сообщения, кнопки, изображения, "
        "команды и другие функции прямо здесь.",
        reply_markup=kb_newbot_success())
    await c.answer("Подключено")


# ── Список и панель бота ──

@router.callback_query(F.data == "menu:my_bots")
async def cb_bots(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    rows = await session.execute(
        select(ManagedBot).where(ManagedBot.owner_id == db_user.id)
        .order_by(ManagedBot.created_at.asc()))
    bots = list(rows.scalars())
    if not bots:
        text = "🤖 <b>МОИ БОТЫ</b>\n\nУ тебя пока нет подключённых ботов."
        kb = kb_empty()
    else:
        text = f"🤖 <b>МОИ БОТЫ</b>\n\nПодключено ботов: <b>{len(bots)}</b>"
        kb = kb_bots(bots)
    await c.message.edit_text(text, reply_markup=kb)
    await c.answer()


@router.callback_query(F.data.startswith("bot:open:"))
async def cb_open(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    smap = {
        "active": "✅ подключён",
        "invalid": "⚠️ требуется повторное подключение",
        "disabled": "⏸ отключён",
    }
    await c.message.edit_text(
        "🤖 <b>УПРАВЛЕНИЕ БОТОМ</b>\n\n"
        f"Название: <b>{bot.title}</b>\n"
        f"Username: @{bot.username}\n"
        f"ID: <code>{bot.telegram_bot_id}</code>\n"
        f"Статус: {smap.get(bot.status, bot.status)}\n"
        f"Дата подключения: {bot.created_at.strftime('%d.%m.%Y %H:%M')}",
        reply_markup=kb_panel(bot.id))
    await c.answer()


@router.callback_query(F.data.startswith("bot:soon:"))
async def cb_bot_soon(c: CallbackQuery) -> None:
    await c.answer("Раздел появится в следующем этапе разработки", show_alert=True)


@router.callback_query(F.data.startswith("bot:check:"))
async def cb_check(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    try:
        token = decrypt_token(bot.token_encrypted)
    except Exception:
        await c.answer("Не удалось расшифровать токен", show_alert=True)
        return
    info = await validate_token(token)
    if info:
        bot.status = "active"
        await session.commit()
        await c.answer("✅ Подключение работает", show_alert=True)
    else:
        bot.status = "invalid"
        await session.commit()
        await c.answer("⚠️ Токен недействителен или нет связи с Telegram", show_alert=True)


# ── Токен и безопасность ──

@router.callback_query(F.data.startswith("bot:token:"))
async def cb_token(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    await c.message.edit_text(
        "🔐 <b>Токен и безопасность</b>\n\n"
        f"Бот: <b>{bot.title}</b> (@{bot.username})\n"
        f"Текущий токен: <code>{'•' * 12}</code>\n\n"
        "⚠️ Токен даёт полный доступ к управлению ботом. "
        "Не показывай его посторонним.",
        reply_markup=kb_token(bot.id))
    await c.answer()


@router.callback_query(F.data.startswith("tok:show:"))
async def cb_tok_show(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    await c.message.edit_text(
        "⚠️ <b>Внимание</b>\n\n"
        "Токен даёт полный доступ к управлению ботом. Убедись, что рядом нет "
        "посторонних и что это личный чат.\n\n"
        "Telegram не позволяет гарантированно удалить сообщение у пользователя, "
        "поэтому не пересылай токен и не сохраняй его в незащищённых местах.\n\n"
        "Показать токен?",
        reply_markup=kb_token_confirm(bot.id))
    await c.answer()


@router.callback_query(F.data.startswith("tok:show_ok:"))
async def cb_tok_show_ok(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    try:
        token = decrypt_token(bot.token_encrypted)
    except Exception:
        await c.answer("Не удалось расшифровать токен", show_alert=True)
        return
    await c.message.answer(
        "🔐 <b>Токен</b>\n\n"
        f"<code>{token}</code>\n\n"
        "Никому не передавай это значение.")
    await c.answer("Токен отправлен отдельным сообщением", show_alert=True)


@router.callback_query(F.data.startswith("tok:copy:"))
async def cb_tok_copy(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    if not await owned_bot(session, bot_id, db_user.id):
        await c.answer("Бот не найден", show_alert=True)
        return
    await c.answer(
        "Telegram Bot API не позволяет копировать текст в буфер пользователя "
        "программно. Открой сообщение с токеном и скопируй вручную.",
        show_alert=True)


@router.callback_query(F.data.startswith("tok:rotate:"))
async def cb_tok_rotate(c: CallbackQuery) -> None:
    await c.message.answer(
        "🔄 <b>Смена токена</b>\n\n"
        "1. Открой @BotFather.\n"
        "2. Команда <code>/revoke</code> — выбери бота.\n"
        "3. Получи новый токен.\n"
        "4. Переподключи бота через /newbot.\n\n"
        "После смены токена старое значение перестаёт работать.")
    await c.answer()


# ── Удаление ──

@router.callback_query(F.data.startswith("bot:del:"))
async def cb_del(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    await c.message.edit_text(
        f"🗑 <b>Удаление бота</b>\n\n"
        f"Ты действительно хочешь удалить <b>{bot.title}</b> (@{bot.username}) "
        "из панели управления?\n\n"
        "Удаление из панели не удаляет бота в Telegram и не отзывает его токен "
        "у @BotFather.",
        reply_markup=kb_del_confirm(bot.id))
    await c.answer()


@router.callback_query(F.data.startswith("bot:del_ok:"))
async def cb_del_ok(c: CallbackQuery, session: AsyncSession, db_user: User) -> None:
    bot_id = int(c.data.split(":")[2])
    bot = await owned_bot(session, bot_id, db_user.id)
    if not bot:
        await c.answer("Бот не найден", show_alert=True)
        return
    await manager.stop(bot.id)
    await session.delete(bot)
    await session.commit()
    await c.message.edit_text(
        "🗑 Бот удалён из панели управления.\n\n"
        "Если хочешь полностью отозвать доступ — отправь @BotFather команду "
        "<code>/revoke</code> и выбери этого бота.")
    await c.answer("Удалено")


# ──────────────────────────── ЗАПУСК ──────────────────────────────

async def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    bot = Bot(
        token=settings.main_bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dp = Dispatcher(storage=MemoryStorage())
    dp.update.middleware(DbMw())
    dp.update.middleware(AccessMw())
    dp.include_router(router)

    async with SessionLocal() as session:
        await manager.restore(session)

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
