const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

// Matches the fields the admin panel's Profile Editor actually exposes.
// trustStats/trustBrands aren't editable there, so they're left untouched.
router.put('/admin/profile', requireAuth, asyncHandler(async (req, res) => {
  const p = req.body || {};
  await pool.query(
    `UPDATE profile SET first_name=:firstName, last_name=:lastName, full_name=:fullName,
       tagline=:tagline, role_description=:roleDescription, short_bio=:shortBio,
       about_intro=:aboutIntro, avatar_url=:avatarUrl, cta_discovery_url=:ctaDiscoveryUrl
     WHERE id = 1`,
    {
      firstName: p.firstName || '',
      lastName: p.lastName || '',
      fullName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim(),
      tagline: p.tagline || '',
      roleDescription: p.roleDescription || '',
      shortBio: p.shortBio || '',
      aboutIntro: p.aboutIntro || '',
      avatarUrl: p.avatarUrl || '',
      ctaDiscoveryUrl: p.ctaDiscoveryUrl || '',
    }
  );
  res.json({ ok: true });
}));

module.exports = router;
