---
description: Post-phase sanity check before context clear or phase transition
---

# /sanity-check

Run this after completing a phase, before clearing context, or when something feels off about the project state.

## Behavior

### 1. Cleanup Verification

Run these checks:

```bash
# Check for empty directories in the frontend app
find src/ -type d -empty 2>/dev/null || echo "No empty directories"

# Check for hardcoded user paths in source code
grep -r "/Users/" src/ 2>/dev/null || echo "No hardcoded paths in source"

# Check for .env files accidentally present (should be gitignored)
find . -maxdepth 2 -name ".env*" -not -name ".env.example" 2>/dev/null || echo "No env files exposed"

# Check for orphan files at project root that belong in workspace/reference/
ls *.png *.jpg *.jpeg 2>/dev/null && echo "WARNING: Image files at project root — move to workspace/reference/" || echo "No orphan images at root"

# Verify TypeScript compiles clean
npx tsc --noEmit 2>&1

# Verify Vite builds clean (if dependencies installed)
if [ -f package.json ] && [ -d node_modules ]; then
  npm run build 2>&1 | tail -10
fi
```

Report any issues found.

### 2. Documentation Currency

**Primary source of truth:** `workspace/STATE.md` (tracks phase completion, agent status, discovery outputs)

Read and verify these files are current:

1. **`workspace/STATE.md`** — Check phase completion checkboxes, discovery outputs, next action. Is the current position accurate? Is the next action specific enough to resume?
2. **`CLAUDE.md`** — Does it reflect the current agent table, phase instructions, and final deliverables? Any drift from what's actually implemented?
3. **Agent definitions** (`.claude/agents/*.md`) — Do all 11 agents exist? Do their descriptions match what CLAUDE.md says they do?
4. **Command definitions** (`.claude/commands/brand-compass/*.md`) — Do all 13 commands exist? Do they reference the correct agents and prerequisite phases?

**Sync check:** Compare what STATE.md says is the current phase against what CLAUDE.md describes for that phase's discovery questions and agent triggers. They should agree.

If any are stale, update them now.

### 3. Architecture Alignment

Answer these questions (output your answers):

1. **Backend:** How many agents exist in `.claude/agents/`? (Should be at least 12: state-reader, state-writer, memory-extractor, research-analyst, content-auditor, archetype-analyst, copywriter, voice-analyzer, visual-director, image-generator, document-assembler, brand-verifier. Dev-only: implementation-verifier — may not be present in distributed copies.)
2. **Commands:** How many commands exist in `.claude/commands/brand-compass/`? (Should be at least 16: start, 8 phase commands, 2 checkpoints, resume, save-state, export, sanity-check, verify. Dev-only: verify-build — may not be present in distributed copies.)
3. **Frontend:** Do the phase content cards in `src/components/cards/` match the type definitions in `src/types/brand.ts`? (Should be 7 cards: Belief, Audience, Positioning, Archetype, Messaging, Voice, VisualDirection)
4. **Phase config:** Does `src/lib/phase-utils.ts` have entries for all 8 phases with correct names, icons, groups, and discovery output keys?
5. **Output files:** Does the Document Assembler agent description list all 8 core output files plus asset pack HTML specimens? Do the OutputPage deliverable entries match?
6. **Type coverage:** Does `src/types/brand.ts` have content types for all 7 phases in the `PhaseContent` discriminated union?

### 4. Agent-Command Integration

Verify the agent-command mapping is consistent:

| Phase Command | Expected Agent(s) | Agent File Exists? |
|---------------|-------------------|-------------------|
| phase-1-origin | Content Auditor (optional) | `.claude/agents/content-auditor.md` |
| phase-2-audience | Research Analyst (optional) | `.claude/agents/research-analyst.md` |
| phase-3-positioning | (none) | — |
| phase-4-personality | Archetype Analyst | `.claude/agents/archetype-analyst.md` |
| phase-5-messaging | Copywriter | `.claude/agents/copywriter.md` |
| phase-6-voice | Voice Analyzer | `.claude/agents/voice-analyzer.md` |
| phase-7-visual | Visual Director (blocking), Image Generator | `.claude/agents/visual-director.md`, `.claude/agents/image-generator.md` |
| phase-8-toolkit | Document Assembler | `.claude/agents/document-assembler.md` |

Check each agent file exists and its description mentions the correct output location:
- Content Auditor → `workspace/research/content-audit.md`
- Research Analyst → `workspace/research/competitive-brief.md`
- Archetype Analyst → `workspace/research/archetype-assessment.md`
- Copywriter → `workspace/drafts/messaging-options.md`
- Voice Analyzer → `workspace/research/voice-fingerprint.md`
- Visual Director → `workspace/drafts/visual-direction.md`
- Document Assembler → `workspace/output/*.md` and `workspace/output/*.html`

Report any mismatches.

### 5. Frontend Health

Check that the frontend application is functional:

```bash
# TypeScript compilation
npx tsc --noEmit 2>&1

# Check dev server responds (if running)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3005 2>/dev/null || echo "Dev server not running"

# Check key routes respond (if dev server running)
for route in "/" "/phase/1" "/phase/4" "/phase/8" "/output"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3005$route" 2>/dev/null)
  echo "  $route → $STATUS"
done
```

If the dev server is not running, note it but don't fail — suggest `npm run dev` to start it.

### 6. Memory & Context

Check the persistent memory system:

1. Read auto memory at `~/.claude/projects/-Users-kelseyruger-knz-brand-guidance/memory/MEMORY.md` — is it current? Does it contain patterns worth preserving?
2. Check for `working-memory.md` in the same directory — if it exists, is it from the current session or stale?
3. Check for session snapshots in `memory/sessions/` — how many exist? Are old ones pruned?
4. Did this session produce decisions or patterns that should be saved to memory?

Update memory files if anything new was learned.

### 7. Context Handoff

Check that a fresh Claude session would understand the project:

1. Read `CLAUDE.md` — does it reflect the current state of the project? Are the phase instructions, agent table, and deliverables section accurate?
2. Read `STATE.md` — is the `Next Action` field specific enough to resume without re-reading everything?
3. Are there any implicit decisions from this session that need documenting in STATE.md Key Decisions?
4. Is the Session Log current?

Update any files that are stale.

### 8. Summary

Output a summary table:

```
| Check              | Status    | Issues |
|--------------------|-----------|--------|
| Cleanup            | pass/fail | ...    |
| Documentation      | pass/fail | ...    |
| Architecture       | pass/fail | ...    |
| Agent-Command Sync | pass/fail | ...    |
| Frontend Health    | pass/fail | ...    |
| Memory             | pass/fail | ...    |
| Context Handoff    | pass/fail | ...    |
```

If all pass, output: **"Sanity check passed. Safe to clear context or proceed to next phase."**

If any fail, fix them before proceeding.

## When to Run

- After completing a brand phase and before starting the next
- Before clearing context on a long session
- After a batch of structural changes (new agents, commands, components)
- When something feels "off" about the project state
- Before running `/brand-compass:export`
