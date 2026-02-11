import { useState } from 'react'
import { ChevronDown, Palette, Type, Image, Wand2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { VisualContent } from '@/types/brand'

function ColorSwatch({
  name,
  hex,
  meaning,
  role,
}: {
  name: string
  hex: string
  meaning: string
  role: string
}) {
  return (
    <div className="flex gap-3">
      <div
        className="w-12 h-12 rounded-lg shrink-0 border border-border shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground text-sm">{name}</span>
          <span className="font-mono text-xs text-muted-foreground">{hex}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
            {role}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{meaning}</p>
      </div>
    </div>
  )
}

export function VisualDirectionCard({ data }: { data: VisualContent }) {
  const [principlesOpen, setPrinciplesOpen] = useState(true)
  const [typographyOpen, setTypographyOpen] = useState(false)
  const [avoidOpen, setAvoidOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="size-5 text-walnut dark:text-walnut-20" />
          Visual Direction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Visual principles — collapsible, default open */}
        <Collapsible open={principlesOpen} onOpenChange={setPrinciplesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Visual Principles
              <span className="ml-2 text-muted-foreground/60 normal-case tracking-normal">
                ({data.visualPrinciples.length})
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${principlesOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 pt-2">
              {data.visualPrinciples.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center size-6 rounded bg-walnut text-cream text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-foreground text-sm">{p.name}</span>
                    <p className="text-sm text-muted-foreground">{p.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Color palette */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
            <Palette className="size-3.5" />
            Color Palette
          </h4>
          {/* Swatch strip */}
          <div className="flex rounded-lg overflow-hidden h-10 mb-4 shadow-sm">
            {data.colors.map((c, i) => (
              <div
                key={i}
                className="flex-1"
                style={{ backgroundColor: c.hex }}
                title={`${c.name}: ${c.hex}`}
              />
            ))}
          </div>
          {/* Color details */}
          <div className="space-y-3">
            {data.colors.map((c, i) => (
              <ColorSwatch key={i} {...c} />
            ))}
          </div>
          {/* Colors to avoid */}
          {data.colorsToAvoid.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs font-medium text-rust uppercase tracking-wide mb-2">Avoid</p>
              <ul className="space-y-1">
                {data.colorsToAvoid.map((c, i) => (
                  <li key={i} className="text-xs text-muted-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Typography — collapsible */}
        <Collapsible open={typographyOpen} onOpenChange={setTypographyOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Type className="size-3.5" />
              Typography
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${typographyOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Headlines
                </p>
                <p className="text-lg font-semibold text-foreground mb-1">
                  {data.headlineFont.name}
                </p>
                <p className="text-xs text-muted-foreground mb-2">{data.headlineFont.character}</p>
                <p className="text-xs text-muted-foreground/70">{data.headlineFont.rationale}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Body</p>
                <p className="text-lg font-semibold text-foreground mb-1">{data.bodyFont.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{data.bodyFont.character}</p>
                <p className="text-xs text-muted-foreground/70">{data.bodyFont.rationale}</p>
              </div>
            </div>
            {data.typographyToAvoid.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs font-medium text-rust uppercase tracking-wide mb-2">Avoid</p>
                <ul className="space-y-1">
                  {data.typographyToAvoid.map((t, i) => (
                    <li key={i} className="text-xs text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Imagery + brand world */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Image className="size-3.5" />
            Imagery & Brand World
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{data.imageryStyle}</p>
          <div className="bg-walnut-10 dark:bg-walnut/20 rounded-lg p-4 border-l-4 border-walnut">
            <p className="text-sm text-foreground leading-relaxed italic">
              {data.visualBrandWorld}
            </p>
          </div>
        </div>

        {/* AI prompt + mark direction */}
        <Collapsible open={avoidOpen} onOpenChange={setAvoidOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Wand2 className="size-3.5" />
              AI Generation Prompt & Mark Direction
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${avoidOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 pt-2">
              <div className="bg-muted rounded-md p-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  AI Image Style Block
                </p>
                <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                  {data.aiPrompt}
                </pre>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Mark / Logo Direction
                </p>
                <p className="text-sm text-foreground leading-relaxed">{data.markDirection}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
