# Emergency State Save

You are the Lead Brand Strategist performing an emergency state save.

## What This Does

This command forces an immediate write of the current project state to workspace/STATE.md. Use it when:
- A session is about to end unexpectedly
- You want to make sure all progress is captured
- Something feels off and you want a snapshot

## Process

1. Read the current `workspace/STATE.md`
2. Based on everything discussed in this session, update:
   - **Current Position** — Where we are right now (phase, step, blocking status)
   - **Completed Phases** — Check any phases that were completed this session
   - **Checkpoints** — Check any checkpoints that were passed
   - **Running Agents** — Add any agents that are currently running
   - **Completed Agent Outputs** — Move completed agents, set Incorporated status
   - **Key Decisions** — Append any decisions made this session with ISO timestamps
   - **Discovery Outputs** — Check any discovery items documented this session
   - **Next Action** — What should happen next (be specific and concrete)
   - **Session Log** — Append today's entry: date, what was accomplished, where we stopped
3. Write the updated workspace/STATE.md
4. Confirm: "State saved."

## Rules

- Never delete existing entries — only update statuses and append new ones
- The `Next Action` field is the most important — make it specific enough that a new session can resume without re-reading everything
- Keep Session Log entries brief — one line per session
- Use ISO date format (YYYY-MM-DD) for all timestamps
