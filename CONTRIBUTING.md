# Contributing to CloudPress

First off, thank you for considering contributing to **CloudPress**! 🎉

CloudPress is an open-source, ultra-fast, serverless single-file CMS powered by Cloudflare Workers and Cloudflare D1.

## 🛠 Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cloudpress.git
   cd cloudpress
   ```

2. **Install dependencies (Wrangler CLI):**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```

## 🧪 Testing

Before submitting a Pull Request, please ensure all tests pass:

```bash
# Run the complete 54-scenario comprehensive test suite:
npm run test

# Run the WYSIWYG editor test suite:
npm run test:editor
```

## 📜 Coding Principles

1. **Single-File Architecture**: The core CMS engine is purposefully kept in `worker.js` to enable zero-build, single-file serverless deployments with no complex bundlers.
2. **Zero External Storage Dependencies**: Media and images are compressed directly in the browser and stored in Cloudflare D1 SQL. Do not introduce mandatory third-party storage or S3/R2 dependencies.
3. **Full Bilingual Support (i18n)**: All UI elements, dialogs, placeholders, and tooltips must support both English (LTR, Inter) and Persian (RTL, Vazirmatn).
4. **SVG Vector Icons**: Do not use brand icons from Lucide. Use standard inline SVGs in `SOCIAL_ICONS`.

## 📬 Submitting a Pull Request

1. Fork the repo and create your branch from `main`.
2. Ensure `node -c worker.js` and `npm run test` exit with code 0.
3. Submit a Pull Request describing your changes clearly.
