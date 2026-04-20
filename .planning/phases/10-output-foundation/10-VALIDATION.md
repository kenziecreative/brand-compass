---
phase: 10
slug: output-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-19
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts (if exists) or vite.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 10-01-01 | 01 | 1 | FOUN-01 | — | N/A | integration | `grep -r "output/client" .claude/agents/document-assembler.md` | ❌ W0 | ⬜ pending |
| 10-01-02 | 01 | 1 | FOUN-01 | — | N/A | integration | `grep -r "output/skill-bundle" .claude/agents/document-assembler.md` | ❌ W0 | ⬜ pending |
| 10-01-03 | 01 | 1 | FOUN-01 | — | N/A | integration | `grep -r "output/design-kit" .claude/agents/document-assembler.md` | ❌ W0 | ⬜ pending |
| 10-02-01 | 02 | 1 | FOUN-02 | — | N/A | integration | `ls workspace/output/design-kit/tokens/colors.css 2>/dev/null` | ❌ W0 | ⬜ pending |
| 10-03-01 | 03 | 2 | FOUN-03 | — | N/A | manual | Visual inspection of client specimen HTML | ❌ W0 | ⬜ pending |
| 10-03-02 | 03 | 2 | FOUN-04 | — | N/A | integration | `grep -c '<link.*tokens/' workspace/output/design-kit/*.html` | ❌ W0 | ⬜ pending |
| 10-04-01 | 04 | 1 | FOUN-05 | — | N/A | integration | `grep "voice-fingerprint" .claude/agents/document-assembler.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No new test framework or fixtures needed — verification is via grep, file existence, and visual inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Client specimens render without external refs | FOUN-03 | Requires browser rendering | Open client/*.html in browser, verify no broken asset links |
| Design-kit specimens link to token files | FOUN-04 | Requires browser rendering | Open design-kit specimen in browser with tokens/ present |
| Frontend handles empty bundles gracefully | FOUN-01 | Requires running dev server | Run dev server, navigate to output page with empty skill-bundle/ |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
