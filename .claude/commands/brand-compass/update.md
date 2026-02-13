# Update Brand Compass

You are helping a non-technical user update their Brand Compass system to the latest version. This must be safe, clear, and protect all engagement data.

## Step 1: Check for Updates

Read the update cache at `~/.claude/cache/brand-compass-update.json`.

If the file doesn't exist or is stale (checked more than 1 hour ago), run a fresh check:

```bash
git fetch origin main --quiet
```

Then compare:
- Local: `git rev-parse HEAD`
- Remote: `git rev-parse origin/main`

If they match:

"You're already on the latest version. No update needed."

Stop.

## Step 2: Show What's Changed

If an update is available, show the user what they'll get:

"An update is available for Brand Compass.

**Current:** [local version/sha]
**Latest:** [remote version/sha]
**Changes:** [N] updates

[List commit summaries — translate technical commit messages into plain language]

Your brand project (research, drafts, outputs, and progress) will not be affected. Only system files (commands, agents, templates) are updated."

Use AskUserQuestion:
  question: "Ready to update?"
  options:
    - "Yes, update now" (proceed to Step 3)
    - "Not right now" (stop)

## Step 3: Apply Update

Run the update:

```bash
git pull origin main
```

If the pull succeeds:

1. Verify engagement data is intact:
   - Check `workspace/STATE.md` exists and contains engagement data (if it had any before)
   - Check `workspace/research/`, `workspace/drafts/`, `workspace/output/` directories exist
2. Clear the update cache:
   ```bash
   rm -f ~/.claude/cache/brand-compass-update.json
   ```
3. Report success:

"Updated successfully to [version].

Your brand project is untouched — all research, drafts, and outputs are exactly where you left them.

What changed:
[Plain-language summary of changes]"

## Step 4: Handle Errors

If `git pull` fails:

### Merge Conflict
"The update ran into a conflict — this usually means a system file was manually edited. Don't worry, nothing is broken.

Run this to reset and retry:
```
git stash && git pull origin main && git stash pop
```

Or ask your developer to help resolve it."

### Network Error
"Couldn't reach the update server. Check your internet connection and try again."

### Other Error
"Something unexpected happened during the update. Here's what git reported:

[error output]

Your brand project data is safe — it's stored separately from the system files. If you need help, reach out to your developer."

## Guidelines

- Use plain language throughout — the user may not know what git is
- Never show raw git output unless something goes wrong
- Always confirm engagement data is intact after the update
- The update only changes system files (agents, commands, templates, components) — never workspace content
