import type { PhaseConfig, AssetPackConfig, AssetPackId } from '@/types/brand'

export const phases: PhaseConfig[] = [
  {
    number: 1,
    name: 'Origin & Belief',
    shortName: 'Origin',
    description: 'Core belief and origin story',
    purpose:
      'Every strong brand starts with a reason for existing that goes beyond profit. This phase uncovers your core belief — the conviction that drives your work — and the origin story that makes it credible. These become the foundation everything else is built on.',
    icon: 'Compass',
    group: 'foundation',
    discoveryOutputKeys: [
      'core-belief',
      'origin-story',
      'formative-experiences',
      'recurring-themes',
    ],
    agentOutputFile: 'workspace/research/content-audit.md',
    command: 'phase-1-origin',
  },
  {
    number: 2,
    name: 'Audience',
    shortName: 'Audience',
    description: 'Target segments and market of one',
    purpose:
      'A brand that speaks to everyone speaks to no one. This phase defines exactly who you serve, what they struggle with, and how they talk about their problems. The "Market of One" exercise creates a single vivid person your brand exists to help — making every future decision more concrete.',
    icon: 'Users',
    group: 'foundation',
    discoveryOutputKeys: [
      'primary-audience',
      'audience-language',
      'audience-tensions',
      'transformation',
    ],
    command: 'phase-2-audience',
  },
  {
    number: 3,
    name: 'Positioning',
    shortName: 'Position',
    description: 'Differentiation and territory',
    purpose:
      "Positioning is how you claim space in your audience's mind. This phase identifies where you sit relative to competitors, articulates your unique intersection of strengths, and stakes out a territory only you can own. The contrarian point of view gives your brand an edge that's impossible to copy.",
    icon: 'Target',
    group: 'foundation',
    discoveryOutputKeys: [
      'competitive-landscape',
      'positioning-statement',
      'differentiation-angles',
    ],
    agentOutputFile: 'workspace/research/competitive-landscape.md',
    command: 'phase-3-positioning',
  },
  {
    number: 4,
    name: 'Personality & Archetypes',
    shortName: 'Personality',
    description: 'Traits, archetypes, brand world',
    purpose:
      'If your brand were a person, who would they be? This phase maps your personality traits to archetypal patterns — deep human templates that make brands instantly recognizable and emotionally resonant. The brand world exercise creates the sensory environment your brand lives in.',
    icon: 'Sparkles',
    group: 'identity',
    discoveryOutputKeys: [
      'personality-traits',
      'primary-archetype',
      'supporting-archetype',
      'brand-character',
    ],
    agentOutputFile: 'workspace/research/archetype-assessment.md',
    command: 'phase-4-personality',
  },
  {
    number: 5,
    name: 'Messaging',
    shortName: 'Messaging',
    description: 'Tagline, narrative, boilerplates',
    purpose:
      "Strategy means nothing if you can't say it clearly. This phase translates your positioning and personality into the actual words people will encounter — a tagline that sticks, a core narrative that persuades, and ready-to-use boilerplate descriptions for every context from elevator pitch to press release.",
    icon: 'MessageSquare',
    group: 'identity',
    discoveryOutputKeys: ['tagline-options', 'core-narrative', 'boilerplates'],
    agentOutputFile: 'workspace/drafts/messaging-options.md',
    command: 'phase-5-messaging',
  },
  {
    number: 6,
    name: 'Voice',
    shortName: 'Voice',
    description: 'Voice fingerprint and style guide',
    purpose:
      "Voice is what makes people recognize your brand before they see the logo. This phase analyzes how you naturally communicate and codifies it into a repeatable system — signature moves, tone spectrum, do/don't examples — so every piece of content sounds unmistakably like you.",
    icon: 'Mic',
    group: 'identity',
    discoveryOutputKeys: ['voice-fingerprint', 'voice-guide'],
    agentOutputFile: 'workspace/research/voice-fingerprint.md',
    command: 'phase-6-voice',
  },
  {
    number: 7,
    name: 'Visual Identity',
    shortName: 'Visual',
    description: 'Color, type, imagery, mark',
    purpose:
      'The visual system translates everything discovered so far into what people see. Colors carry emotion, typography sets tone, imagery creates atmosphere. This phase builds the visual vocabulary that makes your brand recognizable at a glance and consistent across every touchpoint.',
    icon: 'Palette',
    group: 'expression',
    discoveryOutputKeys: ['color-direction', 'typography-direction', 'visual-brand-world'],
    agentOutputFile: 'workspace/drafts/visual-direction.md',
    command: 'phase-7-visual',
  },
  {
    number: 8,
    name: 'Toolkit & Delivery',
    shortName: 'Toolkit',
    description: 'Final documents and assets',
    purpose:
      'This is where everything comes together into deliverable documents. The brand foundation, voice guide, color palette, visual system, and UI kit are assembled into polished, shareable files that your team, designers, and partners can use immediately.',
    icon: 'Package',
    group: 'expression',
    discoveryOutputKeys: [],
    command: 'phase-8-toolkit',
  },
]

export function getPhase(number: number): PhaseConfig | undefined {
  return phases.find(p => p.number === number)
}

export function getPhasesByGroup(group: PhaseConfig['group']): PhaseConfig[] {
  return phases.filter(p => p.group === group)
}

// --- Asset Packs ---

export const ASSET_PACKS: AssetPackConfig[] = [
  {
    id: 'social-media-kit',
    name: 'Social Media Kit',
    shortName: 'Social',
    description: 'Profile templates, post formats, hashtag strategy, content calendar framework',
    icon: 'Share2',
    outputFile: 'workspace/output/social-media-kit.html',
  },
  {
    id: 'print-collateral',
    name: 'Print Collateral',
    shortName: 'Print',
    description: 'Business cards, letterhead, one-pager, brochure specs',
    icon: 'Printer',
    outputFile: 'workspace/output/print-collateral.html',
  },
  {
    id: 'media-kit-epk',
    name: 'Media Kit / EPK',
    shortName: 'Media Kit',
    description: 'Press-ready bio, headshots spec, press release template, fact sheet',
    icon: 'Newspaper',
    outputFile: 'workspace/output/media-kit-epk.html',
  },
  {
    id: 'merch-product',
    name: 'Merch & Product',
    shortName: 'Merch',
    description: 'Product mockup guidelines, packaging specs, merchandise templates',
    icon: 'ShoppingBag',
    outputFile: 'workspace/output/merch-product.html',
  },
  {
    id: 'pitch-deck',
    name: 'Pitch Deck',
    shortName: 'Pitch Deck',
    description: 'Slide templates, investor/client deck structure, presentation guidelines',
    icon: 'Presentation',
    outputFile: 'workspace/output/pitch-deck.html',
  },
  {
    id: 'app-dashboard-ui',
    name: 'App / Dashboard UI',
    shortName: 'App UI',
    description: 'Extended component library, dashboard patterns, app-specific tokens',
    icon: 'LayoutDashboard',
    outputFile: 'workspace/output/app-dashboard-ui.html',
  },
  {
    id: 'signage-space',
    name: 'Signage & Space',
    shortName: 'Signage',
    description: 'Environmental design specs, banner templates, booth design',
    icon: 'MapPin',
    outputFile: 'workspace/output/signage-space.html',
  },
  {
    id: 'email-newsletter',
    name: 'Email & Newsletter',
    shortName: 'Email',
    description: 'Email templates, newsletter format, drip campaign voice guide',
    icon: 'Mail',
    outputFile: 'workspace/output/email-newsletter.html',
  },
]

export function getAssetPack(id: AssetPackId): AssetPackConfig | undefined {
  return ASSET_PACKS.find(p => p.id === id)
}

export function getRecommendedPacks(clientType: string, platforms: string[]): AssetPackId[] {
  const recs: AssetPackId[] = []
  const plats = platforms.map(p => p.toLowerCase())
  const cType = clientType.toLowerCase()

  if (
    plats.some(p =>
      ['instagram', 'twitter', 'tiktok', 'linkedin', 'facebook', 'social media', 'social'].some(s =>
        p.includes(s),
      ),
    )
  ) {
    recs.push('social-media-kit')
  }
  if (plats.some(p => ['email', 'newsletter', 'substack', 'mailchimp'].some(s => p.includes(s)))) {
    recs.push('email-newsletter')
  }
  if (plats.some(p => ['conference', 'print', 'event'].some(s => p.includes(s)))) {
    recs.push('print-collateral')
  }
  if (['startup', 'agency', 'consultant'].includes(cType)) {
    recs.push('pitch-deck')
  }
  if (['music-artist', 'influencer', 'creator'].includes(cType)) {
    recs.push('media-kit-epk')
  }
  if (['music-artist', 'creator', 'influencer'].includes(cType)) {
    recs.push('merch-product')
  }
  if (
    plats.some(p => ['app', 'dashboard', 'saas', 'platform', 'software'].some(s => p.includes(s)))
  ) {
    recs.push('app-dashboard-ui')
  }
  if (plats.some(p => ['booth', 'retail', 'signage', 'store', 'pop-up'].some(s => p.includes(s)))) {
    recs.push('signage-space')
  }

  return [...new Set(recs)]
}
