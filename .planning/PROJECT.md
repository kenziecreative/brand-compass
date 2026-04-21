# Brand Compass

## What This Is

Brand Compass is a guided brand development system that runs inside Claude Code. A Lead Brand Strategist walks clients through 8 phases of discovery — asking questions, pushing back on surface-level answers, and delegating specialized work to background agents. It produces a complete brand system across three output bundles: a client package (foundation, voice guide, visual identity, and practical toolkit as markdown and HTML specimens), an agent skill bundle for Claude Code/Cowork, and a design kit with externalized tokens and atomized components for developers and designers.

## Core Value

The discovery conversation must produce brand outputs that are specific to the client — not generic templates reskinned with their colors. Every deliverable should reflect genuine client voice, real positioning, and strategic decisions made through pushback, not compliance.

## Requirements

### Validated

- Core 8-phase discovery pipeline (Phases 0-8)
- 12 specialist agents (Research Analyst, Content Auditor, Archetype Analyst, Copywriter, Voice Analyzer, Visual Director, Image Generator, Document Assembler, Brand Verifier, plus layout agents)
- State management via STATE.md with session persistence
- React dashboard for viewing phase content and deliverables
- 8 core deliverables (3 markdown + 5 HTML specimens)
- Asset pack system (8 modular add-ons)
- Strategic pushback framework in CLAUDE.md
- Voice capture (early fingerprint + late codification)
- Checkpoint gates (A after Phase 3, B after Phase 6)
- Business/org conditional outputs for Phase 1 (values, mission/vision) and Phase 3 (service definition) — v1.0
- Research Analyst as required hard gate between Phase 2 and Phase 3 — v1.0
- Component-by-component Phase 3 positioning (April Dunford methodology) — v1.0
- Anti-sycophancy mechanisms (pushback audit, checkpoint challenges, devil's advocate, brand stress test) — v1.0
- Customer-hero story framework (StoryBrand 5-beat) in Phase 5 — v1.0
- Accessibility as hard design constraint (WCAG AA/AAA chain) — v1.0
- Voice compliance verification in Brand Verifier — v1.0
- Motion direction pipeline (Phase 7 → Visual Director → HTML specimens) — v1.0
- Brand Compass Card (9-element strategic synthesis) — v1.0
- Activation layer with entity-type conditionals — v1.0
- Semantic design tokens with DTCG JSON export — v1.0
- Content pillars and channel-voice matrix — v1.0
- GEO-ready brand outputs (entity consistency, citation-optimized statements) — v1.0
- Graphic device pipeline (conditional on brand fit) — v1.0
- Client dynamic state tracking (pushback calibration, voice notes) — v1.0
- Brand architecture conditional for multi-offer clients — v1.0
- Verbal-to-visual translation mappings reference — v1.0
- Core+flex element classification and AI-generation rules — v1.0
- Anti-anchoring across all discovery questions — v1.0
- Stakeholder mapping for org entity types — v1.0
- Full command-CLAUDE.md parity across all 7 discovery command files — v1.0
- Three-bundle output model: client package, agent skill bundle, design kit — v2.0
- Token externalization as single source of truth for design-kit consumers — v2.0
- Skill bundle for Claude Code/Cowork agent surfaces — v2.0
- Design kit shaped for Claude Design org onboarding — v2.0
- Client specimens remain self-contained (no external token dependency) — v2.0
- Document Assembler voice-fingerprint.md input fix (from backlog) — v2.0
- Output directory restructured into client/, skill-bundle/, design-kit/ subfolders — v2.0
- Two new packager agents (skill-bundle-packager, design-kit-packager) — v2.0
- Updated export, verifier, Phase 8 orchestration, and CLAUDE.md for three-bundle model — v2.0
- Frontend dashboard updated for new output paths — v2.0
- React frontend functional bundle cards (skill-bundle + design-kit) — v2.0
- Phase transition handoff blocks across all skill files — v2.0

### Active

(None yet — define next milestone to populate)

### Out of Scope

- Full design system methodology — component-level tokens are design system work, not brand work (research: Pattern 23)
- Full content strategy — editorial calendars, SEO workflows, production processes (research: Pattern 18)
- Enterprise governance — full compliance infrastructure for large brand teams (research: Pattern 19)
- Sonic identity — relevant only for subset of clients, not universal (research: Pattern 34)
- Full JTBD switch interviews — research technique, not brand discovery framework (research: Pattern 2)
- Custom iconography systems — enterprise-tier only (research: Pattern 21)
- Light/dark token pairs — unless Phase 7 visual direction explicitly specifies dark mode
- Figma plugin — DTCG tokens.json enables passive interop; active plugin is a separate project
- Motion library in code form — motion captured as principles + timings, not keyframe library
- Per-project brand prompt beyond skill bundle — skill-bundle/brand-prompt.md covers this use case
- Framework-specific components — HTML and CSS only; framework adapters are future scope
- Changes to discovery phases 0-7 — discovery is conversational and sequential; v2.0 was output-layer only

## Context

Shipped v2.0 with 91 files changed (+13,997 / -994 lines) across 88 commits in 24 days.
Total codebase: ~30,000 LOC across ~200 files (68 markdown, 40 TypeScript/React, plus agent definitions and skill files).
Tech stack: React + TypeScript + Vite + Tailwind CSS v4 (dashboard viewer), Claude Code terminal (primary interface).
The actual brand development happens via slash commands and agent conversations — the React app is a viewer, not the primary interface.
v1.0 implemented 24 prioritized recommendations from feature research in 9 phases (20 plans, 131 commits, 45 days).
v2.0 added three-bundle output model (client package, agent skill bundle, design kit) in 5 phases (8 plans, 88 commits, 24 days).
Output now feeds Claude Code/Cowork (via skill bundle) and developers/designers (via design kit) directly, in addition to the human client package.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use research 4-wave sequence as phase structure | Waves encode dependencies; Wave 1 changes discovery pipeline Wave 2 builds on | ✓ Good — dependency order prevented rework |
| Bundle quick wins into early phases | They're all file edits; spreading across milestone adds overhead | ✓ Good — Phase 1 landed 13 edits cleanly |
| Defer Tier 3.1, 3.9, 3.10 to future milestone | Significant scope; evaluate after Tier 1/2 prove out | ✓ Good — v1.0 stayed focused |
| Commit existing local changes first | Clean baseline before new work begins | ✓ Good — git history clean |
| Research Analyst as required hard gate | Prevents generic positioning without competitive context | ✓ Good — Phase 3 always has competitive input |
| Component-by-component positioning (April Dunford) | Fill-in-the-blank produced generic statements | ✓ Good — exploration before synthesis |
| Accessibility as hard constraint (not preference) | WCAG AA universal floor prevents accessibility as afterthought | ✓ Good — constraint chain flows to Visual Director |
| Voice compliance advisory not blocking | Automated voice matching is imperfect; human judgment needed | ✓ Good — flags without false-positive blocking |
| Activation layer "no fixed timeline" vs "30-day" | Clients work at their own pace; arbitrary timelines create pressure without value | ⚠️ Revisit — evaluate with real engagements |
| Pushback calibration three-path (high/low/unknown) | Different clients need different challenge intensity | — Pending — needs engagement testing |
| Client specimens self-contained, design-kit links external tokens | Client HTML must render standalone; design-kit benefits from shared token source of truth | ✓ Good — clean separation of concerns |
| ui-kit.html stays standalone (no assembly relationship with atomized components) | ui-kit.html is a specimen; atomized components are implementation reference — different purposes | ✓ Good — avoided confusing relationship |
| Sequential agent chain in Phase 8 (DA → skill-bundle → dk-foundation → dk-packager) | Each step depends on the previous; parallel would cause race conditions | ✓ Good — failure isolation per step |
| Both new agents use sonnet model with Read/Write/Glob/Grep only | Agent definitions don't need heavy reasoning; limited tools prevent unintended side effects | ✓ Good — fast and constrained |
| PPTX generation deferred to future milestone | pptxgenjs integration is significant scope; not core to three-bundle model | ✓ Good — kept v2.0 focused |
| Voice-fingerprint backlog fix bundled into Foundation phase | Small fix, natural fit with Document Assembler path migration work | ✓ Good — fixed without overhead |

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Expanded Output | PPTX brand deck (EXPD-01) | Future milestone | v2.0 planning |
| Expanded Output | Automated publishing to live URL (EXPD-02) | Future milestone | v2.0 planning |
| Expanded Output | Framework-specific component adapters (EXPD-03) | Future milestone | v2.0 planning |
| Brand Evolution | Post-engagement brand query mode (EVOL-01) | Future milestone | v2.0 planning |
| Brand Evolution | Lightweight brand measurement card (EVOL-02) | Future milestone | v2.0 planning |
| Brand Evolution | Differentiated personal brand track (EVOL-03) | Future milestone | v2.0 planning |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-21 after v2.0 milestone completion*
