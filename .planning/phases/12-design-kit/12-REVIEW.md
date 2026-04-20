---
phase: 12-design-kit
reviewed: 2026-04-20T08:15:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - .claude/agents/design-kit-packager.md
findings:
  critical: 1
  warning: 2
  info: 2
  total: 5
status: issues_found
---

# Phase 12: Code Review Report

**Reviewed:** 2026-04-20T08:15:00Z
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed the design-kit-packager agent definition (494 lines), which instructs a sonnet-model agent to produce atomized components, preview cards, root documentation files, and a landing page specimen. The agent is well-structured with clear sequential task ordering, thorough pre-flight checks, and a detailed quality bar. However, there is a critical relative path bug for component and preview token links that will cause silent rendering failures (all `var()` references resolve to empty strings). Two additional warnings address an entity-type matching ambiguity and a hardcoded reference to potentially non-existent output. Cross-referenced against the upstream design-kit-foundation agent to verify path conventions.

## Critical Issues

### CR-01: Component and preview token link paths resolve to wrong directory

**File:** `.claude/agents/design-kit-packager.md:63-66` (also lines 84, 197, 484, 487)
**Issue:** The agent instructs components and previews to use `href="../../tokens/colors.css"` (two levels up). Given the actual directory structure:

```
workspace/output/design-kit/
  tokens/colors.css
  components/button.html
  previews/colors.html
```

From `components/button.html`, the path `../../tokens/colors.css` resolves to `workspace/output/tokens/colors.css` -- a directory that does not exist. The correct relative path from `components/` or `previews/` to `tokens/` is `../tokens/colors.css` (one level up to `design-kit/`, then into `tokens/`).

The agent explicitly warns against using `../tokens/` on line 84 ("Using one level up will cause all var() references to render as empty strings") -- but the opposite is true. The two-level path causes the failure; one level is correct.

This is reinforced as canonical in the Quality Bar (lines 484, 487), meaning a diligent agent following the quality checks will validate the wrong path and reject the correct one.

The same bug applies to all 5 preview files (line 197 repeats the same "two directory levels" instruction).

**Fix:** Change all component and preview token link instructions from `../../tokens/` to `../tokens/`. Update three locations:

Line 63-66 (component HTML template):
```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

Line 84 (CRITICAL path rule for components):
```
CRITICAL path rule: Files in `components/` sit one directory level below
the `workspace/output/design-kit/` root. Token link tags must use
`href="../tokens/[file].css"`.
```

Line 197 (CRITICAL path rule for previews): same correction as line 84.

Lines 484, 487 (Quality Bar): update to assert `../tokens/` not `../../tokens/`.

**Note:** The landing-page.html path (`../tokens/` on line 393) has a related but separate issue -- the landing page sits at `workspace/output/design-kit/landing-page.html`, so the correct relative path to `workspace/output/design-kit/tokens/colors.css` is `tokens/colors.css` (no traversal needed). However, this same off-by-one convention is inherited from the design-kit-foundation agent (which uses `../tokens/` for its root-level design-kit HTML files). If the foundation agent's paths are corrected, the landing page path here should be updated to match. Flagging as awareness rather than a separate finding since fixing the foundation agent is outside this file's scope.

## Warnings

### WR-01: Entity-type keyword matching has no precedence rule for ambiguous types

**File:** `.claude/agents/design-kit-packager.md:410-415`
**Issue:** The entity-type conditional checks for "individual" keywords and "org" keywords, but does not specify what happens when a type value matches BOTH keyword sets. For example, `**Type:** solo brand strategist` contains "solo" (individual keyword) and "brand" (org keyword). The instruction lists individual keywords first and org keywords second, but does not explicitly state "check individual keywords first; if any match, use Individual Template regardless of org keyword matches."

Without precedence, an executing agent could match on either set depending on its interpretation, producing inconsistent template selection across runs.

**Fix:** Add an explicit precedence rule after line 415:

```markdown
- Check individual keywords first. If ANY individual keyword matches, use
  Individual Template -- even if org keywords also appear in the value.
- Only check org keywords if no individual keyword matched.
- If entity type is absent, unclear, or matches neither set, default to Org Template.
```

### WR-02: HANDOFF.md references skill-bundle output that may not exist

**File:** `.claude/agents/design-kit-packager.md:381`
**Issue:** The "Read Next" section of HANDOFF.md directs the reader to `workspace/output/skill-bundle/SKILL.md`. This file is produced by the skill-bundle-packager agent, which is a separate agent that may or may not have run by the time the design-kit-packager executes. If it hasn't run, the handoff document points to a non-existent file with no fallback or conditional handling.

**Fix:** Add a conditional check before writing the "Read Next" section:

```markdown
Before writing the "Read Next" section: Glob `workspace/output/skill-bundle/SKILL.md`.
If found, include the "Read Next" section as specified.
If not found, replace with: "## Read Next\n\nVoice layer skill bundle has not yet been
generated. When available, it will be at `workspace/output/skill-bundle/SKILL.md`."
```

## Info

### IN-01: Pre-flight check 9 Globs a directory path instead of a file pattern

**File:** `.claude/agents/design-kit-packager.md:42`
**Issue:** Check 9 says "Glob `workspace/assets/mark-explorations/`" -- Globbing a bare directory path may not behave as expected with the Glob tool, which matches file patterns. The intent is to detect whether any mark asset file exists in that directory.

**Fix:** Use a wildcard pattern:
```
Glob `workspace/assets/mark-explorations/*`
```

### IN-02: Brand slug computation referenced in preview but not defined there

**File:** `.claude/agents/design-kit-packager.md:275`
**Issue:** The brand-groups.html preview card's token layer lists "the brand slug (brand name lowercased with hyphens)" as a value to display. The slug computation rule is defined in the package.json section (line 329) but is not referenced or repeated in the preview card section. An agent processing tasks sequentially would encounter the slug reference in Task 2 before reading the definition in Task 2's package.json subsection, but the lack of cross-reference could cause the agent to skip or improvise the slug format.

**Fix:** Add a brief inline reference: "brand slug (see package.json section below for computation rule: lowercase brand name, spaces replaced with hyphens)."

---

_Reviewed: 2026-04-20T08:15:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
