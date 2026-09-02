# Scaffold — website builder SaaS frontend

Next.js 16.3.3 (App Router, Turbopack) + React 19.2 + TypeScript + Tailwind CSS v4.

This is the frontend only. It consumes the NestJS/Drizzle/Neon backend described in the three
module docs (Auth, Templates, Sites) — nothing here mocks or replaces that API.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your backend
npm run dev
```

Requires the backend running at `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).

## Read this first

**`ASSUMPTIONS.md`** — two endpoints the frontend calls that aren't in the provided backend docs
(publish/unpublish, public site-by-slug lookup). Read it before wiring up the real backend.

## Architecture notes

- **`lib/api/client.ts`** is the single fetch layer. It injects the in-memory access token,
  transparently refreshes and retries on `401`, and de-dupes concurrent refresh calls. Nothing else
  in the app touches `fetch` directly for backend calls.
- **`lib/auth/auth-store.ts`** holds the access token and user in memory only (never
  `localStorage`), per the backend's own security guidance. A non-httpOnly hint cookie
  (`scaffold_session`) exists purely so `middleware.ts` can pre-redirect obviously-signed-out
  requests — it carries no auth power itself; the real check is always the refresh cookie.
- **`components/site-renderer/`** is the one renderer used everywhere a template or site gets
  drawn: the template gallery thumbnails, the template detail preview, the editor's live preview,
  the authenticated `/preview/[siteId]` route, and the public `/platform-site/[slug]` route. A
  template is data; `SiteRenderer` + the 13 section components are the only rendering system.
  Theme values flow in as CSS custom properties, so the same components render entirely different
  visual styles per template/site.
- **`lib/editor/editor-store.ts`** holds the *local* draft of a site's `TemplateContent`. The
  preview reads straight from this store, so edits show up instantly; saving to the backend is a
  separate, debounced (900ms) side effect in `app/sites/[siteId]/editor/page.tsx` — see PRD
  sections 16–17.
- **`middleware.ts`** does two unrelated jobs: (1) rewrites platform-subdomain requests
  (`{slug}.scaffold.app` in prod, `{slug}.localhost:3000` in dev) to `/platform-site/[slug]`, and
  (2) fast-redirects protected routes to `/login` when there's no session hint cookie, purely to
  avoid a flash of protected UI — the actual authorization check is always client-side.
- Cursor pagination (templates and sites) is implemented as "Load more", appending pages to local
  state and tracking `nextCursor`/`hasNextPage` from each response — no offset pagination anywhere.

## Structure

```
app/
  page.tsx                      landing
  login/, register/             auth
  dashboard/                    protected shell: overview, sites, templates, settings
  templates/, templates/[id]/   public gallery + detail/preview
  sites/new/                    site creation flow (name + slug from a template)
  sites/[siteId]/editor/        the visual builder
  preview/[siteId]/             authenticated "view as published" route
  platform-site/[slug]/         public renderer (subdomain rewrite target)

components/
  ui/                shadcn-style primitives (Radix + CVA, hand-built — no external registry)
  site-renderer/      SiteRenderer, SectionRenderer, 13 section components, theme->CSS vars
  editor/             top bar, sidebar (dnd-kit sortable), section forms (one per type), theme/settings tabs
  sites/, templates/, dashboard/, layout/

lib/
  api/                client.ts + auth.ts/templates.ts/sites.ts endpoint bindings
  auth/               zustand session store + provider + route guard
  editor/             zustand editor-draft store
  types.ts            mirrors the backend's Zod schemas exactly
  section-defaults.ts default content + metadata per section type
```

## Known limitations / next steps

- No test suite yet.
- Image fields take raw URLs; there's no upload flow (backend doc doesn't define one).
- The public site renderer route has no ISR/caching strategy configured — add one once traffic
  patterns for published sites are known.
