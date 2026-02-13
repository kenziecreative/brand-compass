#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_DIR="$REPO_ROOT/workspace"
TEMPLATE_FILE="$WORKSPACE_DIR/STATE-template.md"

if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "ERROR: STATE-template.md not found at $TEMPLATE_FILE"
  exit 1
fi

echo "Cleaning workspace to distribution state..."

# Restore blank STATE.md only if it doesn't contain engagement data.
# During an active engagement, STATE.md is the single source of truth
# for the web UI and must not be overwritten by build/clean cycles.
if ! grep -q "\[Client Name\]" "$WORKSPACE_DIR/STATE.md" 2>/dev/null; then
  echo "  → STATE.md contains engagement data — skipping (use workspace:load to reset)"
else
  echo "  → Restoring STATE.md template"
  cp "$TEMPLATE_FILE" "$WORKSPACE_DIR/STATE.md"
fi

# Clean research/ (preserve .gitkeep)
echo "  → Cleaning research/"
find "$WORKSPACE_DIR/research" -name "*.md" -type f -delete 2>/dev/null || true

# Clean drafts/ (preserve .gitkeep)
echo "  → Cleaning drafts/"
find "$WORKSPACE_DIR/drafts" -name "*.md" -type f -delete 2>/dev/null || true

# Clean output/ (preserve .gitkeep)
echo "  → Cleaning output/"
find "$WORKSPACE_DIR/output" -type f ! -name ".gitkeep" -delete 2>/dev/null || true

# Clean assets/ (preserve .gitkeep)
echo "  → Cleaning assets/"
find "$WORKSPACE_DIR/assets" -type f ! -name ".gitkeep" -delete 2>/dev/null || true

echo ""
echo "✓ Workspace clean"
echo ""
echo "Run 'npm run workspace:load' to reload test data."
