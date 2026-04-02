---
name: dock
description: Convert nebula (prototype) code to production-ready Fabric components
argument-hint: "[path] [--plan-only]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite
---

# /dock — Convert Prototype to Production

Docking connects a free-floating prototype to the production system. It takes nebula code (raw React/CSS built with `/launch --nebula`) and rewrites it using Fabric design system components.

## Initial Prompt

When invoked, **check arguments:**

**If path provided:**
```
🔗 Docking initiated for [path]...

I'll analyze your prototype, map every custom element to its Fabric equivalent, and rewrite for production.
```

**If `--plan-only`:**
```
🔗 Docking plan requested for [path]...

I'll analyze and show you the full migration plan without making any changes.
```

**If no path provided:**
```
🔗 Ready to dock a prototype to the production system.

**Which prototype should I convert?**

Available prototypes in src/prototypes/:
[list directories]

Or specify a path: `/dock src/prototypes/MyPrototype`
```

**STOP and wait for path if not provided.**

---

## Workflow

### Step 1: Analyze Prototype

Read all files in the prototype directory:

```
Glob: [path]/**/*.tsx
Glob: [path]/**/*.css
Glob: [path]/**/*.ts
```

For each file, build an inventory:

#### 1a. Custom Element Inventory

Identify every UI element that is NOT from Fabric:

```
Grep: pattern="<button|<input|<select|<textarea|<dialog" in [path]/**/*.tsx
Grep: pattern="className=" in [path]/**/*.tsx  (to find custom styled elements)
Grep: pattern="font-size:|font-family:|color:|background|border-radius|box-shadow" in [path]/**/*.css
```

Build a mapping table:

```
| Custom Element | File:Line | Fabric Equivalent | Confidence |
|---------------|-----------|-------------------|------------|
| <button className="primary-btn"> | Header.tsx:24 | <Button type="primary"> | High |
| <input type="text" className="search"> | Search.tsx:8 | <TextField label="Search"> | High |
| <div className="card"> | Card.tsx:12 | <Section> or <TileV2> | Medium — needs context |
| <div className="modal-overlay"> | Modal.tsx:5 | <Modal size="medium"> | High |
| Custom font-size: 15px | styles.css:34 | <BodyText size="medium"> | High |
| Custom color: #2e7918 | styles.css:12 | token: text-primary-strong | High |
```

#### 1b. Layout Analysis

Identify the page structure:
- What layout pattern is used? (sidebar + content, tabs, wizard, dashboard grid)
- Map to the closest Fabric page archetype
- Identify navigation components

#### 1c. Interaction Inventory

List all interactive behaviors:
- Click handlers and their targets
- Form submissions
- State management patterns
- Navigation/routing
- Modal open/close triggers

### Step 2: Generate Migration Plan

Read the Fabric reference:
```
Read CLAUDE.md
Read docs/fabric-component-reference.md
```

Create a comprehensive migration plan:

```markdown
# Dock Migration Plan: [PrototypeName]

## Overview
- **Source**: [prototype path]
- **Destination**: src/pages/[PageName]/
- **Files to migrate**: [count]
- **Custom elements found**: [count]
- **Fabric mappings identified**: [count] ([%] coverage)

## Page Archetype
- **Detected**: [description of current layout]
- **Recommended Fabric archetype**: [Dashboard/List/Detail/Settings/Wizard/Inbox]
- **Layout structure**:
  ```
  PageCapsule
    PageHeaderV2
    [SideNavigation if applicable]
      Section
        [migrated content]
      Section
        [migrated content]
    [ActionFooter if applicable]
  ```

## Element Migrations

### High Confidence (auto-migrate)
| # | Custom Element | → Fabric Component | Props |
|---|---------------|-------------------|-------|
| 1 | `<button className="primary-btn">Save</button>` | `<Button type="primary">Save</Button>` | type="primary", size="medium" |
| 2 | `<input type="text" placeholder="Search...">` | `<TextField label="Search" placeholder="Search..." />` | label, placeholder, size="medium" |

### Medium Confidence (needs confirmation)
| # | Custom Element | Options | Question |
|---|---------------|---------|----------|
| 1 | `<div className="card">` | Section / TileV2 / StyledBox | Is this a content container or a clickable card? |
| 2 | `<div className="tabs">` | Tabs (filled) / Tabs (lined) | Page-level tabs or section-level? |

### No Fabric Equivalent (keep custom)
| # | Custom Element | Reason | Approach |
|---|---------------|--------|----------|
| 1 | Chart component | No Fabric chart | Keep, wrap in StyledBox |
| 2 | Custom animation | Fabric doesn't handle | Keep, ensure tokens used for colors |

## CSS Migration
- **Lines to remove**: [N] (replaced by Fabric component styling)
- **Lines to keep**: [N] (layout-only CSS: flexbox, grid, positioning)
- **Lines to convert**: [N] (hardcoded values → Fabric tokens)

## State & Interactions
- **Preserved**: [list interactions that carry over unchanged]
- **Modified**: [list interactions that change due to Fabric component APIs]

## Breaking Changes
- [list anything that works differently after migration]
```

**If `--plan-only`:**

Present the migration plan and stop:
```
🔗 Docking plan complete. Review above and run `/dock [path]` to execute.
```

**STOP here for plan-only mode.**

### Step 3: Resolve Ambiguities

If medium-confidence mappings exist, ask the user:

```
Before I proceed, I need clarification on [N] elements:

1. The card component in Card.tsx — should this be:
   a) A Section (content container with header)
   b) A TileV2 (stat/metric display)
   c) An ActionTile (fully clickable card)

2. The tab bar in Header.tsx — should this be:
   a) Filled Tabs (page-level, colored background)
   b) Lined Tabs (section-level, minimal)
```

**STOP and wait for answers.**

### Step 4: Execute Migration

Spawn **Task agents** for parallel migration, one per file:

**Each Task agent receives:**

```
Migrate this prototype file to use Fabric components.

Source file: [path]
Source content: [content]

Migration mappings:
- [custom element] → [Fabric component with props]
- [custom element] → [Fabric component with props]

Rules:
1. Read CLAUDE.md and docs/fabric-component-reference.md first
2. Replace every mapped custom element with its Fabric equivalent
3. Preserve all state management and interaction logic
4. Remove CSS that Fabric components handle (colors, typography, spacing, borders)
5. Keep CSS that's layout-only (flexbox, grid, positioning, gaps)
6. Import all Fabric components from @bamboohr/fabric
7. Use TypeScript with proper types
8. Export via index.ts
9. Output to: src/pages/[PageName]/[FileName]
```

### Step 5: Assemble Production Page

After all Task agents complete:

1. **Create page directory** in `src/pages/[PageName]/`
2. **Copy migrated files** from agents
3. **Create consolidated CSS** — only layout styles, no component styles
4. **Create index.ts** export
5. **Update App.tsx** — add lazy import and Route
6. **Update PrototypeIndex** — add entry with status "in-progress"

### Step 6: Verify Migration

Run `/orbit --scan` on the newly created production files:

```
Running post-dock compliance scan...
```

Report any remaining violations that need manual attention.

### Step 7: Clean Up

```bash
# Mark the prototype as docked (don't delete — keep for reference)
echo "# DOCKED — migrated to src/pages/[PageName]/ on [date]" > [prototype-path]/DOCKED.md
```

### Step 8: Final Output

```
🔗 Docking complete!

**Prototype**: [source path]
**Production**: src/pages/[PageName]/

**Migration summary:**
- Elements migrated to Fabric: [N]
- Custom elements preserved: [N]
- CSS lines removed: [N] (replaced by Fabric styling)
- CSS lines kept: [N] (layout only)

**Compliance:** [orbit scan result]

**Files created:**
- src/pages/[PageName]/[PageName].tsx
- src/pages/[PageName]/[PageName].css
- src/pages/[PageName]/index.ts

**Routing:** Added to App.tsx at /[route-path]

**Next steps:**
1. Run `npm run dev` and verify at http://localhost:5173/[route-path]
2. Run `/orbit` for full visual QA
3. Run `/beacon` to submit for review
4. Run `/countdown` before merge

Original prototype preserved at: [source path]/DOCKED.md
```
