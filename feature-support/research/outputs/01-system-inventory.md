# Phase 1: System Inventory — What Brand Compass Currently Does

## Overview

Brand Compass is a structured, AI-assisted brand development system implemented as a Claude Code plugin. It guides clients through 9 phases (0-8) of brand discovery, strategy, and deliverable production via conversational facilitation supported by 13 specialist agents. The system produces 8 core deliverable files (3 markdown, 5 HTML specimens) plus up to 8 additional HTML specimens for selected asset packs. Across Phases 1-7, it asks 122 structured discovery questions.

This inventory maps everything the system currently does: every phase, agent, deliverable, command, decision point, and conditional path.

---

## 1. Phase Pipeline

### Structure

The system follows a linear pipeline with two blocking checkpoints:

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → [Checkpoint A] → Phase 4 → Phase 5 → Phase 6 → [Checkpoint B] → Phase 7 → Phase 8 → Export
```

### Phase Details

| Phase | Name | Type | Discovery Questions | Required Agents | Optional Agents |
|-------|------|------|---------------------|-----------------|-----------------|
| 0 | Onboarding | Setup | ~8 | — | Content Auditor, Voice Analyzer |
| 1 | Origin & Belief | Discovery | 16 | — | Content Auditor, Voice Analyzer |
| 2 | Audience | Discovery | 14 | — | Research Analyst |
| 3 | Positioning & Differentiation | Discovery | 22 | — | — (uses Research Analyst if available) |
| 4 | Personality & Archetypes | Discovery | 17 | Archetype Analyst | — |
| 5 | Messaging Architecture | Discovery | 14 | Copywriter | — |
| 6 | Voice & Expression | Discovery | 18 | — | Voice Analyzer |
| 7 | Visual Identity | Discovery | 21 | Visual Director (**blocking**) | Image Generator |
| 8 | Toolkit Assembly | Assembly | Conversational | Document Assembler, Brand Verifier | — |

**Total structured discovery questions:** 122 (Phases 1-7).

### Phase-by-Phase Inventory

**Phase 0 — Onboarding**
- Captures: brand name, entity type, description, platforms, existing assets, asset pack selection
- Introduces dictation/voice tips
- Entity type determines downstream conditional paths (org vs. individual)
- No agents required; Content Auditor and Voice Analyzer can launch if client volunteers material

**Phase 1 — Origin & Belief**
- 4 question groups: The Belief (4), The Origin (3), The Problem (3), The Values (4)
- Conditional: Mission & Vision (2 questions) — org/business types only
- Produces: Core Belief, Origin Story, Problem Addressed, Core Values, Mission/Vision (conditional)
- Optional agents: Content Auditor (if content provided), Voice Analyzer (if 3+ writing samples)

**Phase 2 — Audience**
- 4 question groups: Segments (3), Common Thread (4), Market of One (4), Anti-Audience (3)
- Produces: Named segments with triggers, Unified Profile, Market of One (vivid specific person), Anti-Audience
- Optional agent: Research Analyst (if industry/domain clear)

**Phase 3 — Positioning & Differentiation**
- 7 question groups: Positioning (3), Intersection (3), Territory (3), Unifying Lens (3, conditional), Contrarian View (4), Permission/Credibility (2), Service Definition (4, conditional)
- Conditional: Unifying Lens — thought leaders/content creators spanning multiple topics only
- Conditional: Service Definition — org/business types only
- Produces: Positioning Statement, Intersection (X+Y+Z), Territory, Unifying Lens (if applicable), Contrarian POV, Service Definition (conditional)

**Checkpoint A** — Validates Phases 1-3 as coherent strategic foundation. Three options: solid, needs adjusting, something's off. Must pass before Phase 4.

**Phase 4 — Personality & Archetypes**
- 5 question groups: Traits (4), Archetypes (4), Brand World (3), Influences (3), Defining Features (3, conditional)
- Required agent: Archetype Analyst — maps to 12 Jungian archetypes, suggests custom names
- Produces: 4-6 traits with means/doesn't-mean, Primary + Supporting archetypes with custom names, Brand World, Defining Features (if present)

**Phase 5 — Messaging Architecture**
- 4 question groups: Tagline (3), Brand Story (4), Boilerplates (3), Proof Points (4)
- Required agent: Copywriter — generates 8-10 tagline options, 2-3 narrative angles, boilerplate drafts
- Produces: Selected tagline, Core Narrative, Boilerplates (3 lengths), Proof Points

**Phase 6 — Voice & Expression**
- 6 question groups: Philosophical Anchor (3), Voice Definition (3), Writing Style (4), Signature Moves (2), Guardrails (4), Scaling (2)
- Optional agent: Voice Analyzer — quantitative analysis of writing samples (sentence metrics, signature moves, anti-patterns)
- Produces: Voice Summary, Voice Tags, Writing Style spec, Signature Moves, Guardrails, Platform Scaling

**Checkpoint B** — Validates Phases 1-6 as coherent verbal brand. Must pass before Phase 7. Checks personality↔voice consistency, tagline↔belief alignment, positioning↔audience fit.

**Phase 7 — Visual Identity**
- 6 question groups: Visual Direction (4), Color (4), Typography (3), Mark/Logo (4), Imagery (4), Application (2)
- Required agent: Visual Director (**blocking**) — translates verbal brand to visual direction with CSS custom properties
- Conditional agent: Image Generator — launches only after client approves visual direction
- Produces: Color Palette, Typography system, Mark/Logo direction, Imagery Style, Design System Parameters

**Phase 8 — Toolkit Assembly**
- Conversational assembly, not structured discovery
- Required agents: Document Assembler (compiles all outputs), Brand Verifier (quality gate)
- Produces: Bio Bank, Elevator Pitches, Decision Filter, Content Territories, Language Bank, Quick Reference
- Generates all 8 core deliverable files plus selected asset pack HTML specimens

---

## 2. Agent Ecosystem

### 13 Agents by Category

**Discovery/Analysis (6):**

| Agent | Model | Blocking? | Trigger | Output |
|-------|-------|-----------|---------|--------|
| Research Analyst | Sonnet | No | Client mentions competitors/industry | `workspace/research/competitive-brief.md` |
| Content Auditor | Sonnet | No | Client provides existing content | `workspace/research/content-audit.md` |
| Archetype Analyst | Sonnet | No | Phase 4 begins | `workspace/research/archetype-assessment.md` |
| Copywriter | Opus | No | Phase 5 discovery complete | `workspace/drafts/messaging-options.md` |
| Voice Analyzer | Sonnet | No | Writing samples available (Phase 0/1 or Phase 6) | `workspace/research/voice-fingerprint.md` |
| Visual Director | Opus | **Yes** | Phase 7 begins, Phases 1-6 complete | `workspace/drafts/visual-direction.md` |

**Production (2):**

| Agent | Model | Blocking? | Trigger | Output |
|-------|-------|-----------|---------|--------|
| Image Generator | Sonnet | No | Visual direction approved | `workspace/assets/[type]/` |
| Document Assembler | Sonnet | No | Phase complete / end of process | `workspace/output/[files]` |

**Quality (2):**

| Agent | Model | Trigger | Output |
|-------|-------|---------|--------|
| Brand Verifier | Sonnet | Manual or post-build | Verification report (returned) |
| Implementation Verifier | Sonnet | `/verify-build` or post-feature | Verification report (returned) |

**Infrastructure (3):**

| Agent | Model | Trigger | Output |
|-------|-------|---------|--------|
| State Reader | Haiku | Session start / `/resume` | Resumption briefing (returned) |
| State Writer | Haiku | Transition points | `workspace/STATE.md` |
| Memory Extractor | Haiku | Pre-compaction hook | `memory/working-memory.md` |

### Model Allocation
- **Opus (2):** Copywriter, Visual Director — creative and strategic synthesis
- **Sonnet (8):** All analysis, production, and verification agents
- **Haiku (3):** All infrastructure/mechanical agents

### Agent Protocol
- Announce agent launch to client with task description and time estimate
- Track in STATE.md Running Agents table
- Continue conversation while agents run (don't block unless agent is blocking)
- Read output immediately on completion; synthesize for client
- Never let completed output go unread

---

## 3. Conditional Logic

### Entity Type Branching

The system branches on entity type (captured in Phase 0):

**Business/Organization types** (business, organization, company, nonprofit, startup, agency):
- Phase 1: +2 questions (Mission & Vision)
- Phase 1 output: +Mission Statement, +Vision Statement
- Phase 3: +4 questions (Service Definition)
- Phase 3 output: +Service Definition (core services, outcomes, tiers, boundaries)

**Individual types** (solo creator, individual practitioner, artist, personal brand):
- Mission/Vision questions skipped — Core Belief serves same strategic function
- Service Definition skipped — Positioning Statement and Intersection cover offerings

### Optional Discovery Paths

| Element | Condition | Phase |
|---------|-----------|-------|
| Unifying Lens | Client spans multiple topics (thought leaders, content creators) | 3 |
| Defining Features | Something distinctive surfaces (rituals, metaphors, collections) | 4 |
| Content Auditor | Client provides existing content | 0-1 |
| Voice Analyzer (early) | Client provides 3+ writing samples | 0-1 |
| Research Analyst | Industry/domain becomes clear | 2 |

### Asset Pack System

8 modular add-ons selected during Phase 0 onboarding:

| Pack ID | Name |
|---------|------|
| social-media-kit | Social Media Kit |
| print-collateral | Print Collateral |
| media-kit-epk | Media Kit / EPK |
| merch-product | Merch & Product |
| pitch-deck | Pitch Deck |
| app-dashboard-ui | App / Dashboard UI |
| signage-space | Signage & Space |
| email-newsletter | Email & Newsletter |

Each selected pack generates a standalone HTML specimen in Phase 8.

---

## 4. Deliverable Set

### Core Deliverables (8 files)

| # | File | Format | Content |
|---|------|--------|---------|
| 1 | brand-foundation.md | Markdown | Belief, audience, positioning, personality, messaging |
| 2 | brand-foundation.html | HTML | Same content, rendered with brand tokens |
| 3 | voice-guide.md | Markdown | Voice system, style, signatures, guardrails |
| 4 | voice-guide.html | HTML | Same content, rendered with brand tokens |
| 5 | color-palette.html | HTML | Colors with tint scales (50-900), CSS variables, contrast ratios |
| 6 | visual-system.html | HTML | Typography, mark/logo, imagery style |
| 7 | ui-kit.html | HTML | Component library with brand tokens |
| 8 | practical-toolkit.md | Markdown | Bios, pitches, decision filter, content territories, language bank |

### Intermediate Files (6)

| File | Type | Produced By |
|------|------|-------------|
| workspace/research/content-audit.md | Research | Content Auditor |
| workspace/research/competitive-brief.md | Research | Research Analyst |
| workspace/research/archetype-assessment.md | Research | Archetype Analyst |
| workspace/research/voice-fingerprint.md | Research | Voice Analyzer |
| workspace/drafts/messaging-options.md | Draft | Copywriter |
| workspace/drafts/visual-direction.md | Draft | Visual Director |

### Asset Pack HTML Specimens (0-8 additional files)
One HTML file per selected pack at `workspace/output/[pack-id].html`.

---

## 5. State Management

### STATE.md Structure (10 sections)
1. Client profile (6 fields)
2. Current Position (phase, step, blocking status)
3. Completed Phases (9-item checklist: Phases 0-8)
4. Checkpoints (2 gates)
5. Running Agents (table: agent, task, launched, expected, output location)
6. Completed Agent Outputs (table: agent, output location, incorporated?)
7. Key Decisions (timestamped log)
8. Discovery Outputs (29-item checklist)
9. Next Action (specific command/instruction for resumption)
10. Session Log (chronological entries)

### Session Resilience
- **State Reader** agent provides resumption briefing on session start
- **State Writer** agent persists state at every transition
- **Memory Extractor** captures transient context before compaction
- Protocol: Read STATE.md first → check for unincorporated agent outputs → resume from Next Action

### 18 Commands
- 9 phase/checkpoint: start, phase-1 through phase-8, checkpoint-a, checkpoint-b
- 5 utility: resume, save-state, sanity-check, export, update
- 2 verification: verify (content quality), verify-build (codebase integrity)

---

## 6. UX Design System

### Interaction Principles
- **AskUserQuestion** for every discrete choice (2-4 options)
- **One question per turn** — sequential, not batched
- **TodoWrite** for phase-level progress bar (persistent across engagement)
- **Explicit file announcements** (name, path, description, line count)
- **HTML opened in browser** for visual artifacts
- **Agent status communicated** with time estimates and progress updates

### Strategic Pushback
The system includes detailed instructions for challenging client decisions:
- Defend strategic recommendations when client chooses safer/blander options
- Reflect client's own discovery words back to challenge comfort-driven choices
- Distinguish preference ("I like purple") from strategy ("purple serves the brand because...")
- Push once or twice, then respect the decision with full tradeoff understanding

### Dictation Encouragement
System prompts clients to speak answers rather than type at Phase 1, 4, 5, and 6 starts. Rationale: spoken answers are less self-edited and closer to authentic voice.

### Passive Voice Capture
Throughout Phases 1-6, the facilitator notes exact phrases, sentence rhythm, vocabulary choices, and avoidance patterns. These feed into Voice Notes sections in phase discovery files.

---

## 7. Example Brand Quality Assessment

The Baseline example brand (accounting/compliance for SaaS startups) demonstrates the system's output ceiling:

### Research Quality
- Content Audit: 14 pages, 38 LinkedIn posts, 42-slide deck, 3 email flows analyzed with per-channel quality scores
- Competitive Brief: 4-tier competitor map (Big Four → Startup Finance → Compliance Software → Adjacent), pricing dynamics, whitespace analysis
- Voice Fingerprint: 47-piece corpus (~38K words), exact metrics (14.2 avg sentence words vs. 22.8 industry), signature moves with frequency counts
- Archetype Assessment: Custom archetype names (Navigator from Sage, Builder from Creator), shadow analysis with specific guardrails

### Deliverable Quality
- All 8 core files produced with consistent token usage
- CSS custom properties synchronized across all HTML specimens
- Voice guide written in the brand's own voice (self-referential consistency)
- Practical toolkit is immediately usable (decision filter, content territories, language bank)
- Quantitative specificity throughout (not aspirational or vague)

---

## 8. Ambiguities and Underspecifications

These are areas where the system documentation is incomplete, contradictory, or leaves important decisions implicit:

1. **Passive agent triggers.** Content Auditor, Voice Analyzer, and Research Analyst all depend on the client volunteering information or mentioning something specific. No structured prompt in Phase 0 or Phase 1 asks "Do you have existing content we should analyze?" or "Who are your main competitors?"

2. **Unifying Lens criteria.** Phase 3 says "skip if the client has a narrow focus" but provides no criteria for determining narrow vs. broad focus. Left to facilitator judgment.

3. **Defining Features optionality.** Phase 4 says "not every brand has these — skip if nothing surfaces." Could lead to inconsistent depth across engagements.

4. **Phase 8 structure.** Less formalized than other phases. Discovery phases have numbered question groups; Phase 8 is "conversational assembly" with no fixed question set for each toolkit item.

5. **Brand architecture absent.** System designed for single brands only. No conditional path for clients with multiple product lines, sub-brands, or brand hierarchies.

6. **No measurement framework.** System produces brand strategy but no metrics for tracking brand health, engagement effectiveness, or strategy success.

7. **No activation guidance.** No rollout plan, internal training guide, or "first 30 days" launch checklist.

8. **No content strategy layer.** Voice and expression (Phase 6) defines how to write but doesn't produce content pillars, channel priorities, posting cadence, or content-to-audience mapping.

9. **No motion guidelines.** Visual system covers color, typography, mark, and imagery but nothing about animation, transitions, or motion principles.

10. **CSS-only tokens.** Design tokens are produced as CSS custom properties only — not in portable formats (JSON, YAML) compatible with design tools or multi-platform systems.

11. **Accessibility depth.** Color palette HTML mentions contrast ratios but no systematic WCAG audit across all visual deliverables or accessibility-specific guidance for typography, interaction, or content.

12. **Image Generator output.** Agent produces markdown descriptions of visual concepts, not actual images (despite the name). The system runs in a terminal environment — actual image generation would require external tools.

---

## Source

- SRC-001: Brand Compass primary source files (CLAUDE.md, 13 agents, 18 commands, STATE template, 15 example brand files)
