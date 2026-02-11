import { useState } from 'react'
import { ChevronDown, Sparkles, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { ArchetypeContent } from '@/types/brand'

function ArchetypeBlock({
  archetype,
  label,
}: {
  archetype: ArchetypeContent['primary']
  label: 'Primary' | 'Supporting'
}) {
  const [evidenceOpen, setEvidenceOpen] = useState(false)

  return (
    <div className="bg-muted rounded-lg p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label} Archetype</p>
          <h4 className="text-lg font-semibold text-foreground">{archetype.customName}</h4>
          <p className="text-sm text-muted-foreground">Classic: {archetype.classicName}</p>
        </div>
        <Badge variant={archetype.confidence === 'High' ? 'success' : 'warning'}>
          {archetype.confidence}
        </Badge>
      </div>

      <p className="text-sm text-foreground leading-relaxed">{archetype.howItShowsUp}</p>

      <Collapsible open={evidenceOpen} onOpenChange={setEvidenceOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-left">
          <ChevronDown
            className={`size-3.5 text-muted-foreground transition-transform ${evidenceOpen ? 'rotate-180' : ''}`}
          />
          <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {evidenceOpen ? 'Hide' : 'View'} evidence ({archetype.evidence.length})
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="space-y-1.5 pt-2 ml-1">
            {archetype.evidence.map((e, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-walnut dark:bg-walnut-20 mt-2 shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex items-start gap-2 pt-2 border-t border-border">
        <AlertTriangle className="size-3.5 text-amber mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          <strong>Shadow:</strong> {archetype.shadowToWatch}
        </p>
      </div>
    </div>
  )
}

export function ArchetypeCard({ data }: { data: ArchetypeContent }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="size-5 text-walnut dark:text-walnut-20" />
          Personality & Archetypes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Archetype blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ArchetypeBlock archetype={data.primary} label="Primary" />
          <ArchetypeBlock archetype={data.supporting} label="Supporting" />
        </div>

        {/* Combination analysis */}
        <div className="bg-walnut-10 dark:bg-walnut/20 rounded-lg p-4 border-l-4 border-walnut">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            How They Work Together
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{data.combinationAnalysis}</p>
        </div>

        {/* Distinctiveness */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Distinctiveness
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{data.distinctiveness}</p>
        </div>

        {/* Personality traits */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Personality Traits
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.personalityTraits.map((trait, i) => (
              <span key={i} className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-md">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Brand character */}
        <div className="pt-2 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Brand Character
          </h4>
          <p className="text-sm text-foreground leading-relaxed italic">{data.brandCharacter}</p>
        </div>
      </CardContent>
    </Card>
  )
}
