import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  className?: string
}

export function StepIndicator({ steps, className }: StepIndicatorProps) {
  return (
    <ol className={cn('space-y-0', className)}>
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          {/* Line + dot column */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center size-5 rounded-full shrink-0 transition-colors',
                step.completed
                  ? 'bg-olive text-white'
                  : 'border-2 border-walnut-20 dark:border-walnut-80',
              )}
            >
              {step.completed && <Check className="size-3" />}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'w-px flex-1 min-h-5',
                  step.completed ? 'bg-olive/40' : 'bg-walnut-20 dark:bg-walnut-80',
                )}
              />
            )}
          </div>
          {/* Label */}
          <span
            className={cn(
              'text-sm pb-3',
              step.completed ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  )
}
