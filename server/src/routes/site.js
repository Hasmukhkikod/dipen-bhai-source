const express = require('express');
const pool = require('../db');
const { loadContent } = require('../content');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

// Public: DB-backed content (published blogs only).
router.get('/site', asyncHandler(async (req, res) => {
  const data = await loadContent();
  res.json(data);
}));

// Admin: same bundle plus unpublished/draft blogs and leads, for the admin panel.
router.get('/admin/site', requireAuth, asyncHandler(async (req, res) => {
  let data;
  let leadRows = [];

  try {
    const result = await Promise.all([
      loadContent({ includeUnpublishedBlogs: true }),
      pool.query('SELECT * FROM leads ORDER BY created_at DESC'),
    ]);
    data = result[0];
    leadRows = result[1]?.[0] || [];
  } catch (error) {
    console.warn('Database unavailable for admin payload; returning fallback content.', error.message || error);
    data = await loadContent({ includeUnpublishedBlogs: true });
  }

  data.leads = leadRows.map((r) => ({
    id: r.id, name: r.name, email: r.email, company: r.company, industry: r.industry,
    description: r.description, budget: r.budget, timeline: r.timeline, date: r.created_at,
  }));
  res.json(data);
}));

module.exports = router;
