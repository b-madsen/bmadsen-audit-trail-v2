---
name: launch
description: Build pages from Figma URLs using Fabric components (default) or raw React (nebula mode)
argument-hint: "[--nebula] <figma-urls>"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite, mcp__figma-desktop__*
---

# /launch — Figma-to-Fabric Builder

Build pages from Figma URLs. Two modes:

- **Fabric mode** (default): Maps Figma designs to Fabric design system components. Output is production-ready BambooHR code.
- **Nebula mode** (`--nebula`): Builds raw React components from Figma pixel specs. For exploring ideas outside the design system. Nebula output is unformed — it needs `/dock` to become production-ready.

## Initial Prompt

When invoked, **check for `--nebula` flag in the arguments.**

**If Fabric mode (default):**

```
🚀 Ready to launch from Figma using Fabric components!

Mode: **Fabric** (production-ready, uses Fabric design system)

I'll decompose your URLs, identify which Fabric components match each element, and assemble everything using the design system.

**What I need:**
1. Full-page screenshot (for layout context)
2. One or more Figma URLs

**How to get URLs:**
- Right-click components in Figma Desktop → "Copy link"
- Can provide parent frame URLs (I'll auto-discover children)
- Or provide individual component URLs

**Paste your screenshot and URLs now.**
```

**If Nebula mode (`--nebula`):**

```
🌌 Ready to launch in **Nebula mode**!

Mode: **Nebula** (raw React, NOT using Fabric — for exploration only)

⚠️ Nebula output is not production-ready. It uses custom CSS instead of Fabric components. When ready to productionize, run `/dock` to convert to Fabric.

**What I need:**
1. Full-page screenshot (for layout context)
2. One or more Figma URLs

**Paste your screenshot and URLs now.**
```

**STOP and wait for user to provide screenshot and URLs.**

---

## Workflow: Fabric Mode (Default)

### Step 1: Decompose URLs

For each URL provided:

1. **Extract node ID:**
   - URL format: `https://www.figma.com/design/...?node-id=656-22960`
   - Extract `656-22960`
   - Convert to node ID: `656:22960` (replace dash with colon)

2. **Check for children:**
   ```
   mcp__figma-desktop__get_metadata(nodeId="656:22960")
   ```
   - Parse XML response
   - Look for child `<instance>` and `<frame>` elements (not primitives like `<text>` or `<rectangle>`)
   - Extract child node IDs

3. **Build component list:**
   - If parent has meaningful children (named components like "Global Header", "Sidebar"), add them to build list
   - If no children or just primitives, use parent itself

### Step 2: Fetch Specs in Parallel

For each component in the build list, call in parallel:

```
mcp__figma-desktop__get_design_context(nodeId="656:22960", clientLanguages="typescript", clientFrameworks="react")
mcp__figma-desktop__get_screenshot(nodeId="656:22960", clientLanguages="typescript", clientFrameworks="react")
```

**Save results:**
- Component specs contain styling (colors, spacing, typography, dimensions)
- Screenshots provide visual reference
- Keep all data in context for the mapping phase

### Step 3: Map Figma Elements to Fabric Components

**This is the critical step that differentiates Fabric mode from Nebula mode.**

Before building, read the Fabric reference:
```
Read docs/fabric-component-reference.md
Read docs/figma-to-fabric-props.md
Read CLAUDE.md
```

For each Figma element in the specs, identify the matching Fabric component:

**Component Mapping Rules:**

| Figma Element | Fabric Component | Key Props to Extract |
|--------------|-----------------|---------------------|
| Button (filled, colored) | `Button` | type (primary/secondary/default), size, icon, label |
| Button (text only) | `TextButton` | label, size |
| Button (icon only) | `IconButton` | icon name, size |
| Text input / field | `TextField` | label, placeholder, state, size, width |
| Select / dropdown field | `SelectField` | label, options, size |
| Checkbox | `Checkbox` / `CheckboxGroup` | label, checked, size |
| Radio button | `Radio` / `RadioGroup` | label, selected, options |
| Toggle switch | `RoundedToggle` | label, size |
| Modal / dialog overlay | `Modal` | size (608/800/full), headline, content |
| Sub-modal within modal | `Sheet` | size (528/720/912) |
| Toast / notification at top | `Slidedown` | type, title, description |
| Banner at page top | `Banner` | type, message, is_dismissible |
| Inline alert / message | `InlineMessage` | type, title, description, theme |
| Page-level alert | `InPageMessage` | type, title, description |
| Tab bar (colored bg) | `Tabs` (filled) | labels, active tab, theme |
| Tab bar (minimal/lined) | `Tabs` (lined) | labels, active tab |
| Side menu / navigation | `SideNavigation` | items, active item, density |
| Secondary side menu | `SideSubNavigation` | items, groups |
| Card with icon + title + actions | `Tile` (v2) | icon, title, description, actions, orientation |
| Fully-clickable card | `ActionTile` | icon, title, description, orientation |
| Content container with header | `Section` | title, description, actions, header size |
| Page wrapper | `PageCapsule` | -- |
| Page title bar | `PageHeaderV2` | title, actions |
| Bottom button bar | `ActionFooter` | buttons, right-content |
| Avatar / profile photo | `Avatar` | size |
| Person badge (photo+name) | `Badge` (person) | title, subtitle, size |
| Icon badge | `Badge` (icon) | icon, title, size |
| Status tag / label | `Pill` | type, style, label |
| Small tag (in inputs) | `Chip` | label, removable |
| Progress indicator | `ProgressBar` | value |
| Empty state with illustration | `BlankState` | title, description, actions, size |
| Data table | `Table` | columns, data, features |
| Editable spreadsheet grid | `DataGrid` | columns, cell types |
| Expandable section | `Accordion` | items |
| Hover info popup | `Tooltip` | content, placement |
| Click info popup | `Popover` | content, placement |
| Calendar display | `CalendarView` | months, day states |
| Date input | `DateField` + `DatePicker` | label, format |
| Currency input | `CurrencyField` | label, currency |
| File display card | `FileCard` | file type, variant |
| File upload area | `FileUploader` | single/multiple, drag-drop |
| Multi-select from large list | `TransferList` | variant, options |
| Visual card selector | `SelectableBox` | mode (radio/checkbox), options |
| Headline text | `Headline` | size (xl/lg/md/sm/xs), color |
| Body text | `BodyText` | size (lg/md/sm/xs/xxs), weight, color |
| Icon | `Icon` | name (Font Awesome), size, color |
| Generic container/box | `StyledBox` | background, border, radius, shadow |
| Step-by-step flow (linear) | `HorizontalWizard` | steps |
| Step-by-step flow (navigable) | `VerticalWizard` | steps |

**If a Figma element does NOT match any Fabric component:**
- Use `StyledBox` as a container with appropriate tokens
- Use `BodyText` and `Headline` for typography
- Use `Icon` for iconography
- Flag it in the output as a custom element

**Extract Figma values for Fabric props, NOT for custom CSS:**
- Figma button color → `type="primary"` (not `background-color: #2e7918`)
- Figma font size 15px → `<BodyText size="medium">` (not `font-size: 15px`)
- Figma spacing → Fabric's built-in spacing (not custom margins)

### Step 4: Optional Clarification

**Before building, check for ambiguity:**

Common ambiguous scenarios:
- Interactive behavior (buttons, modals, navigation)
- Data sources (APIs, mock data, static)
- Functional vs. visual-only components (tabs, dropdowns)
- Which Fabric component variant to use when multiple could work

**If ambiguous:**
Ask specific questions:
- "Should 'Request a change' button open a Modal or navigate to a new page?"
- "Is this employee list static or should I wire to an API?"
- "These look like Filled Tabs — should they be functional with routing?"
- "This card could be a Tile or ActionTile — should the whole card be clickable, or just the buttons inside?"

**If not ambiguous:**
Make reasonable assumptions:
- Buttons with clear actions → implement onClick handlers
- Lists with demo data → use static mock data
- Tabs/navigation → implement functional routing

### Step 5: Build Components

Spawn **separate Task agents** (one per component/section) to build in parallel:

**Each agent receives:**

```
Build the [ComponentName] section using Fabric design system components.

Figma Specs: [paste specs from get_design_context]
Screenshot: [reference screenshot]

**CRITICAL: Use Fabric components, NOT custom HTML/CSS.**

Read these files first:
- CLAUDE.md (design system rules, microcopy guidelines, component usage guidance)
- docs/fabric-component-reference.md (component API reference)

Component Mapping (pre-identified):
- [Element A] → <Button type="primary" size="medium">
- [Element B] → <TextField label="Search" size="medium" />
- [Element C] → <Pill type="success" style="muted">Active</Pill>
- [etc.]

Requirements:
- Import all components from the Fabric package
- Use Fabric components for ALL UI elements (buttons, inputs, text, icons, containers)
- Do NOT create custom CSS for anything Fabric handles (colors, spacing, typography, states)
- Only write custom CSS for layout composition (flexbox/grid arrangement of Fabric components)
- Custom CSS spacing must use 4px grid multiples (4, 8, 12, 16, 24, 32, 48px)
- TypeScript with proper types
- Export via index.ts
- File: /src/components/[ComponentName]/[ComponentName].tsx

Microcopy rules (for any placeholder text, labels, or messages):
- Page titles, section headers, tab labels, button labels → Title Case
- Modal titles, placeholder text, messages, checkbox labels → sentence case
- Error messages: explain the problem, provide a solution, keep it friendly
- Never use "click here" — use specific action labels
- Dates: "Jan 15, 2025" format
```

### Step 6: Assemble Page

After all component agents complete:

1. **Create page component:**
   - File: `/src/pages/[PageName]/[PageName].tsx`
   - Import all built components
   - Use Fabric layout components for structure

2. **Follow Fabric layout pattern:**
   ```typescript
   import { PageCapsule } from '@fabric/PageCapsule';
   import { PageHeaderV2 } from '@fabric/PageHeaderV2';
   import { Section } from '@fabric/Section';
   import { SideNavigation } from '@fabric/SideNavigation';
   import { ActionFooter } from '@fabric/ActionFooter';

   export default function PerformancePage() {
     return (
       <PageCapsule>
         <PageHeaderV2 title="Performance" />
         <div className="page-body">
           <SideNavigation items={navItems} />
           <Section title="Overview" size="medium">
             <PerformanceContent />
           </Section>
         </div>
         <ActionFooter>
           <Button type="primary">Save</Button>
           <TextButton>Cancel</TextButton>
         </ActionFooter>
       </PageCapsule>
     );
   }
   ```

3. **Export page:**
   - Add to `/src/pages/index.ts`
   - Update routing if needed

---

## Workflow: Nebula Mode (`--nebula`)

When `--nebula` flag is present, use the raw-build approach:

### Steps 1-2: Same as Fabric mode
(Decompose URLs, fetch specs in parallel)

### Step 3: Skip Fabric mapping
Do NOT map to Fabric components. Build from raw Figma specs.

### Step 4: Build raw components

**Each agent receives:**

```
Build the [ComponentName] component from Figma specs.

Specs: [paste component specs from get_design_context]
Screenshot: [reference screenshot]

Requirements:
- Match Figma specs exactly (colors, spacing, typography, dimensions)
- Use CSS modules or Tailwind for styling
- TypeScript with proper types
- Export via index.ts
- File: /src/components/[ComponentName]/[ComponentName].tsx

NOTE: This is Nebula mode. Use custom CSS, not Fabric components.
```

### Step 5: Assemble page (same structure, raw components)

---

## Final Output

### Fabric Mode:

```
🚀 Launch complete!

Built [N] components using Fabric design system

Fabric components used:
- Button (primary, secondary)
- TextField (3 instances)
- Section (2 instances)
- Table (1 instance)
- Pill (4 instances)
- [etc.]

Custom elements (no Fabric match):
- PerformanceChart (custom visualization)

Components created:
- /src/components/PerformanceOverview/PerformanceOverview.tsx
- /src/components/ReviewTable/ReviewTable.tsx

Page created:
- /src/pages/PerformancePage/PerformancePage.tsx

All UI elements use Fabric components. Layout CSS only for composition.

**Next step:** Run `/orbit` to verify against Figma.
```

### Nebula Mode:

```
🌌 Nebula launch complete!

⚠️ NEBULA MODE — Not using Fabric design system

Built [N] raw components from Figma specs

Components created:
- /src/prototypes/PerformancePage/GlobalHeader.tsx
- /src/prototypes/PerformancePage/Sidebar.tsx

Page created:
- /src/prototypes/PerformancePage/PerformancePage.tsx

This is prototype code. When ready to productionize:
→ Run `/dock` to convert to Fabric components
→ Or re-run `/launch` (without --nebula) to rebuild from scratch with Fabric
```

---

## Tips

**Good URL selection:**
- Parent frame URLs work great (auto-discovers children)
- Select 2-4 main sections for best results
- Can mix parent and individual URLs

**Fabric mode tips:**
- If a Figma element is clearly a Fabric component (it came from the Fabric Library), trust the mapping
- When in doubt between two Fabric components, check the reference doc for usage guidelines
- Only create custom CSS for layout (flexbox/grid to position Fabric components)
- Use `StyledBox` instead of raw `div` for custom containers

**Nebula mode tips:**
- Use for exploring ideas that don't have Fabric components yet
- Use for quick throwaway demos
- Always flag nebula code clearly so it doesn't ship to production

**When to use which mode:**
- Building a feature for BambooHR → **Fabric mode** (default)
- Exploring a new concept / hackathon → **Nebula mode** (`--nebula`)
- Rebuilding a legacy page → **Fabric mode**
- Quick demo for stakeholders → either, depending on fidelity needs
