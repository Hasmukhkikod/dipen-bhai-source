const path = require('node:path');
const { pathToFileURL } = require('node:url');
const pool = require('./db');

let fallbackContentPromise;

async function getFallbackContent() {
  if (!fallbackContentPromise) {
    const fallbackPath = path.resolve(__dirname, '..', '..', 'src', 'data', 'defaultContent.js');
    fallbackContentPromise = import(pathToFileURL(fallbackPath).href).then((mod) => mod.default || mod).catch(() => ({
      profile: {},
      ventures: [],
      credentials: {},
      expertise: [],
      ecosystem: { headline: '', subheading: '', activities: [] },
      projects: [],
      journey: [],
      speaking: [],
      talks: [],
      global: { headline: '', description: '', countries: [] },
      skills: [],
      certifications: [],
      process: [],
      blogs: [],
      settings: {},
    }));
  }
  return fallbackContentPromise;
}

// MySQL's json type comes back already parsed via mysql2, but guard anyway
// in case a driver/version returns a string.
function asJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  return value;
}

async function loadContent({ includeUnpublishedBlogs = false } = {}) {
  try {
    const [
      [profileRow],
      [settingsRow],
      [ventureRows],
      [expertiseRows],
      [ecosystemRow],
      [ecosystemActivityRows],
      [projectRows],
      [journeyRows],
      [speakingRows],
      [talkRows],
      [globalRow],
      [skillRows],
      [certificationRows],
      [processRows],
      [credentialRows],
      [blogRows],
    ] = await Promise.all([
      pool.query('SELECT * FROM profile WHERE id = 1'),
      pool.query('SELECT * FROM settings WHERE id = 1'),
      pool.query('SELECT * FROM ventures ORDER BY sort_order'),
      pool.query('SELECT * FROM expertise ORDER BY sort_order'),
      pool.query('SELECT * FROM ecosystem WHERE id = 1'),
      pool.query('SELECT * FROM ecosystem_activities ORDER BY sort_order'),
      pool.query('SELECT * FROM projects ORDER BY sort_order'),
      pool.query('SELECT * FROM journey ORDER BY sort_order'),
      pool.query('SELECT * FROM speaking ORDER BY sort_order'),
      pool.query('SELECT * FROM talks ORDER BY sort_order'),
      pool.query('SELECT * FROM global_presence WHERE id = 1'),
      pool.query('SELECT * FROM skills ORDER BY sort_order'),
      pool.query('SELECT * FROM certifications ORDER BY sort_order'),
      pool.query('SELECT * FROM process_steps ORDER BY sort_order'),
      pool.query('SELECT * FROM credentials ORDER BY sort_order'),
      pool.query(
        includeUnpublishedBlogs
          ? 'SELECT * FROM blogs ORDER BY sort_order DESC, created_at DESC'
          : 'SELECT * FROM blogs WHERE published = 1 ORDER BY sort_order DESC, created_at DESC'
      ),
    ]);

    const p = profileRow[0] || {};
    const s = settingsRow[0] || {};
    const eco = ecosystemRow[0] || {};
    const glob = globalRow[0] || {};

    const credentialsByCategory = {
      technicalProjects: [],
      mentorProjects: [],
      jurySlots: [],
      lectures: [],
      patents: [],
      copyrights: [],
      memberships: [],
    };
    const categoryKeyMap = {
      technical_project: 'technicalProjects',
      mentor_project: 'mentorProjects',
      jury_slot: 'jurySlots',
      lecture: 'lectures',
      patent: 'patents',
      copyright: 'copyrights',
      membership: 'memberships',
    };
    for (const row of credentialRows) {
      const key = categoryKeyMap[row.category];
      if (key) credentialsByCategory[key].push(row.content);
    }

    return {
      profile: {
        firstName: p.first_name,
        lastName: p.last_name,
        fullName: p.full_name,
        tagline: p.tagline,
        roleDescription: p.role_description,
        shortBio: p.short_bio,
        aboutHeadline: p.about_headline,
        aboutIntro: p.about_intro,
        avatarUrl: p.avatar_url,
        cvUrl: p.cv_url,
        ctaDiscoveryUrl: p.cta_discovery_url,
        trustStats: asJson(p.trust_stats, []),
        trustBrands: asJson(p.trust_brands, []),
      },
      ventures: ventureRows.map((v) => ({ id: v.id, name: v.name, desc: v.description, status: v.status, website: v.website })),
      credentials: credentialsByCategory,
      expertise: expertiseRows.map((x) => ({ id: x.id, number: x.number, title: x.title, description: x.description, skills: asJson(x.skills, []) })),
      ecosystem: {
        headline: eco.headline,
        subheading: eco.subheading,
        activities: ecosystemActivityRows.map((a) => ({ id: a.id, title: a.title, detail: a.detail })),
      },
      projects: projectRows.map((row) => ({
        id: row.id, number: row.number, title: row.title, category: row.category, image: row.image,
        shortDescription: row.short_description, challenge: row.challenge, solution: row.solution, outcome: row.outcome,
        technologies: asJson(row.technologies, []), role: row.role, url: row.url,
      })),
      journey: journeyRows.map((row) => ({ id: row.id, year: row.year, company: row.company, role: row.role, description: row.description })),
      speaking: speakingRows.map((row) => ({ id: row.id, date: row.date, event: row.event, topic: row.topic, image: row.image || '' })),
      talks: talkRows.map((row) => ({ id: row.id, date: row.date, event: row.event, topic: row.topic, description: row.description || '', image: row.image || '' })),
      global: {
        headline: glob.headline,
        description: glob.description,
        countries: asJson(glob.countries, []),
      },
      skills: skillRows.map((row) => row.skill),
      certifications: certificationRows.map((row) => ({ id: row.id, title: row.title })),
      process: processRows.map((row) => ({ step: row.step, name: row.name, desc: row.description })),
      blogs: blogRows.map((row) => ({
        id: row.id, title: row.title, slug: row.slug, excerpt: row.excerpt, content: row.content, image: row.image,
        category: row.category, readTime: row.read_time, date: row.published_date, published: !!row.published,
      })),
      settings: {
        seoTitle: s.seo_title,
        seoDescription: s.seo_description,
        seoKeywords: s.seo_keywords,
        contactEmail: s.contact_email,
        contactPhone: s.contact_phone,
        contactLinkedin: s.contact_linkedin,
        contactLocation: s.contact_location,
      },
    };
  } catch (error) {
    console.warn('MySQL unavailable; serving fallback content.', error.message || error);
    return JSON.parse(JSON.stringify(await getFallbackContent()));
  }
}

module.exports = { loadContent, asJson };
