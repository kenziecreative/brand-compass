# Phase 1: Baseline + Quick Wins - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Commit existing local changes as a clean baseline, then apply all 13 quick-win file edits — adding discovery questions to CLAUDE.md and command files, changing agent triggers, and strengthening checkpoint protocols. No new capabilities, no structural reorganization — surgical edits to existing files.

</domain>

<decisions>
## Implementation Decisions

### Baseline commit strategy
- Two logical commits: (1) all tracked file changes (Phase 1/3 conditionals, checkpoint-a, verifier, assembler, STATE-template, example-brand outputs), (2) untracked feature-support/ directory as research archive
- PROJECT-WRITEUP.md moves into feature-support/research/source-material/ before committing
- feature-support/ is committed in the research archive commit, then added to .gitignore so future changes stay local
- After both baseline commits land, force-push to remote to overwrite the 3 trivial README commits — local is master copy

### Question placement
- **QW-1** (competitive alternatives): Phase 2, Finding Common Thread section, after Q6 ("What's their real problem?")
- **QW-2** (anxiety + habit force): Phase 2, Market of One section, after Q9 ("What keeps them up at night?")
- **QW-3/4/5** (brand history, named competitors, perception gap): In the `/brand-compass:start` command file (where Phase 0 actually runs), not in CLAUDE.md. CLAUDE.md Phase 0 section gets a reference note only
- **QW-6** (outside-in category): Phase 3, Territory section (before Contrarian POV)
- **QW-7** (accessibility): Phase 7, as opening questions before the visual direction discussion begins — establishes accessibility as a design constraint, not an afterthought

### Agent trigger wording
- **QW-8** (Research Analyst required): Hard gate — Research Analyst MUST complete before Phase 3 begins. No escape hatch. Auto-launches at Phase 2 completion using named competitors from Phase 0 + audience segments from Phase 2. Agent table row changes from "Optional" trigger to "Required"
- **QW-10** (devil's advocate pass): Mandatory step in Phase 5 before messaging is finalized. After Copywriter generates options and client picks favorites, facilitator MUST challenge the chosen tagline, narrative, and boilerplate against Phase 3 positioning. Client sees the challenge and confirms or adjusts

### Checkpoint challenge depth
- Focused instruction paragraph (not a multi-step protocol or scoring system)
- Both Checkpoint A and Checkpoint B get the challenge requirement
- Checkpoint A scope: Phases 1-3 (strategic foundation)
- Checkpoint B scope: Phases 4-6 only (new work since A — avoids re-litigating settled decisions)
- Instruction: "Before passing, identify the single weakest element, challenge the client on it, explain why it's weak, propose how to strengthen it. Client can accept or defend — but must engage"

### Claude's Discretion
- Exact wording of each new discovery question (research docs have intent, Claude crafts the conversational phrasing)
- QW-6 (outside-in category) exact position within the Territory subsection
- QW-11/12/13 placement within document-assembler.md template sections
- Commit message wording for baseline commits

</decisions>

<code_context>
## Existing Code Insights

### Key Files Being Edited
- **CLAUDE.md** (713 lines): Main orchestration doc. Phase sections at lines 239-632, Agent Table at line 135, Checkpoints at line 127
- **.claude/commands/brand-compass/start.md**: Phase 0 onboarding command — target for QW-3/4/5
- **.claude/commands/brand-compass/checkpoint-a.md** (89 lines): Checkpoint A gate — target for QW-9
- **.claude/agents/document-assembler.md** (624 lines): Document generation — target for QW-11/12/13
- **workspace/STATE-template.md** (80 lines): State template — needs Competitors field for QW-4

### Insertion Points in CLAUDE.md
- Phase 0 section: line 101 (reference note for QW-3/4/5)
- Phase 2 Finding Common Thread: after line ~301 (QW-1)
- Phase 2 Market of One: after line ~307 (QW-2)
- Phase 3 Territory: lines ~345-373 (QW-6)
- Phase 5: after line ~477 (QW-10 devil's advocate)
- Phase 7: lines ~547-554 (QW-7 accessibility, as new opening)
- Agent Table: line 139 (QW-8 trigger change)
- Checkpoints section: line 127 (QW-9 challenge requirement)

### Established Patterns
- Discovery questions are numbered sequentially within each phase section
- Agent triggers use consistent format in the Agent Table: "trigger description" in the Trigger column
- Checkpoint commands use step-based structure (Step 1-5)

### Integration Points
- QW-4 (competitors field) requires changes in both start.md and STATE-template.md
- QW-8 (Research Analyst required) requires changes in both the Agent Table and the Phase 2/3 transition text
- Checkpoint B command file needs the same challenge instruction as Checkpoint A

</code_context>

<specifics>
## Specific Ideas

- Quick-win specifications with exact intent are documented in feature-support/research/drafts/09-quick-wins.md (172 lines) — use this as the source of truth for what each QW should accomplish
- The research archive (feature-support/) contains 7 research phases, 35 sources, 37 cross-reference patterns — worth preserving in git history even though it's gitignored going forward

</specifics>

<deferred>
## Deferred Ideas

- **Brand refresh mode** — ability to feed previous brand outputs back through the system as inputs for an update/refresh cycle. Content Auditor already handles existing content, but a dedicated "refresh" flow that pre-populates from prior outputs would be a separate capability. Note for future milestone.

</deferred>

---

*Phase: 01-baseline-quick-wins*
*Context gathered: 2026-03-27*
