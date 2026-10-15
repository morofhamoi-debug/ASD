# ⚠️ ЭТОТ ФАЙЛ ДОБАВЛЕН В .gitignore. НЕ ЗАГРУЖАЙ ЕГО В GITHUB.
# Токены и ключи лежат здесь только локально / на сервере.

MAIN_BOT_TOKEN = "8493844263:AAFHdTYi3L43YYVtpnkaeYegqNYgz-ctYyM"

# Твой личный Telegram ID. Узнать: напиши @userinfobot
OWNER_IDS = "5208615220"

# DATABASE_URL оставь как есть, если запускаешь через docker-compose.
# На Render/Railway/hosting замени на URL их Postgres.
DATABASE_URL = "postgresql+asyncpg://morof:morof@db:5432/morof"

# FERNET_KEY можно оставить пустым — сгенерируется автоматически
# при первом запуске и сохранится в файл .fernet_key.
FERNET_KEY = ""
