---
name: verify-build
description: "Verify the Brand Compass codebase is fully implemented — no missing files, stubs, or broken wiring"
disable-model-invocation: true
argument-hint: "[scope: 'full' or feature name]"
allowed-tools: Read, Grep, Glob, Bash
---


# /brand-compass:verify-build

Verify that the Brand Compass implementation is complete and internally consistent. Catches missing files, placeholder content, broken references, and spec-to-code drift.

This checks the **codebase** — not brand content. For brand deliverable quality, use `/brand-compass:verify`.

## When to Run

- After implementing a feature or completing a plan
- Before committing a batch of changes
- When something feels incomplete or disconnected
- As a final check before considering work done

## Step 1: Determine Scope

**If argument provided:**
- `full` → check everything
- Feature name (e.g., "asset packs") → check only files related to that feature
- Plan file path → read the plan and check each item

**If no argument:** Default to `full`.

## Step 2: Spawn Implementation Verifier

```
Task(
  prompt="Run full implementation verification of the Brand Compass codebase.

  Scope: [scope from step 1]

  Check all 4 levels: Existence, Substance, Wiring, Functional.
  Return the scored report with specific file paths for any issues.",
  subagent_type="implementation-verifier"
)
```

## Step 3: Present Results

---

**If PASS:**

### Build Verification — Passed

| Level | Checks | Result |
|-------|--------|--------|
| Existence | [N] files verified | All present |
| Substance | [N] files scanned | No stubs found |
| Wiring | [N] connections checked | All wired |
| Functional | TypeScript + Build | Clean |

All implementation checks passed. Codebase is complete and internally consistent.

---

**If FAIL:**

### Build Verification — Issues Found

| Level | Checks | Issues |
|-------|--------|--------|
| Existence | [N] files | [N] missing |
| Substance | [N] files | [N] stubs/placeholders |
| Wiring | [N] connections | [N] broken |
| Functional | TypeScript + Build | [status] |

#### Critical Issues (must fix)

[List each with file path and what needs to happen]

#### Warnings (should review)

[List each with file path and suggestion]

---

**Fix guidance:**
- Missing agent/command files → create them following existing patterns
- Stub content → fill in real implementation
- Broken wiring → update references to match actual file paths
- Build failures → fix TypeScript errors

After fixing, run `/brand-compass:verify-build` again to confirm.

---

## What This Catches

Examples of gaps this verification would have caught:
- Reference file referenced by agent doesn't exist (like the missing practical-toolkit.md)
- Agent references old file paths after a rename
- New type field added but state-loader doesn't parse it
- Asset pack defined in types but missing from ASSET_PACKS array
- Component imports a module that doesn't exist
- STATE.md has a field that nothing reads
- Command references an agent that was renamed

## Relationship to Other Commands

| Command | What it checks |
|---------|---------------|
| `/brand-compass:verify-build` | Codebase implementation completeness |
| `/brand-compass:verify` | Brand content quality (placeholders, consistency) |
| `/brand-compass:sanity-check` | Project infrastructure health (counts, sync, memory) |
| `/brand-compass:export` | Output file existence before delivery |
