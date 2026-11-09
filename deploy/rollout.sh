#!/usr/bin/env bash
set -euo pipefail
cd "$HOME/apps/transchim"
export IMAGE_TAG="${1:?Image tag required}"
chmod 600 .env.production
trap 'rm -f image.tar.gz' EXIT
docker load -i image.tar.gz
docker network inspect web-gateway >/dev/null
docker compose -f compose.yml config --quiet
docker compose -f compose.yml up -d --no-build
for attempt in $(seq 1 30); do
  if docker compose -f compose.yml exec -T web node -e "fetch('http://127.0.0.1:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then
    printf 'IMAGE_TAG=%s\n' "$IMAGE_TAG" > .image.env
    exit 0
  fi
  sleep 2
done
docker compose -f compose.yml logs --tail=60
exit 1
