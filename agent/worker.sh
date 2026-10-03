#!/usr/bin/env bash
set -euo pipefail

QUEUE=/jobs/queue
PROCESSING=/jobs
DONE=/jobs/done
FAILED=/jobs/failed
LOG=/jobs/logs

mkdir -p "$QUEUE" "$DONE" "$FAILED" "$LOG"

echo "[worker] starting, watching $QUEUE"

while true; do
  for jobfile in "$QUEUE"/*.json; do
    [ -e "$jobfile" ] || continue

    id=$(basename "$jobfile" .json)
    echo "[worker] picked up $id"

    if ! mv "$jobfile" "$PROCESSING/processing-$id.json" 2>/dev/null; then
      continue
    fi

    if /home/node/run-job.sh "$id" >"$LOG/$id.log" 2>&1; then
      mv "$PROCESSING/processing-$id.json" "$DONE/$id.json"
      echo "[worker] $id done"
    else
      mv "$PROCESSING/processing-$id.json" "$FAILED/$id.json"
      echo "[worker] $id failed — see $LOG/$id.log"
    fi
  done

  sleep 5
done
