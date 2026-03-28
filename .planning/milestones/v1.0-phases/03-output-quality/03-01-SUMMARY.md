---
phase: 03-output-quality
plan: "01"
subsystem: messaging-discovery
tags: [customer-hero, storybrand, voice-compliance, phase-5, copywriter, brand-verifier]
dependency_graph:
  requires:
    - 02-02 (Phase 3 positioning component exploration)
  provides:
    - Customer-hero discovery questions in Phase 5
    - Customer-hero narrative generation in Copywriter output
    - Voice compliance verification in Brand Verifier
  affects:
    - CLAUDE.md Phase 5 discovery flow
    - .claude/agents/copywriter.md output format
    - .claude/agents/brand-verifier.md verification levels
tech_stack:
  added: []
  patterns:
    - StoryBrand 5-beat guide/hero structure
    - Quantitative voice compliance metrics
key_files:
  created: []
  modified:
    - CLAUDE.md
    - .claude/agents/copywriter.md
    - .claude/agents/brand-verifier.md
decisions:
  - Customer-hero discovery questions numbered as 15-18 continuing Phase 5 sequence
  - Voice compliance is advisory (human review), not blocking — divergence flagged with metrics, not auto-rejected
  - Customer-hero narrative is a distinct output section in messaging-options.md, not a Core Narrative variation
  - Voice fingerprint remains optional in Level 1 Existence (can be generated as early as Phase 1)
metrics:
  duration: "2 minutes"
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_modified: 3
---

# Phase 3 Plan 01: Customer-Hero Narrative and Voice Compliance Summary

Customer-hero narrative discovery added to Phase 5 and Copywriter, plus quantitative voice compliance verification added as Brand Verifier Level 6.

## What Was Built

### Task 1: Customer-Hero Framework (CLAUDE.md + copywriter.md)

**Phase 5 additions:**
- 4 new discovery questions (15-18) capturing the beats Phase 2's problem-focused Market of One didn't cover: how the client first encounters the brand (guide encounter), the moment of clarity (aha), the concrete path or plan offered, and success in the customer's own words
- Note added clarifying that Phase 2's Market of One is the protagonist for these questions
- Copywriter launch prompt updated to mention "customer-hero narrative" explicitly
- Phase 5 completion criteria updated to include "customer-hero narrative drafted"

**Copywriter agent additions:**
- "For Customer-Hero Narrative" generation section with explicit 5-beat structure (Problem / Guide / Plan / Action / Success)
- Constraint: client is the GUIDE, not the hero — Market of One from Phase 2 is the protagonist
- Constraint: use real name and context from Market of One, not a generic composite
- "Customer-Hero Narrative Options" added to output format between Core Narrative and Boilerplates
- Phase 2 Market of One added to Input list

### Task 2: Voice Compliance Check (brand-verifier.md)

Added Level 6: Voice Compliance with four quantitative checks:
- **6A Sentence Length Distribution** — compares prose average vs. fingerprint average, flags if >30% deviation
- **6B Signature Move Presence** — verifies each fingerprint signature move appears at least once in longer outputs
- **6C Banned Phrase Scan** — scans all output files for phrases from the guardrails/never-use list, reports file + location
- **6D Vocabulary Register** — assesses polished-to-conversational ratio against fingerprint, flags significant mismatch

All divergence is flagged for human review with specific metrics — not auto-rejected. Minor drift in toolkit/reference sections is expected and logged as Info.

Additional changes:
- Voice Compliance row added to Scores table in output format
- "Voice fingerprint generated" conditional check added to Level 4 Coverage
- voice-fingerprint.md explicitly marked as optional in Level 1 Existence (may exist as early as Phase 1)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

Files modified:
- CLAUDE.md: customer-hero questions at lines 504-508, launch prompt updated, phase complete criteria updated
- .claude/agents/copywriter.md: For Customer-Hero Narrative section added, output format section added, input list updated
- .claude/agents/brand-verifier.md: Level 6 added with checks 6A-6D, scores table updated, Level 4 Coverage updated, Level 1 Existence updated

Commits:
- db7a111: feat(03-01): add customer-hero framework to Phase 5 and Copywriter agent
- 978d2f2: feat(03-01): add Level 6 voice compliance check to Brand Verifier
