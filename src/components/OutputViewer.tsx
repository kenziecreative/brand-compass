import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'

const fileTitles: Record<string, string> = {
  'brand-foundation.md': 'Brand Foundation',
  'brand-foundation.html': 'Brand Foundation',
  'voice-guide.md': 'Voice & Expression Guide',
  'voice-guide.html': 'Voice & Expression Guide',
  'color-palette.html': 'Color Palette',
  'visual-system.html': 'Visual System',
  'ui-kit.html': 'UI Kit',
  'practical-toolkit.md': 'Practical Toolkit',
  'social-media-kit.html': 'Social Media Kit',
  'print-collateral.html': 'Print Collateral',
  'media-kit-epk.html': 'Media Kit / EPK',
  'merch-product.html': 'Merch & Product',
  'pitch-deck.html': 'Pitch Deck',
  'app-dashboard-ui.html': 'App / Dashboard UI',
  'signage-space.html': 'Signage & Space',
  'email-newsletter.html': 'Email & Newsletter',
}

export function OutputViewer() {
  const { '*': filePath } = useParams()
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)
  const [fileExists, setFileExists] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const filename = filePath?.split('/').pop() ?? ''
  const ext = filename.split('.').pop() ?? ''
  const title = fileTitles[filename] ?? filename
  const srcUrl = `/workspace/output/${filename}`

  useEffect(() => {
    if (ext === 'md') {
      fetch(srcUrl)
        .then(r => {
          if (!r.ok) throw new Error(`File not found: ${filename}`)
          return r.text()
        })
        .then(text => {
          setMarkdownContent(text)
          setFileExists(true)
        })
        .catch(e => setError(e.message))
    } else if (ext === 'html') {
      fetch(srcUrl, { method: 'HEAD' })
        .then(r => {
          if (!r.ok || r.headers.get('content-type')?.includes('text/html') === false) {
            setFileExists(false)
          } else {
            setFileExists(true)
          }
        })
        .catch(() => setFileExists(false))
    }
  }, [srcUrl, ext, filename])

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14)-theme(spacing.12))]">
      {/* Viewer header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border shrink-0">
        <Link to="/output">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-lg font-bold tracking-tight truncate">{title}</h1>
          <p className="text-xs font-mono text-muted-foreground">{`workspace/output/${filename}`}</p>
        </div>
        <Badge variant="outline" className="text-[10px] shrink-0">
          {ext.toUpperCase()}
        </Badge>
        {ext === 'html' && (
          <a href={srcUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon-sm" title="Open in new tab">
              <ExternalLink className="size-4" />
            </Button>
          </a>
        )}
      </div>

      {/* Viewer content */}
      <div className="flex-1 mt-4 min-h-0">
        {fileExists === false || error ? (
          <div className="h-full flex items-center justify-center rounded-lg border border-dashed border-border bg-card">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {error ?? `This file hasn't been generated yet.`}
              </p>
              <p className="text-xs text-muted-foreground/60">
                Run{' '}
                <code className="px-1 py-0.5 bg-muted rounded font-mono">
                  /brand-compass:phase-8-toolkit
                </code>{' '}
                to generate deliverables.
              </p>
            </div>
          </div>
        ) : ext === 'html' ? (
          fileExists === null ? (
            <div className="h-full flex items-center justify-center rounded-lg border border-border bg-card">
              <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
          ) : (
            <iframe
              src={srcUrl}
              title={title}
              className="w-full h-full rounded-lg border border-border bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          )
        ) : ext === 'md' ? (
          <div className="h-full overflow-auto rounded-lg border border-border bg-card p-6">
            {markdownContent === null ? (
              <p className="text-muted-foreground text-sm">Loading...</p>
            ) : (
              <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-foreground">
                {markdownContent}
              </pre>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Unsupported file type: .{ext}</p>
        )}
      </div>
    </div>
  )
}
