---
phase: 12
slug: design-kit
status: secured
threats_open: 0
asvs_level: 1
created: 2026-04-20
---

# Phase 12 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Agent write scope | Agent must only write to workspace/output/design-kit/ subdirectories | HTML, CSS, JSON, Markdown files |
| Agent read scope | Agent reads from workspace/ paths only (no system files) | Brand data, token values, visual direction |
| HTML output | Generated HTML must not include script injection vectors | Static HTML + CSS only |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-12-01 | Tampering | design-kit-packager write paths | mitigate | Output section lists all 16 allowed paths; "DO NOT write" prohibition for foundation-owned files (line 479) | closed |
| T-12-02 | Information Disclosure | HTML output could include sensitive paths | accept | Agent writes only to workspace/output/ (non-sensitive project workspace); no secrets or credentials involved | closed |
| T-12-03 | Elevation of Privilege | Agent definition could instruct arbitrary Bash execution | mitigate | Agent tools restricted to "Read, Write, Glob, Grep" in frontmatter (line 15) — no Bash/shell access | closed |
| T-12-04 | Tampering | HTML components could include inline scripts | mitigate | Agent definition specifies HTML+CSS only pattern; no script tag instructions present in component/preview templates | closed |

---

## Accepted Risks

| Threat ID | Risk | Justification |
|-----------|------|---------------|
| T-12-02 | HTML output could reference workspace file paths | Agent operates within non-sensitive project workspace; no secrets, credentials, or PII involved |

---

## Audit Trail

### Security Audit 2026-04-20

| Metric | Count |
|--------|-------|
| Threats found | 4 |
| Closed | 4 |
| Open | 0 |

Verified by: orchestrator (inline verification — all threats had clear mitigations in codebase)
