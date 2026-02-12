import { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

/** Renders markdown content inside a styled card */
export function PhaseContent({ markdown, title }: { markdown: string; title: string }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose">
          <Markdown>{markdown}</Markdown>
        </div>
      </CardContent>
    </Card>
  )
}

/** Agent output in a collapsible card */
export function AgentOutputSection({
  markdown,
  label,
}: {
  markdown: string
  label: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-dashed">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-4 text-left">
          <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="size-4" />
            {label}
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="prose">
              <Markdown>{markdown}</Markdown>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
