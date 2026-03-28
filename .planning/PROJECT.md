# Brand Compass

## What This Is

Brand Compass is a guided brand development system that runs inside Claude Code. A Lead Brand Strategist walks clients through 8 phases of discovery — asking questions, pushing back on surface-level answers, and delegating specialized work to background agents. It produces a complete brand system: strategic foundation, voice guide, visual identity, and practical toolkit as both markdown and HTML specimens.

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

### Active

(None yet — define in next milestone)

### Out of Scope

- Full design system methodology — component-level tokens are design system work, not brand work (research: Pattern 23)
- Full content strategy — editorial calendars, SEO workflows, production processes (research: Pattern 18)
- Enterprise governance — full compliance infrastructure for large brand teams (research: Pattern 19)
- Sonic identity — relevant only for subset of clients, not universal (research: Pattern 34)
- Full JTBD switch interviews — research technique, not brand discovery framework (research: Pattern 2)
- Custom iconography systems — enterprise-tier only (research: Pattern 21)
- More differentiated personal brand track (Tier 3, recommendation 3.1) — significant structural change, evaluate after v1.0 proves out
- Post-engagement brand query mode (Tier 3, recommendation 3.9) — future architectural consideration
- Lightweight brand measurement card (Tier 3, recommendation 3.10) — future differentiator, not current priority

## Context

Shipped v1.0 with 16,273 LOC across 108 files (68 markdown, 40 TypeScript/React).
Tech stack: React + TypeScript + Vite + Tailwind CSS v4 (dashboard viewer), Claude Code terminal (primary interface).
The actual brand development happens via slash commands and agent conversations — the React app is a viewer, not the primary interface.
Feature research produced 7 research phases, 35 sources, 37 cross-reference patterns, and 7 audit-verified output documents.
v1.0 implemented all 24 prioritized recommendations from feature research in 9 phases (20 plans, 131 commits, 45 days).
8 tech debt items carried forward — most notable: Document Assembler missing voice-fingerprint.md input (Voice Pipeline partial break).

## Constraints

- **Implementation surface:** Most changes are to CLAUDE.md, agent definition files (.claude/agents/), command files (.claude/commands/), and template files — not React application code
- **No new phases:** Research explicitly recommends preserving the 8-phase structure
- **No new agents:** Changes are to existing agent capabilities
- **Testing:** Changes to CLAUDE.md and agent definitions can only be tested by running actual brand engagements

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

---
*Last updated: 2026-03-28 after v1.0 milestone*
