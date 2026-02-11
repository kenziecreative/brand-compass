import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getPhase } from '@/lib/phase-utils'

interface NextPhaseButtonProps {
  currentPhase: number
}

export function NextPhaseButton({ currentPhase }: NextPhaseButtonProps) {
  if (currentPhase === 0) {
    return (
      <Link to="/phase/1">
        <Button variant="accent" className="gap-2">
          Continue to Phase 1: Origin & Belief
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    )
  }

  const next = getPhase(currentPhase + 1)
  if (!next) return null

  return (
    <Link to={`/phase/${next.number}`}>
      <Button variant="accent" className="gap-2">
        Continue to Phase {next.number}: {next.shortName}
        <ArrowRight className="size-4" />
      </Button>
    </Link>
  )
}
