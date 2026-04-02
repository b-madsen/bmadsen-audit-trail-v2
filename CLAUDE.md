# Fabric Design System — Claude Code Context

You are building UI for BambooHR using the **Fabric Design System**. Fabric is the single source of truth for all product UI. Always use Fabric components instead of raw HTML/CSS or third-party UI libraries. Every component you build, every pattern you implement, and every page you construct must conform to this system.

---

## Identity & Purpose

This environment is a **design system–native workspace** for BambooHR's ~90-person product organization. Claude Code operates here as a design system–aware builder — not a generic code assistant. Every output should reinforce system consistency, whether you're building from a Figma URL, prototyping a new concept, or auditing existing work.

**Your priorities, in order:**
1. **System compliance** — Use Fabric components. Never reinvent what exists.
2. **Pattern consistency** — Follow established layout, navigation, and interaction patterns.
3. **Production readiness** — Output should be mergeable, not throwaway.
4. **Speed** — Automate the mechanical work so designers focus on decisions, not assembly.

---

## Skills — Ad Astra Mission Control

Skills are Claude Code commands that automate complex multi-step workflows. They live in `.claude/skills/` and are invoked with `/` prefix.

### Build & Verify

| Skill | Command | What It Does |
|-------|---------|--------------|
| **Launch** | `/launch [Figma URL]` | Build production-ready pages from Figma using Fabric components |
| | `/launch --nebula` | Build with raw React/CSS for early exploration (not production) |
| **Orbit** | `/orbit [URL]` | Full QA: visual screenshots + Figma comparison + Fabric compliance audit |
| | `/orbit --scan` | Code-only audit for Fabric violations (no browser needed) |

### Contribute & Govern

| Skill | Command | What It Does |
|-------|---------|--------------|
| **Beacon** | `/beacon [path]` | Submit component/pattern to system — auto-validates, generates docs, packages PR |
| | `/beacon --pattern` | Contribute a new experience pattern to the architecture |
| | `/beacon --update [component]` | Propose an update to an existing Fabric component |
| **Survey** | `/survey` | Repo-wide Fabric compliance scan across all pages |
| **Dock** | `/dock [path]` | Convert nebula prototype to production Fabric components |
| **Relay** | `/relay [path]` | Generate handoff docs for cross-team communication |

### Intelligence & Guidance

| Skill | Command | What It Does |
|-------|---------|--------------|
| **Compass** | `/compass "description"` | Recommend archetypes, patterns, and components for what you're building |
| | `/compass --scaffold` | Recommend + scaffold starter files |
| **Telemetry** | `/telemetry` | Adoption analytics — component usage, pattern adherence, promotion candidates |
| **Countdown** | `/countdown` | Pre-merge go/no-go checklist (30 checks) |
| | `/countdown --fix` | Auto-fix + checklist |
| **Basecamp** | `/basecamp` | New designer onboarding — environment, orientation, first build |

### Skill Workflow

```
/basecamp → /compass → /launch → /orbit → /dock → /beacon → /countdown → Ship
```

### MCP Server Requirements

- **Figma Desktop MCP** (`mcp__figma-desktop__*`) — Fetches Figma specs and screenshots
- **Playwright MCP** (`mcp__playwright__*`) — Browser automation for visual testing (orbit only)

---

## Resources

| Resource | URL | Use For |
|----------|-----|---------|
| Storybook | https://fabric.bamboohr.net | Live component demos, interactive props, code examples |
| Weave Docs | https://weave.bamboohr.net | Usage guidelines, do's and don'ts |
| Figma Library | https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz | Visual specs, component tokens |
| Fabric for Claude | https://www.figma.com/design/7IHktnp21R07SgRbODpwns/Fabric-for-Claude | Claude-optimized Figma reference |
| Component Reference | `docs/fabric-component-reference.md` | Full API reference (local, fast) |
| Component Links | `docs/fabric-components-links.md` | Direct links to every component's Figma/Storybook/Docs |
| Figma → Fabric Props | `docs/figma-to-fabric-props.md` | Figma variant → Fabric prop mapping for every component |
| Icons | https://fontawesome.com/search?o=r&s=solid&ip=classic | Font Awesome icon search |
| Slack | #pathfinder-design | Team channel |

---

## Available Prototype Pages

Reference these working prototypes for layout patterns and component usage:

| Page | Path | Key Patterns |
|------|------|--------------|
| Create Job Opening | `/create-job-opening` | Wizard, form fields, AI generation |
| Files | `/files` | File management, sidebar navigation |
| Hiring | `/hiring` | Tabs, data tables, candidate cards |
| Home | `/home-template` | Dashboard, Gridlets, avatar header |
| Inbox | `/inbox` | Sidebar navigation, request list, pagination |
| Job Opening Detail | `/job-opening-detail` | Detail view, pipeline stages |
| Profile | `/my-info` | Tabs, form sections, employee info |
| New Employee | `/new-employee` | Onboarding checklist, task cards |
| Payroll | `/payroll` | Stats cards, reminders, data grid |
| People | `/people-template` | Directory, list/grid views, org chart |
| Reports | `/reports-template` | Analytics, charts, filters |
| Settings | `/settings` | Settings form, account info |

Run `npm run dev` and visit http://localhost:5173 to browse all prototypes.

---

## Critical Rules

These are non-negotiable. Violations will be flagged by `/orbit`.

### Rule 1: Always Use Fabric Components
Never create custom buttons, inputs, modals, text elements, or containers when a Fabric component exists. Import from `@bamboohr/fabric`.

### Rule 2: Component Hierarchy
Atoms (BodyText, Headline, IconV2, StyledBox) → Molecules (Badge, Chip, Pill, Avatar) → Organisms (Modal, Table, DataGrid, Wizard). Build up, don't reinvent down.

### Rule 3: Design Tokens Only
Never hardcode colors, spacing, or typography. Fabric components use token-based styling. No hex codes, no `rgb()`, no `font-size:` in your CSS. Use Fabric's semantic tokens (`text-*`, `surface-*`, `border-*`, `icon-*` prefixes).

### Rule 4: One Primary Button Per Context
Never render multiple `type="primary"` buttons in the same view. One primary action, supported by secondary and text buttons.

### Rule 5: Toggles Auto-Save
Never put a `RoundedToggle` inside a form with a Save button. Toggles commit immediately. Use `Checkbox` for form-submit contexts.

### Rule 6: Select vs Dropdown
`SelectField` = form input that spawns a menu. `Dropdown` = button that spawns a menu. They are different components with different purposes. Never confuse them.

### Rule 7: Validate on Submit
Only validate on blur for formatting errors (e.g., date format). Use `*` for required fields. Don't disable save buttons for unfilled required fields.

### Rule 8: Section Is the Universal Container
All page content goes inside a `Section`. Exceptions: Vertical Wizard, Side Navigation, Page Header, Filled Tabs.

### Rule 9: Max 8 Checkboxes
If more than 8 options, use `SelectField` (selectable) or `AutocompleteMultiple` instead of `CheckboxGroup`.

### Rule 10: Radio Buttons Need a Default
Always pre-select one option. Add "None" if skipping should be explicit.

### Rule 11: AI Components Must Use AI Children
Always use `color="ai" variant="outlined"` for Buttons inside `InlineMessage status="ai"`. The AI color styling ONLY works with the `outlined` variant. Without it, buttons render green instead of purple.

### Rule 12: Gridlet.Body Requires ONE Wrapper Div
`Gridlet.Body` uses `justify-content: space-between`. Multiple direct children get distributed with large white space gaps. Always wrap ALL content in a single `<div>`. Never use Fabric's `Flex` component inside `Gridlet.Body`.

---

## Microcopy & Capitalization

BambooHR's voice is friendly, conversational, and real — like an approachable coworker. When generating placeholder text, labels, error messages, or any UI copy, follow these rules.

### Voice Principles
- Be informal but not casual. Confident and inviting, never salesy or pushy.
- Use straightforward language. No jargon. Make complicated concepts easy to understand.
- Never talk down to people or make them feel bad about their knowledge.
- A light sprinkle of wit — but never sacrifice clarity for laughs, and never make jokes at the expense of others.
- Active voice for instructions: "Enter your password" not "Password should be entered."
- Use "you" to address the user directly.
- Follow APA style guidelines as the general baseline.

### Capitalization Rules

**Title Case** — use for:
- Page header titles, Section header titles, Tab labels
- Button labels, Radio button labels, Navigation items
- Modal titles, Column headers, Selectable box titles

**Sentence case** — use for:
- Body copy, descriptions, Checkbox option labels
- Blank state headlines and text, Text input placeholders
- Slidedown messages, Banner messages, Tooltip descriptions
- Popover content, In-page message text, Wizard notes
- Sheet headlines, Text links in context of a sentence
- Descriptions on titled objects (selectable box descriptions, large tab descriptions)

**ALL CAPS** — almost never. Only AM/PM when showing a time.

### Date Formatting
- Display dates: `Jan 15, 2025` (abbreviated month, space, day, comma, four-digit year)
- Current year: Year is optional (`Jan 15`)
- Clarifying helper: `Jan 15 (Friday)` — day of week in parentheses, current year only
- Inputs: Use `DateField` + `DatePicker` components (they handle formatting)

### Error Messages
1. Explain simply what the problem is
2. Provide a solution so users can fix it immediately
3. Keep the tone human and friendly — never cold, never blaming
4. Place field-level errors near the problem field
5. Never use technical jargon in user-facing error text

### Empty State Copy
Use the `BlankState` component. Title should be conversational ("Nothing to see here...yet."). Supporting text should describe what will appear and how to get started. Include an action button when possible.

---

## Component Selection Quick Reference

### Messaging Components

| Need | Component |
|------|-----------|
| Global persistent notice (surveys, trials, required notices) | `Banner` |
| Temporary success/failure toast after action | `Slidedown` |
| Page-level contextual feedback (above sections) | `InPageMessage` |
| Inline contextual guidance (within content) | `InlineMessage` |
| Field-level validation | TextField/SelectField `error`/`warning`/`info` states |

### Form Components

| Input Need | Component |
|------------|-----------|
| Free text | `TextField` |
| Currency/money | `CurrencyField` |
| Dates | `TextField` with `type="date"` |
| Single choice (<6 options) | `RadioGroup` |
| Single choice (6+ options) | `SelectField` |
| Multiple choice (<8 options) | `CheckboxGroup` |
| Multiple choice (8+ options) | `SelectField` (selectable) or `AutocompleteMultiple` |
| Binary on/off (auto-save context) | `RoundedToggle` |
| Binary on/off (form submit context) | `Checkbox` |
| Tags/tokens | `Chip` (with `AutocompleteMultiple`) |
| Large dataset multi-select | `TransferList` |
| Visual card selection | `SelectableBox` |

### Button Hierarchy

| Type | Usage | When |
|------|-------|------|
| Primary | `type="primary"` | One per context. The main action. |
| Secondary | `type="secondary"` | Important but optional actions. |
| Default | Default styling | Baseline/tertiary actions. |
| Text Button | `TextButton` | Low-emphasis (e.g., Cancel in modals). |
| Icon Button | `IconButton` | Icon-only actions. Never use Standard Button for icon-only. |

Sizes: `small` (in-page content, section actions) | `medium` (forms, default) | `large` (signature experiences)

---

## Layout Patterns

### Standard Page Layout

```
PageCapsule
  PageHeaderV2
  Banner (if needed)
  SideNavigation (if needed)
    Section
      [content using Fabric components]
    Section
      [more content]
  ActionFooter (if needed)
```

### Modal Pattern

```
Modal (small: 608px | medium: 800px | full-screen)
  StandardHeadline / HeroHeadline
  UpperContent
  LowerContent
  Buttons: right-aligned for small/medium, left-aligned for full-screen

  Sheet (sub-modal within modal, max one level deep)
    Small: 528px | Medium: 720px | Large: 912px
```

### Confirmation Modal Pattern (CANONICAL)

Use this exact structure for all confirmation modals (delete, cancel, warning, destructive actions).

**Critical rules:**
- `StandardModal.Header` MUST be passed via `renderHeader` on `StandardModal.Body` — NEVER as a sibling to `Body`. Placing it as a sibling renders it as a full-width banner outside the modal card.
- Use `IconTile` (not a custom div) for the icon. Pass a `ReactElement` to the `icon` prop to control icon color independently from the tile background.
- `variant="muted"` gives the neutral gray tile background.
- Use `Headline size="small" component="h4"` for the modal body title.
- Use `TextButton` (no `color` prop) for the secondary/destructive text action — defaults to blue link color.
- Center all body content with `display: flex`, `flexDirection: column`, `alignItems: center`, `textAlign: center`, `width: 100%`.

```tsx
import { StandardModal, IconTile, IconV2, Headline, BodyText, Button, TextButton } from '@bamboohr/fabric';

<StandardModal isOpen={isOpen} onRequestClose={onClose}>
  <StandardModal.Body
    renderHeader={<StandardModal.Header title="Just checking..." />}
    renderFooter={
      <StandardModal.Footer
        actions={[
          <TextButton key="secondary" onClick={onSecondaryAction}>Secondary action</TextButton>,
          <Button key="primary" variant="contained" color="primary" onClick={onPrimaryAction}>
            Primary action
          </Button>,
        ]}
      />
    }
  >
    <StandardModal.UpperContent>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 0 16px', width: '100%' }}>
        <IconTile
          icon={<IconV2 name="triangle-exclamation-regular" color="warning-strong" size={24} />}
          size={56}
          variant="muted"
        />
        <Headline size="small" component="h4" color="neutral-strong">Headline goes here...</Headline>
        <BodyText size="medium" color="neutral-weak">Supporting description goes here.</BodyText>
      </div>
    </StandardModal.UpperContent>
  </StandardModal.Body>
</StandardModal>
```

**Icon color by confirmation type:**

| Type | Icon name | Icon color |
|------|-----------|------------|
| Warning / unsaved changes | `triangle-exclamation-regular` | `warning-strong` |
| Delete / destructive | `trash-can-regular` | `error-strong` |
| Info | `circle-info-regular` | `info-strong` |
| Success | `circle-check-regular` | `success-strong` |

---

## Component Usage Guidance

These rules come from the official Weave documentation and encode design judgment — when to use each component, when NOT to, and component-specific constraints.

### Tabs
- **Filled Tabs** open to the PageCapsule background (surface-neutral-xx-weak). Use for page-level view switching. If on a dark background, use dark theme.
- **Lined Tabs** go inside a Section. Use for section-level view switching. More minimal.
- Filled always appears ABOVE lined when both are on the same page.
- Use 1–2 word labels. If you need longer labels, tabs are too complicated for this content.
- Don't use tabs for comparing information (forces memory burden).
- Don't use tabs as navigation — tabs alternate views within the same context.
- Arrange tabs by priority: highest-use content first and selected by default.
- Sizes: `medium` (default), `large` (for page anchors; large offers descriptions).

### Section
- All page content must live inside a Section (exceptions: Vertical Wizard, SideNavigation, PageHeader, Filled Tabs).
- When only one Section exists on a page, it should fill the full height of the PageCapsule — don't hug the content.
- Don't adjust Section visual styling (border radius, shadow are fixed).
- Don't use Section Headers outside of a Section.
- Header sizes: `small`, `medium` (default), `large`. Choose based on section prominence.
- Use subsection headers (standalone SectionHeader) to create sub-groupings within a Section.
- Section header props: `header` (optional), `icon` (optional), `title` (required with header), `description` (optional), `actions` (optional, always small button size), `divider` (optional).

### Page Header V2
- Every page must answer: "Where am I and what can I do here?"
- **Single row**: Simple pages with title + a few buttons. Most common setup.
- **Double row**: Complex pages with tabs, filters, or table controls.
- Keep titles short. Use subtitle for additional context.
- Don't use Section headings as page headers.
- Don't use Large headline size in main BambooHR product (restricted to Payroll Command Center).
- Anatomy: Title Area (left) + Primary Content Area (right) + optional Secondary/Tertiary (second row).

### Modal
- Modals are for content that MUST be attended to before proceeding. If a Tooltip or Popover will do, use that instead.
- Don't use modals for optional/helpful information, success states, or failure states.
- **Button alignment**: right-aligned for small/medium (primary rightmost). Left-aligned for full-screen (primary leftmost). Cancel should be a TextButton.
- Set modal titles in Title Case.
- Use standardized templates when available: Warning Confirmation (triangle-exclamation icon), Delete Confirmation (trash-can icon), Aggressive Confirmation.
- Full-screen modals: use Section components inside them (modal has gray background).
- Sheet = sub-modal within a modal. Max one level deep.

### Action Footer
- Content stacks responsively on smaller screens.
- Dark theme is reserved for pages outside the main application (ATS, Offer Letters).
- Supports right-aligned supplementary content via `rightContent` prop.

### Accordion
- Default view: all panels collapsed, or only the first panel open. Never all panels open by default.
- Don't use for essential information (it hides content).
- Two visual variants: `line` (bordered) and `card`.
- Two behavior modes: one panel at a time (good for forms) or multiple panels (more flexibility).

### Inline Message vs In-Page Message
- **InlineMessage**: compact, within content flow, grouped with related element. Good for contextual guidance.
- **InPageMessage**: larger, page-level, outside/above sections. Good for feedback that applies to the whole page.
- Don't show multiple InPageMessages at once — if you need multiple messages, use InlineMessages instead.
- Both support: information, success, error, warning, discovery variants.
- Both have light theme variants for non-white backgrounds.
- InPageMessage should usually be dismissable.

### Pill
- Types: brand, info, success, warning, error, neutral, discovery, inverted.
- **Standard** style: heavier, visually prominent. Use sparingly.
- **Muted** style: preferred when multiple pills appear on the same page — reduces visual noise.
- Pills are read-only — don't include interactive elements.
- Use single word or short text labels.

### Radio Button
- Prefer radio buttons over dropdown menus — radios have lower cognitive load because all options are visible.
- Always have a default selection. Add "None" option if the user might not want to choose.
- Options must be comprehensive and clearly distinct.

### Checkbox
- Used for selecting any number of options, or a single on/off toggle in form contexts.
- Both individual checkboxes and group labels can include notes — keep them concise.

### Wizard
- Use for processes that are: infrequent, linear, and complex enough to benefit from chunking (3+ steps).
- **Vertical Wizard**: steps listed vertically on the left. Better for complex, content-heavy steps.
- **Horizontal Wizard**: steps shown horizontally at the top. Better for simpler, fewer steps.
- Don't use wizards for frequent actions or only 2 steps.

### Text Button
- Use for minimal-emphasis actions: "Learn More", "Cancel", secondary links.
- **Primary type** (default): link color. **Secondary type** ("muted"): neutral text, link color on hover.
- Match the Text Button size to surrounding text when used inline.
- Don't use "click here" as a label. Don't use Text Buttons as navigation links.

### Date Picker
- Supports: single date, date range, month selection.
- Date range picker is for ranges under one month. For multi-month ranges, use two single pickers.
- Always pair with a DateField (text input) for manual date entry.

### Chip vs Pill
- **Chip**: ephemeral, used inside input fields (Autocomplete), removable. For representing user-added items.
- **Pill**: read-only status indicator. For displaying status, categories, or properties.
- Don't confuse them — they have different purposes.

### Buttons vs Links
- **Buttons** perform actions (save, delete, submit, toggle).
- **Links** navigate to another page.
- Never use TextButton as a link or vice versa.

### Styled Box
- A generic atom-level container. Customize: border, shadow, background, radius.
- Use as a building block when no specific Fabric component fits — but prefer Section for content containers.

---

## Component API Gotchas

These are the traps that catch developers most often. Memorize these.

### Button with Icon + Text (CRITICAL)

The `icon` prop renders as **icon-only** — text children are ignored. To show both icon AND text:

```tsx
// CORRECT — icon + text
<Button startIcon={<IconV2 name="heart-pulse-solid" size={16} />}>
  How is my team doing?
</Button>

// WRONG — renders icon-only, text is hidden
<Button icon="heart-pulse-solid">
  How is my team doing?
</Button>
```

Rules:
- `icon` prop = icon-only button (text children ignored)
- `startIcon` + `IconV2` = icon with text label
- `endIcon` + `IconV2` = text with trailing icon

### AI Component Theming (CRITICAL)

```tsx
// CORRECT
<InlineMessage
  status="ai"
  title="AI Recommendation"
  description="I detected an opportunity..."
  action={
    <Button size="small" color="ai" variant="outlined" onClick={handleAction}>
      Take Action
    </Button>
  }
/>

// WRONG — missing variant="outlined", renders green instead of purple
<InlineMessage
  status="ai"
  action={<Button size="small" color="ai" onClick={handleAction}>Take Action</Button>}
/>
```

### Gridlet Content Pattern (CRITICAL)

```tsx
// CORRECT — ONE wrapper div
<Gridlet header={<Gridlet.Header title="My Widget" />}>
  <Gridlet.Body>
    <div className="widget-content">
      <div className="widget-alerts">
        <InlineMessage ... />
      </div>
      <div className="widget-table">...</div>
    </div>
  </Gridlet.Body>
</Gridlet>

// WRONG — multiple direct children cause space-between gaps
<Gridlet.Body>
  <Flex flexDirection="column">...</Flex>
  <div className="table-container">...</div>
</Gridlet.Body>
```

CSS override for content-fit height:
```css
.widget-container [data-fabric-component="Gridlet"] { height: auto !important; }
.widget-container [data-fabric-component="Gridlet"] > section,
.widget-container [data-fabric-component="Gridlet"] > section > div { height: auto !important; flex: none !important; }
```

### Components Without className Prop

These Fabric components do NOT accept `className`. Wrap them in a container element:

| Component | Wrong | Correct |
|-----------|-------|---------|
| `BodyText` | `<BodyText className="x">` | `<span className="x"><BodyText>...</BodyText></span>` |
| `IconV2` | `<IconV2 className="x" />` | `<span className="x"><IconV2 ... /></span>` |
| `Headline` | `<Headline className="x">` | `<div className="x"><Headline>...</Headline></div>` |

### Prop Name Gotchas

| Component | Correct | Wrong |
|-----------|---------|-------|
| `Gridlet.Header` | `title="Text"` | `subtitle` prop (doesn't exist) |
| `ProgressBar` | `current={50} total={100}` | `value`/`max` props |
| `BodyText` size | `size="extra-small"` | `size="x-small"` |
| `Headline` size | `size="small"` | `size="x-small"` |
| `IconV2` color | `color="primary-strong"` | `color="primary"` (needs `-strong`/`-medium`/`-weak`) |
| `BodyText` color | `color="primary"` | `color="primary-strong"` (no suffix needed) |
| `Button` variant | `variant="contained"` | `variant="filled"` |
| `TextField` for dates | `type="date"` on TextField | `DateField` (doesn't exist in Fabric) |
| `InlineMessage` action | `action={<Button>}` (singular) | `actions` (doesn't exist) |

---

## Typography

### Headline (titles only)
- X-Large (H1): Fields Bold 48px — page titles only
- Large (H2): Fields SemiBold 36px
- Medium (H3): Fields SemiBold 26px
- Small (H4): Fields SemiBold 22px
- X-Small: Inter 18px (variable weight)

### Body Text (all non-headline copy)
- Large: Inter 16px
- Medium: Inter 15px (default)
- Small: Inter 14px
- X-Small: Inter 13px
- XX-Small: Inter 11px (extreme space constraints only)
- Weights: Regular, Medium, SemiBold, Bold

## Icons

- Source: **Font Awesome** (search: https://fontawesome.com/search?o=r&s=solid&ip=classic)
- Custom Fabric icons use `bs-` prefix (e.g., `bs-clock-paper-airplane`)
- Default style: outlined/regular. Active/selected state: solid.
- Always pair icons with text labels (exceptions: universally understood icons like trash, close).
- Icon and text should be the same color.

## Color Tokens

Semantic tokens only — never hardcode.

- **Success**: green variants (strong/medium/weak)
- **Error**: red variants
- **Warning**: orange variants
- **Info**: blue variants
- **Primary**: brand green variants
- **Discovery**: purple variants
- **Neutral**: brown-gray variants
- **Link**: blue (#0b4fd1)

Use `text-*`, `surface-*`, `border-*`, `icon-*` token prefixes.

### Spacing System

Fabric uses a **4px atomic grid spatial system**. All spacing values must be multiples of 4px. When writing custom layout CSS, use 4/8/12/16/20/24/32/40/48/64 — never odd or non-multiple values like 5px, 10px, 15px, 25px.

---

## TileV2 for Stats & Dashboard Metrics

Use `TileV2` for displaying stats, metrics, or object groups with in-tile actions.

**Props:** `icon` (required), `title` (required), `description`, `orientation` (`horizontal`|`vertical`), `titleSize` (`small`|`medium`|`large`), `actions`, `variant` (`muted`|undefined)

**Status colors** — TileV2 doesn't have built-in status colors. Wrap in a div with CSS:
```tsx
<div className="stat-tile-wrapper stat-tile-wrapper--error">
  <TileV2 icon="triangle-exclamation-solid" title="4" description="Overdue" orientation="horizontal" />
</div>
```
```css
.stat-tile-wrapper--error { background-color: var(--fabric-surface-color-error-weak); border-radius: 8px; }
.stat-tile-wrapper--error [data-fabric-component="TileV2"] { background-color: transparent; }
```

## Table Pattern for Gridlets

```tsx
<Gridlet header={<Gridlet.Header title="Title (count)" />}>
  <Gridlet.Body>
    <div className="insights-card-content">
      <InlineMessage status="ai" title="..." description="..." />
      <div className="insights-table-container">
        <table className="insights-table">
          <thead><tr><th>Employee</th><th>Type</th><th>Action</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="employee-cell">
                    <Avatar src={...} size={32} />
                    <div>
                      <BodyText size="small" weight="medium">Name</BodyText>
                      <BodyText size="extra-small" color="neutral-weak">Subtitle</BodyText>
                    </div>
                  </div>
                </td>
                <td><Pill muted type={PillType.Info}>Type</Pill></td>
                <td><Button size="small" variant="outlined" color="secondary">Action</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Gridlet.Body>
</Gridlet>
```

## React Hook Form Integration

Fabric provides RHF-compatible wrappers for: AutocompleteSingle, AutocompleteMultiple, Checkbox, RadioGroup, TextField, CurrencyField, EmailField, DatePicker, SelectField. In Storybook, look for stories suffixed with "RHF".

---

## Experience Architecture Patterns

BambooHR's product organization uses reusable experience patterns across 13 product teams. When building pages, apply the correct pattern for the context:

### Navigation Patterns
- **Global Navigation** → App-level navigation bar (Global Header + Global Navigation components)
- **Section Navigation** → SideNavigation for multi-section pages (Settings, Profile)
- **Sub-section Navigation** → SideSubNavigation for nested content within a section
- **Content Tabs** → Filled Tabs for page-level views, Lined Tabs within Sections

### Page Archetypes
- **Dashboard** → Gridlet-based layout with TileV2 stats, tables, and action cards (see Home template)
- **List/Directory** → Table or card grid with search, filters, pagination (see People template)
- **Detail View** → Section-based content with tabs for related data (see Profile, Job Opening Detail)
- **Settings** → SideNavigation + Section-based forms (see Settings template)
- **Wizard/Flow** → HorizontalWizard or VerticalWizard for multi-step processes (see Create Job Opening)
- **Inbox/Queue** → SideNavigation list + detail panel (see Inbox template)

### Permission-Aware Patterns
- Use `BlankState` for features the user doesn't have access to
- Use `InPageMessage` for permission-related notices
- Never show disabled controls without explanation — use Tooltip or InlineMessage

### AI Integration Patterns
- Use `InlineMessage status="ai"` for AI-generated suggestions within existing workflows
- Use `ActionTile variant="ai"` for AI-powered feature entry points
- Always use `color="ai" variant="outlined"` for action buttons in AI contexts
- AI features should augment, not replace — always provide manual alternatives

### Onboarding Patterns
- Use task cards with checkboxes for onboarding checklists (see New Employee template)
- Use `ProgressBar` for completion tracking
- Use `BlankState` for first-time-use states with clear calls to action

---

## Contribution Pipeline

### For Designers Building with Claude Code

When creating new components, pages, or patterns:

1. **Check existing patterns first** — Review `src/pages/` for similar implementations before building new
2. **Use Fabric components** — Never create custom UI when a Fabric component exists
3. **Follow file structure conventions:**
   ```
   src/pages/[PageName]/
   ├── [PageName].tsx     # Component
   ├── [PageName].css     # Page-specific styles only
   └── index.ts           # Export
   ```
4. **Register the page:**
   - Add lazy import in `App.tsx`
   - Add Route in `App.tsx`
   - Add entry to PrototypeIndex (optional)
5. **Validate before submitting:**
   - Run `npm run dev` and test locally
   - Run `/orbit --scan` to check Fabric compliance
   - Run `/countdown` for full pre-merge checklist
6. **Branch naming:** `feature/prototype-[descriptive-name]-[initials]`
7. **One prototype per branch** — Don't mix multiple prototypes in a single branch

### Naming Conventions
- **Folders**: PascalCase (`CreateJobOpening/`)
- **Files**: Match folder name (`CreateJobOpening.tsx`)
- **Routes**: kebab-case (`/create-job-opening`)

### Status Tracking

| Status | Meaning |
|--------|---------|
| `ready` | Complete and reviewable |
| `in-progress` | Currently being built |
| `warning` | Needs design/code review |
| `error` | Build errors or broken |

---

## Prototype Mode

Teams can explore new ideas without Fabric constraints using `/launch --nebula`. This mode:
- Builds raw React components from Figma specs with custom CSS
- Does NOT use Fabric components or tokens
- Output is clearly marked as non-production

**Rules for prototype code:**
- Never merge prototype code directly into production
- When ready to productionize, run `/dock` to convert to Fabric components
- Or re-run `/launch` (without `--nebula`) to rebuild from scratch with Fabric
- Or run `/orbit --scan` to identify what needs migration
- Prototype files live in `src/prototypes/` (separate from production pages)

---

## When You Don't Know

If you're unsure which component to use or how to configure it:

1. Check `docs/fabric-component-reference.md` for the full API reference
2. Check `docs/figma-to-fabric-props.md` for Figma variant → Fabric prop mapping
3. Check `docs/fabric-components-links.md` for direct Storybook/Docs/Figma links
4. Open the Storybook link for the component to see interactive examples
5. Check the Weave docs link for usage guidelines and do's/don'ts
6. Look at similar prototype pages in `src/pages/` for real implementation examples
7. Ask in #pathfinder-design — don't guess and don't create custom components
