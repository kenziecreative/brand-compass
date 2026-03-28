---
name: verify
description: "Verify brand deliverable quality — completeness, substance, and consistency"
disable-model-invocation: true
argument-hint: "[phase number or 'all']"
allowed-tools: Read, Grep, Glob
---


# /brand-compass:verify

Verify that brand deliverables are complete, substantive, and internally consistent. Inspired by GSD's verification patterns — existence, substance, wiring, and functional checks adapted for brand content.

## When to Run

- After any phase completes (verify that phase's outputs)
- Before checkpoints (ensure foundation is solid before proceeding)
- After document assembly (Phase 8 — verify all output files)
- Before export (final quality gate)
- Anytime something feels off

## Step 1: Determine Scope

Read `workspace/STATE.md` to understand what's complete.

**If argument provided:**
- A number (e.g., "3") → verify only that phase's outputs
- "all" → verify everything that's been completed

**If no argument:**
- Default to verifying all completed phases

Note which phases are complete, which checkpoints are passed, and which asset packs are selected.

## Step 2: Spawn Brand Verifier

Launch the brand-verifier agent with the scope determined in Step 1:

```
Task(
  prompt="Verify brand deliverables for [scope].

  Completed phases: [list]
  Checkpoints passed: [list]
  Asset packs selected: [list]
  Client name: [name]

  Run all four verification levels (Existence, Substance, Consistency, Coverage)
  and return the scored report.",
  subagent_type="brand-verifier"
)
```

## Step 3: Present Results

Route based on the verifier's report status.

---

**If PASS:**

### Brand Verification — Passed

**Scope:** [phases checked]

| Check | Score |
|-------|-------|
| Existence | [N/M] files present |
| Substance | 0 placeholders found |
| Consistency | 0 mismatches |
| Coverage | [N/M] discovery outputs verified |

All deliverables are complete, substantive, and internally consistent.

---

**Next steps:**

If all phases complete:
- `/brand-compass:export` — package deliverables for delivery

If more phases remain:
- `/brand-compass:phase-[N]` — continue to next phase

---

**If ISSUES FOUND:**

### Brand Verification — Issues Found

**Scope:** [phases checked]

| Check | Score | Issues |
|-------|-------|--------|
| Existence | [N/M] | [missing files] |
| Substance | [N] placeholders | [locations] |
| Consistency | [N] mismatches | [details] |
| Coverage | [N/M] | [gaps] |

#### Critical Issues
[List each critical issue with file path and specific location]

#### Warnings
[List each warning with suggestion for resolution]

---

**To fix:**
- If missing files → run the relevant phase command or Document Assembler
- If placeholders → the phase that owns that content needs to be revisited
- If consistency issues → update the out-of-sync document to match the source of truth
- If coverage gaps → the discovery output was marked complete but content is missing

---

**If INCOMPLETE (phases not done yet):**

### Brand Verification — Incomplete

**Completed:** [N/8] phases
**Verified:** [what was checked]

[Report for completed phases only]

**Not yet verifiable:**
- Phase [N]: [name] — not started
- [etc.]

Complete remaining phases before full verification is possible.

---

## Step 4: Optional Conversational Quality Review

After automated checks pass, offer:

"Automated checks passed. Would you like me to walk through the key brand decisions for a quick quality review? I'll present the core elements and you can confirm they still feel right."

If the client says yes, present a condensed version of what the checkpoint commands show:

1. **Core Belief** — read the belief statement, ask "Still true?"
2. **Audience** — read the Market of One, ask "Still your person?"
3. **Positioning** — read the positioning statement, ask "Still your lane?"
4. **Tagline** — read it, ask "Still your line?"
5. **Voice** — read the one-liner, ask "Still your sound?"
6. **Colors** — list the palette, ask "Still your look?"

Keep it light. One question per element. Don't linger.

## Guidelines

- Automated checks should run fast — the agent reads files and scans patterns, it doesn't do deep analysis
- Present results clearly with specific file paths so the user can find and fix issues
- Don't block on warnings — only critical issues (missing required files, unfilled critical sections) should prevent export
- The conversational review is optional — don't force it if the user just wants the automated report
- This command complements checkpoints, it doesn't replace them. Checkpoints are for strategic alignment. Verify is for content completeness.
