# Testing Patterns

**Analysis Date:** 2026-03-26

## Test Framework

**Status:** No testing framework configured

**Current State:**
- No test files (*.test.ts, *.test.tsx, *.spec.ts) in `src/` directory
- No test runner dependencies installed (no Jest, Vitest, etc.)
- No test configuration files (jest.config.js, vitest.config.ts, etc.)
- package.json contains no test scripts

**Rationale:**
This is a development/management dashboard for a brand guidance system, not a production service. Core logic (state parsing, markdown extraction) is deterministic and straightforward — suitable for integration testing via actual file loading rather than unit tests.

## Code Testability

Despite the lack of current tests, the codebase is designed for testability:

**Testable modules:**

`src/lib/state-loader.ts` — Pure functions for parsing markdown:
- `loadState(): BrandState | null` — deterministic, no side effects
- `parseClientProfile(md: string): ClientProfile | null`
- `parsePhaseStatus(md: string): Record<number, PhaseStatus>`
- `parseCheckpoints(md: string): CheckpointStatus`
- `parseAgents(md: string): AgentEntry[]`
- `parseDiscoveryOutputs(md: string): DiscoveryOutput[]`
- `parseSessionLog(md: string): SessionLogEntry[]`
- `parseKeyDecisions(md: string): KeyDecision[]`

Could be tested against mock STATE.md files with known structure.

`src/lib/content-parser.ts` — Pure functions for extracting markdown sections:
- `extractSection(markdown: string, sectionPattern: string): string | null`

Could be tested with sample markdown strings.

`src/lib/content-loader.ts` — File loading wrapper:
- `loadResearchFiles(): ContentFile[]`
- `loadDraftFiles(): ContentFile[]`
- `loadOutputFiles(): ContentFile[]`
- `getFile(path: string): string | null`
- `hasResearchFiles(): boolean`
- `hasDraftFiles(): boolean`
- `hasOutputFiles(): boolean`

Constrained by Vite's `import.meta.glob()` which requires build-time knowledge.

## Component Test Patterns

**Current state:** No unit tests for components

**Components suitable for snapshot/integration testing:**

UI Primitives (`src/components/ui/`):
- `Button.tsx` — CVA-based variant component
- `Card.tsx` — Compound component (CardHeader, CardTitle, CardContent)
- `Badge.tsx` — Simple output component
- `Collapsible.tsx` — Radix UI wrapper

Card Components (`src/components/cards/`):
- `BeliefCard.tsx` — Props: `{ data: BeliefContent }`
- `AudienceCard.tsx` — Props: `{ data: AudienceContent }`
- `PositioningCard.tsx` — Props: `{ data: PositioningContent }`
- `ArchetypeCard.tsx` — Props: `{ data: ArchetypeContent }`
- `MessagingCard.tsx` — Props: `{ data: MessagingContent }`
- `VoiceCard.tsx` — Props: `{ data: VoiceContent }`
- `VisualDirectionCard.tsx` — Props: `{ data: VisualDirectionContent }`

All card components accept structured data and render with Collapsible sections. Would benefit from fixture-based tests.

**Complex stateful components:**
- `PhasePage.tsx` — Loads and renders phase content, manages collapsible state
- `OutputPage.tsx` — Renders output documents (HTML, Markdown) with fetch-based loading
- `OutputViewer.tsx` — File browser with error handling

These would need integration tests verifying file loading and state transitions.

## Recommended Testing Approach

If tests are added, follow this pattern:

**Test runner:** Vitest (aligns with Vite build tool)

**Dependencies to add:**
```json
{
  "devDependencies": {
    "vitest": "^2.x",
    "@testing-library/react": "^16.x",
    "@testing-library/user-event": "^14.x",
    "jsdom": "^25.x"
  }
}
```

**Configuration:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
})
```

**Test file location:** Co-locate with source
- `src/lib/state-loader.test.ts` next to `src/lib/state-loader.ts`
- `src/components/cards/BeliefCard.test.tsx` next to `src/components/cards/BeliefCard.tsx`

**Run commands to add:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Testing Data

**Fixtures would live in:** `src/__fixtures__/` or `src/__mocks__/`

**Required fixtures:**

Sample STATE.md with known structure:
```
src/__fixtures__/state-baseline.md
src/__fixtures__/state-empty.md
src/__fixtures__/state-partial.md
```

Sample markdown content:
```
src/__fixtures__/markdown-samples/
├── brand-foundation.md
├── voice-guide.md
└── phase-outputs/
```

Structured test data:
```
src/__fixtures__/test-data.ts
```

Example structure:
```typescript
export const mockClientProfile: ClientProfile = {
  name: 'Test Brand',
  type: 'startup',
  description: 'Test description',
  platforms: ['website', 'instagram'],
  existingAssets: ['logo'],
  assetPacks: ['social-media-kit'],
}

export const mockBrandState: BrandState = {
  client: mockClientProfile,
  clientName: 'Test Brand',
  currentPhase: 2,
  phases: { 0: 'completed', 1: 'completed', 2: 'in_progress', ... },
  ...
}
```

## What to Test (Priority Order)

**High priority — core logic:**
1. State parser (`state-loader.ts`): Test all parse* functions against malformed STATE.md
2. Content parser (`content-parser.ts`): Test extractSection against various markdown structures
3. Phase utils (`phase-utils.ts`): Test phase transitions and checkpoint logic

**Medium priority — UI components:**
4. Card components: Snapshot tests for correct rendering of structured data
5. Collapsible behavior: Test open/close state transitions
6. Button variants: Test all CVA variants render correctly

**Lower priority — page-level integration:**
7. PhasePage: Test file loading and error states
8. OutputPage: Test HTML/MD document rendering
9. Router: Test page navigation

## Error Handling Tests

**Patterns to verify:**

`state-loader.ts` parsing:
- `parseClientProfile()` returns null for malformed client section
- `parsePhaseStatus()` defaults phases to 'pending' when unmatched
- `parseCheckpoints()` returns 'pending' if checkbox not marked

`content-loader.ts` file access:
- `getFile()` returns null for non-existent paths
- `hasResearchFiles()` returns false when no files loaded

`components/OutputViewer.tsx` file fetching:
- Error state set when fetch fails
- Error message displayed in UI
- Graceful fallback when file doesn't exist

## Code Coverage

**Coverage tracking:** Not currently enforced

**Recommended target:** 70-80% statement coverage
- Core utilities: 100% (state-loader, content-parser)
- Components: 60-70% (integration tests only, no 100% line coverage push)
- Pages: 50-60% (integration complexity)

---

*Testing analysis: 2026-03-26*
