#!/usr/bin/env bash
# Деплой только тех сервисов, в чьих путях есть изменения относительно указанной ссылки (тег/ветка).
# Использование:
#   ./scripts/deploy-changed.sh [REF]
#   REF — git-ссылка (тег, ветка или коммит), с которой сравниваем изменения. По умолчанию: origin/main
#
# Пример: обновить только то, что изменилось относительно последнего деплоя
#   git tag deployed/main-$(date +%Y%m%d)   # один раз после деплоя
#   ./scripts/deploy-changed.sh deployed/main-20260201

set -e

PROJECT="${GCLOUD_PROJECT:-custom-oasis-477218-v8}"
REGION="${GCLOUD_REGION:-europe-west4}"
# Репозиторий образов (создайте в GCP: Artifact Registry -> Create repository, например docker)
ARTIFACT_REPO="${ARTIFACT_REPO:-europe-west4-docker.pkg.dev/${PROJECT}/docker}"

REF="${1:-origin/main}"

# Изменённые файлы относительно REF (если REF недоступен — все изменённые в рабочей копии)
if git rev-parse --verify "$REF" &>/dev/null; then
  CHANGED="$(git diff --name-only "$REF" 2>/dev/null || true)"
else
  echo "Ref $REF not found, using uncommitted + staged changes."
  CHANGED="$(git diff --name-only HEAD; git diff --name-only --cached)"
fi

deploy_api=0
deploy_frontend=0

while IFS= read -r line; do
  case "$line" in
    packages/*) deploy_api=1; deploy_frontend=1 ;;
    services/server/*|Dockerfile.backend|package.json|package-lock.json) deploy_api=1 ;;
    services/client/*|Dockerfile.frontend|nginx.frontend.conf) deploy_frontend=1 ;;
  esac
done <<< "$CHANGED"

if [[ -z "$CHANGED" ]]; then
  echo "No changes relative to $REF. Nothing to deploy."
  exit 0
fi

echo "Changes relative to $REF:"
echo "$CHANGED"
echo ""
echo "Will deploy: API=$deploy_api, Frontend=$deploy_frontend"
echo ""

if [[ "$deploy_api" -eq 0 && "$deploy_frontend" -eq 0 ]]; then
  echo "No changes in server or client paths. Exiting."
  exit 0
fi

# Сборка и деплой API
if [[ "$deploy_api" -eq 1 ]]; then
  echo "Building and deploying coartmarket-api..."
  IMAGE="${ARTIFACT_REPO}/coartmarket-api:$(date +%Y%m%d-%H%M%S)"
  docker build -f Dockerfile.backend -t "$IMAGE" .
  docker push "$IMAGE"
  gcloud run deploy coartmarket-api \
    --image="$IMAGE" \
    --region="$REGION" \
    --project="$PROJECT"
  echo "coartmarket-api deployed."
fi

# Сборка и деплой Frontend (сначала собираем клиент)
if [[ "$deploy_frontend" -eq 1 ]]; then
  echo "Building client..."
  npm run build --workspace=@framework/client 2>/dev/null || (cd services/client && npm run build)
  echo "Building and deploying coartmarket-frontend..."
  IMAGE="${ARTIFACT_REPO}/coartmarket-frontend:$(date +%Y%m%d-%H%M%S)"
  docker build -f Dockerfile.frontend -t "$IMAGE" .
  docker push "$IMAGE"
  gcloud run deploy coartmarket-frontend \
    --image="$IMAGE" \
    --region="$REGION" \
    --project="$PROJECT"
  echo "coartmarket-frontend deployed."
fi

echo "Done."
