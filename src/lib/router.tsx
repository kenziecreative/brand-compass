import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { OverviewPage } from '@/components/OverviewPage'
import { PhasePage } from '@/components/PhasePage'
import { OutputPage } from '@/components/OutputPage'
import { OutputViewer } from '@/components/OutputViewer'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'phase/:phase', element: <PhasePage /> },
      { path: 'output', element: <OutputPage /> },
      { path: 'output/view/*', element: <OutputViewer /> },
    ],
  },
])
