# Quick Wins — Changes That Can Be Implemented Immediately

Changes that require minimal system rework — typically a question addition, a trigger change, or a template update. Organized by the three major areas specified in the research plan: phase discovery, agent capabilities, and deliverables.

---

## Phase Discovery Quick Wins

### QW-1: Add Competitive Alternatives Question to Phase 2 or Early Phase 3

**What to change:** Add one question: "What would your customers use or do if you didn't exist?"
**Where:** Phase 2 Market of One section (Q11 area) or Phase 3 before positioning statement
**Source:** Dunford's Obviously Awesome methodology (SRC-022, Pattern 24)
**Why it matters:** Reframes competitive analysis from "who are your competitors?" (brand-perspective) to "what alternatives exist?" (customer-perspective). Grounds positioning in customer reality.
**Effort:** One question addition to CLAUDE.md

---

### QW-2: Add Anxiety + Habit Force Questions to Phase 2 Market of One

**What to change:** Add two questions to Phase 2 Market of One:
- "What were they doing before you — and why did that stop working?" (push/habit force)
- "What almost stopped them from choosing you?" (anxiety force)
**Where:** Phase 2, after Q10 ("When they find you and it works, what do they say?")
**Source:** JTBD Switch Interview four forces model (SRC-023, Pattern 2)
**Why it matters:** Rounds out the Market of One from a portrait into a decision journey. Push and anxiety forces reveal objections and switching costs that inform messaging.
**Effort:** Two question additions to CLAUDE.md

---

### QW-3: Add Brand History Question to Phase 0

**What to change:** Add one question: "Have you done brand work before? What worked? What didn't? What would you not want to repeat?"
**Where:** Phase 0 onboarding
**Source:** SRC-013 (Anti-Patterns), SRC-009 (Onboarding Intake), Pattern 14
**Why it matters:** Prevents repeating past failures. Captures pain points that sharpen discovery. Most competitors also miss this — it's a low-cost differentiator.
**Effort:** One question addition to onboarding command

---

### QW-4: Add Named Competitors to Phase 0

**What to change:** Add one question: "Name 3-4 brands, companies, or people your audience might consider instead of you. Include URLs if possible."
**Where:** Phase 0 onboarding
**Source:** SRC-009 (Onboarding Intake), Pattern 10
**Why it matters:** Feeds the Research Analyst (especially with the trigger change in recommendation 1.1). Even without the trigger change, having competitor names available from Phase 0 improves any competitive analysis that occurs later.
**Effort:** One question addition to onboarding command, one field addition to STATE.md template

---

### QW-5: Add Perception Gap Question to Phase 0

**What to change:** Add one question: "How do people currently describe what you do — and how is that different from how you'd want them to describe it?"
**Where:** Phase 0 onboarding
**Source:** SRC-009 (Onboarding Intake), Pattern 10
**Why it matters:** Surfaces the gap between perceived and intended brand. Sets up Phase 3 positioning work. The gap itself is often the most useful data point in early discovery.
**Effort:** One question addition to onboarding command

---

### QW-6: Add Outside-In Category Question to Phase 3

**What to change:** Add one question: "What category does your audience currently put you in? Is that the right category?"
**Where:** Phase 3, after territory questions, before contrarian POV
**Source:** Duffy Agency via SRC-011, Pattern 4
**Why it matters:** The client's self-categorization often differs from how their audience categorizes them. Surfacing this gap prevents positioning that resonates internally but misses externally.
**Effort:** One question addition to CLAUDE.md

---

### QW-7: Add Accessibility Questions to Phase 7

**What to change:** Add 2-3 questions:
- "Does your audience include people with visual impairments or disabilities?"
- "Are you subject to accessibility compliance requirements (government, education, healthcare)?"
- "Which of your platforms carries the most accessibility risk?"
**Where:** Phase 7, before color and typography discussion
**Source:** SRC-031 (Accessibility-First Design), Pattern 33
**Why it matters:** Establishes accessibility as a design input, not just a verification output. ADA Title II compliance deadline is April 2026; 77% increase in lawsuits targeting sub-$25M companies (SRC-031).
**Effort:** 2-3 question additions to CLAUDE.md

---

## Agent Capability Quick Wins

### QW-8: Change Research Analyst Trigger from Passive to Required

**What to change:** In the agent table and orchestration logic, change Research Analyst from "Optional — triggered when client mentions competitors" to "Required — launches between Phase 2 and Phase 3 with whatever context is available"
**Where:** CLAUDE.md agent table, Phase 2/3 transition logic
**Source:** SRC-008 (Competitive Audit Standards), Pattern 9 — every agency source treats competitive analysis as a default step
**Why it matters:** The single most common gap between Brand Compass and standard agency practice. The agent itself is well-built; the trigger is undersized.
**Effort:** Trigger logic change in CLAUDE.md (the agent already exists and works)

---

### QW-9: Add Checkpoint Challenge Requirement

**What to change:** At Checkpoint A and Checkpoint B, add a structural requirement: "Identify the single weakest element in the work so far and challenge the client on it before proceeding."
**Where:** Checkpoint A and Checkpoint B command files
**Source:** SRC-025 (Sycophancy research), Pattern 27
**Why it matters:** Structural anti-sycophancy mechanism. Ensures at least one moment of genuine pushback at each gate. Costs nothing but a prompt addition.
**Effort:** One paragraph addition to each checkpoint command

---

### QW-10: Add Devil's Advocate Pass to Phase 5

**What to change:** Before finalizing messaging in Phase 5, require the facilitator to generate one alternative that contradicts the client's preferred direction and present it as "here's the version that challenges your comfort zone."
**Where:** Phase 5 section in CLAUDE.md, after Copywriter output review
**Source:** SRC-025 (Sycophancy research), Pattern 27
**Why it matters:** Forces at least one moment of genuine strategic tension in the phase where messaging gets locked. The client may still choose their preferred option — but they'll do so having confronted an alternative.
**Effort:** One instruction addition to CLAUDE.md Phase 5 section

---

## Deliverable Quick Wins

### QW-11: Add Approved Accessible Color Combinations to Color Palette HTML

**What to change:** Add a section to the color palette HTML specimen showing which brand color combinations are approved for text-on-background use (meeting WCAG 4.5:1 for normal text, 3:1 for large text) and which are not.
**Where:** Color palette HTML template / Document Assembler output
**Source:** Jenny Henderson Studio (SRC-031): "A brand identity doesn't need every colour in a brand palette to work together, but the brand does need to set specific guidelines for approved, accessible colour combinations." Pattern 33.
**Why it matters:** The color palette already includes contrast ratios (a strength). This extends that into actionable guidance: "use these combinations, don't use those."
**Effort:** Template addition to Document Assembler / color palette HTML generation

---

### QW-12: Add Quick Reference Card — Strategic Version

**What to change:** The current Quick Reference Card in Phase 8 Toolkit contains implementation references (hex codes, fonts, tagline). Add a second quick reference: a one-page strategic summary with Core Belief, Audience Insight, Positioning, Personality, and Brand Essence.
**Where:** Phase 8 Practical Toolkit assembly
**Source:** SRC-021 (Brand Key, Brand Pyramid), SRC-002 (StoryBrand), Pattern 7
**Why it matters:** Multiple frameworks treat a one-page strategic synthesis as essential for team alignment. The data already exists; this is assembly, not discovery.
**Effort:** Template addition to Document Assembler / Phase 8 assembly instructions

---

### QW-13: Add Brand Stress Test to Phase 8

**What to change:** After generating the decision filter in Phase 8, apply it to 3 hypothetical scenarios that test the brand's boundaries. If the filter approves everything, flag it as too permissive and tighten the criteria.
**Where:** Phase 8 assembly, after decision filter generation
**Source:** SRC-025 (Sycophancy research), Pattern 27 (structural validation)
**Why it matters:** A decision filter that says "yes" to everything is useless. Testing it against boundary cases ensures it has actual discriminating power. Also serves as a sycophancy check — if the engagement never pushed back, the filter will be too broad.
**Effort:** One instruction addition to Phase 8 section

---

## Summary

| ID | Area | Change | Effort |
|----|------|--------|--------|
| QW-1 | Phase Discovery | Competitive alternatives question | 1 question |
| QW-2 | Phase Discovery | Anxiety + habit force questions | 2 questions |
| QW-3 | Phase Discovery | Brand history question | 1 question |
| QW-4 | Phase Discovery | Named competitors in Phase 0 | 1 question + 1 STATE field |
| QW-5 | Phase Discovery | Perception gap question | 1 question |
| QW-6 | Phase Discovery | Outside-in category question | 1 question |
| QW-7 | Phase Discovery | Accessibility questions | 2-3 questions |
| QW-8 | Agent Capability | Research Analyst trigger → required | Trigger logic change |
| QW-9 | Agent Capability | Checkpoint challenge requirement | 2 paragraph additions |
| QW-10 | Agent Capability | Devil's advocate pass in Phase 5 | 1 instruction addition |
| QW-11 | Deliverable | Accessible color combinations section | Template addition |
| QW-12 | Deliverable | Strategic quick reference card | Template addition |
| QW-13 | Deliverable | Brand stress test in Phase 8 | 1 instruction addition |

**Total quick wins:** 13
**Phase discovery:** 7 (adding ~10 questions across Phases 0, 2, 3, 7)
**Agent capabilities:** 3 (one trigger change, two instruction additions)
**Deliverables:** 3 (two template additions, one instruction addition)

All 13 can be implemented by editing existing files (CLAUDE.md, checkpoint commands, Document Assembler templates). None require new agents, new phases, or structural rearchitecture.
