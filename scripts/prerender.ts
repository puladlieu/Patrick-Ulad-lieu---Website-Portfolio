// Turns the built single-page app into real HTML so search engines and link previews
// see every section without running JavaScript. Run by `npm run build` (Node 22.6+).
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')

// Same value Vite uses: the host environment variable first, then .env.production / .env
const env = (name: string) => process.env[name] || ['.env.production', '.env']
  .map((f) => resolve(root, f))
  .filter((f) => existsSync(f))
  .map((f) => readFileSync(f, 'utf8').match(new RegExp(`^${name}=(.*)$`, 'm'))?.[1]?.trim())
  .find(Boolean) || ''
const siteUrl = (env('VITE_SITE_URL') || 'https://patrickuladlieu.netlify.app').replace(new RegExp('/+$'), '')
// Google Analytics 4 is only allowed through the CSP when an ID is configured
const ga = Boolean(env('VITE_GA_ID'))
const GA_SCRIPT = ga ? ' https://www.googletagmanager.com' : ''
const GA_CONNECT = ga ? ' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com' : ''
const GA_IMG = ga ? ' https://*.google-analytics.com https://www.googletagmanager.com' : ''

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
    `script-src 'self' 'sha256-${hash}'${GA_SCRIPT}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data:${GA_IMG}`,
    "font-src 'self' data:",
    `connect-src 'self' https://api.web3forms.com${GA_CONNECT}`,
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

type PageInfo = { path: string; title: string; description: string; priority: number; og: string; article?: { date: string } }
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
  if (pg.path !== '/') out = setMeta(out, 'property', 'og:type', pg.article ? 'article' : 'website')
  // Page-specific share image when `npm run og` has made one, otherwise the site-wide image
  if (existsSync(resolve(dist, '.' + pg.og))) {
    out = setMeta(out, 'property', 'og:image', `${siteUrl}${pg.og}`)
    out = setMeta(out, 'name', 'twitter:image', `${siteUrl}${pg.og}`)
    out = setMeta(out, 'property', 'og:image:alt', pg.title)
  }
  const file = resolve(dist, '.' + pg.path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, withCsp(out))
}

const today = new Date().toISOString().slice(0, 10)
const urls = pages.map((pg) => `  <url><loc>${siteUrl}${pg.path}</loc><lastmod>${pg.article?.date ?? today}</lastmod><priority>${pg.priority.toFixed(1)}</priority></url>`).join(String.fromCharCode(10))
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`)
// Search engines and AI assistants are explicitly welcome: the point of this site is to be found.
const aiBots = ['Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'meta-externalagent']
writeFileSync(resolve(dist, 'robots.txt'), [
  ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
  'User-agent: *', 'Allow: /', '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  `# Plain-text profile for AI assistants: ${siteUrl}/llms.txt`, '',
].join(String.fromCharCode(10)))
writeFileSync(resolve(dist, 'llms.txt'), server.llmsText(siteUrl))

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${pages.length} pages (${totalKb.toFixed(1)} KB of HTML) for ${siteUrl}`)
