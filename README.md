<div align="center">

# ⚡ CloudPress

**The Ultra-Fast, Serverless, Single-File CMS Built on Cloudflare Edge & D1 SQL**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Cloudflare-D1_SQL-F38020?style=flat-square&logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_Runtime-brightgreen?style=flat-square)](#)
[![Tests Passing](https://img.shields.io/badge/Tests-54%2F54_Passed-success?style=flat-square)](#)
[![Language: Bilingual](https://img.shields.io/badge/i18n-English%20%7C%20فارسی-blueviolet?style=flat-square)](#)

[**🇮🇷 مطالعه راهنما به زبان فارسی (Persian Documentation)**](README.fa.md)

</div>

---

## 🌟 Overview

**CloudPress** is a modern, lightweight, serverless Content Management System (CMS) and blogging platform engineered to run entirely on **Cloudflare Workers** with **Cloudflare D1 SQL** database.

Designed from the ground up to eliminate expensive traditional VPS hosting, database servers, and complicated maintenance, CloudPress delivers your content across 300+ edge data centers worldwide with sub-30ms TTFB (Time to First Byte).

The entire application runs from a **single, self-contained worker file (`worker.js`)** with **zero server-side runtime npm dependencies**.

---

## ✨ Key Features

- 🚀 **Serverless & Edge-First**: Runs directly on Cloudflare’s global network with ultra-low latency worldwide.
- 💾 **Pure D1 SQL Storage**: No external storage or AWS S3/Cloudflare R2 required. Images and assets are automatically compressed in the browser (WebP) and stored securely in SQLite tables.
- ✍️ **Visual WYSIWYG Editor (Quill.js)**:
  - Rich typography: Bold, Italic, Underline, Strikethrough, Code blocks, Blockquotes.
  - Heading styles (H1, H2, H3) and custom color pickers.
  - Bulleted and numbered lists with correct RTL/LTR indentations.
  - Video embeds (YouTube / Vimeo) and image insertions directly from the media library.
  - Source HTML view toggle for full developer freedom.
  - Live draft auto-saving to `localStorage`.
- 🌍 **100% Bilingual (English & Persian)**:
  - Global English (LTR layout, typography powered by Google Inter).
  - Native Persian (RTL layout, typography powered by Vazirmatn).
  - Bidirectional, real-time UI switching with dynamic translation engine.
- 🎨 **Full Homepage Customization**:
  - Customizable Hero section (Badge, Title, Description, CTA Buttons, Hero Image).
  - Customizable 3-column Features grid (Titles, Descriptions, Icons).
  - Header navigation menu builder with drag-and-drop hierarchy.
  - Custom CSS & Head/Footer script injections (Google Analytics, live chat widgets).
- 💬 **Interactive Comments & Moderation**:
  - Public comment submission with Honeypot anti-spam protection.
  - Toggle between auto-approval and manual admin moderation.
- 📈 **Real Analytics Counter**:
  - Real database-driven article view counter (`views_count` in D1 SQL).
  - Aggregated dashboard stats (Total Articles, Pages, Comments, Views).
- 🔍 **Built-in Edge SEO**:
  - Auto-generated XML Sitemap (`/sitemap.xml`).
  - Search engine crawler directives (`/robots.txt`).
  - Auto-generated RSS 2.0 Feed (`/rss.xml` and `/feed.xml`).
  - OpenGraph & JSON-LD structured data on all posts and pages.
- 📦 **One-Click Backup & Restore**:
  - Export complete site data (Posts, Pages, Categories, Settings, Comments) as a single portable JSON file.
  - Instant one-click import restoration.

---

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                   Global Cloudflare Edge                    │
├───────────────────────────────┬─────────────────────────────┤
│         Public Web            │         Admin SPA           │
│  - Homepage & Hero Section    │  - Dashboard & Analytics    │
│  - Blog Archive & Real-time   │  - Quill WYSIWYG Editor     │
│  - Clean Slugs (/blog, /post) │  - Media Library (WebP)     │
│  - Dynamic XML Sitemap & RSS  │  - Menu Builder & Settings  │
│  - Bilingual (LTR & RTL)      │  - Backup Export / Import   │
├───────────────────────────────┴─────────────────────────────┤
│                      worker.js                              │
│              (Single Self-Contained Engine)                 │
├─────────────────────────────────────────────────────────────┤
│                 Cloudflare D1 (Serverless SQL)              │
│      [posts]  [pages]  [categories]  [media]  [settings]    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- A [Cloudflare Account](https://dash.cloudflare.com/) (Free tier works completely!)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cloudpress.git
cd cloudpress
```

### 2. Install Wrangler CLI
```bash
npm install
```

### 3. Create your Cloudflare D1 Database
Login to your Cloudflare account via Wrangler:
```bash
npx wrangler login
```
Create a new D1 database named `cloudpress_db`:
```bash
npx wrangler d1 create cloudpress_db
```
The command will print your database ID, for example:
```text
database_name = "cloudpress_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 4. Configure `wrangler.toml`
Open `wrangler.toml` and paste your `database_id`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "cloudpress_db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 5. Run Locally
```bash
npm run dev
```
Open [http://localhost:8787](http://localhost:8787) in your browser.
- **Frontend**: `http://localhost:8787/`
- **Admin Panel**: `http://localhost:8787/admin`
- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `admin123`
  *(Be sure to change your password in the Admin Profile tab upon first login)*

---

## 🚢 Deploy to Production

Deploy with one command directly to Cloudflare's global edge network:
```bash
npm run deploy
```

Set a secure production JWT secret key:
```bash
npx wrangler secret put JWT_SECRET
```

---

## 🧪 Comprehensive Automated Testing

CloudPress includes an extensive test suite verifying:
- End-to-end routing (`/`, `/blog`, `/post/:slug`, `/page/:slug`, `/sitemap.xml`, `/rss.xml`)
- Quill WYSIWYG rich text formatting and HTML output
- D1 SQL schema migrations and automated backups
- Full English and Persian bidirectional translation engine

To run the complete test suite:
```bash
npm run test
```
Result:
```text
================================================================================
🏁 TEST SUITE COMPLETED: 54 PASSED, 0 FAILED
================================================================================
```

---

## 🔒 Security

- **JWT Session Protection**: HMAC SHA-256 tokens stored in `HttpOnly`, `SameSite=Lax`, `Secure` cookies.
- **Salted Password Hashing**: Cryptographic PBKDF2/SHA-256 with unique per-user salts.
- **Honeypot Anti-Spam**: Invisible bot-detection fields on public comment forms.
- **Admin Path Cloaking**: Admin login buttons are completely omitted from public layouts.
- **SQL Injection Defense**: All database operations use prepared parameter bindings (`db.prepare().bind()`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - free for personal and commercial use.
