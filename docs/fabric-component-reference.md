# Fabric Design System - Complete Component API Reference

> Compiled from BambooHR's Fabric Storybook, Weave docs, and Figma.
> Storybook: https://fabric.bamboohr.net
> Docs: https://weave.bamboohr.net
> Figma Library: https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz
> Fabric for Claude: https://www.figma.com/design/7IHktnp21R07SgRbODpwns/Fabric-for-Claude

---

## Foundational (Atoms)

### Body Text
- **Purpose**: Base Text component for all non-headline copy
- **Sizes**: Large (16px/24px) | Medium (15px/22px, default) | Small (14px/20px) | X-Small (13px/19px) | XX-Small (11px/15px, extreme constraints only)
- **Font**: Inter
- **Weights**: Regular | Medium | SemiBold | Bold
- **Colors**: Use semantic token constructs -- text-neutral-x-strong (#38312f) is default. Available: success, primary, warning, neutral, link, info, error, discovery (each with strong/medium/weak)
- **Features**: Optional left-aligned icon (sized to match text). Icon and text should be the same color.
- **Guidelines**: Default to medium size. Never override styling.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-bodytext--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/text/body-text-kdGpI5ZP)

### Headline Text
- **Purpose**: Base component for all headline/title text. Semantic heading hierarchy.
- **Sizes**:
  - X-Large (H1): Fields Bold, 48px/58px -- page titles only
  - Large (H2): Fields SemiBold, 36px/48px
  - Medium (H3): Fields SemiBold, 26px/34px
  - Small (H4): Fields SemiBold, 22px/30px
  - X-Small: Inter, 18px/26px (variable weight: Regular/Medium/SemiBold/Bold)
- **Colors**: text-primary-strong (#2e7918), text-neutral-x-strong (#38312f), text-neutral-strong (#48413f), text-neutral-weak (#777270), text-neutral-inverted (#ffffff), text-link (#0b4fd1)
- **Features**: Optional left-aligned icon (fixed size per headline size)
- **Guidelines**: Reserve for titles only. Avoid x-large in page content (reserved for Page Header).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-headline--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/text/headline-text-x2D6A53f-x2D6A53f)

### Icon v2
- **Source**: Font Awesome (https://fontawesome.com/search?o=r&s=solid&ip=classic)
- **Custom icons**: Use `bs-` prefix for Fabric custom icons. Submit SVGs to `/assets/icons` in static-assets repo.
- **Styles**: Default = outlined/regular. Active/selected = solid.
- **Sizes**: Preset range from 10px to 170px
- **Colors**: Semantic token categories -- success, info, primary, error, warning, neutral, files (doc/esig/pdf/ppt/excel), notice, discovery, link. Each with strong/medium/weak intensity.
- **Guidelines**: Always pair icons with text labels (except universally understood: trash, close, etc.). Don't override preset sizes. Don't overload UI with excessive icons.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-icon--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/icon-v2-65Icscdi)

### Styled Box
- **Purpose**: Ultra-flexible generic container. Underlying component for base box elements.
- **Background**: `weak` (surface-neutral-inverted) | `medium` (surface-neutral-xx-weak)
- **Border**: `none` | `light` (border-neutral-x-weak) | `dark` (border-neutral-medium) | `primary` (border-primary-medium)
- **Border Radius**: `none` | `small` (radius-xx-small) | `medium` (radius-x-small) | `large` (radius-small) | `full` (radius-full)
- **Shadow**: `none` | `medium` (base-shadow-300) | `large` (base-shadow-500)
- **Guidelines**: Don't recreate existing components (Section, Tile). Use only as a foundational container.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-styledbox--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/styled-box-WxgziJSy-WxgziJSy)

### Divider
- Visual separator element
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-divider--guide)

### Link
- Standard hyperlink component
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-link--guide)

---

## Buttons

### Button (Standard)
- **Colors**: `primary` (default) | `secondary` | `ai` | `inherit`
- **Variants**: `contained` (default) | `outlined` | `text`
- **Sizes**: `small` | `medium` (default) | `large`
- **Themes**: `light` (default) | `dark`
- **States**: default, hover, active, focused, disabled, processing
- **⚠️ CRITICAL - Icon + Text**: The `icon` prop renders as **icon-only** (text children ignored!). To show both icon AND text, use `startIcon` with `IconV2`:
  ```tsx
  // CORRECT - icon + text
  <Button startIcon={<IconV2 name="bolt-solid" size={16} />}>Click me</Button>

  // WRONG - renders icon-only, text ignored
  <Button icon="bolt-solid">Click me</Button>
  ```
- **AI Variant**: Use `color="ai" variant="outlined"` for AI-powered actions. **CRITICAL: AI styling ONLY works with `variant="outlined"`**. Without the outlined variant, AI buttons will render as green primary buttons instead of purple AI buttons.
- **Guidelines**: One primary button per context. Use verb-based labels. Small = in-page content, Medium = forms, Large = signature experiences.
- [Storybook](https://fabric.bamboohr.net/?path=/story/components-buttons-button--standard) | [Storybook (AI)](https://fabric.bamboohr.net/?path=/story/components-buttons-button--ai-variant) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/standard-button-KKWZdOkf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:1221)

### Icon Button
- Dedicated component for icon-only buttons (do not use Standard Button for icon-only)
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-buttons-iconbutton--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/icon-button-kolq93ny)

### Text Button
- Text-only button variant for lower-emphasis actions (e.g., Cancel)
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-buttons-textbutton--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/text-button-uXnJLlxr)

### Button Group
- Groups multiple buttons together
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-buttons-buttongroup--guide)

### Dropdown
- Button that spawns a menu (NOT a form input -- use SelectField for form inputs)
- **Button types**: Can use Standard, Icon, or Text button as trigger
- **Menu**: Inherits menu configuration from SelectField (widths, variations)
- **Note**: In Figma, implemented as a toggle on button components rather than a separate component.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-dropdown--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/dropdown-PUqzRz9T-PUqzRz9T)

---

## Data Entry (Form Components)

### Text Field
- **States**: default, error, warning, info, view, disabled
- **Sizes**: Aligned with buttons (small, medium, large)
- **Widths**: Preset widths communicate expected value length (e.g., smaller for ZIP, larger for URL)
- **Styling**: `form` (default, standard forms) | `single` (standalone, alongside buttons)
- **Label placement**: Above (default) or left (search filters). Can be omitted when context is clear.
- **Features**: Placeholder text, optional icons (start/end), inline buttons, input notes (right or below)
- **Validation**: Validate on form submit. Blur validation only for formatting errors. Use `*` for required fields. Don't disable save buttons for unfilled required fields.
- **Related**: DateField, CurrencyField, MaskedInput, TextArea
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-textfield--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/text-field-8jcZMvxc)

### Select Field
- Inherits TextField attributes: sizes, widths, states, note placement, single/form styling, label placement
- **Menu width**: Can differ from field width
- **Menu variations**:
  - Default (basic option list)
  - Selectable Options (multi-select, shows "[x] Selected")
  - Groups (titled option groups)
  - Anchored Options (fixed top/bottom items)
  - Flyouts (hierarchical submenus, max 3 levels)
  - Search (auto-added at 8+ options, auto-focused)
  - Add Item (modal to add new items, auto-selects on save)
  - Option Notes (descriptive text below options)
  - Option Icons (all or none per menu)
  - Disabled Options
- **Note**: Select Fields are NOT Dropdowns. Dropdowns are buttons that spawn a menu.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-select--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/select-field-O1pfoDne)

### Currency Field
- Specialized text input for monetary values with integrated currency selector
- **Structure**: Text input + right-side "nub" for currency selection
- **Styling**: Supports both form and single text input styling
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-currencyfield--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/currency-field-K0TMY2vX-K0TMY2vX)

### Date Field
- Specialized input for date entry. Built on TextField, inherits its sizes and states.
- **Input methods**: Manual typing or calendar icon to open DatePicker
- **Format**: Controlled by global Settings > Account > General Settings > Date Input Format
- **Width**: Fixed at width6 (don't override)
- **Clearing**: Dates cleared via backspace only (no clear button in picker)
- **Guidelines**: Display expected date format as placeholder
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-date-pickers-datepicker--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/date-field-YEKdT1lP-YEKdT1lP)

### Date Picker
- Calendar-based date selection interface. Must be used with DateField.
- **Variants**: Single Date | Range (short ranges, <1 month; use two pickers for multi-month) | Month Selector
- **Accessibility**: Built-in keyboard navigation and selection
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-date-pickers-datepicker--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/date-picker-WmRrGN0X-WmRrGN0X)

### Checkbox
- **Sizes**: `medium` (default) | `large` (for engaging experiences like task lists)
- **States**: required, error, disabled (selected or unselected), indeterminate (mixed group selection)
- **Features**: Notes per option for additional context
- **Guidelines**: Vertical layout, one per line. Max 8 options (use select for more). Positive/active wording. Concise labels.
- [Storybook (Group)](https://fabric.bamboohr.net/?path=/docs/components-checkboxgroup--guide) | [Storybook (Single)](https://fabric.bamboohr.net/?path=/docs/components-checkbox--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/checkbox-UOfPjWnf)

### Radio Button
- **Behavior**: Mutually exclusive -- selecting one deselects others
- **States**: standard, error, disabled, selected
- **Features**: Per-option notes/labels
- **Guidelines**: Always provide default selection. Prefer over dropdowns (lower cognitive load). Offer "None" option if users might skip. Provide "Other" with text field for open-ended cases.
- [Storybook (Group)](https://fabric.bamboohr.net/?path=/docs/components-radiogroup--guide) | [Storybook (Single)](https://fabric.bamboohr.net/?path=/docs/components-radio--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/radio-button-ZFqEdTIp)

### Rounded Toggle
- **Sizes**: `medium` (default) | `large`
- **Behavior**: Binary on/off. Auto-saves immediately on interaction. Always has a forced default value.
- **Guidelines**: Do NOT use in forms with a "Save" button (toggles auto-save). Use concise, keyword-forward labels (e.g., "Email notifications" not "Receive email notifications?"). Place labels in close proximity.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-toggles-roundedtoggle--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/toggles/rounded-toggle-5yO9i3id)

### Text Toggle
- Text-based toggle variant
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-toggles-texttoggle--guide)

### Autocomplete Single
- Single-selection autocomplete with search/filtering
- RHF integration available
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-autocompletesingle--guide)

### Autocomplete Multiple
- Multi-selection autocomplete with search/filtering. Selected items shown as Chips.
- RHF integration available
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-autocompletemultiple--guide)

### Chip
- **Variants**: Standard | Removable (with remove icon)
- **Use for**: Representing user-selected items (tags, users, categories). Works with Autocomplete components.
- **Guidelines**: 1-2 word labels, no text wrapping. Don't cluster too many in small areas.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-chip--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/chip-F0nyyIFQ-F0nyyIFQ)

### Selectable Box
- Enlarged card alternative to checkboxes/radio buttons with optional icons and descriptions
- **Modes**: Radio (single select) | Checkbox (multi-select with check indicators)
- **Props**: Label (required), icon (optional), description (optional). Minimum height maintained.
- **Guidelines**: Max 5 cards per group (use standard controls for more). Use clear labels with reinforcing icons.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-selectablebox--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/selectable-box-10WzqjA4-10WzqjA4)

### Transfer List
- Two-panel selector for choosing options from a large set
- **Variants**: Multi-select (shift/cmd keys + transfer buttons) | Single-select (instant transfer on click) | Single-select with Categories | With Filter and Search
- **Features**: Option metadata (text/icons), blank state display
- **Width**: Fixed, cannot be resized
- **Guidelines**: Use for large datasets needing multiple selections. Include filtering when meaningful categorization exists.
- [Storybook](https://fabric.bamboohr.net/?path=/story/components-transferlist-standard--controlled) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/transfer-list-ThP4Id7Q-ThP4Id7Q)

### File Uploader
- File upload component for forms
- **Variants**: Single file ("Choose File") | Multiple files ("Choose Files") | Drag & Drop
- **States**: Pre-Upload | Uploading | Post-Upload | Drop Target Active
- **Features**: Customizable button label. Drag & drop supported but not visually prominent by default.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-fileupload--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/file-uploader-wV62VF8C-wV62VF8C)

### Search Filter
- Search/filter input component
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-searchfilter--guide)

---

## Data Display & Media

### Table
- **Features**: Sortable columns, filtering, pagination (max 100 results), row actions (hover-triggered)
- **Variants**: Standard | Selectable Rows (checkboxes, indeterminate state) | Grouped Rows (headers with icons) | Collapsible Rows (caret indicators, sub-rows) | Pagination | Row Actions
- **Numerals**: Tabular variant (right-aligned, uniform width)
- **Guidelines**: Enable sorting/filtering/pagination for large datasets. Only for structured tabular data.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-table--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/table-2coo3oe5-2coo3oe5)

### Data Grid
- **Purpose**: Spreadsheet-like interface for viewing/editing tabular data (imports, bulk edits)
- **Cell types**: Standard (read-only) | Text Editor | Date Picker | Dropdown | Validation States (error/warning/info with tooltips)
- **Features**: Infinite scrolling, custom row numbering, row number toggle, row deletion (with confirmation modal)
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-datagrid--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/data-grid-mVtBpVka)

### Avatar
- **Type**: Atom-level component (building block for Badge, Tile, etc.)
- **Behavior**: Displays profile photo or placeholder. Preset sizes with corresponding border radius.
- **Guidelines**: Don't reshape or scale to unsupported sizes.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-avatar--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/avatar-69nJvlcd-69nJvlcd)

### Badge (v2)
- **Variants**: `person` (with Avatar) | `icon` (with Icon v2)
- **Sizes**: `small` | `medium` | `large` (predefined text/icon/avatar sizing per tier)
- **Props**: Title, optional subtitle
- **Guidelines**: When displaying multiple badges, lean toward smaller sizes.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-badgev2--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/badge-v2-2eQZA6O0)

### Pill
- **Types** (8): `brand` | `info` | `success` | `warning` | `error` | `neutral` (default) | `discovery` | `inverted` (dark bg)
- **Styles**: `standard` (heavier, prominent) | `muted` (subtle, use when multiple pills on page)
- **Behavior**: Hugs content, truncates at layout edge
- **Use for**: Status, properties, categories, compact supportive info
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-pill--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/pill-r8ljMNep-r8ljMNep)

### Calendar View
- **Purpose**: View-only calendar for communicating event dates. Not interactive (no date selection).
- **Variants**: Single month | Two consecutive months
- **Day states**: Default | Today | Highlight (range, e.g., pay period) | Prominent (singular event, e.g., payday) | Today Prominent
- **Features**: Tooltips on hover
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-calendarview--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/calendar-view-GXeMFKCy)

### Name Value Pair
- Displays label-value pairs
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-namevaluepair--guide)

### File Card
- Concise file representation with larger target areas than text links
- **File types**: E-signature, PDF, XLSX, ZIP, images (.png/.jpg/.jpeg/.gif/.tiff)
- **Variants**: Display (read-only, consumption context) | Attachment (editable, with mark-as-required/remove) | Attachment With Toggle (e-signature required/optional)
- **Use for**: Quick file identification/access. Not for extensive metadata (use modals).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-filecard--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/file-card-ntZA9SpO-ntZA9SpO)

### Gridlet
- Grid-based display component for dashboard widgets and cards
- **Structure**: `<Gridlet header={<Gridlet.Header title="..." />}><Gridlet.Body>...</Gridlet.Body></Gridlet>`
- **⚠️ CRITICAL - Single Wrapper Rule**: `Gridlet.Body` uses `justify-content: space-between`. If it has MULTIPLE direct children, they get distributed to top/middle/bottom with large white space gaps. **Always wrap ALL content in ONE container div.**
- **⚠️ CRITICAL - No Flex Component**: Never use Fabric's `Flex` component inside `Gridlet.Body` - use plain `<div>` with CSS flexbox instead.
- **Content Pattern**:
  ```tsx
  <Gridlet.Body>
    <div className="widget-content">  {/* ONE wrapper for ALL content */}
      <div className="alerts-section">
        <InlineMessage ... />
        <InlineMessage ... />
      </div>
      <div className="table-section">...</div>
    </div>
  </Gridlet.Body>
  ```
- **CSS for content-fit height**: Override Gridlet's default height stretching:
  ```css
  .container [data-fabric-component="Gridlet"] { height: auto !important; }
  .container [data-fabric-component="Gridlet"] > section,
  .container [data-fabric-component="Gridlet"] > section > div { height: auto !important; flex: none !important; }
  ```
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-gridlet--guide)

### Wistia Video
- Wistia video embed component
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-wistiavideo--guide)

---

## Layout & Containers

### Page Capsule
- Top-level page container
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-pagecapsule--guide)

### Page Header V2
- Page-level header with title and optional actions
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-pageheaderv2--guide)

### Section
- **Purpose**: Universal container for page content
- **Props**: `header` (optional), `icon` (optional), `title` (required if header), `description` (optional), `actions` (optional, small buttons, right-aligned), `divider` (optional)
- **Header sizes**: small | medium (default) | large
- **Subsection Headers**: Standalone variant with divider ABOVE (not below)
- **Guidelines**: All page content should exist within a Section (exceptions: Vertical Wizard, Side Navigation, Page Header, Filled Tabs). Single sections must fill available vertical space. Visual styling is fixed.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-section--guide) | [Docs](https://weave.bamboohr.net/latest/components/layout-containers/section-REikPapP-REikPapP)

### Flex
- Flexbox layout utility component
- **Props**: `flexDirection`, `gap`, `alignItems`, `justifyContent`, etc.
- **⚠️ NEVER use inside Gridlet.Body**: The `Flex` component applies `flex-grow` and `flex-shrink` that interact badly with Gridlet's internal `space-between` layout, causing large white space gaps.
- **Alternative**: Use plain `<div>` elements with CSS flexbox properties:
  ```css
  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  ```
- **Safe to use**: In page-level layouts, headers, forms, and other contexts outside of Gridlet.Body.

---

## Navigation & Controls

### Tabs
- **Types**:
  - **Filled**: Colored background. For Page Capsule contexts, not Sections. Themes: dark/light. Sizes: medium (default) / large (with optional description).
  - **Lined**: Minimal, for use within Sections. Supports text labels with optional icons, or icon-only.
- **Guidelines**: 1-2 word labels. Arrange by priority (high-use first = default). Don't use when content from multiple tabs needs simultaneous comparison. Don't use as page navigation.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-tabs--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/tabs-ukpNPipu-ukpNPipu)

### Side Navigation
- **Density**: Default | Compact (space-constrained layouts)
- **Item states**: inactive, active, hover, disabled, dividers
- **Placement**: Outside Section, on top of Page Capsule background
- **With Sub Navigation**: Works with SideSubNavigation for second-level nav
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-sidenavigation--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/side-navigation-QfNqkvt2-QfNqkvt2)

### Side Sub Navigation
- Secondary navigation alongside Side Navigation for subsections
- **Features**: Group headers (always with divider above), icon support (all or none)
- **Item states**: inactive, active, hover, disabled
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-sidesubnavigation--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/side-subnavigation-KH7bwqi8)

### Global Header
- Application-level header
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-header--guide)

### Global Navigation
- Application-level navigation
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-globalnavigation--guide)

### Action Footer
- **Behavior**: Fixed at bottom of screen. Top border appears when content scrolls beneath.
- **Button alignment**: Left-aligned, primary leftmost. Order: primary > secondary > text button. Max 3 buttons.
- **Content slots**: Default (buttons), `children` (after buttons), `right-content` (right side)
- **Themes**: Standard | Dark (for ATS/Offer Letters pages)
- **Responsive**: Content stacks on smaller screens
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-actionfooter--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/action-footer-oL0OaCFf-oL0OaCFf)

---

## Interactive Overlays

### Modal
- **Sizes**: `small` (608px) | `medium` (800px) | `full-screen` (fills window with buffer)
- **Header variants**: Standard Headline (icon + text) | Hero Headline (icon 54px + subtext)
- **Content slots**: Upper Content (16px padding) | Lower Content
- **Button alignment**: Small/Medium = right-aligned (primary rightmost). Full-screen = left-aligned (primary leftmost). Cancel = text button.
- **Templates**:
  - Warning Confirmation (triangle-exclamation icon)
  - Delete Confirmation (trash-can icon)
  - Aggressive Confirmation (requires typed confirmation, case-insensitive)
- **Multistep**: Sequential flows. "Continue" primary + "Previous" secondary on non-final steps.
- **Guidelines**: Use Title Case for titles. Only use when absolutely necessary -- not for optional info, success/failure states.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-modals-standardmodal--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/modal-YAHPMi3g-YAHPMi3g)

### Sheet
- Sub-modal (modal within a modal) for confirmations/additional info gathering
- **Sizes**: Small (528px) | Medium (720px) | Large (912px)
- **Guidelines**: Use smallest size that works. Should be smaller than parent modal. Max one level deep (no nested sheets).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-modals-sheetmodal--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/sheet-6Jcd8Xg7)

### Popover
- Non-modal dialog providing additional info, triggered by click (hover planned for future)
- **Dismissal**: X icon, escape key, or clicking outside
- **Content**: Title + description (default), supports rich content (inputs, actions)
- **Placement**: right, bottom-left, top, bottom-end, bottom-start, left-end, left-start, right-end, right-start, top-end, top-start
- **Max-width**: 324px (can be disabled)
- **Options**: Disable click-outside-to-close, hide dismiss button
- **Use for**: Rich supplementary info, detailed info tied to specific elements
- **Don't use for**: Large content, complex forms, critical info needing constant visibility
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-popover--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/popover-reLx9v9y-reLx9v9y)

### Tooltip
- Brief informative text on hover
- **Placement**: `top` (default) | bottom-end, bottom-start, bottom, left-end, left-start, left, right-end, right-start, right, top-end, top-start
- **Props**: Content text, optional `title` (heavier font-weight)
- **Max-width**: 300px. Text wraps for multiple lines.
- **Styling**: surface-neutral-xx-strong background, white text. Fixed/non-customizable.
- **Guidelines**: 1-2 lines max (3 absolute max). No periods for single sentences. Use Popover for complex/interactive content.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-tooltip--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/tooltip-EU5hfndg)

### Accordion
- Expandable/collapsible content sections
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-accordion--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/accordion-4Qbd8mTf)

### Tile (v2)
- **Required props**: `icon` (Font Awesome name, or avatar), `title`
- **Optional props**: `description`, `actions` (small buttons)
- **Orientation**: `horizontal` (icon side, content side) | `vertical` (icon top, content below)
- **Action placement**: `bottom` | `right` (vertical only)
- **Title sizes**: small (default) | medium | large
- **Styles**: default | muted (disabled/inactive objects)
- **Right content**: Slot at top-right (vertical only)
- **Guidelines**: Use as groups. Don't mix orientations in a group. Don't use for files (use FileCard).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-tilev2--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/tile-v2-bTHKEaDV)

### Action Tile
- Fully clickable card component (entire surface is interactive, unlike Tile which has nested buttons)
- **Required props**: `icon` (Font Awesome name, or avatar), `title`
- **Optional props**: `description`, `right content` (vertical only), `variant`
- **Orientation**: horizontal | vertical
- **Title sizes**: small (default) | medium | large
- **Variants**: default | `ai` (AI-themed styling for AI-powered features)
- **AI Variant**: Use `variant="ai"` to indicate AI-powered functionality with distinct visual styling.
- **Guidelines**: Use as groups. Don't mix orientations. Don't use for files (use FileCard).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-actiontile--guide) | [Storybook (AI)](https://fabric.bamboohr.net/?path=/story/components-actiontile--ai-variant) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/action-tile-5XnOb6SX)

### Interstitial
- Full-page overlay/interstitial component
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-interstitial--guide)

### Carousel
- Carousel/slider component
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-carousel--guide)

---

## Feedback & Messaging

### Banner
- **Placement**: Top of screen, 100% width. Part of page flow (pushes content down).
- **Types**: `informational` | `warning` | `critical` | `trial`
- **Props**: `icon` (optional), `message` (required), `is_dismissible` (optional boolean), `right_content` (optional, right-aligned actions/text)
- **Guidelines**: Target messages to specific audiences. Keep under 2 lines on mobile. Don't use for temporary feedback (use Slidedown). Links need underlines on dark backgrounds.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-banner--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/banner-7x6JPPSc)

### Action Banner
- Banner variant with action capabilities
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-actionbanner--guide)

### Slidedown
- **Behavior**: Toast notification sliding from top of window. Auto-dismisses (unless dismissable).
- **Types**: `information` | `success` | `error` | `warning` | `discovery` (future)
- **Props**: `title` (required), `description` (optional), `action` (optional, right-aligned button), `dismissable` (optional -- success variants cannot be dismissable)
- **Max-width**: 832px. Multiple slidedowns stack.
- **Use for**: Success/failure of actions, contextual info immediately after action.
- **Don't use for**: Critical info users must see (it's dismissible).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-slidedown--guide&args=type:success) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/slidedown-Hh10iWuM)

### In-Page Message
- **Types**: `information` | `success` | `error` | `warning` | `discovery` (future)
- **Props**: `icon` (optional, defaults per variant), `title` (required), `description` (optional), `action` (optional, right-aligned button), `dismissable` (optional, encouraged)
- **Placement**: Page-level, not section/field level. Can be positioned above sections.
- **Guidelines**: Don't show multiple In-Page Messages at once (use Inline Messages instead).
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-inpagemessaging--guide&args=action:!false) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/in-page-message-ikoWZ3ci)

### Inline Message
- **Status**: `information` | `success` | `error` | `warning` | `discovery` (future) | `ai` | `neutral`
- **Props**: `status` (required), `icon` (optional), `title` (required), `description` (optional), `action` (optional, right-aligned button), `variant` (optional), `size` (optional)
- **Variants**: `default` (status-colored bg for white surfaces) | `light` (reversed-out for darker surfaces)
- **Sizes**: `medium` (default) | `small` (compact variant, also supports AI theming)
- **AI Theming**: Use `status="ai"` to display AI-specific styling for messages related to AI/ML features. Supports optional action button.
- **AI Action Buttons**: When using `status="ai"`, action buttons MUST use `<Button color="ai" variant="outlined">`. Without `variant="outlined"`, the button will render green instead of purple.
- **Use for**: Contextual info within content. Compact, inline placement. Use AI status for AI-generated content or AI feature guidance.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-inlinemessage--guide&args=action:!false) | [Storybook (AI)](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--ai-theming) | [Storybook (AI + Action)](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--ai-theming-with-action) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/inline-message-LXwNG31Y)

### Progress Bar
- **Default height**: 12px (customizable)
- **Use for**: File transfers, downloads, data processing, imports, page loads
- **Don't use for**: Near-instant tasks, multi-step processes, non-linear progress
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-progressbar--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/progress-bar-3NPOO7ID-3NPOO7ID)

### Blank State
- **Props**: `title` (required), illustration, `description` (optional), `actions` (optional)
- **Sizes**:
  - Page-level: Larger custom illustrations (bs- prefix icons). One per page.
  - Section-level: Smaller Font Awesome icons. Use when multiple areas could be empty.
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-blankstate--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/blank-state-Gh0W2GgK-Gh0W2GgK)

### Confetti
- Celebration/confetti animation effect
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-confetti--guide)

---

## Wizards

### Horizontal Wizard
- Linear progression via footer buttons only (step names not clickable)
- Positioned immediately under page header
- Max 5 steps recommended
- Optional note field below wizard for contextual info
- [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/wizards-McbLDJlL)

### Vertical Wizard
- Navigable steps (step names are clickable for non-linear navigation)
- Supports disabled steps for conditional flows, tooltips on labels
- Handles up to ~10 steps
- **Use when**: Users need to revisit previous steps or skip unavailable options
- **Don't use**: If process requires only 1-2 steps
- [Storybook](https://fabric.bamboohr.net/?path=/docs/components-verticalwizard--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/wizards-McbLDJlL)

---

## Charts (from Storybook catalog)

Available chart components (details in Storybook):
- **Bar Charts** (25 story variants)
- **Donut Charts** (11 variants)
- **Line Charts** (16 variants)
- **Pie Charts** (4 variants)
- **Gradient Legend** (4 variants)
- **Legend** (9 variants)
- **Chart Colors** (standard palette)

---

## Page Templates (Figma only)

| Template | Figma |
|----------|-------|
| Settings | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=25420-56442) |
| Home | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=27821-24231) |
| EE Profile | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=25681-60685) |
| People / Lists | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=27830-25488) |
| People / Directory | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=27830-25729) |
| People / Org Chart | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=27830-26007) |
| Inbox | [Link](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz/Fabric-Library?node-id=27830-26412) |

---

## AI Components

Fabric provides AI-themed variants for components used in AI-powered features. These variants have distinct styling to visually differentiate AI functionality.

| Component | AI Prop | Description | Storybook |
|-----------|---------|-------------|-----------|
| Button | `color="ai" variant="outlined"` | AI-styled button for AI-powered actions. **MUST use `variant="outlined"`** | [SB](https://fabric.bamboohr.net/?path=/story/components-buttons-button--ai-variant) |
| ActionTile | `variant="ai"` | AI-styled clickable card for AI features | [SB](https://fabric.bamboohr.net/?path=/story/components-actiontile--ai-variant) |
| InlineMessage | `status="ai"` | AI-styled inline message for AI content/guidance | [SB](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--ai-theming) |
| InlineMessage (small) | `status="ai"` + `size="small"` | Compact AI-styled inline message | [SB](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--small-ai-theming) |

**Guidelines for AI Components:**
- Use AI variants to clearly indicate AI-powered functionality to users
- Maintain consistency -- if one AI feature uses AI styling, all AI features should
- AI styling helps set user expectations about AI-generated or AI-assisted content
- Combine with appropriate messaging about AI capabilities and limitations
- **CRITICAL for Buttons**: AI color styling (`color="ai"`) ONLY works with `variant="outlined"`. Without this variant, buttons render as green primary instead of purple AI. Always use: `<Button color="ai" variant="outlined">...</Button>`

---

## Quick Reference Tables

### Messaging Hierarchy

| Need | Component |
|------|-----------|
| Global persistent notice (surveys, trials) | **Banner** |
| Temporary success/failure toast | **Slidedown** |
| Page-level contextual feedback | **In-Page Message** |
| Inline contextual guidance | **Inline Message** |
| Field-level validation | **TextField** error/warning/info states |

### Form Component Picker

| Input Need | Component |
|------------|-----------|
| Free text | TextField |
| Currency/money | CurrencyField |
| Dates | DateField + DatePicker |
| Single choice (<6 options) | RadioGroup |
| Single choice (6+ options) | SelectField |
| Multiple choice (<8 options) | CheckboxGroup |
| Multiple choice (8+ options) | SelectField (selectable) or AutocompleteMultiple |
| Binary on/off (auto-save) | RoundedToggle |
| Binary on/off (form submit) | Checkbox |
| Tags/tokens | Chip + AutocompleteMultiple |
| Large dataset multi-select | TransferList |
| Visual card selection | SelectableBox |
| File upload | FileUploader |

### React Hook Form (RHF) Integration

Fabric provides RHF-compatible wrappers for: AutocompleteSingle, AutocompleteMultiple, Checkbox, RadioGroup, TextField, CurrencyField, EmailField, DatePicker, and SelectField. In Storybook, look for stories suffixed with "RHF".

### All Component Links

| Component | Storybook | Docs | Figma |
|-----------|-----------|------|-------|
| Accordion | [SB](https://fabric.bamboohr.net/?path=/docs/components-accordion--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/accordion-4Qbd8mTf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=27625:128) |
| Action Banner | [SB](https://fabric.bamboohr.net/?path=/docs/components-actionbanner--guide) | -- | [Figma](http://figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=8406:52727) |
| Action Footer | [SB](https://fabric.bamboohr.net/?path=/docs/components-actionfooter--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/action-footer-oL0OaCFf-oL0OaCFf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:2971) |
| Action Tile | [SB](https://fabric.bamboohr.net/?path=/docs/components-actiontile--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/action-tile-5XnOb6SX) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=8348:51719) |
| Action Tile (AI Variant) | [SB](https://fabric.bamboohr.net/?path=/story/components-actiontile--ai-variant) | -- | -- |
| Autocomplete Multiple | [SB](https://fabric.bamboohr.net/?path=/docs/components-autocompletemultiple--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=8622:25162) |
| Autocomplete Single | [SB](https://fabric.bamboohr.net/?path=/docs/components-autocompletesingle--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=8622:25162) |
| Avatar | [SB](https://fabric.bamboohr.net/?path=/docs/components-avatar--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/avatar-69nJvlcd-69nJvlcd) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1445:25245) |
| Badge v2 | [SB](https://fabric.bamboohr.net/?path=/docs/components-badgev2--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/badge-v2-2eQZA6O0) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1704:6386) |
| Banner | [SB](https://fabric.bamboohr.net/?path=/docs/components-banner--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/banner-7x6JPPSc) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1259:19413) |
| Blank State | [SB](https://fabric.bamboohr.net/?path=/docs/components-blankstate--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/blank-state-Gh0W2GgK-Gh0W2GgK) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=12038:31210) |
| Body Text | [SB](https://fabric.bamboohr.net/?path=/docs/components-bodytext--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/text/body-text-kdGpI5ZP) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=454:914) |
| Button (Standard) | [SB](https://fabric.bamboohr.net/?path=/story/components-buttons-button--standard) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/standard-button-KKWZdOkf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:1221) |
| Button (AI Variant) | [SB](https://fabric.bamboohr.net/?path=/story/components-buttons-button--ai-variant) | -- | -- |
| Button Group | [SB](https://fabric.bamboohr.net/?path=/docs/components-buttons-buttongroup--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:3090) |
| Calendar View | [SB](https://fabric.bamboohr.net/?path=/docs/components-calendarview--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/calendar-view-GXeMFKCy) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25498:9536) |
| Carousel | [SB](https://fabric.bamboohr.net/?path=/docs/components-carousel--guide) | -- | -- |
| Checkbox | [SB](https://fabric.bamboohr.net/?path=/docs/components-checkbox--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/checkbox-UOfPjWnf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=687:5179) |
| Checkbox Group | [SB](https://fabric.bamboohr.net/?path=/docs/components-checkboxgroup--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/checkbox-UOfPjWnf) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=687:5179) |
| Chip | [SB](https://fabric.bamboohr.net/?path=/docs/components-chip--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/chip-F0nyyIFQ-F0nyyIFQ) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=872:2359) |
| Confetti | [SB](https://fabric.bamboohr.net/?path=/docs/components-confetti--guide) | -- | -- |
| Currency Field | [SB](https://fabric.bamboohr.net/?path=/docs/components-currencyfield--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/currency-field-K0TMY2vX-K0TMY2vX) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25046:15173) |
| Data Grid | [SB](https://fabric.bamboohr.net/?path=/docs/components-datagrid--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/data-grid-mVtBpVka) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=18347:40674) |
| Date Field | [SB](https://fabric.bamboohr.net/?path=/docs/components-date-pickers-datepicker--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/date-field-YEKdT1lP-YEKdT1lP) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25046:15173) |
| Date Picker | [SB](https://fabric.bamboohr.net/?path=/docs/components-date-pickers-datepicker--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/date-picker-WmRrGN0X-WmRrGN0X) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:29387) |
| Divider | [SB](https://fabric.bamboohr.net/?path=/docs/components-divider--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25682:4126) |
| Dropdown | [SB](https://fabric.bamboohr.net/?path=/docs/components-dropdown--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/dropdown-PUqzRz9T-PUqzRz9T) | [Figma](https://www.figma.com/design/0sjpCktKnfFT31CuECm8oz?node-id=27625-47503) |
| File Card | [SB](https://fabric.bamboohr.net/?path=/docs/components-filecard--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/file-card-ntZA9SpO-ntZA9SpO) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=20686:32852) |
| File Uploader | [SB](https://fabric.bamboohr.net/?path=/docs/components-fileupload--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/file-uploader-wV62VF8C-wV62VF8C) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25660:20567) |
| Global Header | [SB](https://fabric.bamboohr.net/?path=/docs/components-header--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25679:6789) |
| Global Navigation | [SB](https://fabric.bamboohr.net/?path=/docs/components-globalnavigation--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25679:2772) |
| Gridlet | [SB](https://fabric.bamboohr.net/?path=/docs/components-gridlet--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=5672:107153) |
| Headline Text | [SB](https://fabric.bamboohr.net/?path=/docs/components-headline--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/text/headline-text-x2D6A53f-x2D6A53f) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=454:877) |
| Icon v2 | [SB](https://fabric.bamboohr.net/?path=/docs/components-icon--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/icon-v2-65Icscdi) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25661:554) |
| Icon Button | [SB](https://fabric.bamboohr.net/?path=/docs/components-buttons-iconbutton--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/icon-button-kolq93ny) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:1765) |
| In-Page Message | [SB](https://fabric.bamboohr.net/?path=/docs/components-inpagemessaging--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/in-page-message-ikoWZ3ci) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25662:12034) |
| Inline Message | [SB](https://fabric.bamboohr.net/?path=/docs/components-inlinemessage--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/inline-message-LXwNG31Y) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25662:11817) |
| Inline Message (AI Theming) | [SB](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--ai-theming) | -- | -- |
| Inline Message (AI + Action) | [SB](https://fabric.bamboohr.net/?path=/story/components-inlinemessage--ai-theming-with-action) | -- | -- |
| Interstitial | [SB](https://fabric.bamboohr.net/?path=/docs/components-interstitial--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=8399:52388) |
| Link | [SB](https://fabric.bamboohr.net/?path=/docs/components-link--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25679:3113) |
| Modal | [SB](https://fabric.bamboohr.net/?path=/docs/components-modals-standardmodal--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/modal-YAHPMi3g-YAHPMi3g) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25662:15498) |
| Name Value Pair | [SB](https://fabric.bamboohr.net/?path=/docs/components-namevaluepair--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1691:3737) |
| Page Capsule | [SB](https://fabric.bamboohr.net/?path=/docs/components-pagecapsule--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1632:26568) |
| Page Header V2 | [SB](https://fabric.bamboohr.net/?path=/docs/components-pageheaderv2--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=31165:22914) |
| Pill | [SB](https://fabric.bamboohr.net/?path=/docs/components-pill--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/pill-r8ljMNep-r8ljMNep) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25485:2480) |
| Popover | [SB](https://fabric.bamboohr.net/?path=/docs/components-popover--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/popover-reLx9v9y-reLx9v9y) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=782:3574) |
| Progress Bar | [SB](https://fabric.bamboohr.net/?path=/docs/components-progressbar--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/progress-bar-3NPOO7ID-3NPOO7ID) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1949:19086) |
| Radio Button | [SB](https://fabric.bamboohr.net/?path=/docs/components-radio--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/radio-button-ZFqEdTIp) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=687:5230) |
| Radio Group | [SB](https://fabric.bamboohr.net/?path=/docs/components-radiogroup--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/radio-button-ZFqEdTIp) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=732:4594) |
| Rounded Toggle | [SB](https://fabric.bamboohr.net/?path=/docs/components-toggles-roundedtoggle--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/toggles/rounded-toggle-5yO9i3id) | -- |
| Search Filter | [SB](https://fabric.bamboohr.net/?path=/docs/components-searchfilter--guide) | -- | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25046:15173) |
| Section | [SB](https://fabric.bamboohr.net/?path=/docs/components-section--guide) | [Docs](https://weave.bamboohr.net/latest/components/layout-containers/section-REikPapP-REikPapP) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25682:3874) |
| Select Field | [SB](https://fabric.bamboohr.net/?path=/docs/components-select--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/select-field-O1pfoDne) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25345:19007) |
| Selectable Box | [SB](https://fabric.bamboohr.net/?path=/docs/components-selectablebox--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/selectable-box-10WzqjA4-10WzqjA4) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=708:2343) |
| Sheet | [SB](https://fabric.bamboohr.net/?path=/docs/components-modals-sheetmodal--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/sheet-6Jcd8Xg7) | -- |
| Side Navigation | [SB](https://fabric.bamboohr.net/?path=/docs/components-sidenavigation--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/side-navigation-QfNqkvt2-QfNqkvt2) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25679:4034) |
| Side Sub Navigation | [SB](https://fabric.bamboohr.net/?path=/docs/components-sidesubnavigation--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/side-subnavigation-KH7bwqi8) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1:208) |
| Slidedown | [SB](https://fabric.bamboohr.net/?path=/docs/components-slidedown--guide) | [Docs](https://weave.bamboohr.net/latest/components/feedback-messaging/slidedown-Hh10iWuM) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=644:4060) |
| Styled Box | [SB](https://fabric.bamboohr.net/?path=/docs/components-styledbox--guide) | [Docs](https://weave.bamboohr.net/latest/components/foundational/styled-box-WxgziJSy-WxgziJSy) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1809:29090) |
| Table | [SB](https://fabric.bamboohr.net/?path=/docs/components-table--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-display-media/table-2coo3oe5-2coo3oe5) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=1770:24276) |
| Tabs | [SB](https://fabric.bamboohr.net/?path=/docs/components-tabs--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/tabs-ukpNPipu-ukpNPipu) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25679:4803) |
| Text Button | [SB](https://fabric.bamboohr.net/?path=/docs/components-buttons-textbutton--guide) | [Docs](https://weave.bamboohr.net/latest/components/navigation-controls/buttons/text-button-uXnJLlxr) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25659:2681) |
| Text Field | [SB](https://fabric.bamboohr.net/?path=/docs/components-textfield--guide) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/text-field-8jcZMvxc) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=25046:15173) |
| Text Toggle | [SB](https://fabric.bamboohr.net/?path=/docs/components-toggles-texttoggle--guide) | -- | -- |
| Tile v2 | [SB](https://fabric.bamboohr.net/?path=/docs/components-tilev2--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/tile-v2-bTHKEaDV) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=7534:32797) |
| Tooltip | [SB](https://fabric.bamboohr.net/?path=/docs/components-tooltip--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/tooltip-EU5hfndg) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=782:3656) |
| Transfer List | [SB](https://fabric.bamboohr.net/?path=/story/components-transferlist-standard--controlled) | [Docs](https://weave.bamboohr.net/latest/components/data-entry/transfer-list-ThP4Id7Q-ThP4Id7Q) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=9729:25213) |
| Vertical Wizard | [SB](https://fabric.bamboohr.net/?path=/docs/components-verticalwizard--guide) | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/wizards-McbLDJlL) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=669:4416) |
| Horizontal Wizard | -- | [Docs](https://weave.bamboohr.net/latest/components/interactive-overlays/wizards-McbLDJlL) | [Figma](https://www.figma.com/file/0sjpCktKnfFT31CuECm8oz?node-id=592:3441) |
| Wistia Video | [SB](https://fabric.bamboohr.net/?path=/docs/components-wistiavideo--guide) | -- | -- |
