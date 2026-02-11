#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK_SOURCE="$REPO_ROOT/scripts/pre-commit.hook"
HOOK_TARGET="$REPO_ROOT/.git/hooks/pre-commit"

if [ ! -f "$HOOK_SOURCE" ]; then
  echo "ERROR: Hook source not found at $HOOK_SOURCE"
  exit 1
fi

cp "$HOOK_SOURCE" "$HOOK_TARGET"
chmod +x "$HOOK_TARGET"

echo "✓ Pre-commit hook installed"
echo "  Commits will be blocked if workspace/STATE.md contains client data."
