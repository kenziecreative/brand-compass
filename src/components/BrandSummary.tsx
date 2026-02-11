import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { BrandState } from '@/types/brand'

interface BrandSummaryProps {
  state: BrandState
}

export function BrandSummary({ state }: BrandSummaryProps) {
  // Show key decisions as the brand identity accumulates
  if (state.decisions.length === 0) return null

  return (
    <Card className="border-walnut/20 dark:border-walnut-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Brand Identity — Building
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {state.decisions.map((d, i) => (
            <div key={i} className="text-sm text-foreground pl-3 border-l-2 border-walnut/30">
              {d.decision}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
