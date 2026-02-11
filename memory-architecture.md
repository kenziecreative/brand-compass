# Multi-Layer Memory for AI Agents

How to give an LLM agent persistent, scoped memory across sessions — and why a single "memory file" isn't enough.

## The Problem

AI agents forget everything between sessions. The context window — the conversation itself — is the only memory they have, and it's temporary. Long conversations get compressed. Sessions end. The agent starts fresh every time.

For simple, one-shot tasks, this is fine. For anything that spans multiple sessions — a consulting engagement, a software project, a marketing campaign — it's a dealbreaker. The agent needs to remember what happened, what was decided, and what comes next without asking you to re-explain.

The naive solution is "save everything to a file." But that creates its own problems. Different information has different lifespans, audiences, and access patterns:

- A process definition should last forever and be shared with everyone
- A project decision needs to survive for weeks but only matters to one engagement
- A debugging workaround should persist across sessions but only matters to the person running the tool
- The current task only needs to last until it's done

Putting all of this in one place creates a mess. The solution is layers.

## The Five Layers

### Layer 1: Process Instructions — "How We Work"

**What it is:** A markdown file checked into the repo (e.g., `CLAUDE.md`) that describes how the agent should operate.

**Contains:**
- The workflow or process the agent follows
- Roles and responsibilities (what the agent does, what specialists handle)
- Decision criteria (when to proceed, when to pause, when to escalate)
- Quality standards and completion criteria
- Error handling protocols

**Lifespan:** As long as the codebase. Changes through deliberate code updates.

**Who needs it:** Everyone who uses the project.

**Analogy:** The employee handbook. A new hire (or a new session) reads it and immediately knows the process — no training required.

**Example:** A marketing agency might define their campaign process: "Phase 1 is audience research. Phase 2 is messaging. Phase 3 is creative. Don't start creative until messaging is approved." The agent reads this and follows it every time, for every client.

### Layer 2: Project State — "Where Things Stand"

**What it is:** A structured file (e.g., `STATE.md`) that tracks the current position of a specific project or engagement.

**Contains:**
- Who the client/project is (name, context, key details)
- What's been completed (phase checkboxes, milestones)
- What's been decided (timestamped decisions with rationale)
- What's in progress (running tasks, pending deliverables)
- What's next (specific enough to resume without re-reading everything)
- Session history (dated log of what happened when)

**Lifespan:** The duration of the project. Created at kickoff, updated constantly, archived at completion.

**Who needs it:** Anyone working on this specific project — including the agent, across sessions.

**Analogy:** A project tracker. Open it and you know exactly where things stand without asking anyone.

**The critical feature: resume without re-explaining.** Every new session reads the state file first and says: "Last time we finished X, decided Y, and were about to do Z. Ready to continue?" The client never has to repeat themselves.

**When to write state:** At every meaningful transition — not at the end of the session. Sessions crash. Context compresses. If the only record of a decision is in the conversation, it's one interruption away from gone.

### Layer 3: Learned Knowledge — "What I've Figured Out"

**What it is:** A local file (not in git) that accumulates patterns and lessons over time.

**Contains:**
- Workflow preferences ("build with `npm run build`", "dev server runs on port 3001")
- Project structure knowledge ("config files live in `/src/lib`")
- Conventions ("use kebab-case for IDs", "colors follow the brand palette")
- Gotchas ("the plugin breaks if you do X", "always check Y before Z")

**Lifespan:** Indefinite, but evolving. Grows over sessions, pruned when things change.

**Who needs it:** The specific person (or machine) running the agent. Not shared.

**Analogy:** A developer's personal notes. "Don't forget: the CI pipeline requires X" or "Client prefers Y format." Useful to you, irrelevant to anyone else.

**What gets saved here:** Only stable patterns confirmed across multiple sessions. Not hunches, not one-time observations, not session-specific context. The bar: "Would this save a future session from making a mistake or wasting time?"

### Layer 4: Context Window — "What We're Doing Right Now"

**What it is:** The live conversation between you and the agent.

**Contains:** Everything actively being discussed — questions, answers, work in progress, real-time decisions.

**Lifespan:** One session. Compressed or lost when the session ends.

**Who needs it:** Only the current session.

**Analogy:** Working memory. You're holding the current task in your head. When you leave for the day, you write down where you left off (that's Layer 2) and any lessons learned (that's Layer 3). You don't try to remember everything forever.

**The key insight:** The other layers exist because this one is temporary. The memory architecture is designed so that nothing important lives *only* in the context window.

### Layer 5: Session Transcripts — "The Full Record"

**What it is:** Complete logs of every conversation, stored as files on disk.

**Contains:** Every message, every tool call, every result — the unabridged record.

**Lifespan:** Indefinite.

**Who needs it:** Almost nobody, almost never. This is the safety net.

**Analogy:** Security camera footage. You don't watch it daily. But if something went wrong and you need to reconstruct exactly what happened, it's there.

**If you're searching transcripts regularly, the other layers aren't doing their job.**

## How They Work Together

```
Session starts
  |
  v
Read Process Instructions --> "I know how to do this work"
  |
  v
Read Project State ----------> "I know where this project stands"
  |
  v
Read Learned Knowledge ------> "I know the quirks and conventions"
  |
  v
Context Window --------------> "I know what we're doing right now"
  |
  |  (work happens)
  |
  v
Write Project State <---------- Decision made, milestone reached, task completed
Write Learned Knowledge <------ New pattern discovered, gotcha encountered
  |
  v
Session ends
  |
  v
Transcript archived ----------> Full record saved
```

Information flows **down** at session start (loading context) and **up** during work (persisting what matters). The principle: **write early, write often.** Don't wait for the session to end.

## Why Not Just One File?

| Concern | Changes how often? | Who needs it? | Shared? |
|---------|-------------------|---------------|---------|
| Process | Rarely | Everyone | Yes (git) |
| Project state | Every few minutes | Project team | Yes (project dir) |
| Learned knowledge | Every few sessions | One person | No (local) |
| Current task | Continuously | Current session | No (ephemeral) |

Combining these creates predictable problems:

- **Process + state in one file:** Updates to the process require touching every active project. Client-specific decisions pollute shared instructions.
- **State + learned knowledge in one file:** Personal notes (local paths, tool preferences) get mixed with project data. Sharing the project means sharing your scratchpad.
- **Everything in the context window:** Agent has amnesia every session. Clients re-explain themselves. Decisions get re-made.

Each layer has one job. Keeping them separate means each can change at its own pace, be shared with the right audience, and live in the right place.

## Implementing This in Your Project

You don't need all five layers on day one. Start with what hurts:

**If your agent forgets the process between sessions:** Write a `CLAUDE.md` (Layer 1). Define the workflow, the rules, the quality bar. This alone is transformative — the agent stops making up its own process.

**If you're re-explaining project context every session:** Add a state file (Layer 2). Have the agent write to it after every decision or milestone. The resume protocol ("here's where we left off") eliminates the most frustrating part of multi-session work.

**If the agent keeps making the same mistakes:** Add learned knowledge (Layer 3). After a session where you fix a recurring issue, save it. "Always do X before Y." "The config file is at Z." These compound over time.

**Layers 4 and 5 are automatic.** The context window is just the conversation. Transcripts are just logs. You get these for free.

### Minimum Viable Memory

For most projects, two files get you 80% of the value:

1. **Process instructions** (`CLAUDE.md`) — How the agent should work
2. **Project state** (`STATE.md`) — Where the project stands right now

That's it. The agent knows the process and knows the position. Everything else is optimization.

## Design Principles

1. **Write state at transitions, not at session end.** Sessions crash. If the only copy of a decision is in the conversation, it's already at risk.

2. **Each layer has one owner.** Process instructions are maintained by the team. Project state is maintained by the agent (or a state-management routine). Learned knowledge is maintained by the auto-memory system. No layer writes to another layer's files.

3. **Layers are read in order, not merged.** Process first, then state, then learned knowledge. Each adds context the previous didn't have. No merge conflicts because they cover different concerns.

4. **Nothing irreplaceable should live only in the context window.** Ask yourself: if this session crashes right now, can we resume? If not, something should have been written to the state file.

5. **Learned knowledge is earned, not speculated.** Save patterns confirmed across multiple sessions. Don't save hunches from reading one file. The bar: would this help a future session?

6. **State should be specific enough to resume without asking.** Not "continue Phase 3" but "Phase 3 positioning drafted, waiting for client feedback on the contrarian angle." Precision here is what makes the resume protocol feel seamless.

## Reference: File Types and Their Roles

The memory layers above are supported by three categories of files that define what the agent knows, what it can do, and what it remembers.

### Agents

Specialist subprocesses the main agent can delegate to. Each agent has a narrow focus, its own system prompt, and a defined output location. The main agent stays in conversation with the user while agents work in the background.

Most agents are domain-specific — they do the actual work of your project (research, drafting, analysis). But a few are infrastructure agents that support the memory system itself:

| Agent Role | Purpose | Example |
|------------|---------|---------|
| **State reader** | Loads project state at session start, briefs the main agent on where things stand | "Last session completed Phase 3. Checkpoint A passed. Next: Phase 4." |
| **State writer** | Persists decisions, milestones, and transitions to the state file | Called silently after every meaningful change — the user never sees it |
| **Memory extractor** | Captures working context before the context window compresses | Saves in-progress task state, active decisions, and error solutions |

Domain agents (researchers, writers, analysts, assemblers, etc.) don't manage memory directly, but they benefit from it. They read the state file to understand project context, and the state writer records their outputs when they finish. The memory system wraps around whatever your agents actually do.

**When to create an agent:** When a task is well-defined, can run independently, and would break conversational flow if done inline. Research, drafting, analysis, and file assembly are good candidates. Judgment calls, client interaction, and creative direction are not.

**Key fields:**
- `description` — When this agent should be triggered (the main agent reads this to decide)
- `model` — Which model to use (smaller/faster for simple tasks, larger for complex ones)
- `tools` — What the agent can access (file read/write, web search, etc.)
- System prompt — The agent's full instructions, defined in the markdown body

### Skills (Slash Commands)

User-invocable entry points that trigger specific workflows. The user types a command, and it expands into a full prompt that guides the agent through a defined process.

| File | Role | Example Use |
|------|------|-------------|
| `.claude/commands/start.md` | Kickoff workflow | User types `/project:start` to begin onboarding |
| `.claude/commands/resume.md` | Session resumption | User types `/project:resume` to pick up where they left off |
| `.claude/commands/checkpoint.md` | Quality gate | User types `/project:checkpoint` to validate before proceeding |
| `.claude/commands/export.md` | Deliverable packaging | User types `/project:export` to compile final outputs |
| `.claude/commands/sanity-check.md` | Health check | User types `/project:sanity-check` to verify project integrity |

**When to create a skill:** When a workflow has a repeatable structure — the same steps, the same checks, the same output format every time. Skills turn multi-step processes into single commands.

**Key fields:**
- `description` — Shown in the skill list so users know what it does
- `argument-hint` — Optional input the user can pass (e.g., a phase number)
- Markdown body — The full prompt that executes when invoked

**Naming convention:** Skills use colon separators, not slashes. `/project:start` resolves correctly; `/project/start` does not.

### Memory Files

Persistent files that survive across sessions. Each has a different scope, audience, and update frequency.

| File | Layer | Scope | In Git? | Updated By |
|------|-------|-------|---------|------------|
| `CLAUDE.md` | Process instructions | All users, all sessions | Yes | Developer (manual) |
| `STATE.md` | Project state | One project, all sessions | Template only | Agent (automatic at transitions) |
| `memory/MEMORY.md` | Learned knowledge | One developer, all sessions | No | Agent (when patterns confirmed) |
| Session transcripts (`.jsonl`) | Archive | One session | No | System (automatic) |

**CLAUDE.md** is the foundation. It defines the process, the agents, the quality bar. Everything else builds on top of it. If you only create one file, make it this one.

**STATE.md** is the most frequently written. The agent updates it after every decision, milestone, or transition. It should always reflect reality — if the state file says "Phase 3 complete," Phase 3 better actually be complete.

**memory/MEMORY.md** is the most selective. Not everything learned in a session belongs here. Only patterns that would help future sessions: confirmed conventions, recurring gotchas, workflow preferences the user has stated explicitly.

### How They Connect

```
User types /project:start          (Skill triggers the workflow)
  |
  v
CLAUDE.md loaded                   (Agent knows the process)
  |
  v
STATE.md read                      (Agent knows the project position)
  |
  v
memory/MEMORY.md loaded            (Agent knows the quirks)
  |
  v
Agent runs the skill's prompt      (Guided by all three layers)
  |
  |--- Launches research-analyst   (Agent delegates background work)
  |--- Launches state-writer       (Agent persists decisions)
  |
  v
STATE.md updated                   (Project state reflects new position)
memory/MEMORY.md updated           (If a new pattern was learned)
```

The system is modular by design. You can start with just `CLAUDE.md` and add layers as your workflow demands them. Most projects don't need a dozen agents on day one — they need clear process instructions and reliable state persistence. Build from there.
