# GCLOUD

### Login
Login
```shell
gcloud auth login
```

Logout
```shell
gcloud auth revoke
```

### Secrets
```shell
gcloud secrets delete FE_URL
```

```shell
gcloud secrets list --project=custom-oasis-477218-v8
```

```shell
gcloud secrets versions access latest \
--secret=FE_URL \
--project=custom-oasis-477218-v8
```

Restart service
```shell
gcloud run services update coartmarket-api \
  --region=europe-west4 \
  --set-env-vars=RESTART=$(date +%s)
```

### Storage
Set CORS
```shell
gsutil cors set cors.json gs://coart-assets-staging
```

Get CORS
```shell
gsutil cors get gs://coart-assets-staging
```

Copy content (not ACL)
```shell
gcloud config set project coart-assets-staging
gsutil -m cp -r "gs://coart-artworks-staging/*" "gs://coart-merchants-staging"
```

### Service account
Get email
```shell
gcloud run services describe coartmarket-api --region europe-west4 --format='value(spec.template.spec.serviceAccountName)'
```

Get roles by email
```shell
gcloud iam service-accounts get-iam-policy coartmarket-api@custom-oasis-477218-v8.iam.gserviceaccount.com
```

## Креды и файлы Google при деплое (сохранить как есть)

В образе контейнера лежит только код из репозитория. Файлы с кредами, `google-services.json` и т.п. **не должны быть в образе** (их нет в гите и не нужно туда добавлять).

Чтобы при деплое «подтягивались только твои изменения» (например, удаление ethberry), а креды и настройки Google оставались теми же:

- **Храните креды и секреты вне образа** — в настройках сервиса Cloud Run:
  - **Переменные окружения** (FE_URL, ключи API и т.д.) — задаются в конфигурации сервиса и **не меняются при деплое**. При каждой новой ревизии остаются те же значения.
  - **Secret Manager** — для паролей, ключей, JSON с кредами. Секреты подключаются к сервису (как env или как volume); при деплое нового образа конфигурация секретов не трогается.

При деплое вы меняете только **образ** (новый код без ethberry и т.д.). Переменные окружения и секреты сервиса **сохраняются** — их не перезаписывает скрипт деплоя.

Проверить текущие переменные и секреты сервиса:
```shell
gcloud run services describe coartmarket-api --region=europe-west4 --format="yaml(spec.template.spec.containers[0].env)"
gcloud run services describe coartmarket-api --region=europe-west4 --format="yaml(spec.template.spec.containers[0].volumeMounts)"
```

Если приложение ожидает путь к файлу (например, JSON с сервисным аккаунтом), лучше один раз положить содержимое в Secret Manager и смонтировать его как файл в Cloud Run (Volume → Secret), а не класть файл в образ. Тогда при любом деплое образ без кредов, а файл «подставляется» из секрета.

## Пошаговая инструкция: обновить всё на проде

1. **Проверить, что в коммит не попадут креды**  
   ```bash
   git status
   ```  
   В списке не должно быть: `ardrive-wallet.json`, `gha-creds*.json`, `coart-marketplace-staging.json`, `.env`, `.env.production`, `services/server/.env.*` и т.п. (они в `.gitignore`).

2. **Закоммитить и запушить ветку, с которой деплоишь**  
   ```bash
   git add .
   git status   # ещё раз глянуть список
   git commit -m "Update production: ..."
   git push origin main
   ```  
   (подставь свою ветку вместо `main`, если деплоишь с другой.)

3. **Проверить секреты и переменные в GitHub**  
   Репозиторий → **Settings** → **Secrets and variables** → **Actions**.  
   - Для **production** окружения:  
     - **Secrets:** `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT_EMAIL`, `ARDRIVE_PRIVATE_KEY`, `NPM_AUTH_TOKEN` (бэкенд); `FIREBASE_API_KEY`, `TYPESENSE_API_KEY` (фронт).  
     - **Variables:** `BE_URL`, `FIREBASE_*`, `TYPESENSE_*`, `GOOGLE_STORAGE_BUCKET_*` (как в разделе про фронт ниже).

4. **Задеплоить бэкенд**  
   **Actions** → **Production Deploy Backend** → **Run workflow** → выбрать ветку (например `main`) → **Run workflow**. Дождаться зелёного завершения.

5. **Задеплоить фронтенд**  
   **Actions** → **Production Deploy Frontend** → **Run workflow** → та же ветка → **Run workflow**. Дождаться зелёного завершения.

6. **Проверить прод**  
   Открыть URL фронта и API, убедиться, что сервисы отвечают и что изменения (например, без ethberry) на месте. Переменные и секреты Cloud Run при этом не меняются — подменяются только образы.

---

## Production Deploy Backend (GitHub Actions)

Workflow: `.github/workflows/deploy-backend-production.yml`. Деплоит текущее состояние репозитория на прод **без смены** переменных и секретов Cloud Run — подменяется только образ.

**Как залить текущие файлы и не сломать прод:**

1. **Не коммитить креды**  
   В репозитории не должно быть `ardrive-wallet.json`, `gha-creds*.json`, `.env` и т.п. (они уже в `.gitignore`). ArDrive в проде подставляется из GitHub Secret `ARDRIVE_PRIVATE_KEY` на этапе сборки.

2. **Закоммитить и запушить изменения**  
   Все нужные правки (удаление ethberry и т.д.) закоммитить и отправить в ветку, с которой будете деплоить (например `main`):
   ```bash
   git add .
   git status   # убедиться, что нет лишних файлов с кредами
   git commit -m "Your message"
   git push origin main
   ```

3. **Запустить workflow**  
   В GitHub: **Actions** → **Production Deploy Backend** → **Run workflow** → выбрать ветку (например `main`) → **Run workflow**.  
   Workflow сделает checkout этой ветки, соберёт образ из текущих файлов, создаст `ardrive-wallet.json` из секрета, запушит образ в Artifact Registry и задеплоит его в Cloud Run. Переменные окружения и секреты сервиса в GCP не меняются.

4. **Секреты в GitHub**  
   В настройках репозитория (Settings → Secrets and variables → Actions) должны быть:  
   `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT_EMAIL`, `ARDRIVE_PRIVATE_KEY`, `NPM_AUTH_TOKEN`.

При таком сценарии «заливаются» только файлы из репозитория (твой код), структура и креды на проде сохраняются.

## Production Deploy Frontend (GitHub Actions)

Workflow: `.github/workflows/deploy-frontend-production.yml`. Собирает клиент с переменными из GitHub (vars/secrets), пушит образ в Artifact Registry и деплоит в Cloud Run `coartmarket-frontend`.

**Шаги как у бэкенда:** закоммитить и запушить изменения → **Actions** → **Production Deploy Frontend** → **Run workflow** → выбрать ветку → **Run workflow**.

**Секреты и переменные в GitHub:**  
В настройках репо (Settings → Secrets and variables → Actions) для окружения production:

- **Secrets:** `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT_EMAIL`, `FIREBASE_API_KEY`, `TYPESENSE_API_KEY`
- **Variables:** `BE_URL`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGE_SENDER_ID`, `FIREBASE_APP_ID`, `FIREBASE_MEASUREMENT_ID`, `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_PROTOCOL`, `GOOGLE_STORAGE_BUCKET_*`

В workflow убраны Ethberry (регистрация в .npmrc и `ETHBERRY_API_KEY`). Если появятся другие приватные npm-пакеты из GitHub, в шаге «Install root dependencies» можно снова добавить в `.npmrc` registry и `//npm.pkg.github.com/:_authToken=${{ secrets.NPM_AUTH_TOKEN }}`.

## Deploy only changed services

Cloud Run обновляется целым образом контейнера, но можно **собирать и выкатывать только тот сервис, в чьих файлах были изменения** — так обновляются только изменённые части.

1. **Сравнение с уже задеплоенным состоянием**  
   Укажите git-ссылку на то, что сейчас задеплоено (тег или ветку), например тег после последнего деплоя:
   ```bash
   # один раз после успешного деплоя (опционально)
   git tag deployed/main-$(date +%Y%m%d)
   git push origin deployed/main-20260222
   ```

2. **Запуск деплоя только изменённого**  
   Из корня репозитория:
   ```bash
   chmod +x scripts/deploy-changed.sh
   ./scripts/deploy-changed.sh deployed/main-20260222
   ```
   Без аргумента скрипт сравнивает с `origin/main`.

   Скрипт по `git diff --name-only REF` решает:
   - изменения в `services/server/`, `Dockerfile.backend`, `packages/` → собирает и деплоит **coartmarket-api**;
   - изменения в `services/client/`, `Dockerfile.frontend`, `nginx.frontend.conf` → собирает клиент, образ и деплоит **coartmarket-frontend**;
   - изменения в `packages/` → пересобирает оба сервиса.

3. **Переменные окружения (опционально)**  
   - `GCLOUD_PROJECT` — проект (по умолчанию `custom-oasis-477218-v8`);
   - `GCLOUD_REGION` — регион (по умолчанию `europe-west4`);
   - `ARTIFACT_REPO` — репозиторий образов, например `europe-west4-docker.pkg.dev/custom-oasis-477218-v8/docker`.

4. **Первый запуск: Artifact Registry и Docker**  
   - В GCP: Artifact Registry → Create repository (тип Docker), например имя `docker`.
   - Привязка Docker к реестру:
     ```bash
     gcloud auth configure-docker europe-west4-docker.pkg.dev
     ```
   - Права сервисному аккаунту Cloud Run на чтение образов из этого репозитория.

## Policy
disableServiceAccountKeyCreation

