import { useState } from 'react'
import { ChevronDown, Star, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { MessagingContent } from '@/types/brand'

export function MessagingCard({ data }: { data: MessagingContent }) {
  const [narrativesOpen, setNarrativesOpen] = useState(true)
  const [boilerplatesOpen, setBoilerplatesOpen] = useState(false)

  const recommended = data.taglines.filter(t => t.recommended)
  const others = data.taglines.filter(t => !t.recommended)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="size-5 text-walnut dark:text-walnut-20" />
          Messaging Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Recommended taglines */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Star className="size-3.5 text-amber" />
            Recommended Taglines
          </h4>
          <div className="space-y-3">
            {recommended.map((t, i) => (
              <div
                key={i}
                className="bg-amber-10 dark:bg-amber/10 rounded-lg p-4 border-l-4 border-amber"
              >
                <p className="font-semibold text-foreground text-lg mb-1">{t.text}</p>
                {t.rationale && <p className="text-sm text-muted-foreground">{t.rationale}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Other taglines */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Other Options
          </h4>
          <div className="flex flex-wrap gap-2">
            {others.map((t, i) => (
              <span key={i} className="px-3 py-2 bg-muted text-foreground text-sm rounded-md">
                {t.text}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative options — collapsible, default open */}
        <Collapsible open={narrativesOpen} onOpenChange={setNarrativesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Core Narrative Options
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.narratives.length} angles)
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${narrativesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 pt-2">
              {data.narratives.map((n, i) => (
                <div key={i} className="bg-muted rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">Option {String.fromCharCode(65 + i)}</Badge>
                    <span className="text-sm font-medium text-foreground">{n.angle}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3 whitespace-pre-line">
                    {n.text}
                  </p>
                  <p className="text-xs text-muted-foreground border-t border-border pt-2">
                    <strong>Why this angle:</strong> {n.rationale}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Boilerplates — collapsible */}
        <Collapsible open={boilerplatesOpen} onOpenChange={setBoilerplatesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Boilerplates
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                (3 lengths)
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${boilerplatesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 pt-2">
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2">One Sentence</h5>
                {data.boilerplates.oneSentence.map((s, i) => (
                  <p
                    key={i}
                    className="text-sm text-foreground mb-2 pl-4 border-l-2 border-walnut/20"
                  >
                    {s}
                  </p>
                ))}
              </div>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2">One Paragraph</h5>
                {data.boilerplates.oneParagraph.map((s, i) => (
                  <p
                    key={i}
                    className="text-sm text-foreground mb-3 pl-4 border-l-2 border-walnut/20 leading-relaxed"
                  >
                    {s}
                  </p>
                ))}
              </div>
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2">Three Paragraphs</h5>
                {data.boilerplates.threeParagraphs.map((s, i) => (
                  <div
                    key={i}
                    className="text-sm text-foreground pl-4 border-l-2 border-walnut/20 leading-relaxed whitespace-pre-line"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
