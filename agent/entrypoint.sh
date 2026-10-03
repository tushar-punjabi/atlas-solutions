#!/usr/bin/env bash
set -euo pipefail

# CODEX_HOME is writable inside the container — the auth comes in read-only
mkdir -p "$CODEX_HOME"

if [ -f /mnt/codex-auth/auth.json ]; then
  cp /mnt/codex-auth/auth.json "$CODEX_HOME/auth.json"
  chmod 600 "$CODEX_HOME/auth.json"
fi

# Optional: carry over config.toml if you have one
if [ -f /mnt/codex-auth/config.toml ]; then
  cp /mnt/codex-auth/config.toml "$CODEX_HOME/config.toml"
fi

echo "[entrypoint] CODEX_HOME=$CODEX_HOME, auth seeded: $(ls -la $CODEX_HOME/auth.json 2>/dev/null || echo MISSING)"

exec /home/node/worker.sh
