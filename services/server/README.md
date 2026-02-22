# CoArt — Portal API

## Installation

Install dependencies from the monorepo root, then build shared packages:

```bash
npm install
npm run build
```

## Configuration

Copy and edit env for development:

```bash
cp .env.sample .env.development
# edit .env.development (POSTGRES_URL, TYPESENSE_*, FE_URL, etc.)
```

See **LOCAL_DEV.md** in this folder for full local setup (Postgres, Typesense, migrations).

## Start

**Watch mode (development):**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm run start
```

## Test and Code Quality

```bash
npm run lint
npm run test
```

## Swagger

Swagger ui is available on

```
http://localhost:3001/swagger
```
