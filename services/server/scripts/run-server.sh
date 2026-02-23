#!/bin/sh
# Immediate stdout so Cloud Run shows at least one container log (not only system/probe).
echo "[run-server] Container entrypoint starting, PORT=${PORT:-not set}"
exec npm start
