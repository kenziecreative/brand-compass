# Audit Report: 06-ai-specific-considerations.md

**Date:** 2026-03-26
**Auditor:** Claim Audit Agent
**Draft:** research/drafts/06-ai-specific-considerations.md
**Sources checked:** 06-anchoring-sycophancy-llm-bias.md, 06-voice-capture-homogenization.md, 06-multi-session-state-context-drift.md, 06-geo-ai-search-visibility.md, 06-ai-branding-tool-landscape.md, reference/canonical-figures.json

## Result: FAIL

Three issues require fixes before promotion to outputs. Two are factual errors (one fabricated attribution, one unsourced qualifier). One is a cross-phase precision issue. The remaining issues are minor and can be fixed in the same pass.

---

## Issues Found

### Issue 1: Fabricated Source Attribution — "Previsible's AI Traffic Report"
- **Type:** Fabricated specific
- **Location:** Section 5 (GEO), paragraph 1
- **Draft says:** "AI-referred web sessions jumped 527% year-over-year in the first five months of 2025, according to Previsible's AI Traffic Report."
- **Source says:** The 527% figure is attributed to "Frase 2026, PR News 2026" in 06-geo-ai-search-visibility.md. "Previsible" does not appear anywhere in the source note.
- **Fix:** Remove "according to Previsible's AI Traffic Report" and replace with a source attribution that matches the note, or simply cite the figure without a specific report name. The draft's own bracketed source note at the end of the paragraph already correctly flags these as "marketing-oriented sources."

### Issue 2: Unsourced Qualifier — "Conservative Definition" of Sycophancy
- **Type:** Unsourced claim / fabricated specific
- **Location:** Section 2 (Sycophancy), paragraph 2
- **Draft says:** "Under a conservative definition where the model must not even suggest the user may be wrong, even the best-performing model agrees with incorrect positions nearly a third of the time."
- **Source says:** The source note (06-anchoring-sycophancy-llm-bias.md) reports the sycophancy rates directly: "Zero-shot agreement sycophancy rates: Claude Sonnet 4 (36%), GPT 4.1 Mini (73%)..." with the note "Even the lowest rate (30%) is concerning in a strategic advising context." There is no mention of a "conservative definition" or what it entails.
- **Fix:** Remove the "conservative definition" framing. The rates speak for themselves. Could say: "Even the best-performing model (Gemini 2.5 Pro at 30%) agrees with incorrect user positions nearly a third of the time."

### Issue 3: "Six Academic Studies" Count — Unsourced Aggregation
- **Type:** Unsourced claim
- **Location:** Section 2 (Sycophancy), paragraph 1
- **Draft says:** "Sycophancy — the tendency to agree with users rather than maintain accurate pushback — is pervasive across all major LLMs and worsens in exactly the conditions Brand Compass creates. Six academic studies confirm the scope of the problem."
- **Source says:** The source note lists 10 sycophancy-related sources (items 8-17), mixing academic studies (Cheng et al., Jain et al., SYCON Bench, ELEPHANT, Sharma et al., SycEval, Nature), practitioner analysis (Goedecke, LessWrong), and a survey (GovTech). The note does not count or categorize them as "six academic studies."
- **Fix:** Either count accurately (the academic papers are approximately 7-8 depending on classification) or use vaguer language: "Multiple academic studies confirm the scope of the problem." The specific count "six" appears fabricated.

### Issue 4: Cross-Phase Figure — "122 questions across 8 phases"
- **Type:** Cross-phase drift (minor)
- **Location:** Section 6 (Competitive Context), paragraph 3
- **Draft says:** "122 contextually adaptive questions across 8 phases"
- **Canonical says:** 122 questions with qualifier "Phases 1-7 only, includes conditional questions, excludes Phase 0 onboarding and Phase 8 assembly." The questions span 7 phases, not 8.
- **Context:** The source note (06-ai-branding-tool-landscape.md) lists "122 discovery questions, 8 phases" as separate items in a comparison table — meaning 122 questions AND 8 phases, not 122 questions spanning 8 phases. The draft merged these into a single claim.
- **Fix:** Change to "122 discovery questions across 8 phases of contextual adaptation" or "122 contextually adaptive questions (Phases 1-7)" to avoid implying the questions are distributed across all 8 phases. Alternatively, keep the looser framing but note that the questions are concentrated in Phases 1-7.

### Issue 5: "8-Phase" vs Canonical "9 Phases"
- **Type:** Cross-phase drift (informational — no fix required)
- **Location:** Multiple (lines 3, 41, 57, 146)
- **Draft says:** "8-phase brand development" and "8 phases" throughout
- **Canonical says:** 9 phases (Phases 0-8 inclusive)
- **Context:** The system's own CLAUDE.md says "8-phase brand development process" and "all 8 phases plus checkpoints." The canonical figure registered the inclusive count (9) but the system's self-description uses 8 (treating Phase 0 as separate from the numbered phases). The draft follows the system's own language.
- **Fix:** No fix required — the draft is consistent with how Brand Compass describes itself. However, note this discrepancy exists between the canonical figure and the system's self-description; the canonical figure may need a qualifier update rather than the draft needing a change.

---

## Verified Claims

### Section 1: Anchoring
- Four named studies (Li et al. 2025, Xia et al. 2024, Valencia-Clavijo 2025, Huang et al. 2025) — all appear in source note with correct dates
- Models tested (GPT-4, GPT-4o, Claude 2, Gemini Pro) — matches source
- Anchoring operates at distribution level (Shapley-value attribution) — matches source (Valencia-Clavijo 2025)
- Chain-of-Thought, "ignore previous," and Reflection prompting fail — matches source (source also lists "Thoughts of Principles" which draft omits; omission is acceptable)
- "Hints from comprehensive angles" as only effective mitigation — matches source (Li et al. 2025)
- Fill-in-the-blank and number-specified question examples — matches source analysis
- 122 discovery questions — matches canonical figure (122)

### Section 2: Sycophancy
- Sycophancy rates: Claude Sonnet 4 (36%), GPT 4.1 Mini (73%), GPT 5.1 (41%), Gemini 2.5 Pro (30%), Llama 4 Scout (61%) — all match source (Cheng et al. 2025)
- Memory profiles increased sycophancy by 33% (Claude Sonnet 4) and 45% (Gemini 2.5 Pro) — matches source (Jain et al. 2026); draft omits GPT 4.1 Mini's 16%, acceptable selective citation
- Conversation length alone impacts sycophancy — matches source (Jain et al. 2026)
- ELEPHANT framework, 5 sycophantic behaviors, Goffman's face theory — matches source
- LessWrong RLHF quote — exact match with source
- Northeastern/Georgia Tech role framing finding — matches source
- "Lead Brand Strategist" framing as structural advantage — matches source analysis

### Section 3: Voice Capture
- UCC stylometry finding ("compact, predictable styles") — matches source (O'Sullivan et al. 2026)
- GPT-4 more uniform than GPT-3.5 — matches source
- UW/Google DeepMind substitution finding — matches source (Jaques et al. 2026)
- Satisfaction-despite-quality-loss — matches source (Jaques et al. 2026)
- Six specific voice elements LLMs smooth — matches source list
- UMich/Stony Brook voice mimicry finding — matches source (Dhillon et al. 2026)
- Voice compliance check gap — matches source analysis

### Section 4: Multi-Session State
- 70% enterprise AI systems rely on multi-turn agents — matches source (Milvus 2026)
- JetBrains "quickly turns into noise" — matches source
- Intent alignment: 86.9% → 53.6%, summarization 54.7%, Mem0 56.5% — all match source exactly
- "Memory is not Understanding" characterization — matches source
- 29-item discovery checklist — matches canonical figure (29)
- STATE.md architectural assessment — matches source analysis

### Section 5: GEO
- 527% year-over-year jump — matches source figure (attribution is wrong, see Issue 1)
- Gartner 25% decline estimate — matches source
- 15+ platforms, $150M+ funding — matches source (Evertune 2026)
- 2-7 domains cited per response — matches source (Search Engine Land 2026)
- GEO relevance by client type — matches source assessment
- Brand Compass raw material alignment — matches source analysis

### Section 6: Competitive Landscape
- Tool spectrum (Looka → Canva → BrandBuildr → Brand Compass) — matches source
- BrandBuildr.ai features (15+ strategy models) — matches source
- Gencarelli quote ("flat and generic") — matches source with minor acceptable paraphrase
- Comparison table dimensions — match source
- 13 specialist agents — matches canonical figure (13)
- Practitioner consensus on AI vs human capabilities — matches source

### Summary Table and Recommendations
- All finding tags (COMPLICATED, GAP, COMPLICATED, SUPPORTED, EMERGING, SUPPORTED) — consistent with section content
- All recommendations trace to gaps identified in the sections
- No unsourced claims in the summary

---

## Audit Decision

**FAIL — 3 fixes required before promotion to outputs:**

1. Remove fabricated "Previsible's AI Traffic Report" attribution (Issue 1)
2. Remove unsourced "conservative definition" qualifier (Issue 2)
3. Fix "six academic studies" to an accurate count or vaguer language (Issue 3)

**1 recommended fix (not blocking):**

4. Clarify "122 questions across 8 phases" to avoid implying questions span all 8 phases (Issue 4)

After these fixes, re-submit for audit. The draft is otherwise well-sourced and accurate.
