---
name: basecamp
description: New designer onboarding — environment setup, orientation, and first build
argument-hint: "[--verify]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite
---

# /basecamp — Designer Onboarding

Basecamp is where you prepare before the climb. It gets new designers set up in the Fabric prototyping environment, oriented to the tools and patterns, and building their first page — all in one guided session.

## Initial Prompt

When invoked:

**Full onboarding (default):**
```
🏔️ Welcome to Basecamp!

I'll get you set up in the Fabric prototyping environment step by step:

1. ✅ Verify your environment
2. 📂 Tour the project structure
3. 🛠️ Introduce the Mission Control skills
4. 🌿 Create your first branch
5. 🚀 Scaffold your first page

Let's start by checking your setup...
```

**If `--verify`:**
```
🏔️ Basecamp: Environment verification only.

Checking your setup...
```

---

## Workflow

### Phase 1: Environment Verification

#### 1a. Check Node.js

```bash
node --version
```

**Pass**: v18.0.0 or higher
**Fail**: Instruct user to install Node.js 18+ from https://nodejs.org

#### 1b. Check npm

```bash
npm --version
```

**Pass**: v9.0.0 or higher

#### 1c. Check project dependencies

```bash
ls node_modules/@bamboohr/fabric/package.json 2>/dev/null
```

If missing:
```bash
npm install
```

Verify installation succeeded:
```bash
ls node_modules/@bamboohr/fabric/dist/cjs/ | head -20
```

#### 1d. Check dev server

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173
```

**Pass**: Returns 200
**Fail**: Check for port conflicts, suggest `npx kill-port 5173`

#### 1e. Check Git

```bash
git --version
git remote -v
git branch --show-current
```

Verify repo is properly configured with a remote.

#### 1f. Check Claude Code

```bash
which claude
claude --version 2>/dev/null
```

#### 1g. Check MCP Servers

```bash
# Check if Figma Desktop MCP is available
claude mcp list 2>/dev/null | grep -i figma
```

Note which MCP servers are configured. Figma Desktop MCP is needed for `/launch`, Playwright MCP for `/orbit`.

#### Verification Report

```
🏔️ Environment Check
═══════════════════

| Component | Status | Version/Notes |
|-----------|--------|---------------|
| Node.js | ✅ | v20.11.0 |
| npm | ✅ | v10.2.0 |
| Fabric | ✅ | Installed (160+ components) |
| Dev server | ✅ | Running at localhost:5173 |
| Git | ✅ | Connected to [remote] |
| Claude Code | ✅ | v[version] |
| Figma MCP | ✅/⚠️ | [status] |
| Playwright MCP | ✅/⚠️ | [status] |

[If any failures, provide fix instructions before continuing]
```

**If `--verify`, stop here.**

---

### Phase 2: Project Tour

#### 2a. Project Structure Overview

```
Read README.md
```

Present the structure visually:

```
📂 Project Structure
═══════════════════

fabric-claude-env/
├── 📄 CLAUDE.md              ← Design system rules (Claude reads this automatically)
├── 📄 README.md              ← Project overview
├── 📂 docs/                  ← Reference documentation
│   ├── fabric-component-reference.md   ← Full component API
│   └── fabric-components-links.md      ← Storybook/Figma/Docs links
├── 📂 src/
│   ├── 📂 pages/             ← All prototype pages (your work goes here)
│   │   ├── HomeTemplate/     ← Dashboard example
│   │   ├── Settings/         ← Settings form example
│   │   ├── Hiring/           ← List view example
│   │   └── ...               ← 12 total reference prototypes
│   ├── 📂 components/        ← Shared reusable components
│   ├── 📂 data/              ← Mock data files
│   ├── 📂 assets/            ← Images and static files
│   ├── App.tsx               ← Router (you'll add routes here)
│   └── index.css             ← Global styles and design tokens
└── 📂 node_modules/
    └── @bamboohr/fabric/     ← The Fabric component library (160+ components)
```

#### 2b. Key Files to Know

```
**Files you'll work with:**
- src/pages/[YourPage]/      ← Where you create new prototypes
- src/App.tsx                ← Add routes for new pages
- src/data/                  ← Add mock data here

**Files Claude reads automatically:**
- CLAUDE.md                  ← Design system rules and patterns
- docs/fabric-component-reference.md  ← Component API reference

**Files you should reference:**
- docs/fabric-components-links.md     ← Quick links to Storybook/Figma/Docs
```

#### 2c. Existing Prototypes

```
Read src/pages/PrototypeIndex/PrototypeIndex.tsx
```

List all existing prototypes:

```
📋 Existing Prototypes (visit at localhost:5173)
════════════════════════════════════════════════

| Page | URL | Good Example Of |
|------|-----|-----------------|
| Home | /home-template | Dashboard layout, Gridlets, TileV2 |
| Settings | /settings | Settings form, SideNavigation |
| Hiring | /hiring | List view, Tabs, Table |
| People | /people-template | Directory, multiple views |
| Profile | /my-info | Detail view, Tabs, forms |
| Inbox | /inbox | Queue pattern, sidebar + detail |
| Create Job | /create-job-opening | Wizard flow, multi-step |
| ... | ... | ... |

Browse these for reference before building your own. The source files are in src/pages/.
```

---

### Phase 3: Mission Control Skills Introduction

```
🛠️ Mission Control Skills
═══════════════════════════

These are your AI-powered tools for building with Fabric:

**Building:**
┌─────────────────────────────────────────────────────────┐
│ /launch [Figma URL]     Build a page from Figma design  │
│ /launch --nebula        Build with raw React (explore)   │
│ /compass "description"  Get pattern recommendations      │
│ /compass --scaffold     Get recommendations + starter    │
└─────────────────────────────────────────────────────────┘

**Testing:**
┌─────────────────────────────────────────────────────────┐
│ /orbit [URL]            Full visual QA + compliance      │
│ /orbit --scan           Code-only compliance audit       │
└─────────────────────────────────────────────────────────┘

**Submitting:**
┌─────────────────────────────────────────────────────────┐
│ /beacon                 Package work for system review   │
│ /countdown              Pre-merge go/no-go checklist     │
│ /countdown --fix        Auto-fix + checklist             │
└─────────────────────────────────────────────────────────┘

**Converting:**
┌─────────────────────────────────────────────────────────┐
│ /dock [path]            Convert prototype → production   │
│ /dock --plan-only       See migration plan first         │
└─────────────────────────────────────────────────────────┘

**Documenting:**
┌─────────────────────────────────────────────────────────┐
│ /relay [path]           Generate handoff documentation   │
│ /relay --for-eng        Engineering-focused handoff      │
│ /relay --for-design     Design-focused handoff           │
└─────────────────────────────────────────────────────────┘

**System Health (Design Ops):**
┌─────────────────────────────────────────────────────────┐
│ /survey                 Repo-wide compliance audit       │
│ /telemetry              Adoption analytics & health      │
└─────────────────────────────────────────────────────────┘

**Typical workflow:**
/compass → /launch → /orbit → /beacon → /countdown → merge
```

---

### Phase 4: Create First Branch

```bash
# Make sure we're on main and up to date
git checkout main
git pull origin main
```

Ask the user for their prototype name and initials:

```
🌿 Let's create your branch.

What are you building? (e.g., "benefits-enrollment", "team-overview")
What are your initials? (e.g., "sm", "jd")

I'll create: feature/prototype-[name]-[initials]
```

**STOP and wait for user input.**

Once provided:

```bash
git checkout -b feature/prototype-[name]-[initials]
```

```
✅ Branch created: feature/prototype-[name]-[initials]
```

---

### Phase 5: First Page Scaffold

Offer the user a choice:

```
🚀 Let's scaffold your first page. How do you want to start?

1. **From Figma** — I'll run /launch with your Figma URL
2. **From a description** — I'll run /compass to recommend a pattern
3. **From scratch** — I'll create the empty file structure

Which approach?
```

**STOP and wait for user choice.**

#### Option 1: From Figma
→ Hand off to `/launch` skill

#### Option 2: From description
→ Hand off to `/compass --scaffold` skill

#### Option 3: From scratch

Ask for page name, then create the file structure:

```bash
mkdir -p src/pages/[PageName]
```

Create `[PageName].tsx`:
```tsx
import { Section, Headline, BodyText } from '@bamboohr/fabric';
import './[PageName].css';

export function [PageName]() {
  return (
    <Section>
      <Headline size="large">[Page Title]</Headline>
      <BodyText size="medium">
        Start building here. Use Fabric components from @bamboohr/fabric.
      </BodyText>
    </Section>
  );
}

export default [PageName];
```

Create `[PageName].css`:
```css
/* [PageName] — Layout styles only */
/* Fabric components handle their own styling. */
```

Create `index.ts`:
```ts
export { [PageName] } from './[PageName]';
```

Update `App.tsx` with lazy import and route.

Update PrototypeIndex with new entry (status: "in-progress").

```
✅ Page scaffolded!

Files created:
- src/pages/[PageName]/[PageName].tsx
- src/pages/[PageName]/[PageName].css
- src/pages/[PageName]/index.ts
- Updated App.tsx (route: /[route-path])
- Updated PrototypeIndex (status: in-progress)

View at: http://localhost:5173/[route-path]
```

---

### Phase 6: Orientation Complete

```
🏔️ ════════════════════════════════════════════
   BASECAMP COMPLETE — YOU'RE READY TO BUILD
   ════════════════════════════════════════════

   ✅ Environment verified
   ✅ Project structure understood
   ✅ Mission Control skills introduced
   ✅ Branch created: [branch name]
   ✅ First page scaffolded at /[route]

   **Quick reference:**
   - Build from Figma:    /launch [Figma URL]
   - Get recommendations: /compass "what I'm building"
   - Test compliance:     /orbit --scan
   - Submit for review:   /beacon
   - Pre-merge check:     /countdown

   **Resources:**
   - Storybook:    https://fabric.bamboohr.net
   - Weave Docs:   https://weave.bamboohr.net
   - Quick ref:    docs/designer-quick-reference.md
   - Slack:        #pathfinder-design

   **Just ask Claude naturally:**
   "Build me a settings form with notification preferences"
   "Create a dashboard with employee stats"
   "Add a modal for confirming a delete action"

   Claude will automatically use Fabric components and follow the design system.

   Ad Astra! 🚀
```
