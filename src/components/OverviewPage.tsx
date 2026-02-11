import { NavLink } from 'react-router-dom'
import { Activity, Bot, Compass } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SessionLogCard } from '@/components/SessionLogCard'
import { loadState } from '@/lib/state-loader'
import { phases, getAssetPack } from '@/lib/phase-utils'
import { cn } from '@/lib/utils'
import type { PhaseStatus } from '@/types/brand'

function statusBadge(status: PhaseStatus) {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Complete</Badge>
    case 'in_progress':
      return <Badge variant="warning">In Progress</Badge>
    case 'pending':
      return <Badge variant="info">Pending</Badge>
  }
}

export function OverviewPage() {
  const state = loadState()

  if (!state) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <Compass className="size-12 text-walnut dark:text-walnut-20 mx-auto" />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight mb-2">Brand Compass</h1>
          <p className="text-muted-foreground leading-relaxed">
            No brand project in progress. Run{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-foreground text-sm font-mono">
              /brand-compass:start
            </code>{' '}
            in Claude Code to begin onboarding.
          </p>
        </div>
      </div>
    )
  }

  const completedOutputs = state.discoveryOutputs.filter(d => d.completed).length
  const totalOutputs = state.discoveryOutputs.length
  const progressPct = totalOutputs > 0 ? Math.round((completedOutputs / totalOutputs) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {state.client?.name || state.clientName}
          </h1>
          {state.client?.type && <Badge variant="outline">{state.client.type}</Badge>}
        </div>
        {state.client?.description && (
          <p className="text-muted-foreground text-sm mt-1">{state.client.description}</p>
        )}
        <p className="text-muted-foreground/60 text-xs mt-1">
          Currently in Phase {state.currentPhase} of 8
        </p>
      </div>

      {/* Asset Packs */}
      {state.client?.assetPacks && state.client.assetPacks.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-2">Asset Packs</p>
            <div className="flex flex-wrap gap-1.5">
              {state.client.assetPacks.map(id => {
                const pack = getAssetPack(id)
                return (
                  <Badge key={id} variant="info" className="text-xs">
                    {pack?.shortName ?? id}
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8">
        {/* Discovery progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Discovery Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedOutputs}/{totalOutputs}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-olive transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Phase grid */}
        <div>
          <h2 className="font-display text-lg font-semibold mb-4">Phases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {phases.map(phase => {
              const status = state.phases[phase.number] ?? 'pending'
              const decision = state.decisions.find(d => d.phase === phase.number)
              return (
                <NavLink key={phase.number} to={`/phase/${phase.number}`}>
                  <Card
                    className={cn(
                      'hover:shadow-md transition-shadow cursor-pointer h-full',
                      status === 'in_progress' && 'ring-2 ring-amber/40',
                    )}
                  >
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <CardDescription className="text-xs">Phase {phase.number}</CardDescription>
                        {statusBadge(status)}
                      </div>
                      <CardTitle className="text-base">{phase.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-3">
                      {decision ? (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {decision.decision}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground/50 italic">
                          {status === 'pending' ? 'Not started' : 'In progress'}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Agents + Session log */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="size-4 text-walnut dark:text-walnut-20" />
                <span>Agents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.agents.length > 0 ? (
                <ul className="space-y-3">
                  {state.agents.map((agent, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Activity
                          className={cn(
                            'size-3.5',
                            agent.status === 'running' ? 'text-amber animate-pulse' : 'text-olive',
                          )}
                        />
                        <span>{agent.name}</span>
                      </div>
                      <Badge variant={agent.status === 'running' ? 'warning' : 'success'}>
                        {agent.status === 'running' ? 'Running' : 'Done'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground/50 italic">No agents have run yet.</p>
              )}
            </CardContent>
          </Card>

          <SessionLogCard entries={state.sessionLog} />
        </div>
      </div>
    </div>
  )
}
