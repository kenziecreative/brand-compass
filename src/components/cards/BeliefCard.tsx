import { useState } from 'react'
import { ChevronDown, Quote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { BeliefContent } from '@/types/brand'

export function BeliefCard({ data }: { data: BeliefContent }) {
  const [originOpen, setOriginOpen] = useState(false)
  const [experiencesOpen, setExperiencesOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Origin & Belief</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Core belief — always prominent */}
        <div className="bg-walnut-10 dark:bg-walnut/20 rounded-lg p-5 border-l-4 border-walnut">
          <div className="flex gap-3">
            <Quote className="size-5 text-walnut dark:text-walnut-20 shrink-0 mt-0.5" />
            <p className="text-foreground font-medium leading-relaxed italic">{data.corebelief}</p>
          </div>
        </div>

        {/* Origin story — collapsible */}
        <Collapsible open={originOpen} onOpenChange={setOriginOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Origin Story
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.originStory.length} moments)
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${originOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ol className="space-y-3 pt-2">
              {data.originStory.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center size-5 rounded-full bg-walnut text-cream text-xs font-medium shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </CollapsibleContent>
        </Collapsible>

        {/* Formative experiences — collapsible */}
        <Collapsible open={experiencesOpen} onOpenChange={setExperiencesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Formative Experiences
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.formativeExperiences.length})
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${experiencesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-2 pt-2">
              {data.formativeExperiences.map((exp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-walnut dark:bg-walnut-20 mt-2 shrink-0" />
                  <span className="text-sm text-foreground">{exp}</span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Recurring themes — always visible */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Recurring Themes
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.recurringThemes.map((theme, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-walnut-10 dark:bg-walnut/20 text-foreground text-sm rounded-md"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
