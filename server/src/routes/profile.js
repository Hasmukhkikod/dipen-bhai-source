const express = require('express');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../asyncHandler');

const router = express.Router();

router.put('/admin/profile', requireAuth, asyncHandler(async (req, res) => {
  const p = req.body || {};
  const trustBrands = Array.isArray(p.trustBrands)
    ? p.trustBrands.slice(0, 50).map((brand) => {
      if (typeof brand === 'string') return brand.slice(0, 120);
      return {
        id: String(brand.id || '').slice(0, 80),
        name: String(brand.name || '').trim().slice(0, 120),
        logoUrl: String(brand.logoUrl || '').slice(0, 500),
      };
    }).filter((brand) => typeof brand === 'string' || brand.name)
    : null;
  await pool.query(
    `UPDATE profile SET first_name=:firstName, last_name=:lastName, full_name=:fullName,
       tagline=:tagline, role_description=:roleDescription, short_bio=:shortBio,
       about_intro=:aboutIntro, avatar_url=:avatarUrl, cta_discovery_url=:ctaDiscoveryUrl,
       trust_brands=COALESCE(:trustBrands, trust_brands)
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
      trustBrands: trustBrands ? JSON.stringify(trustBrands) : null,
    }
  );
  res.json({ ok: true });
}));

module.exports = router;
