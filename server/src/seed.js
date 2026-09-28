// One-time (or re-run-safe) seed: creates the admin login and populates every
// content table with the site's current content. Safe to re-run — it upserts
// singleton rows and replaces list tables wholesale.
//
// Usage: npm run seed   (reads server/.env, connects directly to DB_HOST)
// If you can't reach the DB directly (e.g. remote MySQL not enabled on your
// host), use `npm run dump` instead and import the resulting dump.sql via
// phpMyAdmin.

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./db');
const {
  profile, settings, ventures, expertise, ecosystem, ecosystemActivities,
  projects, speaking, globalPresence, skills, certifications,
  processSteps, credentials, leads, blogs,
} = require('./seedData');

async function main() {
  const conn = await pool.getConnection();
  try {
    console.log('Seeding admin user...');
    const username = process.env.INITIAL_ADMIN_USERNAME || 'admin';
    const password = process.env.INITIAL_ADMIN_PASSWORD;
    if (!password) throw new Error('INITIAL_ADMIN_PASSWORD is not set in server/.env');
    const hash = await bcrypt.hash(password, 12);
    await conn.query(
      'INSERT INTO admin_users (username, password_hash) VALUES (:username, :hash) ON DUPLICATE KEY UPDATE password_hash = :hash',
      { username, hash }
    );

    console.log('Seeding profile...');
    await conn.query(
      `INSERT INTO profile (id, first_name, last_name, full_name, tagline, role_description, short_bio, about_headline, about_intro, avatar_url, cv_url, cta_discovery_url, trust_stats, trust_brands)
       VALUES (1, :firstName, :lastName, :fullName, :tagline, :roleDescription, :shortBio, :aboutHeadline, :aboutIntro, :avatarUrl, :cvUrl, :ctaDiscoveryUrl, :trustStats, :trustBrands)
       ON DUPLICATE KEY UPDATE first_name=:firstName, last_name=:lastName, full_name=:fullName, tagline=:tagline, role_description=:roleDescription,
         short_bio=:shortBio, about_headline=:aboutHeadline, about_intro=:aboutIntro, avatar_url=:avatarUrl, cv_url=:cvUrl,
         cta_discovery_url=:ctaDiscoveryUrl, trust_stats=:trustStats, trust_brands=:trustBrands`,
      {
        ...profile,
        trustStats: JSON.stringify(profile.trustStats),
        trustBrands: JSON.stringify(profile.trustBrands),
      }
    );

    console.log('Seeding settings...');
    await conn.query(
      `INSERT INTO settings (id, seo_title, seo_description, seo_keywords, contact_email, contact_phone, contact_linkedin, contact_location)
       VALUES (1, :seoTitle, :seoDescription, :seoKeywords, :contactEmail, :contactPhone, :contactLinkedin, :contactLocation)
       ON DUPLICATE KEY UPDATE seo_title=:seoTitle, seo_description=:seoDescription, seo_keywords=:seoKeywords,
         contact_email=:contactEmail, contact_phone=:contactPhone, contact_linkedin=:contactLinkedin, contact_location=:contactLocation`,
      settings
    );

    console.log('Seeding ventures...');
    await conn.query('DELETE FROM ventures');
    for (const [i, v] of ventures.entries()) {
      await conn.query(
        'INSERT INTO ventures (id, sort_order, name, description, status, website) VALUES (:id, :i, :name, :desc, :status, :website)',
        { ...v, i }
      );
    }

    console.log('Seeding expertise...');
    await conn.query('DELETE FROM expertise');
    for (const [i, x] of expertise.entries()) {
      await conn.query(
        'INSERT INTO expertise (id, sort_order, number, title, description, skills) VALUES (:id, :i, :number, :title, :description, :skills)',
        { ...x, i, skills: JSON.stringify(x.skills) }
      );
    }

    console.log('Seeding ecosystem...');
    await conn.query(
      `INSERT INTO ecosystem (id, headline, subheading) VALUES (1, :headline, :subheading)
       ON DUPLICATE KEY UPDATE headline=:headline, subheading=:subheading`,
      ecosystem
    );
    await conn.query('DELETE FROM ecosystem_activities');
    for (const [i, a] of ecosystemActivities.entries()) {
      await conn.query(
        'INSERT INTO ecosystem_activities (id, sort_order, title, detail) VALUES (:id, :i, :title, :detail)',
        { ...a, i }
      );
    }

    console.log('Seeding projects (empty - coming soon)...');
    await conn.query('DELETE FROM projects');
    for (const [i, p] of projects.entries()) {
      await conn.query(
        `INSERT INTO projects (id, sort_order, number, title, category, image, short_description, challenge, solution, outcome, technologies, role, url)
         VALUES (:id, :i, :number, :title, :category, :image, :shortDescription, :challenge, :solution, :outcome, :technologies, :role, :url)`,
        { ...p, i, technologies: JSON.stringify(p.technologies || []) }
      );
    }

    console.log('Seeding journey (empty - removed)...');
    await conn.query('DELETE FROM journey');

    console.log('Seeding speaking...');
    await conn.query('DELETE FROM speaking');
    for (const [i, sp] of speaking.entries()) {
      await conn.query(
        'INSERT INTO speaking (id, sort_order, date, event, topic) VALUES (:id, :i, :date, :event, :topic)',
        { ...sp, i }
      );
    }

    console.log('Seeding global_presence...');
    await conn.query(
      `INSERT INTO global_presence (id, headline, description, countries) VALUES (1, :headline, :description, :countries)
       ON DUPLICATE KEY UPDATE headline=:headline, description=:description, countries=:countries`,
      { ...globalPresence, countries: JSON.stringify(globalPresence.countries) }
    );

    console.log('Seeding skills...');
    await conn.query('DELETE FROM skills');
    for (const [i, s] of skills.entries()) {
      await conn.query('INSERT INTO skills (sort_order, skill) VALUES (:i, :s)', { i, s });
    }

    console.log('Seeding certifications...');
    await conn.query('DELETE FROM certifications');
    for (const [i, c] of certifications.entries()) {
      await conn.query('INSERT INTO certifications (id, sort_order, title) VALUES (:id, :i, :title)', { ...c, i });
    }

    console.log('Seeding process_steps...');
    await conn.query('DELETE FROM process_steps');
    for (const [i, p] of processSteps.entries()) {
      await conn.query(
        'INSERT INTO process_steps (step, sort_order, name, description) VALUES (:step, :i, :name, :desc)',
        { ...p, i }
      );
    }

    console.log('Seeding credentials...');
    await conn.query('DELETE FROM credentials');
    for (const [category, items] of Object.entries(credentials)) {
      for (const [i, content] of items.entries()) {
        await conn.query(
          'INSERT INTO credentials (category, sort_order, content) VALUES (:category, :i, :content)',
          { category, i, content }
        );
      }
    }

    console.log('Seeding leads...');
    await conn.query('DELETE FROM leads');
    for (const l of leads) {
      await conn.query(
        `INSERT INTO leads (id, name, email, company, industry, description, budget, timeline, created_at)
         VALUES (:id, :name, :email, :company, :industry, :description, :budget, :timeline, :createdAt)`,
        l
      );
    }

    console.log('Seeding blogs...');
    await conn.query('DELETE FROM blogs');
    for (const [i, b] of blogs.entries()) {
      await conn.query(
        `INSERT INTO blogs (id, title, slug, excerpt, content, image, category, read_time, published_date, published, sort_order)
         VALUES (:id, :title, :slug, :excerpt, :content, :image, :category, :readTime, :publishedDate, :published, :i)`,
        { ...b, i }
      );
    }

    console.log('Done. Log in at /#/admin with the username/password from server/.env (INITIAL_ADMIN_*).');
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
