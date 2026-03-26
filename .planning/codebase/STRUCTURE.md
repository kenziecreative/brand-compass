# Codebase Structure

**Analysis Date:** 2026-03-26

## Directory Layout

```
knz-brand-compass/
├── src/                           # React application source
│   ├── main.tsx                   # Entry point: mount React app
│   ├── index.css                  # Global styles + Tailwind directives
│   ├── components/                # React components (page, card, UI)
│   │   ├── AppLayout.tsx          # Root layout: sidebar, header, footer
│   │   ├── OverviewPage.tsx       # Dashboard (/)
│   │   ├── PhasePage.tsx          # Phase display (/phase/:phase)
│   │   ├── OutputPage.tsx         # Output list (/output)
│   │   ├── OutputViewer.tsx       # File viewer (/output/view/:filename)
│   │   ├── cards/                 # Card components for each phase
│   │   │   ├── BeliefCard.tsx
│   │   │   ├── AudienceCard.tsx
│   │   │   ├── PositioningCard.tsx
│   │   │   ├── ArchetypeCard.tsx
│   │   │   ├── MessagingCard.tsx
│   │   │   ├── VoiceCard.tsx
│   │   │   ├── VisualDirectionCard.tsx
│   │   │   └── index.ts           # Card component exports
│   │   ├── ui/                    # Radix UI primitives + customizations
│   │   │   ├── badge.tsx          # Status badge component
│   │   │   ├── button.tsx         # Button with variants
│   │   │   ├── card.tsx           # Card layout primitives
│   │   │   └── collapsible.tsx    # Collapsible sections
│   │   ├── PhaseContent.tsx       # Markdown renderer for phase content
│   │   ├── PhaseSidebar.tsx       # Navigation sidebar
│   │   ├── StepIndicator.tsx      # Phase progress indicator
│   │   ├── DiscoveryChecklist.tsx # Discovery output checklist
│   │   ├── ThemeToggle.tsx        # Dark/light theme switcher
│   │   └── [other components]
│   ├── lib/                       # Business logic and utilities
│   │   ├── router.tsx             # React Router configuration
│   │   ├── state-loader.ts        # Parse STATE.md → BrandState
│   │   ├── content-loader.ts      # Load workspace files at build time
│   │   ├── content-parser.ts      # Extract sections from markdown
│   │   ├── phase-utils.ts         # Phase metadata + asset pack config
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   └── types/
│       └── brand.ts               # All TypeScript type definitions
├── workspace/                     # Brand engagement state & outputs
│   ├── STATE.md                   # Current engagement state (single source of truth)
│   ├── STATE-template.md          # Template for new engagements
│   ├── research/                  # Agent research outputs
│   │   ├── phase-1-origin-belief.md
│   │   ├── phase-2-audience.md
│   │   ├── phase-3-positioning.md
│   │   ├── phase-4-personality.md
│   │   ├── phase-5-messaging.md
│   │   ├── phase-6-voice.md
│   │   ├── phase-7-visual.md
│   │   ├── content-audit.md       # Content analysis output
│   │   ├── competitive-brief.md   # Competitive research
│   │   ├── archetype-assessment.md
│   │   └── voice-fingerprint.md
│   ├── drafts/                    # Agent draft outputs
│   │   ├── messaging-options.md   # Copywriter output: tagline/narrative options
│   │   └── visual-direction.md    # Visual director output
│   ├── output/                    # Final assembled deliverables
│   │   ├── brand-foundation.md    # Assembled Phases 1-5
│   │   ├── voice-guide.md         # Phase 6 detailed output
│   │   ├── practical-toolkit.md   # Phase 8: bios, pitches, filters
│   │   ├── [HTML deliverables]    # visual-system.html, color-palette.html, etc.
│   │   └── [asset-pack HTML]      # social-media-kit.html, etc. (one per selected pack)
│   ├── assets/                    # Brand visual assets (images, logos)
│   └── reference/                 # Example brand reference (for testing)
├── .claude/                       # GSD system files
│   ├── agents/                    # 12 agent definitions + 1 dev-only
│   └── commands/                  # 16 command definitions + 1 dev-only
├── scripts/                       # Dev scripts
│   ├── load-test-data.sh
│   └── clean-workspace.sh
├── public/                        # Static assets (favicon, etc.)
├── dist/                          # Build output (generated, not committed)
├── package.json                   # Dependencies, scripts
├── tsconfig.json                  # TypeScript root config
├── tsconfig.app.json              # App-specific TypeScript config
├── tsconfig.node.json             # Node scripts TypeScript config
├── vite.config.ts                 # Vite build configuration
├── eslint.config.js               # ESLint rules
├── .prettierrc                    # Prettier formatting
├── index.html                     # HTML entry point
└── README.md                      # Project documentation
```

## Directory Purposes

**`src/`:**
- Purpose: React application source code
- Contains: Components (pages, cards, UI), business logic (loaders, parsers), types
- Key files: `main.tsx` (entry), `lib/router.tsx` (routing), `types/brand.ts` (schemas)

**`src/components/`:**
- Purpose: React components organized by responsibility
- Contains: Page-level components, feature cards, UI primitives, layout components
- Key files: `AppLayout.tsx` (root), `PhasePage.tsx` (phase display), `OutputPage.tsx` (file list)

**`src/components/cards/`:**
- Purpose: Phase-specific display cards (exported for potential reuse)
- Contains: `BeliefCard`, `AudienceCard`, `PositioningCard`, etc.
- Pattern: Each card renders structured phase-specific data

**`src/components/ui/`:**
- Purpose: Radix UI primitives + custom styling
- Contains: `badge.tsx`, `button.tsx`, `card.tsx`, `collapsible.tsx`
- Pattern: Headless components wrapped with Tailwind classes and CSS variables

**`src/lib/`:**
- Purpose: Reusable business logic, utilities, configuration
- Contains: Loaders, parsers, routing, phase metadata, utilities
- Key files: `state-loader.ts` (parse STATE.md), `content-parser.ts` (extract sections), `phase-utils.ts` (phase config)

**`src/types/`:**
- Purpose: Type definitions — single source of truth for data shapes
- Contains: `brand.ts` with all interfaces and types
- Pattern: Exported and used throughout application

**`workspace/`:**
- Purpose: Brand engagement state and outputs (filesystem as database)
- Contains: `STATE.md` (single source of truth), research/drafts/output (workspace files)
- Key files: `STATE.md` (loaded at build time), phase discovery notes, assembled deliverables

**`workspace/STATE.md`:**
- Purpose: Single source of truth for engagement state
- Contains: Client profile, phase status, checkpoints, running agents, key decisions, discovery outputs, session log
- Format: Markdown with structured sections (parsed by `state-loader.ts`)
- Update: Modified by agent commands and orchestrator during engagement

**`workspace/research/`:**
- Purpose: Agent research outputs — immediate insight after each phase
- Contains: Phase discovery notes (one per phase), agent analysis files
- Timing: Available immediately after phase completion, before final assembly
- Read by: `content-parser.ts` as fallback if assembled output not yet available

**`workspace/drafts/`:**
- Purpose: Agent draft outputs — intermediate work products
- Contains: `messaging-options.md` (copywriter drafts), `visual-direction.md` (visual director work)
- Timing: Generated during phases 5-7, shown as collapsible secondary content
- Read by: `content-parser.ts` via `agentOutputLabel`

**`workspace/output/`:**
- Purpose: Final assembled deliverables — the brand system
- Contains: Brand foundation, voice guide, practical toolkit (markdown); visual system, UI kit (HTML)
- Timing: Generated after each phase; user-downloadable final products
- Read by: `OutputPage`, `OutputViewer` for display/download

**`workspace/assets/`:**
- Purpose: Brand visual assets — logos, images, color swatches
- Contains: PNG/SVG/JPG files referenced by HTML deliverables
- Generated: By visual agents during Phase 7

**`.claude/agents/`:**
- Purpose: GSD agent definitions (not part of React app)
- Contains: 12 distributable agents + 1 dev-only verification agent
- Format: Markdown specification files

**`.claude/commands/`:**
- Purpose: GSD command definitions (skill registrations)
- Contains: 16 distributable commands + 1 dev-only build verification
- Format: Markdown specification files

**`scripts/`:**
- Purpose: Development utility scripts
- Contains: `load-test-data.sh`, `clean-workspace.sh`
- Usage: Invoked via npm scripts (`npm run workspace:load`)

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React app initialization
- `index.html`: HTML entry point for Vite

**Configuration:**
- `package.json`: Dependencies, build/dev scripts
- `vite.config.ts`: Vite build configuration (includes `serveWorkspace` plugin for dev)
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: Linting rules
- `.prettierrc`: Code formatting

**Core Logic:**
- `src/lib/router.tsx`: Route definitions (4 main routes)
- `src/lib/state-loader.ts`: Parse STATE.md into BrandState
- `src/lib/content-loader.ts`: Load workspace files at build time
- `src/lib/content-parser.ts`: Extract sections from markdown files
- `src/lib/phase-utils.ts`: Phase metadata + asset pack configuration
- `src/types/brand.ts`: Type definitions (400+ lines)

**Pages:**
- `src/components/OverviewPage.tsx`: Dashboard (/)
- `src/components/PhasePage.tsx`: Phase display (/phase/:phase)
- `src/components/OutputPage.tsx`: Output list (/output)
- `src/components/OutputViewer.tsx`: File viewer (/output/view/:filename)
- `src/components/AppLayout.tsx`: Root layout wrapper

**Layout & Navigation:**
- `src/components/PhaseSidebar.tsx`: Phase navigation sidebar
- `src/components/StepIndicator.tsx`: Progress indicator
- `src/components/ThemeToggle.tsx`: Dark/light mode toggle

**State:**
- `workspace/STATE.md`: Single source of truth for engagement state (loads at build time)

**Workspace Files:**
- `workspace/research/phase-N-*.md`: Phase discovery notes (fallback content source)
- `workspace/drafts/*.md`: Agent work products (messaging options, visual direction)
- `workspace/output/*.md`: Assembled deliverables (brand foundation, voice guide, toolkit)
- `workspace/output/*.html`: Visual system, color palette, UI kit

## Naming Conventions

**Files:**
- Pages: `PascalCase` + `Page` suffix (e.g., `PhasePage.tsx`)
- Components: `PascalCase` (e.g., `PhaseContent.tsx`)
- Utilities/hooks: `camelCase` (e.g., `content-loader.ts`)
- Workspace markdown: `kebab-case` (e.g., `phase-1-origin-belief.md`)
- Workspace output HTML: `kebab-case` (e.g., `visual-system.html`, `social-media-kit.html`)

**Directories:**
- Component groups: lowercase (e.g., `components/cards/`, `components/ui/`)
- Feature areas: lowercase (e.g., `src/lib/`, `src/types/`)
- Workspace areas: lowercase (e.g., `workspace/research/`, `workspace/drafts/`)

**Types:**
- Interfaces: `PascalCase` + `Interface` suffix (implicit, not explicit) (e.g., `BrandState`, `PhaseConfig`)
- Type unions: `PascalCase` (e.g., `PhaseContent`, `PhaseStatus`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `ASSET_PACKS`, `PHASE_CONTENT_MAP`)

## Where to Add New Code

**New Page Component:**
- Primary code: `src/components/NewFeaturePage.tsx`
- Add route: Update `src/lib/router.tsx` with new path
- Pattern: Follow `PhasePage.tsx` structure (load state, render, handle navigation)

**New Phase-Related Card:**
- Implementation: `src/components/cards/FeatureCard.tsx`
- Export: Add to `src/components/cards/index.ts`
- Usage: Import in `PhasePage.tsx` or use via component registry

**New UI Component:**
- Base Radix component: `src/components/ui/component-name.tsx`
- Pattern: Import Radix primitive, wrap with Tailwind + CSS variable classes
- Example: See `src/components/ui/button.tsx` (imports `@radix-ui/react-slot`)

**Utility/Helper Function:**
- Location: `src/lib/utils.ts` (if small, <50 lines) or new file `src/lib/feature-utils.ts` (if substantial)
- Pattern: Export functions, type with TypeScript, test edge cases
- Example: `cn()` utility at top of `utils.ts`

**New Type Definition:**
- Location: `src/types/brand.ts` (if phase-related) or new file `src/types/feature.ts` (if separate domain)
- Pattern: Export all types, use discriminated unions for polymorphic data
- Example: `PhaseContent` union type for phase-specific data

**Workspace File Mapping:**
- To add new content source: Update `PHASE_CONTENT_MAP` in `src/lib/content-parser.ts`
- Map phase number to files: `foundationSection`, `outputFile`, `discoveryFile`, `researchFile`, `draftFile`
- Pattern: Check assembled output first, fall back to discovery notes, load agent output separately

**New Asset Pack:**
- Add to `ASSET_PACKS` array in `src/lib/phase-utils.ts`
- Define: `id` (kebab-case), `name`, `shortName`, `description`, `icon`, `outputFile`
- Logic: Update `getRecommendedPacks()` if needed to auto-suggest based on client type/platforms

**Styling:**
- Use Tailwind classes (no CSS files in components)
- Color tokens: Use CSS variables (set in index.css from Tailwind config)
- Responsive: Use Tailwind breakpoints (`md:`, `lg:`)
- Dark mode: Use `dark:` variant prefix

## Special Directories

**`.git/`:**
- Purpose: Version control
- Generated: No
- Committed: Yes (standard git directory)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (installed by `npm install`)
- Committed: No (in `.gitignore`)

**`dist/`:**
- Purpose: Production build output
- Generated: Yes (by `npm run build`)
- Committed: No (in `.gitignore`)

**`workspace/`:**
- Purpose: Brand engagement state and outputs
- Generated: Partially (STATE.md, outputs created by agents; templates provided)
- Committed: Yes (but only template initially; STATE.md and outputs added during engagement)

---

*Structure analysis: 2026-03-26*
