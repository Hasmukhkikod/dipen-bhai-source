const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'Password is required' });

  const [rows] = await pool.query(
    'SELECT * FROM admin_users WHERE username = :username LIMIT 1',
    { username: username || process.env.INITIAL_ADMIN_USERNAME || 'admin' }
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
}));

router.post('/change-password', requireAuth, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  const [rows] = await pool.query('SELECT * FROM admin_users WHERE id = :id', { id: req.admin.sub });
  const user = rows[0];
  if (!user) return res.status(404).json({ error: 'User not found' });

  const ok = await bcrypt.compare(currentPassword || '', user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Current password is incorrect' });

  const hash = await bcrypt.hash(newPassword, 12);
  await pool.query('UPDATE admin_users SET password_hash = :hash WHERE id = :id', { hash, id: user.id });
  res.json({ ok: true });
}));

module.exports = router;
