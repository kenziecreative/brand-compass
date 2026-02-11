import { useState } from 'react'
import { ChevronDown, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { PositioningContent } from '@/types/brand'

export function PositioningCard({ data }: { data: PositioningContent }) {
  const [competitorsOpen, setCompetitorsOpen] = useState(false)
  const [clichesOpen, setClichesOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Positioning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Positioning statement */}
        <div className="bg-walnut-10 dark:bg-walnut/20 rounded-lg p-5 border-l-4 border-walnut">
          <div className="flex gap-3">
            <Target className="size-5 text-walnut dark:text-walnut-20 shrink-0 mt-0.5" />
            <p className="text-foreground leading-relaxed">{data.statement}</p>
          </div>
        </div>

        {/* Competitors table — collapsible */}
        <Collapsible open={competitorsOpen} onOpenChange={setCompetitorsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Competitive Landscape
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.competitors.length} players)
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${competitorsOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.competitors.map((c, i) => (
                <div key={i} className="bg-muted rounded-lg p-4">
                  <h5 className="font-semibold text-foreground mb-1">{c.name}</h5>
                  <p className="text-sm text-muted-foreground mb-1">{c.positioning}</p>
                  <p className="text-xs text-muted-foreground/70">Tone: {c.tone}</p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Category clichés — collapsible */}
        <Collapsible open={clichesOpen} onOpenChange={setClichesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Category Cliches to Avoid
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.categoryCliches.length})
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${clichesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-1.5 pt-2">
              {data.categoryCliches.map((c, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground line-through decoration-rust/40"
                >
                  {c}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* White space */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            White Space
          </h4>
          <ul className="space-y-2">
            {data.whiteSpace.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-olive mt-2 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Differentiation angles */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Differentiation Angles
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.differentiationAngles.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-olive-10 dark:bg-olive/10 text-foreground text-sm rounded-md border border-olive/20"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
