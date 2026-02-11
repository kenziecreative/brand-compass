import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { DiscoveryOutput } from '@/types/brand'

interface DiscoveryChecklistProps {
  items: DiscoveryOutput[]
  title?: string
}

export function DiscoveryChecklist({
  items,
  title = 'Discovery Outputs',
}: DiscoveryChecklistProps) {
  const completed = items.filter(i => i.completed).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completed}/{items.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.key} className="flex items-center gap-3">
              <div
                className={cn(
                  'flex items-center justify-center size-5 rounded shrink-0 transition-colors',
                  item.completed
                    ? 'bg-olive text-white'
                    : 'border border-walnut-20 dark:border-walnut-80',
                )}
              >
                {item.completed && <Check className="size-3" />}
              </div>
              <span
                className={cn(
                  'text-sm',
                  item.completed ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
