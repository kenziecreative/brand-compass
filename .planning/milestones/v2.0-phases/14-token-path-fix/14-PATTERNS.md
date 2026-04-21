# Phase 14: Token Path Fix - Pattern Map

**Mapped:** 2026-04-21
**Files analyzed:** 2 modified files
**Analogs found:** 2 / 2 (self-referential — each file's own existing correct patterns are the analog)

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `.claude/agents/design-kit-foundation.md` | agent-definition (config) | transform (HTML post-processor) | `.claude/agents/design-kit-packager.md` lines 63-65 (correct subdirectory pattern) | same-file-pattern |
| `.claude/agents/design-kit-packager.md` | agent-definition (config) | transform (HTML generator) | `.claude/agents/design-kit-packager.md` line 349 (already-correct root-level pattern in README section) | same-file-pattern |

## Pattern Assignments

### `.claude/agents/design-kit-foundation.md` — Change A: Task 2 link example (lines 250-254)

**Role:** agent-definition / config
**Change type:** text correction (wrong path string → correct path string + corrected prose rationale)

**Current (buggy) pattern** (lines 250-254):
```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```
Accompanied by the prose: "The relative path `../tokens/` is correct because design-kit HTML files sit at `workspace/output/design-kit/[filename].html` -- one level up from the tokens directory at `workspace/output/design-kit/tokens/`."

**Correct pattern to copy** (verified against directory layout in RESEARCH.md):
```html
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="tokens/typography.css">
<link rel="stylesheet" href="tokens/spacing.css">
```
Accompanied by the corrected prose: "The relative path `tokens/` is correct because design-kit HTML files sit at `workspace/output/design-kit/[filename].html` -- at the same level as the `tokens/` directory, which is a sibling (not a parent). Using `../tokens/` would resolve to `workspace/output/tokens/` which does not exist."

**Analog source** (already-correct instance — same codebase): `.claude/agents/design-kit-packager.md` line 349:
```
<link rel="stylesheet" href="tokens/colors.css">
```
This README.md example in design-kit-packager.md uses the correct `tokens/` (no `../`) for a root-level consumer. It is the proven correct form for files at the design-kit root.

---

### `.claude/agents/design-kit-foundation.md` — Change B: Quality Bar (line 282)

**Role:** agent-definition / config
**Change type:** text correction (wrong assertion string → correct assertion string)

**Current (buggy) pattern** (line 282):
```
- External `<link>` tags use relative paths (`../tokens/`) -- correct because design-kit HTML files sit at `workspace/output/design-kit/` alongside the `tokens/` directory
```

**Correct pattern to substitute:**
```
- External `<link>` tags use relative paths (`tokens/`) -- correct because design-kit HTML files sit at `workspace/output/design-kit/` alongside the `tokens/` sibling directory (NOT `../tokens/` which would resolve to the non-existent `workspace/output/tokens/`)
```

**Why this is coupled:** The Quality Bar is the agent's self-check criterion. If only the link example is corrected but the Quality Bar still asserts `../tokens/`, the agent will validate its (now correct) output against the wrong standard and may flag a false failure or self-correct back to the broken path.

---

### `.claude/agents/design-kit-packager.md` — Change C: Task 3 landing-page.html link example (lines 389-397)

**Role:** agent-definition / config
**Change type:** text correction (wrong path string + wrong prose rationale → correct path string + correct prose rationale)

**Current (buggy) pattern** (lines 389-394):
```markdown
**Token link pattern — ONE level up because landing-page.html is at design-kit root:**

```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

Do NOT use `../../tokens/` for this file. It sits at `workspace/output/design-kit/landing-page.html`, one level above the `tokens/` directory — not two levels.
```

**Correct pattern to substitute** (lines 389-397 replacement):
```markdown
**Token link pattern — sibling directory because landing-page.html is at design-kit root:**

```html
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="tokens/typography.css">
<link rel="stylesheet" href="tokens/spacing.css">
```

Do NOT use `../tokens/` for this file. It sits at `workspace/output/design-kit/landing-page.html` — at the same level as `tokens/`, which is a sibling directory. `../tokens/` would resolve to the non-existent `workspace/output/tokens/`.
```

**Analog source** (already-correct instance — same file): `.claude/agents/design-kit-packager.md` line 349:
```
<link rel="stylesheet" href="tokens/colors.css">
```
This is the correct root-level form already present in the same file's README section.

---

## Shared Patterns

### Root-Level vs. Subdirectory Path Rule

This cross-cutting rule applies to any HTML file written by design-kit agents and must be consistently applied.

**Source for correct root-level pattern:** `.claude/agents/design-kit-packager.md` line 349
**Source for correct subdirectory pattern:** `.claude/agents/design-kit-packager.md` lines 63-65 + CRITICAL path rule at line 84

**Root-level files** (`design-kit/*.html`):
```html
<link rel="stylesheet" href="tokens/colors.css">
<link rel="stylesheet" href="tokens/typography.css">
<link rel="stylesheet" href="tokens/spacing.css">
```

**Subdirectory files** (`design-kit/components/*.html`, `design-kit/previews/*.html`):
```html
<link rel="stylesheet" href="../tokens/colors.css">
<link rel="stylesheet" href="../tokens/typography.css">
<link rel="stylesheet" href="../tokens/spacing.css">
```

**Apply the root-level pattern to:** All instructions governing root-level files in design-kit-foundation.md (Task 2, Quality Bar) and design-kit-packager.md (Task 3 landing-page).

**Do NOT change:** Lines 63-65, 84, and 197 in design-kit-packager.md. These already use `../tokens/` and are correct for subdirectory files.

---

## Lines That Must NOT Change

The following occurrences of `../tokens/` are correct and must be left alone:

| File | Line(s) | Context | Why correct |
|------|---------|---------|-------------|
| `design-kit-packager.md` | 63-65 | Task 1 component HTML template | Files in `components/` are one level down — `../tokens/` is right |
| `design-kit-packager.md` | 84 | CRITICAL path rule comment | Explains correct subdirectory behavior — must stay |
| `design-kit-packager.md` | 197 | CRITICAL path rule for `previews/` | Files in `previews/` are one level down — same logic |

The following occurrence of `tokens/` (no `../`) is already correct and must NOT be touched:

| File | Line | Context | Why correct |
|------|------|---------|-------------|
| `design-kit-packager.md` | 349 | README.md Developer Quick Start example | Root-level consumer — correct path already |

---

## No Analog Found

Not applicable. Both modified files are agent definitions with no new role or data flow introduced. All changes are text substitution within existing instruction blocks. The correct path pattern already exists in the same file (`design-kit-packager.md` line 349) and serves as the analog.

---

## Metadata

**Analog search scope:** `.claude/agents/` (all 16 agent definition files)
**Files scanned:** 2 target files + grep across all agent files for `href="../tokens/` pattern
**Files with bugs confirmed:** 2 (design-kit-foundation.md, design-kit-packager.md)
**Total buggy occurrences:** 4 link tag lines + 1 Quality Bar assertion + 1 prose rationale in Task 2 + 1 prose rationale in Task 3 heading = 7 text locations across 2 files
**Pattern extraction date:** 2026-04-21
