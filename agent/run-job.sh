#!/usr/bin/env bash
set -euo pipefail

ID="$1"
JOB="/jobs/processing-$ID.json"
TASK=$(jq -r '.task' "$JOB")
CHANNEL=$(jq -r '.channel' "$JOB")
THREAD=$(jq -r '.thread_ts // ""' "$JOB")

REPO="tushar-punjabi/atlas-solutions"
BRANCH="ai/$ID"
WORKDIR="/tmp/atlas-$ID"
CLONE_URL="https://x-access-token:${AGENT_GITHUB_TOKEN}@github.com/${REPO}.git"

log() { echo "[$ID] $*"; }

log "task: $TASK"

# Fresh clone
rm -rf "$WORKDIR"
git clone --depth=50 "$CLONE_URL" "$WORKDIR"
cd "$WORKDIR"
git checkout -b "$BRANCH"
git config user.email "agent@atlas.local"
git config user.name "Atlas Agent"

# Compose the prompt from AGENTS.md + task
PROMPT="$(cat /home/node/AGENTS.md)

---

Task: $TASK

Rules:
- Keep the diff under 200 lines.
- Do not modify .env*, .github/, bot/, _legacy/, vercel.json, or package.json dependencies.
- Add or update tests for new behavior.
- Do not add new dependencies unless the task explicitly requires it.
- Run pnpm typecheck && pnpm lint && pnpm test before declaring done."

# Run Codex non-interactively
codex exec \
  --dangerously-bypass-approvals-and-sandbox \
  --json \
  --output-last-message /tmp/codex-last-$ID.txt \
  -C "$WORKDIR" \
  "$PROMPT" \
  < /dev/null \
  > /tmp/codex-stream-$ID.jsonl \
  2> /tmp/codex-stderr-$ID.log \
  || { log "codex exec failed — see /tmp/codex-stream-$ID.jsonl"; exit 1; }

# Guard: reject forbidden paths
if git status --porcelain | awk '{print $2}' | grep -E '^(\.env|\.github/|bot/|_legacy/|vercel\.json)' ; then
  log "agent touched a forbidden path — aborting"
  exit 1
fi

# Diff-size guard
LINES=$(git diff --numstat | awk '{s+=$1+$2} END {print s+0}')
if [ "$LINES" -gt 400 ]; then
  log "diff too large ($LINES lines) — aborting"
  exit 1
fi

# Verify everything the CI will run
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build

# Commit
git add -A
git commit -m "ai($ID): $TASK" || { log "nothing to commit"; exit 1; }
git push -u origin "$BRANCH"

# Open draft PR
PR_URL=$(gh pr create \
  --repo "$REPO" \
  --base main \
  --head "$BRANCH" \
  --draft \
  --title "ai: $TASK" \
  --body "Automated by Atlas agent via Codex CLI (ChatGPT Plus OAuth).

**Job:** \`$ID\`
**Task:** $TASK

Review with the checklist in \`#ai-review\`." \
  --json url -q .url)

log "PR: $PR_URL"

# Notify the bot
curl -s -X POST "http://atlas-bot:3000/agent-result" \
  -H "Content-Type: application/json" \
  -d "{\"id\":\"$ID\",\"ok\":true,\"pr\":\"$PR_URL\",\"channel\":\"$CHANNEL\",\"thread\":\"$THREAD\"}" || true
