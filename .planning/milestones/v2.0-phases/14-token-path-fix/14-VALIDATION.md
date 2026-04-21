---
phase: 14
slug: token-path-fix
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-21
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser verification + grep |
| **Config file** | none — no test framework needed |
| **Quick run command** | `grep -n 'href="../tokens/' .claude/agents/design-kit-foundation.md .claude/agents/design-kit-packager.md` |
| **Full suite command** | `grep -rn 'href=.*tokens/' .claude/agents/design-kit-foundation.md .claude/agents/design-kit-packager.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run quick run command (grep for wrong paths)
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must show zero `../tokens/` in root-level specimen instructions
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 14-01-01 | 01 | 1 | FOUN-02 | — | N/A | grep | `grep 'href="../tokens/' .claude/agents/design-kit-foundation.md \| wc -l` returns 0 | ✅ | ⬜ pending |
| 14-01-02 | 01 | 1 | DKIT-05 | — | N/A | grep | `grep 'href="../tokens/' .claude/agents/design-kit-packager.md \| wc -l` returns 0 for root-level specimen sections | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework or stubs needed — verification is grep-based on agent definition files.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Root-level HTML renders styled in browser | FOUN-02, DKIT-05 | Requires actual brand engagement output + browser | Run a brand engagement through Phase 8, open root-level design-kit HTML in browser, confirm CSS loads |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 1s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
