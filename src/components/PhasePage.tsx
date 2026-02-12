import { useParams } from 'react-router-dom'
import { getPhase } from '@/lib/phase-utils'
import { loadState } from '@/lib/state-loader'
import { getPhaseContent } from '@/lib/content-parser'
import { EmptyState } from '@/components/EmptyState'
import { ClientProfileCard } from '@/components/ClientProfileCard'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { PhaseContent, AgentOutputSection } from '@/components/PhaseContent'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DiscoveryChecklist } from '@/components/DiscoveryChecklist'

export function PhasePage() {
  const { phase } = useParams()
  const phaseNumber = Number(phase)
  const state = loadState()

  // Phase 0: Onboarding (special case — not in phases array)
  if (phaseNumber === 0) {
    const status = state?.phases[0] ?? 'pending'
    if (status === 'pending') {
      return <EmptyState command="start" phaseNumber={0} phaseName="Onboarding" />
    }
    const phaseDiscovery = state?.discoveryOutputs.filter(d => d.phase === 0) ?? []
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Phase 0</p>
            <h1 className="font-display text-2xl font-bold tracking-tight">Onboarding</h1>
          </div>
          <Badge variant={status === 'completed' ? 'success' : 'warning'}>
            {status === 'completed' ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
        {state?.client && <ClientProfileCard client={state.client} />}
        {phaseDiscovery.length > 0 && <DiscoveryChecklist items={phaseDiscovery} />}
        {status === 'completed' && (
          <div className="flex justify-end pt-4">
            <NextPhaseButton currentPhase={0} />
          </div>
        )}
      </div>
    )
  }

  const config = getPhase(phaseNumber)

  if (!config) {
    return <div className="text-center py-16 text-muted-foreground">Phase not found.</div>
  }

  const status = state?.phases[phaseNumber] ?? 'pending'

  if (status === 'pending') {
    return <EmptyState command={config.command} phaseNumber={phaseNumber} phaseName={config.name} />
  }

  const phaseDiscovery = state?.discoveryOutputs.filter(d => d.phase === phaseNumber) ?? []
  const phaseDecisions = state?.decisions.filter(d => d.phase === phaseNumber) ?? []
  const content = getPhaseContent(phaseNumber)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Phase header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Phase {phaseNumber}
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight">{config.name}</h1>
        </div>
        <Badge variant={status === 'completed' ? 'success' : 'warning'}>
          {status === 'completed' ? 'Complete' : 'In Progress'}
        </Badge>
      </div>

      {/* Phase purpose */}
      <p className="text-sm text-muted-foreground leading-relaxed">{config.purpose}</p>

      <div className="space-y-6">
        {/* Discovery outputs checklist */}
        {phaseDiscovery.length > 0 && <DiscoveryChecklist items={phaseDiscovery} />}

        {/* Phase content from workspace files */}
        {content.primary && <PhaseContent markdown={content.primary} title={config.name} />}

        {/* Agent research/draft output (collapsible) */}
        {content.agentOutput && content.agentOutputLabel && (
          <AgentOutputSection markdown={content.agentOutput} label={content.agentOutputLabel} />
        )}

        {/* Key decisions for this phase */}
        {phaseDecisions.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Key Decisions
              </h3>
              <ul className="space-y-2">
                {phaseDecisions.map((d, i) => (
                  <li key={i} className="text-sm text-foreground pl-3 border-l-2 border-walnut/30">
                    {d.decision}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* In-progress prompt */}
        {status === 'in_progress' && (
          <Card className="border-dashed border-amber/40">
            <CardContent className="pt-6 text-center py-8">
              <p className="text-sm text-muted-foreground">
                Phase in progress. Continue the discovery conversation in Claude Code.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Run{' '}
                <code className="px-1 py-0.5 bg-muted rounded font-mono">
                  /brand-compass:{config.command}
                </code>{' '}
                to continue.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Next phase button */}
        {status === 'completed' && (
          <div className="flex justify-end pt-4">
            <NextPhaseButton currentPhase={phaseNumber} />
          </div>
        )}
      </div>
    </div>
  )
}
