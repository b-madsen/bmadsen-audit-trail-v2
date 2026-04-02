---
name: countdown
description: Pre-merge go/no-go checklist — the final gate before shipping
argument-hint: "[--fix]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Task, TodoWrite, mcp__playwright__*
---

# /countdown — Pre-Merge Checklist

The countdown is the final sequence before launch. Everything gets checked one last time. If there's a hold, you know exactly why — and with `--fix`, Claude will auto-repair what it can.

## Initial Prompt

When invoked:

**Default:**
```
⏱️ Countdown initiated — running pre-merge checklist...

I'll check compliance, structure, accessibility, and readiness. You'll get a GO or NO-GO decision.
```

**If `--fix`:**
```
⏱️ Countdown initiated with auto-fix enabled...

I'll check everything and automatically fix what I can. Anything I can't fix will be reported for manual attention.
```

---

## Workflow

### Check 1: Branch Hygiene

```bash
# Verify we're on a feature branch, not main
git branch --show-current
```

```bash
# Check for uncommitted changes
git status --porcelain
```

```bash
# Check branch is up to date with main
git fetch origin main
git rev-list --count HEAD..origin/main
```

**Pass criteria:**
- On a feature branch (not `main`)
- No uncommitted changes (or only the changes being submitted)
- Branch is not significantly behind main (warn if >10 commits behind)

**Report:**
```
✅ Branch: feature/prototype-hiring-redesign-sm
✅ Clean working directory
⚠️ Branch is 3 commits behind main — consider rebasing
```

### Check 2: File Structure Conventions

Verify the contribution follows project conventions:

```
Glob: src/pages/**/
Glob: src/components/**/
```

**Check for each new/modified directory:**

1. **Folder naming** — PascalCase (e.g., `CreateJobOpening/`, not `create-job-opening/`)
   ```
   Grep: pattern="^[a-z]" in directory names under src/pages/
   ```

2. **File naming** — Matches folder name (e.g., `CreateJobOpening.tsx` in `CreateJobOpening/`)

3. **Required files present:**
   - `[PageName].tsx` — Component file
   - `[PageName].css` — Styles file (can be empty)
   - `index.ts` — Export file

4. **Export format** — `index.ts` exports the named component:
   ```
   Read each new index.ts
   Verify: export { [PageName] } from './[PageName]';
   ```

5. **Route registration:**
   ```
   Read src/App.tsx
   Verify: lazy import exists for the new page
   Verify: Route element exists with correct path
   ```

6. **No prototype code in production paths:**
   ```
   Grep: pattern="prototype|PROTOTYPE|nebula|NEBULA" in src/pages/**/*.tsx
   ```
   Prototype code should live in `src/prototypes/`, never `src/pages/`.

**If `--fix`:**
- Create missing `index.ts` files
- Fix export format
- Add missing lazy imports and routes to App.tsx
- Move prototype files from `src/pages/` to `src/prototypes/`

**Report:**
```
✅ Folder naming: PascalCase
✅ File naming: Matches folder
✅ Required files: .tsx, .css, index.ts present
✅ Exports: Named exports correct
⚠️ Route: Missing lazy import in App.tsx [FIXED with --fix]
✅ No prototype code in production paths
```

### Check 3: Fabric Compliance

Run the full `/orbit --scan` violation checks:

```
Read CLAUDE.md
Read docs/fabric-component-reference.md
```

Execute all checks from orbit:
- **CRITICAL**: Hardcoded colors, custom buttons/inputs/modals, multiple primary buttons
- **WARNING**: Toggle in forms, excess checkboxes, missing radio defaults, hardcoded fonts, inline styles

**If `--fix`:**
- Replace hardcoded hex colors with Fabric token CSS variables where the mapping is unambiguous
- Replace `<button>` with `<Button>` from Fabric (simple cases)
- Replace `<input>` with `<TextField>` (simple cases)
- Remove inline styles that duplicate Fabric component styling
- Add missing Fabric imports

**Complex fixes that require manual attention:**
- Custom modals (architecture decisions needed)
- Multiple primary buttons (design decision needed — which one is primary?)
- Toggle vs Checkbox (context-dependent)

**Report:**
```
✅ No hardcoded colors
✅ All buttons use Fabric Button
✅ All inputs use Fabric fields
✅ No custom modals
✅ Single primary button per context
⚠️ Inline style at Settings.tsx:45 — layout flexbox (acceptable)
⚠️ Hardcoded font-size in legacy.css:12 [FIXED with --fix]
```

### Check 4: Data Integrity

Check that mock data is clean and well-structured:

```
Grep: pattern="TODO|FIXME|HACK|XXX" in src/pages/**/*.tsx, src/components/**/*.tsx
Grep: pattern="console\.(log|warn|error|debug)" in src/**/*.tsx
Grep: pattern="localhost|127\.0\.0\.1" in src/**/*.tsx (except in dev config)
```

**Check for:**
1. No TODO/FIXME comments left in shipping code
2. No console.log statements (except intentional error handling)
3. No hardcoded localhost URLs in component code
4. No hardcoded personal data (real names, emails, phone numbers in mock data)
5. Mock data uses realistic but fake data

**If `--fix`:**
- Remove console.log statements
- Flag TODOs and FIXMEs (don't auto-remove — they might be important)

**Report:**
```
✅ No console.log statements
⚠️ 2 TODO comments found — review manually:
   - Settings.tsx:67 — "TODO: Wire up API call"
   - HiringTable.tsx:23 — "TODO: Add pagination"
✅ No hardcoded URLs
✅ Mock data uses fake names
```

### Check 5: Accessibility Basics

Scan for common accessibility issues:

```
Grep: pattern="<img " in src/**/*.tsx
```
Check each `<img>` has `alt` attribute.

```
Grep: pattern="onClick=" in src/**/*.tsx
```
Check clickable non-button elements have `role` and `tabIndex` attributes.

```
Grep: pattern="aria-label|aria-describedby|aria-labelledby" in src/**/*.tsx
```
Check that interactive elements have ARIA labels.

**Check for:**
1. Images have `alt` text
2. Clickable divs/spans have `role="button"` and `tabIndex={0}` and keyboard handler
3. Form fields have labels (Fabric components handle this, check custom elements)
4. Modals have accessible titles
5. Color is not the only indicator of state (check for icon/text alternatives)

**If `--fix`:**
- Add `alt=""` to decorative images
- Add `role="button"` and `tabIndex={0}` to clickable non-button elements
- Flag missing ARIA labels for manual review

**Report:**
```
✅ All images have alt text
⚠️ Clickable div at Card.tsx:18 missing role="button" [FIXED with --fix]
✅ All Fabric form fields have labels
✅ Modal has accessible title
```

### Check 6: Microcopy & Capitalization

Scan UI text for capitalization and copy quality issues:

```
Grep: pattern="title=\"|label=\"|placeholder=\"|children=" in src/pages/**/*.tsx
```

**Check for:**
1. **Page headers** (PageHeaderV2 `title` prop) — Should be Title Case
2. **Section headers** (Section `title` prop) — Should be Title Case
3. **Tab labels** — Should be Title Case
4. **Button labels** (Button children text) — Should be Title Case
5. **Modal titles** — Should be sentence case
6. **Placeholder text** — Should be sentence case
7. **No "click here" labels** — Flag vague button text like "click here", "here", "link"
8. **Date format** — Display dates should use "Jan 15, 2025" format, not "1/15/25" or "January 15"

**If `--fix`:**
- Auto-capitalize page titles, section titles, tab labels, and button labels to Title Case
- Flag modal titles and placeholders that appear to be Title Case (should be sentence case)
- Flag "click here" labels for manual replacement

**Report:**
```
✅ Page headers: Title Case
✅ Section headers: Title Case
⚠️ Button label "click here" at HiringTable.tsx:45 — use specific action label
✅ No date formatting issues
```

### Check 7: Build Verification

```bash
# Verify the project builds without errors
npm run build 2>&1
```

**Pass criteria:**
- Build completes with exit code 0
- No TypeScript errors
- No critical warnings

**If build fails:**
- Report the error with file and line number
- If `--fix`, attempt common fixes:
  - Missing imports
  - Type mismatches (add type assertions where safe)
  - Unused variable warnings (remove unused imports)

**Report:**
```
✅ Build successful — no errors
⚠️ 2 TypeScript warnings (non-blocking):
   - Unused import 'useEffect' in Home.tsx [FIXED with --fix]
   - Type assertion needed at DataTable.tsx:34
```

### Check 8: PrototypeIndex Entry (if page)

If the contribution is a new page, verify it has a PrototypeIndex entry:

```
Read src/pages/PrototypeIndex/PrototypeIndex.tsx
```

Check that the new page appears in the prototypes array with:
- `id` (matches route path)
- `title` (descriptive)
- `description` (brief explanation)
- `icon` (Font Awesome icon name)
- `path` (matches Route)
- `status` (appropriate for current state)

**If `--fix`:**
- Add missing PrototypeIndex entry with reasonable defaults

**Report:**
```
✅ PrototypeIndex entry exists
✅ Status: "ready"
✅ Path matches route
```

---

## Decision: GO / NO-GO

After all checks complete, make the decision:

### GO ✅

All criteria met:
- 0 CRITICAL compliance violations
- Build passes
- File structure correct
- No prototype code in production paths

```
⏱️ ═══════════════════════════════════════
   COUNTDOWN COMPLETE — GO FOR MERGE ✅
   ═══════════════════════════════════════

   Branch: feature/prototype-hiring-redesign-sm
   Checks passed: [N]/[N]
   Warnings: [N] (non-blocking)

   All systems nominal. Ready to merge.

   **Warnings to note:**
   - [list non-blocking warnings]

   **To merge:**
   1. Push your branch: git push origin [branch]
   2. Open a PR
   3. Request review from Fabric team
```

### NO-GO ❌

One or more blockers:

```
⏱️ ═══════════════════════════════════════
   COUNTDOWN HOLD — NOT READY FOR MERGE ❌
   ═══════════════════════════════════════

   Branch: feature/prototype-hiring-redesign-sm
   Checks passed: [M]/[N]
   Blockers: [P]

   **Must fix before merge:**
   1. ❌ [blocker description + file:line]
   2. ❌ [blocker description + file:line]

   **Non-blocking warnings:**
   1. ⚠️ [warning]

   **To resolve:**
   - Fix the blockers manually, or run `/countdown --fix` to auto-fix what's possible
   - Then run `/countdown` again to verify
```

### GO WITH WARNINGS ⚠️

No blockers, but notable warnings:

```
⏱️ ═══════════════════════════════════════
   COUNTDOWN COMPLETE — GO WITH CAUTION ⚠️
   ═══════════════════════════════════════

   Branch: feature/prototype-hiring-redesign-sm
   Checks passed: [N]/[N]
   Warnings: [N]

   No blockers, but review these warnings with your reviewer:
   1. ⚠️ [warning with context]
   2. ⚠️ [warning with context]

   **To merge:**
   1. Push your branch
   2. Note warnings in PR description
   3. Request review
```

---

## Full Checklist Summary

| # | Check | Category | Blocking? |
|---|-------|----------|-----------|
| 1 | Feature branch (not main) | Branch | Yes |
| 2 | Clean working directory | Branch | No (warn) |
| 3 | Not behind main | Branch | No (warn) |
| 4 | PascalCase folders | Structure | No (warn) |
| 5 | Files match folder name | Structure | No (warn) |
| 6 | Required files present | Structure | Yes |
| 7 | Exports correct | Structure | Yes |
| 8 | Route registered | Structure | Yes |
| 9 | No prototype in production | Structure | Yes |
| 10 | No hardcoded colors | Compliance | Yes |
| 11 | Fabric buttons used | Compliance | Yes |
| 12 | Fabric inputs used | Compliance | Yes |
| 13 | Fabric modals used | Compliance | Yes |
| 14 | Single primary button | Compliance | Yes |
| 15 | Modal button alignment correct | Compliance | No (warn) |
| 16 | Filled tabs not inside Section | Compliance | No (warn) |
| 17 | Max 1 InPageMessage per page | Compliance | No (warn) |
| 18 | Spacing uses 4px grid | Compliance | No (warn) |
| 19 | Single Section fills height | Compliance | No (warn) |
| 20 | No TODO/FIXME | Data | No (warn) |
| 21 | No console.log | Data | No (warn) |
| 22 | No hardcoded URLs | Data | No (warn) |
| 23 | Images have alt text | A11y | No (warn) |
| 24 | Clickable elements accessible | A11y | No (warn) |
| 25 | Title Case on page/section/tab/button labels | Microcopy | No (warn) |
| 26 | Sentence case on modal titles/placeholders | Microcopy | No (warn) |
| 27 | No "click here" button labels | Microcopy | No (warn) |
| 28 | Build passes | Build | Yes |
| 29 | No TypeScript errors | Build | Yes |
| 30 | PrototypeIndex entry | Index | No (warn) |
