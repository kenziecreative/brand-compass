# Brand Compass

**A guided brand development system by [Kenzie Creative](https://www.kenzienotes.com).**

Brand Compass walks you through the same strategic process that professional brand strategists use with their clients — from uncovering your core belief to delivering a complete visual identity system. The difference is that you're having a conversation, not filling out a questionnaire. You talk through your story, your audience, your point of view, and the system listens, challenges, reflects back, and builds your brand from what's real about you.

The system adapts to who you are. A musician, a startup founder, a consultant, and a nonprofit leader all go through the same strategic process — but the questions sharpen around your context, the archetypes map to your energy, the visual identity derives from your personality, and the voice guide captures how *you* actually communicate. No two brand systems come out the same because no two people put the same thing in.

At the end, you have a complete brand system: foundation documents, voice guide, color palette, visual identity, UI components, and a practical toolkit with bios, pitches, and decision filters — all rendered in your brand's own visual language.

[Why I Built This](#why-i-built-this) · [Who This Is For](#who-this-is-for) · [What You Get](#what-you-get) · [How It Works](#how-it-works) · [Commands](#commands) · [Getting Started](#getting-started) · [Specialist Agents](#specialist-agents) · [Quality Features](#quality-features)

---

## Why I Built This

Most brand tools hand you a questionnaire and a template.

You fill in the blanks — your mission statement, your target audience, your brand values — and the tool arranges your answers into a document that looks polished but says nothing distinctive. The output is interchangeable because the process is interchangeable. Swap out the company name and the colors, and it could belong to anyone.

I wanted something that worked the way a real strategist works. Not "tell me your values" but "why do you do this work instead of something easier?" Not "describe your target audience" but "tell me about a specific person whose life changed because of what you do." Not "pick three brand adjectives" but a conversation that surfaces personality from stories, not from a dropdown menu.

The hard part of brand development isn't the deliverables. It's the thinking that happens before the deliverables — the part where you figure out what's actually true and distinctive about you. That's a conversation, not a form. So I built a system that has the conversation first, pushes back when the answers are too safe, and then derives everything else from what comes out of that dialogue.

The complexity is in the system, not in your workflow. What you see: a conversation that asks good questions. What's behind it: twelve specialist agents, competitive analysis, voice fingerprinting, archetype mapping, accessibility-checked color systems, and a verification pipeline that catches generic output before it reaches your deliverables.

— **Kelsey**

---

## Who This Is For

Anyone building something real who needs a brand that reflects it.

- **Solo founders** who know their product is good but can't articulate why it's different — and are tired of sounding like everyone else in their space
- **Musicians and artists** who need more than a logo — a complete system for how they show up across releases, merch, social, and press
- **Consultants and coaches** who've outgrown their DIY brand and need strategic positioning that actually differentiates them from the 50 other people offering the same thing
- **Nonprofits and community organizations** who need professional brand materials but can't justify a $30k agency engagement
- **Creative studios and small agencies** who want to use the same strategic process with their own clients
- **Anyone at a transition point** — launching, pivoting, or leveling up — who needs their external presence to match where they're headed, not where they've been

You don't need design experience. You don't need marketing language. You need [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and the willingness to answer honest questions about what you do and why.

---

## v2.0 Highlights

- **Three-bundle output.** Brand Compass now produces three distinct output bundles: a client package (markdown + HTML specimens), an agent skill bundle for Claude Code and Cowork, and a design kit for developers and designers. Each bundle is shaped for its downstream consumer rather than being a one-size-fits-all export.
- **Agent skill bundle.** A complete skill definition (`SKILL.md`, `brand-prompt.md`, and `source/` files) that any Claude Code agent can ingest to write in your brand voice. Voice rules, guardrails, and language bank are extracted from the client package and translated into behavioral instructions.
- **Design kit.** A complete design kit you can import directly into Claude Design — tokens (CSS, JSON DTCG, Tailwind config), atomized HTML components, preview cards, and a branded landing page. Claude Design gets your colors, typography, spacing, and component patterns as structured inputs rather than screenshots or style guides it has to interpret.
- **Token externalization.** Colors, typography, and spacing are extracted into standalone token files that serve as the single source of truth for all design-kit specimens. Client-bundle specimens remain fully self-contained with inline styles.
- **Four new agents.** `design-kit-foundation` (token extraction and specimen post-processing), `design-kit-packager` (components, previews, landing page), `skill-bundle-packager` (voice-to-skill translation), plus enhanced `document-assembler` with voice fingerprint integration.
- **Phase transition context management.** Every phase completion writes a structured handoff block to state — what was decided, key outputs, and what happens next — so cross-session continuity is automatic rather than dependent on conversation history.

---

## What You Get

**A brand foundation** that captures why you do what you do, who you serve, how you're different, and what you believe — not in marketing speak, but in your own words refined into strategy.

**A voice guide** that codifies how you actually write and communicate — your rhythm, your signature moves, your guardrails — so anyone writing on your behalf sounds like you.

**A complete visual identity** — color palette with tint scales and accessibility checks, typography system, mark direction, imagery style, and a full UI component kit — all generated from your brand's personality, not from a template.

**A practical toolkit** with grab-and-go assets: bio variants for every context, elevator pitches at three lengths, a decision filter for evaluating opportunities, content territories, and a language bank of phrases you use and phrases you never use.

**An agent skill bundle** that lets any Claude Code agent write in your brand voice. Voice rules, guardrails, and language patterns extracted from the brand and translated into behavioral instructions — not "be professional and friendly" but the actual moves your voice makes.

**A design kit** you can import directly into Claude Design — tokens, components, preview cards, and a branded landing page. Claude Design gets your brand as structured inputs it can build with, not screenshots it has to interpret. The same kit works for any developer or designer implementing the brand in code.

Every deliverable comes in two formats: markdown for portability and HTML specimens rendered with your brand's own colors, fonts, and design language.

---

## How It Works

Brand Compass is built on [Claude Code](https://docs.anthropic.com/en/docs/claude-code). You have a conversation — it asks questions, you answer them, and the brand gets built through that dialogue. Behind the scenes, specialist agents handle research, competitive analysis, voice fingerprinting, copywriting, and visual direction so the conversation stays focused on you.

The process has eight phases:

1. **Onboarding** — Who you are, what you do, where you show up
2. **Origin & Belief** — Why you do this work, what you believe that others don't
3. **Audience** — Who you actually serve, what they're struggling with, who you're not for
4. **Positioning** — How you're different, what territory you own, your contrarian point of view
5. **Personality** — How your brand shows up, its archetypal energy, the world it inhabits
6. **Messaging** — Your tagline, story, descriptions, and proof points
7. **Voice** — How you write, your style signatures, your guardrails
8. **Visual Identity** — Color, typography, imagery, and mark direction derived from everything above

Each phase builds on the last. Two checkpoint gates (after Phase 3 and after Phase 6) verify the strategic foundation is solid before moving to personality, messaging, and visuals. You can stop and resume between sessions — the system picks up exactly where you left off.

---

## This Is Not a Logo Generator

Brand Compass is a full brand development process, not a quick-fix tool. It doesn't hand you a logo and call it done. It builds the strategic foundation first — what you believe, who you serve, how you're different, how you speak — and then derives the visuals from that foundation. The colors, typography, and mark direction exist because they mean something, not because they looked good in a template.

If you just need a logo, this isn't the right tool. If you want a brand system where the visuals and the messaging actually support each other — where every piece traces back to a real strategic decision — that's what this builds.

---

## Getting Started

You'll need [Claude Code](https://docs.anthropic.com/en/docs/claude-code). The system works out of the box with no additional tools. A React dashboard runs alongside for visual previews, but the brand development happens in the terminal conversation.

### Prerequisites

| Tool | Required? | Install | Purpose |
|------|-----------|---------|---------|
| **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** | Yes | See Anthropic docs | The runtime environment |
| **[Node.js](https://nodejs.org/)** | Yes | `brew install node` or from nodejs.org | React dashboard and build tools |
| **Dictation tool** | Recommended | See [Speak Your Answers](#speak-your-answers) | Better voice capture when you talk instead of type |

### Clone and Start

```bash
git clone https://github.com/kenziecreative/brand-compass my-brand-project
cd my-brand-project
npm install
npm run dev
```

Then open Claude Code in the project directory and run:

```
/brand-compass:start
```

That begins onboarding. From there, the system guides you through each phase. A live dashboard runs in your browser showing your brand being assembled as you go — content cards for each phase, visual previews, and final deliverables.

### Before You Start

The process works best when you come prepared with a few things. You don't need polished answers — just have the raw material accessible so you're not searching mid-session.

**Writing samples (3-5 pieces)** — Anything you've written that sounds like you. Blog posts, newsletters, social captions, artist statements, grant applications, about pages — whatever exists. Have the links or files accessible before you start.

**People you've impacted** — Think of 3-4 specific people whose lives or work changed because of what you do. What were they dealing with before they found you? You'll also be asked to describe one person in detail — name, age, what their day looks like.

**Evidence that you're credible** — What have you done that earns trust? Could be client outcomes, exhibitions, press mentions, years of practice, certifications, community built, anything concrete. Have specifics — not "I've helped a lot of people" but the actual details.

**Others in your space** — 3-5 names of people or organizations doing something similar to you. Not necessarily competitors — peers, influences, anyone occupying adjacent territory.

**Existing materials** — Anything visual or written that currently represents you. A logo, a website, a flyer, an album cover, a business card. Even rough or outdated stuff.

You don't need to prepare answers about your personality, your beliefs, or how you communicate. Those parts of the process work better when they come out of conversation rather than pre-written statements.

### Speak Your Answers

Brand discovery works best when you talk rather than type. When you type, you edit yourself — filtering, polishing, second-guessing. When you speak, you get closer to how you actually think and communicate. That unfiltered voice is exactly what the system needs.

Use any dictation tool you have — [Wispr Flow](https://wisprflow.ai), [Superwhisper](https://superwhisper.com), [Monologue](https://monologue.to), [Willow Voice](https://willowvoice.com), or the built-in macOS dictation (Fn key twice). Just talk through your answers. The system picks up on your real phrasing, rhythm, and vocabulary, which directly improves the quality of your messaging, bios, and voice guide.

---

## Commands

| Command | What It Does |
|---------|-------------|
| `/brand-compass:start` | Begin a new brand project |
| `/brand-compass:resume` | Pick up where you left off |
| `/brand-compass:export` | Package your final deliverables |
| `/brand-compass:verify` | Check deliverable quality before export |

Phase commands (`/brand-compass:phase-1-origin` through `/brand-compass:phase-8-toolkit`) are available if you need to jump to a specific phase, but in normal use the system advances automatically.

---

## Specialist Agents

Behind the conversation, twelve specialist agents handle work that would break the conversational flow if the strategist did it inline. Each agent runs in the background, writes its output to a file, and the strategist synthesizes the results back into the conversation.

| Agent | What It Does | When It Runs |
|-------|-------------|--------------|
| **Research Analyst** | Competitive landscape analysis — how competitors position themselves, messaging patterns, white space | After Audience phase (required before Positioning) |
| **Content Auditor** | Analyzes existing content for voice patterns, recurring themes, core beliefs | When client provides existing content |
| **Archetype Analyst** | Maps personality to Jungian archetypes with custom naming and shadow analysis | Personality phase |
| **Copywriter** | Generates messaging options — taglines, narratives, bios — for client selection | After Messaging discovery |
| **Voice Analyzer** | Extracts voice fingerprint from writing samples — rhythm, vocabulary, signature moves | When writing samples are provided |
| **Visual Director** | Translates verbal strategy into visual direction — color rationale, typography, imagery style | Visual Identity phase (blocking — must be reviewed before generation) |
| **Image Generator** | Generates visual assets — mark explorations, color specimens, imagery samples | After visual direction is approved |
| **Document Assembler** | Compiles all outputs into the client package — markdown and HTML specimens | At phase completions and end of process |
| **Brand Verifier** | Quality checks across all deliverables — placeholder detection, cross-document consistency, voice compliance | Before export |
| **Skill Bundle Packager** | Extracts voice rules, guardrails, and language bank into agent-consumable skill format | Toolkit assembly |
| **Design Kit Foundation** | Extracts design tokens and post-processes specimens for external token linking | Toolkit assembly |
| **Design Kit Packager** | Generates atomized components, preview cards, landing page, and root files | After foundation completes |

---

## Quality Features

**Strategic pushback.** The system doesn't just agree with you. When your answers are too safe, too generic, or too similar to your competitors, it challenges you. Every discovery phase includes a pushback audit — if the conversation flowed too smoothly, the strategist identifies where you stayed surface-level and pushes deeper before moving on.

**Competitive context as a hard gate.** Positioning doesn't happen in a vacuum. The Research Analyst runs after your audience phase and must complete before positioning begins. Your contrarian point of view, territory claim, and differentiation are built against the actual competitive landscape, not imagined uniqueness.

**Voice fingerprinting.** Your writing samples are analyzed for quantitative metrics (sentence length distribution, question frequency, contraction rate) and qualitative patterns (signature moves, vocabulary preferences, rhetorical tendencies). The voice guide isn't "be professional and approachable" — it's the actual patterns in how you communicate.

**Accessibility as a hard constraint.** WCAG AA is the universal floor, not an optional checkbox. Color contrast ratios, typography sizing, and component patterns are checked against accessibility standards throughout the visual identity phase. The constraint flows from strategy through the Visual Director to every HTML specimen.

**Checkpoint gates.** Two gates verify the strategic foundation before the system builds on it. Checkpoint A (after Positioning) confirms your belief, audience, and differentiation hold together. Checkpoint B (after Voice) confirms the full strategic and verbal identity is solid before visual work begins. Both include devil's advocate challenges.

**Brand verification pipeline.** Before export, the Brand Verifier runs eight levels of checks: placeholder text detection, section completeness, cross-document consistency, voice compliance, asset pack completeness, skill bundle structure, and design kit integrity. Nothing ships with "[INSERT TAGLINE HERE]" still in it.

**Three-format output.** Every deliverable exists as markdown (portable, version-controllable), HTML specimens (visual, rendered in the brand's own design language), and agent-consumable skill files (behavioral instructions for AI tools). The brand works for humans reading it, humans looking at it, and machines writing with it.

---

## Output Bundles

Brand Compass produces three output bundles, each shaped for a different consumer.

| Bundle | Contents | For |
|--------|----------|-----|
| **Client Package** | Brand foundation, voice guide, color palette, visual system, UI kit, practical toolkit — all as markdown + self-contained HTML specimens | You — the shareable brand system |
| **Agent Skill Bundle** | SKILL.md (skill definition), brand-prompt.md (prose prompt), source files (voice rules, guardrails, language bank) | Claude Code / Cowork agents — write in your brand voice |
| **Design Kit** | Token files (CSS, JSON DTCG, Tailwind), atomized components, preview cards, landing page, README, HANDOFF.md | Claude Design, developers, and designers — import and build with the brand directly |

---

## Picking Up Where You Left Off

Building a brand takes multiple sessions. The system is designed for that.

Every decision you make, every phase you complete, and every piece of work the system produces is tracked in a project state file. When you come back — whether it's the next day or next week — run `/brand-compass:resume` and the system reads your state, checks for any work that finished while you were away, and picks up exactly where you left off. You don't need to re-explain anything.

If a session runs long enough that the conversation history needs to compress, the system automatically extracts the important context — what you decided, what's in progress, what still needs attention — before that happens. Nothing gets lost.

---

## Inspiration

Brand Compass was inspired by [Design OS](https://buildermethods.com/design-os) by Brian Casel — a systematic approach to brand development that showed how structured process and creative strategy can work together.

---

## License

Proprietary. Copyright Kenzie Creative.
