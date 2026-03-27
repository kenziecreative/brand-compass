# Audit Report: Phase 2 Methodology Benchmarking Draft
**File audited:** `research/drafts/02-methodology-benchmarking.md`
**Audit date:** 2026-03-26
**Auditor:** Research Integrity Agent
**Source notes checked:** 02-storybrand-sb7.md, 02-brand-gap-neumeier.md, 02-gv-brand-sprint.md, 02-jtbd-framework.md, 02-category-design-play-bigger.md, 02-golden-circle-sinek.md, 01-system-inventory.md (output), canonical-figures.json, cross-reference.md

---

## Issues Found

### CONFIDENCE INFLATED

**Issue 1 — Line 37**

The draft states: "Confirmed by multiple sources — GV Sprint also includes competitive landscape validation."

This claim appears in the Brand Gap section, supporting the finding that validation is absent from Brand Compass. The two sources cited are Brand Gap (Neumeier) and GV Sprint. That is two sources.

The standard requires 3+ sources for "confirmed by multiple sources" language. Two sources requires "supported by limited evidence."

Additionally, this phrasing mischaracterizes what the GV Sprint source actually supports. The GV Sprint competitive landscape exercise (plotting your brand on a 2x2 matrix against competitors) is a positioning alignment exercise, not a validation mechanism. The source note (`research/notes/02-gv-brand-sprint.md`) describes it as "Relative competitive positioning as spatial relationship" — it checks how your positioning compares to competitors, not whether brand outputs resonate with an audience. Neumeier's Validate discipline (Swap Test, Hand Test, Field Test) tests audience perception. These are different activities. The citation stretches what GV Sprint supports beyond what the source actually says.

What needs to change: Replace "Confirmed by multiple sources" with "supported by limited evidence." Revise the GV Sprint citation to be accurate — it supports the absence of structured competitive mapping as a gap, not the absence of audience perception testing.

---

**Issue 2 — Line 159**

The draft states: "Confirmed by multiple sources (Brand Gap, GV Sprint). Brand Compass builds and delivers but never tests whether outputs resonate with the audience."

This is again two sources cited for a "confirmed by multiple sources" claim. The cross-reference Pattern 3 (`research/cross-reference.md`) also lists only Brand Gap and GV Sprint as supporting sources for the validation/testing gap.

The same mischaracterization noted in Issue 1 applies here. GV Sprint's competitive landscape does not test whether brand outputs resonate with an audience — it is a competitive positioning map. The source note does not describe the GV Sprint as containing a validation mechanism in the sense Neumeier uses.

What needs to change: Replace "Confirmed by multiple sources" with "Supported by limited evidence." If the intent is to claim both sources support validation testing, that claim needs revision because GV Sprint does not support it in the way stated.

---

### QUALIFIER STRIPPED

**Issue 3 — Line 53**

The draft states: "It explicitly positions itself as 'not a replacement for a good branding agency.'"

The source note (`research/notes/02-gv-brand-sprint.md`, line 15) reads: "It explicitly positions itself as 'not a replacement for a good branding agency, but much better than nothing.'"

The trailing phrase "but much better than nothing" was dropped without an ellipsis. That phrase modifies the meaning of the original — the full quote is self-deprecating but also affirmative. The truncated version sounds purely diminutive. The source's actual tone is balanced.

What needs to change: Either use the full quote or add an ellipsis: "not a replacement for a good branding agency..."

---

### CROSS-PHASE DRIFT

No cross-phase drift found. The three canonical figures cited in the Assessment Summary (line 185) — phase-count = 9, discovery-question-total = 122, agent-count = 13 — all match `research/reference/canonical-figures.json` exactly.

---

### FABRICATED DATA

No fabricated data found. All specific numbers in the draft trace to source notes:
- 76% Category King market cap — `research/notes/02-category-design-play-bigger.md`, line 13
- "3-hour" GV Sprint — `research/notes/02-gv-brand-sprint.md`, line 13
- "2-6 participants" GV Sprint — `research/notes/02-gv-brand-sprint.md`, line 65
- "60M+ views" Sinek TED talk — `research/notes/02-golden-circle-sinek.md`, line 13

---

### RANGE NARROWING

No range narrowing found.

---

### INTERNAL INCONSISTENCY

No internal inconsistencies found. The validation gap finding is described consistently across sections as absent from Brand Compass, and the triangulation language (where correctly applied) is consistent with source counts.

---

### UNSOURCED CLAIMS

No unsourced factual claims found. All factual assertions carry inline source citations. Analytical claims and characterizations (e.g., "this is the most structurally significant finding") are clearly opinion or synthesis and do not require citation.

---

## Summary

Three issues require correction before this draft can be promoted to `research/outputs/`.

| # | Check Type | Line | Severity | Fix Required |
|---|-----------|------|----------|--------------|
| 1 | CONFIDENCE INFLATED | 37 | Medium | Replace "confirmed by multiple sources" with "supported by limited evidence"; correct the GV Sprint citation |
| 2 | CONFIDENCE INFLATED | 159 | Medium | Replace "confirmed by multiple sources" with "supported by limited evidence"; correct the GV Sprint citation |
| 3 | QUALIFIER STRIPPED | 53 | Low | Restore the full quote or add ellipsis |

Issues 1 and 2 are related — they stem from the same root error: the GV Sprint competitive landscape exercise is being cited as evidence for "validation" testing, which it does not support. Fixing the framing at the source (the Brand Gap section, line 37) will inform the correction at line 159.

The cross-phase numbers are clean. The source coverage is thorough. Once these three issues are corrected, the draft is ready for promotion.
