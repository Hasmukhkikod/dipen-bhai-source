const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

function slugify(title) {
  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/admin/blogs', requireAuth, asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM blogs ORDER BY sort_order DESC, created_at DESC');
  res.json(rows.map(toApiBlog));
}));

router.post('/admin/blogs', requireAuth, asyncHandler(async (req, res) => {
  const b = req.body || {};
  if (!b.title) return res.status(400).json({ error: 'title is required' });
  const id = `blog-${Date.now()}`;
  const [[{ maxOrder }]] = await pool.query('SELECT COALESCE(MAX(sort_order), -1) + 1 AS maxOrder FROM blogs');
  await pool.query(
    `INSERT INTO blogs (id, title, slug, excerpt, content, image, category, read_time, published_date, published, sort_order)
     VALUES (:id, :title, :slug, :excerpt, :content, :image, :category, :readTime, :publishedDate, :published, :sortOrder)`,
    {
      id,
      title: b.title,
      slug: slugify(b.title),
      excerpt: b.excerpt || '',
      content: b.content || '',
      image: b.image || '',
      category: b.category || '',
      readTime: b.readTime || '',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      published: true,
      sortOrder: maxOrder,
    }
  );
  const [rows] = await pool.query('SELECT * FROM blogs WHERE id = :id', { id });
  res.status(201).json(toApiBlog(rows[0]));
}));

router.put('/admin/blogs/:id', requireAuth, asyncHandler(async (req, res) => {
  const b = req.body || {};
  if (!b.title) return res.status(400).json({ error: 'title is required' });
  await pool.query(
    `UPDATE blogs SET title=:title, slug=:slug, excerpt=:excerpt, content=:content, image=:image,
       category=:category, read_time=:readTime, published=:published
     WHERE id = :id`,
    {
      id: req.params.id,
      title: b.title,
      slug: slugify(b.title),
      excerpt: b.excerpt || '',
      content: b.content || '',
      image: b.image || '',
      category: b.category || '',
      readTime: b.readTime || '',
      published: b.published !== false,
    }
  );
  const [rows] = await pool.query('SELECT * FROM blogs WHERE id = :id', { id: req.params.id });
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(toApiBlog(rows[0]));
}));

router.delete('/admin/blogs/:id', requireAuth, asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM blogs WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

function toApiBlog(row) {
  return {
    id: row.id, title: row.title, slug: row.slug, excerpt: row.excerpt, content: row.content,
    image: row.image, category: row.category, readTime: row.read_time, date: row.published_date,
    published: !!row.published,
  };
}

module.exports = router;
