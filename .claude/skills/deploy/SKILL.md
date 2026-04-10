---
name: deploy
description: Build and deploy a draft preview to Netlify
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Deploy to Netlify

Build the current prototype and deploy an authenticated draft preview to Netlify. The draft URL is a unique hash that is not discoverable or guessable.

## Prerequisites (one-time setup per laptop)

Before first use, the user must complete these setup steps in their terminal:

1. Create a free account at netlify.com
2. Generate a personal access token: App → User Settings → Applications → Personal access tokens
3. In your terminal, run: `export NETLIFY_AUTH_TOKEN=<your-token>` (or add to `~/.zshrc` for persistence)
4. Run: `netlify login`

Once setup is complete, this skill can be rerun as many times as needed. Each run creates a new draft URL for preview.

## Steps

### Step 1: Resolve node and npm paths

The Bash tool does not source `~/.zshrc`, so `node` and `npm` may not be in PATH. Detect them by checking these locations in order:

- `/usr/local/bin/node` and `/usr/local/bin/npm`
- `/opt/homebrew/bin/node` and `/opt/homebrew/bin/npm`
- Output of `command -v node` and `command -v npm`

Store the resolved paths as variables and use them for ALL subsequent commands. For example:

```bash
NODE="/usr/local/bin/node"
NPM="/usr/local/bin/npm"
```

If `npm` fails due to a `#!/usr/bin/env node` shebang issue, fall back to running vite directly:

```bash
$NODE ./node_modules/.bin/vite build
```

### Step 2: Resolve node_modules

Worktrees may not have their own `node_modules`. If `./node_modules` does not exist, walk up the directory tree to find it. Check:

- `./node_modules`
- `../../node_modules` (typical worktree parent)
- The main repo root's `node_modules`

If `node_modules` is found in a parent directory, either symlink it or set `NODE_PATH` accordingly.

### Step 3: Ensure .env has GENERATE_SOURCEMAP=false

Check if `.env` exists. If not, create it with `GENERATE_SOURCEMAP=false`. If it exists, ensure that line is present.

### Step 4: Ensure SPA redirect rule exists

Make sure `public/_redirects` exists with this content:

```
/*    /index.html   200
```

This tells Netlify to serve `index.html` for all routes so React Router works.

### Step 5: Build

Run the build using the resolved paths from Step 1:

```bash
PATH="<resolved-node-dir>:$PATH" $NPM run build
```

Or if npm has shebang issues:

```bash
$NODE ./node_modules/.bin/vite build
```

### Step 6: Verify no source maps

Check that zero `.map` files exist in `dist/`. If any are found, delete them before deploying.

### Step 7: Resolve auth token

Check for a Netlify auth token in this order:

1. `$NETLIFY_AUTH_TOKEN` environment variable
2. `~/Library/Preferences/netlify/config.json` — extract `users[userId].auth.token`
3. `~/.netlify/config.json` — same structure

If no token is found in any location, **STOP** and report:

> **Deploy failed: No Netlify auth token found.**
>
> Run this one-time setup in your terminal:
> 1. Create a free account at netlify.com
> 2. Generate a token: App → User Settings → Applications → Personal access tokens
> 3. Run: `export NETLIFY_AUTH_TOKEN=<your-token>` (add to `~/.zshrc` for persistence)
> 4. Run: `netlify login`

### Step 8: Clean up old deploy sites

Before creating a new site, clean up any old deploy sites from previous runs. List all sites on the account and delete any whose name starts with `ps-` that are older than 30 days:

```bash
curl -s "https://api.netlify.com/api/v1/sites?per_page=100" \
  -H "Authorization: Bearer $TOKEN" | \
  node -e "
    const sites = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
    const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
    sites.filter(s => s.name && s.name.startsWith('ps-') && new Date(s.created_at) < cutoff)
      .forEach(s => console.log(s.id + ' ' + s.name + ' ' + s.created_at));
  "
```

For each site returned, delete it:
```bash
curl -s -X DELETE "https://api.netlify.com/api/v1/sites/<site-id>" \
  -H "Authorization: Bearer $TOKEN"
```

This keeps the account clean automatically. If the cleanup step fails, continue with the deploy — don't block on cleanup errors.

### Step 9: Create a Netlify site

Create a new site via the Netlify REST API. The site name MUST follow this format:

**`ps-<short-hash>`** — e.g., `ps-a1b2c3d4`

Use a short random hash (8 characters from the current git commit SHA or a random hex string). This keeps the name short and avoids DNS label length limits (63 char max including the deploy hash prefix).

**CRITICAL: Do NOT use the branch name in the site name.** Branch names can be long and will cause DNS failures.

```bash
HASH=$(git rev-parse --short=8 HEAD)
SITE_NAME="ps-$HASH"
curl -s -X POST "https://api.netlify.com/api/v1/sites" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$SITE_NAME\"}"
```

Parse the response for the `id` field (the site ID). If the name is taken (409 conflict), append a random suffix: `ps-<hash>-<random4>`.

### Step 10: Deploy as draft

Use the Netlify CLI or API to deploy. Do NOT use `--prod` — draft deploys only.

**Option A — CLI (preferred):**
```bash
PATH="<resolved-node-dir>:$PATH" NETLIFY_AUTH_TOKEN=$TOKEN netlify deploy --dir=dist --site=<site-id>
```

If the CLI is not installed or fails, install it to a temp location:
```bash
PATH="<resolved-node-dir>:$PATH" $NPM install --prefix /tmp/netlify-cli netlify-cli
NETLIFY="/tmp/netlify-cli/node_modules/.bin/netlify"
PATH="<resolved-node-dir>:$PATH" NETLIFY_AUTH_TOKEN=$TOKEN $NETLIFY deploy --dir=dist --site=<site-id>
```

If the CLI has shebang issues, invoke through node:
```bash
$NODE $NETLIFY deploy --dir=dist --site=<site-id>
```

**Option B — REST API fallback (if CLI fails entirely):**
```bash
cd dist && zip -r /tmp/deploy.zip .
curl -s -X POST "https://api.netlify.com/api/v1/sites/<site-id>/deploys" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @/tmp/deploy.zip
```

Parse the response for the deploy URL.

### Step 11: Validate the deploy (MANDATORY)

Parse the output for a draft URL. The URL should contain a hash prefix (e.g., `69d95d60--ps-a1b2c3d4.netlify.app`).

If no draft URL was produced, **STOP** and report:

> **Deploy failed: No draft URL was returned.**
>
> Check the error output above. Common causes:
> - Invalid or expired auth token — regenerate at App → User Settings → Applications
> - Site not found — the site may have been deleted on Netlify

Do NOT give the user a URL unless the deploy succeeded and returned a valid draft URL.

### Step 12: Return the draft URL and build logs

Only if Step 11 passed, give the user:
- **Website Draft URL**
- **Build logs URL** (from the CLI output, or construct as `https://app.netlify.com/projects/<site-name>/deploys/<deploy-id>`)

Do NOT use `--prod`. The default (no `--prod` flag) creates a draft deploy, which is what we want.
