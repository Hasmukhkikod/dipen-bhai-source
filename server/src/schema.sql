-- Navyrix Labs / dipen-bhai portfolio — MySQL schema
-- Run once against a fresh database: mysql -u <user> -p <db> < schema.sql

CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- Singleton row (id always 1): personal/company profile shown across the site
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  full_name VARCHAR(200),
  tagline VARCHAR(500),
  role_description VARCHAR(500),
  short_bio TEXT,
  about_headline VARCHAR(500),
  about_intro TEXT,
  avatar_url VARCHAR(500),
  cv_url VARCHAR(500),
  cta_discovery_url VARCHAR(500),
  trust_stats JSON,   -- [{id, value, label}]
  trust_brands JSON   -- ["Qualcomm", ...]
);

-- Singleton row (id always 1): SEO + contact details
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY,
  seo_title VARCHAR(255),
  seo_description VARCHAR(1000),
  seo_keywords VARCHAR(1000),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  contact_linkedin VARCHAR(255),
  contact_location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ventures (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  name VARCHAR(255),
  description TEXT,
  status VARCHAR(255),
  website VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS expertise (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  number VARCHAR(10),
  title VARCHAR(255),
  description TEXT,
  skills JSON -- ["skill1", "skill2", ...]
);

-- Singleton row (id always 1)
CREATE TABLE IF NOT EXISTS ecosystem (
  id INT PRIMARY KEY,
  headline VARCHAR(255),
  subheading TEXT
);

CREATE TABLE IF NOT EXISTS ecosystem_activities (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  title VARCHAR(255),
  detail TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  number VARCHAR(10),
  title VARCHAR(255),
  category VARCHAR(255),
  image VARCHAR(500),
  short_description TEXT,
  challenge TEXT,
  solution TEXT,
  outcome TEXT,
  technologies JSON,
  role VARCHAR(255),
  url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS journey (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  year VARCHAR(50),
  company VARCHAR(255),
  role VARCHAR(255),
  description TEXT
);

CREATE TABLE IF NOT EXISTS speaking (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  date VARCHAR(50),
  event VARCHAR(255),
  topic VARCHAR(255)
);

-- Singleton row (id always 1)
CREATE TABLE IF NOT EXISTS global_presence (
  id INT PRIMARY KEY,
  headline VARCHAR(255),
  description TEXT,
  countries JSON
);

CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sort_order INT DEFAULT 0,
  skill VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS certifications (
  id VARCHAR(50) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS process_steps (
  step VARCHAR(10) PRIMARY KEY,
  sort_order INT DEFAULT 0,
  name VARCHAR(100),
  description TEXT
);

-- Consolidates the 7 credential sub-lists (technical/mentor projects, jury
-- slots, lectures, patents, copyrights, memberships) into one flexible table.
CREATE TABLE IF NOT EXISTS credentials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category ENUM(
    'technical_project', 'mentor_project', 'jury_slot',
    'lecture', 'patent', 'copyright', 'membership'
  ) NOT NULL,
  sort_order INT DEFAULT 0,
  content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  company VARCHAR(255),
  industry VARCHAR(255),
  description TEXT,
  budget VARCHAR(100),
  timeline VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500),
  slug VARCHAR(500) UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  image VARCHAR(500),
  category VARCHAR(255),
  read_time VARCHAR(50),
  published_date VARCHAR(100),
  published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
