/**
 * Loads markdown and HTML files from research/, drafts/, and client/, skill-bundle/, and design-kit/ subdirectories under output/
 * at build time using import.meta.glob.
 */

// Load all markdown files from project directories
const researchFiles = import.meta.glob('/workspace/research/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const draftFiles = import.meta.glob('/workspace/drafts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const clientMdFiles = import.meta.glob('/workspace/output/client/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const clientHtmlFiles = import.meta.glob('/workspace/output/client/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const skillBundleFiles = import.meta.glob('/workspace/output/skill-bundle/**/*.{html,md}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const designKitFiles = import.meta.glob('/workspace/output/design-kit/**/*.{html,md}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>


export interface ContentFile {
  path: string
  filename: string
  content: string
  directory: 'research' | 'drafts' | 'output'
  format: 'md' | 'html'
}

function toContentFiles(
  files: Record<string, string>,
  directory: ContentFile['directory'],
  format: ContentFile['format'],
): ContentFile[] {
  return Object.entries(files).map(([path, content]) => ({
    path,
    filename: path.split('/').pop() ?? path,
    content,
    directory,
    format,
  }))
}

export function loadResearchFiles(): ContentFile[] {
  return toContentFiles(researchFiles, 'research', 'md')
}

export function loadDraftFiles(): ContentFile[] {
  return toContentFiles(draftFiles, 'drafts', 'md')
}

export function loadOutputFiles(): ContentFile[] {
  const clientMd = toContentFiles(clientMdFiles, 'output', 'md')
  const clientHtml = toContentFiles(clientHtmlFiles, 'output', 'html')

  // For mixed-extension globs, derive format from path
  const skillBundle = Object.entries(skillBundleFiles).map(([path, content]) => ({
    path,
    filename: path.split('/').pop() ?? path,
    content,
    directory: 'output' as const,
    format: (path.endsWith('.html') ? 'html' : 'md') as ContentFile['format'],
  }))

  const designKit = Object.entries(designKitFiles).map(([path, content]) => ({
    path,
    filename: path.split('/').pop() ?? path,
    content,
    directory: 'output' as const,
    format: (path.endsWith('.html') ? 'html' : 'md') as ContentFile['format'],
  }))

  return [...clientMd, ...clientHtml, ...skillBundle, ...designKit]
}

export function getFile(path: string): string | null {
  return (
    researchFiles[path] ??
    draftFiles[path] ??
    clientMdFiles[path] ??
    clientHtmlFiles[path] ??
    skillBundleFiles[path] ??
    designKitFiles[path] ??
    null
  )
}

export function hasResearchFiles(): boolean {
  return Object.keys(researchFiles).length > 0
}

export function hasDraftFiles(): boolean {
  return Object.keys(draftFiles).length > 0
}

export function hasOutputFiles(): boolean {
  return (
    Object.keys(clientMdFiles).length > 0 ||
    Object.keys(clientHtmlFiles).length > 0 ||
    Object.keys(skillBundleFiles).length > 0 ||
    Object.keys(designKitFiles).length > 0
  )
}
