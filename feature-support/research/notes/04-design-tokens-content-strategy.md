# SRC-015: Design Tokens & Content Strategy in Brand Deliverables

**Source:** W3C DTCG Specification 2025.10 (designtokens.org), IBM Carbon Design System (carbondesignsystem.com), Google Material Design 3 (m3.material.io), Terrazzo DTCG guide (terrazzo.app), Sutter Group design systems agency (sutter-group.com), Superside design system agencies survey (superside.com), Reddit r/DesignSystems discussion on brand drift, Reddit r/branding discussion on agency consistency processes, Contentful design token guide (contentful.com), Penpot design tokens guide (penpot.app), Nutrient design tokens guide (nutrient.io), Hike One / Signify Photon multi-brand system (hike.one), Design Systems Collective — "Design Tokens: The Missing Link" (designsystemscollective.com), Convertiv Handoff tool (thenewstack.io), tianpan.co forum on DTCG adoption 2026, Canny Creative branding deliverables list (canny-creative.com), StoryChief content strategy deliverables (storychief.io), Fandarama — "Three Pillars of Brand" (fandarama.com), Monarch Social Media — content pillars and brand voice (monarchsocialmedia.com), Bazaarvoice content pillars guide, Vasava brand territories (vasava.es), Scribalo brand territories (scribalo.com), iO Digital content strategy methodology (iodigital.com), Sprinklr brand voice strategy (sprinklr.com), emfluence content strategy vs. content marketing (emfluence.com), Content Marketing Institute — brand voice steps (contentmarketinginstitute.com), Ben Guttmann brand territory mapping (benguttmann.com)
**Type:** Design systems / Content strategy
**Credibility:** High for design tokens (W3C specification, major design systems with public documentation, practitioner accounts). Moderate-high for content strategy (agency practice descriptions, marketing platform guides, limited academic sources).
**Date Accessed:** 2026-03-26
**Phase:** 4 — Deliverable Audit
**Research Questions Addressed:** Phase 4 Q3 (design tokens), Phase 4 Q5 (content strategy layer), Phase 5 Q2 (design system methodology), Phase 5 Q3 (content strategy frameworks)

---

## Key Findings — Design Tokens

### 1. Token Categories Are Well-Standardized

The DTCG specification (stable as of October 2025) and major design systems converge on a consistent set of token categories:

| Category | Examples | DTCG Type |
|----------|----------|-----------|
| **Color** | Brand primary, text, surface, border, interactive states | `color` |
| **Typography** | Font family, weight, size, line height, letter spacing (composite) | `typography`, `fontFamily`, `fontWeight`, `dimension` |
| **Spacing** | Padding, margin, gap (scale-based: 4px, 8px, 16px, 24px...) | `dimension` |
| **Border** | Width, radius, style | `border`, `dimension`, `strokeStyle` |
| **Shadow** | Elevation levels (offsetX, offsetY, blur, spread, color) | `shadow` |
| **Motion/Duration** | Animation timing, easing curves | `duration`, `cubicBezier`, `transition` |
| **Gradient** | Color stops with positions | `gradient` |
| **Number** | Opacity, aspect ratios | `number` |

IBM Carbon organizes tokens into: color, spacing, typography, global, and component-specific. Material Design 3 uses three tiers: reference tokens (raw values), system tokens (semantic roles), and component tokens (specific UI elements).

### 2. Three-Layer Token Architecture Is Industry Standard

Every major system and the DTCG specification itself use a three-layer model:

1. **Primitive/Reference tokens** — Raw values: `blue-60: #0f62fe`, `spacing-05: 16px`
2. **Semantic/System tokens** — Role-based names: `color-text-primary`, `spacing-component-padding`
3. **Component tokens** — Context-specific: `button-background`, `card-padding`, `input-border-radius`

This is important for Brand Compass: a brand engagement naturally produces **layer 1** (the raw palette, font choices, spacing units) and could reasonably produce **layer 2** (semantic mappings like "primary," "secondary," "background," "text"). Layer 3 is design-system territory and outside a brand engagement scope.

### 3. The W3C DTCG Standard Is Now Stable and Adopted

The DTCG v1.0 specification reached stable status in October 2025. Key facts:

- JSON-based format with `$value`, `$type`, and `$description` properties
- Supports theming and multi-brand without file duplication
- Full support for modern color spaces (Display P3, Oklch, CSS Color Module 4)
- More than 10 design tools (Figma, Sketch, Framer, Penpot, Tokens Studio, zeroheight) are implementing the standard
- Contributors include Adobe, Amazon, Google, Meta, Salesforce, and Shopify
- Enterprise customers now demand DTCG support in procurement RFPs (per practitioner accounts)
- Style Dictionary is the dominant transformation tool (JSON tokens to platform-specific code)

### 4. Brand Agencies Are NOT Delivering Tokens — But the Gap Is Closing

Current state of practice:

- **Traditional brand agencies** deliver static specs: hex codes, font names, pixel values in PDF brand guidelines. No token output.
- **Design system agencies** (Sutter Group, DOOR3, Superside) explicitly deliver design tokens as part of their design system engagements. Sutter Group lists "Color, spacing, typography, and elevation tokens structured so developers can implement and maintain visual consistency in code" as a standard deliverable.
- **The gap:** Brand agencies define the *decisions* (this blue, this font, this spacing feel), but leave the *tokenization* to internal design system teams or developers who translate the brand guide into code. A Reddit practitioner notes: "Design tokens won't fix brand consistency if the real problem is governance... The tokens live in a design system that only reaches 30% of brand touchpoints."
- **Emerging bridge tools:** Convertiv's Handoff tool and Tokens Studio extract tokens from Figma files, suggesting the translation from brand decisions to tokens is being automated. A brand engagement that delivers Figma files with properly named variables is already halfway to a token system.

### 5. A Lightweight Token Output Makes Sense for Brand Engagements

There is a viable middle ground between "static hex values in a PDF" and "full design system token architecture":

**What a brand engagement could deliver:**
- Primitive tokens: complete color palette with scale (50-900), font stacks, spacing unit, border radius, shadow definitions — as a JSON file in DTCG format
- Semantic tokens: role mappings (primary, secondary, background, surface, text-primary, text-secondary, accent, error, success) — as JSON
- CSS custom properties file: the same tokens as `--color-brand-primary: #0f62fe` ready to paste into any project

**What stays out of scope:**
- Component tokens (button-background, card-padding) — requires component design decisions
- Platform-specific outputs (Swift, Kotlin, Flutter) — requires build pipeline
- Token governance, versioning, deprecation workflows

This is exactly what Brand Compass's UI Kit HTML specimen partially does (it generates CSS custom properties), but it could be made more explicit and portable by also outputting a standalone `brand-tokens.json` file in DTCG format.

### 6. Motion Tokens Are a Distinct Gap

IBM Carbon defines motion tokens: `duration-fast-01` (70ms), `duration-fast-02` (110ms), `duration-moderate-01` (150ms), etc., plus easing curves (`motion(standard, productive)`, `motion(entrance, expressive)`). Material Design 3 includes motion as a core system-level token category.

Brand Compass currently has no motion direction output. This is a confirmed gap per research plan Phase 4 Q2.

---

## Key Findings — Content Strategy

### 1. Content Strategy Is Typically a Separate Engagement — But the Boundary Is Blurry

The industry consensus:

- **Brand engagement:** Produces brand voice, messaging architecture, core narrative, boilerplates, proof points. Defines *how the brand sounds* and *what the brand says about itself*.
- **Content strategy engagement:** Produces content pillars, editorial calendar, channel strategy, content-to-audience mapping, distribution plan, measurement framework. Defines *what the brand publishes* and *where/when*.
- **The overlap zone:** Content pillars, content territories, and channel voice guidelines sit in the overlap. Multiple sources describe these as either brand deliverables or content strategy deliverables depending on the agency.

Fandarama explicitly positions content as the third pillar alongside strategy and design: "A brand is not a logo. It is not a strategic document. It is not your publication calendar. A brand is the coherent experience you build every time someone encounters you, anywhere, in any format."

### 2. Content Pillars Are the Natural Bridge Between Brand Voice and Content Strategy

Content pillars are the thematic categories that organize all content a brand produces. The consistent definition across sources:

- **Content pillars tell you WHAT to talk about.** Brand voice tells you HOW to talk about it.
- Pillars derive directly from brand positioning (Phase 3), audience needs (Phase 2), and core belief (Phase 1).
- Typical count: 3-5 pillars per brand.
- Each pillar generates subtopics that can populate an editorial calendar.

Monarch Social Media: "Your pillars help you decide what to say. Your voice helps you decide how to say it. Together, they give your team a clear direction."

Bazaarvoice: "While brand pillars are different from content pillars, the former should be the engine that's driving the latter. This means your content pillars should align with your brand's values and identity."

### 3. Content Territories Are a Brand-Level Concept, Not Just Content Strategy

Content territories (also called "brand territories") define the thematic spaces a brand has permission and credibility to occupy. This is distinct from content pillars:

- **Content territories** = the conceptual space the brand owns (e.g., "accessible design education," "creative entrepreneurship," "sustainable craft")
- **Content pillars** = the operational categories within those territories (e.g., within "accessible design education": tutorials, case studies, tool reviews, industry commentary)

Vasava defines brand territories as "the thematic areas and interests the brand can explore and dominate." Scribalo emphasizes territories set "the topics of your content plan without deviating from the objective."

**Brand Compass already partially addresses this** — Phase 3 covers "territory" (Q7-Q9: "What word or phrase do you want associated with your name?") and Phase 8 Toolkit includes "Content Territories" as a deliverable. However, the current Content Territories output is described as pulling from "Phase 3 + 4 → topics owned, contributed to, avoided" — this is territory definition but lacks the bridge to operational content planning.

### 4. The Lightweight Version That Belongs in a Brand System

A brand engagement should produce the *strategic layer* of content strategy without becoming a full content strategy engagement:

**Belongs in brand scope (Brand Compass should deliver):**
- **Content territories** (3-5 thematic spaces the brand owns, contributes to, avoids) — *already in Phase 8*
- **Content pillars** (3-5 operational categories derived from territories) — *not currently explicit*
- **Channel-voice matrix** (how voice adapts across platforms: newsletter vs. social vs. website) — *partially covered in Phase 6 scaling questions*
- **Content do's and don'ts** (topic guardrails derived from anti-audience and brand values) — *partially in voice guardrails*

**Stays in content strategy scope (out of brand engagement):**
- Editorial calendar / posting cadence
- SEO keyword strategy
- Content production workflow
- Performance metrics and analytics framework
- Content funnel mapping (awareness/consideration/decision)
- Content repurposing strategy

### 5. The "Three Pillars" Model — Strategy, Design, Content — Is Gaining Traction

Multiple sources describe brand as an integrated system of three elements:
1. **Strategy** — positioning, audience, beliefs, values (Brand Compass Phases 1-3)
2. **Design** — visual identity, typography, color, imagery (Brand Compass Phase 7)
3. **Content** — voice, messaging, content territories, pillars (Brand Compass Phases 5-6, partially Phase 8)

This suggests Brand Compass's Phase 8 Toolkit is the right place to bridge from voice/messaging into actionable content direction, but it could be more structured. The current Content Territories deliverable could be expanded into a proper "Content Direction" section that includes territories, pillars, and a channel-voice matrix.

### 6. Brand Voice Guidelines Now Include Content Architecture

Modern brand voice guides from enterprise brands go beyond "voice attributes" and "do/don't" lists. Sprinklr describes a "voice-first content strategy" that "defines personality traits and communication standards before content is created." The Content Marketing Institute emphasizes that brand voice acts as a "decision filter, shaping what is said and how it's expressed across every format, channel, and department."

This aligns with what Brand Compass Phase 6 already does well — but the gap is in making the output *operational*. A voice guide that says "we are bold, clear, and human" is less useful than one that says "on LinkedIn, we lead with contrarian takes in 2-3 sentences; on email, we open with a personal story; on the website, we lead with the transformation statement."

---

## Raw Evidence

### Design Tokens

**W3C DTCG announcement (Oct 2025):** "The Design Tokens Community Group today announced the first stable version of the Design Tokens Specification (2025.10), marking a milestone for design systems teams and tool makers worldwide. After years of collaborative development, the specification provides a production-ready, vendor-neutral format for sharing design decisions across tools and platforms."

**W3C DTCG co-chair Kaelig Deloumeau-Prigent:** "The specification unlocks interoperability across design tools and code. Design systems teams can now maintain one source of truth that works everywhere — from design to production code across iOS, Android, and web."

**DTCG types defined in spec:** Color, Dimension, Font Family, Font Weight, Duration, Cubic Bezier, Number, Stroke Style, Border, Transition, Shadow, Gradient, Typography (composite).

**Practitioner on DTCG adoption (tianpan.co, 2026):** "I'm seeing enterprise customers demand DTCG support in procurement. 'Does your tool support W3C design tokens?' is now a checkbox in RFPs. That's how standardization gets enforced — through buyer power."

**Reddit r/DesignSystems on governance gap:** "Spent the last year watching multiple companies implement token-based design systems. Beautiful Figma setups. Clean export pipelines. Tokens for everything. Brand drift still happened... Marketing teams, sales decks, and regional offices don't touch Figma. They work in Canva, Google Slides, and random local tools. The tokens live in a design system that only reaches 30% of brand touchpoints."

**Sutter Group (design system agency) deliverables:** "Design Tokens: Color, spacing, typography, and elevation tokens structured so developers can implement and maintain visual consistency in code."

**Jina Anne (Salesforce, origin of the term):** "The design token is the tiniest element of the design system. Design tokens are named entities that store visual design attributes in an agnostic, human-readable abstraction of visual styles that sync with all the style files in the system."

**IBM Carbon token categories:** Color (with layering model: `$layer-01`, `$layer-02`, `$layer-03`), spacing (`$spacing-01` through `$spacing-13`, from 2px to 160px), typography (universal, productive, editorial, additional), motion (`duration-fast-01` 70ms through `duration-slow-02` 700ms), global tokens.

**Material Design 3 token tiers:** "1. Reference tokens — All available tokens with associated values. 2. System tokens — Decisions and roles that give the design system its character. 3. Component tokens — The design properties assigned to elements in a component."

**Convertiv Handoff tool:** "Figma has a really robust API, but there's no way in Figma's API to tell the difference between what are meaningful design decisions — like, this should be a blue color button — and what's just human-readable text. What our plugin is designed to do is give semantic meaning to the Figma file." Output formats include CSS custom properties, Bootstrap, Tailwind, and W3C style dictionary format.

### Content Strategy

**Monarch Social Media on pillars + voice:** "Your pillars help you decide what to say. Your voice helps you decide how to say it. Together, they give your team a clear direction, reduce creative overwhelm, and make your brand instantly more recognizable."

**Bazaarvoice on brand vs. content pillars:** "While brand pillars are different from content pillars, the former should be the engine that's driving the latter."

**Fandarama on brand as three-pillar system:** "A brand is not a logo. It is not a strategic document. It is not your publication calendar. A brand is the coherent experience you build every time someone encounters you, anywhere, in any format."

**Sprinklr on voice-first content strategy:** "A voice-first content strategy defines personality traits and communication standards before content is created, so every piece reinforces one recognizable brand."

**Vasava on brand territories:** "Identifying relevant territories: Determining the thematic areas and interests the brand can explore and dominate. Developing attractive content: Creating content that reinforces the brand's territories and resonates with the audience."

**Scribalo on territories and content planning:** "Set the topics of your content plan without deviating from the objective. Convey your message effectively. Carry out marketing activities in line with your brand."

**iO Digital on methodology:** Discovery phase maps current content state, planning phase "starts by establishing the brand purpose and the brand pillars that we want to convey to the target audience," then adds "content themes and sections to make the brand pillars tangible."

**emfluence on strategy vs. marketing:** "Content strategy is the plan and the foundation for everything you create. It defines your audience, the problems you're solving, your tone, and the goals you want your content to achieve. A strong strategy connects brand positioning to content themes."

**Canny Creative on branding deliverables:** Content strategy items (social templates, lead magnets, editorial planning) are listed as separate from core branding deliverables but noted as adjacent services many agencies offer.

---

## Tags

| Finding | Tag |
|---------|-----|
| Token categories standardized across major systems | SUPPORTED |
| Three-layer token architecture (primitive/semantic/component) is industry standard | SUPPORTED |
| DTCG W3C specification is stable and broadly adopted | SUPPORTED |
| Brand agencies do not currently deliver tokens as standard practice | SUPPORTED |
| Design system agencies deliver tokens as standard deliverable | SUPPORTED |
| A lightweight token output (primitive + semantic JSON, CSS custom properties) is feasible for brand engagements | EMERGING |
| Brand Compass UI Kit partially delivers tokens via CSS custom properties | SUPPORTED |
| Motion tokens are a gap in Brand Compass | SUPPORTED |
| Content strategy is typically a separate engagement from brand strategy | SUPPORTED |
| Content pillars bridge brand voice and content operations | SUPPORTED |
| Content territories are a brand-level concept | SUPPORTED |
| Brand Compass already covers content territories in Phase 8 | SUPPORTED |
| Brand Compass lacks explicit content pillars as a deliverable | GAP |
| Channel-voice matrix is partially covered but not formalized | GAP |
| "Three pillars" model (strategy, design, content) gaining traction | EMERGING |
| Modern voice guides include operational content architecture | EMERGING |
