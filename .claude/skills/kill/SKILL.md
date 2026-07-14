---
name: kill
description: Stop the local Vite dev server for this repo
allowed-tools: Bash
---

# /kill — Dev Server Stopper

Companion to `/run`. Stops whatever Vite dev server is running for this repo.

## Step 1: Find listening processes

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E ':(5173|5174|4173)'
```

If nothing matches, report that no dev server is running and stop.

## Step 2: Kill them

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E ':(5173|5174|4173)' | awk '{print $2}' | sort -u | xargs kill
```

## Step 3: Confirm

```bash
lsof -nP -iTCP -sTCP:LISTEN | grep -E ':(5173|5174|4173)' || echo "stopped"
```

Report which port(s) were stopped. If a process refuses to die (still listed after
Step 3), retry with `kill -9` on that PID rather than silently giving up.
