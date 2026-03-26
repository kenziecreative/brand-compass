# External Integrations

**Analysis Date:** 2026-03-26

## APIs & External Services

**Not applicable** - No external API integrations detected. This is a standalone static application with no backend service calls.

## Data Storage

**Databases:**
- Not applicable — No database connections. Application uses no persistent storage.

**File Storage:**
- Local filesystem only
- Files served via Vite dev middleware (`serveWorkspace` plugin in `vite.config.ts`)
- Workspace directory (`/workspace/`) contains:
  - `STATE.md` — Brand project state file (loaded at build time)
  - `research/` — Markdown files with research outputs
  - `drafts/` — Markdown files with draft outputs
  - `output/` — Final HTML and markdown deliverables
  - `reference/` — Example brand project reference files
  - `assets/` — Generated images and brand assets

**Caching:**
- Browser HTTP caching only (Vite-managed)
- No Redis, Memcached, or application-level caching

## Authentication & Identity

**Auth Provider:**
- Not applicable — No user authentication required

**Access Control:**
- Not applicable — No access control or permission management

## Monitoring & Observability

**Error Tracking:**
- Not applicable — No error tracking service (Sentry, Rollbar, etc.)

**Logs:**
- Console logging only — browser console for debugging
- No log aggregation service
- No server-side logs

**Performance Monitoring:**
- Not applicable — No performance monitoring service

## CI/CD & Deployment

**Hosting:**
- Static file hosting (any provider: Vercel, Netlify, GitHub Pages, S3, etc.)
- No special server requirements
- Build outputs to `dist/` directory

**CI Pipeline:**
- Not configured — No GitHub Actions, GitLab CI, or similar in repository

**Build Commands:**
- `npm run build` — Compiles TypeScript, bundles with Vite, generates CSS
- `npm run dev` — Development server on port 3001
- `npm run preview` — Preview production build locally

## Environment Configuration

**Required env vars:**
- None — Application requires no runtime environment variables

**Optional env vars:**
- None detected

**Configuration files:**
- `.env` file — Not required and not present

**Secrets location:**
- Not applicable — No secrets management needed

## Webhooks & Callbacks

**Incoming:**
- Not applicable — No webhook endpoints

**Outgoing:**
- Not applicable — No outgoing webhooks or callbacks

## Build-Time Dependencies

**File Loading at Build Time:**
Content files are loaded statically at build time using Vite's `import.meta.glob`:

- `workspace/STATE.md` — Loaded by `src/lib/state-loader.ts`
- `workspace/research/*.md` — Loaded by `src/lib/content-loader.ts`
- `workspace/drafts/*.md` — Loaded by `src/lib/content-loader.ts`
- `workspace/output/*.md` — Loaded by `src/lib/content-loader.ts`
- `workspace/output/*.html` — Loaded by `src/lib/content-loader.ts`

These files are embedded as module exports during the build process and served as part of the JavaScript bundle. No runtime file I/O or network requests occur.

## Google Fonts Integration

**Font Delivery:**
- Google Fonts CDN for font loading
- Fonts linked in `index.html`:
  - `Bitter` (serif) — Display font for headlines
  - `IBM Plex Sans` — Body and UI font
  - `IBM Plex Mono` — Monospace for code
- Preconnect headers: `fonts.googleapis.com`, `fonts.gstatic.com` (performance optimization)

**Font Fallbacks:**
- CSS in `src/index.css` provides system font fallbacks:
  - IBM Plex Sans falls back to system-ui, sans-serif
  - IBM Plex Mono falls back to ui-monospace, monospace

## Asset References

**Public Assets:**
- `public/compass.svg` — Favicon and brand icon
- Referenced in `index.html` as favicon

**Icon Library:**
- Lucide React — Icon components (imported as needed, embedded in bundle)

## Static Code Analysis

**Linting:**
- ESLint runs locally via `npm run lint`
- No pre-commit hooks enforcing linting (optional setup via `npm run hooks:install`)

**Formatting:**
- Prettier configured for auto-formatting
- Run via `npm run format`

## No External Dependencies

**Explicitly NOT used:**
- Analytics (Google Analytics, Mixpanel, Amplitude, etc.)
- Error tracking (Sentry, Rollbar, Bugsnag)
- A/B testing frameworks
- CMS or headless content platforms
- Backend API or REST endpoints
- Database connection strings
- Message queues or pub/sub
- Payment processors
- Email services
- Cloud storage (AWS S3, GCP Storage, Azure Blob, etc.)
- Third-party authentication (OAuth, SAML, etc.)
- Real-time collaboration tools (WebSocket-based sync)

---

*Integration audit: 2026-03-26*
