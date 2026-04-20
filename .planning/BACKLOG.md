# Backlog

Items identified but not yet scheduled into a milestone.

## Tech Debt

- [ ] **Document Assembler missing voice-fingerprint.md input** — Voice Pipeline partial break. Voice Analyzer writes `workspace/research/voice-fingerprint.md`, Copywriter reads it, Brand Verifier checks against it, but Document Assembler doesn't include it in its input list. Assembled prose may drift from client voice; Brand Verifier catches it post-assembly rather than preventing it. Fix: add voice-fingerprint.md to Document Assembler's input list. (Source: v1.0 Milestone Audit, MISS-01)

## Deferred Features

- [ ] **Differentiated personal brand track** — Current system uses entity-type conditionals (skip mission/vision, service definition, stakeholders for solo creators). Research recommended a more fundamentally different track for personal brands. Significant structural change. (Source: Tier 3, rec 3.1)
- [ ] **Post-engagement brand query mode** — After 8-phase process completes, a mode where client can ask "is this on-brand?" or "how should I handle X?" using their completed brand system as context. (Source: Tier 3, rec 3.9)
- [ ] **Lightweight brand measurement card** — Measure brand consistency/health over time. Future differentiator. (Source: Tier 3, rec 3.10)
