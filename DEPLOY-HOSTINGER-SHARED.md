# Deploying to Hostinger Business Web Hosting (hPanel, no SSH)

This is the guide for your actual plan (Hostinger **Business Web Hosting**,
shared, hPanel-managed, no terminal/SSH). `server/DEPLOY.md` describes a VPS
setup with PM2 + Nginx — skip that one, it doesn't apply here.

## Why the site was blank

You uploaded the raw source repo (`src/`, `node_modules/`, `server/`, the
dev `index.html`) straight into `public_html`. The root `index.html` there
loads `<script src="/src/main.jsx">`, which only works through Vite's dev
server (it compiles JSX on the fly). Apache/hPanel just serves static
files — it can't execute a `.jsx` file — so the page loaded nothing. You
need the **built** output (`dist/`), not the source tree.

## The plan

Hostinger's Business plan supports hPanel's **Node.js App** feature
(Passenger-based), so instead of a separate Apache static site + a
proxied API, we run **one Node app that serves everything**: the built
frontend *and* the `/api/*` routes, same origin, no CORS, no subdomain.
I already wired this up in `server/src/app.js` — it now serves
`server/dist/` as static files and falls back to `index.html` for the
SPA, in addition to the existing `/api` routes.

## 1. Build and package

From the repo root, on your machine:

```bash
npm install
npm run build:server
```

This runs `vite build` and copies the output into `server/dist/`. After
this, `server/` is a **self-contained deployable folder** — code, deps
manifest, and the built frontend together. That's the folder you upload,
nothing else.

## 2. Create the MySQL database (hPanel, no SSH needed)

hPanel → **Databases → MySQL Databases**:
- Create a database and a user, grant the user full privileges on it.
- Note the database name, username, password. Host is `localhost`.

Then hPanel → **Databases → phpMyAdmin** → select your new database →
**Import** tab → upload `server/dump.sql` (not `server/src/schema.sql`).
`dump.sql` is a pre-generated file with the schema **and** all seed data
**and** the admin login already baked in (bcrypt-hashed password from
whatever was in `INITIAL_ADMIN_PASSWORD` in `server/.env` when it was
generated) — importing it does the job of both step 2 and step 6 below in
one shot, so you can skip step 6 entirely.

If you ever need to regenerate it (e.g. after changing `server/.env`),
run `npm run dump` from inside `server/` and re-upload the new
`server/dump.sql`.

When updating an existing database (instead of importing the updated dump into
a fresh database), add the Talks table. Keep it separate from `speaking`, which
powers the portfolio's Lectures & Certs section:

```sql
CREATE TABLE IF NOT EXISTS talks (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  date VARCHAR(50),
  event VARCHAR(255),
  topic VARCHAR(255),
  description TEXT,
  image VARCHAR(500)
);
```

If the existing `speaking` table does not already have an `image` column, run
this separately once:

```sql
ALTER TABLE speaking ADD COLUMN image VARCHAR(500) NULL;
```

If a previous Talks version already created the `talks` table without a
`description` column, add that column once as well:

```sql
ALTER TABLE talks ADD COLUMN description TEXT NULL;
```

## 3. Upload the `server/` folder

Use hPanel's **File Manager** or an FTP client, upload the entire
`server/` folder (which now includes `server/dist/`) somewhere **outside**
`public_html` — e.g. as a sibling folder like `navyrix-app/` in your
account's home directory. Do **not** put it inside `public_html`; the
Node.js App feature manages its own web-facing routing.

Skip uploading `server/node_modules/` (if present) — you'll install
dependencies through hPanel instead, which builds the right binaries for
their server.

Uploaded partner logos and project covers are stored in `server/uploads/`.
Keep this directory writable and preserve it when replacing the application
files; it is intentionally excluded from Git and is not part of `server/dist/`.

## 4. Create the Node.js App in hPanel

hPanel → **Advanced → Node.js** → **Create Application**:
- **Node.js version**: pick the newest available (18+).
- **Application mode**: Production.
- **Application root**: the folder you uploaded to in step 3 (e.g.
  `navyrix-app`).
- **Application URL**: `navyrix.com` (map it to the root domain, not a
  subfolder).
- **Application startup file**: `src/index.js`.

Save/create it. hPanel will show an **npm install** button for this
app — click it (this runs inside `server/`, matching `server/package.json`,
and installs `express`, `mysql2`, `bcryptjs`, `jsonwebtoken`, `cors`,
`dotenv`, `multer`, and `nodemailer`).

## 5. Environment variables

Still in the Node.js App screen, there's an **Environment Variables**
section. Add these (values from step 2 and your own secret):

| Key | Value |
|---|---|
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_USER` | *(from step 2)* |
| `DB_PASSWORD` | *(from step 2)* |
| `DB_NAME` | *(from step 2)* |
| `JWT_SECRET` | **required** — a long random string, e.g. generate locally with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |

`INITIAL_ADMIN_USERNAME` / `INITIAL_ADMIN_PASSWORD` aren't needed as env
vars — they're only read by the one-time seed/dump scripts, not by the
running app. Since `dump.sql` already created the admin login (`admin` /
`dipen123` per your local `server/.env`), you're already set — just log
in and change that password.

Leave `CORS_ORIGIN` and `PORT` unset — Passenger assigns `PORT` itself and
the app already reads it; CORS isn't needed since frontend and API are
now same-origin.

For contact-form notification emails, add these SMTP values in hPanel. Enter
the mailbox password directly in hPanel; never commit it or send it in chat:

| Key | Value |
|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `info@navyrix.com` |
| `SMTP_PASS` | *(the mailbox password, entered privately in hPanel)* |
| `SMTP_FROM` | `Navyrix Labs <info@navyrix.com>` |
| `LEAD_NOTIFICATION_TO` | `info@navyrix.com` |

Without these SMTP settings, contact enquiries still save to the Admin Leads
inbox but no email notification is sent.

Restart the app from hPanel after saving env vars.

## 6. Verify

- `https://navyrix.com/api/health` → `{"ok":true}`
- `https://navyrix.com/` → homepage loads with live content.
- `https://navyrix.com/#/admin` → log in using the seeded Admin account, then
  **immediately** change its password via System Settings → Change Admin
  Password. Do not keep a seed password on a public deployment.
- Make sure HTTPS is on (hPanel → SSL, free Let's Encrypt) — the admin
  login sends a password over the network.

## 7. Clean up `public_html`

Delete everything you previously uploaded there (`dipen-bhai-source/`,
`dist/`, `node_modules/`, `server/`, `src/`, the dev `index.html`, etc.).
It's unused now — the Node.js App handles the whole domain — and leaving
the source tree (with `node_modules`, `.env`, etc.) publicly reachable
under `public_html` is a real exposure risk if anything in there ever got
served directly.

## Updating later

- Content edits (projects, blog, bio, SEO) → admin panel, no redeploy.
- Code changes → locally: `npm run build:server`, then re-upload
  `server/` (or just the changed files) and restart the app from hPanel.
