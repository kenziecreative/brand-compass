# Brand Compass Feature Research

This research project evaluates and improves the Brand Compass 8-phase brand development system. It researches current branding methodologies, identifies pipeline gaps, assesses deliverable completeness, and surfaces opportunities from adjacent tools and frameworks that could strengthen the system. The goal is a prioritized set of evidence-based recommendations, not an exhaustive wish list.

## Directory Structure

```
research/
├── research-plan.md          # Master research prompt (the assignment)
├── STATE.md                  # Persistent research state
├── sources/
│   └── registry.md           # Index of all processed sources
├── notes/                    # Structured notes per source
├── drafts/                   # Unaudited synthesis (written by /summarize-section)
├── outputs/                  # Audited, final sections (promoted by /audit-claims only)
├── audits/                   # Claim audit reports
├── reference/                # Protocol and standards reference files
│   └── canonical-figures.json # Single source of truth for cross-phase numbers
├── cross-reference.md        # Cross-source patterns
└── gaps.md                   # Coverage tracker
```

Do not create files outside this structure for research artifacts. Working files go in `research/`. Synthesized sections go to `research/drafts/` first. Only `/audit-claims` promotes a draft to `research/outputs/`. Nothing in `outputs/` should exist without a corresponding audit report in `audits/`.

**Project boundary rule:** All file writes during a research session must stay within the current research project directory. Do not write to other projects, system directories, or external paths — even when responding to a user request that could be handled by a skill designed for a different context (e.g., a note-capture skill pointed at another project). If the user wants to capture a note or action item, write it to `research/notes-to-self.md` within this project. Never invoke a skill that writes outside the current project directory.

## Agents

| Agent | Trigger | Job | Speed |
|-------|---------|-----|-------|
| `source-processor` | `/process-source <url-or-file>` | Processes raw source into structured note | Medium (sonnet) |
| `cross-referencer` | `/cross-ref` | Finds patterns across all processed notes | Medium (sonnet) |
| `claim-auditor` | `/audit-claims <filepath>` | Fact-checks a draft against source notes | Medium (sonnet) |
| `gap-tracker` | `/check-gaps` | Maps research coverage, identifies holes | Fast (haiku) |
| `research-summarizer` | `/summarize-section <name>`, `/summarize-all` | Synthesizes notes into polished draft sections | Medium (sonnet) |
| `research-integrity` | After writing any source note, draft, or synthesis | Watches for fabricated data, range narrowing, qualifier stripping, cross-phase drift, unsourced claims | Medium (sonnet) |

## Workflow

The standard research cycle:

1. **Plan** — Research plan is in `research/research-plan.md`. Read it before starting.
2. **Collect** — Use `/process-source` for each URL, PDF, or document. Do this repeatedly.
3. **Connect** — Run `/cross-ref` after every 5-8 new sources to find patterns. This is mandatory, not optional.
4. **Assess** — Run `/check-gaps` to see what's still missing. Fill gaps with more sources.
5. **Synthesize** — Use `/summarize-section` to produce a draft in `research/drafts/`. This is NOT a final output.
6. **Verify** — Run `/audit-claims` on the draft. This is what promotes it from `drafts/` to `outputs/`. No exceptions.

**Enforcement rules — these are structural, not guidelines:**

- **Nothing reaches `research/outputs/` without passing `/audit-claims`.** `/summarize-section` writes to `research/drafts/`. `/audit-claims` checks the draft against source notes and, if it passes, moves it to `research/outputs/`. If it fails, the draft stays in `drafts/` with an audit report listing what needs fixing.
- **`/cross-ref` is mandatory after every 5-8 new sources.** Before processing a 9th source without a cross-reference, stop and run `/cross-ref` first. `research/cross-reference.md` must reflect current patterns at all times.
- **`/check-gaps` is mandatory before starting a new phase.** Do not begin Phase N+1 until `/check-gaps` has confirmed coverage status for Phase N. If gaps remain, fill them or document them explicitly in `research/gaps.md` with a reason they're acceptable.
- **Phase completion requires all four checks.** A phase is not complete until: cross-reference is current, gaps are assessed, draft is written, and audit has passed. STATE.md should not mark a phase complete until all four are done.
- **Canonical figures registry is the source of truth for cross-phase numbers.** When citing a number from a previous phase, check `research/reference/canonical-figures.json` first. If registered, use the canonical value. If not registered and this is a cross-phase citation, register it before using it. Never copy numbers from STATE.md summaries or conversation memory.

**Clear context between phases.** Each phase should start with a fresh context window. STATE.md and your research files carry everything forward — nothing critical lives in conversation history. A fresh context for each phase produces sharper analysis than a saturated one. Before clearing, ensure STATE.md is fully up to date with current position, completed work, and next action. After clearing, read STATE.md first before resuming work.

**At the end of every phase, remind the user:** "Phase [N] is complete and STATE.md is updated. I'd recommend clearing context before starting Phase [N+1] — you'll get sharper results with a fresh window, and nothing is lost because STATE.md has everything."

## Exploratory Thesis Standards

### What to Explore
- Theoretical foundations — is the academic/intellectual base solid, or cherry-picked?
- Core claims — does the evidence support the thesis, complicate it, or contradict it?
- Cultural and behavioral dynamics — do the assumed patterns hold up against data?
- Landscape — who's already working on this, and what's the white space?
- Audience and market — is there a viable audience, and what do they actually need?
- Feasibility — can this be built/executed, and what are the real constraints?
- The core provocation — does the central question or insight survive scrutiny?

### Finding Tags
- **SUPPORTED** — Evidence supports this thesis claim or assumption
- **COMPLICATED** — Evidence adds nuance, conditions, or limitations to the position
- **CONTRADICTED** — Evidence challenges or undermines this position
- **EMERGING** — New or developing trend with limited but promising evidence
- **GAP** — Area needs more research or isn't answerable with available sources

## State Management

Research state lives in `research/STATE.md`. It is the source of truth for project position — not memory, not conversation history, not file timestamps.

On every new session or after context clear: Read `research/STATE.md` first. Don't start working until you know where you are.

During work: Update state at every transition — phase start/end, meaningful task completion, user decisions. Write state BEFORE doing anything expensive in case of compaction.

## Context Management

This is a long-running project. Clear context between research phases — each phase gets a fresh window for sharper analysis. STATE.md is the source of truth that carries everything forward. Before clearing context, always update STATE.md with current position, completed work, key decisions, and next action. After clearing or starting a new session: read `research/STATE.md` first. If unsure what's been done, run `/check-gaps` before starting new work.

## Boundaries

- This project is research and exploration, not implementation. Do not write product code, deploy anything, or modify systems outside `research/`.
- Do not fabricate sources or data. If information isn't findable, log it as a gap.
- Do not over-index on any single source. Triangulate.
- If a research question can't be answered with available tools and public sources, say so in `gaps.md` and flag it as needing primary research.

## Reference Protocols

Detailed protocols are in `research/reference/`. Read the relevant file when you need the full protocol:

| Protocol | File | Read When |
|----------|------|-----------|
| Source & Evidence Standards | `research/reference/source-standards.md` | Processing sources, citing evidence, assessing credibility |
| Writing & File Standards | `research/reference/writing-standards.md` | Writing output sections, naming files |
| Tools Guide (Tavily) | `research/reference/tools-guide.md` | Using Tavily search, extract, map, or crawl |
