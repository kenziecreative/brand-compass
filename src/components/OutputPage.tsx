import { Link } from 'react-router-dom'
import { FileText, Code, Download, PackagePlus, Eye } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadState } from '@/lib/state-loader'
import { getAssetPack } from '@/lib/phase-utils'

const deliverables = [
  {
    title: 'Brand Foundation',
    files: [
      { filename: 'workspace/output/brand-foundation.md', format: 'MD' },
      { filename: 'workspace/output/brand-foundation.html', format: 'HTML' },
    ],
    description: 'Core belief, positioning, personality, archetypes — the strategic DNA.',
    icon: FileText,
  },
  {
    title: 'Voice Guide',
    files: [
      { filename: 'workspace/output/voice-guide.md', format: 'MD' },
      { filename: 'workspace/output/voice-guide.html', format: 'HTML' },
    ],
    description: "Voice fingerprint, do/don't examples, tone spectrum, signature moves.",
    icon: FileText,
  },
  {
    title: 'Color Palette',
    files: [{ filename: 'workspace/output/color-palette.html', format: 'HTML' }],
    description: 'Color swatches, tint scales, CSS custom properties, contrast ratios.',
    icon: Code,
  },
  {
    title: 'Visual System',
    files: [{ filename: 'workspace/output/visual-system.html', format: 'HTML' }],
    description: 'Typography specimens, imagery style, AI generation prompts, mark direction.',
    icon: Code,
  },
  {
    title: 'UI Kit',
    files: [{ filename: 'workspace/output/ui-kit.html', format: 'HTML' }],
    description: "Component library with client's brand tokens — buttons, cards, forms.",
    icon: Code,
  },
]

export function OutputPage() {
  const state = loadState()
  const phase8Status = state?.phases[8] ?? 'pending'
  const isReady = phase8Status === 'completed'
  const totalFiles = deliverables.reduce((sum, d) => sum + d.files.length, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Brand Kit</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isReady
            ? `All ${totalFiles} files are ready for export.`
            : 'Complete all 8 phases to generate final deliverables.'}
        </p>
      </div>

      <div className="space-y-4">
        {deliverables.map(d => {
          const Icon = d.icon
          return (
            <Card key={d.title} className={!isReady ? 'opacity-50' : ''}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="size-4 text-walnut dark:text-walnut-20" />
                  <CardTitle className="text-base flex-1">{d.title}</CardTitle>
                </div>
                <CardDescription>{d.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {d.files.map(f => {
                    const basename = f.filename.split('/').pop() ?? f.filename
                    return isReady ? (
                      <li key={f.filename}>
                        <Link
                          to={`/output/view/${basename}`}
                          className="flex items-start gap-3 px-3 py-2 rounded-md border border-border/50 hover:border-border hover:bg-muted/40 transition-colors"
                        >
                          <Eye className="size-3.5 shrink-0 mt-0.5 text-walnut/60 dark:text-walnut-20/60" />
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-foreground">{basename}</span>
                            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                              {f.filename}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                            {f.format}
                          </Badge>
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={f.filename}
                        className="flex items-start gap-3 px-3 py-2 rounded-md border border-border/50 opacity-60"
                      >
                        <Eye className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/40" />
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {basename}
                          </span>
                          <p className="text-xs text-muted-foreground/60 mt-0.5 font-mono">
                            {f.filename}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                          {f.format}
                        </Badge>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Asset Pack info */}
      {state?.client?.assetPacks && state.client.assetPacks.length > 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <PackagePlus className="size-4 text-walnut dark:text-walnut-20" />
              <CardTitle className="text-base flex-1">Asset Packs</CardTitle>
            </div>
            <CardDescription>
              These add-on packs will generate additional sections in the toolkit output.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {state.client.assetPacks.map(id => {
                const pack = getAssetPack(id)
                const basename = pack?.outputFile?.split('/').pop()
                return isReady && basename ? (
                  <li key={id}>
                    <Link
                      to={`/output/view/${basename}`}
                      className="flex items-start gap-3 px-3 py-2 rounded-md border border-border/50 hover:border-border hover:bg-muted/40 transition-colors"
                    >
                      <Eye className="size-3.5 shrink-0 mt-0.5 text-walnut/60 dark:text-walnut-20/60" />
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium text-foreground">
                          {pack?.name ?? id}
                        </span>
                        {pack?.outputFile && (
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                            {pack.outputFile}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                        HTML
                      </Badge>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={id}
                    className="flex items-start gap-3 px-3 py-2 rounded-md border border-border/50 opacity-60"
                  >
                    <Eye className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/40" />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {pack?.name ?? id}
                      </span>
                      {pack?.outputFile && (
                        <p className="text-xs text-muted-foreground/60 mt-0.5 font-mono">
                          {pack.outputFile}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                      HTML
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      )}

      {isReady && (
        <div className="flex justify-end pt-4">
          <Button variant="accent" className="gap-2">
            <Download className="size-4" />
            Export All ({totalFiles} files)
          </Button>
        </div>
      )}
    </div>
  )
}
