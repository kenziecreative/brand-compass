# Phase 11: Agent Skill Bundle - Context

**Gathered:** 2026-04-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the skill-bundle-packager agent (sonnet, Read/Write/Glob/Grep) that reads completed brand engagement outputs and produces a complete, usable Claude Code/Cowork skill bundle at `workspace/output/skill-bundle/`. The bundle contains three files: SKILL.md (behavioral instructions), brand-prompt.md (persona injection prose), and source/ reference files (voice-rules.md, guardrails.md, language-bank.md). This phase does NOT modify discovery phases, client specimens, or design kit outputs.

</domain>

<decisions>
## Implementation Decisions

### SKILL.md Content Design
- **D-01:** SKILL.md is **thorough** (200+ lines) with all five required sections fully specified: voice definition, signature moves, guardrails, language bank, positioning summary. The consuming agent has no discovery session — the SKILL.md is everything it knows.
- **D-02:** Each section is written as **enforceable behavioral rules**, not rationale paragraphs. Strategy backstory that the consuming agent doesn't need is excluded.
- **D-03:** **Translation Rule** — The packager must convert discovery-phase language (archetype names, territory labels, coined terms) into behavioral instructions a stranger-agent can act on without Brand Compass context. No raw discovery terminology in SKILL.md.

### brand-prompt.md Synthesis
- **D-04:** brand-prompt.md uses **voice-and-archetype-led** composition — opens with archetype identity and voice character, embeds positioning as context the persona holds. This is a persona injection, not a brief.
- **D-05:** Element priority order within the 150-300 word constraint: (1) voice + archetype behavioral foundation, (2) positioning + territory as context, (3) 1-2 personality traits and signature moves, (4) one hard "never do" guardrail — the single most brand-damaging violation.
- **D-06:** No headings, no bullets — flowing prose format that reads as a single continuous persona description.

### Source File Extraction
- **D-07:** **Direct section copy** — lift sections verbatim from client package files with no rewriting or restructuring. Client-facing prose framing is itself useful instruction for consuming agents.
- **D-08:** Specific extraction mapping:
  - `voice-rules.md` ← voice-guide.md Section 3 (Writing Style) + Section 4 (Signature Moves)
  - `guardrails.md` ← voice-guide.md Section 5 (Guardrails) + Calibration Table if present
  - `language-bank.md` ← **merged** from voice-guide.md phrases-to-avoid table + practical-toolkit.md Codify/Retire classification (deduplication, not restructuring)
- **D-09:** language-bank.md is the one file that combines two sources — this is deduplication of overlapping content, not a restructuring transform.

### Agent Input Mapping
- **D-10:** **Minimal viable input set (3 required + 1 conditional):**
  - Required: `workspace/output/client/voice-guide.md`, `workspace/output/client/brand-foundation.md`, `workspace/STATE.md`
  - Conditional: `workspace/research/voice-fingerprint.md` (Glob to check existence, read if present, skip gracefully if not)
  - Targeted: `workspace/output/client/practical-toolkit.md` read only for Language Bank / Codify-Retire section during language-bank.md extraction
- **D-11:** `drafts/` and other `research/` files are pre-synthesis inputs already distilled into output files — the packager does not read them.
- **D-12:** voice-fingerprint.md is the highest-value enrichment file — its voice profile summary one-liner and quantitative markers significantly improve brand-prompt.md prose quality.

### Claude's Discretion
- Agent definition file structure and internal organization (follows existing agent patterns in .claude/agents/)
- SKILL.md frontmatter field names and format (follows Claude Code skill file conventions)
- Error handling when required input files are missing (agent should report clearly and stop)
- Internal section ordering within source/ files

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` — SKIL-01 through SKIL-04 define all skill bundle requirements
- `.planning/ROADMAP.md` — Phase 11 success criteria and dependency on Phase 10
- `.planning/milestones/v2.0-REQUIREMENTS.md` — Full PRD context including PRD adjustments

### Agent Definitions (pattern references)
- `.claude/agents/document-assembler.md` — Existing thorough agent definition (200+ lines, similar complexity to what skill-bundle-packager will produce)
- `.claude/agents/design-kit-foundation.md` — Phase 10 agent created with same tool/model pattern (sonnet, Read/Write/Glob/Grep)
- `.claude/agents/copywriter.md` — Example of agent that consumes voice data (263 lines)
- `.claude/agents/voice-analyzer.md` — Example of agent that produces voice data (155 lines)

### Client Package Files (agent inputs)
- `workspace/output/client/voice-guide.md` — Primary source for voice definition, signature moves, guardrails, calibration table
- `workspace/output/client/brand-foundation.md` — Source for positioning summary, archetype, core belief
- `workspace/output/client/practical-toolkit.md` — Source for Codify/Retire language bank (targeted read)
- `workspace/research/voice-fingerprint.md` — Conditional enrichment for brand-prompt.md prose

### Phase 10 Context (prior decisions)
- `.planning/phases/10-output-foundation/10-CONTEXT.md` — Output directory structure decisions, token pipeline, dual-specimen pattern

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- 14 existing agent definitions in `.claude/agents/` — established pattern for frontmatter, trigger descriptions, input/output sections, and task organization
- design-kit-foundation.md — most recent agent created in Phase 10, same sonnet/Read/Write/Glob/Grep pattern
- Document Assembler's voice-guide.md template structure — defines the section numbering (3-5) that source file extraction maps to

### Established Patterns
- Agent definitions use `---` YAML frontmatter with name, description, model, tools fields
- Agents specify their inputs, pre-flight checks, and tasks as sequential numbered sections
- Existing agents use Glob to check file existence before reading conditional inputs
- `workspace/output/skill-bundle/` directory exists (created by Phase 10) but is empty — ready for output

### Integration Points
- `workspace/output/skill-bundle/` — target output directory (exists, empty)
- `workspace/output/skill-bundle/source/` — subdirectory for extracted reference files (needs creation)
- Phase 8 skill file will need to orchestrate this agent's launch (Phase 13 scope, not this phase)
- Brand Verifier will need skill-bundle structure checks (Phase 13 scope, not this phase)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 11-agent-skill-bundle*
*Context gathered: 2026-04-20*
