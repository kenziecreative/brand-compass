/**
 * Parses STATE.md into a BrandState object.
 * Uses import.meta.glob to load the file at build time.
 */

import type {
  BrandState,
  PhaseStatus,
  CheckpointStatus,
  AgentEntry,
  SessionLogEntry,
  KeyDecision,
  DiscoveryOutput,
  ClientProfile,
  AssetPackId,
} from '@/types/brand'

const stateFiles = import.meta.glob('/workspace/STATE.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Map discovery checkbox labels to keys and phases */
const discoveryMap: { pattern: RegExp; key: string; label: string; phase: number }[] = [
  { pattern: /Client profile/i, key: 'client-profile', label: 'Client profile captured', phase: 0 },
  { pattern: /Asset packs selected/i, key: 'asset-packs', label: 'Asset packs selected', phase: 0 },
  { pattern: /Core Belief/i, key: 'core-belief', label: 'Core Belief documented', phase: 1 },
  {
    pattern: /Audience segments/i,
    key: 'audience-segments',
    label: 'Audience segments defined',
    phase: 2,
  },
  { pattern: /Market of One/i, key: 'market-of-one', label: 'Market of One created', phase: 2 },
  { pattern: /Anti-audience/i, key: 'anti-audience', label: 'Anti-audience defined', phase: 2 },
  {
    pattern: /Positioning statement/i,
    key: 'positioning-statement',
    label: 'Positioning statement drafted',
    phase: 3,
  },
  {
    pattern: /Intersection identified/i,
    key: 'intersection',
    label: 'Intersection identified',
    phase: 3,
  },
  { pattern: /Territory claimed/i, key: 'territory', label: 'Territory claimed', phase: 3 },
  {
    pattern: /Contrarian POV/i,
    key: 'contrarian-pov',
    label: 'Contrarian POV articulated',
    phase: 3,
  },
  {
    pattern: /Personality traits/i,
    key: 'personality-traits',
    label: 'Personality traits defined',
    phase: 4,
  },
  { pattern: /Archetypes mapped/i, key: 'archetypes', label: 'Archetypes mapped', phase: 4 },
  { pattern: /Brand world/i, key: 'brand-world', label: 'Brand world described', phase: 4 },
  {
    pattern: /Tagline options/i,
    key: 'tagline-options',
    label: 'Tagline options generated',
    phase: 5,
  },
  { pattern: /Core narrative/i, key: 'core-narrative', label: 'Core narrative drafted', phase: 5 },
  { pattern: /Boilerplates/i, key: 'boilerplates', label: 'Boilerplates written', phase: 5 },
  { pattern: /Proof points/i, key: 'proof-points', label: 'Proof points listed', phase: 5 },
  { pattern: /Voice analyzed/i, key: 'voice-analyzed', label: 'Voice analyzed', phase: 6 },
  { pattern: /Writing style/i, key: 'writing-style', label: 'Writing style codified', phase: 6 },
  { pattern: /Guardrails/i, key: 'guardrails', label: 'Guardrails set', phase: 6 },
  {
    pattern: /Visual direction/i,
    key: 'visual-direction',
    label: 'Visual direction approved',
    phase: 7,
  },
  { pattern: /Color palette/i, key: 'color-palette', label: 'Color palette finalized', phase: 7 },
  { pattern: /Typography selected/i, key: 'typography', label: 'Typography selected', phase: 7 },
  { pattern: /Mark.*logo/i, key: 'mark-logo', label: 'Mark/logo created', phase: 7 },
  { pattern: /Toolkit compiled/i, key: 'toolkit', label: 'Toolkit compiled', phase: 8 },
]

function parseCheckbox(line: string): boolean {
  return /\[x\]/i.test(line)
}

function extractSection(md: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)
  const match = md.match(pattern)
  return match?.[1]?.trim() ?? ''
}

function parseClientProfile(md: string): ClientProfile | null {
  const section = extractSection(md, 'Client')
  if (!section) return null

  // Structured format: has **Name:** field
  const nameMatch = section.match(/\*\*Name:\*\*\s*(.+)/)
  if (nameMatch) {
    const name = nameMatch[1].trim()
    if (name.startsWith('[')) return null // Template placeholder

    const typeMatch = section.match(/\*\*Type:\*\*\s*(.+)/)
    const descMatch = section.match(/\*\*Description:\*\*\s*(.+)/)
    const platMatch = section.match(/\*\*Platforms:\*\*\s*(.+)/)
    const assetMatch = section.match(/\*\*Existing Assets:\*\*\s*(.+)/)
    const packMatch = section.match(/\*\*Asset Packs:\*\*\s*(.+)/)

    const parseList = (val: string | undefined): string[] => {
      if (!val) return []
      const trimmed = val.trim()
      if (trimmed.startsWith('[')) return [] // Placeholder
      return trimmed.split(/,\s*/).filter(Boolean)
    }

    const parseField = (val: string | undefined): string => {
      if (!val) return ''
      const trimmed = val.trim()
      if (trimmed.startsWith('[')) return '' // Placeholder
      return trimmed
    }

    return {
      name,
      type: parseField(typeMatch?.[1]),
      description: parseField(descMatch?.[1]),
      platforms: parseList(platMatch?.[1]),
      existingAssets: parseList(assetMatch?.[1]),
      assetPacks: parseList(packMatch?.[1]) as AssetPackId[],
    }
  }

  // Fallback: old single-line format
  const firstLine = section.split('\n')[0]?.trim()
  if (!firstLine || firstLine.startsWith('[')) return null

  return {
    name: firstLine,
    type: '',
    description: '',
    platforms: [],
    existingAssets: [],
    assetPacks: [],
  }
}

function parsePhaseStatus(md: string): Record<number, PhaseStatus> {
  const section = extractSection(md, 'Completed Phases')
  const result: Record<number, PhaseStatus> = {}

  for (let i = 0; i <= 8; i++) {
    const phasePattern = new RegExp(`\\[([ xX])\\].*Phase ${i}`)
    const match = section.match(phasePattern)
    if (match) {
      result[i] = match[1].toLowerCase() === 'x' ? 'completed' : 'pending'
    } else {
      result[i] = 'pending'
    }
  }

  // Detect in-progress: current phase from "Current Position"
  const currentMatch = md.match(/Phase:\s*(\d+)/)
  if (currentMatch) {
    const current = parseInt(currentMatch[1], 10)
    if (result[current] === 'pending') {
      result[current] = 'in_progress'
    }
  }

  return result
}

function parseCheckpoints(md: string): { a: CheckpointStatus; b: CheckpointStatus } {
  const section = extractSection(md, 'Checkpoints')
  return {
    a: /\[x\].*Checkpoint A/i.test(section) ? 'passed' : 'pending',
    b: /\[x\].*Checkpoint B/i.test(section) ? 'passed' : 'pending',
  }
}

function parseAgents(md: string): AgentEntry[] {
  const running = extractSection(md, 'Running Agents')
  const completed = extractSection(md, 'Completed Agent Outputs')
  const agents: AgentEntry[] = []

  const runningRows = running
    .split('\n')
    .filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('Agent'))
  for (const row of runningRows) {
    const cells = row
      .split('|')
      .map(c => c.trim())
      .filter(Boolean)
    if (cells.length >= 3 && cells[0] !== '—') {
      agents.push({
        name: cells[0],
        status: 'running',
        triggeredAt: cells[2] || '',
        output: cells[4],
      })
    }
  }

  const completedRows = completed
    .split('\n')
    .filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('Agent'))
  for (const row of completedRows) {
    const cells = row
      .split('|')
      .map(c => c.trim())
      .filter(Boolean)
    if (cells.length >= 2 && cells[0] !== '—') {
      agents.push({ name: cells[0], status: 'completed', triggeredAt: '', output: cells[1] })
    }
  }

  return agents
}

function parseDiscoveryOutputs(md: string): DiscoveryOutput[] {
  const section = extractSection(md, 'Discovery Outputs')
  const lines = section.split('\n').filter(l => l.trim().startsWith('- ['))

  return discoveryMap.map(entry => {
    const line = lines.find(l => entry.pattern.test(l))
    return {
      key: entry.key,
      label: entry.label,
      phase: entry.phase,
      completed: line ? parseCheckbox(line) : false,
    }
  })
}

function parseSessionLog(md: string): SessionLogEntry[] {
  const section = extractSection(md, 'Session Log')
  const entries: SessionLogEntry[] = []
  const lines = section
    .split('\n')
    .filter(
      l =>
        l.trim().length > 0 &&
        l.trim() !==
          '[Brief notes on each session — date, what was accomplished, where we stopped]',
    )
  for (const line of lines) {
    const match = line.match(/(\d{4}-\d{2}-\d{2})[:\s]+(.+)/)
    if (match) {
      entries.push({ date: match[1], summary: match[2].trim() })
    }
  }
  return entries
}

function parseKeyDecisions(md: string): KeyDecision[] {
  const section = extractSection(md, 'Key Decisions')
  const decisions: KeyDecision[] = []
  const lines = section.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('['))
  for (const line of lines) {
    const phaseMatch = line.match(/Phase (\d+)/i)
    decisions.push({
      phase: phaseMatch ? parseInt(phaseMatch[1], 10) : 0,
      decision: line.replace(/^[-*]\s*/, '').trim(),
    })
  }
  return decisions
}

export function loadState(): BrandState | null {
  const raw = stateFiles['/workspace/STATE.md']
  if (!raw) return null

  const client = parseClientProfile(raw)
  if (!client) return null

  const phases = parsePhaseStatus(raw)
  const checkpoints = parseCheckpoints(raw)
  const currentPhaseMatch = raw.match(/Phase:\s*(\d+)/)
  const currentPhase = currentPhaseMatch ? parseInt(currentPhaseMatch[1], 10) : 0

  return {
    client,
    clientName: client.name,
    currentPhase,
    phases,
    checkpointA: checkpoints.a,
    checkpointB: checkpoints.b,
    agents: parseAgents(raw),
    decisions: parseKeyDecisions(raw),
    discoveryOutputs: parseDiscoveryOutputs(raw),
    sessionLog: parseSessionLog(raw),
  }
}

export function hasState(): boolean {
  return '/workspace/STATE.md' in stateFiles
}
