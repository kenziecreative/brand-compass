---
phase: 12
slug: design-kit
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-20
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual file-existence and content checks (no test framework — deliverable is an agent .md file) |
| **Config file** | none |
| **Quick run command** | `test -f .claude/agents/design-kit-packager.md && echo PASS` |
| **Full suite command** | `grep -c "## Task" .claude/agents/design-kit-packager.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `test -f .claude/agents/design-kit-packager.md && echo PASS`
- **After every plan wave:** Run `grep -c "## Task" .claude/agents/design-kit-packager.md`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | DKIT-01 | — | N/A | file-check | `test -f .claude/agents/design-kit-packager.md` | N/A (Wave 0 is the deliverable itself) | ⬜ pending |
| 12-01-02 | 01 | 1 | DKIT-02 | — | N/A | content-check | `grep -q "components/" .claude/agents/design-kit-packager.md` | N/A | ⬜ pending |
| 12-01-03 | 01 | 1 | DKIT-03 | — | N/A | content-check | `grep -q "previews/" .claude/agents/design-kit-packager.md` | N/A | ⬜ pending |
| 12-01-04 | 01 | 1 | DKIT-04 | — | N/A | content-check | `grep -q "README.md" .claude/agents/design-kit-packager.md` | N/A | ⬜ pending |
| 12-01-05 | 01 | 1 | DKIT-05 | — | N/A | content-check | `grep -q "landing-page.html" .claude/agents/design-kit-packager.md` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Wave 0 is N/A for this phase — the deliverable IS the agent definition file itself. There is no pre-existing test infrastructure to set up; the file-existence and content-grep checks above serve as the automated verification layer. Both tasks in Plan 01 have valid `<automated>` verify commands that run in under 1 second.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Components render correctly in browser | DKIT-02 | Requires visual inspection of HTML output | Open each component HTML in browser, verify token variables resolve and layout is correct |
| Preview cards at 150-500px | DKIT-03 | Requires responsive width testing | Resize browser window, verify no layout breakage at constraint widths |
| Landing page entity-type conditional | DKIT-05 | Requires running agent with different entity types | Run agent twice (individual vs org entity type), compare hero section output |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 1s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
