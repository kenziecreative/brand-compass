# Research Plan: Evaluating and Improving the Brand Compass 8-Phase Brand Development System

**Research Subject:** Evaluating and improving the Brand Compass 8-phase brand development system — researching current branding methodologies, identifying pipeline gaps, assessing deliverable completeness, and finding opportunities from adjacent tools and frameworks that could strengthen the system.

---

## The Core Question

Brand Compass is a structured, AI-assisted brand development system. The central question this research must answer is: **Is the system complete, current, and competitive — and where are the most valuable opportunities to strengthen it?** This means evaluating the 8-phase pipeline against modern branding methodology and professional agency standards, identifying where the process is thin or skips concepts other frameworks treat as essential, assessing whether the deliverable set matches what contemporary brand engagements actually produce, and surfacing adjacent tools and frameworks from product strategy, content design, and design systems thinking that could either plug gaps or suggest new agent capabilities. The research should produce a clear prioritized set of recommendations, not an exhaustive wish list.

---

## Source Material Location

The primary subject of research is the Brand Compass system as defined in:

- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/CLAUDE.md` — orchestration instructions, phase definitions, agent table, deliverable spec
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/.claude/agents/` — all specialist agent definitions
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/.claude/commands/brand-compass/` — all slash commands (phases, checkpoints, utilities)
- `/Users/kelseyruger/Projects/a-emporium-working/gold-master-projects/brand-compass/workspace/reference/example-brand/` — reference output showing what the system actually produces

---

## Phase 1: System Inventory — What Brand Compass Currently Does

**What needs to be understood:** Before any gap analysis, the system must be characterized precisely. This phase reads the primary source files and produces a structured map of what exists: every phase, every agent, every deliverable, every command, every decision point, and every explicit omission.

**What needs to be established:**

1. What does each phase claim to produce, and what questions does it ask to get there?
2. What does each specialist agent do, what inputs does it take, and what output format does it produce?
3. What are the explicit conditional paths in the system (e.g., org vs. individual differences, asset pack selections)?
4. What are the checkpoints and what do they gate?
5. What deliverables does the system promise at completion — names, formats, locations?
6. What does the example brand output look like — is it representative of the system's actual ceiling?
7. Where does the current documentation contain ambiguity, contradiction, or underspecification?

**Output:** `01-system-inventory.md`

---

## Phase 2: Methodology Benchmarking — How Does It Compare to Established Frameworks?

**What the thesis claims / needs to be understood:** Brand Compass covers the standard pillars of modern brand strategy (purpose, audience, positioning, personality, messaging, voice, visual). The question is whether it covers them at the right depth, in the right sequence, and with the right framing relative to established methodologies. Several well-regarded frameworks exist that may reveal structural omissions.

**What needs validation / exploration:**

1. **StoryBrand (Donald Miller):** The SB7 framework positions the *customer* as the hero of the story and the brand as the guide. Brand Compass is largely brand-outward (what does the brand believe, who does it serve). Does Brand Compass adequately capture the customer-as-hero dynamic, or does it risk producing brand-centric messaging?
2. **The Brand Gap (Marty Neumeier):** Neumeier's framework argues the gap between strategy and expression is the central brand problem. Does Brand Compass have an explicit mechanism for testing whether Phase 7 visual outputs actually express Phases 1–6 strategy, or is that connection implicit?
3. **Google Ventures Brand Sprint:** A 5-day compressed sprint methodology. What does GV's sprint prioritize that Brand Compass's 8-phase model might deprioritize or bury? What does each framework do with "20-year roadmap" and values exercises?
4. **Outcome-Driven Innovation / JTBD:** Jobs-to-be-Done framing focuses on what outcomes customers are trying to achieve rather than who they are. Does Brand Compass's audience phase (Phase 2) capture functional jobs, emotional jobs, and social jobs — or does it stay at the persona/segment level?
5. **Category Design (Play Bigger):** The "create a category, don't just compete" school of thought. Does Brand Compass's Phase 3 positioning work push clients toward genuine category differentiation, or does it produce competitive repositioning within an existing frame?
6. **Purpose-Driven Branding (Simon Sinek's Golden Circle):** Start with Why. Brand Compass Phase 1 (Origin & Belief) covers this ground, but does it frame it in a way that produces a usable "Why" statement distinct from mission, vision, and core belief?

**Output:** `02-methodology-benchmarking.md`

---

## Phase 3: Pipeline Gap Analysis — Where Is the Process Thin?

**What the thesis claims / needs to be understood:** No system covers everything. The goal of this phase is to identify specific places in the Brand Compass pipeline where the process either skips important work, leaves outputs underspecified, or relies on discovery that hasn't been fully designed.

**What needs validation / exploration:**

1. **Competitive analysis depth:** The Research Analyst agent is optional and triggered only if the client mentions competitors. Is passive triggering sufficient, or should competitive context be structurally required before Phase 3 positioning work begins? What does a rigorous competitive brief look like versus what the system currently specifies?
2. **Brand architecture:** The system is designed for a single brand (solo practitioner or single-product business). What happens when a client has multiple offers, product lines, or sub-brands? Is there an existing path for brand architecture decisions, or is this a gap?
3. **Market category framing:** Phase 3 asks for positioning and differentiation but doesn't explicitly ask the client to name or define their market category. Many brand strategists argue category naming is a distinct and critical step. Is this absent from the system?
4. **Transition from verbal to visual (Checkpoint B):** The checkpoint gates Phase 7 behind completed Phases 1–6 but doesn't specify how the Visual Director agent is supposed to translate verbal brand elements into visual direction. Is the translation logic well-specified, or is it a black box?
5. **Onboarding depth (Phase 0):** Phase 0 captures platform inventory, entity type, and asset pack selection but does not capture existing brand assets for audit, current brand perception, competitive set, or budget/timeline constraints. What do comparable onboarding frameworks capture that Phase 0 misses?
6. **Anti-patterns and failure modes:** The system doesn't currently include discovery for what the brand has tried before and why it didn't work, common misconceptions clients have about their brand, or patterns the client wants to consciously break. Are these relevant inputs that should be structured?
7. **Voice Phase (Phase 6) sequencing:** Voice Analyzer is listed as runnable as early as Phase 0/1 if writing samples are available, but Phase 6 is the formal voice phase. Is there a structural risk that voice work done early doesn't get revisited or codified properly in Phase 6?

**Output:** `03-pipeline-gap-analysis.md`

---

## Phase 4: Deliverable Audit — What Are We Not Producing?

**What the thesis claims / needs to be understood:** The 8 core files Brand Compass produces (4 markdown, 4 HTML specimens, plus asset pack HTML files) represent a coherent deliverable set. This phase audits that set against what modern brand agencies and brand strategy firms actually produce, to identify standard deliverables the system is missing or underweighting.

**What needs validation / exploration:**

1. **Brand guidelines document:** Contemporary brand guidelines go beyond a brand foundation document and visual system spec. Standard agency deliverables typically include: brand narrative one-pager, elevator pitch card, logo usage rules with do/don't examples, color system with accessibility contrast ratios, typography hierarchy with real usage examples, and application mockups in realistic contexts. Does Brand Compass produce all of these?
2. **Motion guidelines:** Motion is now a core brand deliverable. Major design systems (IBM Carbon, Google Material, GitLab Pajamas) include motion tokens, easing standards, and animation principles. Does Brand Compass have any motion direction output, or is this a gap?
3. **Design tokens:** Modern visual identity systems are increasingly specified as design tokens (color, typography, spacing as structured variables) rather than static hex values and font names. Does the UI Kit HTML specimen produce token-ready output, or just visual examples?
4. **Brand measurement framework:** Most professional brand engagements include at minimum a set of suggested brand health metrics — awareness, perception, consideration, loyalty, NPS proxy — and a recommendation for how to track them. Brand Compass currently produces no measurement guidance. Is this a gap for the clients this system serves?
5. **Content strategy layer:** Brand voice and expression (Phase 6) covers how to write, but doesn't produce a content strategy — content pillars, channel priorities, posting cadence guidance, content-to-audience mapping. Is this out of scope or a missing layer?
6. **Brand story architecture (narrative framework):** Phase 5 produces a core narrative and boilerplates. Does it produce a structured brand story arc — specifically a narrative that positions the customer as protagonist and the brand as guide (cf. StoryBrand)? Or does it produce brand-centric copy?
7. **Brand activation checklist:** After the engagement, clients need a prioritized list of "first 30 actions" — update website, create social profiles, swap out bio, print new cards. No system produces this unless explicitly asked. Should Brand Compass produce a launch activation checklist?
8. **Accessibility spec:** Color palettes should include WCAG contrast ratios. Does the color palette HTML specimen currently do this?

**Output:** `04-deliverable-audit.md`

---

## Phase 5: Adjacent Tools and Framework Landscape — What Could Be Borrowed?

**What the thesis claims / needs to be understood:** Brand Compass is built in a specific context (Claude Code plugin, AI-assisted, conversational delivery) but could borrow approaches, templates, frameworks, and structural ideas from adjacent tools and disciplines. This phase surveys what exists and identifies the most transferable components.

**What needs validation / exploration:**

1. **Frontify and brand management platforms:** Frontify's AI Brand Assistant enforces guidelines, retrieves approved assets, and answers brand questions. Does this suggest a Brand Compass "brand query" mode — a way to ask the system "is this on-brand?" after an engagement completes? Is this adjacent to the Brand Verifier agent?
2. **Design system methodology (component → token → guideline):** Design systems have a well-developed methodology for specifying a visual language at multiple levels of abstraction. Could Brand Compass adopt a similar tiered specification approach — tokens (hex, font-stack, spacing unit), components (button, card), patterns (layout, page type)?
3. **Content strategy frameworks (hub/spoke/hygiene; content pillars):** These frameworks structure content production around audience needs and brand voice. Could Phase 6 or Phase 8 produce a content territory map using one of these structures?
4. **StoryBrand BrandScript canvas:** StoryBrand produces a one-page "BrandScript" — a structured summary of the 7 story elements. Could Brand Compass produce an analogous one-page brand canvas that synthesizes Phases 1–5 into a single reference artifact?
5. **Positioning school (Trout/Ries, Al Ries):** Classic positioning theory focuses on owning a word in the prospect's mind and attacking category leaders through repositioning. Does Brand Compass Phase 3 reflect this rigorous positioning school, or is it softer "differentiation" work?
6. **JTBD switch interview methodology:** The JTBD "switch interview" identifies the exact moment and circumstances when a customer decided to seek out a solution. Does Phase 2's audience work capture trigger moments with this level of specificity?
7. **Brand activation and governance frameworks:** Many brand methodologies include an activation phase — how to roll the brand out internally and externally, how to train teams, how to govern brand usage going forward. Is there a lightweight version of this that Brand Compass Phase 8 Toolkit should include?

**Output:** `05-adjacent-tools-landscape.md`

---

## Phase 6: AI-Specific Considerations — What Changes When the Facilitator Is an LLM?

**What the thesis claims / needs to be understood:** Brand Compass is not a human-facilitated brand engagement with AI assistance — the primary facilitator is an LLM. This creates specific structural risks and opportunities that traditional branding frameworks don't address. This phase examines what changes about brand development when conducted conversationally through an AI.

**What needs validation / exploration:**

1. **Anchoring and leading questions:** LLMs can inadvertently anchor client responses by the way questions are framed. Does Brand Compass's discovery question design guard against this, or could the questions be pushing clients toward expected answers?
2. **Sycophancy risk in strategic pushback:** The CLAUDE.md orchestration has detailed instructions for strategic pushback — when to challenge the client, how to defend recommendations. Is there evidence that LLMs systematically fail to maintain pushback across a long conversation, and does Brand Compass have structural guards against this?
3. **Voice capture authenticity:** Phase 6 and the passive voice capture instructions throughout CLAUDE.md depend on the LLM accurately capturing client voice. What are the failure modes — what gets smoothed over, normalized, or "cleaned up" that shouldn't be?
4. **Multi-session state management:** Brand Compass has a STATE.md system and session start protocol. Are there known failure patterns in multi-session LLM engagements (context loss, state drift, inconsistent recall) that the current architecture doesn't fully address?
5. **Generative Engine Optimization (GEO):** Brands increasingly need to think about how they appear in AI-generated answers, not just search results. Does Brand Compass's positioning and messaging work produce any GEO-ready outputs — structured, factual brand statements that would survive being cited by an LLM?
6. **AI branding tool landscape as competitive context:** Tools like Looka, uBrand, BrandBuildr.ai, and Frontify's AI assistant represent the automated end of AI-assisted branding. Brand Compass is positioned at the high-touch, strategist-facilitated end. Is this positioning explicit and defensible, and does the system produce enough differentiated output to justify the premium?

**Output:** `06-ai-specific-considerations.md`

---

## Phase 7: Emerging Trends — What Is the System Not Future-Proofed For?

**What the thesis claims / needs to be understood:** Brand strategy is evolving. The system was built with current standards in mind, but several emerging trends could affect both what clients need from a brand engagement and how Brand Compass should structure its output. This phase assesses how well the system handles coming shifts.

**What needs validation / exploration:**

1. **Dynamic / adaptive brand identity:** Brands increasingly use systems that adapt to context, user behavior, and platform in real time (Spotify Wrapped, generative visual identities). Does Brand Compass Phase 7 prepare clients for adaptive brand systems, or does it produce a static visual spec?
2. **Purpose-driven branding:** Two-thirds of US consumer buying decisions are influenced by social values (2025 data). Does Brand Compass have an explicit place to articulate brand purpose beyond "core belief" — a social or environmental stance, a community commitment, a values-in-action framework?
3. **Personal branding specificity:** The system handles both individual/personal brands and organizational brands through conditional logic. Is the personal brand track differentiated enough, or does it apply organizational brand logic to individuals? Personal branding in 2025–2026 is moving toward "less performative, more intentional" — does the system reflect this?
4. **Immersive and spatial brand experience:** AR/VR and physical space branding are becoming standard considerations for brands with any physical or experiential presence. The `signage-space` asset pack exists, but does Phase 7 visual direction address spatial/immersive contexts at all?
5. **Brand and content convergence:** The line between brand and content strategy is dissolving — a brand's content *is* the brand for many solo practitioners and thought leaders. Does Brand Compass treat these as integrated or does it sequence them as distinct concerns?
6. **Accessibility-first brand design:** WCAG compliance and inclusive design are increasingly client expectations and legal requirements. Does the visual identity phase have any explicit accessibility direction, or is it left to implementation?

**Output:** `07-emerging-trends-assessment.md`

---

## Phase 8: Prioritized Recommendations

**Goal:** Translate research findings from Phases 1–7 into a clear, prioritized set of recommendations organized by impact and implementation difficulty. Findings should be tagged using the thesis finding tags (SUPPORTED, COMPLICATED, CONTRADICTED, EMERGING, GAP) and organized into three tiers: high-priority improvements to the core pipeline, medium-priority deliverable expansions, and low-priority / future-consideration items.

**Specific recommendations to evaluate and prioritize:**

1. Structural changes to phase sequence or discovery questions
2. New or modified agent definitions
3. New deliverable files or specimens
4. Checkpoint refinements
5. Conditional logic additions (e.g., multi-brand / brand architecture path)
6. State management and session resilience improvements
7. Additions to Phase 0 onboarding
8. New commands or utilities

**Outputs:**
- `00-executive-summary.md` — 1–2 page summary for decision-making
- `08-prioritized-recommendations.md` — full prioritized list with rationale and implementation notes
- `09-quick-wins.md` — changes that can be implemented immediately with minimal system rework

---

## Source Priority

**Highest value sources:**
- The Brand Compass source files themselves (CLAUDE.md, agent definitions, phase commands) — the ground truth of what the system currently does and claims
- Professional brand agency deliverable lists and methodology documentation (Canny Creative, ArtVersion, D2 Creative) — establish the standard against which Brand Compass is measured
- Established brand strategy frameworks with clear methodology documentation (StoryBrand, Neumeier, JTBD) — identify structural concepts worth benchmarking against
- Design system documentation from major systems (IBM Carbon, Google Material) — inform motion and token recommendations
- 2024–2026 brand trend reports from research-oriented sources (The Branding Journal, Lippincott, Admind) — identify emerging requirements

**Be skeptical of:**
- AI branding tool marketing copy (Looka, uBrand, BrandBuildr.ai) — these describe features, not methodology; useful as competitive context but not as benchmarks for strategic depth
- Generic "brand strategy guide" blog posts from marketing agencies — high SEO, low substance; check whether claims are grounded in cited research or are just opinion
- Trend reports from brand agencies promoting their own services — these often inflate the urgency of emerging trends to generate new business; triangulate against independent sources
- Any source claiming a specific percentage impact (e.g., "brand consistency increases revenue by 23%") without a clearly cited study — these statistics circulate widely without traceable primary sources

---

## Success Criteria

This research is done when:

1. Every phase of Brand Compass has been evaluated against at least two external reference points (a comparable methodology and a deliverable standard)
2. All identified gaps are tagged SUPPORTED, COMPLICATED, CONTRADICTED, EMERGING, or GAP and have a rationale — not just a list of things the system doesn't do
3. The recommendations are prioritized by a combination of strategic impact and implementation cost — not all improvements are equal
4. At least one "quick win" recommendation exists for each of the major areas: phase discovery, agent capabilities, and deliverables
5. The executive summary can be read in under 5 minutes and produces a clear sense of the system's current strengths and its top 3–5 improvement opportunities
6. Recommendations distinguish between what would make Brand Compass more complete (covering more ground) versus what would make it sharper (covering current ground better) — both are valuable but require different kinds of changes
