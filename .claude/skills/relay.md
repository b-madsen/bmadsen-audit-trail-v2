---
name: relay
description: Generate handoff documentation for cross-team communication
argument-hint: "[path] [--for-eng] [--for-design]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite, mcp__playwright__*
---

# /relay — Generate Handoff Documentation

Relay passes a signal from one point to another without losing fidelity. It generates structured handoff artifacts — for engineering teams that need to implement, design teams that need to extend, or stakeholders who need to understand.

## Initial Prompt

When invoked, **check arguments:**

**If path provided with no audience flag:**
```
📡 Relay activated for [path].

Who is this handoff for?
1. **Engineering** (--for-eng) — Data structures, API shape, state management, component specs
2. **Design** (--for-design) — Pattern rationale, alternatives considered, extension points
3. **General** (default) — Full overview covering both perspectives

I'll generate documentation appropriate for the audience.
```

**If `--for-eng`:**
```
📡 Relay: Engineering handoff for [path].

Generating implementation specs, data structures, and component API documentation...
```

**If `--for-design`:**
```
📡 Relay: Design handoff for [path].

Generating pattern documentation, rationale, and extension guidelines...
```

**If no path:**
```
📡 Relay ready. Which page or component should I document?

Specify a path: `/relay src/pages/Hiring`
```

**STOP and wait for path if not provided.**

---

## Workflow

### Step 1: Analyze the Source

Read all files in the target directory:

```
Glob: [path]/**/*.tsx
Glob: [path]/**/*.css
Glob: [path]/**/*.ts
```

Build a complete understanding:

#### 1a. Component Tree

Map the full component hierarchy:
```
[PageName]
├── Header (uses: PageHeaderV2, Button, Dropdown)
├── FilterBar (uses: TextField, SelectField, Button)
├── ContentArea
│   ├── DataTable (uses: Table, Avatar, Pill, Button)
│   └── EmptyState (uses: BlankState)
└── Footer (uses: ActionFooter, Button, TextButton)
```

#### 1b. Fabric Component Inventory

```
Grep: pattern="from '@bamboohr/fabric'" in [path]/**/*.tsx
```

List every Fabric component used with exact prop configurations.

#### 1c. State Map

Identify all state management:
- `useState` hooks and their purpose
- `useEffect` hooks and their triggers
- Context providers/consumers
- Props passed between components
- Event handlers and their side effects

#### 1d. Data Shape

Extract mock data structures:
```
Glob: src/data/**/*.ts
Grep: pattern="interface|type " in [path]/**/*.tsx
```

Document the data types the page expects.

### Step 2: Capture Screenshots (if available)

If Playwright MCP is available and dev server is running:

```
mcp__playwright__browser_navigate(url="localhost:5173/[page-path]")
mcp__playwright__browser_take_screenshot(fullPage=true, filename="relay-overview.png")
```

For key interactive states (modal open, tab switched, hover state), capture additional screenshots.

### Step 3: Generate Handoff Document

#### General Handoff (default)

```markdown
# Relay Handoff: [PageName]
Generated: [date]

## Overview
[2-3 sentence description of what this page does and its role in the product]

## Screenshots
![Overview](relay-overview.png)
[Additional state screenshots if captured]

## Page Architecture
- **Archetype**: [Dashboard/List/Detail/Settings/Wizard/Inbox]
- **Navigation**: [Global → Section → Sub-section path]
- **Layout**: [ASCII diagram]

```
PageCapsule
  PageHeaderV2 — "[title]"
  [layout description]
```

## Component Inventory

| Component | Fabric Source | Purpose | Key Props |
|-----------|-------------|---------|-----------|
| [name] | Button | Primary action | type="primary", size="medium" |
| [name] | Table | Employee list | sortable, paginated |

## Interaction Map

| Trigger | Action | Result |
|---------|--------|--------|
| Click "Add Employee" | Opens Modal | Modal with form fields |
| Submit form | POST to API | Slidedown confirmation, table refresh |
| Click table row | Navigate | Goes to /employee/[id] |

## Data Requirements

```typescript
interface Employee {
  id: string;
  name: string;
  department: string;
  status: 'active' | 'inactive';
  startDate: string;
}
```

## State Management

| State | Type | Initial | Modified By |
|-------|------|---------|-------------|
| employees | Employee[] | fetched on mount | add/delete actions |
| selectedTab | string | 'all' | tab click |
| isModalOpen | boolean | false | button click |

## Files

| File | Purpose |
|------|---------|
| [PageName].tsx | Main page component |
| [PageName].css | Layout styles |
| components/[...] | Sub-components |
```

#### Engineering Handoff (`--for-eng`)

Adds to the general handoff:

```markdown
## API Integration Points

| Endpoint | Method | Request | Response | Trigger |
|----------|--------|---------|----------|---------|
| /api/employees | GET | query params | Employee[] | Page load, filter change |
| /api/employees | POST | Employee (partial) | Employee | Form submit |
| /api/employees/:id | DELETE | -- | 204 | Confirm delete |

## Component API Specifications

### [ComponentName]

```typescript
interface [ComponentName]Props {
  // Required
  data: Employee[];
  onSelect: (id: string) => void;

  // Optional
  loading?: boolean;
  emptyMessage?: string;
}
```

**Behavior notes:**
- [specific implementation detail for eng]
- [edge case handling]
- [error state behavior]

## State Machine

```
IDLE → LOADING (on mount / filter change)
LOADING → LOADED (on API success)
LOADING → ERROR (on API failure)
LOADED → DELETING (on delete click + confirm)
DELETING → LOADED (on delete success, refresh list)
```

## Mock Data Location

Current mock data in: `src/data/[dataFile].ts`

Replace with API calls at these integration points:
1. [file:line] — Initial data fetch
2. [file:line] — Form submission
3. [file:line] — Delete action

## Accessibility Requirements

- [ ] Keyboard navigation through table rows (arrow keys)
- [ ] Screen reader announces table sort changes
- [ ] Modal traps focus
- [ ] Form error messages linked to fields via aria-describedby
```

#### Design Handoff (`--for-design`)

Adds to the general handoff:

```markdown
## Design Decisions & Rationale

### Layout Choice: [archetype]
**Why this pattern**: [rationale based on user needs, data shape, task flow]
**Alternatives considered**: [what else could work and why it wasn't chosen]

### Component Choices

| Decision | Choice | Rationale | Alternative |
|----------|--------|-----------|-------------|
| Employee list | Table (not cards) | Dense data, sortable columns needed | CardGrid for visual browsing |
| Status display | Pill (muted) | Multiple statuses visible at once | Badge for single-entity views |
| Primary action | Button in PageHeader | Most common task, needs visibility | ActionFooter for form contexts |

### Pattern Extensions

This page can be extended for similar use cases:
- **[Related feature]**: Same layout, swap data source and columns
- **[Variation]**: Add SideNavigation for filtering by category

### Design Tokens Used

| Token Category | Values | Purpose |
|---------------|--------|---------|
| text-neutral-x-strong | #38312f | Primary text |
| surface-neutral-xx-weak | -- | Section backgrounds |
| border-neutral-x-weak | -- | Dividers |

### Figma Reference

- Source design: [Figma URL if available]
- Fabric Library: [relevant component Figma links]
```

### Step 4: Output

Write the handoff document:

```bash
mkdir -p docs/handoffs
```

Save to `docs/handoffs/relay-[PageName]-[audience]-[date].md`

```
📡 Relay complete!

**Page**: [PageName]
**Audience**: [Engineering / Design / General]
**Document**: docs/handoffs/relay-[PageName]-[audience]-[date].md

**Includes:**
- Component inventory ([N] Fabric components documented)
- Interaction map ([N] interactions)
- Data requirements ([N] types defined)
- State management ([N] state variables)
- [Audience-specific sections]

Share this document with the receiving team. For questions, reference the source files at [path].
```
