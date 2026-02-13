# Contributing

## Setup

```bash
git clone <repo-url>
cd knz-brand-compass
npm install
npm run hooks:install
```

## Workspace Management

The `workspace/` directory holds both reference data (shipped with the product) and runtime client data (generated during use). During development, you need populated data to test the dashboard.

```bash
# Load the Baseline example brand into the workspace
npm run workspace:load

# Start dev server with test data loaded (convenience shortcut)
npm run test:dev

# Reset workspace to clean/distributable state
npm run workspace:clean
```

### What Ships vs. What Doesn't

**Tracked (ships with the product):**
- `workspace/STATE-template.md` — blank template, source of truth for new engagements
- `workspace/reference/` — example brand + archetype guide (used by document assembler)
- `.gitkeep` files in empty directories

**Gitignored (runtime/engagement data):**
- `workspace/STATE.md` — live engagement state (created from template by `/brand-compass:start`)
- `workspace/research/*.md`
- `workspace/drafts/*.md`
- `workspace/output/*.md` and `*.html`
- `workspace/assets/*`

## Pre-commit Hook

The pre-commit hook prevents accidentally committing client or test data in `workspace/STATE.md`. Install once after cloning:

```bash
npm run hooks:install
```

If you try to commit with a populated STATE.md, the hook blocks and tells you to run `npm run workspace:clean`.

## Build

```bash
npm run build    # Auto-cleans workspace first via prebuild hook
```

## Workflow

```bash
npm install                # Install dependencies
npm run hooks:install      # Install pre-commit hook (once)
npm run test:dev           # Load test data + start dev server
# ... develop and test ...
npm run workspace:clean    # Reset before committing
git add . && git commit    # Hook validates STATE.md is clean
npm run build              # Production build (auto-cleans)
```

## Project Structure

```
knz-brand-compass/
  CLAUDE.md                 # Orchestration instructions
  workspace/
    STATE-template.md       # Blank template (tracked in git)
    STATE.md                # Live engagement state (gitignored, created from template)
    research/               # Agent research outputs (gitignored)
    drafts/                 # Agent draft outputs (gitignored)
    output/                 # Final deliverables (gitignored)
    assets/                 # Generated visual assets (gitignored)
    reference/              # Reference materials + example brand (tracked)
  scripts/
    load-test-data.sh       # Populates workspace with example brand
    clean-workspace.sh      # Resets workspace to template state
    pre-commit.hook         # Hook source (copied to .git/hooks/)
    install-git-hooks.sh    # Installs pre-commit hook
  src/                      # Frontend dashboard
  .claude/
    agents/                 # 12 specialist agents
    commands/brand-compass/ # 16 slash commands
    skills/                 # 6 reference skills
```
