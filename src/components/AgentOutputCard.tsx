import { FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface AgentOutputCardProps {
  filename: string
  content: string
}

export function AgentOutputCard({ filename, content }: AgentOutputCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-4 text-walnut dark:text-walnut-20" />
          <span>Agent Output</span>
        </CardTitle>
        <p className="text-xs font-mono text-muted-foreground">{filename}</p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-foreground">
          <pre className="whitespace-pre-wrap text-sm bg-muted rounded-md p-4 overflow-x-auto font-mono">
            {content}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
