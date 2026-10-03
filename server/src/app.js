const path = require('path');
const express = require('express');
const cors = require('cors');
const { router: uploadRoutes, uploadDirectory } = require('./routes/uploads');

const authRoutes = require('./routes/auth');
const siteRoutes = require('./routes/site');
const leadsRoutes = require('./routes/leads');
const blogsRoutes = require('./routes/blogs');
const projectsRoutes = require('./routes/projects');
const profileRoutes = require('./routes/profile');
const settingsRoutes = require('./routes/settings');
const talksRoutes = require('./routes/talks');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
}));
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static(uploadDirectory, { fallthrough: false }));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api', siteRoutes);
app.use('/api', leadsRoutes);
app.use('/api', blogsRoutes);
app.use('/api', projectsRoutes);
app.use('/api', profileRoutes);
app.use('/api', settingsRoutes);
app.use('/api', talksRoutes);
app.use('/api', uploadRoutes);

// Unmatched API routes get a JSON 404 instead of falling through to the SPA.
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// Serve the built frontend (server/dist/, copied in at deploy time — see
// `npm run build:server` at the repo root) and fall back to index.html so
// the hash-routed SPA works on a fresh load of any URL.
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
