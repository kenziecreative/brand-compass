import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CheckpointStatus } from '@/types/brand'

interface CheckpointDividerProps {
  label: 'A' | 'B'
  status: CheckpointStatus
}

export function CheckpointDivider({ label, status }: CheckpointDividerProps) {
  const passed = status === 'passed'

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div
        className={cn(
          'h-px flex-1',
          passed ? 'bg-olive' : 'bg-walnut-20 dark:bg-walnut-80 border-dashed',
        )}
      />
      <div
        className={cn(
          'flex items-center justify-center size-6 rounded-full text-xs font-semibold transition-colors',
          passed
            ? 'bg-olive text-white'
            : 'border-2 border-walnut-60 dark:border-walnut-20 text-walnut-60 dark:text-walnut-20',
        )}
      >
        {passed ? <Check className="size-3.5" /> : label}
      </div>
      <div
        className={cn(
          'h-px flex-1',
          passed ? 'bg-olive' : 'bg-walnut-20 dark:bg-walnut-80 border-dashed',
        )}
      />
    </div>
  )
}
