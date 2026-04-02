# Ad Astra — Mission Control Skill Architecture
## Autonomous Design System for BambooHR Fabric

---

## The Metaphor

**Ad Astra** ("to the stars") is the program. The design system is the spacecraft — it's what carries every team safely to their destination. **Mission Control** is Design Ops — the team that doesn't fly every mission but makes sure every mission succeeds.

Each skill is a mission operation. The naming tells designers what phase of work they're in and what the system is doing for them.

---

## Skill Map

### Phase 1: Current Skills (Renamed)

These replace `/forge` and `/temper` with zero functional changes — same workflows, new names.

| Old Name | New Name | Command | Role |
|----------|----------|---------|------|
| `/forge` | **Launch** | `/launch [Figma URL]` | Build pages from Figma using Fabric components |
| `/forge --prototype` | **Launch (Nebula)** | `/launch --nebula` | Build with raw React for early exploration |
| `/temper` | **Orbit** | `/orbit [URL]` | Full QA: visual screenshots + Figma comparison + Fabric compliance |
| `/temper --compliance-only` | **Orbit (Scan)** | `/orbit --scan` | Code-only compliance audit, no browser needed |

**Why these names:**
- **Launch** — You're taking a design from static (Figma) to live (code). It's a launch.
- **Nebula** — A nebula is unformed matter that hasn't coalesced yet. Perfect for prototypes that aren't production-ready.
- **Orbit** — After launch, you orbit to observe, verify, and confirm everything is nominal before proceeding. QA is exactly that loop.
- **Scan** — A quick sensor sweep without the full orbital pass. Lightweight compliance check.

---

### Phase 2: Contribution & Governance Skills (New)

These are the skills that make the design system autonomous — they handle the pipeline from creation to integration without bottlenecking through your team of four.

#### `/beacon` — Submit to the System

**Purpose:** A designer has built something (component, pattern, page) and wants to contribute it back to the design system. Beacon packages it for review.

**What it does:**
1. Runs `/orbit --scan` automatically (compliance gate)
2. Generates documentation from the component code (props, usage examples, variants)
3. Creates a contribution manifest:
   - Component name and category
   - Fabric components used
   - Custom elements flagged (if any)
   - Screenshots of light/dark mode
   - Suggested Storybook classification
4. Opens a PR with the contribution manifest attached
5. Tags the appropriate reviewer based on component category

**Command:**
```
/beacon                          # Package current work for system contribution
/beacon --pattern                # Contributing a new experience pattern (not a component)
/beacon --update [component]     # Proposing an update to an existing Fabric component
```

**Why this name:** A beacon broadcasts a signal — "here's something worth noticing." It's how a crew communicates a discovery back to mission control.

---

#### `/survey` — System-Wide Compliance Scan

**Purpose:** Design Ops runs this to audit the entire repo (or a subset) for Fabric compliance drift. Instead of checking one page at a time, survey scans everything.

**What it does:**
1. Scans all files in `src/pages/` and `src/components/`
2. Runs every `/orbit --scan` check across all files in parallel
3. Generates a compliance report:
   - Overall score (% of files passing)
   - Critical violations ranked by frequency
   - Files with the most violations
   - Trend comparison (if previous survey results exist)
   - Recommendations prioritized by impact
4. Outputs report as markdown + optional dashboard data

**Command:**
```
/survey                          # Full repo scan
/survey --team [team-name]       # Scan only files owned by a specific team
/survey --since [date/commit]    # Only scan files changed since a date or commit
/survey --diff                   # Compare against last survey results
```

**Why this name:** A survey maps the terrain. Mission control surveys the landscape before making decisions about where to direct resources.

---

#### `/dock` — Merge Prototype to Production

**Purpose:** A prototype built with `/launch --nebula` is ready to become real. Dock converts it from raw React to Fabric components and prepares it for the production system.

**What it does:**
1. Reads the prototype source files
2. Identifies every custom element that has a Fabric equivalent
3. Generates a migration plan (what changes, what stays)
4. Asks for confirmation on ambiguous mappings
5. Rewrites the components using Fabric, preserving layout and behavior
6. Runs `/orbit --scan` on the result
7. Moves files from `src/prototypes/` to `src/pages/`
8. Updates routing and PrototypeIndex

**Command:**
```
/dock [prototype-path]           # Convert a specific prototype to Fabric
/dock --plan-only                # Show migration plan without executing
```

**Why this name:** Docking is when a spacecraft connects to the station. The prototype has been free-floating — now it locks into the system.

---

#### `/relay` — Generate Handoff Documentation

**Purpose:** Creates handoff artifacts for communicating design decisions, component usage, and implementation details between teams. Useful when one team's work needs to be understood by another.

**What it does:**
1. Analyzes the specified page or component
2. Generates a handoff document containing:
   - Component inventory (every Fabric component used and how)
   - Layout decisions and pattern choices with rationale
   - Interactive behavior map (what happens on click, hover, submit)
   - Accessibility notes
   - Mock data structure (for backend teams)
   - Screenshots with annotated regions
3. Outputs as markdown or can be formatted for Confluence/Notion

**Command:**
```
/relay [page-path]               # Generate handoff for a specific page
/relay --for-eng                 # Engineering-focused handoff (data structures, API shape, state)
/relay --for-design              # Design-focused handoff (patterns, rationale, alternatives considered)
```

**Why this name:** A relay passes a signal from one point to another without losing fidelity. That's exactly what a handoff should do.

---

### Phase 3: Intelligence & Guidance Skills (Future)

These skills make the system proactively smart — not just enforcing rules but actively guiding designers toward better decisions.

#### `/compass` — Pattern Recommendation Engine

**Purpose:** A designer describes what they need ("I'm building a settings page for notification preferences") and compass recommends the right experience architecture pattern, existing prototype references, and Fabric components.

**What it does:**
1. Takes a natural language description of the page or feature
2. Matches against the Experience Architecture patterns in CLAUDE.md
3. Identifies the closest existing prototype(s) in `src/pages/`
4. Recommends:
   - Page archetype (Dashboard, List, Detail, Settings, Wizard, Inbox)
   - Navigation pattern
   - Layout structure with specific Fabric components
   - Relevant prototype to reference or fork
5. Optionally scaffolds the page structure (empty shell with correct layout)

**Command:**
```
/compass "notification settings page with email and SMS preferences"
/compass --scaffold              # Also generate the starter files
```

**Why this name:** A compass doesn't do the walking — it tells you which direction to go. It's guidance, not execution.

---

#### `/telemetry` — System Adoption Analytics

**Purpose:** Design Ops needs to know how the system is being used. Telemetry analyzes the codebase to report on component adoption, pattern consistency, and system health.

**What it does:**
1. Scans all source files
2. Reports:
   - Component usage frequency (which Fabric components are used most/least)
   - Custom component inventory (what exists outside Fabric)
   - Pattern adherence (which page archetypes are being followed)
   - Adoption by team (if file ownership metadata exists)
   - Candidates for promotion (custom components used 3+ times → potential Fabric additions)
   - Deprecated pattern usage
3. Outputs as markdown report with charts/tables

**Command:**
```
/telemetry                       # Full system health report
/telemetry --components          # Component usage only
/telemetry --patterns            # Pattern adherence only
/telemetry --candidates          # Show custom components that should become Fabric components
```

**Why this name:** Telemetry is the data stream from spacecraft to mission control. It's how you know the health of the system without inspecting every module by hand.

---

#### `/countdown` — Pre-Merge Checklist

**Purpose:** The final gate before a PR merges. Countdown runs every check in sequence and produces a go/no-go decision.

**What it does:**
1. Runs `/orbit --scan` (compliance)
2. Checks file structure conventions (naming, exports, routing)
3. Verifies no prototype code in production paths
4. Checks for hardcoded data that should use mock data files
5. Validates accessibility basics (alt text, aria labels, keyboard nav)
6. Generates a go/no-go summary with specific blockers if any

**Command:**
```
/countdown                       # Full pre-merge check on current branch
/countdown --fix                 # Auto-fix what can be fixed, report the rest
```

**Why this name:** The countdown is the final sequence before launch. Everything gets checked one last time. If there's a hold, you know exactly why.

---

#### `/basecamp` — Designer Onboarding

**Purpose:** New designers joining the environment get a guided setup and orientation, replacing the need to read through documentation manually.

**What it does:**
1. Verifies environment setup (Node.js, dependencies, dev server)
2. Walks through the project structure interactively
3. Shows the available prototypes and skills
4. Creates a starter branch for the designer
5. Scaffolds their first page with the correct file structure
6. Runs a mini tour: "Here's how to build, here's how to test, here's how to submit"

**Command:**
```
/basecamp                        # Full onboarding walkthrough
/basecamp --verify               # Just check environment setup
```

**Why this name:** Basecamp is where you prepare before the climb. It's not the destination — it's where you get equipped.

---

## Complete Skill Registry

| Phase | Skill | Command | Purpose | Audience |
|-------|-------|---------|---------|----------|
| 1 | **Launch** | `/launch` | Build from Figma → Fabric | Designers |
| 1 | **Launch (Nebula)** | `/launch --nebula` | Build from Figma → raw React | Designers |
| 1 | **Orbit** | `/orbit` | Full visual QA + compliance | Designers |
| 1 | **Orbit (Scan)** | `/orbit --scan` | Code-only compliance check | Designers |
| 2 | **Beacon** | `/beacon` | Submit component/pattern to system | Designers |
| 2 | **Survey** | `/survey` | Repo-wide compliance audit | Design Ops |
| 2 | **Dock** | `/dock` | Convert prototype → production | Designers |
| 2 | **Relay** | `/relay` | Generate handoff documentation | Cross-team |
| 3 | **Compass** | `/compass` | Pattern recommendation | Designers |
| 3 | **Telemetry** | `/telemetry` | Adoption analytics & system health | Design Ops |
| 3 | **Countdown** | `/countdown` | Pre-merge checklist (go/no-go) | Designers + CI |
| 3 | **Basecamp** | `/basecamp` | New designer onboarding | New team members |

---

## Autonomous Workflow

Here's how the full system works end-to-end when all phases are operational:

```
New Designer Joins
        │
        ▼
   /basecamp          ← Environment setup + orientation
        │
        ▼
   /compass           ← "What am I building? What pattern should I use?"
        │
        ▼
   /launch            ← Build from Figma using Fabric
   /launch --nebula   ← Or explore freely first
        │
        ▼
   /orbit             ← QA against Figma + compliance check
        │
        ├─ Issues? → Fix → /orbit again
        │
        ▼
   /dock              ← (If nebula) Convert prototype to production
        │
        ▼
   /beacon            ← Submit to the system for review
        │
        ▼
   /countdown         ← Pre-merge go/no-go
        │
        ▼
   PR Merged ✓
        │
        ▼
   /telemetry         ← Design Ops monitors system health
   /survey            ← Design Ops audits drift over time
   /relay             ← Cross-team handoffs as needed
```

---

## CLAUDE.md Integration

The updated CLAUDE.md should reference the new skill names. The Skills section becomes:

```markdown
## Skills

| Skill | Command | What It Does |
|-------|---------|--------------|
| **Launch** | `/launch [Figma URL]` | Build production-ready pages from Figma using Fabric |
| | `/launch --nebula` | Build with raw React/CSS for early exploration |
| **Orbit** | `/orbit [URL]` | Full QA: visual + Figma comparison + Fabric compliance |
| | `/orbit --scan` | Code-only Fabric compliance audit |
| **Beacon** | `/beacon` | Submit component/pattern to the design system |
| **Survey** | `/survey` | Repo-wide compliance audit |
| **Dock** | `/dock [path]` | Convert prototype to production Fabric code |
| **Relay** | `/relay [path]` | Generate handoff documentation |
| **Compass** | `/compass "description"` | Get pattern recommendations for what you're building |
| **Countdown** | `/countdown` | Pre-merge go/no-go checklist |
| **Basecamp** | `/basecamp` | New designer environment setup + onboarding |
| **Telemetry** | `/telemetry` | System adoption analytics and health report |
```

### Workflow
```
/basecamp → /compass → /launch → /orbit → /dock → /beacon → /countdown → Ship
```

---

## Naming Principles

If you need to add new skills in the future, follow these patterns:

| Category | Naming Pattern | Examples |
|----------|---------------|----------|
| **Build** | Action verbs associated with spaceflight | Launch, Ignite, Thrust |
| **Validate** | Observation/measurement terms | Orbit, Scan, Signal, Probe |
| **Submit/Integrate** | Connection/communication terms | Beacon, Dock, Relay, Uplink |
| **Analyze** | Data/monitoring terms | Telemetry, Survey, Radar, Spectrum |
| **Guide** | Navigation terms | Compass, Chart, Waypoint, Heading |
| **Prepare** | Base/staging terms | Basecamp, Countdown, Staging, Preflight |

**Rules:**
1. One word. No compound names.
2. The name should tell you what phase of work you're in without reading the docs.
3. Avoid names that overlap with existing CLI tools or git commands.
4. The metaphor should feel natural to someone who's never heard of Ad Astra — space terminology is universally understood.

---

*Ad Astra — To the Stars*
*Mission Control — Design Operations, BambooHR*
