---
name: survey
description: Repo-wide Fabric compliance audit across all pages and components
argument-hint: "[--team <name>] [--since <date>] [--diff]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite
---

# /survey — System-Wide Compliance Scan

Survey maps the full terrain. While `/orbit` checks one page, `/survey` scans everything — giving Design Ops a system-level view of Fabric compliance, pattern drift, and areas that need attention.

## Initial Prompt

When invoked, **check arguments for scope:**

```
🛰️ Initiating system-wide survey...

Scanning all pages and components for Fabric compliance.
```

**If `--team [name]`:**
```
Scope: Scanning files owned by [team name] only.
```

**If `--since [date/commit]`:**
```
Scope: Scanning files changed since [date/commit].
```

**If `--diff`:**
```
Mode: Comparing against last survey results.
```

---

## Workflow

### Step 1: Determine Scan Scope

**Full scan (default):**
```
Glob: src/pages/**/*.tsx
Glob: src/pages/**/*.css
Glob: src/components/**/*.tsx
Glob: src/components/**/*.css
```

**Team-scoped (`--team`):**
- Check for ownership markers in files (comments, CODEOWNERS, or directory naming conventions)
- If no ownership metadata, ask user to specify which directories belong to the team

**Since-scoped (`--since`):**
```bash
git diff --name-only [date/commit]..HEAD -- src/pages src/components
```
Only scan files returned by git diff.

Count total files to scan. Report:
```
Found [N] files to scan across [M] pages and [P] components.
```

### Step 2: Parallel Compliance Scan

For each file, run the same violation checks as `/orbit --scan`. Use **Task agents** to parallelize across files for speed.

**Each Task agent receives:**

```
Scan this file for Fabric compliance violations.

File: [path]
Content: [file content]

Check for:
CRITICAL:
1. Hardcoded colors (#xxx, rgb(), hsl()) — exception: SVGs, chart libraries
2. Custom <button> tags instead of Fabric Button/TextButton/IconButton
3. Custom <input>/<select>/<textarea> instead of Fabric field components
4. Custom modal/dialog instead of Fabric Modal/Sheet
5. Multiple type="primary" buttons in the same file

WARNING:
6. RoundedToggle alongside Save/Submit button
7. CheckboxGroup with 8+ options
8. RadioGroup without default value
9. Hardcoded font-size or font-family in CSS
10. Custom border-radius/box-shadow instead of Section/StyledBox
11. Inline styles (style={{ }}) except layout properties
12. UI components not imported from @bamboohr/fabric

INFO:
13. Nebula/prototype code in production paths
14. Fabric component usage (list all used components)

Return structured results:
{
  file: "[path]",
  critical: [{rule, line, details}],
  warning: [{rule, line, details}],
  info: [{item, details}],
  fabricComponents: [{name, count}]
}
```

### Step 3: Aggregate Results

Combine all Task agent results into a system-level report:

#### 3a. Overall Score

```
Total files scanned: [N]
Files passing (0 critical): [M] ([%])
Files with critical violations: [P] ([%])
Files with warnings only: [Q] ([%])
```

#### 3b. Violation Frequency

Rank violations by how often they appear across the codebase:

```
| Rank | Violation | Occurrences | Files Affected |
|------|-----------|-------------|----------------|
| 1 | Hardcoded colors | 47 | 12 |
| 2 | Custom <button> | 23 | 8 |
| 3 | Inline styles | 19 | 15 |
| 4 | Hardcoded fonts | 11 | 6 |
```

#### 3c. Worst Offenders

Files with the most violations, ranked:

```
| File | Critical | Warning | Total |
|------|----------|---------|-------|
| src/pages/Legacy/Legacy.tsx | 8 | 5 | 13 |
| src/components/OldHeader/OldHeader.tsx | 6 | 3 | 9 |
```

#### 3d. Fabric Component Usage Map

Aggregate component usage across the entire codebase:

```
| Component | Total Uses | Files | Most Used In |
|-----------|-----------|-------|--------------|
| Button | 89 | 24 | Settings, Hiring, Payroll |
| Section | 67 | 18 | All pages |
| TextField | 45 | 12 | Settings, Profile, CreateJob |
| BodyText | 112 | 28 | All pages |
| Pill | 34 | 9 | Hiring, People, Inbox |
```

#### 3e. Custom Component Inventory

Components that exist outside Fabric:

```
| Custom Component | Used In | Fabric Equivalent? | Promotion Candidate? |
|-----------------|---------|-------------------|---------------------|
| PerformanceChart | Reports | No (chart library) | No |
| StatusBadge | 4 pages | Pill + Badge | Yes — used 4+ times |
| QuickAction | Home, Inbox | ActionTile | Yes — near-identical |
```

### Step 4: Trend Comparison (if `--diff`)

If previous survey results exist (stored in `docs/survey-results/`):

```bash
ls docs/survey-results/*.json
```

Load the most recent previous result and compare:

```
| Metric | Previous | Current | Change |
|--------|----------|---------|--------|
| Overall compliance | 72% | 78% | ↑ +6% |
| Critical violations | 34 | 21 | ↓ -13 |
| Warning violations | 89 | 82 | ↓ -7 |
| Files scanned | 42 | 48 | ↑ +6 |
| Fabric components used | 18 | 22 | ↑ +4 |
```

### Step 5: Generate Recommendations

Based on the data, produce prioritized action items:

**Priority 1 — Highest Impact (fix these first):**
- Actions that fix the most violations with the least effort
- Usually: one file with many violations, or one violation type appearing everywhere

**Priority 2 — System Improvements:**
- Custom components that should be promoted to Fabric
- Patterns that multiple teams implement differently (need standardization)

**Priority 3 — Maintenance:**
- Minor warnings that can be addressed in regular sprint work
- Style inconsistencies that don't affect functionality

### Step 6: Save Results

Save structured results for future `--diff` comparisons:

```bash
mkdir -p docs/survey-results
```

Write results as JSON:
```json
{
  "date": "[timestamp]",
  "scope": "full|team:[name]|since:[date]",
  "summary": {
    "totalFiles": 48,
    "passing": 37,
    "criticalViolations": 21,
    "warningViolations": 82
  },
  "violationsByRule": [...],
  "worstOffenders": [...],
  "fabricUsage": [...],
  "customComponents": [...]
}
```

### Step 7: Generate Report

````
## 🛰️ Survey Report — [Date]

### System Health

| Metric | Value |
|--------|-------|
| **Files scanned** | [N] |
| **Compliance rate** | [%] passing (0 critical violations) |
| **Critical violations** | [N] across [M] files |
| **Warning violations** | [N] across [M] files |
| **Fabric components in use** | [N] of [total available] |
| **Custom components** | [N] ([P] promotion candidates) |

[If --diff: trend comparison table]

---

### Top Violations

| Rank | Violation | Count | Files | Fix Effort |
|------|-----------|-------|-------|------------|
| 1 | [violation] | [N] | [M] | Low/Med/High |
| 2 | [violation] | [N] | [M] | Low/Med/High |

---

### Worst Offenders

| File | Critical | Warning | Recommended Action |
|------|----------|---------|-------------------|
| [path] | [N] | [M] | [action] |

---

### Fabric Component Usage

| Component | Uses | Coverage |
|-----------|------|----------|
| [component] | [N] | [bar visualization using text] |

**Unused Fabric components:** [list components available but not used anywhere]

---

### Custom Components — Promotion Candidates

| Component | Used In | Fabric Near-Match | Recommendation |
|-----------|---------|-------------------|----------------|
| [name] | [N] files | [component] | Promote / Migrate / Keep custom |

---

### Recommendations

**Priority 1 — Do this sprint:**
1. [specific action with file paths]

**Priority 2 — Plan for next sprint:**
1. [specific action]

**Priority 3 — Backlog:**
1. [specific action]

---

### Survey Data

Results saved to: `docs/survey-results/survey-[date].json`
Compare with previous: `/survey --diff`
Narrow scope: `/survey --team [name]` or `/survey --since [date]`
````
