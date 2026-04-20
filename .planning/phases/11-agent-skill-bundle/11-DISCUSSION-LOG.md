# Phase 11: Agent Skill Bundle - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-20
**Phase:** 11-agent-skill-bundle
**Areas discussed:** SKILL.md content design, brand-prompt.md synthesis, Source file extraction logic, Agent input mapping

---

## SKILL.md Content Design

| Option | Description | Selected |
|--------|-------------|----------|
| Thorough (200+ lines) | All five sections fully specified with enforceable rules and examples. The consuming agent only has this file — make it complete. Packager translates discovery language into behavioral instructions. | ✓ |
| Concise (60-100 lines) | Distilled reference card. Rules without rationale, minimal examples. Lower token cost but risks off-brand output in edge cases. | |

**User's choice:** Thorough (Recommended)
**Notes:** Key constraint identified: the "Translation Rule" — packager must convert discovery-phase language into behavioral instructions a stranger-agent can act on without Brand Compass context.

---

## brand-prompt.md Synthesis

| Option | Description | Selected |
|--------|-------------|----------|
| Voice-first | Opens with archetype identity and voice character, embeds positioning as context the persona holds. Produces the most distinctively on-brand writing. Priority: voice → positioning → 1-2 signature moves → one guardrail. | ✓ |
| Positioning-first | Opens with positioning statement and territory, then layers in voice. Reads more like a brief than a persona. Better for brands where accuracy matters more than distinctiveness. | |

**User's choice:** Voice-first (Recommended)
**Notes:** Element priority order established: (1) voice + archetype, (2) positioning + territory, (3) 1-2 personality traits/signature moves, (4) one hard "never do" guardrail.

---

## Source File Extraction Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Direct copy + merge | Lift sections verbatim from voice-guide.md and practical-toolkit.md. No rewriting. One exception: language-bank.md merges two overlapping sources into one deduplicated file. Zero interpretation risk. | ✓ |
| Restructured extraction | Strip client-facing framing, rename headers for agent semantics. Cleaner but introduces extraction logic, interpretation risk, and maintenance surface. | |

**User's choice:** Direct copy + merge (Recommended)
**Notes:** Specific extraction mapping defined: voice-rules.md ← Sections 3+4, guardrails.md ← Section 5 + calibration table, language-bank.md ← merged phrases-to-avoid + Codify/Retire.

---

## Agent Input Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| 3 + 1 conditional | Required: voice-guide.md, brand-foundation.md, STATE.md. Conditional: voice-fingerprint.md (read if exists, skip if not). Practical-toolkit.md read only for language-bank merge. Minimal token cost, full coverage. | ✓ |
| Full 5-file set | Always read voice-guide.md, brand-foundation.md, practical-toolkit.md, STATE.md, and voice-fingerprint.md. More redundancy but no conditional logic needed. | |

**User's choice:** 3 + 1 conditional (Recommended)
**Notes:** voice-fingerprint.md identified as highest-value enrichment — its voice profile summary one-liner significantly improves brand-prompt.md prose quality.

---

## Claude's Discretion

- Agent definition file structure and internal organization
- SKILL.md frontmatter field names and format
- Error handling when required input files are missing
- Internal section ordering within source/ files

## Deferred Ideas

None — discussion stayed within phase scope.
