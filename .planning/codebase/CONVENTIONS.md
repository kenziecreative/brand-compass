# Coding Conventions

**Analysis Date:** 2026-03-26

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `BeliefCard.tsx`, `AudienceCard.tsx`, `PhaseContent.tsx`)
- Utilities and helpers: camelCase (e.g., `state-loader.ts`, `content-parser.ts`, `phase-utils.ts`)
- UI primitives: lowercase descriptive (e.g., `button.tsx`, `card.tsx`, `collapsible.tsx`)
- Types/interfaces: Separate `brand.ts` file organizing all domain types

**Functions:**
- camelCase for all functions (e.g., `loadState()`, `extractSection()`, `parseClientProfile()`)
- Exported helper functions may be prefixed with load/parse/get (e.g., `loadResearchFiles()`, `getFile()`)
- React components are PascalCase functions (e.g., `function BeliefCard()`)

**Variables:**
- Local state: camelCase (e.g., `originOpen`, `tensionsOpen`)
- Constants: camelCase (e.g., `discoveryMap`, `PHASE_CONTENT_MAP`)
- Type instances: camelCase (e.g., `client`, `phases`)

**Types:**
- Interfaces: PascalCase ending in descriptive suffix (e.g., `BeliefContent`, `AudienceContent`, `ClientProfile`)
- Union types: PascalCase with descriptive name (e.g., `PhaseStatus`, `ClientType`)
- Branded/union discriminators: 'kebab-case' literal strings (e.g., `'nonprofit'`, `'music-artist'`, `'app-dashboard-ui'`)

## Code Style

**Formatting:**
- Tool: Prettier 3.8.1
- Semicolons: disabled (`semi: false`)
- Single quotes: enabled (`singleQuote: true`)
- Print width: 100 characters
- Tab width: 2 spaces
- Arrow function parens: omitted where possible (`arrowParens: 'avoid'`)
- JSX quotes: double quotes (`jsxSingleQuote: false`)
- Trailing commas: all (`trailingComma: 'all'`)

**Linting:**
- Tool: ESLint 9.17.0 with TypeScript support
- Config: `eslint.config.js` (flat config format)
- Plugins: `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-config-prettier`
- Unused variables: error if not prefixed with underscore (e.g., `_unused`)
- React hooks: warnings from `react-hooks/rules-of-hooks`
- React refresh: warnings for non-component exports

## Import Organization

**Order:**
1. React imports (e.g., `import { useState } from 'react'`)
2. Third-party libraries (e.g., `import { ChevronDown } from 'lucide-react'`)
3. Internal utilities (e.g., `import { cn } from '@/lib/utils'`)
4. Local components (e.g., `import { Card } from '@/components/ui/card'`)
5. Type imports (e.g., `import type { BeliefContent } from '@/types/brand'`)

**Path Aliases:**
- `@/*` maps to `./src/*` (baseUrl: "." in tsconfig.json)
- All internal imports use the `@/` prefix

**Example from actual code:**
```typescript
import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { BeliefContent } from '@/types/brand'
```

## Error Handling

**Patterns:**
- Promise-based error handling with `.catch()` (e.g., in `OutputPage.tsx` and `OutputViewer.tsx`)
- Error state stored in component state (e.g., `const [error, setError] = useState<string | null>(null)`)
- Explicit error checking before throwing: `if (!r.ok) throw new Error(\`File not found: ${filename}\`)`
- Fallback to null/false when file operations fail
- No global error boundary detected; errors handled at component level

**Observed approach:**
```typescript
fetch(url)
  .then(r => {
    if (!r.ok) throw new Error(`File not found: ${filename}`)
    return r.text()
  })
  .catch(e => setError(e.message))
```

## Logging

**Framework:** None detected. No logging library (console methods) observed in production code.

**When NOT logging:**
- Application doesn't include logging statements — uses TypeScript strict mode for dev-time type safety
- Errors are caught and stored in component state for UI display, not logged to console

## Comments

**When to Comment:**
- JSDoc blocks for exported functions and complex utilities
- Inline comments for non-obvious algorithmic steps
- Section comments for grouped logic blocks

**JSDoc/TSDoc:**
- Used in utility files like `state-loader.ts` and `content-loader.ts`
- Pattern: `/** Description */` above function definition
- Includes parameter and return documentation in longer utilities

**Observed examples:**
```typescript
/**
 * Parses STATE.md into a BrandState object.
 * Uses import.meta.glob to load the file at build time.
 */

/**
 * Extracts sections from workspace markdown files and maps them to phases.
 * Uses content-loader to access files, then splits by heading structure.
 */
```

## Function Design

**Size:** Functions are kept focused and typically 10-30 lines for utilities, 20-60 lines for components.

**Parameters:**
- Component props: destructured inline with type annotation
- Utility functions: typed parameters with explicit types
- No rest parameters (`...args`) observed; explicit parameters preferred

**Return Values:**
- Explicit return types: all functions have annotated return types
- Components return JSX.Element (implicit in functional components)
- Utilities return structured types (interfaces) or primitives
- Null returns used for "not found" scenarios (e.g., `parseClientProfile(): ClientProfile | null`)

**Example function signature:**
```typescript
export function extractSection(
  markdown: string,
  sectionPattern: string,
): string | null
```

## Module Design

**Exports:**
- Named exports preferred (e.g., `export function BeliefCard()`)
- Single default exports only for router configuration
- Barrel files used in `components/cards/index.ts` exporting all card components

**Barrel Files:**
- `src/components/cards/index.ts` — re-exports all card component types: BeliefCard, AudienceCard, PositioningCard, etc.
- Purpose: convenience imports from `@/components/cards` rather than individual files

**Module patterns:**
- Utility modules are stateless pure functions (e.g., `state-loader.ts`, `content-parser.ts`)
- Parser modules handle markdown extraction and transformation
- Loader modules use `import.meta.glob()` for build-time file loading
- Component modules are React functional components with local state (hooks)

## TypeScript Configuration

**Strict Mode:** Enabled
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true` (with underscore prefix exception)
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`

**Build Target:** ES2022
- JSX: `react-jsx` (automatic runtime)
- Module: `ESNext`
- Module resolution: `bundler`

## React Patterns

**Hooks:**
- `useState()` used throughout for component-level state
- Rules of hooks enforced via ESLint
- No complex state management library (Redux, Zustand) — useState sufficient

**Component Types:**
- All functional components
- Props destructured at function signature
- Props typed inline with `{ prop: Type }` pattern

**JSX Conventions:**
- Attribute quotes: double quotes on JSX attributes (enforced by prettier)
- Multi-line JSX properly indented
- Icon components from `lucide-react` rendered with size props (e.g., `size-4`, `size-5`)
- Conditional rendering: ternary and `&&` operators

---

*Convention analysis: 2026-03-26*
