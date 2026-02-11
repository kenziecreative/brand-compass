import { useState } from 'react'
import { ChevronDown, Mic, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { VoiceContent } from '@/types/brand'

export function VoiceCard({ data }: { data: VoiceContent }) {
  const [punctuationOpen, setPunctuationOpen] = useState(false)
  const [movesOpen, setMovesOpen] = useState(true)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Mic className="size-5 text-walnut dark:text-walnut-20" />
          Voice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* One-liner */}
        <div className="bg-walnut-10 dark:bg-walnut/20 rounded-lg p-5 border-l-4 border-walnut">
          <p className="text-foreground font-medium leading-relaxed italic text-lg">
            {data.oneLiner}
          </p>
        </div>

        {/* Voice tags + ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Voice Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.voiceTags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Polish / Conversational
              </h4>
              <p className="text-sm text-foreground">{data.polishedToConversational}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Avg. Sentence Length
              </h4>
              <p className="text-sm text-foreground">{data.averageSentenceLength} words</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Paragraph Pattern
              </h4>
              <p className="text-sm text-foreground">{data.paragraphPattern}</p>
            </div>
          </div>
        </div>

        {/* Punctuation habits — collapsible */}
        <Collapsible open={punctuationOpen} onOpenChange={setPunctuationOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Punctuation Habits
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${punctuationOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 pt-2">
              {Object.entries(data.punctuationHabits).map(([mark, desc]) => (
                <div key={mark} className="flex items-start gap-3 text-sm">
                  <span className="font-mono font-semibold text-walnut dark:text-walnut-20 w-28 shrink-0">
                    {mark}
                  </span>
                  <span className="text-foreground">{desc}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Signature moves — collapsible, default open */}
        <Collapsible open={movesOpen} onOpenChange={setMovesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Signature Moves
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.signatureMoves.length})
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${movesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 pt-2">
              {data.signatureMoves.map((move, i) => (
                <div key={i} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold text-foreground">{move.name}</h5>
                    <span className="text-xs text-muted-foreground">{move.frequency}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{move.description}</p>
                  <p className="text-sm text-foreground italic pl-3 border-l-2 border-amber/40">
                    {move.example}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Do / Don't */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-olive uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Check className="size-3.5" />
              Sounds Like Us
            </h4>
            <ul className="space-y-2">
              {data.doExamples.map((ex, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground italic pl-3 border-l-2 border-olive/40"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-rust uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <X className="size-3.5" />
              Doesn't Sound Like Us
            </h4>
            <ul className="space-y-2">
              {data.dontExamples.map((ex, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground italic pl-3 border-l-2 border-rust/40 line-through decoration-rust/30"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
