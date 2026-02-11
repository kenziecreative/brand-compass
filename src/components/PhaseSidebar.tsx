import { NavLink } from 'react-router-dom'
import {
  Compass,
  Users,
  Target,
  Sparkles,
  MessageSquare,
  Mic,
  Palette,
  Package,
  PlayCircle,
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CheckpointDivider } from '@/components/CheckpointDivider'
import { getPhasesByGroup } from '@/lib/phase-utils'
import type { BrandState, PhaseStatus } from '@/types/brand'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Users,
  Target,
  Sparkles,
  MessageSquare,
  Mic,
  Palette,
  Package,
}

function StatusDot({ status }: { status: PhaseStatus }) {
  return (
    <span
      className={cn(
        'size-2.5 rounded-full shrink-0 transition-colors mt-1.5',
        status === 'completed' && 'bg-olive',
        status === 'in_progress' && 'bg-amber ring-2 ring-amber/30',
        status === 'pending' && 'bg-walnut-20 dark:bg-walnut-80',
      )}
    />
  )
}

interface PhaseSidebarProps {
  state: BrandState | null
  collapsed?: boolean
}

export function PhaseSidebar({ state, collapsed = false }: PhaseSidebarProps) {
  const foundation = getPhasesByGroup('foundation')
  const identity = getPhasesByGroup('identity')
  const expression = getPhasesByGroup('expression')

  function renderGroup(phases: typeof foundation, label: string) {
    return (
      <div>
        {!collapsed && (
          <p className="mb-1.5 text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-medium">
            {label}
          </p>
        )}
        <ul className="space-y-0.5">
          {phases.map(phase => {
            const Icon = iconMap[phase.icon]
            const status = state?.phases[phase.number] ?? 'pending'
            return (
              <li key={phase.number}>
                <NavLink
                  to={`/phase/${phase.number}`}
                  className={({ isActive }) =>
                    cn(
                      'flex gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                      collapsed ? 'items-center' : 'items-start',
                      'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                      isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
                      collapsed && 'justify-center px-2',
                    )
                  }
                >
                  {Icon && <Icon className="size-4 shrink-0 mt-0.5" />}
                  {!collapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{phase.name}</span>
                        <span className="block text-[10px] text-sidebar-foreground/40 truncate leading-tight">
                          {phase.description}
                        </span>
                      </div>
                      <StatusDot status={status} />
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'flex flex-col text-sidebar-foreground h-full transition-[width] duration-200',
        collapsed ? 'w-14' : 'w-60',
      )}
    >
      {/* Header */}
      <div className={cn('px-3 py-4 border-b border-sidebar-border', collapsed && 'px-2')}>
        {collapsed ? (
          <div className="flex justify-center">
            <svg className="size-5" viewBox="0 0 100 100" fill="none" aria-label="Brand Compass">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" />
              <circle cx="50" cy="10" r="5" fill="currentColor" />
              <circle cx="90" cy="50" r="5" fill="currentColor" />
              <circle cx="50" cy="90" r="5" fill="currentColor" />
              <circle cx="10" cy="50" r="5" fill="currentColor" />
              <path d="M50 18 L58 48 L50 56 L42 48 Z" fill="currentColor" />
              <path
                d="M50 56 L58 48 L50 82 L42 48 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="50" cy="50" r="10" fill="#D4A855" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>
        ) : (
          <h1 className="font-display text-base font-bold tracking-tight flex items-center gap-2">
            <svg className="size-5 shrink-0" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" />
              <circle cx="50" cy="10" r="5" fill="currentColor" />
              <circle cx="90" cy="50" r="5" fill="currentColor" />
              <circle cx="50" cy="90" r="5" fill="currentColor" />
              <circle cx="10" cy="50" r="5" fill="currentColor" />
              <path d="M50 18 L58 48 L50 56 L42 48 Z" fill="currentColor" />
              <path
                d="M50 56 L58 48 L50 82 L42 48 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="50" cy="50" r="10" fill="#D4A855" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
            Brand Compass
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors mb-2',
              'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
              collapsed && 'justify-center px-2',
            )
          }
        >
          <LayoutDashboard className="size-4 shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* Phase 0: Onboarding */}
        <div>
          {!collapsed && (
            <p className="mb-1.5 text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-medium">
              Setup
            </p>
          )}
          <ul className="space-y-0.5">
            <li>
              <NavLink
                to="/phase/0"
                className={({ isActive }) =>
                  cn(
                    'flex gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    collapsed ? 'items-center' : 'items-start',
                    'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                    isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
                    collapsed && 'justify-center px-2',
                  )
                }
              >
                <PlayCircle className="size-4 shrink-0 mt-0.5" />
                {!collapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">Onboarding</span>
                      <span className="block text-[10px] text-sidebar-foreground/40 truncate leading-tight">
                        Client profile & asset packs
                      </span>
                    </div>
                    <StatusDot status={state?.phases[0] ?? 'pending'} />
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {renderGroup(foundation, 'Foundation')}
        <CheckpointDivider label="A" status={state?.checkpointA ?? 'pending'} />
        {renderGroup(identity, 'Identity')}
        <CheckpointDivider label="B" status={state?.checkpointB ?? 'pending'} />
        {renderGroup(expression, 'Expression')}
      </nav>

      {/* Brand Kit link */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <NavLink
          to="/output"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
              collapsed && 'justify-center px-2',
            )
          }
        >
          <Package className="size-4 shrink-0" />
          {!collapsed && <span>Brand Kit</span>}
        </NavLink>
      </div>
    </aside>
  )
}
