/**
 * Loads markdown and HTML files from research/, drafts/, and output/ directories
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

const outputMdFiles = import.meta.glob('/workspace/output/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const outputHtmlFiles = import.meta.glob('/workspace/output/*.html', {
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
  return [
    ...toContentFiles(outputMdFiles, 'output', 'md'),
    ...toContentFiles(outputHtmlFiles, 'output', 'html'),
  ]
}

export function getFile(path: string): string | null {
  return (
    researchFiles[path] ?? draftFiles[path] ?? outputMdFiles[path] ?? outputHtmlFiles[path] ?? null
  )
}

export function hasResearchFiles(): boolean {
  return Object.keys(researchFiles).length > 0
}

export function hasDraftFiles(): boolean {
  return Object.keys(draftFiles).length > 0
}

export function hasOutputFiles(): boolean {
  return Object.keys(outputMdFiles).length > 0 || Object.keys(outputHtmlFiles).length > 0
}
