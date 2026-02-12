/**
 * Extracts sections from workspace markdown files and maps them to phases.
 * Uses content-loader to access files, then splits by heading structure.
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
  /** Section pattern to extract from brand-foundation.md (null = use full file) */
  foundationSection?: string
  /** Alternative output file to use instead of brand-foundation.md */
  outputFile?: string
  /** Agent output file in workspace/research/ */
  researchFile?: string
  /** Draft file in workspace/drafts/ */
  draftFile?: string
}

const PHASE_CONTENT_MAP: Record<number, PhaseContentMap> = {
  1: {
    foundationSection: 'Core Belief',
    researchFile: '/workspace/research/content-audit.md',
  },
  2: {
    foundationSection: 'Audience',
    researchFile: '/workspace/research/competitive-brief.md',
  },
  3: {
    foundationSection: 'Positioning',
    researchFile: '/workspace/research/competitive-brief.md',
  },
  4: {
    foundationSection: 'Brand Personality',
    researchFile: '/workspace/research/archetype-assessment.md',
  },
  5: {
    foundationSection: 'Messaging Architecture',
    draftFile: '/workspace/drafts/messaging-options.md',
  },
  6: {
    outputFile: '/workspace/output/voice-guide.md',
    researchFile: '/workspace/research/voice-fingerprint.md',
  },
  7: {
    outputFile: '/workspace/drafts/visual-direction.md',
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

  // Get primary content
  if (mapping.outputFile) {
    primary = getFile(mapping.outputFile)
  } else if (mapping.foundationSection) {
    const foundation = getFile('/workspace/output/brand-foundation.md')
    if (foundation) {
      primary = extractSection(foundation, mapping.foundationSection)
    }
  }

  // Get agent output (research or draft)
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
