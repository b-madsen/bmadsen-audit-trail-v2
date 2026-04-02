---
name: telemetry
description: Analyze Fabric design system adoption, component usage, and system health
argument-hint: "[--components] [--patterns] [--candidates]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite
---

# /telemetry — System Adoption Analytics

Telemetry is the data stream from spacecraft to mission control. It tells Design Ops how the system is being used without inspecting every module by hand — component adoption rates, pattern consistency, custom code hotspots, and promotion candidates.

## Initial Prompt

When invoked, **check arguments for report type:**

**Full report (default):**
```
📊 Telemetry stream initiated...

Running full system analysis: component usage, pattern adherence, adoption metrics, and promotion candidates.
```

**If `--components`:**
```
📊 Telemetry: Component usage analysis...
```

**If `--patterns`:**
```
📊 Telemetry: Pattern adherence analysis...
```

**If `--candidates`:**
```
📊 Telemetry: Scanning for promotion candidates...

Looking for custom components used frequently enough to warrant inclusion in Fabric.
```

---

## Workflow

### Step 1: Scan the Codebase

```
Glob: src/pages/**/*.tsx
Glob: src/pages/**/*.css
Glob: src/components/**/*.tsx
Glob: src/components/**/*.css
Glob: src/prototypes/**/*.tsx (if exists)
Glob: src/data/**/*.ts
```

Count totals:
```
Total .tsx files: [N]
Total .css files: [N]
Pages: [N]
Shared components: [N]
Prototypes (nebula): [N]
```

### Step 2: Component Usage Analysis

#### 2a. Fabric Component Frequency

For every file, extract Fabric imports:

```
Grep: pattern="from '@bamboohr/fabric'" in src/**/*.tsx
```

Parse each import statement to get individual component names. Count total usage across the codebase.

Build the usage table, sorted by frequency:

```
| Rank | Component | Imports | Files | Category |
|------|-----------|---------|-------|----------|
| 1 | BodyText | 112 | 28 | Foundational |
| 2 | Button | 89 | 24 | Navigation |
| 3 | Section | 67 | 18 | Layout |
| 4 | IconV2 | 63 | 22 | Foundational |
| 5 | Headline | 58 | 20 | Foundational |
| 6 | TextField | 45 | 12 | Data Entry |
| 7 | Pill | 34 | 9 | Feedback |
| 8 | Avatar | 28 | 11 | Data Display |
```

#### 2b. Unused Fabric Components

Cross-reference against the full Fabric component list from `docs/fabric-component-reference.md`:

```
Read docs/fabric-component-reference.md
```

Extract all component names, compare against usage data:

```
**Available but unused Fabric components:**
- Accordion — Consider for FAQ pages or collapsible settings sections
- CalendarView — Consider for time-off or scheduling features
- Carousel — Consider for onboarding or feature tours
- Confetti — Consider for celebration moments (milestones, completions)
- DataGrid — Consider for bulk edit interfaces
- FileUploader — Consider for document management features
- HorizontalWizard — Consider for multi-step creation flows
- TransferList — Consider for permission/role assignment
```

#### 2c. Component Co-occurrence

Identify which components are frequently used together:

```
**Common component clusters:**
- Table + Pill + Avatar + Button — Used together in 8 files (list views)
- Section + TextField + SelectField + Button — Used together in 6 files (forms)
- Gridlet + TileV2 + InlineMessage — Used together in 4 files (dashboards)
- Modal + TextField + Button + TextButton — Used together in 5 files (form modals)
```

This data informs pattern documentation — clusters that appear 3+ times are de facto patterns.

### Step 3: Pattern Adherence Analysis

#### 3a. Page Archetype Detection

For each page in `src/pages/`, analyze the component usage to determine which archetype it follows:

```
Read each src/pages/*/[PageName].tsx
```

Classify based on component presence:
- Has Gridlet + TileV2 → **Dashboard**
- Has Table + filters → **List**
- Has Tabs + NameValuePair → **Detail**
- Has SideNavigation + form fields + ActionFooter → **Settings**
- Has Wizard component → **Wizard**
- Has SideNavigation (compact) + detail panel → **Inbox**
- Doesn't match → **Unclassified** (flag for review)

```
| Page | Detected Archetype | Confidence | Notes |
|------|--------------------|------------|-------|
| Home | Dashboard | High | Gridlets, TileV2, stats |
| People | List | High | Table, filters, search |
| Settings | Settings | High | SideNav, forms, ActionFooter |
| MyInfo | Detail | High | Tabs, NameValuePair |
| CreateJob | Wizard | High | VerticalWizard steps |
| Inbox | Inbox | High | SideNav compact + detail |
| Payroll | Dashboard + List | Medium | Mixed: stats cards + data table |
| Reports | Unclassified | Low | Custom chart-heavy layout |
```

#### 3b. Pattern Consistency

For pages in the same archetype, check for consistency:

```
**Dashboard pages consistency:**
- Home: ✅ Uses Gridlet layout, TileV2 for stats
- Payroll: ⚠️ Uses custom card divs instead of Gridlet for some sections

**List pages consistency:**
- People: ✅ Standard Table + filter pattern
- Hiring: ✅ Standard Table + Tabs pattern
- Files: ⚠️ Uses custom list instead of Table component
```

#### 3c. Navigation Pattern Adherence

Check that navigation components are used correctly:

```
| Page | Expected Nav | Actual Nav | Match |
|------|-------------|------------|-------|
| Settings | SideNavigation | SideNavigation | ✅ |
| MyInfo | Tabs (filled) | Tabs (filled) | ✅ |
| People | Tabs (filled) | Tabs (filled) | ✅ |
| Hiring | Tabs (filled) | Custom tab implementation | ❌ |
```

### Step 4: Custom Component Analysis

#### 4a. Custom Component Inventory

Find all locally-defined components that are NOT from Fabric:

```
Glob: src/components/**/*.tsx
```

For each file in `src/components/`, determine:
- Component name
- Where it's used (grep for imports across src/pages/)
- What it does (analyze the JSX)
- Whether a Fabric equivalent exists

```
| Custom Component | File | Used In | Similar Fabric Component | Gap |
|-----------------|------|---------|------------------------|-----|
| StatCard | src/components/StatCard.tsx | Home, Payroll | TileV2 | Minor prop differences |
| CustomModal | src/components/CustomModal.tsx | Hiring | Modal | Uses non-standard animation |
| FilterBar | src/components/FilterBar.tsx | People, Hiring, Reports | None (composite) | Candidate for shared pattern |
| EmployeeRow | src/components/EmployeeRow.tsx | People | Table row | Table can handle this |
```

#### 4b. Promotion Candidates

Components used in 3+ files that don't have a Fabric equivalent:

```
**Promotion candidates (used 3+ times, no Fabric match):**

1. **FilterBar** — Used in 5 pages
   - Composite: TextField (search) + SelectField (filters) + Button (clear)
   - Recommendation: Document as an official pattern, consider Fabric composite

2. **StatusBadge** — Used in 4 pages
   - Near-match: Pill + Badge combination
   - Recommendation: Migrate to Pill (muted) — covers 90% of use cases

3. **EmptySearchState** — Used in 3 pages
   - Near-match: BlankState
   - Recommendation: Migrate to BlankState with search-specific messaging
```

#### 4c. Migration Opportunities

Custom components that SHOULD be Fabric components but aren't:

```
| Custom Component | → Fabric Component | Effort | Impact |
|-----------------|-------------------|--------|--------|
| CustomButton | Button | Low | 12 files affected |
| StatusTag | Pill (muted) | Low | 8 files affected |
| InfoCard | Section or TileV2 | Medium | 5 files affected |
| ModalWrapper | Modal | Medium | 3 files affected |
```

### Step 5: Adoption Metrics

Calculate overall system health scores:

```
**Fabric Adoption Score:**
- Components available: [N]
- Components in use: [M] ([%])
- Custom components: [P]
- Custom components that should be Fabric: [Q]
- Effective adoption: [calculated %]

**Pattern Adherence Score:**
- Pages analyzed: [N]
- Pages following an archetype: [M] ([%])
- Pages with consistent navigation: [P] ([%])
- Unclassified pages: [Q]

**Code Health Score:**
- Files with 0 compliance violations: [N] ([%])
- Average violations per file: [X]
- Critical violation density: [X per 100 lines]
```

### Step 6: Generate Report

Save results for trend tracking:

```bash
mkdir -p docs/telemetry-reports
```

Write JSON data to `docs/telemetry-reports/telemetry-[date].json`:

```json
{
  "date": "[timestamp]",
  "fabricAdoption": {
    "available": 65,
    "inUse": 38,
    "adoptionRate": 0.58
  },
  "patternAdherence": {
    "pagesAnalyzed": 12,
    "pagesFollowingArchetype": 10,
    "adherenceRate": 0.83
  },
  "customComponents": {
    "total": 15,
    "migrationCandidates": 6,
    "promotionCandidates": 3
  }
}
```

Present the full report:

````
## 📊 Telemetry Report — [Date]

### System Health Dashboard

| Metric | Score | Trend |
|--------|-------|-------|
| **Fabric Adoption** | [M]/[N] components ([%]) | [↑/↓/→ vs last report] |
| **Pattern Adherence** | [M]/[N] pages ([%]) | [↑/↓/→] |
| **Code Health** | [%] files clean | [↑/↓/→] |
| **Custom Components** | [N] total, [M] should migrate | [↑/↓/→] |

---

### Component Usage (Top 20)

| Rank | Component | Uses | Files | Category |
|------|-----------|------|-------|----------|
| 1 | BodyText | 112 | 28 | Foundational |
| 2 | Button | 89 | 24 | Navigation |
| ... | ... | ... | ... | ... |

**Unused components worth adopting:** [list with suggestions]

---

### Pattern Adherence by Archetype

| Archetype | Pages | Consistent | Gaps |
|-----------|-------|------------|------|
| Dashboard | [N] | [M] | [gaps] |
| List | [N] | [M] | [gaps] |
| Detail | [N] | [M] | [gaps] |
| Settings | [N] | [M] | [gaps] |
| Wizard | [N] | [M] | [gaps] |
| Inbox | [N] | [M] | [gaps] |
| Unclassified | [N] | — | [needs archetype assignment] |

---

### Component Clusters (De Facto Patterns)

| Cluster | Components | Frequency | Documented? |
|---------|-----------|-----------|-------------|
| List View | Table + Pill + Avatar + Button | 8 pages | Yes |
| Form Section | Section + TextField + SelectField + Button | 6 pages | Yes |
| Dashboard Card | Gridlet + TileV2 + InlineMessage | 4 pages | Partial |
| Form Modal | Modal + TextField + Button + TextButton | 5 pages | No — document this |

---

### Promotion Candidates

Custom components used frequently enough to consider for Fabric:

| Component | Usage | Recommendation | Priority |
|-----------|-------|----------------|----------|
| [name] | [N] files | [action] | High/Med/Low |

---

### Migration Opportunities

Custom components that should be replaced with Fabric:

| Component | → Fabric | Files Affected | Effort |
|-----------|----------|----------------|--------|
| [name] | [Fabric component] | [N] | Low/Med/High |

---

### Recommendations

**This sprint:**
1. [highest-impact action]
2. [next action]

**Next sprint:**
1. [action]

**Backlog:**
1. [action]

---

Data saved to: `docs/telemetry-reports/telemetry-[date].json`
Compare trends: Run `/telemetry` again next sprint.
````
