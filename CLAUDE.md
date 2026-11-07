# Portfolio site — working notes

Personal portfolio for Patrick Ulad-Lieu. React 19 + Vite + Tailwind 4, pre-rendered to static HTML.

## Where things live
- Design: the original one-page look (tabbed Skills/Experience, open role cards, numbered sections 01–08) at full width. Keep it unless asked.
- All content (jobs, projects, skills, schools, notes): `src/data/profile.ts` and `src/data/notes.ts`. Edit data, not components.
- Every URL is an entry in `src/pages.tsx` (title, description, sitemap priority). Add a page there and the build writes its HTML, sitemap entry and structured data.
- Build: `npm run build` → `scripts/prerender.ts` writes `dist/<path>/index.html` per page, `sitemap.xml`, `robots.txt`, and a CSP meta tag (hashes the inline boot script in `index.html`).
- Share images: `npm run og` writes `public/og/*.png` (one per page). Run it after changing titles.

## Deploy
- Host: DigitalOcean App Platform static site, auto-deploys on every push to `main` on GitHub.
- Live address is set in `.env.production` (`VITE_SITE_URL`). Changing domains = edit that line, rebuild, push.
- Env vars (DigitalOcean app settings or `.env.production`): `VITE_GA_ID` is set (Google Analytics 4, G-ZY7KGBRFRW, property "Portfolio"). `VITE_WEB3FORMS_KEY` is set (Web3Forms form "ATLAS Portfolio Contact", sends to puladlieu@gmail.com).
- Google Search Console: verified for the ondigitalocean.app address via `public/google0c95f7469df8349b.html` (keep that file). Sitemap submitted 2026-11-07. A new domain needs a new Search Console property and a new GA stream URL.

## Rules
- Never invent facts, numbers, or quotes about Patrick's work. Only use what is already in `profile.ts`, or ask.
- Files use CRLF; prefer the Edit tool over multi-line string replacement scripts.
- After changes: build, serve `dist/` (`python -m http.server 4173 -d dist`), check pages in the browser at desktop and 375px, then push.
- Graduation: BS Computer Science, Wilmington University, 2026.
