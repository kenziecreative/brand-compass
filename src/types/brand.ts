export type PhaseStatus = 'pending' | 'in_progress' | 'completed'
export type CheckpointStatus = 'pending' | 'passed'
export type AgentStatus = 'running' | 'completed'

export type ClientType =
  | 'nonprofit'
  | 'small-business'
  | 'music-artist'
  | 'influencer'
  | 'creator'
  | 'consultant'
  | 'agency'
  | 'startup'
  | 'other'

export type AssetPackId =
  | 'social-media-kit'
  | 'print-collateral'
  | 'media-kit-epk'
  | 'merch-product'
  | 'pitch-deck'
  | 'app-dashboard-ui'
  | 'signage-space'
  | 'email-newsletter'

export interface AssetPackConfig {
  id: AssetPackId
  name: string
  shortName: string
  description: string
  icon: string
  outputFile: string
}

export interface ClientProfile {
  name: string
  type: ClientType | string
  description: string
  platforms: string[]
  existingAssets: string[]
  assetPacks: AssetPackId[]
}

export interface PhaseConfig {
  number: number
  name: string
  shortName: string
  description: string
  purpose: string
  icon: string
  group: 'foundation' | 'identity' | 'expression'
  discoveryOutputKeys: string[]
  agentOutputFile?: string
  command: string
}

export interface AgentEntry {
  name: string
  status: AgentStatus
  triggeredAt: string
  output?: string
}

export interface SessionLogEntry {
  date: string
  summary: string
}

export interface KeyDecision {
  phase: number
  decision: string
}

export interface DiscoveryOutput {
  key: string
  label: string
  phase: number
  completed: boolean
}

export interface BrandState {
  client: ClientProfile
  clientName: string
  currentPhase: number
  phases: Record<number, PhaseStatus>
  checkpointA: CheckpointStatus
  checkpointB: CheckpointStatus
  agents: AgentEntry[]
  decisions: KeyDecision[]
  discoveryOutputs: DiscoveryOutput[]
  sessionLog: SessionLogEntry[]
}

export interface AgentOutput {
  phase: number
  filename: string
  content: string
}

// --- Phase content types (structured, not raw markdown) ---

export interface BeliefContent {
  corebelief: string
  originStory: string[]
  formativeExperiences: string[]
  recurringThemes: string[]
}

export interface AudienceContent {
  primaryAudience: string
  secondaryAudience?: string
  languagePatterns: string[]
  tensions: string[]
  transformation: string
}

export interface Competitor {
  name: string
  positioning: string
  tone: string
}

export interface PositioningContent {
  statement: string
  competitors: Competitor[]
  categoryCliches: string[]
  whiteSpace: string[]
  differentiationAngles: string[]
}

export interface ArchetypeContent {
  primary: {
    classicName: string
    customName: string
    confidence: 'High' | 'Medium' | 'Low'
    evidence: string[]
    howItShowsUp: string
    shadowToWatch: string
  }
  supporting: {
    classicName: string
    customName: string
    confidence: 'High' | 'Medium' | 'Low'
    evidence: string[]
    howItShowsUp: string
    shadowToWatch: string
  }
  combinationAnalysis: string
  distinctiveness: string
  personalityTraits: string[]
  brandCharacter: string
}

export interface TaglineOption {
  text: string
  rationale?: string
  recommended?: boolean
}

export interface NarrativeOption {
  angle: string
  text: string
  rationale: string
}

export interface MessagingContent {
  taglines: TaglineOption[]
  narratives: NarrativeOption[]
  boilerplates: {
    oneSentence: string[]
    oneParagraph: string[]
    threeParagraphs: string[]
  }
}

export interface SignatureMove {
  name: string
  description: string
  frequency: string
  example: string
}

export interface VoiceContent {
  oneLiner: string
  voiceTags: string[]
  polishedToConversational: string
  averageSentenceLength: number
  paragraphPattern: string
  punctuationHabits: Record<string, string>
  signatureMoves: SignatureMove[]
  doExamples: string[]
  dontExamples: string[]
}

export interface ColorEntry {
  name: string
  hex: string
  meaning: string
  role: 'primary' | 'accent' | 'neutral'
}

export interface VisualContent {
  visualPrinciples: { name: string; meaning: string }[]
  colors: ColorEntry[]
  colorsToAvoid: string[]
  headlineFont: { name: string; rationale: string; character: string }
  bodyFont: { name: string; rationale: string; character: string }
  typographyToAvoid: string[]
  imageryStyle: string
  visualBrandWorld: string
  aiPrompt: string
  markDirection: string
}

export type PhaseContent =
  | { phase: 1; data: BeliefContent }
  | { phase: 2; data: AudienceContent }
  | { phase: 3; data: PositioningContent }
  | { phase: 4; data: ArchetypeContent }
  | { phase: 5; data: MessagingContent }
  | { phase: 6; data: VoiceContent }
  | { phase: 7; data: VisualContent }
