# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — Feature Research Implementation

**Shipped:** 2026-03-28
**Phases:** 9 | **Plans:** 20 | **Commits:** 131
**Timeline:** 45 days (2026-02-11 → 2026-03-28)

### What Was Built
- Hardened discovery pipeline with required competitive analysis gate and component-by-component positioning (April Dunford methodology)
- Anti-sycophancy framework: pushback audit in all 6 discovery phases, structured checkpoint challenges, devil's advocate pass, brand stress test
- Customer-hero story framework, voice compliance verification, accessibility as hard design constraint chain
- Expanded deliverable system: motion direction, Brand Compass Card, activation layer, semantic tokens (DTCG), GEO-ready outputs, graphic devices
- Process intelligence: client dynamic state, pushback calibration, brand architecture conditional, verbal-to-visual mappings, core+flex classification
- Full command-CLAUDE.md parity across all 7 discovery command files

### What Worked
- **4-wave dependency structure as phase order** — research-derived wave sequence prevented rework; each wave built cleanly on the previous
- **Quick wins bundled in Phase 1** — 13 file edits landed in one phase instead of spreading across the milestone, keeping focus clean
- **Milestone audit as quality gate** — the audit between Phase 6 and completion caught command-file sync gaps that would have shipped as hidden inconsistencies; Phases 7-9 closed all gaps
- **Entity-type conditional pattern** — established in Phase 1 (mission/vision), reused consistently in Phases 2, 3, 5, 7, 8 without debate
- **Execution speed** — 20 plans across 9 phases completed in ~2 active days of execution (2026-03-27 and 2026-03-28)

### What Was Inefficient
- **Command-file sync discovered late** — CLAUDE.md was updated across Phases 1-6 but command files weren't checked for parity until the milestone audit; 3 phases (7-9) were created purely to close sync gaps that should have been caught incrementally
- **SUMMARY.md bookkeeping gaps** — 6 summaries listed requirements in `provides` but not `requirements-completed`; the audit caught this but it's avoidable metadata discipline
- **Nyquist validation never ran** — all 9 phases lack VALIDATION.md; the testing framework was skipped entirely because changes are CLAUDE.md/agent definition edits that can only be tested via real engagements

### Patterns Established
- **Entity-type conditional gate:** `*(Ask these only if entity type is business/org. Skip for solo creators/personal brands.)*` — consistent across all phase commands
- **Constraint chain pattern:** Discovery answer → STATE.md field → Agent hard constraint → Output section (used for accessibility, visual adjectives, competitors, pushback calibration)
- **Command-CLAUDE.md parity:** Command files must exactly mirror CLAUDE.md discovery questions in numbering, wording, and grouping
- **Pushback Audit:** Silent self-check before every phase closing, reading calibration from STATE.md Client Dynamic

### Key Lessons
1. **Sync command files incrementally, not as a batch.** When CLAUDE.md changes, update the corresponding command file in the same plan. The "sync later" approach created 3 catch-up phases.
2. **The milestone audit is genuinely valuable.** It caught real integration gaps that weren't visible from individual phase summaries. Keep running it.
3. **Anti-anchoring matters for discovery questions.** Removing count anchors ("4-6 traits" → open-ended) is a small edit with large impact on conversation quality.
4. **Design decisions should be documented at decision time.** The DLVR-03 "30-day → no fixed timeline" change was a conscious design decision but only documented in a context file — it showed up as a potential gap in every subsequent audit.

### Cost Observations
- Model mix: Primarily opus for planning and execution, sonnet for research/exploration agents
- Sessions: ~8-10 across milestone
- Notable: Phases 1-6 (core work) completed in one extended session; Phases 7-9 (sync/gap closure) completed in another

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Key Change |
|-----------|---------|--------|------------|
| v1.0 | 131 | 9 | Established entity-type conditionals, constraint chain pattern, command-CLAUDE.md parity |

### Cumulative Quality

| Milestone | Requirements | Coverage | Tech Debt |
|-----------|-------------|----------|-----------|
| v1.0 | 35/35 | 100% | 8 items (no blockers) |
