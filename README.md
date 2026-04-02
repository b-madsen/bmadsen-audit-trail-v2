# Product Sandbox

A mirror of BambooHR's product UI built with the Fabric Design System. Use this as a playground to create prototypes, test new features, and ideate — all without touching production code.

The sandbox comes pre-loaded with working prototype pages (Home, People, Hiring, Payroll, Settings, etc.) that mirror real product screens. Build on top of them, remix them, or use them as reference for your own ideas.

---

## Quick Start

> Everyone has Claude Code — it can help you with any of these steps. Just ask it!

### 1. Clone and install

```bash
git clone https://github.com/BambooHR/product-sandbox.git
cd product-sandbox
npm install
```

If `npm install` fails, make sure `NPM_TOKEN` is set in your `~/.zshrc`.

### 2. Create your branch

```bash
git checkout -b yourname
git push -u origin yourname
```

### 3. Start building

```bash
npm run dev
```

Visit **http://localhost:5173** to see the prototype pages. Open Claude Code and start building!

---

## Branching Workflow

Feature branches are never merged into `main` — they exist as standalone explorations.

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

### Day-to-day workflow

1. **Create feature branches** off your personal branch for each idea:
   ```bash
   git checkout yourname
   git checkout -b yourname/descriptive-feature-name
   ```

2. **Work and push.** No PRs needed — these branches are your workspace.

3. **Want to improve the shared template?** Create a branch off `main` and open a PR:
   ```bash
   git checkout main
   git checkout -b template/your-improvement-name
   ```

### Key rules

- **Feature branches are never merged into `main`** — they live as standalone explorations
- **`main` is the shared template** — only template improvements get merged via PR
- **Branch off your personal branch** for features, not directly off `main`

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
