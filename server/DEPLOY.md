# Deploying to Hostinger (VPS / Cloud with Node.js)

This assumes a Hostinger VPS or Cloud plan with SSH access, where you can run
a persistent Node.js process and install MySQL (or use Hostinger's managed
MySQL database feature — either works, you just need the host/user/password).

## 1. MySQL database

Via hPanel's "Databases" section (or `mysql` CLI if you installed MySQL
yourself on the VPS), create a database and a user with full privileges on it.
Note the database name, username, password, and host (usually `localhost` if
MySQL runs on the same VPS).

Then load the schema:

```bash
mysql -u <db_user> -p <db_name> < server/src/schema.sql
```

## 2. Upload the code

Push this repo to the VPS however you prefer (git clone, `scp`, Hostinger's
Git deploy feature). You need both `server/` and the frontend (`src/`,
`index.html`, `public/`, etc.) present.

## 3. Backend setup

```bash
cd server
npm install --omit=dev
cp .env.example .env
```

Edit `server/.env`:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — from step 1.
- `JWT_SECRET` — generate one: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `INITIAL_ADMIN_USERNAME` / `INITIAL_ADMIN_PASSWORD` — used once by the seed script below. **Change this password via the admin panel after your first login.**
- `CORS_ORIGIN` — your site's URL (e.g. `https://navyrixlabs.com`). Only needed if the frontend and API ever end up on different origins; with the Nginx setup below (same origin, `/api` proxied) you can leave this blank.
- `PORT` — the port the Node process listens on internally (default 4000). Nginx will proxy to this; it doesn't need to be exposed publicly.

Seed the database (creates the admin login and populates all content tables):

```bash
npm run seed
```

Start the API with PM2 (keeps it running, restarts on crash/reboot):

```bash
npm install -g pm2   # if not already installed
pm2 start src/index.js --name dipen-bhai-api
pm2 save
pm2 startup          # follow the printed instructions to enable on-boot start
```

## 4. Build the frontend

From the repo root (not `server/`):

```bash
npm install
npm run build
```

This produces `dist/` — a static site. Copy/upload `dist/` to wherever Nginx
will serve it from, e.g. `/var/www/dipen-bhai/`.

## 5. Nginx

Point Nginx at the built frontend, and reverse-proxy `/api` to the Node
process:

```nginx
server {
    listen 80;
    server_name navyrixlabs.com www.navyrixlabs.com;

    root /var/www/dipen-bhai;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

Reload Nginx (`nginx -s reload` or via hPanel), then set up SSL (Hostinger's
hPanel has a free Let's Encrypt option — use it; the admin login sends a
password over the network and must be served over HTTPS).

## 6. Verify

- `https://yourdomain.com/api/health` → `{"ok":true}`
- The homepage loads and shows live content.
- `https://yourdomain.com/#/admin` → log in with the username/password from
  `INITIAL_ADMIN_*`, then **change the password immediately** via
  System Settings → Change Admin Password.

## Updating content later

- Day-to-day content edits (projects, blog posts, profile bio, SEO, enquiries)
  → use the admin panel, no redeploy needed.
- Structural content that has no admin UI (expertise cards, credentials,
  ecosystem copy, skills list, certifications, process steps) → edit the
  relevant table directly in MySQL, or re-run a modified `seed.js` for those
  sections specifically. These were intentionally left database-backed but
  without CRUD UI, since the admin panel never had editing screens for them
  either.
- Code changes (new features, design changes) → redeploy: `npm run build` the
  frontend and re-upload `dist/`; for backend changes, `pm2 restart dipen-bhai-api`.
