# SRC-019: Design System Methodology — Tokens, Components, Patterns

**Source type:** Industry standards / Design methodology
**Credibility:** High (NNGroup, Material Design 3, Contentful, USWDS)
**Date accessed:** 2026-03-26
**Sources:** NNGroup Design Systems 101 (nngroup.com/articles/design-systems-101), Material Design 3 tokens (m3.material.io/foundations/design-tokens), Contentful design token system guide (contentful.com/blog/design-token-system), USWDS design tokens (designsystem.digital.gov/design-tokens)

## Key Findings

### Three-Tier Token Architecture

Material Design 3 codifies three classes of design tokens:

1. **Reference tokens** — all available values (the full palette). Example: `md.ref.palette.secondary90` → `#E8DEF8`
2. **System tokens** — decisions and roles that give the system its character. Example: `md.sys.color.secondary-container` → points to a reference token
3. **Component tokens** — design properties assigned to specific elements. Example: button icon color → points to a system token

This three-tier architecture enables cascading changes: update a reference token and it propagates through system tokens to component tokens across all products.

### Contentful's Parallel Taxonomy

Contentful uses similar but differently named tiers:
1. **Primitive tokens** — raw values (colors, sizes)
2. **Semantic tokens** — purpose-based naming (error-color, primary-action)
3. **Component tokens** — specific to individual UI elements (button-primary-background)

Both taxonomies converge on the same principle: **abstraction layers that separate value from meaning from application**.

### Design System = More Than Components

NNGroup defines a design system as containing:
- **Style guides** — visual design, content, branding documentation
- **Component library** — individual UI elements with states, attributes, code
- **Pattern library** — reusable groupings of components (page header, form layout)
- **Design-system team** — governance, maintenance, evolution

Key distinction from Brand Compass: a design system is a *living tool* maintained by a team. Brand Compass produces *deliverables* that snapshot brand decisions at a point in time.

### Token Format Standards

USWDS and Material both use structured token formats that are tool-agnostic:
- JSON files for portability
- Named variables in Sass/CSS for implementation
- Helper functions/mixins for consumption in code

The W3C Design Token Community Group (DTCG) format (referenced in Phase 4 SRC-015) is the emerging standard.

### Relevance to Brand Compass

Brand Compass currently produces:
- CSS custom properties in the UI Kit HTML (implementation-level)
- Color values, font stacks, spacing units in visual system HTML (reference-level)

What it does NOT produce:
- **Semantic token layer** — mapping brand decisions to purposes (e.g., "primary action color" → specific hex)
- **Portable token file** — JSON/DTCG format that tools like Figma, Style Dictionary, or Penpot can consume
- **Component token layer** — rarely needed for brand engagements, more relevant to product teams

The highest-value addition would be the **semantic layer**: a structured mapping from brand personality/strategy → visual decisions → named purposes. This is what makes "apply brand systematically" possible beyond copy-pasting hex codes.

## Findings Tags

- **SUPPORTED** — Three-tier token architecture is well-established across major design systems (Material, USWDS, IBM Carbon per SRC-015)
- **EMERGING** — DTCG standard for portable tokens is the direction but not yet universally adopted
- **COMPLICATED** — Full design system methodology is overkill for most brand engagements; the semantic token layer is the transferable piece

## Cross-References

- SRC-015 (Phase 4): Design tokens and DTCG format identified as deliverable gap
- Phase 4 output: recommended DTCG JSON export as medium-high priority addition
