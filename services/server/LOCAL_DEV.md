# Запуск бэкенда локально

## 1. Требования

- **Node.js** ≥ 22
- **Docker** и **Docker Compose** (для Postgres и Typesense)
- Зависимости монорепозитория установлены из корня (`npm install`)

## 2. Установка зависимостей и сборка пакетов

Из корня репозитория:

```bash
cd /path/to/coartmarket
npm install
npm run build
```

Команда `npm run build` собирает пакеты `@framework/constants` и `@framework/types`, от которых зависит сервер.

## 3. Переменные окружения

В каталоге `services/server` создай **`.env.development`** (при `NODE_ENV=development` Nest подхватывает `.env.${NODE_ENV}`).

```bash
cd services/server
cp .env.sample .env.development
```

Отредактируй `.env.development`. Обязательно для локального запуска:

| Переменная | Описание | Пример |
|------------|----------|--------|
| **POSTGRES_URL** | URL подключения к PostgreSQL | `postgres://postgres:password@localhost:5432/coart-development` |
| **TYPESENSE_HOST** | Хост Typesense | `localhost` |
| **TYPESENSE_PORT** | Порт Typesense | `8108` |
| **TYPESENSE_PROTOCOL** | Протокол | `http` |
| **TYPESENSE_API_KEY** | API-ключ Typesense (любая строка для локального контейнера) | `local-dev-key` |
| **FE_URL** | URL фронтенда (без слэша в конце) | `http://localhost:3002` |

Либо вместо `POSTGRES_URL` можно задать по отдельности: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.

Остальные переменные (Google/Firebase, Stripe, Paykilla, Mailjet, Sentry, Arweave, EVM и т.д.) можно оставить из `.env.sample` или пустыми; часть функций без них будет недоступна.

## 4. Запуск Postgres и Typesense (Docker)

В корне репозитория есть `docker-compose.yml` с сервисами **postgres** и **typesense**. Запусти только их:

```bash
cd /path/to/coartmarket
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=password
export POSTGRES_DB=coart-development
export TYPESENSE_API_KEY=local-dev-key
docker compose up -d postgres typesense
```

Убедись, что в `.env.development` значение `POSTGRES_URL` совпадает с этими данными, например:

```
POSTGRES_URL=postgres://postgres:password@localhost:5432/coart-development
TYPESENSE_HOST=localhost
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=http
TYPESENSE_API_KEY=local-dev-key
```

Проверка:

- Postgres: `psql postgres://postgres:password@localhost:5432/coart-development -c '\l'`
- Typesense: `curl http://localhost:8108/health` (или в браузере)

## 5. Миграции БД

Схему и сиды нужно применить миграциями MikroORM. Из каталога сервера (подхватится `.env.development`):

```bash
cd services/server
npm run migration:up
```

Или из корня: `npm run migration:up --workspace=@framework/server`.

## 6. Запуск API в режиме разработки

Из корня репозитория:

```bash
npm run dev --workspace=@framework/server
```

или из каталога сервера:

```bash
cd services/server
npm run dev
```

Скрипт `dev` выставляет `NODE_ENV=development`, подхватывает `.env.development` и запускает Nest в watch-режиме.

API будет доступен по адресу **http://localhost:3001** (порт задаётся в `.env.development` как `PORT`).

Swagger UI: **http://localhost:3001/swagger**

## 7. Остановка инфраструктуры

```bash
docker compose down
```

---

## Краткая последовательность (после первой настройки)

```bash
# из корня
docker compose up -d postgres typesense
npm run dev --workspace=@framework/server
```

В другом терминале при необходимости запускаешь фронт:

```bash
npm run dev --workspace=@framework/client
```

Фронт по умолчанию ходит на бэкенд по `BE_URL` (например `http://localhost:3001`), заданному в `services/client/.env.development`.
