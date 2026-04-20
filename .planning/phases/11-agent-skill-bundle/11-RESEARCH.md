# Phase 11: Agent Skill Bundle - Research

**Researched:** 2026-04-20
**Domain:** Claude Code agent definition authoring — file extraction, content synthesis, behavioral instruction writing
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**SKILL.md Content Design**
- D-01: SKILL.md is thorough (200+ lines) with all five required sections fully specified: voice definition, signature moves, guardrails, language bank, positioning summary. The consuming agent has no discovery session — the SKILL.md is everything it knows.
- D-02: Each section is written as enforceable behavioral rules, not rationale paragraphs. Strategy backstory that the consuming agent doesn't need is excluded.
- D-03: Translation Rule — The packager must convert discovery-phase language (archetype names, territory labels, coined terms) into behavioral instructions a stranger-agent can act on without Brand Compass context. No raw discovery terminology in SKILL.md.

**brand-prompt.md Synthesis**
- D-04: brand-prompt.md uses voice-and-archetype-led composition — opens with archetype identity and voice character, embeds positioning as context the persona holds. This is a persona injection, not a brief.
- D-05: Element priority order within the 150-300 word constraint: (1) voice + archetype behavioral foundation, (2) positioning + territory as context, (3) 1-2 personality traits and signature moves, (4) one hard "never do" guardrail — the single most brand-damaging violation.
- D-06: No headings, no bullets — flowing prose format that reads as a single continuous persona description.

**Source File Extraction**
- D-07: Direct section copy — lift sections verbatim from client package files with no rewriting or restructuring. Client-facing prose framing is itself useful instruction for consuming agents.
- D-08: Specific extraction mapping:
  - `voice-rules.md` ← voice-guide.md Section 3 (Writing Style) + Section 4 (Signature Moves)
  - `guardrails.md` ← voice-guide.md Section 5 (Guardrails) + Calibration Table if present
  - `language-bank.md` ← merged from voice-guide.md phrases-to-avoid table + practical-toolkit.md Codify/Retire classification (deduplication, not restructuring)
- D-09: language-bank.md is the one file that combines two sources — this is deduplication of overlapping content, not a restructuring transform.

**Agent Input Mapping**
- D-10: Minimal viable input set (3 required + 1 conditional):
  - Required: `workspace/output/client/voice-guide.md`, `workspace/output/client/brand-foundation.md`, `workspace/STATE.md`
  - Conditional: `workspace/research/voice-fingerprint.md` (Glob to check existence, read if present, skip gracefully if not)
  - Targeted: `workspace/output/client/practical-toolkit.md` read only for Language Bank / Codify-Retire section during language-bank.md extraction
- D-11: `drafts/` and other `research/` files are pre-synthesis inputs already distilled into output files — the packager does not read them.
- D-12: voice-fingerprint.md is the highest-value enrichment file — its voice profile summary one-liner and quantitative markers significantly improve brand-prompt.md prose quality.

### Claude's Discretion

- Agent definition file structure and internal organization (follows existing agent patterns in .claude/agents/)
- SKILL.md frontmatter field names and format (follows Claude Code skill file conventions)
- Error handling when required input files are missing (agent should report clearly and stop)
- Internal section ordering within source/ files

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SKIL-01 | skill-bundle-packager agent created (sonnet, Read/Write/Glob/Grep) | Agent definition pattern documented in Architecture Patterns; frontmatter format established by design-kit-foundation.md analog |
| SKIL-02 | SKILL.md generated with valid frontmatter, voice definition, signature moves, guardrails, language bank, positioning summary | Five-section structure and content sourcing mapped; frontmatter format identified from existing skill files |
| SKIL-03 | brand-prompt.md generated (150-300 words, flowing prompt format, no headings/bullets) | Composition algorithm documented with priority ordering (D-04/D-05/D-06); voice-fingerprint.md enrichment role clarified |
| SKIL-04 | source/ files generated (voice-rules.md, guardrails.md, language-bank.md) lifted from client package | Section-to-source extraction mapping fully specified per D-08; verbatim-copy vs. merge distinction documented |
</phase_requirements>

---

## Summary

Phase 11 creates a single new agent definition file: `.claude/agents/skill-bundle-packager.md`. This agent reads three required files and one conditional file from the completed brand engagement workspace, then writes five output files into `workspace/output/skill-bundle/`. The phase is narrowly scoped — no modifications to existing agents, discovery phases, or frontend code.

The technical work is pure content synthesis and text extraction. The agent uses only Read/Write/Glob/Grep tools, consistent with the design-kit-foundation.md and document-assembler.md pattern. There are no external dependencies, no runtime environment concerns, and no framework or library choices to make.

The primary design challenge is intellectual, not technical: the SKILL.md must translate Brand Compass discovery terminology into enforceable behavioral rules that work for a consuming agent with zero context about the discovery process. This "Translation Rule" (D-03) is the central constraint that shapes every content decision.

**Primary recommendation:** Model the skill-bundle-packager agent structure on design-kit-foundation.md (same model, tools, task-based organization), but use document-assembler.md as the quality bar for instruction depth and completeness. The agent has two logical phases: (1) produce the three source/ reference files via direct section extraction, (2) synthesize SKILL.md and brand-prompt.md from those same sources plus the STATE.md brand context. Writing source files first gives the synthesizer clean, extracted material to draw from.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Agent definition authoring | File system (agent definitions in .claude/agents/) | — | Agent definitions are static instruction files, not runtime components |
| Content extraction from voice-guide.md | Agent (runtime read) | — | Packager agent reads and copies verbatim sections at execution time |
| Content synthesis for SKILL.md | Agent (runtime write) | — | Translation from discovery language to behavioral rules happens at agent execution |
| brand-prompt.md composition | Agent (runtime write) | — | Prose synthesis from multiple source fields |
| Output file creation | File system (workspace/output/skill-bundle/) | — | Directory exists (created by Phase 10); agent writes into it |
| Conditional voice-fingerprint enrichment | Agent (Glob check + conditional read) | — | Same pattern used by document-assembler.md for fingerprint integration |

---

## Standard Stack

### Core

| Component | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Claude (sonnet) | current | Agent model | Consistent with all file-processing agents in this project (document-assembler, design-kit-foundation, brand-verifier) |
| Tools: Read, Write, Glob, Grep | — | File I/O | The established tool set for agents that read/process/write files without needing shell commands |

[VERIFIED: .claude/agents/design-kit-foundation.md, .claude/agents/document-assembler.md — both use `model: sonnet` and `tools: Read, Write, Glob, Grep`]

### No External Libraries

This phase requires no npm packages, no new dependencies, and no build system changes. The output is one markdown file (the agent definition). The agent itself uses only Claude's built-in tools.

---

## Architecture Patterns

### System Architecture Diagram

```
workspace/output/client/voice-guide.md
  (Sections 3, 4, 5, 5b)
        |
        |----> [Task 1: Source Extraction]
        |           |
workspace/output/client/practical-toolkit.md        |----> skill-bundle/source/voice-rules.md
  (Language Bank / Codify-Retire)                   |           (Sections 3 + 4, verbatim)
        |                                            |
        |----> [Task 1: Source Extraction]           |----> skill-bundle/source/guardrails.md
                                                     |           (Section 5 + Calibration Table, verbatim)
workspace/output/client/brand-foundation.md         |
  (positioning, archetype, core belief)             |----> skill-bundle/source/language-bank.md
        |                                            |           (phrases-to-avoid + Codify/Retire, deduplicated)
workspace/STATE.md                                   |
  (brand name, entity type)                          |
        |                                            v
workspace/research/voice-fingerprint.md    [Task 2: Synthesis]
  (optional: one-liner, quantitative                |
   markers, voice summary)                          |----> skill-bundle/SKILL.md
        |                                            |           (200+ lines, 5 sections, enforceable rules)
        `--------------------------------------------'
                                                     |----> skill-bundle/brand-prompt.md
                                                                 (150-300 words, flowing prose)
```

### Recommended Project Structure

```
.claude/agents/
└── skill-bundle-packager.md     # New agent definition (this phase's only deliverable)

workspace/output/skill-bundle/   # Already exists (Phase 10 created directory)
├── SKILL.md                     # Generated at runtime by the agent
├── brand-prompt.md              # Generated at runtime by the agent
└── source/
    ├── voice-rules.md           # Generated at runtime
    ├── guardrails.md            # Generated at runtime
    └── language-bank.md         # Generated at runtime
```

### Pattern 1: Agent Definition Frontmatter

Every agent in this project uses the same frontmatter structure. The new agent follows this exactly.

**What:** YAML frontmatter block at the top of the agent definition file.

**When to use:** All agent definitions.

```markdown
---
name: skill-bundle-packager
description: >
  Reads completed brand engagement outputs and produces a complete, usable
  skill bundle at workspace/output/skill-bundle/. Generates SKILL.md
  (behavioral voice instructions), brand-prompt.md (persona injection
  prose), and source/ reference files (voice-rules.md, guardrails.md,
  language-bank.md) lifted from the client package.

  **Triggers:**
  - Phase 8 assembly is complete
  - Lead strategist requests skill bundle generation

model: sonnet
tools: Read, Write, Glob, Grep
---
```

[VERIFIED: design-kit-foundation.md lines 1-15, document-assembler.md lines 1-20 — both use this exact frontmatter structure]

### Pattern 2: Conditional Input Handling with Glob

The agent must check for voice-fingerprint.md before reading it (D-10). This is the established project pattern.

**What:** Glob to test file existence, conditional read, graceful skip.

**When to use:** Any optional input that may or may not exist.

```markdown
## Input
- `workspace/output/client/voice-guide.md` — primary source (required)
- `workspace/output/client/brand-foundation.md` — positioning and archetype context (required)
- `workspace/STATE.md` — brand name and entity type (required)
- `workspace/output/client/practical-toolkit.md` — targeted read for Language Bank / Codify-Retire section only (required for language-bank.md extraction)
- `workspace/research/voice-fingerprint.md` (optional — read if present for brand-prompt.md enrichment; skip if absent)
```

[VERIFIED: document-assembler.md line 31, brand-verifier.md lines 40-43 — same conditional input pattern]

### Pattern 3: Two-Task Sequential Structure

The agent performs two logically separate operations. Following the design-kit-foundation.md pattern, these are explicitly numbered tasks.

**Task 1: Source File Extraction** — verbatim copy operations from voice-guide.md and practical-toolkit.md into skill-bundle/source/ files. No rewriting.

**Task 2: Bundle Synthesis** — read the extracted source files plus brand-foundation.md, STATE.md, and optionally voice-fingerprint.md to write SKILL.md and brand-prompt.md.

**Why tasks are sequential:** Task 2 draws from the source files created in Task 1. Writing source files first also gives the agent a chance to detect missing content before attempting synthesis.

[VERIFIED: design-kit-foundation.md structure — Task 1 (token extraction) completes before Task 2 (HTML post-processing) begins; same dependency relationship]

### Pattern 4: Error Handling and Pre-Flight Checks

The design-kit-foundation agent has an explicit "Before Starting" section that checks for required inputs before any work begins. The skill-bundle-packager needs the same.

```markdown
## Before Starting

Check that all required input files exist:
1. Glob `workspace/output/client/voice-guide.md` — if not found, stop and report: "voice-guide.md not found at workspace/output/client/. Phase 8 assembly must complete before running skill-bundle-packager."
2. Glob `workspace/output/client/brand-foundation.md` — same stop condition.
3. Glob `workspace/STATE.md` — same stop condition.
4. Glob `workspace/output/client/practical-toolkit.md` — same stop condition.
5. Glob `workspace/research/voice-fingerprint.md` — if not found, note: "voice-fingerprint.md absent — brand-prompt.md will be synthesized without quantitative voice enrichment." Continue.
```

[VERIFIED: design-kit-foundation.md lines 26-28 — exact same pattern with stop-on-missing for required input]

### Pattern 5: SKILL.md Frontmatter Format

The output SKILL.md file (generated by the agent) is a Claude Code skill file. The project's existing skill files use a consistent frontmatter format.

```markdown
---
name: [brand-name]-voice
description: >
  Voice and positioning instructions for [Brand Name]. Behavioral rules
  for writing, speaking, and presenting in this brand's voice.
---
```

[ASSUMED: The exact frontmatter fields for generated SKILL.md files follow Claude Code skill conventions. The project's own skill files (e.g., .claude/skills/brand-compass/phase-1-origin/SKILL.md) can be read as reference but the specific fields name/description are the minimum required fields — additional fields may apply.]

### SKILL.md Five-Section Structure

Per D-01 and D-02, the generated SKILL.md has exactly these five sections, written as behavioral rules:

| Section | Source Material | What It Contains |
|---------|----------------|-----------------|
| Voice Definition | voice-guide.md Sections 2+3 + voice-fingerprint.md one-liner | How the brand sounds; sentence rhythm rules; register targets; quantitative markers if available |
| Signature Moves | voice-guide.md Section 4 | Named techniques with frequency guidance, translated to "do this when X" instructions |
| Guardrails | voice-guide.md Section 5 | "Never do this" rules and word substitution table |
| Language Bank | skill-bundle/source/language-bank.md (already extracted) | Codify phrases to use; Retire phrases to avoid with replacements |
| Positioning Summary | brand-foundation.md Sections 3+5 + STATE.md | Who this brand is, who it serves, what it owns — written as context the consuming agent holds, not discovery rationale |

**Translation Rule in practice (D-03):** The packager reads archetype names from brand-foundation.md (e.g., "Sage" or "Rebel") and translates to behavioral output: not "You are a Sage archetype" (discovery language) but "You communicate as an authority who teaches — you share knowledge openly, you explain reasoning, and you never assert credentials without demonstrating them" (behavioral instruction).

### Pattern 6: brand-prompt.md Composition Algorithm

Per D-04/D-05/D-06, the brand-prompt.md is a 150-300 word flowing prose persona injection. The agent constructs it in priority order:

1. **Voice + archetype behavioral foundation** (~50-80 words): Opening sentence names the archetype character (translated, not the raw archetype name), followed by 2-3 sentences establishing the core voice feel — what the prose sounds like, what it never does. Source: brand-foundation.md Section 5 (personality) + voice-guide.md Section 2 (voice summary one-liner + voice tags).

2. **Positioning + territory as context** (~40-60 words): 1-2 sentences giving the brand's positioning and the territory it owns — written as things the persona "knows" or "believes," not as external description. Source: brand-foundation.md Section 3 (positioning statement + territory).

3. **1-2 personality traits and signature moves** (~30-50 words): The 1-2 most distinctive signature moves translated to behavioral instructions. Source: voice-guide.md Section 4 (top 2 signature moves) + brand-foundation.md Section 5 (top personality traits).

4. **One hard guardrail** (~20-30 words): A single closing "never do" line — the most brand-damaging violation. Source: voice-guide.md Section 5 (first "Never Do This" item).

**If voice-fingerprint.md is present** (D-12): Weave the one-liner and 1-2 quantitative markers into sections 1 and 3. Example: "...writes in short declarative bursts — 12-16 words per sentence on average..." This makes the persona more precise and copywriter-executable.

**Format constraint** (D-06): No `##` headers, no bullet points, no em-dash lists. One continuous flowing paragraph or 2-3 flowing paragraphs maximum. Should read like a persona description a writer would internalize.

### Anti-Patterns to Avoid

- **Transcribing discovery language into SKILL.md:** Writing "You are a Sage/Rebel/Caregiver archetype" or "Your territory is X" is a translation failure. Behavioral instructions must work for a stranger-agent.
- **Padding SKILL.md with rationale:** The consuming agent does not need to know WHY the voice is what it is. Every sentence should be an actionable instruction.
- **Merging language-bank.md without deduplication (D-09):** The phrases-to-avoid table in voice-guide.md and the Retire list in practical-toolkit.md will overlap. The agent must merge and deduplicate — not stack duplicates.
- **Reading drafts/ files (D-11):** The agent reads from workspace/output/client/ only. Drafts are pre-synthesis inputs already distilled into the output files. Reading both would introduce stale or intermediate data.
- **Section 5b Calibration Table handling:** voice-guide.md may or may not have a Section 5b Voice Calibration Table (present only if voice-fingerprint.md was used). The agent must guard against this: if Section 5b exists, include it in guardrails.md; if absent, skip gracefully.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File existence check | Custom file-not-found error handling logic | Glob pattern match — if Glob returns empty result for a required file, that IS the existence check | Glob is already available and returns empty list for non-existent paths; no need for Try/catch logic |
| Section extraction from markdown | Regex-based section parser | Rely on the known, stable section numbering in voice-guide.md (## Section 3:, ## Section 4:, ## Section 5:) — these are written by the Document Assembler and are structurally consistent | The Document Assembler always outputs voice-guide.md in the same format per its template; the section headers are predictable |
| Archetype translation logic | A lookup table of archetype-to-behavior mappings | Synthesis by the LLM at agent execution time — the agent reads the archetype + the voice data and translates in-context | An LLM can translate "Sage archetype" + "precise/educational/dry voice" to behavioral instructions far better than a static lookup table |

**Key insight:** This is a content transformation task, not a data processing task. The agent does not need algorithmic helpers — it needs precise extraction targets (section numbers, field names) and clear synthesis rules (the D-01 through D-12 decisions).

---

## Source File Extraction Detail

This section is the implementation blueprint for Task 1.

### voice-rules.md Extraction (D-08)

**Source sections from voice-guide.md:**

| Source | What to Copy |
|--------|-------------|
| `## Section 3: Writing Style` | Full section — all subsections (Sentence and Paragraph Rhythm, Structure Usage, Authenticity Spectrum) verbatim |
| `## Section 3b: Quantitative Voice Markers` | If present, include verbatim. If absent, skip. |
| `## Section 4: Signature Moves` | Full section — all named signature moves verbatim |

**Output file header:**
```markdown
# Voice Rules

*Extracted from voice-guide.md Sections 3 and 4.*
*Direct section copy — no rewriting.*
```

[VERIFIED: voice-guide.md reference example — Sections 3 and 4 contain Writing Style (sentence rhythm, structure usage, authenticity spectrum) and Signature Moves (named techniques with frequency and examples). Exactly the right material for a downstream copywriter.]

### guardrails.md Extraction (D-08)

**Source sections from voice-guide.md:**

| Source | What to Copy |
|--------|-------------|
| `## Section 5: Guardrails` | Full section verbatim — all subsections (Never Do This, Words and Phrases to Avoid, Quality Check) |
| `## Section 5b: Voice Calibration Table` | If present, include verbatim. If absent, skip. |

**Output file header:**
```markdown
# Guardrails

*Extracted from voice-guide.md Section 5.*
*Direct section copy — no rewriting.*
```

[VERIFIED: voice-guide.md reference example — Section 5 contains "Never Do This" (prohibitions), "Words and Phrases to Avoid" (table with avoid/why/say-instead columns), and "Quality Check" (self-audit questions). Section 5b is conditional on voice-fingerprint.md having been used.]

### language-bank.md Merge (D-08, D-09)

**Source 1 — voice-guide.md Section 5: Words and Phrases to Avoid**
The three-column table (Avoid | Why | Say Instead).

**Source 2 — practical-toolkit.md Language Bank section**
The Codify/Retire structure (Codify list + Retire list + Say This/Not That substitutions).

**Merge logic:**
1. Copy the Codify list from practical-toolkit.md (phrases to use — these have no equivalent in voice-guide.md).
2. Copy the Retire list from practical-toolkit.md (phrases to avoid with replacements).
3. Check the voice-guide.md "Words and Phrases to Avoid" table against the Retire list. For any word/phrase that appears in BOTH, keep the practical-toolkit.md version (it has the richer substitution guidance). Remove the duplicate from the voice-guide.md entries before adding any remaining unique voice-guide.md entries to the Retire section.
4. The Say This/Not That substitution table from practical-toolkit.md can be copied verbatim — it derives from the Retire list already merged.

**Output file structure:**
```markdown
# Language Bank

*Merged from voice-guide.md (phrases to avoid) and practical-toolkit.md (Codify/Retire classification).*
*Duplicates removed — practical-toolkit.md version retained for overlapping entries.*

## Codify (use these)
[from practical-toolkit.md]

## Retire (avoid these)
[merged, deduplicated]

## Say This / Not That
[from practical-toolkit.md, verbatim]
```

---

## Common Pitfalls

### Pitfall 1: Discovery Language Leakage into SKILL.md

**What goes wrong:** The agent reads archetype names (Sage, Rebel, Hero), territory labels ("compliance as growth infrastructure"), coined terms ("Market of One"), and pastes them directly into SKILL.md behavioral sections.

**Why it happens:** The source files use Brand Compass discovery language throughout. Without an explicit translation step, the agent will transcribe rather than translate.

**How to avoid:** The agent definition must explicitly instruct: "Do not copy archetype names, territory labels, or Brand Compass framework terms into SKILL.md. Translate each to a behavioral description that works without Brand Compass context." Include a worked example of this translation in the agent instructions.

**Warning signs:** SKILL.md contains words like "archetype," "territory," "Market of One," "intersection," "contrarian POV," or any proper noun coined during discovery.

### Pitfall 2: SKILL.md Word Count Under 200 Lines

**What goes wrong:** The agent produces a thin SKILL.md (50-80 lines) by writing section headers with 2-3 bullet points each.

**Why it happens:** LLMs default to concise when given a target length framed as "200+ lines" without explicit content requirements per section.

**How to avoid:** The agent definition must specify content requirements per section — not just "write a guardrails section" but the specific types of content expected (prohibitions, word substitution tables, quality check questions). The five-section breakdown in this research document is the template.

**Warning signs:** Any SKILL.md section under 15-20 lines likely has insufficient specificity for a consuming agent to act on.

### Pitfall 3: brand-prompt.md Becomes a Strategy Brief

**What goes wrong:** The agent writes brand-prompt.md as a structured brief with headings: "## Voice," "## Positioning," "## Guardrails" — bullets and headers throughout.

**Why it happens:** The agent has processed structured source files all session and defaults to structured output.

**How to avoid:** D-06 must be stated explicitly in the agent instructions with the rationale: "This file is a persona injection, not a brief. The consuming agent reads it as a system prompt prefix, not a reference document. Prose format is required."

**Warning signs:** Any `#` heading character or bullet point (`-`, `*`) in brand-prompt.md.

### Pitfall 4: Missing source/ Subdirectory Creation

**What goes wrong:** The agent writes `workspace/output/skill-bundle/source/voice-rules.md` but the `source/` subdirectory does not exist, causing a write error.

**Why it happens:** Phase 10 created `workspace/output/skill-bundle/` but not `workspace/output/skill-bundle/source/`.

**How to avoid:** The agent definition instructions should specify that Write tool calls with `source/` paths implicitly create the subdirectory (Claude's Write tool creates parent directories as needed). Alternatively, the agent can attempt a write to any path under `source/` — the Write tool will succeed.

**Warning signs:** This is actually not a pitfall for Claude Code's Write tool, which creates parent directories. Document it as a non-issue confirmed by the Write tool's behavior. [ASSUMED: Claude Code Write tool creates parent directories automatically. If this assumption is wrong, a pre-flight directory-creation step would be needed.]

### Pitfall 5: language-bank.md Duplication Without Merge

**What goes wrong:** The agent appends the voice-guide.md "Words and Phrases to Avoid" table directly below the practical-toolkit.md Retire list, creating duplicate entries for "leverage," "synergy," etc.

**Why it happens:** The deduplication requirement (D-09) is easy to overlook when the agent is performing a mechanical extraction pass.

**How to avoid:** The agent definition must explicitly note which phrases typically appear in both sources and instruct the deduplication logic: retain the practical-toolkit.md version for overlapping entries.

---

## Code Examples

Verified patterns from existing project agents:

### Agent Frontmatter Pattern

```markdown
---
name: skill-bundle-packager
description: >
  Reads completed brand engagement outputs and produces a complete, usable
  skill bundle at workspace/output/skill-bundle/. The bundle contains
  SKILL.md (behavioral voice instructions for consuming agents),
  brand-prompt.md (150-300 word persona injection prose), and source/
  reference files (voice-rules.md, guardrails.md, language-bank.md)
  extracted verbatim from the client package.

  **Triggers:**
  - Phase 8 assembly is complete and client outputs exist in workspace/output/client/
  - Lead strategist requests skill bundle generation

model: sonnet
tools: Read, Write, Glob, Grep
---
```

[VERIFIED: design-kit-foundation.md lines 1-15]

### Conditional File Read Pattern

```markdown
5. Glob `workspace/research/voice-fingerprint.md` — if found, read it now
   and note the one-liner and quantitative markers for use in Tasks 1 and 2.
   If not found, note: "voice-fingerprint.md absent — proceeding without
   quantitative enrichment." Continue without stopping.
```

[VERIFIED: document-assembler.md lines 23-31, brand-verifier.md lines 40-43]

### SKILL.md Five-Section Template

The agent should write SKILL.md using this structural template:

```markdown
---
name: [brand-name]-voice
description: >
  Voice and positioning instructions for [Brand Name]. Behavioral writing
  rules for any agent producing content in this brand's voice.
---

You are writing as [Brand Name]. Everything below defines how this brand
sounds, what it says, and what it never does.

## Voice Definition

[How this brand sounds — register, rhythm, sentence length rules, tone.
Written as instructions: "Write in short declarative sentences..."
NOT rationale: "The brand chose this voice because..."]

## Signature Moves

[Named techniques with usage frequency and worked examples.
Written as: "When introducing a new concept, follow with a plain-English
restatement..." NOT "The brand uses The Plain Translation technique."]

## Guardrails

[Prohibitions, word substitutions, quality check questions.
Written as: "Never use fear as a motivator..." with specific examples.]

## Language Bank

[Codify list (use these), Retire list (avoid with replacements),
Say This/Not That substitutions. Extracted from source/language-bank.md.]

## Positioning Summary

[Who this brand is, who it serves, what it owns — written as context the
consuming agent holds. NOT strategy rationale or discovery backstory.]
```

[VERIFIED: document-assembler.md voice-guide.md template (lines 293-403) — the source section numbering this agent reads from]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Skill bundles written manually after discovery | Packager agent automates extraction from completed client package | Phase 11 (now) | Eliminates manual copy-paste and translation step; ensures skill bundle stays in sync with client package content |
| No machine-consumable persona injection | brand-prompt.md as system prompt prefix | Phase 11 (now) | Consuming agents can be seeded with brand voice without any additional context |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Claude Code Write tool creates parent directories automatically, so writing to `workspace/output/skill-bundle/source/voice-rules.md` will succeed even if `source/` does not yet exist | Common Pitfalls — Pitfall 4 | Low risk — if wrong, add a pre-flight note in agent instructions about creating source/ directory first |
| A2 | The generated SKILL.md's frontmatter uses `name` and `description` as minimum required fields, following the same pattern as existing project skill files | Architecture Patterns — Pattern 5 | Low risk — if additional fields are required, they can be added in implementation without replanning |

**All other claims in this research were verified against actual project files read during this session.**

---

## Open Questions (RESOLVED)

1. **SKILL.md frontmatter: what fields beyond name/description?**
   - RESOLVED: PATTERNS.md Pattern 8 confirms the generated SKILL.md uses `name` and `description` fields only. The `disable-model-invocation: true` field must NOT be included (it would prevent the skill from being used). No `triggers` or `tools` fields needed — the SKILL.md is consumed by the end user's Claude Code instance, not by Brand Compass.

2. **Should the agent write a README.md or index file in skill-bundle/?**
   - RESOLVED: Scope is five files only (SKILL.md, brand-prompt.md, source/voice-rules.md, source/guardrails.md, source/language-bank.md) per CONTEXT.md decisions. If Phase 13 needs a manifest, it will be added then.

---

## Environment Availability

Step 2.6: SKIPPED — this phase creates one agent definition markdown file. No external tools, services, runtimes, or CLIs are required. The agent definition itself specifies sonnet + Read/Write/Glob/Grep, which are always available in Claude Code.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual verification (no automated test framework in project) |
| Config file | None |
| Quick run command | `ls workspace/output/skill-bundle/` + file content spot-checks |
| Full suite command | Read SKILL.md and verify five sections present + brand-prompt.md word count |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SKIL-01 | skill-bundle-packager.md exists with valid frontmatter | smoke | `ls .claude/agents/skill-bundle-packager.md` | ❌ Wave 0 |
| SKIL-01 | Agent invocation produces output without errors | smoke | Run agent against example-brand outputs; check for output files | ❌ Wave 0 |
| SKIL-02 | SKILL.md has valid frontmatter and all five sections | structural | `grep -c "^## " workspace/output/skill-bundle/SKILL.md` (expect 5+) | ❌ Wave 0 |
| SKIL-02 | SKILL.md is 200+ lines | structural | `wc -l workspace/output/skill-bundle/SKILL.md` | ❌ Wave 0 |
| SKIL-03 | brand-prompt.md is 150-300 words | structural | `wc -w workspace/output/skill-bundle/brand-prompt.md` | ❌ Wave 0 |
| SKIL-03 | brand-prompt.md contains no heading markers | structural | `grep -c "^#" workspace/output/skill-bundle/brand-prompt.md` (expect 0) | ❌ Wave 0 |
| SKIL-04 | source/ contains all three files | existence | `ls workspace/output/skill-bundle/source/` | ❌ Wave 0 |
| SKIL-04 | voice-rules.md contains Section 3/4 content | content | Manual spot-check against voice-guide.md | Manual |

### Sampling Rate

- **Per task commit:** `ls .claude/agents/skill-bundle-packager.md` (confirm file created)
- **Per wave merge:** Full structural check — file existence + line counts + section headers
- **Phase gate:** Run the agent against the example-brand outputs in `workspace/reference/example-brand/output/` and verify all five output files are produced with correct structure before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `workspace/output/skill-bundle/` — confirm directory exists (Phase 10 created it; verify before testing agent output)
- [ ] Example-brand outputs at `workspace/reference/example-brand/output/` — agent test harness needs voice-guide.md, brand-foundation.md, practical-toolkit.md; all three exist in reference/example-brand/output/ [VERIFIED]
- [ ] `workspace/reference/example-brand/` also needs STATE.md — check if it exists before planning the test task

---

## Security Domain

Not applicable — this phase creates an agent definition markdown file. No authentication, session management, access control, cryptography, or user input validation. Security domain is omitted.

---

## Sources

### Primary (HIGH confidence)

- `.claude/agents/design-kit-foundation.md` — agent frontmatter pattern, task structure pattern, conditional input pattern, model/tools selection
- `.claude/agents/document-assembler.md` — quality bar for 200+ line agent definitions, conditional voice-fingerprint pattern, voice-guide.md section numbering (authoritative section numbering source)
- `.claude/agents/brand-verifier.md` — conditional optional input pattern
- `workspace/reference/example-brand/output/voice-guide.md` — actual structure of voice-guide.md (Sections 1-6), verified section content for extraction mapping
- `workspace/reference/example-brand/output/practical-toolkit.md` — actual structure of practical-toolkit.md Language Bank, verified Codify/Retire structure
- `.planning/phases/11-agent-skill-bundle/11-CONTEXT.md` — all locked decisions D-01 through D-12
- `.planning/REQUIREMENTS.md` — SKIL-01 through SKIL-04 requirement definitions

### Secondary (MEDIUM confidence)

- `.planning/phases/10-output-foundation/10-VERIFICATION.md` — confirms Phase 10 completion status and which output directory structures exist

### Tertiary (LOW confidence)

None.

---

## Metadata

**Confidence breakdown:**
- Agent definition structure: HIGH — verified against 14 existing agent files
- Content extraction mapping: HIGH — verified against actual voice-guide.md and practical-toolkit.md reference files
- SKILL.md output format: HIGH — five-section structure is locked (D-01/D-02), section content derived from verified source files
- brand-prompt.md composition: HIGH — composition algorithm locked (D-04/D-05/D-06), source fields identified in verified files
- Test approach: MEDIUM — no existing test framework in project; manual/structural checks only

**Research date:** 2026-04-20
**Valid until:** 2026-05-20 (stable domain — agent definition authoring against fixed file formats)
