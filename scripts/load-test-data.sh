#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REFERENCE_DIR="$REPO_ROOT/workspace/reference/example-brand"
WORKSPACE_DIR="$REPO_ROOT/workspace"

echo "Loading test data from example-brand..."

# Copy STATE.md
echo "  → Copying STATE.md"
cp "$REFERENCE_DIR/STATE.md" "$WORKSPACE_DIR/STATE.md"

# Copy research files
echo "  → Copying research files"
cp "$REFERENCE_DIR/research/"*.md "$WORKSPACE_DIR/research/" 2>/dev/null || true

# Copy draft files
echo "  → Copying draft files"
cp "$REFERENCE_DIR/drafts/"*.md "$WORKSPACE_DIR/drafts/" 2>/dev/null || true

# Copy output files
echo "  → Copying output files"
cp "$REFERENCE_DIR/output/"* "$WORKSPACE_DIR/output/" 2>/dev/null || true

echo ""
echo "✓ Test data loaded (Baseline brand)"
echo ""
echo "Run 'npm run dev' to start the dev server."
echo "Run 'npm run workspace:clean' to reset when done."
