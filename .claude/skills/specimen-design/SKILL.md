---
name: specimen-design
description: "Design guide for creating brand specimens — HTML deliverables that feel like they belong to a specific brand, not like generic templates. Codifies the patterns, techniques, and quality standards that distinguish a brand specimen from a design system document. Read this before generating any HTML output file."
---

# Specimen Design Guide

A brand specimen is a document that expresses the brand through its own structure — not just by swapping colors and fonts into a template, but by making structural design decisions (spacing, hierarchy, layout, voice, section types) that feel like the brand. This guide codifies what makes that work.

## The Distinction

| Design System Document | Brand Specimen |
|----------------------|----------------|
| Lists colors with hex values | Shows colors in UI context — "here's what a card looks like with this background" |
| Names fonts | Shows fonts doing real work — prose paragraphs, UI labels, quotes |
| Describes components | Demonstrates components with usage guidance — "use this when..." |
| Treats all elements equally (flat grid) | Uses visual hierarchy — the lead color gets more space, the primary archetype gets a featured card |
| Neutral, instructional prose | Brand voice woven throughout — descriptions that sound like the brand |
| Shows what exists | Explains why decisions were made — rationale blocks connecting choices back to strategy |
| Stops at specification | Includes mood/world sections — the emotional territory the brand inhabits |

## Section Types Inventory

Every HTML specimen should draw from these section types. Not every file uses all of them, but a specimen that uses none of them is just a template.

### 1. Rationale Blocks
A card or callout that explains WHY a decision was made, connecting it back to the brand's strategy, personality, or positioning.

**Example:** "The Warm + Clear Tension" — a card in the typography section explaining why the font pairing was chosen: display font brings warmth and personality, body font brings clarity and precision, and the tension between them IS the brand.

**When to use:** Font pairing rationale, color palette philosophy, mark concept, imagery style. Anywhere a strategic choice was made that isn't self-evident.

**CSS pattern:** Styled card with subtle background, brand accent border or accent color label. Set apart from the surrounding content. Not a footnote — a featured element.

### 2. Usage Guidelines
Per-element cards that say "use this for..." and "don't use this for..." — turning a swatch or component from a reference into a tool.

**Example:** Six cards in a color palette, one per color: "Use walnut as the primary text color and dominant surface tone. It grounds the visual hierarchy. Avoid using walnut on walnut — low contrast pairings undermine readability."

**When to use:** Colors, components, typography weights, spacing patterns. Anywhere the user needs to make a decision about which element to reach for.

**CSS pattern:** Grid of cards, each tied to the element it describes (use the color as an accent on its own card). Concise — 2-3 sentences max per card.

### 3. Color Pairings in UI Context
Cards that show foreground/background combinations not as abstract swatches, but as miniature UI mockups — a nav bar, a card, a button, a form.

**Example:** "Workshop Default" — a card showing walnut text on cream background with olive accents, rendered as a tiny dashboard snippet. "Dark Mode" — cream text on walnut with amber highlights. "Action Focus" — rust buttons on white with olive supporting elements.

**When to use:** Color palette specimens. Show 3-5 context scenarios that demonstrate how the palette works in real interfaces, not just as paired squares.

**CSS pattern:** Cards with actual mini-layouts inside them. Use the same component patterns from the UI kit (buttons, cards, nav elements) at small scale. Each card represents a usage scenario with a label.

### 4. Do's and Don'ts
Side-by-side visual examples showing correct vs incorrect usage. The "don't" should be a real mistake someone would make, not an absurd strawman.

**Example:** Typography do's/don'ts — "DO: Use Bitter for headlines at 600+ weight" with a correctly rendered example. "DON'T: Use Bitter for body text at 400 weight — it's too heavy for long reading." Both rendered in actual type, not described.

**When to use:** Typography, color, mark usage, component patterns. Anywhere there's a common misuse that would weaken the brand.

**CSS pattern:** Two-column layout (or stacked on mobile). Green/check accent for "do," red/x accent for "don't." Both examples rendered visually, not just described in text. Keep the examples small and focused — one concept per pair.

### 5. Visual Hierarchy
Not every element in a grid should be the same size. The primary color gets a wider card. The lead archetype gets a featured section. The tagline gets a pull-quote treatment. Visual hierarchy signals importance.

**Example:** In a color palette, the primary brand color card spans 2 columns while accent colors each get 1 column. This immediately tells the viewer which color is dominant without reading a word.

**When to use:** Color grids, personality trait lists, archetype displays, any collection where some items are more important than others.

**CSS pattern:** CSS grid with `span 2` for featured items. Alternatively, a "hero" card at full width followed by a grid of smaller cards. The hierarchy should match the brand's hierarchy — primary color, primary archetype, core belief all get featured treatment.

### 6. Mood / Brand World Sections
A section that captures the emotional territory of the brand — not what the brand IS, but what it FEELS LIKE. Often uses visual elements (gradients, SVGs, ambient backgrounds) rather than component demos.

**Example:** "The Workshop Mood" — a section with an SVG compass, a gradient background blending the brand's earth tones, and prose describing the brand world: "The compass needle pointing north. A workshop where analog wisdom meets digital capability."

**When to use:** Color palette (palette mood), brand foundation (brand world), visual system (imagery world). One per document max — it's a capstone, not a repeated pattern.

**CSS pattern:** Full-width section with atmospheric treatment. Gradient backgrounds using the brand palette. SVG illustrations if the brand has a mark. Centered text with generous spacing. This section should feel different from the structured sections above it — a moment of breathing room.

### 7. Progressive Size Demonstrations
Show the same element at multiple sizes to demonstrate how it adapts — especially for marks, icons, and type.

**Example:** The primary mark shown at 120px, 64px, 48px, 32px, 16px — with the SVG progressively simplifying at smaller sizes (detail removed, strokes thickened).

**When to use:** Mark/logo section, favicon/app icon section, type scale section.

**CSS pattern:** Horizontal row with items at actual rendered sizes (use real dimensions, not scaled). Label each size. Show on both light and dark backgrounds if the mark has light/dark variants.

### 8. Real Content Examples
Use actual brand content (from the brand's own messaging, boilerplates, or voice guide) rather than lorem ipsum or generic placeholder text. The specimen should demonstrate the brand's voice, not just its visual system.

**Example:** Typography prose section uses a paragraph from the brand's core narrative, a pullquote from their contrarian POV, and list items from their proof points — all set in the brand's type system.

**When to use:** Typography specimens, voice guide examples, brand foundation callouts. Anywhere text appears, use real brand text.

## CSS Techniques

### Achieving Design Soul Without JavaScript

The Kenzie specimens achieve their quality with pure CSS — no JavaScript for visual effects. Techniques:

- **CSS gradients** for mood sections: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`
- **CSS grid with span** for visual hierarchy: `grid-column: span 2`
- **SVG inline** for marks and decorative elements (not external files — keeps specimens self-contained)
- **CSS custom properties** for all brand tokens — colors, fonts, spacing, radii
- **Hover states** using CSS transitions for interactive feel without JS
- **`::before` / `::after` pseudo-elements** for decorative borders, accent bars, and geometric details
- **`border-left` accent bars** on cards and callouts (3-4px solid in a brand color)

### Pre-render What You Can

The current reference templates use JavaScript to compute tint scales, contrast ratios, and render color grids dynamically. This adds complexity without adding value — the tints and ratios are knowable at generation time. Pre-render them as static HTML. Save JavaScript for genuinely interactive features (click-to-copy, dark mode toggle if the brand warrants it).

### Self-Contained Files

Every HTML specimen must be a single self-contained file:
- All CSS in a `<style>` block in `<head>`
- No external stylesheets (except Google Fonts links)
- SVGs inline, not linked
- No external JS dependencies
- Works when opened directly in a browser (file://)

## Prose Voice

Descriptions in specimens should sound like the brand, not like a manual. The Document Assembler should draw from the client's voice guide to write section intros and descriptions.

**Generic (bad):** "The following colors constitute the brand's primary palette. Each color serves a specific function within the visual system."

**Brand-voiced (good):** "Six colors. Each one earned its place. Navy carries the weight of authority — it's what a compliance audit looks like when it knows what it's doing. Teal is the handshake color — it says 'let's get this done.' Coral only speaks when something actually matters."

The voice doesn't need to be extreme or performative. It just needs to not be generic. Draw from the brand's personality traits and voice tags.

## Per-File Checklist

### color-palette.html
- [ ] Full palette overview (all colors at a glance)
- [ ] Primary colors with visual hierarchy (lead color featured)
- [ ] Accent/secondary colors as distinct section
- [ ] Usage guidelines per color (when to use, when not to)
- [ ] Color pairings in real UI context (3-5 scenario cards)
- [ ] Contrast & accessibility ratios
- [ ] Tint scales (50-900 for each chromatic color)
- [ ] CSS custom properties block (copyable)
- [ ] Palette mood section (emotional territory)
- [ ] Brand-voiced descriptions throughout

### visual-system.html
- [ ] Font overview with rationale (why this pairing)
- [ ] Full type scale (10+ levels, rendered)
- [ ] Weight specimens for all fonts
- [ ] Prose examples using real brand content
- [ ] Quotes & callouts (pullquote, blockquote)
- [ ] UI typography (buttons, labels, nav, tabs)
- [ ] Line height comparison (tight/normal/loose)
- [ ] Type on color (4+ background variants)
- [ ] Do's and don'ts for typography
- [ ] Mark at progressive sizes
- [ ] Lockup variants on multiple backgrounds
- [ ] Header simulations (light/dark)
- [ ] Favicon/app icon at multiple sizes
- [ ] Clear space rules (visual)
- [ ] Imagery style with subject guidelines

### ui-kit.html
- [ ] Full CSS custom properties block
- [ ] Buttons: multiple brand colors, secondary, ghost, sizes, disabled
- [ ] Form elements: inputs, selects, textareas, checkboxes, radios, toggles, error/success states
- [ ] Cards: simple, with image, with footer
- [ ] Badges/tags in brand color variants
- [ ] Alerts: info/success/warning/error with icons
- [ ] Navigation: tabs, pills, breadcrumbs
- [ ] Content list items with pattern rules
- [ ] Tooltips
- [ ] Progress indicators
- [ ] Dividers
- [ ] Pattern rules per component (when/how to use)

### brand-foundation.html
- [ ] Brand-voiced section intros
- [ ] Core belief as featured callout
- [ ] Positioning statement as pull quote
- [ ] Tagline as featured display element
- [ ] Key decisions highlighted (not buried in prose)
- [ ] Discovery moment callouts where relevant
- [ ] Visual hierarchy between sections

### voice-guide.html
- [ ] Voice tags as styled pills/badges
- [ ] Do/don't examples with visual treatment (green/red)
- [ ] Signature moves as featured cards with frequency indicators
- [ ] Real before/after writing examples
- [ ] Scaling spectrum (short-form → long-form) as visual scale
- [ ] Guardrails as warning-styled cards
- [ ] Brand-voiced throughout (this document practices what it preaches)

### Asset pack specimens
- [ ] Visual mockups using CSS (not just text specs)
- [ ] Concrete dimensions rendered at scale where possible
- [ ] Same brand tokens (custom properties) as core files
- [ ] Usage guidance per template/component
- [ ] Brand personality expressed through structural CSS
