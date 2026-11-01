// Turns the built single-page app into real HTML so search engines and link previews
// see every section without running JavaScript. Run by `npm run build` (Node 22.6+).
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
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
const appHtml: string = server.render()
const jsonLd = JSON.stringify(server.structuredData(siteUrl)).replace(/</g, '\\u003c')

const templatePath = resolve(dist, 'index.html')
const html = readFileSync(templatePath, 'utf8')
  .replace('<!--app-html-->', appHtml)
  .replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`)
writeFileSync(templatePath, withCsp(html))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${(appHtml.length / 1024).toFixed(1)} KB of HTML for ${siteUrl}`)
