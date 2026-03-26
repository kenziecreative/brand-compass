# Codebase Concerns

**Analysis Date:** 2026-03-26

## Tech Debt

**Eslint Violation - Variable Declaration:**
- Issue: Variable `result` in `src/lib/content-parser.ts:20` should be declared with `const` instead of `let`, but needs reassignment logic verification
- Files: `src/lib/content-parser.ts`
- Impact: Linting error blocks build automation and violates consistency patterns
- Fix approach: Review line 20-35 to confirm if `result` needs reassignment. If not mutating via push() alone, change to `const`. If reassignment is needed later, refactor to use immutable patterns.

**Build Output Size Warning:**
- Issue: Main bundle (`dist/assets/index-7ijzciHX.js`) is 530.27 kB minified (165.64 kB gzipped), exceeding Vite's 500 kB threshold
- Files: Build output (all source contributes)
- Impact: Slower initial load, impacts performance on slower networks, harms mobile user experience
- Fix approach: Implement code splitting via dynamic imports for Phase content. Consider lazy-loading card components and output file viewers. Use `React.lazy()` with `Suspense` boundaries for phase-specific cards that aren't visible on initial render.

**Fast Refresh Rule Violations:**
- Issue: `src/components/ui/badge.tsx:37` and `src/components/ui/button.tsx:56` export both components and constants, violating React Fast Refresh constraints
- Files: `src/components/ui/badge.tsx`, `src/components/ui/button.tsx`
- Impact: Hot module reload failures during development, slows iteration feedback loop
- Fix approach: Extract constants and class definitions to separate files (e.g., `src/components/ui/badge-variants.ts`, `src/components/ui/button-variants.ts`), import them back into the component files.

## Known Bugs

**Missing Cleanup in OutputPage Dependency:**
- Issue: `useEffect` in `src/components/OutputPage.tsx:64-74` lacks cleanup logic for concurrent fetch requests
- Symptoms: If user navigates away or component unmounts while multiple HEAD requests are pending, state updates may attempt to write to unmounted components
- Files: `src/components/OutputPage.tsx`
- Trigger: Open OutputPage, then rapidly navigate away before all file existence checks complete
- Workaround: None currently; relies on browser cleanup, but no abort controller or cleanup function
- Fix approach: Add AbortController signal to fetch calls, implement cleanup function in useEffect return to abort pending requests on unmount.

## Security Considerations

**File Serving Security - Directory Traversal Vulnerability:**
- Risk: Custom `serveWorkspace()` middleware in `vite.config.ts` resolves file paths from user-controlled URLs. While it filters `?` and checks existence, insufficient validation of resolved paths could theoretically allow `/workspace/../../../etc/passwd` traversal attacks.
- Files: `vite.config.ts:7-36`, development server only
- Current mitigation: Check for query strings (`req.url.includes('?')`), validate file existence before serving, restrict MIME types for known file types
- Recommendations: Use `path.normalize()` and validate that resolved file is within workspace bounds using `path.isAbsolute()` and checking resolved path starts with workspace root. Add explicit allowlist of directories (`/workspace/research/`, `/workspace/drafts/`, `/workspace/output/`, `/workspace/assets/`). Implement this only in dev server, document as dev-only feature.

**Unsafe Regex Patterns in STATE.md Parsing:**
- Risk: `src/lib/state-loader.ts` uses loose regex patterns to extract state from markdown (e.g., `/\[x\]/i`, `/Phase ${i}`) that could match unintended content if STATE.md structure changes unexpectedly
- Files: `src/lib/state-loader.ts:88-89`, `:157-164`, `:181-182`
- Current mitigation: Template uses structured headings and checkbox patterns consistently
- Recommendations: Add validation after regex extraction to ensure parsed values are within expected ranges (phases 0-8, valid status strings). Log warnings if template structure diverges. Add schema validation for parsed output using TypeScript types.

## Performance Bottlenecks

**Synchronous File Globbing at Build Time:**
- Problem: `import.meta.glob()` in `src/lib/state-loader.ts` and `src/lib/content-loader.ts` loads all workspace files eagerly during build, even though only one STATE.md and subset of files are used per session
- Files: `src/lib/state-loader.ts:18-22`, `src/lib/content-loader.ts:7-29`
- Cause: Using `eager: true` flag forces all matches to be bundled immediately. With wildcard patterns over entire directories, this includes all files even when most aren't needed
- Improvement path: Use lazy loading (`eager: false`) for content-loader and load files on-demand. Keep state-loader eager since STATE.md is always needed. For large workspaces with many research/draft files, implement virtual modules or a server endpoint to fetch files only when viewed.

**No Memoization on Repeated Phase Lookups:**
- Problem: `getPhase()` and `getPhasesByGroup()` in `src/lib/phase-utils.ts` filter static arrays on every call without caching
- Files: `src/lib/phase-utils.ts:127-133`
- Cause: Not load-bearing for current codebase size (8 phases), but pattern doesn't scale if phase definitions grow or are called frequently
- Improvement path: Pre-compute phase groups at module load time (`foundation`, `identity`, `expression` maps). For getPhase(), consider creating a Map for O(1) lookup instead of array.find().

**Unoptimized Asset Pack Recommendations:**
- Problem: `getRecommendedPacks()` in `src/lib/phase-utils.ts:208-247` uses nested string includes() checks with multiple loops, creating O(n*m) complexity
- Files: `src/lib/phase-utils.ts`
- Cause: For each platform string, loops through every keyword array. With 8 asset packs and variable platform counts, this is inefficient
- Improvement path: Build a single keyword->pack map once at module load time, then check each platform against it in one pass.

## Fragile Areas

**State Loader Parsing Fragility:**
- Files: `src/lib/state-loader.ts`
- Why fragile: Depends entirely on STATE.md structure matching expected markdown format. No validation that sections exist or follow pattern. If a field is missing or reformatted, parser silently returns placeholder values (empty strings/arrays). This makes bugs hard to detect.
- Safe modification: Add explicit validation after extraction — check that client.name is not empty, phases object has entries 0-8, agents/decisions are arrays. Throw or warn if parsing fails. Add test cases for malformed input.
- Test coverage: Zero test coverage for parsing logic. Missing tests for: empty sections, missing fields, template format, date parsing, checkbox parsing.

**Phase Content Mapping Assumptions:**
- Files: `src/lib/content-parser.ts`
- Why fragile: Maps specific phase numbers to file paths (`foundationSection`, `discoveryFile`, `researchFile`) with no validation that files exist. If agents output different filenames or phases are restructured, content simply doesn't render.
- Safe modification: Add explicit error boundaries around content loading. Return meaningful messages if expected files don't exist. Create a validation function to ensure all phase-to-content mappings have valid targets.
- Test coverage: No tests for missing files, malformed markdown sections, or phase number edge cases.

**Regex-Based Markdown Extraction:**
- Files: `src/lib/state-loader.ts:92-96`, `src/lib/content-parser.ts:17-37`
- Why fragile: Uses simple string.startsWith() and regex patterns to extract sections. Breaks if: headings have extra whitespace, section content has `---` dividers, nested subsections exist, or frontmatter is added.
- Safe modification: Use a proper markdown AST parser (e.g., `remark`) instead of regex. This gives structural understanding instead of brittle pattern matching.
- Test coverage: No coverage for edge cases in markdown parsing.

## Scaling Limits

**Component Count vs. Bundle Size:**
- Current capacity: 3,624 total lines of code, ~530 kB bundle (minified)
- Limit: Adding more phase-specific cards or UI variants will exceed recommended bundle size. Each card component (e.g., `ArchetypeCard.tsx` at 119 lines) adds overhead.
- Scaling path: Implement code splitting with dynamic imports for phase content. Use lazy loading for card components not visible on initial render. Extract shared patterns into composable utilities.

**Workspace File Handling at Build Time:**
- Current capacity: Tested with test dataset of ~10 files (1 STATE.md + research/drafts/output files)
- Limit: If workspace grows to 100+ files, build time and bundle size will increase significantly due to eager loading of all files via import.meta.glob
- Scaling path: Switch to lazy loading for content files. Keep only STATE.md eager. Implement a fetch-based file discovery system for large workspaces.

## Scaling Limits

**Workspace File Handling at Build Time:**
- Current capacity: Tested with test dataset of ~10 files (1 STATE.md + research/drafts/output files)
- Limit: If workspace grows to 100+ files, build time and bundle size will increase significantly due to eager loading of all files via import.meta.glob
- Scaling path: Switch to lazy loading for content files. Keep only STATE.md eager. Implement a fetch-based file discovery system for large workspaces.

## Dependencies at Risk

**React 19 Early Adoption:**
- Risk: React 19.2.0 is recent (released Feb 2025). Limited ecosystem stability, potential for breaking changes in minor versions.
- Impact: If React 19 discovers critical bugs or has breaking API changes in patches, minor version updates could break rendering or hooks behavior
- Migration plan: Pin to exact version (`19.2.0` instead of `^19.2.0`) until wider adoption and stability. Monitor React changelog. Have fallback to React 18 if blockers appear.

**Tailwind CSS v4 + Plugin Stack:**
- Risk: @tailwindcss/vite v4.1.17 is cutting-edge. Interaction with fresh tailwindcss v4.1.17 and custom Vite plugin (serveWorkspace) creates complex build configuration.
- Impact: Updates to Tailwind CSS or Vite may break plugin compatibility. Custom MIME type configuration in serveWorkspace could become incompatible with Tailwind's vite plugin.
- Migration plan: Pin all CSS tooling versions. Test updates in isolation. Keep serveWorkspace middleware separate from CSS pipeline for easy debugging.

**Router DOM v7 - Recent Major Version:**
- Risk: react-router-dom v7.9.6 is major version upgrade from v6. API may still be stabilizing.
- Impact: Route parameter handling (e.g., `useParams()` with wildcard `*`) could have edge cases. Navigation between phases may have race conditions.
- Migration plan: Monitor router-dom issues. Test all navigation flows thoroughly. Consider pinning to specific minor version.

## Missing Critical Features

**No Error Boundaries:**
- Problem: Application has no React error boundary components. If any phase content fails to parse or render, entire page crashes.
- Blocks: Graceful degradation, user experience during edge cases, debugging production issues
- Priority: HIGH — Add error boundaries at route level and around phase content rendering sections

**No Input Validation on STATE.md Parsing:**
- Problem: Parser assumes STATE.md structure is always correct. No schema validation, no error messages for malformed data.
- Blocks: Detecting state corruption, providing helpful feedback if STATE.md becomes invalid
- Priority: HIGH — Add Zod or similar schema validation before using parsed state

**No Tests for Core Utilities:**
- Problem: state-loader.ts, content-loader.ts, and phase-utils.ts have zero test coverage
- Blocks: Confidence in refactoring, regression detection, onboarding new developers
- Priority: MEDIUM — Add unit tests for parsing functions with various input formats

**No Offline Support:**
- Problem: All file fetches are live HTTP. If network fails or development server stops, app shows blank content.
- Blocks: Offline development, resilience testing
- Priority: LOW for development, MEDIUM for production if deployed standalone

## Test Coverage Gaps

**State Parser:**
- What's not tested: Extraction of client profile, phase status, checkpoints, agents, discoveries, session log from various STATE.md formats
- Files: `src/lib/state-loader.ts`
- Risk: Parsing bugs go undetected. Changes to parsing logic may break without warning.
- Priority: HIGH

**Content Parser & Markdown Extraction:**
- What's not tested: Section extraction with different markdown structures, missing sections, malformed headings, edge cases in regex matching
- Files: `src/lib/content-parser.ts`
- Risk: Content may silently fail to load if markdown structure changes slightly
- Priority: HIGH

**Phase Navigation & State Transitions:**
- What's not tested: Checkpoint enforcement (can't proceed past Phase 3 without Checkpoint A), phase status transitions, current phase detection
- Files: `src/components/PhaseSidebar.tsx`, `src/lib/phase-utils.ts`
- Risk: Users could bypass checkpoints or see incorrect phase status
- Priority: MEDIUM

**File Existence Checks (OutputPage):**
- What's not tested: Promise.all handling when some files exist and others don't, race conditions in fetch completion, error handling for network failures
- Files: `src/components/OutputPage.tsx`
- Risk: File status may display incorrectly or updates may be missed
- Priority: MEDIUM

**UI Components (Badge, Button, Cards):**
- What's not tested: Badge variant rendering, Button state transitions, Card content display with different markdown formats
- Files: `src/components/ui/`, `src/components/cards/`
- Risk: Visual bugs, accessibility issues, missing prop validation
- Priority: LOW for MVP, MEDIUM for production

---

*Concerns audit: 2026-03-26*
