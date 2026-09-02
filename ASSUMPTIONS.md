# Assumptions about the backend contract

The three module docs provided (Auth, Templates, Sites) are complete for everything except two
things the product spec explicitly requires. This file exists so the backend team has a single
place to see exactly what the frontend expects — search the codebase for "ASSUMPTIONS.md" to find
every call site.

## 1. Publish / unpublish

`UpdateSiteDTO` (`PATCH /sites/:id`) only accepts `name`, `slug`, and `content` — there's no
`status` field, even though the `sites` table clearly has one (`status: enum('draft','published')`,
plus `publishedAt`). The product spec requires publish/unpublish as first-class actions.

**Frontend currently calls:**

```
PATCH /sites/:id/publish    -> Site   (sets status: 'published', publishedAt: now)
PATCH /sites/:id/unpublish  -> Site   (sets status: 'draft', publishedAt: null)
```

All call sites live in `lib/api/sites.ts` (`sitesApi.publish` / `sitesApi.unpublish`). If the
backend instead adds `status` to `UpdateSiteDTO`, swap these two functions for a single
`sitesApi.update(id, { status })` call — everything downstream (dashboard, sites table, editor top
bar) already treats `Site.status` as the source of truth, so no other file needs to change.

## 2. Public, unauthenticated site lookup by slug

Every documented `GET /sites/*` route requires a JWT and returns the caller's own sites. But
published sites need to be servable to anonymous visitors at a platform subdomain
(`{slug}.scaffold.app`), which is core to the product spec ("Access their published website through
a platform subdomain").

**Frontend currently calls:**

```
GET /public/sites/:slug   (no Authorization header)
```

Expected behavior: returns the `Site` if `status === 'published'`, `404` otherwise (including for
existing-but-draft sites, so drafts are never guessable/leakable at their slug).

This is used in exactly one place: `app/platform-site/[slug]/page.tsx`, which `middleware.ts` rewrites
platform-subdomain requests to. If the real endpoint ends up with a different path, update
`sitesApi.getPublicBySlug` in `lib/api/sites.ts` only.

## Also worth flagging

- `Template` doesn't have a `description` field in the documented schema, but the product spec's
  template gallery ("Show: ... Description") implies one. The frontend type marks it optional
  (`Template.description?`) and the gallery/detail UI renders it only if present — nothing breaks
  if it's never added, and nothing needs to change if it is.
