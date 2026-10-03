const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

router.post('/admin/talks', requireAuth, asyncHandler(async (req, res) => {
  const talk = req.body || {};
  if (!talk.date || !talk.event || !talk.topic) {
    return res.status(400).json({ error: 'Date, event, and talk title are required.' });
  }

  const [[{ maxOrder }]] = await pool.query('SELECT COALESCE(MAX(sort_order), -1) + 1 AS maxOrder FROM talks');
  const id = `talk-${Date.now()}`;
  await pool.query(
    'INSERT INTO talks (id, sort_order, date, event, topic, description, image) VALUES (:id, :sortOrder, :date, :event, :topic, :description, :image)',
    { id, sortOrder: maxOrder, date: talk.date.trim(), event: talk.event.trim(), topic: talk.topic.trim(), description: String(talk.description || ''), image: String(talk.image || '').slice(0, 500) }
  );
  const [rows] = await pool.query('SELECT id, date, event, topic, description, image FROM talks WHERE id = :id', { id });
  res.status(201).json(rows[0]);
}));

router.put('/admin/talks/:id', requireAuth, asyncHandler(async (req, res) => {
  const talk = req.body || {};
  if (!talk.date || !talk.event || !talk.topic) {
    return res.status(400).json({ error: 'Date, event, and talk title are required.' });
  }

  await pool.query(
    'UPDATE talks SET date=:date, event=:event, topic=:topic, description=:description, image=:image WHERE id=:id',
    { id: req.params.id, date: talk.date.trim(), event: talk.event.trim(), topic: talk.topic.trim(), description: String(talk.description || ''), image: String(talk.image || '').slice(0, 500) }
  );
  const [rows] = await pool.query('SELECT id, date, event, topic, description, image FROM talks WHERE id = :id', { id: req.params.id });
  if (!rows[0]) return res.status(404).json({ error: 'Talk not found.' });
  res.json(rows[0]);
}));

router.delete('/admin/talks/:id', requireAuth, asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM talks WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

module.exports = router;