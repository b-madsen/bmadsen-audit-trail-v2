---
name: beacon
description: Submit components, patterns, or pages to the Fabric design system for review
argument-hint: "[--pattern] [--update <component>] [path]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite, mcp__playwright__*
---

# /beacon — Submit to the Design System

Beacon broadcasts your work back to mission control. It packages a component, pattern, or page for contribution to the Fabric design system — running compliance checks, generating documentation, and preparing a review-ready submission.

## Initial Prompt

When invoked, **check the arguments for mode:**

- **Default** — Contributing a new component or page
- **`--pattern`** — Contributing a new experience pattern (layout archetype, navigation pattern, etc.)
- **`--update [component]`** — Proposing an update to an existing Fabric component

**If default (new component/page):**

```
📡 Beacon activated — preparing your work for system contribution.

I'll audit compliance, generate documentation, and package everything for review.

**What are you contributing?**
1. A new page → I'll scan the page directory
2. A new reusable component → I'll scan the component directory
3. Or specify a path: `/beacon src/components/MyComponent`

If you just finished building with /launch, I'll detect your most recent output automatically.
```

**If `--pattern`:**

```
📡 Beacon activated — contributing a new experience pattern.

I'll help you document this pattern for the Experience Architecture so other teams can reuse it.

**Tell me about the pattern:**
1. What problem does it solve?
2. Which page archetype does it belong to? (Dashboard, List, Detail, Settings, Wizard, Inbox, or new)
3. Link to a working prototype or describe the interaction
```

**If `--update [component]`:**

```
📡 Beacon activated — proposing an update to [component].

I'll document what you're changing and why, then package it for the Fabric team to review.

**What's changing?**
1. New prop or variant?
2. Behavior change?
3. Bug fix?
4. Visual update?
```

**STOP and wait for user input if needed.**

---

## Workflow: Component/Page Contribution (Default)

### Step 1: Identify the Contribution

Detect what's being contributed:

1. **If path provided** — Use that path directly
2. **If `/launch` was just run** — Detect the most recently created/modified files in `src/pages/` or `src/components/`
3. **If neither** — Ask the user to specify

```
Glob: src/pages/**/*, src/components/**/*
```

Sort by modification time, identify the most recent work.

### Step 2: Run Compliance Gate

**This is mandatory. No submission without compliance.**

Execute the full `/orbit --scan` workflow on the contribution files:

```
Read CLAUDE.md
Read docs/fabric-component-reference.md
```

Run all violation checks from orbit:
- CRITICAL violations (hardcoded colors, custom buttons/inputs/modals, multiple primary buttons)
- WARNING violations (toggle in forms, excess checkboxes, missing radio defaults, inline styles)

**If CRITICAL violations exist:**

```
⚠️ Compliance gate failed — [N] critical violations found.

These must be fixed before submitting:
1. [violation details]
2. [violation details]

Fix these issues and run `/beacon` again.
```

**STOP. Do not proceed with submission.**

**If only WARNING violations or clean:**

```
✅ Compliance gate passed. [Warnings if any listed]

Proceeding with documentation generation...
```

### Step 3: Generate Documentation

For each component/page in the contribution, auto-generate documentation:

#### 3a. Component Inventory

Scan imports and usage to create a component manifest:

```
Grep: pattern="from '@bamboohr/fabric'" in contribution files
Grep: pattern="from '.*fabric.*'" in contribution files
```

Build a table:
```markdown
| Fabric Component | Usage Count | Props Used |
|-----------------|-------------|------------|
| Button | 3 | type="primary", size="medium", startIcon |
| TextField | 2 | label, placeholder, size="medium" |
| Section | 1 | header, title, actions |
```

#### 3b. Props Documentation

For each exported component, extract:
- Component name and file path
- Props interface (from TypeScript types)
- Default values
- Required vs optional props

```typescript
// Auto-extracted from MyComponent.tsx
interface MyComponentProps {
  title: string;           // Required
  variant?: 'default' | 'compact';  // Optional, default: 'default'
  onAction?: () => void;   // Optional callback
}
```

#### 3c. Usage Examples

Generate 2-3 usage examples from the actual implementation:

```tsx
// Basic usage
<MyComponent title="Employee Overview" />

// With variant
<MyComponent title="Employee Overview" variant="compact" />

// With action
<MyComponent title="Employee Overview" onAction={() => navigate('/details')} />
```

#### 3d. Screenshots

If Playwright is available and dev server is running:

```
mcp__playwright__browser_navigate(url="localhost:5173/[page-path]")
mcp__playwright__browser_take_screenshot(fullPage=true, filename="beacon-preview-light.png")
```

If dark mode toggle exists, capture dark mode too.

### Step 4: Determine Classification

Based on the component analysis, suggest where this fits in the system:

**For pages:**
- Which page archetype? (Dashboard, List, Detail, Settings, Wizard, Inbox)
- Which navigation pattern? (Global, Section, Sub-section, Tabs)
- Which teams would benefit from this?

**For components:**
- Atom, Molecule, or Organism?
- Does it extend an existing Fabric component?
- Is it a candidate for promotion to the Fabric library?
- Suggested Storybook category

### Step 5: Generate Contribution Manifest

Create a `BEACON.md` file in the contribution directory:

```markdown
# Beacon Contribution Manifest

## Summary
- **Type**: Page / Component / Pattern
- **Name**: [ComponentName]
- **Author**: [detected from git config or asked]
- **Date**: [current date]
- **Branch**: [detected from git branch]

## Compliance
- **Orbit scan**: ✅ PASSED (0 critical, [N] warnings)
- **Warnings**: [list if any]

## Fabric Components Used
| Component | Count | Props |
|-----------|-------|-------|
| Button | 3 | type="primary", size="medium" |
| TextField | 2 | label, placeholder |

## Custom Elements
| Element | Reason | Fabric Candidate? |
|---------|--------|-------------------|
| PerformanceChart | No Fabric chart component | No (use chart library) |

## Classification
- **Archetype**: [page archetype if page]
- **Category**: [Storybook category if component]
- **Promotion candidate**: Yes/No — [rationale]

## Files
- `src/pages/MyPage/MyPage.tsx`
- `src/pages/MyPage/MyPage.css`
- `src/pages/MyPage/index.ts`

## Screenshots
- Light mode: [beacon-preview-light.png]
- Dark mode: [beacon-preview-dark.png]

## Usage Examples
[auto-generated examples]

## Props API
[auto-generated props documentation]
```

### Step 6: Prepare PR

```bash
# Stage the contribution files + manifest
git add [contribution files] BEACON.md

# Generate commit message
git commit -m "beacon: [ComponentName] — [brief description]

Compliance: passed (0 critical)
Fabric components: [count]
Custom elements: [count]
Classification: [archetype/category]"
```

### Step 7: Final Output

```
📡 Beacon transmission complete!

**Contribution:** [ComponentName]
**Type:** Page / Component
**Compliance:** ✅ Passed
**Files:** [count] files packaged
**Documentation:** BEACON.md generated

**Manifest:** [path to BEACON.md]

**Next steps:**
1. Review the generated BEACON.md for accuracy
2. Push your branch and open a PR
3. Tag a reviewer from the Fabric team
4. Run `/countdown` before final merge

Branch: feature/prototype-[name]-[initials]
```

---

## Workflow: Pattern Contribution (`--pattern`)

### Step 1: Gather Pattern Information

Collect from the user:
- Pattern name
- Problem it solves
- Page archetype it belongs to (or if it's a new archetype)
- Key Fabric components involved
- Link to working prototype (if exists)

### Step 2: Generate Pattern Documentation

Create a structured pattern document:

```markdown
# Experience Pattern: [Pattern Name]

## Problem
[What problem does this pattern solve?]

## Solution
[How does this pattern solve it?]

## Archetype
[Dashboard / List / Detail / Settings / Wizard / Inbox / New]

## When to Use
- [Condition 1]
- [Condition 2]

## When NOT to Use
- [Anti-pattern 1]

## Layout Structure
```
[ASCII layout diagram using Fabric components]
```

## Key Components
| Component | Role | Configuration |
|-----------|------|---------------|
| Section | Content container | header, title="..." |
| Tabs (filled) | View switching | labels=[...] |

## Reference Implementation
- Prototype: [path or URL]
- Key file: [path to main component]

## Accessibility
- [Keyboard navigation notes]
- [Screen reader considerations]

## Teams Using This Pattern
- [Team 1] — [where]
- [Team 2] — [where]
```

### Step 3: Update Experience Architecture

Suggest additions to the Experience Architecture Patterns section in CLAUDE.md:

```
Proposed addition to CLAUDE.md Experience Architecture Patterns:

### [Pattern Category]
- **[Pattern Name]** → [Brief description] (see [prototype path])
```

### Step 4: Output

```
📡 Pattern beacon transmitted!

**Pattern:** [Pattern Name]
**Archetype:** [archetype]
**Documentation:** [path to pattern doc]

**Proposed CLAUDE.md update:** [show the diff]

Review the documentation, then submit for inclusion in the Experience Architecture.
```

---

## Workflow: Component Update (`--update`)

### Step 1: Identify Current State

Read the existing component from Fabric:
```
Read docs/fabric-component-reference.md
```

Find the component entry and document current props/behavior.

### Step 2: Document the Change

Collect from the user:
- What's changing (new prop, behavior change, visual update)
- Why (user need, bug, inconsistency)
- Backward compatibility impact

### Step 3: Generate Update Proposal

```markdown
# Fabric Update Proposal: [ComponentName]

## Current Behavior
[document current state]

## Proposed Change
[document what changes]

## Rationale
[why this change is needed]

## Breaking Changes
- None / [list breaking changes]

## Migration Guide
[if breaking, how to migrate]

## Affected Pages
[list pages in src/pages/ that use this component]
```

### Step 4: Output

```
📡 Update beacon transmitted for [ComponentName]!

**Change:** [brief description]
**Breaking:** Yes/No
**Affected pages:** [count]
**Proposal:** [path to proposal doc]

Submit this proposal to the Fabric team for review.
```
