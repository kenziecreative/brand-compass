import { Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { SessionLogEntry } from '@/types/brand'

interface SessionLogCardProps {
  entries: SessionLogEntry[]
}

export function SessionLogCard({ entries }: SessionLogCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="size-4 text-walnut dark:text-walnut-20" />
          <span>Session Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {entries.map((entry, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-muted-foreground shrink-0 pt-0.5">
                {entry.date}
              </span>
              <span className="text-foreground">{entry.summary}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
