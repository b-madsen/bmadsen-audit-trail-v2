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

If `npm install` fails, you likely need to set up your NPM token. Follow the **[NPM Token Setup Guide](https://docs.google.com/document/d/12ISyArJ-c2RUZTSmxNrZ80cY_a6r5MhswhF_Hr5bqgE/edit?tab=t.9clsvro19kug)** to retrieve your token from the vault and configure it in your `~/.zshrc`.

### 2. Create your team branch

```bash
git checkout main
git checkout -b yourname/yourteam
git push -u origin yourname/yourteam
```

### 3. Start building

```bash
npm run dev
```

Visit the local URL shown in your terminal to see the prototype pages. Open Claude Code and start building!

---

## Branching Workflow

Branches are organized in three levels: **your name → your team → your iterations**.

```
main                                     ← shared template (don't commit directly)
└── josh/hiring                          ← Josh's Hiring team base
    ├── josh/hiring/ai-screening         ← iteration (merges back into josh/hiring)
    ├── josh/hiring/pipeline-redesign    ← iteration (merges back into josh/hiring)
    └── josh/hiring/offer-letter-flow    ← iteration (merges back into josh/hiring)
└── josh/payroll                         ← Josh's Payroll team base
    ├── josh/payroll/tax-summary-v2      ← iteration
    └── josh/payroll/run-history         ← iteration
└── kelly/performance                    ← Kelly's Performance team base
    └── ...
```

### Team branches

Your team branch is your persistent workspace. Add team-specific customizations here that you'll reuse across iterations.

```bash
git checkout main
git checkout -b yourname/yourteam
```

### Iteration branches

For each prototype or exploration, branch off your team branch. When you're done, merge it back. Iteration branches auto-delete after merge.

```bash
git checkout yourname/yourteam
git checkout -b yourname/yourteam/descriptive-name
# ... do your work ...
# merge back into your team branch when done
```

### Pulling template updates (optional)

If improvements are made to `main` and you want them in your team branch:

```bash
git checkout yourname/yourteam
git merge main
```

### Contributing to the template

If you build something that everyone should have — a new base page, a shared component, a useful skill — you can contribute it back to `main`:

1. Create a branch off `main`: `git checkout -b template/your-improvement-name`
2. Make your changes
3. Open a PR — these get reviewed before merging

---

### Deploying Previews — *Coming Soon*

Share your prototype with others using the `/deploy` skill. It builds your branch and deploys a draft preview to Netlify with a single command.

```
/deploy
```

Each deploy creates a unique, unguessable draft URL you can share with your team. Old deploy sites are automatically cleaned up after 30 days.

#### One-Time Setup

Before your first deploy, you'll need to configure a Netlify auth token:

1. **Create a free Netlify account** at [netlify.com](https://www.netlify.com)
2. **Generate a personal access token:**
   - Go to **User Settings** → **Applications** → **Personal access tokens**
   - Click **New access token**, give it a name, and copy the value
3. **Save the token to your `~/.zshrc`:**
   ```bash
   echo 'export NETLIFY_AUTH_TOKEN=your_token_here' >> ~/.zshrc
   source ~/.zshrc
   ```
   For more details on configuring environment variables, see the [setup guide](https://docs.google.com/document/d/12ISyArJ-c2RUZTSmxNrZ80cY_a6r5MhswhF_Hr5bqgE/edit?tab=t.9clsvro19kug#bookmark=id.eajqc4volrhl).
4. **Log in to the Netlify CLI:**
   ```bash
   netlify login
   ```

That's it — you only need to do this once. After setup, just run `/deploy` in any Claude Code session.

### Tech Stack

- **React 18** + **TypeScript**
- **Vite** for dev server and builds
- **BambooHR Fabric** design system (`@bamboohr/fabric`)
- **React Router** for page navigation
