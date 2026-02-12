/**
 * Extracts sections from workspace markdown files and maps them to phases.
 * Uses content-loader to access files, then splits by heading structure.
 *
 * Content priority:
 * 1. Assembled output (brand-foundation.md section or dedicated output file)
 * 2. Phase discovery notes (research/phase-N-*.md) — available immediately after each phase
 * 3. Agent research/draft output — shown as collapsible secondary content
 */

import { getFile } from './content-loader'

/**
 * Extract a section from markdown by its ## heading.
 * Returns all content from the heading until the next ## heading or --- divider.
 */
export function extractSection(markdown: string, sectionPattern: string): string | null {
  const lines = markdown.split('\n')
  let capturing = false
  let result: string[] = []

  for (const line of lines) {
    if (capturing) {
      // Stop at next ## heading or --- divider
      if (line.startsWith('## ') || (line.trim() === '---' && result.length > 0)) {
        break
      }
      result.push(line)
    } else if (line.startsWith('## ') && line.includes(sectionPattern)) {
      capturing = true
      // Don't include the ## heading itself — the card provides its own title
    }
  }

  const content = result.join('\n').trim()
  return content.length > 0 ? content : null
}

/** Phase-to-content mapping */
interface PhaseContentMap {
  /** Section pattern to extract from brand-foundation.md */
  foundationSection?: string
  /** Dedicated output file (used instead of brand-foundation.md section) */
  outputFile?: string
  /** Phase discovery notes file — fallback when assembled output doesn't exist */
  discoveryFile?: string
  /** Agent research output file (collapsible) */
  researchFile?: string
  /** Agent draft file (collapsible) */
  draftFile?: string
}

const PHASE_CONTENT_MAP: Record<number, PhaseContentMap> = {
  1: {
    foundationSection: 'Core Belief',
    discoveryFile: '/workspace/research/phase-1-origin-belief.md',
    researchFile: '/workspace/research/content-audit.md',
  },
  2: {
    foundationSection: 'Audience',
    discoveryFile: '/workspace/research/phase-2-audience.md',
    researchFile: '/workspace/research/competitive-brief.md',
  },
  3: {
    foundationSection: 'Positioning',
    discoveryFile: '/workspace/research/phase-3-positioning.md',
    researchFile: '/workspace/research/competitive-brief.md',
  },
  4: {
    foundationSection: 'Brand Personality',
    discoveryFile: '/workspace/research/phase-4-personality.md',
    researchFile: '/workspace/research/archetype-assessment.md',
  },
  5: {
    foundationSection: 'Messaging Architecture',
    discoveryFile: '/workspace/research/phase-5-messaging.md',
    draftFile: '/workspace/drafts/messaging-options.md',
  },
  6: {
    outputFile: '/workspace/output/voice-guide.md',
    discoveryFile: '/workspace/research/phase-6-voice.md',
    researchFile: '/workspace/research/voice-fingerprint.md',
  },
  7: {
    outputFile: '/workspace/drafts/visual-direction.md',
    discoveryFile: '/workspace/research/phase-7-visual.md',
  },
  8: {
    outputFile: '/workspace/output/practical-toolkit.md',
  },
}

export interface PhaseContentResult {
  primary: string | null
  agentOutput: string | null
  agentOutputLabel: string | null
}

export function getPhaseContent(phaseNumber: number): PhaseContentResult {
  const mapping = PHASE_CONTENT_MAP[phaseNumber]
  if (!mapping) return { primary: null, agentOutput: null, agentOutputLabel: null }

  let primary: string | null = null
  let agentOutput: string | null = null
  let agentOutputLabel: string | null = null

  // 1. Try assembled output first (brand-foundation.md section or dedicated file)
  if (mapping.outputFile) {
    primary = getFile(mapping.outputFile)
  } else if (mapping.foundationSection) {
    const foundation = getFile('/workspace/output/brand-foundation.md')
    if (foundation) {
      primary = extractSection(foundation, mapping.foundationSection)
    }
  }

  // 2. Fall back to phase discovery notes if assembled output doesn't exist yet
  if (!primary && mapping.discoveryFile) {
    primary = getFile(mapping.discoveryFile)
  }

  // 3. Agent research/draft output (collapsible secondary content)
  if (mapping.researchFile) {
    agentOutput = getFile(mapping.researchFile)
    if (agentOutput) agentOutputLabel = 'Agent Research'
  }
  if (!agentOutput && mapping.draftFile) {
    agentOutput = getFile(mapping.draftFile)
    if (agentOutput) agentOutputLabel = 'Agent Draft'
  }

  return { primary, agentOutput, agentOutputLabel }
}
