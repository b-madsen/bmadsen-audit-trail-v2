# Product Sandbox

A mirror of BambooHR's product UI built with the Fabric Design System. Use this as a playground to create prototypes, test new features, and ideate — all without touching production code.

The sandbox comes pre-loaded with working prototype pages (Home, People, Hiring, Payroll, Settings, etc.) that mirror real product screens. Build on top of them, remix them, or use them as reference for your own ideas.

---

## Getting Started

### Prerequisites

- **Node.js** (v18+) and **npm**
- Access to BambooHR's private npm registry (for `@bamboohr/fabric` packages)

### 1. Clone the repo

```bash
git clone https://github.com/BambooHR/product-sandbox.git
cd product-sandbox
```

### 2. Configure your NPM token

The project needs access to BambooHR's private Fabric packages. Set the `PACKAGECLOUD_NPM_TOKEN` environment variable:

```bash
# Get your token from Vault
vault login -method=oidc -path=okta -address="https://vault.bamboohr.io"
export PACKAGECLOUD_NPM_TOKEN=$(vault kv get -field=NPM_TOKEN -address="https://vault.bamboohr.io" shared-product-development/builder)
```

To persist the token across terminal sessions, add the `export` line to your `~/.zshrc` or `~/.bashrc`.

### 3. Install dependencies

```bash
npm install
```

If you're on macOS and get Gatekeeper warnings, run:

```bash
xattr -rd com.apple.quarantine node_modules 2>/dev/null
```

### 4. Start the dev server

```bash
npm run dev
```

Visit **http://localhost:5173** to browse all prototype pages.

---

## Branching Workflow

This repo uses a specific branching strategy. Feature branches are never merged into `main` — they exist as standalone explorations.

### How it works

```
main                          ← the shared template (kept clean)
├── josh                      ← Josh's personal branch
│   ├── josh/ai-chat-panel    ← a feature exploration
│   └── josh/new-onboarding   ← another feature exploration
├── sarah                     ← Sarah's personal branch
│   ├── sarah/payroll-v2      ← a feature exploration
│   └── sarah/dark-mode       ← another feature exploration
└── ...
```

### Step 1: Create your personal branch

Branch off `main` with your name. This is your home base.

```bash
git checkout main
git pull origin main
git checkout -b yourname
git push -u origin yourname
```

### Step 2: Create feature branches for each idea

For each prototype or experiment, branch off your personal branch:

```bash
git checkout yourname
git checkout -b yourname/descriptive-feature-name
git push -u origin yourname/descriptive-feature-name
```

### Step 3: Work and push

Make your changes, commit, and push. No PRs needed — these branches are your workspace.

```bash
git add .
git commit -m "Add initial payroll dashboard prototype"
git push
```

### Improving the template

If you build something that should be part of the shared template for everyone (e.g., a new base page, a bug fix, or an improvement to the setup), create a PR into `main`:

```bash
git checkout main
git pull origin main
git checkout -b template/your-improvement-name
# make your changes
git push -u origin template/your-improvement-name
# then open a PR targeting main
```

### Key rules

- **Feature branches are never merged into `main`** — they live as standalone explorations
- **`main` is the shared template** — only improvements to the template itself get merged in via PR
- **Branch off your personal branch** for features, not directly off `main`
- **Use descriptive branch names** so others can browse your work

---

## What's Inside

### Prototype Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/home-template` | Dashboard with Gridlets, stats, and avatar header |
| People | `/people-template` | Employee directory with list/grid views and org chart |
| Hiring | `/hiring` | Candidate pipeline with tabs and data tables |
| Payroll | `/payroll` | Stats cards, reminders, and data grid |
| Profile | `/my-info` | Employee profile with tabbed sections |
| Settings | `/settings` | Settings forms and account info |
| Reports | `/reports-template` | Analytics, charts, and filters |
| Create Job Opening | `/create-job-opening` | Wizard flow with AI generation |
| Job Opening Detail | `/job-opening-detail` | Detail view with pipeline stages |
| Files | `/files` | File management with sidebar navigation |
| New Employee | `/new-employee` | Onboarding checklist and task cards |
| Inbox | `/inbox` | Sidebar navigation with request list |

### Claude Code Skills

This repo includes Claude Code skills (in `.claude/skills/`) that automate common workflows. Run `/basecamp` to get oriented, or see the full list in `CLAUDE.md`.

### Tech Stack

- **React 18** + **TypeScript**
- **Vite** for dev server and builds
- **BambooHR Fabric** design system (`@bamboohr/fabric`)
- **React Router** for page navigation

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` fails with 401/403 | Your NPM token is missing or expired. Re-run the Vault commands above. |
| macOS "cannot verify developer" dialog | Run `xattr -rd com.apple.quarantine node_modules` |
| Port 5173 already in use | Kill the other process or run `npm run dev -- --port 5174` |
| Fabric components not rendering | Make sure `@bamboohr/fabric` installed successfully — check for errors in `npm install` output |

Need help? Ask in **#pathfinder-design** on Slack.
