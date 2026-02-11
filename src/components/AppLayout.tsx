import { Outlet, NavLink, useParams, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { PhaseSidebar } from '@/components/PhaseSidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { getPhase } from '@/lib/phase-utils'
import { loadState } from '@/lib/state-loader'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const params = useParams()
  const location = useLocation()
  const phaseNumber = params.phase !== undefined ? Number(params.phase) : undefined
  const currentPhase =
    phaseNumber !== undefined && phaseNumber > 0 ? getPhase(phaseNumber) : undefined
  const state = loadState()
  const isOutputViewer = location.pathname.startsWith('/output/view/')
  const viewingFile = isOutputViewer ? location.pathname.split('/output/view/')[1] : undefined

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar spacer — reserves width in flex layout */}
      <div className="hidden md:block w-60 shrink-0" />
      {/* Desktop sidebar — fixed to viewport */}
      <div className="hidden md:flex fixed inset-y-0 left-0 w-60 z-30 bg-sidebar border-r border-sidebar-border">
        <PhaseSidebar state={state} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative w-60 h-full">
            <PhaseSidebar state={state} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur px-4 h-14">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-1 min-w-0">
            <NavLink to="/" className="hover:text-foreground transition-colors font-medium">
              {state?.client?.name || state?.clientName || 'Brand Compass'}
            </NavLink>
            {phaseNumber === 0 && (
              <>
                <span className="text-muted-foreground/50">/</span>
                <span
                  className={cn(
                    'truncate',
                    state?.phases[0] === 'in_progress' && 'text-foreground font-medium',
                  )}
                >
                  Phase 0: Onboarding
                </span>
              </>
            )}
            {currentPhase && (
              <>
                <span className="text-muted-foreground/50">/</span>
                <span
                  className={cn(
                    'truncate',
                    state?.phases[currentPhase.number] === 'in_progress' &&
                      'text-foreground font-medium',
                  )}
                >
                  Phase {currentPhase.number}: {currentPhase.name}
                </span>
              </>
            )}
            {isOutputViewer && (
              <>
                <span className="text-muted-foreground/50">/</span>
                <NavLink to="/output" className="hover:text-foreground transition-colors">
                  Brand Kit
                </NavLink>
                <span className="text-muted-foreground/50">/</span>
                <span className="truncate text-foreground font-medium">{viewingFile}</span>
              </>
            )}
          </nav>

          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-3 text-xs text-muted-foreground">
          Brand Compass System
        </footer>
      </div>
    </div>
  )
}
