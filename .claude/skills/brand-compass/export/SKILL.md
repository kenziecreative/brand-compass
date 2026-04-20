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

Check all three bundles for completeness. Report each bundle separately.

### Client Package

Check that all 8 core deliverable files exist in `workspace/output/client/`:

1. `workspace/output/client/brand-foundation.md` — Brand Foundation (Markdown)
2. `workspace/output/client/brand-foundation.html` — Brand Foundation (HTML specimen)
3. `workspace/output/client/voice-guide.md` — Voice & Expression Guide (Markdown)
4. `workspace/output/client/voice-guide.html` — Voice & Expression Guide (HTML specimen)
5. `workspace/output/client/color-palette.html` — Color Palette (Interactive HTML)
6. `workspace/output/client/visual-system.html` — Visual System (HTML)
7. `workspace/output/client/ui-kit.html` — UI Kit (HTML with brand tokens)
8. `workspace/output/client/practical-toolkit.md` — Practical Toolkit (Markdown)

Also check for asset pack HTML specimens. Read `workspace/STATE.md` Client section for selected packs, and verify each has its corresponding HTML file (e.g., `workspace/output/client/pitch-deck.html`).

### Agent Skill Bundle

Check that all 5 files exist in `workspace/output/skill-bundle/`:

1. `workspace/output/skill-bundle/SKILL.md` — Agent skill definition
2. `workspace/output/skill-bundle/brand-prompt.md` — Brand prompt (flowing prose)
3. `workspace/output/skill-bundle/source/voice-rules.md` — Voice rules
4. `workspace/output/skill-bundle/source/guardrails.md` — Guardrails
5. `workspace/output/skill-bundle/source/language-bank.md` — Language bank

### Design Kit

Check that all 23 files exist in `workspace/output/design-kit/`:

**Token files (5):**
1. `workspace/output/design-kit/tokens/colors.css`
2. `workspace/output/design-kit/tokens/typography.css`
3. `workspace/output/design-kit/tokens/spacing.css`
4. `workspace/output/design-kit/tokens/tokens.json`
5. `workspace/output/design-kit/tokens/tailwind.config.js`

**Components (7):**
6. `workspace/output/design-kit/components/button.html`
7. `workspace/output/design-kit/components/card.html`
8. `workspace/output/design-kit/components/form-field.html`
9. `workspace/output/design-kit/components/nav.html`
10. `workspace/output/design-kit/components/modal.html`
11. `workspace/output/design-kit/components/alert.html`
12. `workspace/output/design-kit/components/badge.html`

**Previews (5):**
13. `workspace/output/design-kit/previews/colors.html`
14. `workspace/output/design-kit/previews/type.html`
15. `workspace/output/design-kit/previews/spacing.html`
16. `workspace/output/design-kit/previews/components.html`
17. `workspace/output/design-kit/previews/brand-groups.html`

**Root files (4):**
18. `workspace/output/design-kit/README.md`
19. `workspace/output/design-kit/package.json`
20. `workspace/output/design-kit/HANDOFF.md`
21. `workspace/output/design-kit/landing-page.html`

**Post-processed specimens (2):**
22. `workspace/output/design-kit/brand-foundation.html`
23. `workspace/output/design-kit/color-palette.html`

### Report Missing Files

For each bundle, report completeness with a count indicator:

"**Client Package — N/8 files** [+ M asset packs]"
"**Agent Skill Bundle — N/5 files**"
"**Design Kit — N/23 files**"

If any files are missing, attribute them to their owning bundle with actionable guidance:

"Missing from Client Package — run Document Assembler:
- [missing file path]

Missing from Agent Skill Bundle — run skill-bundle-packager:
- [missing file path]

Missing from Design Kit — run design-kit-foundation then design-kit-packager:
- [missing file path]"

Do NOT present a flat/unified missing list. Each missing file names its owning bundle.

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

**Client Package (8 files):**

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

[If asset packs were selected, list each pack's HTML specimen here]

**Agent Skill Bundle (5 files):**

| Document | Format | Location |
|----------|--------|----------|
| Skill Definition | MD | `workspace/output/skill-bundle/SKILL.md` |
| Brand Prompt | MD | `workspace/output/skill-bundle/brand-prompt.md` |
| Voice Rules | MD | `workspace/output/skill-bundle/source/voice-rules.md` |
| Guardrails | MD | `workspace/output/skill-bundle/source/guardrails.md` |
| Language Bank | MD | `workspace/output/skill-bundle/source/language-bank.md` |

**Design Kit (23 files):**

| Document | Format | Location |
|----------|--------|----------|
| Landing Page | HTML | `workspace/output/design-kit/landing-page.html` |
| README | MD | `workspace/output/design-kit/README.md` |
| Handoff Guide | MD | `workspace/output/design-kit/HANDOFF.md` |
| Package Config | JSON | `workspace/output/design-kit/package.json` |
| Brand Foundation | HTML Specimen | `workspace/output/design-kit/brand-foundation.html` |
| Color Palette | HTML Specimen | `workspace/output/design-kit/color-palette.html` |
| Token: Colors | CSS | `workspace/output/design-kit/tokens/colors.css` |
| Token: Typography | CSS | `workspace/output/design-kit/tokens/typography.css` |
| Token: Spacing | CSS | `workspace/output/design-kit/tokens/spacing.css` |
| Token: DTCG | JSON | `workspace/output/design-kit/tokens/tokens.json` |
| Token: Tailwind | JS | `workspace/output/design-kit/tokens/tailwind.config.js` |
| Component: Button | HTML | `workspace/output/design-kit/components/button.html` |
| Component: Card | HTML | `workspace/output/design-kit/components/card.html` |
| Component: Form Field | HTML | `workspace/output/design-kit/components/form-field.html` |
| Component: Nav | HTML | `workspace/output/design-kit/components/nav.html` |
| Component: Modal | HTML | `workspace/output/design-kit/components/modal.html` |
| Component: Alert | HTML | `workspace/output/design-kit/components/alert.html` |
| Component: Badge | HTML | `workspace/output/design-kit/components/badge.html` |
| Preview: Colors | HTML | `workspace/output/design-kit/previews/colors.html` |
| Preview: Typography | HTML | `workspace/output/design-kit/previews/type.html` |
| Preview: Spacing | HTML | `workspace/output/design-kit/previews/spacing.html` |
| Preview: Components | HTML | `workspace/output/design-kit/previews/components.html` |
| Preview: Brand Groups | HTML | `workspace/output/design-kit/previews/brand-groups.html` |

**Supporting Research:**
[List of research/draft files that exist]

**Brand Quick Reference:**
- Tagline: [tagline]
- Colors: [primary hex], [secondary hex], [accent hex]
- Fonts: [headline font] / [body font]
- Voice: [one-liner]

All files are in the project directory and visible in the dashboard at localhost.

The HTML specimens are self-contained — they can be opened in any browser and shared directly. The markdown files can be imported into any documentation system. The skill bundle is ready for Claude Code agents. The design kit is ready for designers and developers.

Your brand system is complete."

## Step 6: Final State Update

1. Update STATE.md:
   - Set Next Action: "Brand development complete. All deliverables exported."
   - Add Session Log entry noting export complete
2. Celebrate: "Congratulations — your brand system is built and ready to use. Every decision from belief to visual identity is documented and ready for implementation."
