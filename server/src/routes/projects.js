const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asJson } = require('../content');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

router.post('/admin/projects', requireAuth, asyncHandler(async (req, res) => {
  const p = req.body || {};
  if (!p.title) return res.status(400).json({ error: 'title is required' });
  const [[{ count }]] = await pool.query('SELECT COUNT(*) AS count FROM projects');
  const id = `proj-${Date.now()}`;
  const number = String(count + 1).padStart(2, '0');
  await pool.query(
    `INSERT INTO projects (id, sort_order, number, title, category, image, short_description, challenge, solution, outcome, technologies, role, url)
     VALUES (:id, :sortOrder, :number, :title, :category, :image, :shortDescription, :challenge, :solution, :outcome, :technologies, :role, :url)`,
    {
      id, sortOrder: count, number,
      title: p.title, category: p.category || '', image: p.image || '',
      shortDescription: p.shortDescription || '', challenge: p.challenge || '', solution: p.solution || '', outcome: p.outcome || '',
      technologies: JSON.stringify(p.technologies || []), role: p.role || '', url: p.url || '#',
    }
  );
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = :id', { id });
  res.status(201).json(toApiProject(rows[0]));
}));

router.put('/admin/projects/:id', requireAuth, asyncHandler(async (req, res) => {
  const p = req.body || {};
  if (!p.title) return res.status(400).json({ error: 'title is required' });
  await pool.query(
    `UPDATE projects SET title=:title, category=:category, image=:image, short_description=:shortDescription,
       challenge=:challenge, solution=:solution, outcome=:outcome, technologies=:technologies, role=:role, url=:url
     WHERE id = :id`,
    {
      id: req.params.id,
      title: p.title, category: p.category || '', image: p.image || '',
      shortDescription: p.shortDescription || '', challenge: p.challenge || '', solution: p.solution || '', outcome: p.outcome || '',
      technologies: JSON.stringify(p.technologies || []), role: p.role || '', url: p.url || '#',
    }
  );
  const [rows] = await pool.query('SELECT * FROM projects WHERE id = :id', { id: req.params.id });
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(toApiProject(rows[0]));
}));

router.delete('/admin/projects/:id', requireAuth, asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM projects WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

function toApiProject(row) {
  return {
    id: row.id, number: row.number, title: row.title, category: row.category, image: row.image,
    shortDescription: row.short_description, challenge: row.challenge, solution: row.solution, outcome: row.outcome,
    technologies: asJson(row.technologies, []), role: row.role, url: row.url,
  };
}

module.exports = router;
