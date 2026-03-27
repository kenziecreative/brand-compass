---
source_id: SRC-001
source_type: primary_artifact
title: "Brand Compass System — Complete Source Material Review"
date_processed: 2026-03-26
credibility: authoritative (primary source files — the system itself)
phase_relevance: [1]
---

# Brand Compass System — Source Material Notes

## Source Description

Complete review of all Brand Compass source files: CLAUDE.md orchestration (the master spec), 13 agent definitions, 18 slash commands, STATE template, and the Baseline example brand output (15 files including research, drafts, and final deliverables).

## Key Findings

### System Architecture

**Phase Pipeline:** 9 phases (0-8) with 2 blocking checkpoints.

| Phase | Name | Type | Questions | Required Agents | Optional Agents |
|-------|------|------|-----------|-----------------|-----------------|
| 0 | Onboarding | Setup | ~8 | None | Content Auditor, Voice Analyzer |
| 1 | Origin & Belief | Discovery | 16 | None | Content Auditor, Voice Analyzer |
| 2 | Audience | Discovery | 14 | None | Research Analyst |
| 3 | Positioning | Discovery | 22 | None | None (uses Research Analyst output) |
| 4 | Personality | Discovery | 17 | Archetype Analyst | None |
| 5 | Messaging | Discovery | 14 | Copywriter | None |
| 6 | Voice | Discovery | 18 | None | Voice Analyzer |
| 7 | Visual Identity | Discovery | 21 | Visual Director (BLOCKING) | Image Generator |
| 8 | Toolkit Assembly | Assembly | Varies | Document Assembler, Brand Verifier | None |

**Total discovery questions:** 122 across Phases 1-7 (not counting Phase 0 onboarding or Phase 8 assembly conversation).

**Checkpoints:**
- Checkpoint A (after Phase 3): Gates Phase 4. Validates strategic foundation (belief, audience, positioning) holds together.
- Checkpoint B (after Phase 6): Gates Phase 7. Validates complete verbal brand is internally consistent.

### Agent Ecosystem

**13 agents total**, divided into:

**Discovery/Analysis Agents (6):**
1. Research Analyst (Sonnet) — competitive landscape, industry positioning
2. Content Auditor (Sonnet) — existing content pattern mining
3. Archetype Analyst (Sonnet) — Jungian archetype mapping
4. Copywriter (Opus) — messaging options generation
5. Voice Analyzer (Sonnet) — writing pattern extraction
6. Visual Director (Opus) — strategy-to-visual translation (ONLY BLOCKING AGENT)

**Production Agents (2):**
7. Image Generator (Sonnet) — visual asset generation
8. Document Assembler (Sonnet) — final deliverable compilation

**Quality Agents (2):**
9. Brand Verifier (Sonnet) — deliverable quality checks
10. Implementation Verifier (Sonnet) — codebase integrity checks

**Infrastructure Agents (3):**
11. State Reader (Haiku) — session resumption briefing
12. State Writer (Haiku) — state persistence
13. Memory Extractor (Haiku) — pre-compaction context preservation

**Model allocation:**
- Opus: 2 agents (Copywriter, Visual Director) — the creative/strategic work
- Sonnet: 8 agents — analysis, production, verification
- Haiku: 3 agents — infrastructure/mechanical tasks

### Conditional Logic Paths

**Entity Type Branching:**
- Business/org types get: Mission statement, Vision statement, Service definition
- Individual/solo types skip those — Core Belief serves as mission equivalent
- Affects: Phase 1 (2 extra questions), Phase 3 (4 extra questions)

**Optional Triggers:**
- Content Auditor: only if client provides existing content
- Voice Analyzer: can run as early as Phase 0 if writing samples available
- Research Analyst: only if industry/domain becomes clear during Phase 2

**Asset Pack System:**
- 8 modular add-on packs selected during onboarding
- Each generates a standalone HTML specimen in Phase 8
- Packs: social-media-kit, print-collateral, media-kit-epk, merch-product, pitch-deck, app-dashboard-ui, signage-space, email-newsletter

### Deliverable Set

**Core deliverables (8 files):**

| File | Format | Content |
|------|--------|---------|
| brand-foundation.md | Markdown | Belief, audience, positioning, personality, messaging |
| brand-foundation.html | HTML specimen | Same content, rendered with brand tokens |
| voice-guide.md | Markdown | Voice system, style, signatures, guardrails |
| voice-guide.html | HTML specimen | Same content, rendered with brand tokens |
| color-palette.html | HTML specimen | Colors, tint scales (50-900), CSS variables, contrast ratios |
| visual-system.html | HTML specimen | Typography, mark/logo, imagery style |
| ui-kit.html | HTML specimen | Component library with brand tokens |
| practical-toolkit.md | Markdown | Bios, pitches, decision filter, language bank, content territories |

**Supporting files produced during process:**
- workspace/research/content-audit.md
- workspace/research/competitive-brief.md
- workspace/research/archetype-assessment.md
- workspace/research/voice-fingerprint.md
- workspace/drafts/messaging-options.md
- workspace/drafts/visual-direction.md

**Asset pack HTML specimens (conditional):** Up to 8 additional HTML files.

### State Management System

**STATE.md** is the source of truth. Template has 10 sections:
1. Client profile (name, type, description, platforms, assets, packs)
2. Current Position (phase, step, blocking status)
3. Completed Phases (checklist)
4. Checkpoints (2 gates)
5. Running Agents (active agent table)
6. Completed Agent Outputs (incorporation tracking)
7. Key Decisions (timestamped log)
8. Discovery Outputs (29-item checklist covering all discovery elements)
9. Next Action (specific resumption instruction)
10. Session Log (chronological progress)

**Session protocol:** Read STATE.md first on every new session. Check for unincorporated agent outputs. Resume from Next Action field.

**Memory system:** Memory Extractor runs pre-compaction to capture transient context. State Reader provides resumption briefing on session start.

### Commands/Utilities

**18 total commands:**
- 9 phase/checkpoint commands (start, phase-1 through phase-8, checkpoint-a, checkpoint-b)
- 5 utility commands (resume, save-state, sanity-check, export, update)
- 2 verification commands (verify for content, verify-build for codebase)

### UX Design Principles

- AskUserQuestion for every discrete choice (not text-based option listing)
- One question per turn (sequential, not batch)
- TodoWrite for persistent phase-level progress tracking
- File announcements must be explicit (name, path, description, line count)
- HTML specimens opened in browser (not described in text)
- Agent status communicated with time estimates

### Strategic Pushback Protocol

Detailed instructions for when/how to challenge client decisions:
- Defend recommendations backed by strategic reasoning
- Challenge generic/safe choices by reflecting client's own discovery words back
- Flag when edits weaken the brand
- Distinguish preference from strategy
- Push once or twice, then respect the decision

### Example Brand Analysis (Baseline)

The example brand (Baseline — accounting/compliance for SaaS startups) demonstrates:
- All 15 workspace files produced
- Research files: substantive, evidence-based, quantitative where possible
- Voice fingerprint: 47-piece corpus, ~38K words analyzed with exact metrics
- Archetype assessment: Custom archetype names (Navigator, Builder), shadow analysis
- Messaging options: 5 taglines with rationale, 3 narrative angles, 3-length boilerplates
- Visual direction: Complete design system parameters with CSS custom properties
- Final outputs: All 8 core files, internally consistent token usage

**Quality ceiling demonstrated:** The example brand is the system's reference implementation. It shows professional-grade strategy work with quantitative rigor, actionable specificity, and consistent cross-document integration.

## Observations for Further Research

### Potential Ambiguities/Underspecifications

1. **Content Auditor + Voice Analyzer early launch:** Both can run as early as Phase 0/1, but the conditions for launch are vaguely specified ("if client provides content"). No structured prompt in Phase 0 to ask for existing content.

2. **Research Analyst trigger:** "If client mentions competitors or industry" — passive trigger. No structured competitive discovery built into any phase's question set.

3. **Unifying Lens (Phase 3):** Instructions say "skip if client has narrow focus" but no criteria for what constitutes narrow vs. broad focus.

4. **Defining Features (Phase 4):** "Not every brand has these. Skip if nothing surfaces." — could lead to inconsistent discovery depth.

5. **Phase 8 assembly conversation:** Less structured than discovery phases. No fixed question set — relies on client providing context for each toolkit item.

6. **Brand architecture:** System designed for single brands. No path for multi-brand, sub-brand, or product line architectures.

7. **Measurement:** No brand health metrics, tracking recommendations, or success criteria for the brand engagement itself.

8. **Activation:** No rollout plan, internal training guidance, or launch checklist.

9. **Content strategy:** Voice and expression are defined (Phase 6), but no content pillars, channel strategy, or posting cadence produced.

10. **Motion/animation:** Zero motion guidance in the visual system.

11. **Accessibility:** Color palette HTML mentions contrast ratios but no systematic WCAG audit across all visual outputs.

12. **Design tokens:** CSS custom properties are produced but not in a portable token format (JSON, YAML, or design-tool-compatible).

## Tags

- **SUPPORTED:** The 8-phase structure covers standard brand strategy pillars (purpose, audience, positioning, personality, messaging, voice, visual)
- **SUPPORTED:** Agent ecosystem separates concerns well (analysis, creative, production, quality, infrastructure)
- **SUPPORTED:** State management is robust with multiple persistence mechanisms
- **GAP:** No competitive analysis is structurally required — it's optional and passively triggered
- **GAP:** No brand architecture path for multi-brand clients
- **GAP:** No measurement, activation, or content strategy outputs
- **GAP:** No motion guidelines
- **GAP:** Design tokens are CSS-only, not portable
- **COMPLICATED:** Early voice/content agent launches are supported but not prompted — depends on client volunteering material
