# Phase 10: Output Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 10-output-foundation
**Areas discussed:** Token generation, Output path migration, Dual specimen strategy, Voice-fingerprint fix

---

## Token Generation

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 10 extraction step | New standalone step reads visual-direction.md and writes 5 token files to design-kit/tokens/. Assembler keeps its inline DTCG block for client specimens. | ✓ |
| Extend Document Assembler | Add token file writing to the Document Assembler's existing Phase 7 flow. Simpler but mixes concerns and writes before directory structure exists. | |

**User's choice:** Phase 10 extraction step (Recommended)
**Notes:** Phase 12 deferral ruled out because FOUN-02 requires token files to exist before design-kit specimens can link to them. Document Assembler extension ruled out to avoid mixing developer artifacts with client artifacts.

---

## Output Path Migration

| Option | Description | Selected |
|--------|-------------|----------|
| All paths in Phase 10 | Update all 7+ files (Document Assembler, Brand Verifier, export skill, 5 frontend files) in one atomic pass. Frontend gets new glob patterns for client/, skill-bundle/, design-kit/ subdirectories. | ✓ |
| Split across phases | Agent/skill paths in Phase 10, React frontend deferred to Phase 13. Means 3 phases where new output files are invisible in the viewer. | |

**User's choice:** All paths in Phase 10 (Recommended)
**Notes:** import.meta.glob constraint was the deciding factor — static string patterns mean frontend must update before it can see any Phase 11/12 output. FOUN-04 already owns all path references.

---

## Dual Specimen Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Post-process: same structure | Design-kit specimens are clones of client specimens with inline tokens swapped for external links. One generation pass + thin transformation. Lower maintenance. | ✓ |
| Separate generation: will diverge | Design-kit specimens will grow into richer documents with designer notes, annotation layers, component states. Phase 12's packager owns them entirely. More flexibility, more duplication. | |

**User's choice:** Post-process: same structure (Recommended)
**Notes:** Option B (conditional logic inside Document Assembler) was also ruled out — it entangles two concerns in an already complex agent. Design-kit specimens will stay structurally identical to client specimens, differing only in token delivery.

---

## Voice-Fingerprint Fix

| Option | Description | Selected |
|--------|-------------|----------|
| Active weave | Explicit input + template slots for quantitative markers, codify/retire language, and calibration table. Voice guide becomes evidence-based, not just aspirational. | ✓ |
| Passive listing only | Add to input list, no template changes. Closes the backlog item technically but output quality unchanged. | |

**User's choice:** Active weave (Recommended)
**Notes:** Active weave adds Quantitative Markers section, Calibration Table, and replaces generic Language Bank phrasing with fingerprint's Codify/Retire classification. When discovery intent conflicts with fingerprint evidence, assembler surfaces the gap explicitly.

---

## Claude's Discretion

- Token extraction step implementation form (agent, script, or skill)
- CSS selector/regex strategy for :root block extraction
- Frontend empty-state UI for empty bundles
- Ordering of glob calls in content-loader.ts

## Deferred Ideas

None — discussion stayed within phase scope.
