import { useState } from 'react'
import { ChevronDown, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { AudienceContent } from '@/types/brand'

export function AudienceCard({ data }: { data: AudienceContent }) {
  const [tensionsOpen, setTensionsOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Audience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Primary audience */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
            <Users className="size-3.5" />
            Primary Audience
          </h4>
          <p className="text-foreground leading-relaxed">{data.primaryAudience}</p>
        </div>

        {data.secondaryAudience && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Secondary Audience
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{data.secondaryAudience}</p>
          </div>
        )}

        {/* Language patterns — collapsible */}
        <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              How They Talk
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.languagePatterns.length} patterns)
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${languageOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-3 pt-2">
              {data.languagePatterns.map((pattern, i) => (
                <li key={i} className="text-sm text-foreground pl-4 border-l-2 border-amber/40">
                  {pattern}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Tensions — collapsible */}
        <Collapsible open={tensionsOpen} onOpenChange={setTensionsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Tensions
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.tensions.length})
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${tensionsOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-2 pt-2">
              {data.tensions.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Transformation */}
        <div className="bg-olive-10 dark:bg-olive/10 rounded-lg p-4 border-l-4 border-olive">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Transformation Offered
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{data.transformation}</p>
        </div>
      </CardContent>
    </Card>
  )
}
