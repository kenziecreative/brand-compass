---
phase: 13
slug: integration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-20
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | No automated test framework (manual verification + grep-based checks) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 13-01-01 | 01 | 1 | INTG-04 | — | N/A | grep | `grep -c "workspace/output/client/" .claude/skills/brand-compass/phase-8-toolkit/SKILL.md` | ✅ | ⬜ pending |
| 13-01-02 | 01 | 1 | INTG-01 | — | N/A | manual | Read export/SKILL.md — confirm three bundle sections | ✅ | ⬜ pending |
| 13-02-01 | 02 | 1 | INTG-02 | — | N/A | grep | `grep -c "Level 7\|Level 8" .claude/agents/brand-verifier.md` | ✅ | ⬜ pending |
| 13-02-02 | 02 | 1 | INTG-03 | — | N/A | grep | `grep -c "skill-bundle-packager\|design-kit-packager" CLAUDE.md` | ✅ | ⬜ pending |
| 13-03-01 | 03 | 2 | INTG-05 | — | N/A | build | `npm run build` | ✅ | ⬜ pending |
| 13-03-02 | 03 | 2 | INTG-06 | — | N/A | grep | `grep -rl "Last Phase Handoff" .claude/skills/brand-compass/phase-*/SKILL.md \| wc -l` | ✅ | ⬜ pending |
| 13-03-03 | 03 | 2 | INTG-06 | — | N/A | grep | `grep -rl "clear" .claude/skills/brand-compass/phase-*/SKILL.md \| wc -l` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework install needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Export shows three bundle sections | INTG-01 | Requires running export command in conversation context | Run `/brand-compass:export` after Phase 8 with test data; verify three sections |
| Verifier Level 7/8 skip when Phase 8 incomplete | INTG-02 | Conditional behavior requires agent execution context | Run `/brand-compass:verify` before Phase 8; confirm skip messages |
| Phase 8 orchestrates 4 agents in sequence | INTG-04 | Requires running Phase 8 in conversation context | Step through Phase 8; confirm skill-bundle-packager, design-kit-foundation, design-kit-packager, verifier launch |
| Frontend bundle cards show file links | INTG-05 | Requires running dev server with test data | `npm run dev` → navigate to /output; confirm cards active |
| STATE.md handoff block written on phase completion | INTG-06 | Requires completing a phase in conversation context | Complete a test phase; confirm `## Last Phase Handoff` appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
