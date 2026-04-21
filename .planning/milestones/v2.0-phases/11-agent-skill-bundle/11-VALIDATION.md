---
phase: 11
slug: agent-skill-bundle
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-20
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell commands (grep, wc, file existence checks) |
| **Config file** | none — no test framework needed |
| **Quick run command** | `test -f .claude/agents/skill-bundle-packager.md && echo PASS` |
| **Full suite command** | `grep -c "^---$" .claude/agents/skill-bundle-packager.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run quick command
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 11-01-01 | 01 | 1 | SKIL-01 | — | N/A | structural | `test -f .claude/agents/skill-bundle-packager.md` | ❌ W0 | ⬜ pending |
| 11-01-02 | 01 | 1 | SKIL-02 | — | N/A | structural | `grep -q "voice definition" .claude/agents/skill-bundle-packager.md` | ❌ W0 | ⬜ pending |
| 11-01-03 | 01 | 1 | SKIL-03 | — | N/A | structural | `grep -q "brand-prompt.md" .claude/agents/skill-bundle-packager.md` | ❌ W0 | ⬜ pending |
| 11-01-04 | 01 | 1 | SKIL-04 | — | N/A | structural | `grep -q "source/" .claude/agents/skill-bundle-packager.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.* This phase creates a markdown agent definition — no test framework installation needed. Verification is structural (file existence, content grep).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Agent produces coherent SKILL.md prose | SKIL-02 | LLM output quality requires human review | Invoke agent against example-brand data, read output for coherence |
| brand-prompt.md reads as flowing persona | SKIL-03 | Prose quality is subjective | Read brand-prompt.md, verify no headings/bullets, 150-300 words |
| Translation Rule applied correctly | SKIL-02 | Discovery term translation requires judgment | Check SKILL.md for absence of raw archetype/territory jargon |

*All structural checks are automated; quality checks require manual review.*

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 1s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
