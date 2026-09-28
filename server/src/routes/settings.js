const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

// Note: the admin login password is no longer part of "settings" — it lives
// in admin_users and is changed via POST /api/auth/change-password.
router.put('/admin/settings', requireAuth, asyncHandler(async (req, res) => {
  const s = req.body || {};
  await pool.query(
    `UPDATE settings SET seo_title=:seoTitle, seo_description=:seoDescription, seo_keywords=:seoKeywords,
       contact_email=:contactEmail, contact_phone=:contactPhone, contact_linkedin=:contactLinkedin,
       contact_location=:contactLocation
     WHERE id = 1`,
    {
      seoTitle: s.seoTitle || '',
      seoDescription: s.seoDescription || '',
      seoKeywords: s.seoKeywords || '',
      contactEmail: s.contactEmail || '',
      contactPhone: s.contactPhone || '',
      contactLinkedin: s.contactLinkedin || '',
      contactLocation: s.contactLocation || '',
    }
  );
  res.json({ ok: true });
}));

// Resets only profile + settings back to the last-seeded defaults (does not
// touch real data: leads, blog posts, or projects added since).
const DEFAULT_PROFILE = {
  firstName: 'NAVYRIX', lastName: 'LABS', fullName: 'NAVYRIX LABS',
  tagline: 'Engineering Ideas Into Products That Ship.',
  roleDescription: 'Product Engineering Services (Electronics & Defense, Agritech, Biotech) | IoT & Connected Systems | Agile Product Architecture | Startup Mentor & Consulting Services | Expert Talks',
  shortBio: 'NAVYRIX is a product engineering practice led by Dipen Parmar, built on 17+ years across electronics, defense, agritech, and biotech. We take connected hardware ideas from first sketch to certified, mass-produced product — and mentor the founders building the next generation of hardware startups.',
  aboutHeadline: 'Two decades of engineering discipline. One partner for product execution.',
  aboutIntro: 'At Navyrix Labs, we combine 17+ years of embedded systems expertise with startup product delivery, agritech innovation, and technology mentorship. Led by Chief Architect Dipen Parmar, our specialized engineering group helps organizations design, validate, and scale connected hardware systems.',
  avatarUrl: '/dipen_headshot.png', cvUrl: '#', ctaDiscoveryUrl: 'https://calendly.com/dipen-parmar/30min',
};
const DEFAULT_SETTINGS = {
  seoTitle: 'Navyrix Labs | Embedded Systems, IoT & Product Engineering Services',
  seoDescription: 'Navyrix Labs delivers embedded systems, IoT architecture, and end-to-end product engineering — from firmware and connected hardware to certification and mass production — across electronics, defense, agritech, and biotech.',
  seoKeywords: 'embedded systems, IoT architecture, product engineering services, firmware development, connected hardware design, agritech IoT, defense electronics, startup mentorship, hardware prototyping, mass manufacturing support',
  contactEmail: 'dipenparmar@icloud.com', contactPhone: '+91 99987 44676',
  contactLinkedin: 'linkedin.com/in/dipenparmar', contactLocation: 'Gujarat, India',
};

router.post('/admin/reset', requireAuth, asyncHandler(async (req, res) => {
  await pool.query(
    `UPDATE profile SET first_name=:firstName, last_name=:lastName, full_name=:fullName, tagline=:tagline,
       role_description=:roleDescription, short_bio=:shortBio, about_headline=:aboutHeadline, about_intro=:aboutIntro,
       avatar_url=:avatarUrl, cv_url=:cvUrl, cta_discovery_url=:ctaDiscoveryUrl
     WHERE id = 1`,
    DEFAULT_PROFILE
  );
  await pool.query(
    `UPDATE settings SET seo_title=:seoTitle, seo_description=:seoDescription, seo_keywords=:seoKeywords,
       contact_email=:contactEmail, contact_phone=:contactPhone, contact_linkedin=:contactLinkedin, contact_location=:contactLocation
     WHERE id = 1`,
    DEFAULT_SETTINGS
  );
  res.json({ ok: true });
}));

module.exports = router;
