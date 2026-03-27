# Brand Compass

## What This Is

Brand Compass is a guided brand development system that runs inside Claude Code. A Lead Brand Strategist walks clients through 8 phases of discovery — asking questions, pushing back on surface-level answers, and delegating specialized work to background agents. It produces a complete brand system: strategic foundation, voice guide, visual identity, and practical toolkit as both markdown and HTML specimens.

## Core Value

The discovery conversation must produce brand outputs that are specific to the client — not generic templates reskinned with their colors. Every deliverable should reflect genuine client voice, real positioning, and strategic decisions made through pushback, not compliance.

## Current Milestone: v1.0 — Feature Research Implementation

**Goal:** Implement the 24 prioritized recommendations from the feature research audit, organized into 4 dependency-aware waves, plus 13 quick wins and uncommitted local changes.

**Target features:**
- Wave 1: Discovery pipeline changes (competitive analysis required, onboarding expansion, Phase 3 positioning reframe)
- Wave 2: Output quality improvements (customer-hero story, accessibility, anti-sycophancy mechanisms, voice compliance)
- Wave 3: Deliverable expansions (motion direction, Brand Compass Card, activation layer, semantic tokens, content pillars, systematic do/don't)
- Wave 4: Process refinements (brand architecture, client dynamic state, anti-anchoring, visual translation codification, stakeholder mapping, core+flex)
- Quick wins: 13 file edits across CLAUDE.md, checkpoint commands, and templates
- Uncommitted local changes: business/org conditional outputs for Phase 1 & 3 (already done, need committing)

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- Core 8-phase discovery pipeline (Phases 0-8)
- 12 specialist agents (Research Analyst, Content Auditor, Archetype Analyst, Copywriter, Voice Analyzer, Visual Director, Image Generator, Document Assembler, Brand Verifier, plus layout agents)
- State management via STATE.md with session persistence
- React dashboard for viewing phase content and deliverables
- 8 core deliverables (3 markdown + 5 HTML specimens)
- Asset pack system (8 modular add-ons)
- Strategic pushback framework in CLAUDE.md
- Voice capture (early fingerprint + late codification)
- Checkpoint gates (A after Phase 3, B after Phase 6)
- Business/org conditional outputs for Phase 1 (values, mission/vision) and Phase 3 (service definition) — implemented but uncommitted

### Active

<!-- Current scope. Building toward these. -->

See REQUIREMENTS.md for detailed REQ-IDs.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Full design system methodology — component-level tokens are design system work, not brand work (research: Pattern 23)
- Full content strategy — editorial calendars, SEO workflows, production processes (research: Pattern 18)
- Enterprise governance — full compliance infrastructure for large brand teams (research: Pattern 19)
- Sonic identity — relevant only for subset of clients, not universal (research: Pattern 34)
- Full JTBD switch interviews — research technique, not brand discovery framework (research: Pattern 2)
- Custom iconography systems — enterprise-tier only, even Harvard uses Google Material Icons (research: Pattern 21)
- More differentiated personal brand track (Tier 3, recommendation 3.1) — significant structural change, evaluate after Tier 1/2 complete
- Post-engagement brand query mode (Tier 3, recommendation 3.9) — future architectural consideration
- Lightweight brand measurement card (Tier 3, recommendation 3.10) — future differentiator, not current priority

## Context

- Codebase is React + TypeScript + Vite + Tailwind CSS v4, serving as a dashboard for viewing brand engagement state and outputs
- The actual brand development happens in Claude Code terminal via slash commands and agent conversations — the React app is a viewer, not the primary interface
- Feature research produced 7 research phases, 35 sources, 37 cross-reference patterns, and 7 audit-verified output documents in `feature-support/research/`
- Research identified 24 recommendations in 3 tiers with a 4-wave implementation sequence encoding dependencies
- 13 quick wins are all file edits to CLAUDE.md, checkpoint commands, and templates
- Uncommitted local changes already implement business/org conditional outputs (values, mission/vision in Phase 1; service definition in Phase 3)
- Remote has 3 trivial README commits that can be force-pushed over — local is the master copy
- Repo pushes to https://github.com/kenziecreative/brand-compass

## Constraints

- **Implementation surface:** Most changes are to CLAUDE.md, agent definition files (.claude/agents/), command files (.claude/commands/), and template files — not React application code
- **No new phases:** Research explicitly recommends preserving the 8-phase structure
- **No new agents:** Changes are to existing agent capabilities (trigger changes, expanded templates, new verification functions)
- **Dependency order:** Waves encode real dependencies — Wave 1 changes the discovery pipeline that Wave 2 builds on
- **Testing:** Changes to CLAUDE.md and agent definitions can only be tested by running actual brand engagements

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use research 4-wave sequence as phase structure | Waves encode dependencies; Wave 1 changes discovery pipeline Wave 2 builds on | — Pending |
| Bundle quick wins into early phases | They're all file edits; spreading across milestone adds overhead | — Pending |
| Defer Tier 3.1, 3.9, 3.10 to future milestone | Significant scope; evaluate after Tier 1/2 prove out | — Pending |
| Commit existing local changes first | Clean baseline before new work begins | — Pending |

---
*Last updated: 2026-03-26 after milestone v1.0 initialization*
