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

## Milestone: v2.0 — Multi-Bundle Output

**Shipped:** 2026-04-21
**Phases:** 5 | **Plans:** 8 | **Commits:** 88
**Timeline:** 24 days (2026-03-28 → 2026-04-21)

### What Was Built
- Three-bundle output model: client package (markdown + HTML specimens), agent skill bundle (SKILL.md, brand-prompt.md, source files), design kit (tokens, components, previews, landing page)
- Four new agents: design-kit-foundation, design-kit-packager, skill-bundle-packager, plus enhanced Document Assembler with voice-fingerprint integration
- Token externalization pipeline: colors, typography, spacing as CSS/JSON DTCG/Tailwind config — single source of truth for design-kit specimens
- Full system integration: Phase 8 orchestration chain, export command, Brand Verifier (Levels 7+8), CLAUDE.md, React frontend all updated
- Phase transition context management: structured handoff blocks and /clear nudges across all 10 phase/checkpoint skill files
- README expanded with six new sections (Why I Built This, Who This Is For, v2.0 Highlights, Specialist Agents, Quality Features, Output Bundles)

### What Worked
- **Sequential dependency structure** — Foundation (10) → Skill Bundle (11) + Design Kit (12) → Integration (13) prevented cross-phase conflicts; Phases 11 and 12 could share Phase 10's output surface cleanly
- **Milestone audit between execution and close** — caught the token path defect (root-level files using `../tokens/` instead of `tokens/`), which became Phase 14; would have shipped broken without the audit
- **Agent definition pattern reuse** — skill-bundle-packager and design-kit-packager followed design-kit-foundation's structural pattern (frontmatter, identity, input, pre-flight, tasks, output, quality bar), reducing design decisions to near zero
- **PRD-to-requirements pipeline** — Claude Webb's PRD was reviewed, adjusted (8 items), and converted to REQUIREMENTS.md cleanly; the adjustments were tracked and none created downstream issues
- **Concentrated execution** — 5 phases executed across 2 active days (2026-04-20 and 2026-04-21)

### What Was Inefficient
- **Design Kit card UI coverage gap** — OutputPage.tsx deliverables array lists only 3 of 23 design-kit files; the remaining 20 are accessible but not surfaced in the dashboard panel. Caught by audit but shipped as tech debt
- **Summary-extract CLI fragility** — the `summary-extract` tool couldn't parse most v2.0 SUMMARY.md one-liners cleanly, producing garbled accomplishments for MILESTONES.md that required manual correction
- **Nyquist validation still skipped** — 4/5 phases have draft VALIDATION.md with `nyquist_compliant: false`; same root cause as v1.0 (agent definitions can't be unit-tested without real engagements)
- **REQUIREMENTS.md checkboxes never updated** — all 20 requirements were satisfied but traceability table still showed `[ ]` (unchecked); caught by audit

### Patterns Established
- **Agent chain with failure isolation:** Phase 8 runs Document Assembler → skill-bundle-packager → design-kit-foundation → design-kit-packager → Brand Verifier sequentially, so a failure at any step doesn't corrupt subsequent outputs
- **Self-contained vs. external token duality:** Client specimens inline all styles; design-kit specimens link shared token files — determined by which agent generates the HTML
- **Translation Rule discipline:** When extracting voice/brand data into agent-consumable formats, archetype names and abstract concepts must be translated into behavioral instructions with explicit BAD/GOOD worked examples
- **Conditional verifier levels:** Brand Verifier Levels 7-8 skip gracefully when bundles are absent (info message, not failure) — matches Level 6 voice-compliance skip pattern

### Key Lessons
1. **Milestone audit pays for itself.** v2.0 audit caught the token path defect that would have broken all root-level design-kit specimens in the browser. The Phase 14 fix took 2 minutes; debugging it post-ship would have taken far longer.
2. **Agent definitions are the hardest thing to test.** Both milestones deferred Nyquist validation for the same reason — agent behavior can't be verified without running a full engagement. A lightweight smoke test framework would help.
3. **Dashboard UI lags behind system capabilities.** The React frontend consistently trails the agent/skill system. Design Kit has 23 files but the dashboard shows 3. Consider treating dashboard updates as a separate verification step rather than bundling them into integration phases.
4. **README is a deliverable, not an afterthought.** Adding it at milestone close worked but should be planned as a phase task next time, so the content is reviewed alongside the code.

### Cost Observations
- Model mix: Primarily opus for planning and execution, sonnet for research/exploration agents and new agent definitions
- Sessions: ~6 across milestone
- Notable: All 5 phases executed across 2 concentrated sessions; planning and requirements consumed the bulk of the 24-day timeline

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Key Change |
|-----------|---------|--------|------------|
| v1.0 | 131 | 9 | Established entity-type conditionals, constraint chain pattern, command-CLAUDE.md parity |
| v2.0 | 88 | 5 | Three-bundle output model, agent chain orchestration, translation rule discipline |

### Cumulative Quality

| Milestone | Requirements | Coverage | Tech Debt |
|-----------|-------------|----------|-----------|
| v1.0 | 35/35 | 100% | 8 items (no blockers) |
| v2.0 | 20/20 | 100% | 6 items (no blockers) |

### Recurring Themes

- **Milestone audit consistently catches real gaps.** v1.0: command-file sync gaps (3 phases to fix). v2.0: token path defect (1 phase to fix). Trend is improving — smaller gaps, faster fixes.
- **Nyquist validation still unresolved.** Both milestones deferred it for the same reason. If this recurs in v3.0, it needs a structural solution (smoke test framework) rather than continued deferral.
- **Dashboard UI trails system capabilities.** v1.0 didn't surface this. v2.0 shipped with 20 design-kit files invisible in the dashboard. The pattern suggests frontend should be its own verification dimension.
