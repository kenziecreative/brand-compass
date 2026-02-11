import { Terminal } from 'lucide-react'

interface EmptyStateProps {
  command: string
  phaseNumber: number
  phaseName: string
}

export function EmptyState({ command, phaseNumber, phaseName }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex items-center justify-center size-12 rounded-full bg-walnut-10 dark:bg-walnut-80 mb-4">
        <Terminal className="size-5 text-walnut dark:text-walnut-20" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-1">
        Phase {phaseNumber}: {phaseName}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        This phase hasn't been started yet. Run the command below to begin discovery.
      </p>
      <code className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-walnut text-cream font-mono text-sm">
        /brand-compass:{command}
      </code>
    </div>
  )
}
