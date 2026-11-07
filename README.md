# Patrick Ulad-Lieu — Portfolio

React + TypeScript site built with Vite, Tailwind CSS, shadcn/ui, lucide-react, and framer-motion.
Pages are pre-rendered to static HTML at build time, so search engines see every section and the
site can be hosted for free as plain files (no server or VPS).

## Edit content

Everything you would want to change (jobs, skills, schools, awards, contact info) is in
`src/data/profile.ts`.

## Commands (run inside this folder)

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (first time only) |
| `npm run dev` | Live-editing preview at http://localhost:5173 |
| `npm run build` | Build the finished site into `dist/` |
| `npm run preview` | Serve the built `dist/` at http://localhost:4173 |
| `npm run og` | Regenerate share images (site-wide plus one per page in `public/og/`) after changing titles |

Requires Node.js 22.18 or newer.

## Settings (`.env`)

- `VITE_SITE_URL`: your live address with no trailing slash. Used for SEO tags, `sitemap.xml`, and share previews. Change it once you know your final address, then rebuild.
- `VITE_GA_ID`: Google Analytics 4 measurement ID (`G-…`). Analytics and its CSP entries stay off until this is set. Tracks page views, contact-form sends, email/LinkedIn clicks, and résumé downloads.
- `VITE_WEB3FORMS_KEY`: free key from https://web3forms.com. With it, the contact form emails you directly. Without it, the form opens the visitor's email app.

## Deploy on Netlify

1. Push this folder to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project**, pick the repository.
3. Netlify reads `netlify.toml` (build command `npm run build`, publish folder `dist`).
4. Every push to GitHub redeploys automatically.

Without GitHub: run `npm run build` and drag the `dist` folder onto https://app.netlify.com/drop.

## SEO included

- One pre-rendered page per URL (`src/pages.tsx`): skills, projects, each case study, experience, education, recommendations, notes, each note, contact
- Per-page titles, descriptions, canonical links, share images, breadcrumbs, and `BlogPosting` data for notes
- Internal links between case studies, roles, skills, and notes

- Full pre-rendered HTML (no blank page for crawlers)
- Title, description, canonical URL, Open Graph and Twitter share tags, 1200×630 share image
- schema.org `Person` / `ProfilePage` structured data built from `profile.ts`
- `sitemap.xml` and `robots.txt` generated on every build
- One `h1`, labelled sections, skip link, reduced-motion support

After it's live, add the site in Google Search Console and submit `sitemap.xml`.
