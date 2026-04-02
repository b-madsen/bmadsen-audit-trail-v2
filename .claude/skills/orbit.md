---
name: orbit
description: Test implementation quality against Figma designs and Fabric compliance
argument-hint: "[url] [--figma <urls>] [--scan]"
allowed-tools: mcp__playwright__*, mcp__figma-desktop__*, Read, Write, Edit, Bash, Grep, Glob
---

# /orbit — QA & Fabric Compliance Audit

Orbit your build to verify it's nominal. Three layers of verification:

1. **Visual QA** — Screenshots in light/dark mode compared against Figma
2. **Fabric Compliance** — Code audit against Fabric design system rules
3. **DOM Inspection** — Accessibility tree and structure check

## Initial Prompt

When invoked, **check the conversation context first:**

1. **Look for dev server URL** — Check recent messages for localhost URLs (e.g., "running at http://localhost:5173")
2. **Look for Figma URLs** — If `/launch` was just run, extract the Figma URLs from that conversation
3. **Look for current page** — If Playwright browser is already open, use current URL
4. **Check for `--scan` flag** — If present, skip visual QA and only run Fabric compliance audit on source files

**If `--scan`:**

```
📡 Running Fabric compliance scan on source files...

I'll audit your components for design system violations without needing a running dev server.
```

Then skip to **Step 5: Fabric Compliance Audit**.

**If URL and/or Figma URLs found in context:**

```
🛰️ Entering orbit around your build...

Found in context:
- Browser URL: http://localhost:5173/hiring
- Figma references: [list URLs found]

Running full QA: visual inspection, Figma comparison, and Fabric compliance...
```

**If URL NOT found in context:**

```
🛰️ Ready to orbit your build for QA and compliance.

**What I need:**
1. URL to test (e.g., http://localhost:5173/hiring)
2. (Optional) Figma URLs for comparison

Or run with --scan to audit source files without a dev server.
```

**STOP and wait for user to provide URL(s).**

---

## Workflow

### Step 1: Parse Input

Extract:
- **Browser URL** — The page to test
- **Figma URLs** (optional) — Design mockups for comparison
- **Source directory** — Detect from project root (look for `/src/components`, `/src/pages`)

If Figma URLs provided, extract node IDs:
- URL format: `https://www.figma.com/design/...?node-id=656-22960`
- Extract `656-22960` → convert to `656:22960` (replace dash with colon)

### Step 2: Navigate and Capture Light Mode

```
mcp__playwright__browser_navigate(url=browserUrl)
```

Wait for page load, then:

```
mcp__playwright__browser_take_screenshot(
  fullPage=true,
  filename="light-mode.png"
)

mcp__playwright__browser_snapshot(
  filename="dom-structure.md"
)
```

### Step 3: Toggle Dark Mode and Capture

Look for dark mode toggle in the page. Common patterns:
- Button with "dark mode" text
- Sun/moon icon button
- Theme switcher
- Fabric theme provider toggle

```
mcp__playwright__browser_click(element="dark mode button", ref=...)

mcp__playwright__browser_take_screenshot(
  fullPage=true,
  filename="dark-mode.png"
)
```

If no dark mode toggle is found, note it in the report and continue.

### Step 4: Fetch Figma References (if provided)

For each Figma node ID:

```
mcp__figma-desktop__get_screenshot(
  nodeId="656:22960",
  clientLanguages="typescript",
  clientFrameworks="react"
)
```

Save as `figma-{component-name}.png`

### Step 5: Fabric Compliance Audit

**This is the core of orbit.**

Read the Fabric rules first:
```
Read CLAUDE.md
Read docs/fabric-component-reference.md
```

Then scan the source files for violations:

#### 5a. Find all component/page files

```
Glob: src/components/**/*.tsx
Glob: src/pages/**/*.tsx
```

Read each file and check for violations.

#### 5b. Violation Checks

**CRITICAL violations** (must fix before shipping):

1. **Hardcoded colors** — Search for hex codes (#xxx), rgb(), hsl() in component files. Fabric uses design tokens.
   ```
   Grep: pattern="#[0-9a-fA-F]{3,8}" in src/**/*.tsx, src/**/*.css, src/**/*.scss
   Grep: pattern="rgb\(|rgba\(|hsl\(" in src/**/*.tsx, src/**/*.css
   ```
   - Exception: Colors inside SVG files or third-party chart libraries are OK.

2. **Custom buttons instead of Fabric Button** — Look for `<button` tags or styled button components.
   ```
   Grep: pattern="<button" in src/components/**/*.tsx, src/pages/**/*.tsx
   ```
   - Should use `<Button>`, `<TextButton>`, `<IconButton>`, or `<Dropdown>` from Fabric.

3. **Custom inputs instead of Fabric fields** — Look for raw `<input`, `<select`, `<textarea` tags.
   ```
   Grep: pattern="<input|<select|<textarea" in src/components/**/*.tsx, src/pages/**/*.tsx
   ```
   - Should use `<TextField>`, `<SelectField>`, `<CurrencyField>`, `<DateField>`, etc.

4. **Custom modals** — Look for custom dialog/modal implementations.
   ```
   Grep: pattern="role=\"dialog\"|class.*modal|Modal(?!.*from.*fabric)" in src/**/*.tsx
   ```
   - Should use Fabric `<Modal>` or `<Sheet>`.

5. **Multiple primary buttons** — Check each page/section for more than one `type="primary"` button.
   ```
   Grep: pattern="type=\"primary\"|type='primary'" in each page file
   ```
   - Fabric rule: one primary button per context.

**WARNING violations** (should fix, not blocking):

6. **Toggle in a form with Save button** — `RoundedToggle` should auto-save, never appear alongside a form submit.

7. **More than 8 checkboxes** — If a CheckboxGroup renders 8+ options, should use SelectField or AutocompleteMultiple.

8. **Radio without default selection** — RadioGroup should always have a pre-selected value.

9. **Hardcoded font sizes/families** — Should use `<BodyText>` or `<Headline>` components, not raw styled text.
   ```
   Grep: pattern="font-size:|font-family:" in src/**/*.css, src/**/*.scss, src/**/*.tsx
   ```

10. **Custom containers instead of Section** — Content areas using raw `div` with custom border/shadow/radius instead of `<Section>` or `<StyledBox>`.
    ```
    Grep: pattern="border-radius:|box-shadow:" in src/**/*.css, src/**/*.scss
    ```

11. **Inline styles** — Check for `style={{` patterns.
    ```
    Grep: pattern="style=\{\{" in src/**/*.tsx
    ```
    - Exception: Layout styles (display, flexDirection, gap) are acceptable.

12. **Missing component imports from Fabric** — Check that UI components are imported from Fabric package, not recreated locally.

13. **Modal button alignment** — Small/medium modals: buttons must be right-aligned with primary rightmost. Full-screen modals: buttons left-aligned with primary leftmost. Cancel actions should use TextButton, not standard Button.

14. **Filled tabs inside Section** — Filled tabs should open to the PageCapsule, not be nested inside a Section. Use Lined tabs within Sections.

15. **Multiple In-page Messages** — Only one InPageMessage should appear on a page at a time. Multiple instances should be replaced with InlineMessages.

16. **Non-4px spacing values** — Custom CSS spacing values should be multiples of 4px (Fabric's atomic grid). Flag values like 5px, 7px, 13px, 25px, etc.
    ```
    Grep: pattern="(margin|padding|gap):\s*\d+" in src/**/*.css
    ```
    Check that values are divisible by 4. Exception: 1px borders.

17. **Single Section not filling height** — When a page has only one Section, it should fill the PageCapsule height (use `min-height: 100%` or flex-grow).

**COPY violations** (should fix for production):

18. **Capitalization errors** — Check that page headers, section titles, tab labels, and button labels use Title Case. Check that modal titles, placeholder text, and messages use sentence case.
    - Scan string props on PageHeaderV2 `title`, Section `title`, Tabs `labels`, Button children
    - Flag obviously wrong casing (e.g., all lowercase page title, ALL CAPS button label)

19. **"Click here" button labels** — Flag any button with label "click here", "here", or similarly vague text. Button labels should be specific actions.

**INFO items** (nice to know):

13. **Nebula code detected** — If `/launch --nebula` was used, flag all custom components that have Fabric equivalents.

14. **Fabric component usage summary** — List all Fabric components used and their frequency.

#### 5c. DOM-Level Checks (if browser available)

Use Playwright to inspect the live page:

```
mcp__playwright__browser_evaluate(
  function="() => {
    const buttons = document.querySelectorAll('button');
    const primaryButtons = [...buttons].filter(b =>
      b.classList.contains('primary') || b.getAttribute('data-type') === 'primary'
    );
    return {
      totalButtons: buttons.length,
      primaryButtons: primaryButtons.length,
      rawInputs: document.querySelectorAll('input:not([data-fabric])').length,
      rawSelects: document.querySelectorAll('select:not([data-fabric])').length,
      hardcodedColors: [...document.querySelectorAll('[style]')].filter(el =>
        /(?:^|;)\s*(?:color|background|border).*#[0-9a-f]/i.test(el.getAttribute('style'))
      ).length
    };
  }"
)
```

### Step 6: Optional CSS Value Extraction

If user wants detailed measurements, or if the visual comparison reveals discrepancies:

```
mcp__playwright__browser_evaluate(
  element="search input",
  ref="...",
  function="(el) => ({
    height: getComputedStyle(el).height,
    fontSize: getComputedStyle(el).fontSize,
    padding: getComputedStyle(el).padding,
    backgroundColor: getComputedStyle(el).backgroundColor,
    borderRadius: getComputedStyle(el).borderRadius,
    fontFamily: getComputedStyle(el).fontFamily
  })"
)
```

Report actual vs expected values (from Fabric token definitions).

### Step 7: Generate Report

Present the full report:

````
## 🛰️ Orbit Report

### Visual QA

#### Light Mode
![Light Mode Screenshot](light-mode.png)

#### Dark Mode
![Dark Mode Screenshot](dark-mode.png)

#### Figma Reference
![Figma Design](figma-reference.png)

---

### Visual Inspection Checklist

**Layout & Structure:**
- [ ] Components in correct positions
- [ ] Proper spacing and alignment
- [ ] All expected sections visible
- [ ] Responsive breakpoints working

**Dark Mode:**
- [ ] No white boxes on dark backgrounds
- [ ] Text remains readable (sufficient contrast)
- [ ] Borders/dividers visible but not harsh
- [ ] Images/icons adapt appropriately

**Component Presence:**
- [ ] All elements from Figma are rendered
- [ ] No missing buttons, inputs, or sections
- [ ] Icons display correctly

---

### Fabric Compliance Report

**Score: [X]/[Total] checks passed**

#### CRITICAL (must fix)
| # | Rule | Status | Location | Details |
|---|------|--------|----------|---------|
| 1 | No hardcoded colors | PASS/FAIL | file:line | Found `#2e7918` → use `text-primary-strong` token |
| 2 | Uses Fabric Button | PASS/FAIL | file:line | Found raw `<button>` → use `<Button>` |
| 3 | Uses Fabric inputs | PASS/FAIL | file:line | Found raw `<input>` → use `<TextField>` |
| 4 | Uses Fabric Modal | PASS/FAIL | file:line | Found custom dialog → use `<Modal>` |
| 5 | Single primary button | PASS/FAIL | file:line | Found 3 primary buttons in same view |

#### WARNING (should fix)
| # | Rule | Status | Location | Details |
|---|------|--------|----------|---------|
| 6 | Toggle not in Save form | PASS/FAIL/N/A | file:line | |
| 7 | Max 8 checkboxes | PASS/FAIL/N/A | file:line | |
| 8 | Radio has default | PASS/FAIL/N/A | file:line | |
| 9 | No hardcoded fonts | PASS/FAIL | file:line | |
| 10 | Uses Section/StyledBox | PASS/FAIL | file:line | |
| 11 | No inline styles | PASS/FAIL | file:line | |
| 12 | Imports from Fabric | PASS/FAIL | file:line | |
| 13 | Modal button alignment | PASS/FAIL/N/A | file:line | |
| 14 | Filled tabs not in Section | PASS/FAIL/N/A | file:line | |
| 15 | Max 1 InPageMessage | PASS/FAIL/N/A | file:line | |
| 16 | Spacing uses 4px grid | PASS/FAIL | file:line | |
| 17 | Single Section fills height | PASS/FAIL/N/A | file:line | |

#### COPY (should fix for production)
| # | Rule | Status | Location | Details |
|---|------|--------|----------|---------|
| 18 | Capitalization correct | PASS/FAIL | file:line | e.g. page title should be Title Case |
| 19 | No "click here" labels | PASS/FAIL | file:line | |

#### INFO
| Item | Details |
|------|---------|
| Fabric components used | Button (5), TextField (3), Section (2), Pill (4), Table (1) |
| Custom components | PerformanceChart (no Fabric equivalent) |
| Nebula code detected | None / Yes (list files) |

---

### DOM Structure

Quick hierarchy from accessibility snapshot:
[Summarize key structure]

---

### Recommended Fixes

**Priority 1 (Critical):**
1. `src/components/Header/Header.tsx:24` — Replace `<button className="save-btn">` with `<Button type="primary" size="medium">`
2. `src/components/SearchBar/SearchBar.tsx:12` — Replace `<input type="text">` with `<TextField label="Search" />`

**Priority 2 (Warning):**
1. `src/components/Settings/Settings.tsx:45` — RoundedToggle is inside a form with a Save button. Use Checkbox instead.

---

### Next Steps

After fixing issues:
→ `/orbit` to re-test
→ `/orbit --scan` to re-audit code without browser
→ `/countdown` to run full pre-merge checklist when ready
````

---

## Quick Reference: Fabric Rules Checked

| Rule | Source | Severity |
|------|--------|----------|
| Use design tokens, not hardcoded colors | CLAUDE.md Rule 3 | CRITICAL |
| Use Fabric Button/TextButton/IconButton | CLAUDE.md Rule 1 | CRITICAL |
| Use Fabric form components | CLAUDE.md Rule 1 | CRITICAL |
| Use Fabric Modal/Sheet | CLAUDE.md Rule 1 | CRITICAL |
| One primary button per context | CLAUDE.md Rule 4 | CRITICAL |
| Toggle auto-saves (no Save button) | CLAUDE.md Rule 5 | WARNING |
| Max 8 checkboxes | CLAUDE.md Rule 9 | WARNING |
| Radio needs default selection | CLAUDE.md Rule 10 | WARNING |
| Use BodyText/Headline for typography | Reference doc | WARNING |
| Use Section/StyledBox for containers | CLAUDE.md Rule 8 | WARNING |
| Avoid inline styles | Best practice | WARNING |
| Import from Fabric package | CLAUDE.md Rule 1 | WARNING |
| Modal button alignment (right for sm/md, left for full) | Component Usage | WARNING |
| Filled tabs at PageCapsule level, not in Section | Component Usage | WARNING |
| Max 1 InPageMessage per page | Component Usage | WARNING |
| Spacing uses 4px atomic grid | Component Usage | WARNING |
| Single Section fills PageCapsule height | Component Usage | WARNING |
| Title/sentence case per element type | Microcopy Rules | COPY |
| No vague button labels ("click here") | Microcopy Rules | COPY |
