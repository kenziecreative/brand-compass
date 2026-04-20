---
name: export
description: Export Brand Package
disable-model-invocation: true
---

# Export Brand Package

You are the Lead Brand Strategist packaging the final brand deliverables for the client.

## Step 1: Check Prerequisites

Read `workspace/STATE.md`. Phase 8 must be complete. If not:

"Export requires Phase 8 (Toolkit Assembly) to be complete. Your brand documents need to be assembled first. Run `/brand-compass:phase-8-toolkit` to compile your deliverables."

Stop.

## Step 2: Verify All Output Files

Check that all core deliverable files exist in the `workspace/output/client/` directory:

1. `workspace/output/client/brand-foundation.md` — Brand Foundation (Markdown)
2. `workspace/output/client/brand-foundation.html` — Brand Foundation (HTML specimen)
3. `workspace/output/client/voice-guide.md` — Voice & Expression Guide (Markdown)
4. `workspace/output/client/voice-guide.html` — Voice & Expression Guide (HTML specimen)
5. `workspace/output/client/color-palette.html` — Color Palette (Interactive HTML)
6. `workspace/output/client/visual-system.html` — Visual System (HTML)
7. `workspace/output/client/ui-kit.html` — UI Kit (HTML with brand tokens)
8. `workspace/output/client/practical-toolkit.md` — Practical Toolkit (Markdown)

Also check for asset pack HTML specimens. Read `workspace/STATE.md` Client section for selected packs, and verify each has its corresponding HTML file (e.g., `workspace/output/client/pitch-deck.html`).

If any are missing, flag them:

"The following deliverables are missing:
- [missing file] — [what it should contain]

Would you like me to regenerate these? I can have the Document Assembler rebuild them."

If files need regeneration, launch the Document Assembler for the missing items.

## Step 3: Verify Content Quality

Read each output file and verify:
- **brand-foundation.md/html** contains: Core Belief, Audience, Positioning, Messaging Architecture, Brand Personality
- **voice-guide.md/html** contains: Voice Summary, Writing Style, Signature Moves, Guardrails, Scaling by Context
- **color-palette.html** contains: All brand colors with hex values, tint scales (50-900), CSS custom properties
- **visual-system.html** contains: Typography system, imagery style, mark/logo, templates
- **ui-kit.html** contains: Component patterns using the client's brand tokens

Flag any content gaps.

## Step 4: Check Supporting Files

Verify that research and draft files are preserved:
- `workspace/research/content-audit.md` (if Content Auditor was used)
- `workspace/research/competitive-brief.md` (if Research Analyst was used)
- `workspace/research/archetype-assessment.md` (from Phase 4)
- `workspace/research/voice-fingerprint.md` (from Phase 6)
- `workspace/drafts/messaging-options.md` (from Phase 5)
- `workspace/drafts/visual-direction.md` (from Phase 7)
- Any assets in `workspace/assets/`

## Step 5: Present Export Summary

"**Brand Package Ready**

**Client:** [Client Name]

**Core Deliverables (8 files):**

| Document | Format | Location |
|----------|--------|----------|
| Brand Foundation | Markdown | `workspace/output/client/brand-foundation.md` |
| Brand Foundation | HTML Specimen | `workspace/output/client/brand-foundation.html` |
| Voice & Expression Guide | Markdown | `workspace/output/client/voice-guide.md` |
| Voice & Expression Guide | HTML Specimen | `workspace/output/client/voice-guide.html` |
| Color Palette | Interactive HTML | `workspace/output/client/color-palette.html` |
| Visual System | HTML | `workspace/output/client/visual-system.html` |
| UI Kit | HTML | `workspace/output/client/ui-kit.html` |
| Practical Toolkit | Markdown | `workspace/output/client/practical-toolkit.md` |

[If asset packs were selected, also list each pack's HTML specimen]

**Supporting Research:**
[List of research/draft files that exist]

**Brand Quick Reference:**
- Tagline: [tagline]
- Colors: [primary hex], [secondary hex], [accent hex]
- Fonts: [headline font] / [body font]
- Voice: [one-liner]

All files are in the project directory and visible in the dashboard at localhost.

The HTML specimens are self-contained — they can be opened in any browser and shared directly. The markdown files can be imported into any documentation system.

Your brand system is complete."

## Step 6: Final State Update

1. Update STATE.md:
   - Set Next Action: "Brand development complete. All deliverables exported."
   - Add Session Log entry noting export complete
2. Celebrate: "Congratulations — your brand system is built and ready to use. Every decision from belief to visual identity is documented and ready for implementation."
