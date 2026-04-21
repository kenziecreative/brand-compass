# Phase 12: Design Kit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-20
**Phase:** 12-design-kit
**Areas discussed:** Component personality, Preview card content, Landing page specimen, Agent responsibility split

---

## Component Personality

| Option | Description | Selected |
|--------|-------------|----------|
| Fully branded (Recommended) | Apply Component Personality decisions from visual-direction.md (button fills, badge radius, hover states, accent borders). Comment blocks mark what's brand-driven vs. structural. | ✓ |
| Neutral / token-only | Components reference token variables only. No behavioral opinions from Component Personality section. Designer derives brand expression from tokens alone. | |

**User's choice:** Fully branded
**Notes:** Advisor research found that visual-direction.md already has a Component Personality section (Section 8) defining per-component behavior decisions. Data exists at extraction time with zero additional discovery cost.

---

## Preview Card Content

| Option | Description | Selected |
|--------|-------------|----------|
| Mini reference card (Recommended) | Visual preview zone + 2-3 key token values as monospace text below. Data-bearing and copy-pasteable. Designed for 280-400px sweet spot, survives at 150px with overflow:hidden. | ✓ |
| Thumbnail-only | Pure visual render — swatches, type ramp, spacing scale. No text labels. Maximally scannable but requires click-through for any actual data. | |

**User's choice:** Mini reference card
**Notes:** Advisor compared three density levels (thumbnail-only, mini reference card, section-strip). Mini reference card matches Storybook/Zeroheight convention of pairing visual specimens with token metadata. 150px floor handled with min-width and overflow:hidden.

---

## Landing Page Specimen

| Option | Description | Selected |
|--------|-------------|----------|
| Brand-voiced (Recommended) | Uses real tagline, core narrative, proof points from brand-foundation.md. Two-template conditional: individual (bio-led hero, single CTA) vs. org (product-led hero, feature grid, dual CTA). | ✓ |
| Generic / entity-agnostic | Single template with placeholder-safe structural content. Works for any brand type but can't demonstrate the brand voice in context. | |

**User's choice:** Brand-voiced
**Notes:** Landing page is the only net-new specimen in the design kit. Advisor noted specimen-design skill explicitly prohibits placeholder copy. Entity-type conditional matches existing conditional pattern used throughout phase skills.

---

## Agent Responsibility Split

| Option | Description | Selected |
|--------|-------------|----------|
| Call both separately (Recommended) | Phase 8 launches design-kit-foundation first (tokens + specimens), then design-kit-packager (components, previews, root files, landing page). Same pattern as skill-bundle-packager. | ✓ |
| Merge into one agent | Combine foundation + packager into a single agent. Simpler orchestration but rewrites completed Phase 10 deliverable. | |

**User's choice:** Call both separately
**Notes:** Advisor ruled out merge because design-kit-foundation is a completed Phase 10 deliverable. Also ruled out packager-orchestrates-foundation because agents only have Read/Write/Glob/Grep tools — no subagent spawning capability.

---

## Claude's Discretion

- Internal organization of the agent definition file
- Specific HTML/CSS structure of each atomized component
- Preview card CSS layout details
- README.md and HANDOFF.md content organization
- package.json field values
- Entity-type conditional structure in agent definition

## Deferred Ideas

None — discussion stayed within phase scope.
