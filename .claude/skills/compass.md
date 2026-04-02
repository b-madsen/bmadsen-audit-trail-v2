---
name: compass
description: Recommend experience patterns, page archetypes, and Fabric components for what you're building
argument-hint: "\"description\" [--scaffold]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite
---

# /compass — Pattern Recommendation Engine

Compass tells you which direction to go before you start building. Describe what you need, and compass recommends the right experience architecture pattern, identifies existing prototypes to reference, and suggests the Fabric components you'll need.

## Initial Prompt

When invoked, **check for a description in the arguments:**

**If description provided:**
```
🧭 Compass locked on: "[description]"

Analyzing your needs against the Experience Architecture and Fabric component library...
```

**If `--scaffold` flag present:**
```
🧭 Compass locked on: "[description]"

I'll recommend a pattern AND scaffold the starter files for you.
```

**If no description:**
```
🧭 Compass ready. Tell me what you're building.

Describe your page or feature in plain language:
- "A settings page for notification preferences with email and SMS options"
- "A dashboard showing team performance metrics with drill-down"
- "An approval workflow where managers review and approve time-off requests"
- "A list view of all job openings with filters and bulk actions"

The more context, the better my recommendation.
```

**STOP and wait for description if not provided.**

---

## Workflow

### Step 1: Parse the Description

Extract key signals from the user's description:

**Content type signals:**
- "settings" / "preferences" / "configuration" → Settings archetype
- "dashboard" / "metrics" / "stats" / "overview" → Dashboard archetype
- "list" / "directory" / "browse" / "search" → List archetype
- "detail" / "profile" / "view" / "info" → Detail archetype
- "wizard" / "flow" / "steps" / "create" / "onboarding" → Wizard archetype
- "inbox" / "queue" / "requests" / "approvals" → Inbox archetype

**Interaction signals:**
- "form" / "edit" / "save" → Form components needed
- "table" / "sort" / "filter" → Table/DataGrid needed
- "modal" / "confirm" / "delete" → Modal patterns needed
- "tabs" / "sections" / "categories" → Navigation pattern needed
- "cards" / "tiles" / "grid" → Card-based layout
- "AI" / "suggestion" / "recommendation" → AI component patterns

**Scope signals:**
- "simple" / "quick" / "basic" → Minimal layout, fewer components
- "complex" / "full" / "comprehensive" → Full page with multiple sections
- "prototype" / "explore" / "experiment" → May suggest nebula mode

### Step 2: Load Context

Read the system references:
```
Read CLAUDE.md  (especially Experience Architecture Patterns section)
Read docs/fabric-component-reference.md
```

Scan existing prototypes for similar implementations:
```
Glob: src/pages/*/
```

Read the PrototypeIndex to understand what exists:
```
Read src/pages/PrototypeIndex/PrototypeIndex.tsx
```

### Step 3: Match to Archetype

Based on the parsed signals, determine the primary archetype and any secondary patterns:

#### Dashboard Archetype
**Signals**: metrics, stats, overview, summary, KPIs, charts
**Layout**:
```
PageCapsule
  PageHeaderV2 — title + action buttons
  Grid container (CSS Grid)
    Gridlet — stat cards (TileV2)
    Gridlet — data table
    Gridlet — chart/visualization
    Gridlet — action items / tasks
```
**Key components**: Gridlet, TileV2, Table, Pill, Avatar, InlineMessage (ai), ProgressBar
**Reference prototype**: `/home-template`

#### List/Directory Archetype
**Signals**: list, directory, browse, search, filter, people, employees
**Layout**:
```
PageCapsule
  PageHeaderV2 — title + "Add" button
  Tabs (filled) — view switchers (if multiple views)
  Section
    FilterBar — TextField (search) + SelectField (filters) + Button (clear)
    Table — sortable columns, pagination, row actions
    BlankState — when no results
```
**Key components**: Table, Tabs, TextField, SelectField, Button, Pill, Avatar, BlankState, Pagination
**Reference prototype**: `/people-template`, `/hiring`

#### Detail View Archetype
**Signals**: detail, profile, view, info, employee, record
**Layout**:
```
PageCapsule
  PageHeaderV2 — entity name + status + actions
  Tabs (filled or lined) — content sections
  Section (per tab)
    NameValuePair — read-only data
    InlineMessage — contextual guidance
    Table — related records
```
**Key components**: Tabs, Section, NameValuePair, Avatar, Badge, Pill, Button, Table
**Reference prototype**: `/my-info`, `/job-opening-detail`

#### Settings Archetype
**Signals**: settings, preferences, configuration, options, account
**Layout**:
```
PageCapsule
  PageHeaderV2 — "Settings"
  SideNavigation — setting categories
    Section (per category)
      form fields (TextField, SelectField, RadioGroup, CheckboxGroup, RoundedToggle)
      InlineMessage — guidance
    ActionFooter — Save / Cancel
```
**Key components**: SideNavigation, Section, TextField, SelectField, RadioGroup, CheckboxGroup, RoundedToggle, Checkbox, ActionFooter, Button, TextButton
**Reference prototype**: `/settings`

#### Wizard/Flow Archetype
**Signals**: wizard, flow, steps, create, onboard, multi-step, process
**Layout**:
```
PageCapsule
  HorizontalWizard or VerticalWizard
    Step 1 — Section with form fields
    Step 2 — Section with choices
    Step N — Section with review/confirm
  ActionFooter — Previous / Continue / Submit
```
**Key components**: HorizontalWizard/VerticalWizard, Section, form components, ActionFooter, Button, TextButton, ProgressBar
**Reference prototype**: `/create-job-opening`

#### Inbox/Queue Archetype
**Signals**: inbox, queue, requests, approvals, tasks, messages
**Layout**:
```
PageCapsule
  PageHeaderV2 — "Inbox" + filter buttons
  SideNavigation — item list (compact density)
    Section — selected item detail
      Content specific to item type
      ActionFooter or inline actions — Approve / Deny / etc.
```
**Key components**: SideNavigation (compact), Section, Badge, Pill, Button, InlineMessage, Avatar, ActionFooter
**Reference prototype**: `/inbox`

### Step 4: Recommend Components

Based on the archetype and the specific description, build a component shopping list:

```markdown
## Recommended Components

### Layout
| Component | Purpose | Configuration |
|-----------|---------|---------------|
| PageCapsule | Page wrapper | -- |
| PageHeaderV2 | Title + actions | title="...", actions=[...] |
| Section | Content areas | header, title="..." |

### Navigation
| Component | Purpose | Configuration |
|-----------|---------|---------------|
| [nav component] | [purpose] | [props] |

### Content
| Component | Purpose | Configuration |
|-----------|---------|---------------|
| [component] | [purpose] | [key props] |

### Forms (if applicable)
| Component | Purpose | Configuration |
|-----------|---------|---------------|
| [component] | [purpose] | [key props] |

### Feedback
| Component | Purpose | Configuration |
|-----------|---------|---------------|
| [component] | [purpose] | [key props] |
```

### Step 5: Identify Reference Prototypes

Find the closest existing prototypes:

```
| Prototype | Path | Relevance | What to Reference |
|-----------|------|-----------|------------------|
| [name] | /[path] | High | [specific aspect to study] |
| [name] | /[path] | Medium | [specific aspect to study] |
```

### Step 6: Generate Recommendation

Present the complete recommendation:

````
## 🧭 Compass Recommendation

### Your Request
"[user's description]"

### Recommended Archetype: [Archetype Name]

**Why this pattern fits:**
[1-2 sentences explaining the match]

### Page Layout
```
[ASCII layout diagram with specific Fabric components]
```

### Components You'll Need

**Layout & Structure:**
- PageCapsule
- PageHeaderV2 — title="[suggested]", actions=[suggested buttons]
- [additional layout components]

**Content:**
- [component list with brief usage notes]

**Forms (if applicable):**
- [component list]

**Feedback:**
- [component list]

### Reference Prototypes

Study these existing pages for implementation patterns:

| Prototype | Path | What to Reference |
|-----------|------|------------------|
| [name] | [path] | [specific aspect] |

### Gotchas for This Pattern

Based on the CLAUDE.md rules, watch out for:
- [relevant gotcha for this archetype]
- [relevant gotcha for this archetype]

### Microcopy Reminders
- Page title → Title Case (e.g., "Team Performance")
- Section headers → Title Case
- Tab labels → Title Case, 1–2 words max
- Button labels → Title Case, specific actions (never "Click Here")
- Modal titles → Sentence case
- Placeholder text → Sentence case
- Error messages → Explain problem + provide solution
- Spacing → 4px grid multiples only

### Suggested File Structure
```
src/pages/[SuggestedName]/
├── [SuggestedName].tsx
├── [SuggestedName].css
└── index.ts
```
````

### Step 7: Scaffold (if `--scaffold`)

If the `--scaffold` flag is present, generate the starter files:

#### 7a. Create page directory

```bash
mkdir -p src/pages/[SuggestedName]
```

#### 7b. Generate page component

Create a minimal but correct page component with:
- All recommended Fabric imports
- Correct layout structure for the archetype
- Placeholder content in each section
- TODO comments marking where the user should add their specific content
- Proper TypeScript types

```tsx
import { useState } from 'react';
import {
  PageCapsule,
  PageHeaderV2,
  Section,
  // ... recommended components
} from '@bamboohr/fabric';
import './[SuggestedName].css';

export function [SuggestedName]() {
  // TODO: Replace with your state management
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageCapsule>
      <PageHeaderV2 title="[Suggested Title]" />

      {/* TODO: Add your content sections */}
      <Section header title="[Section Name]">
        {/* TODO: Add content */}
      </Section>
    </PageCapsule>
  );
}

export default [SuggestedName];
```

#### 7c. Generate CSS file

```css
/* [SuggestedName].css — Layout styles only */
/* Fabric components handle their own styling. */
/* Only use CSS for flexbox/grid composition. */

/* TODO: Add layout styles as needed */
```

#### 7d. Generate exports and routing

- Create `index.ts` with named export
- Add lazy import to `App.tsx`
- Add Route to `App.tsx`
- Add entry to PrototypeIndex with status "in-progress"

#### 7e. Scaffold output

```
🧭 Compass + Scaffold complete!

**Created:**
- src/pages/[SuggestedName]/[SuggestedName].tsx (with Fabric layout scaffolded)
- src/pages/[SuggestedName]/[SuggestedName].css
- src/pages/[SuggestedName]/index.ts
- Updated App.tsx (route added)
- Updated PrototypeIndex (entry added)

**Your scaffold includes:**
- [N] Fabric components pre-imported
- [Archetype] layout structure in place
- TODO markers for your custom content

**Next steps:**
1. Run `npm run dev` and visit http://localhost:5173/[route]
2. Replace TODO sections with your content
3. Or run `/launch [Figma URL]` to populate from a design
```

---

## Tips

**Better descriptions get better recommendations:**
- ❌ "Build a page" → Too vague, compass can't narrow the archetype
- ✅ "A settings page for notification preferences with email and SMS options" → Clear archetype + specific components

**Compass + Launch is a power combo:**
1. `/compass "team performance dashboard"` — Get the archetype and layout
2. `/compass --scaffold "team performance dashboard"` — Get starter files
3. `/launch [Figma URL]` — Fill in the scaffolded structure from Figma

**When compass suggests multiple archetypes:**
Some features combine patterns (e.g., a dashboard with a settings sidebar). Compass will recommend a primary archetype with secondary patterns noted. Follow the primary for layout, borrow components from secondary as needed.
