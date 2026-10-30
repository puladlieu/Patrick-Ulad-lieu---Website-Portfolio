// Turns the built single-page app into real HTML so search engines and link previews
// see every section without running JavaScript. Run by `npm run build` (Node 22.6+).
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')

// Same value Vite uses: the host's environment variable first, then the local .env file
const envFile = resolve(root, '.env')
const fromFile = existsSync(envFile) ? readFileSync(envFile, 'utf8').match(/^VITE_SITE_URL=(.*)$/m)?.[1] : undefined
const siteUrl = (process.env.VITE_SITE_URL || fromFile?.trim() || 'https://patrickuladlieu.netlify.app').replace(new RegExp('/+$'), '')

const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const appHtml: string = server.render()
const jsonLd = JSON.stringify(server.structuredData(siteUrl)).replace(/</g, '\\u003c')

const templatePath = resolve(dist, 'index.html')
const html = readFileSync(templatePath, 'utf8')
  .replace('<!--app-html-->', appHtml)
  .replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`)
writeFileSync(templatePath, html)

const today = new Date().toISOString().slice(0, 10)
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`)
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${(appHtml.length / 1024).toFixed(1)} KB of HTML for ${siteUrl}`)
