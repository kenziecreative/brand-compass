# Roadmap: Brand Compass

## Overview

v1.0 implements 24 prioritized recommendations from the feature research audit, organized into 4 dependency-aware waves, plus 13 quick wins and uncommitted local changes. Phase 1 establishes a clean baseline and lands all quick-win file edits. Phases 2-4 execute the waves in dependency order — discovery pipeline first (Wave 1), then output quality (Wave 2), then deliverable expansions (Wave 3), then process refinements (Wave 4). Phase 6 adds forward-looking outputs that depend on no other wave. The result is a materially more specific, rigorous, and complete brand development system.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Baseline + Quick Wins** - Commit existing local changes, then apply all 13 quick-win file edits (discovery questions, agent triggers, checkpoint additions) (completed 2026-03-27)
- [x] **Phase 2: Discovery Pipeline Reframe** - Structural changes that make competitive analysis required and reframe Phase 3 positioning from fill-in-the-blank to component-by-component exploration (completed 2026-03-27)
- [ ] **Phase 3: Output Quality** - Anti-sycophancy mechanisms, customer-hero story, accessibility as design input, voice compliance check
- [ ] **Phase 4: Deliverable Expansions** - Motion direction, Brand Compass Card, activation layer, semantic tokens, content pillars, do/don't examples, plus deliverable quick wins
- [ ] **Phase 5: Process Refinements** - Brand architecture conditional, client dynamic state, anti-anchoring, verbal-to-visual mappings, stakeholder mapping, core+flex
- [ ] **Phase 6: Forward-Looking Additions** - GEO-ready outputs and graphic device direction

## Phase Details

### Phase 1: Baseline + Quick Wins
**Goal**: Establish a clean, committed baseline from existing local changes, then land all 13 quick-win file edits — adding discovery questions, changing agent triggers, and strengthening checkpoint protocols
**Depends on**: Nothing (first phase)
**Requirements**: BASE-01, DSCV-01, DSCV-02, DSCV-03, DSCV-04, DSCV-05, DSCV-06, DSCV-07, AGNT-01, AGNT-02, AGNT-03
**Success Criteria** (what must be TRUE):
  1. All uncommitted local changes (Phase 1 values/mission/vision, Phase 3 service definition, checkpoint-a, brand-verifier, document-assembler, STATE-template, example-brand outputs) are committed to git as a clean baseline
  2. CLAUDE.md Phase 2 or Phase 3 section contains "What would your customers use or do if you didn't exist?" and Market of One includes push/habit force and anxiety force questions
  3. CLAUDE.md Phase 0 onboarding section includes brand history question, named competitors field (3-4 with URLs), and perception gap question; STATE.md template has the competitors field
  4. CLAUDE.md Phase 3 includes outside-in category question and Phase 7 includes 2-3 accessibility discovery questions before the color/typography discussion
  5. CLAUDE.md Research Analyst trigger is changed to required (launches between Phase 2 and Phase 3); Checkpoint A and Checkpoint B sections include a structural challenge requirement; Phase 5 includes a devil's advocate pass requirement before messaging is finalized
**Plans:** 3/3 plans complete
Plans:
- [ ] 01-01-PLAN.md — Commit baseline (tracked changes + research archive + force-push)
- [ ] 01-02-PLAN.md — CLAUDE.md quick wins (discovery questions, agent trigger, devil's advocate)
- [ ] 01-03-PLAN.md — Onboarding + checkpoint quick wins (start.md, checkpoints, STATE template)

### Phase 2: Discovery Pipeline Reframe
**Goal**: Make competitive analysis structurally required before Phase 3, expand Phase 0 onboarding with systematic pre-seeding questions, and reframe Phase 3 positioning from a fill-in-the-blank exercise to a component-by-component exploration sequence
**Depends on**: Phase 1
**Requirements**: PIPE-01, PIPE-02, PIPE-03
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md agent table lists Research Analyst as Required (not Optional), and the Phase 2/3 transition section specifies that the Research Analyst must complete before Phase 3 begins
  2. CLAUDE.md Phase 0 section contains four expanded onboarding questions: brand history, named competitors (3-4 with URLs), perception gap, and visual preference pre-seeding
  3. CLAUDE.md Phase 3 positioning section uses a component-by-component discovery sequence — competitive alternatives, unique attributes, value, target, category, synthesis — rather than a single fill-in-the-blank positioning statement prompt
**Plans:** 2/2 plans complete
Plans:
- [ ] 02-01-PLAN.md — Verify PIPE-01 closure + visual pre-seeding in onboarding and Phase 7
- [ ] 02-02-PLAN.md — Positioning reframe (component exploration) + Research Analyst structured output

### Phase 3: Output Quality
**Goal**: Improve the quality and specificity of what the system already produces — add a customer-hero story framework, integrate accessibility as a design constraint, install structural anti-sycophancy mechanisms, and add voice compliance verification
**Depends on**: Phase 2
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md Phase 5 and/or Phase 8 section includes a customer-hero story framework with the client positioned as guide and the customer as protagonist
  2. CLAUDE.md Phase 7 section feeds accessibility discovery answers to the Visual Director as constraints, and the Visual Identity System HTML template includes an approved accessible color combinations section
  3. CLAUDE.md contains structural anti-sycophancy mechanisms: a checkpoint challenge protocol requiring the facilitator to identify and challenge the weakest strategic element, a pushback audit trigger, and a brand stress test reference in Phase 8
  4. The Brand Verifier agent definition includes a voice compliance check that compares generated output against the captured voice fingerprint and flags divergence
**Plans**: TBD

### Phase 4: Deliverable Expansions
**Goal**: Add new deliverable sections and outputs — motion direction, Brand Compass Card, activation layer, semantic tokens, content pillars, do/dont examples, accessible color combinations, strategic quick reference card, and brand stress test
**Depends on**: Phase 3
**Requirements**: DLVR-01, DLVR-02, DLVR-03, DLVR-04, DLVR-05, DLVR-06, DLVR-07, DLVR-08, DLVR-09
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md Phase 7 section includes motion direction discovery questions, and the Visual Identity System HTML template has a motion direction section (principles, timing, easing, reduced motion guidance)
  2. CLAUDE.md Phase 8 section includes the Brand Compass Card as a named deliverable, and the Document Assembler agent template includes a 9-element Brand Compass Card section based on the Unilever Brand Key model
  3. CLAUDE.md Phase 8 section includes a brand activation layer deliverable — 30-day timeline, implementation priority list, self-audit checklist, and internal brief for org entity types
  4. The Visual Identity System HTML template includes a semantic design token section with purpose-based naming and a DTCG-format JSON export block
  5. CLAUDE.md Phase 8 Content Territories section is expanded with 3-5 content pillars, and the Voice Guide HTML template includes a channel-voice matrix; HTML specimens across color, imagery, and voice sections contain systematic do/dont examples with rationale; Phase 8 includes a strategic quick reference card distinct from the implementation card; Phase 8 includes a brand stress test section applying the decision filter to 3 boundary-case scenarios
**Plans**: TBD

### Phase 5: Process Refinements
**Goal**: Refine existing processes with conditional logic and codified mappings — brand architecture for multi-offer clients, client dynamic state tracking, anti-anchoring across discovery questions, verbal-to-visual translation reference, stakeholder mapping for orgs, and core+flex thinking in Phase 7
**Depends on**: Phase 4
**Requirements**: PROC-01, PROC-02, PROC-03, PROC-04, PROC-05, PROC-06
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md contains a brand architecture conditional — when a client mentions multiple offerings, the facilitator surfaces a brand architecture question; STATE.md template has a field for brand architecture decision
  2. STATE.md template includes a client dynamic section: interaction style, pushback calibration level, emotional moments log, and voice notes
  3. Discovery questions across Phases 1-4 in CLAUDE.md are audited and updated to use open-ended framing before structured framing, remove leading number specifications, and offer multiple frames rather than single prompts
  4. A reference file exists at a documented path containing verbal-to-visual translation mappings — archetype to visual properties, voice register to visual register, personality trait to color family; CLAUDE.md Phase 7 references this file
  5. CLAUDE.md Phase 2 contains a stakeholder mapping question conditional on org entity types; CLAUDE.md Phase 7 includes core+flex framing — fixed vs. flexible brand elements — and an AI-generation rules section
**Plans**: TBD

### Phase 6: Forward-Looking Additions
**Goal**: Add GEO-ready brand outputs for AI search visibility and graphic device direction to the visual system, both of which extend existing deliverables without depending on Wave 4 changes
**Depends on**: Phase 5
**Requirements**: FUTR-01, FUTR-02
**Success Criteria** (what must be TRUE):
  1. CLAUDE.md Phase 8 toolkit section includes a GEO-ready outputs deliverable — entity consistency guide, citation-optimized brand statements, and platform distribution guidance; Document Assembler agent template includes this section
  2. CLAUDE.md Phase 7 section includes graphic device discovery questions; Visual Director agent definition includes pattern direction output; Image Generator is directed to produce 1-3 brand patterns; Visual Identity System HTML template includes a graphic devices section
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Baseline + Quick Wins | 3/3 | Complete   | 2026-03-27 |
| 2. Discovery Pipeline Reframe | 2/2 | Complete   | 2026-03-27 |
| 3. Output Quality | 0/TBD | Not started | - |
| 4. Deliverable Expansions | 0/TBD | Not started | - |
| 5. Process Refinements | 0/TBD | Not started | - |
| 6. Forward-Looking Additions | 0/TBD | Not started | - |
