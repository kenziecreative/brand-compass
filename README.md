# Brand Compass

An AI-guided brand development system by [Kenzie Creative](https://kenziecreative.com). Walk clients through an 8-phase brand discovery process using Claude Code, with a live dashboard to visualize the brand being assembled.

## What This Is

**Backend:** 11 specialist agents and 14 slash commands orchestrated through Claude Code. Each phase guides a discovery conversation, launches agents for research and drafting, and tracks progress in `workspace/STATE.md`.

**Frontend:** A React dashboard at `localhost` showing the brand system being assembled phase by phase — structured content cards displaying core belief, archetypes, messaging options, visual direction, and more as phases complete.

**Output:** 7 deliverable files — brand foundation (MD + HTML), voice guide (MD + HTML), color palette, visual system, and UI kit — all rendered with the client's brand tokens.

## Setup

```bash
git clone <repo-url>
cd knz-brand-compass
npm install
npm run dev
```

The dashboard runs at `http://localhost:3001`. Open Claude Code in the project directory to start the brand process.

## Usage

### Starting a Brand Project

```
/brand-compass/phase-1-origin
```

This begins the discovery conversation. Claude guides you through questions about the client's core belief, origin story, and the problem they solve. Each phase builds on the last.

### The 8 Phases

| Phase | Command | Focus |
|-------|---------|-------|
| 1 | `/brand-compass/phase-1-origin` | Origin & Belief |
| 2 | `/brand-compass/phase-2-audience` | Audience Definition |
| 3 | `/brand-compass/phase-3-positioning` | Positioning & Differentiation |
| A | `/brand-compass/checkpoint-a` | Strategic Foundation Gate |
| 4 | `/brand-compass/phase-4-personality` | Personality & Archetypes |
| 5 | `/brand-compass/phase-5-messaging` | Messaging Architecture |
| 6 | `/brand-compass/phase-6-voice` | Voice & Expression |
| B | `/brand-compass/checkpoint-b` | Verbal Brand Gate |
| 7 | `/brand-compass/phase-7-visual` | Visual Identity |
| 8 | `/brand-compass/phase-8-toolkit` | Toolkit Assembly |

### Utility Commands

| Command | Purpose |
|---------|---------|
| `/brand-compass/resume` | Resume from where you left off |
| `/brand-compass/save-state` | Emergency state save |
| `/brand-compass/export` | Package final deliverables |
| `/brand-compass/sanity-check` | Project health check |

### Viewing Progress

The dashboard at `localhost` shows:
- Phase completion and discovery progress
- Structured content cards for each completed phase
- Brand summary accumulating across phases
- Final deliverables on the Output page

Restart the dev server after agents write new files to see updates in the dashboard.

## Project Structure

```
knz-brand-compass/
  CLAUDE.md                 # Orchestration instructions
  workspace/                # Brand project workspace
    STATE.md                # Progress tracking (per-client)
    research/               # Agent research outputs
    drafts/                 # Agent draft outputs
    output/                 # Final deliverables
    assets/                 # Generated visual assets
    reference/              # Reference materials (archetypes guide)
  src/                      # Frontend dashboard
  .claude/
    agents/                 # 11 specialist agents
    commands/brand-compass/ # 14 slash commands
```

## Agents

| Agent | Role |
|-------|------|
| Content Auditor | Analyzes existing client content for brand patterns |
| Research Analyst | Competitive landscape and market context |
| Archetype Analyst | Maps personality to classic archetypes |
| Copywriter | Generates tagline, narrative, and bio options |
| Voice Analyzer | Fingerprints the client's writing style |
| Visual Director | Translates verbal brand into visual direction |
| Image Generator | Creates visual assets from approved direction |
| Document Assembler | Compiles final deliverable documents |
| State Reader | Produces resumption briefings |
| State Writer | Maintains STATE.md at transitions |
| Memory Extractor | Captures session context before compaction |

## Final Deliverables

| File | Format | Content |
|------|--------|---------|
| Brand Foundation | MD + HTML | Belief, audience, positioning, personality, messaging, toolkit |
| Voice Guide | MD + HTML | Voice summary, style, signature moves, guardrails |
| Color Palette | HTML | Interactive specimen with tint scales and CSS variables |
| Visual System | HTML | Typography, imagery, mark direction |
| UI Kit | HTML | Component library with client's brand tokens |

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Claude Code (agents + commands)


## License

Proprietary. Copyright Kenzie Creative.
