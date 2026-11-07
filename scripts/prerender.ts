// Turns the built single-page app into real HTML so search engines and link previews
// see every section without running JavaScript. Run by `npm run build` (Node 22.6+).
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')

// Same value Vite uses: the host environment variable first, then .env.production / .env
const fromFile = ['.env.production', '.env']
  .map((f) => resolve(root, f))
  .filter((f) => existsSync(f))
  .map((f) => readFileSync(f, 'utf8').match(/^VITE_SITE_URL=(.*)$/m)?.[1]?.trim())
  .find(Boolean)
const siteUrl = (process.env.VITE_SITE_URL || fromFile || 'https://patrickuladlieu.netlify.app').replace(new RegExp('/+$'), '')

// Content-Security-Policy as a meta tag (the host can't set headers). The inline boot script is
// allowed by its hash, so editing that script in index.html is picked up automatically on build.
function withCsp(page: string): string {
  const open = page.indexOf('<script>')
  const close = page.indexOf('</script>', open)
  if (open < 0 || close < 0) throw new Error('Inline boot script not found; cannot build CSP hash')
  // Browsers normalize CRLF to LF before hashing, so do the same
  const inline = page.slice(open + '<script>'.length, close).split(String.fromCharCode(13)).join('')
  const hash = createHash('sha256').update(inline).digest('base64')
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'sha256-${hash}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.web3forms.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://api.web3forms.com",
  ].join('; ')
  return page.replace('<head>', `<head>
    <meta http-equiv="Content-Security-Policy" content="${policy}" />`)
}

const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const setMeta = (page: string, attr: string, name: string, value: string) =>
  page.replace(new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`), (_m, a, b) => a + esc(value) + b)

type PageInfo = { path: string; title: string; description: string; priority: number }
const pages: PageInfo[] = server.pages()
let totalKb = 0

// One real HTML file per URL: /, /skills/, /projects/, /projects/<slug>/, ...
for (const pg of pages) {
  const url = `${siteUrl}${pg.path}`
  const appHtml: string = server.render(pg.path)
  totalKb += appHtml.length / 1024
  const jsonLd = JSON.stringify(server.structuredData(siteUrl, pg.path)).split('<').join(String.fromCharCode(92) + 'u003c')
  let out = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`)
    .replace(new RegExp('<title>[^<]*</title>'), `<title>${esc(pg.title)}</title>`)
    .replace(new RegExp('<link rel="canonical" href="[^"]*" />'), `<link rel="canonical" href="${url}" />`)
  out = setMeta(out, 'name', 'description', pg.description)
  out = setMeta(out, 'property', 'og:title', pg.title)
  out = setMeta(out, 'property', 'og:description', pg.description)
  out = setMeta(out, 'property', 'og:url', url)
  out = setMeta(out, 'name', 'twitter:title', pg.title)
  out = setMeta(out, 'name', 'twitter:description', pg.description)
  if (pg.path !== '/') out = setMeta(out, 'property', 'og:type', 'website')
  const file = resolve(dist, '.' + pg.path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, withCsp(out))
}

const today = new Date().toISOString().slice(0, 10)
const urls = pages.map((pg) => `  <url><loc>${siteUrl}${pg.path}</loc><lastmod>${today}</lastmod><priority>${pg.priority.toFixed(1)}</priority></url>`).join(String.fromCharCode(10))
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${pages.length} pages (${totalKb.toFixed(1)} KB of HTML) for ${siteUrl}`)
