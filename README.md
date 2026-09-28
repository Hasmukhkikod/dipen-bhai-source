# Navyrix Labs / Dipen Parmar Portfolio — Recovered Source

This source tree was reconstructed from the production build in
`../dipen-bhai/` (a minified, bundled Vite output with no sourcemaps and
no earlier git history). The original source was lost; this is not a
byte-for-byte recovery of the original files — that's not possible from a
minified bundle — but a working, editable React + Vite project that
reproduces the site's structure, content, and behavior, verified by
building it and rendering it in a real browser.

## How this was rebuilt

The minified bundle (`assets/index-*.js`) was parsed as an AST and
mechanically converted back into real JSX (the `jsx()`/`jsxs()` runtime
calls were pattern-matched and rewritten as `<Tag prop={x}>` syntax), then:

- Vendor code (React, ReactDOM, the jsx-runtime shim, scheduler) was
  identified and stripped via dependency-reachability analysis from the
  app's root component, and replaced with normal `react`/`react-dom` imports.
- The 49 bundled Lucide icon re-implementations were matched back to their
  real `lucide-react` exports and replaced with a normal import.
- Top-level component bindings were renamed from minifier-mangled names
  (`at`, `ot`, `bt`, ...) to their semantic names (`About`, `Expertise`,
  `AdminPanel`, ...) based on the DOM ids, data keys, and routes each one
  used.
- The single file was split into the module structure under `src/`.

Local variable names *inside* each component (loop/prop destructuring
like `e`, `t`, `n`) were not recoverable and were left as-is — renaming
those would require guessing intent, which risks being wrong. Everything
at the module/component level is real and traceable back to the bundle.

## What's here

A React SPA (portfolio + blog + admin CMS, client-rendered, hash-routed)
backed by a small Node/Express + MySQL API in `server/`:

- `src/pages/MainSite.jsx` — the public homepage (Header, Hero, TrustBar,
  and all sections in `src/sections/`, Footer).
- `src/pages/BlogPage.jsx` — `#/blog` — a simple blog list/detail view.
- `src/pages/AdminPanel.jsx` — `#/admin` — a real, server-authenticated
  content editor (profile bio, projects, blog posts, contact enquiries, SEO
  & contact settings).
- `src/context/ContentContext.jsx` — fetches all site content from the API
  (`GET /api/site`) and calls the API for every admin edit. No more
  `localStorage` persistence or client-side password checks.
- `server/` — the API. See `server/DEPLOY.md` for a full Hostinger
  deployment walkthrough, and `server/src/schema.sql` / `server/src/seed.js`
  for the database shape and initial content.
- `src/data/defaultContent.js` — **no longer used at runtime.** Kept only
  as a historical reference for the content shape (it's what `seed.js` was
  transcribed from).

### What's admin-editable vs. static

Only what the admin panel actually had editing screens for moved to
CRUD-backed tables: profile bio fields, projects, blog posts, contact
enquiries, and SEO/contact settings. Content that was always
developer-maintained (expertise cards, ecosystem copy, ventures, skills,
certifications, process steps, credentials) still lives in MySQL — so
there's one source of truth and no more stale-cache confusion — but is only
editable by writing to those tables directly (or re-running a modified
seed), matching how it always worked.

## Before you deploy this anywhere

The admin login now goes through real server-side auth (bcrypt-hashed
password, JWT session) instead of a password sitting in the shipped JS
bundle. The one thing to do on first deploy: **change the seeded admin
password** (`server/.env`'s `INITIAL_ADMIN_PASSWORD`, default `dipen123`)
via the admin panel's "Change Admin Password" form right after your first
login — see `server/DEPLOY.md`.

## Running it locally

You need two things running: the API (with a MySQL database) and the
frontend dev server.

```bash
# 1. Database + API (one-time setup, then `npm run dev` each time)
mysql -u root -p your_db_name < server/src/schema.sql   # or via a GUI
cd server
npm install
cp .env.example .env        # fill in DB credentials + JWT_SECRET
npm run seed                # creates the admin login + initial content
npm run dev                 # API on http://localhost:4000

# 2. Frontend, in a second terminal, from the repo root
npm install
npm run dev                 # http://localhost:5173, proxies /api to :4000
```

`npm run build` / `npm run preview` work as before for the frontend; the
API is deployed separately (see `server/DEPLOY.md`).

## Relationship to `../dipen-bhai/`

`../dipen-bhai/` is the git repo currently deployed (it only ever
contained the built `dist` output, pushed as source — that's why the
original source was unrecoverable from its git history). Once you're
happy with this project, you can either:

- Point that repo's deploy step at `npm run build` here and commit the new
  `dist/` output there, or
- Replace `../dipen-bhai/` with this project entirely and set up CI
  (GitHub Actions, Vercel, Netlify, etc.) to build on push instead of
  committing built output to the repo.
