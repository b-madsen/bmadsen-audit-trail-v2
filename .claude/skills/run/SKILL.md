---
name: run
description: Start (or reuse) the local Vite dev server for this repo
allowed-tools: Bash, Read
---

# /run — Dev Server Launcher

Gets `npm run dev` up fast. Known issue in this environment: the `preview_start` MCP
tool spawns Node in a sandbox that throws `EPERM: process.cwd failed with error
operation not permitted, uv_cwd` for this repo's path. Don't retry `preview_start` —
go straight to the shell.

## Step 1: Check for an already-running server

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173
```

If this returns `200`, the server is already up — **do not start a new one**. Report
the existing URL (`http://localhost:5173/`) and stop. Vite's HMR picks up file edits
and branch checkouts live; a restart is only needed after `package.json` or
`vite.config.ts` changes.

## Step 2: Start it if nothing's running

```bash
npm run dev > /tmp/vite-dev.log 2>&1 &
disown
sleep 2
cat /tmp/vite-dev.log
```

Confirm the log shows `VITE ... ready in`. Report `http://localhost:5173/` as the
preview URL.

## Limitation

Because this bypasses `preview_start`, the server has no registered `serverId` —
`preview_screenshot`, `preview_click`, `preview_snapshot`, `preview_console_logs`,
etc. can't attach to it. If browser-driven verification is needed, say so explicitly
rather than silently skipping it; don't burn time retrying `preview_start` to get
those tools working.
