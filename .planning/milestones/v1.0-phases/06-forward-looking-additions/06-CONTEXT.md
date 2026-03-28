# Phase 6: Forward-Looking Additions - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Add GEO-ready brand outputs for AI search visibility to the Phase 8 toolkit, and graphic device direction to the Phase 7 visual system. Both extend existing deliverables — practical-toolkit.md and visual-system.html respectively — without adding new agents, new phases, or new core deliverable files. Changes touch CLAUDE.md Phase 7/8 sections, Visual Director agent definition, Image Generator agent definition, Document Assembler agent definition, and HTML templates.

</domain>

<decisions>
## Implementation Decisions

### GEO-Ready Output Depth (FUTR-01)
- **Format: Educated reference** — 2-3 paragraph preamble explaining GEO/AEO and why brand consistency matters for AI visibility, followed by actionable outputs. Enough education to motivate the checklist without becoming a strategy guide
- **Scope covers both GEO and AEO** — generative engine optimization (ChatGPT, Claude, Perplexity) and answer engine optimization (Google featured snippets, voice assistants, knowledge panels). For brand purposes, they're two sides of the same coin: making the brand parseable and citable by machines

### GEO Citation Statements (FUTR-01)
- **Both derived AND new** — reformat existing Phase 5 boilerplates (1-sentence, 1-paragraph, 3-paragraph) into citation-optimized versions (clear entity references, no ambiguous pronouns, structured for extraction), AND generate 2-3 purpose-built machine-first statements (entity description, capability summary, differentiator statement)
- Document Assembler handles both: derives from existing boilerplates and generates new machine-first statements

### GEO Entity Consistency Guide (FUTR-01)
- **Name variants + description variants** — official name, acceptable abbreviations, common misspellings to claim, and 1-sentence description variants (formal, casual, technical)
- Not extending into structured data hints or schema.org guidance — that's implementation, not brand identity

### GEO Platform Distribution (FUTR-01)
- **Tailored to client's platform inventory** — Document Assembler reads platform inventory from STATE.md (captured in Phase 0) and generates tips specific to those platforms
- If client is on LinkedIn and has a podcast but not TikTok, they get LinkedIn + podcast GEO guidance, not generic social media advice

### GEO Location (FUTR-01)
- **New section in practical-toolkit.md** — alongside activation layer, content territories, and language bank
- Follows the Phase 4 pattern where all toolkit additions went into this file

### Graphic Device Integration (FUTR-02)
- **New section in visual-system.html** — alongside typography, logo/mark, imagery, and motion direction
- Follows the Phase 4 pattern where motion direction was added as a section in this file

### Graphic Device Pipeline (FUTR-02)
- **Visual Director specifies, Image Generator executes** — Visual Director includes a "Pattern Direction" section in visual-direction.md (style, suggested motifs, color usage rules). Image Generator receives this and produces 1-3 patterns. Same pipeline as logo/mark direction
- **1-3 patterns** per the success criteria — enough variety for different contexts (backgrounds, dividers, accents) without overwhelming

### Graphic Device Discovery (FUTR-02)
- **Position: After imagery, before application** in Phase 7 discovery sequence. Color -> typography -> mark -> imagery -> graphic devices -> motion -> core+flex -> application
- **Use-case framing** — ask WHERE the client needs visual texture first (backgrounds, dividers, social frames?), then what feeling those should carry. Avoids anchoring toward specific styles
- **Always asked, output optional** — every client gets the questions (some don't know they need devices until prompted), but if the brand world doesn't call for patterns, Visual Director can note "no graphic devices recommended" and skip Image Generator
- **2-3 questions** — mirrors the motion direction pattern from Phase 4. Enough to inform Visual Director without overloading Phase 7

### Claude's Discretion
- Graphic device scope and style (geometric, organic, textural, illustrative) — determined by Visual Director based on brand personality, brand world, and client's discovery answers
- Specific GEO preamble content and framing
- Which existing boilerplates to derive citation versions from vs. write fresh
- Discovery question exact wording (following anti-anchoring principles from Phase 5)
- Whether to recommend graphic devices or note "not recommended" for minimal brands

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Motion direction pipeline** (Phase 4): Visual Director writes motion section in visual-direction.md -> Document Assembler renders in visual-system.html. Graphic device direction follows identical pipeline
- **Phase 7 discovery question structure** (CLAUDE.md): Numbered questions with descriptive headers. Graphic device questions slot in after imagery section
- **practical-toolkit.md sections** (Phase 4): Activation layer, content territories, language bank, strategic quick reference, brand stress test. GEO section follows same markdown structure
- **Document Assembler agent**: Already reads Phase 5 boilerplates for toolkit assembly. Citation-optimized versions derive from same source
- **Platform inventory in STATE.md**: Captured during Phase 0 onboarding. Document Assembler reads this for tailored GEO platform guidance

### Established Patterns
- Visual Director writes visual-direction.md -> Document Assembler reads and renders into HTML specimens. Graphic devices follow this same pipeline
- CLAUDE.md Phase sections contain discovery questions -> agent definitions contain processing instructions -> HTML templates contain rendering specs. Each new deliverable needs all three touchpoints
- practical-toolkit.md is markdown-only for toolkit sections. GEO outputs follow this pattern
- Anti-anchoring principles (Phase 5): open-ended framing before structured, multiple frames. Graphic device questions follow these principles

### Integration Points
- **CLAUDE.md Phase 7**: Add 2-3 graphic device discovery questions after imagery section, before application section
- **CLAUDE.md Phase 8**: Add GEO-ready outputs as a named deliverable in toolkit section
- **Visual Director agent**: Add "Pattern Direction" output section to visual-direction.md template
- **Image Generator agent**: Add directive to produce 1-3 brand patterns from Visual Director's pattern direction
- **Document Assembler agent**: Add GEO section generation (entity consistency, citation statements, platform guidance) and graphic devices section rendering
- **visual-system.html template**: Add graphic devices section
- **practical-toolkit.md**: Add GEO-ready outputs section

</code_context>

<specifics>
## Specific Ideas

- GEO preamble should bridge the education gap — most clients won't know what GEO/AEO means, but they'll understand "how to make sure AI tools describe your brand correctly"
- Citation-optimized statements are messaging derivatives, not new messaging — they reformat what already exists for machine consumption, plus a few machine-first additions
- Graphic device discovery mirrors the motion direction discovery approach from Phase 4: a few targeted questions that give the Visual Director enough signal without overloading an already long Phase 7
- Use-case framing for graphic devices ("where do you need visual texture?") is more useful than style framing ("do you want geometric or organic?") because it reveals whether the client even needs devices before anchoring them toward a style

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-forward-looking-additions*
*Context gathered: 2026-03-27*
