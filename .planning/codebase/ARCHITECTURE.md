# Architecture

**Analysis Date:** 2026-03-26

## Pattern Overview

**Overall:** Multi-layer React + TypeScript application with state-driven content rendering.

**Key Characteristics:**
- Build-time file loading: `import.meta.glob` loads workspace markdown/HTML at build time, avoiding runtime file system access
- Router-based navigation: React Router manages 4 main page routes with deep phase linking
- Type-first design: Comprehensive TypeScript types define all data structures (`BrandState`, `PhaseConfig`, `PhaseContent`)
- Separation of concerns: UI components decouple from workspace file loading logic
- State-as-filesystem: `workspace/STATE.md` is the single source of truth, parsed at build time into `BrandState` object
- Content-as-markdown: Discovery outputs, agent research, and final deliverables all stored as markdown/HTML in workspace; UI renders via `react-markdown`

## Layers

**Presentation (React Components):**
- Purpose: Render UI for brand development phases, output viewing, overview dashboard
- Location: `src/components/`
- Contains: Page components (`PhasePage`, `OverviewPage`, `OutputPage`), card components, UI primitives
- Depends on: Type definitions, utility functions, content loaders
- Used by: React Router renderer

**Routing:**
- Purpose: Map URL paths to page components
- Location: `src/lib/router.tsx`
- Contains: Route definitions for `/`, `/phase/:phase`, `/output`, `/output/view/*`
- Depends on: Page components
- Used by: `main.tsx` entry point

**State & Content Loading (Build-time):**
- Purpose: Load and parse workspace files at build time; make data available to components
- Location: `src/lib/state-loader.ts`, `src/lib/content-loader.ts`
- Contains: Functions that parse `STATE.md`, load research/drafts/output files via `import.meta.glob`
- Depends on: Type definitions, regex parsing
- Used by: Components via direct function calls (e.g., `loadState()`, `loadResearchFiles()`)

**Content Parsing:**
- Purpose: Extract specific sections from markdown files and map them to phases
- Location: `src/lib/content-parser.ts`
- Contains: Phase-to-file mapping, section extraction logic
- Depends on: Content loader, state
- Used by: `PhasePage`, `OutputPage` to retrieve phase-specific markdown

**Type Definitions:**
- Purpose: Define all data structures: state shape, phase config, content structures
- Location: `src/types/brand.ts`
- Contains: `BrandState`, `PhaseConfig`, `PhaseContent` union types, `ClientProfile`, `AssetPackId`, etc.
- Depends on: Nothing
- Used by: All other layers

**Phase Configuration:**
- Purpose: Define metadata for all 8 phases and asset packs
- Location: `src/lib/phase-utils.ts`
- Contains: `phases` array (with name, description, purpose, discovery keys), `ASSET_PACKS` array, lookup functions
- Depends on: Type definitions
- Used by: Sidebar, phase page rendering, asset pack recommendations

**Utilities:**
- Purpose: Helper functions for CSS class merging, DOM operations
- Location: `src/lib/utils.ts`
- Contains: `cn()` function (via `clsx` + `tailwind-merge`)
- Depends on: External libraries
- Used by: Components

## Data Flow

**Initialization:**

1. User navigates to app
2. `main.tsx` mounts React app with `RouterProvider`
3. Router renders `AppLayout` (wrapper) + matched page component
4. `AppLayout` calls `loadState()` to get current brand state

**Phase Display Flow:**

1. User navigates to `/phase/:phase`
2. `PhasePage` extracts `phaseNumber` from URL params
3. Calls `getPhase(phaseNumber)` to get phase metadata (`PhaseConfig`)
4. Calls `getPhaseContent(phaseNumber)` which:
   - Checks `PHASE_CONTENT_MAP` for file locations
   - Attempts to load assembled output (e.g., brand-foundation.md section)
   - Falls back to phase discovery notes if assembled output missing
   - Loads agent research/draft output if available
5. Renders phase header, discovery checklist, primary content, agent output (collapsible), decisions
6. If phase pending, renders `EmptyState` with command to run (e.g., `/brand-compass:phase-1-origin`)

**Output Viewing Flow:**

1. User navigates to `/output`
2. `OutputPage` calls `loadOutputFiles()` to get all assembled files
3. Lists available markdown and HTML files
4. User clicks file → navigates to `/output/view/:filename`
5. `OutputViewer` calls `getFile(path)` to retrieve specific file
6. If HTML, renders as `<iframe>` or raw HTML
7. If markdown, renders via `react-markdown`

**State Management:**

- State is immutable (parsed once at build time)
- No runtime mutations — state updates require rebuilding
- `STATE.md` is the source; components read from it via `loadState()`
- Phase progress tracked via `phases` record: `{ [phaseNumber]: 'pending' | 'in_progress' | 'completed' }`
- Discovery outputs tracked via `discoveryOutputs` array (checkbox items in STATE.md)

## Key Abstractions

**BrandState:**
- Purpose: Represents the complete state of a brand development engagement
- Examples: `src/types/brand.ts` lines 81-92
- Pattern: Immutable data object; source of truth for all UI state
- Includes: client profile, phase statuses, checkpoints, agents, decisions, discovery outputs, session log

**PhaseConfig:**
- Purpose: Metadata for each of the 8 phases (+ phase 0)
- Examples: `src/lib/phase-utils.ts` lines 3-125
- Pattern: Configuration as data — enables phase-driven UI without hardcoding
- Includes: Phase number, name, purpose, icon, discovery keys, command to trigger phase

**PhaseContent (union type):**
- Purpose: Type-safe representation of phase-specific content
- Examples: `src/types/brand.ts` lines 215-222
- Pattern: Discriminated union by `phase` number; ensures each phase has correct data type
- Includes: `BeliefContent`, `AudienceContent`, `PositioningContent`, `ArchetypeContent`, etc.

**ContentFile:**
- Purpose: Wrapper for markdown/HTML files loaded at build time
- Examples: `src/lib/content-loader.ts` lines 32-38
- Pattern: Metadata + content; enables filtering/searching through loaded files
- Includes: path, filename, content, directory, format

**PHASE_CONTENT_MAP:**
- Purpose: Maps phase numbers to workspace file locations
- Examples: `src/lib/content-parser.ts` lines 53-91
- Pattern: Lookup table with fallback chain (assembled output → discovery notes → agent research)
- Enables: Flexible content sources without code changes

## Entry Points

**`src/main.tsx`:**
- Location: `src/main.tsx`
- Triggers: Browser loads application
- Responsibilities: Create React root, mount `RouterProvider` with router config

**`src/lib/router.tsx`:**
- Location: `src/lib/router.tsx`
- Triggers: React Router initialization
- Responsibilities: Define all routes, match URL to page components, set up nested layout

**`src/components/AppLayout.tsx`:**
- Location: `src/components/AppLayout.tsx`
- Triggers: Every page render
- Responsibilities: Render sidebar, header, footer; load state; provide breadcrumb navigation

**`src/components/OverviewPage.tsx`:**
- Location: `src/components/OverviewPage.tsx`
- Triggers: User navigates to `/`
- Responsibilities: Display dashboard with phase progress, checkpoints, session log, key decisions

**`src/components/PhasePage.tsx`:**
- Location: `src/components/PhasePage.tsx`
- Triggers: User navigates to `/phase/:phase`
- Responsibilities: Render phase content, discovery checklist, agent output, next phase button

**`src/components/OutputPage.tsx`:**
- Location: `src/components/OutputPage.tsx`
- Triggers: User navigates to `/output`
- Responsibilities: List all brand kit files (research, drafts, output)

**`src/components/OutputViewer.tsx`:**
- Location: `src/components/OutputViewer.tsx`
- Triggers: User navigates to `/output/view/:filename`
- Responsibilities: Render specific file (markdown or HTML)

## Error Handling

**Strategy:** Graceful degradation. Missing files don't crash; empty states guide user to next action.

**Patterns:**

- **Missing state:** If `STATE.md` missing or unparseable, `loadState()` returns `null`. Components check for null and render `EmptyState` with command to run `/brand-compass:start`
- **Missing phase content:** If no content found via content parser chain, phase renders "In Progress" card with command to continue
- **Missing output files:** If output file doesn't exist, component renders empty list with explanation
- **Type mismatches:** TypeScript compilation prevents incorrect phase content access (e.g., accessing `data.corebelief` on wrong phase type)

## Cross-Cutting Concerns

**Logging:** No dedicated logger. Console available for debugging via browser dev tools.

**Validation:** Happens during parsing:
- `parseClientProfile()` checks for template placeholders (lines starting with `[`)
- `parseCheckbox()` validates markdown checkbox syntax `[x]` or `[ ]`
- Regex patterns in `state-loader.ts` validate section extraction

**Authentication:** Not applicable — this is a local/deployed dashboard, not a multi-user system.

**Theme/Styling:**
- Tailwind CSS v4 + CSS variables for color tokens
- Two themes supported: light (default) and dark
- Toggle via `ThemeToggle` component; persisted in localStorage
- All colors defined in Tailwind config, referenced via CSS classes

**Asset Loading:**
- Workspace files loaded at build time via `import.meta.glob`
- Production build includes only files that exist at build time
- Changes to workspace files require rebuild + redeploy
- Vite `serveWorkspace` plugin serves workspace files during dev (port 3001)

---

*Architecture analysis: 2026-03-26*
