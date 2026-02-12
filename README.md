# Brand Compass

**A guided brand development system by [Kenzie Creative](https://kenziecreative.com).**

Brand Compass walks you through the same strategic process that professional brand strategists use with their clients — from uncovering your core belief to delivering a complete visual identity system. The difference is that you're having a conversation, not filling out a questionnaire. You talk through your story, your audience, your point of view, and the system listens, challenges, reflects back, and builds your brand from what's real about you.

The system adapts to who you are. A musician, a startup founder, a consultant, and a nonprofit leader all go through the same strategic process — but the questions sharpen around your context, the archetypes map to your energy, the visual identity derives from your personality, and the voice guide captures how *you* actually communicate. No two brand systems come out the same because no two people put the same thing in.

At the end, you have a complete brand system: foundation documents, voice guide, color palette, visual identity, UI components, and a practical toolkit with bios, pitches, and decision filters — all rendered in your brand's own visual language.

## What You Get

**A brand foundation** that captures why you do what you do, who you serve, how you're different, and what you believe — not in marketing speak, but in your own words refined into strategy.

**A voice guide** that codifies how you actually write and communicate — your rhythm, your signature moves, your guardrails — so anyone writing on your behalf sounds like you.

**A complete visual identity** — color palette with tint scales and accessibility checks, typography system, mark direction, imagery style, and a full UI component kit — all generated from your brand's personality, not from a template.

**A practical toolkit** with grab-and-go assets: bio variants for every context, elevator pitches at three lengths, a decision filter for evaluating opportunities, content territories, and a language bank of phrases you use and phrases you never use.

Every deliverable comes in two formats: markdown for portability and HTML specimens rendered with your brand's own colors, fonts, and design language.

## How It Works

Brand Compass is built on [Claude Code](https://docs.anthropic.com/en/docs/claude-code). You have a conversation — it asks questions, you answer them, and the brand gets built through that dialogue. Behind the scenes, specialist capabilities handle research, competitive analysis, voice fingerprinting, copywriting, and visual direction so the conversation stays focused on you.

The process has eight phases:

1. **Onboarding** — Who you are, what you do, where you show up
2. **Origin & Belief** — Why you do this work, what you believe that others don't
3. **Audience** — Who you actually serve, what they're struggling with, who you're not for
4. **Positioning** — How you're different, what territory you own, your contrarian point of view
5. **Personality** — How your brand shows up, its archetypal energy, the world it inhabits
6. **Messaging** — Your tagline, story, descriptions, and proof points
7. **Voice** — How you write, your style signatures, your guardrails
8. **Visual Identity** — Color, typography, imagery, and mark direction derived from everything above

Each phase builds on the last. You can stop and resume between sessions — the system picks up exactly where you left off.

## Getting Started

You'll need [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed.

```bash
git clone <repo-url>
cd knz-brand-compass
npm install
npm run dev
```

Then open Claude Code in the project directory and run:

```
/brand-compass:start
```

That begins onboarding. From there, the system guides you through each phase. A live dashboard runs in your browser showing your brand being assembled as you go — content cards for each phase, visual previews, and final deliverables.

### Speak Your Answers

Brand discovery works best when you talk rather than type. When you type, you edit yourself — filtering, polishing, second-guessing. When you speak, you get closer to how you actually think and communicate. That unfiltered voice is exactly what the system needs.

Use any dictation tool you have — [WhisperFlow](https://whisperflow.com), [Superwhisper](https://superwhisper.com), [Willow Voice](https://www.willowvoice.app), or the built-in macOS dictation (Fn key twice). Just talk through your answers. The system picks up on your real phrasing, rhythm, and vocabulary, which directly improves the quality of your messaging, bios, and voice guide.

## Commands

| Command | What It Does |
|---------|-------------|
| `/brand-compass:start` | Begin a new brand project |
| `/brand-compass:resume` | Pick up where you left off |
| `/brand-compass:export` | Package your final deliverables |
| `/brand-compass:verify` | Check deliverable quality before export |

Phase commands (`/brand-compass:phase-1-origin` through `/brand-compass:phase-8-toolkit`) are available if you need to jump to a specific phase, but in normal use the system advances automatically.

## License

Proprietary. Copyright Kenzie Creative.
