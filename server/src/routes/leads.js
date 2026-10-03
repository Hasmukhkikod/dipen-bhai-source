const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

function createMailTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

// Public: the site's contact form submits here.
router.post('/leads', asyncHandler(async (req, res) => {
  const { name, email, company, industry, description, budget, timeline } = req.body || {};
  if (!name || !email || !description) {
    return res.status(400).json({ error: 'name, email, and description are required' });
  }
  const id = `lead-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  await pool.query(
    `INSERT INTO leads (id, name, email, company, industry, description, budget, timeline)
     VALUES (:id, :name, :email, :company, :industry, :description, :budget, :timeline)`,
    { id, name, email, company: company || null, industry: industry || null, description, budget: budget || null, timeline: timeline || null }
  );

  const mailTransport = createMailTransport();
  if (mailTransport) {
    try {
      await mailTransport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.LEAD_NOTIFICATION_TO || 'info@navyrix.com',
        replyTo: email,
        subject: `New website enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || 'Not provided'}`,
          `Industry: ${industry || 'Not provided'}`,
          `Budget: ${budget || 'Not provided'}`,
          `Timeline: ${timeline || 'Not provided'}`,
          '',
          'Project details:',
          description,
        ].join('\n'),
      });
    } catch (error) {
      console.error('Lead saved, but notification email failed:', error.message || error);
    }
  }
  res.status(201).json({ id });
}));

// Admin: view and manage enquiries.
router.get('/admin/leads', requireAuth, asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
  res.json(rows.map((r) => ({
    id: r.id, name: r.name, email: r.email, company: r.company, industry: r.industry,
    description: r.description, budget: r.budget, timeline: r.timeline, date: r.created_at,
  })));
}));

router.delete('/admin/leads/:id', requireAuth, asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM leads WHERE id = :id', { id: req.params.id });
  res.json({ ok: true });
}));

module.exports = router;
