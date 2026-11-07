// Generates the link-preview image (public/og-image.png) and the iOS home-screen icon.
// Run with `npm run og` after changing the name or headline.
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const pub = resolve(import.meta.dirname, '../public')
const mark = (fill: string) =>
  `<path fill="${fill}" fill-rule="evenodd" d="M5 3h23l8 8v11l-8 8H15v7H5V3Zm10 9v9h10l2-2v-5l-2-2H15Z"/><path fill="#e3141b" d="M19 37h17V27L19 37Z"/>`

const hex = `<pattern id="hx" width="18" height="10.3923" patternUnits="userSpaceOnUse"><path fill="rgba(255,255,255,0.045)" d="M5.1 0L2.55 4.42H-2.55L-5.1 0L-2.55-4.42H2.55ZM23.1 0L20.55 4.42H15.45L12.9 0L15.45-4.42H20.55ZM5.1 10.39L2.55 14.81H-2.55L-5.1 10.39L-2.55 5.98H2.55ZM23.1 10.39L20.55 14.81H15.45L12.9 10.39L15.45 5.98H20.55ZM14.1 5.2L11.55 9.61H6.45L3.9 5.2L6.45.78H11.55Z"/></pattern>`

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${hex}</defs>
  <rect width="1200" height="630" fill="#0b0b0c"/>
  <rect width="1200" height="630" fill="url(#hx)"/>
  <polygon points="1200,0 1010,0 820,630 1000,630 1200,120" fill="#161617"/>
  <polygon points="1200,250 1060,630 1200,630" fill="#e3141b"/>
  <rect x="0" y="0" width="1200" height="44" fill="#e3141b"/>
  <text x="72" y="29" font-family="Consolas, monospace" font-size="17" letter-spacing="4" fill="#ffffff">PORTFOLIO // GREATER PHILADELPHIA // OPEN TO SOFTWARE ENGINEERING ROLES</text>
  <g transform="translate(72 118) scale(2.6)">${mark('#ffffff')}</g>
  <text x="72" y="330" font-family="Arial Black, Arial, sans-serif" font-size="74" font-weight="900" letter-spacing="3" fill="#f4f4f2">PATRICK</text>
  <text x="72" y="410" font-family="Arial Black, Arial, sans-serif" font-size="74" font-weight="900" letter-spacing="3" fill="#e3141b">ULAD-LIEU</text>
  <rect x="72" y="446" width="56" height="5" fill="#e3141b"/>
  <text x="72" y="500" font-family="Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="5" fill="#f4f4f2">SOFTWARE ENGINEER // SYSTEMS AUTOMATION</text>
  <text x="72" y="552" font-family="Consolas, monospace" font-size="21" letter-spacing="2" fill="#9a9ea4">Lifecycle forecasting · Data pipelines · Full-stack · Hardware/software</text>
</svg>`

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 40 40"><rect width="40" height="40" fill="#0b0b0c"/><g transform="translate(4 4) scale(.8)">${mark('#ffffff')}</g></svg>`

await sharp(Buffer.from(og)).png().toFile(resolve(pub, 'og-image.png'))
await sharp(Buffer.from(icon)).png().toFile(resolve(pub, 'apple-touch-icon.png'))

// One share image per inner page, named to match ogImage() in src/pages.tsx
const { PROJECTS } = await import('../src/data/profile.ts')
const { NOTES } = await import('../src/data/notes.ts')
const xml = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const wrap = (t: string, max: number) => t.toUpperCase().split(' ').reduce<string[]>((lines, w) => {
  const last = lines[lines.length - 1]
  if (last !== undefined && (last + ' ' + w).length <= max) lines[lines.length - 1] = last + ' ' + w
  else lines.push(w)
  return lines
}, [])

const inner: { path: string; kicker: string; title: string; sub: string }[] = [
  { path: '/skills/', kicker: 'SKILLS', title: 'Skills & tech stack', sub: 'Python · JavaScript · Java · SQL · VBA · PowerShell · REST APIs' },
  { path: '/projects/', kicker: 'CASE STUDIES', title: 'Projects', sub: 'Forecasting · Asset migration · Readiness reporting' },
  { path: '/experience/', kicker: 'CAREER', title: 'Experience', sub: 'City of Philadelphia OIT · Deloitte · Security & hardware R&D' },
  { path: '/education/', kicker: 'EDUCATION', title: 'Education & credentials', sub: 'BS Computer Science · Wilmington University · 2026' },
  { path: '/recommendations/', kicker: 'TESTIMONIALS', title: 'Recommendations', sub: 'What managers, colleagues, and mentees say' },
  { path: '/notes/', kicker: 'WRITING', title: 'Notes', sub: 'Forecasting · Data migration · Automation' },
  { path: '/contact/', kicker: 'CONTACT', title: "Let's work together", sub: 'Software engineering roles · Automation · Tech advisory' },
  ...PROJECTS.map((p) => ({ path: `/projects/${p.slug}/`, kicker: 'CASE STUDY', title: p.title, sub: p.metrics.map(([v, k]) => `${v} ${k}`).join(' · ') })),
  ...NOTES.map((n) => ({ path: `/notes/${n.slug}/`, kicker: 'NOTE', title: n.title, sub: n.tags.join(' · ') })),
]

mkdirSync(resolve(pub, 'og'), { recursive: true })
for (const pg of inner) {
  const lines = wrap(pg.title, 24).slice(0, 4)
  const size = lines.length > 2 ? 56 : 68
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${hex}</defs>
  <rect width="1200" height="630" fill="#0b0b0c"/>
  <rect width="1200" height="630" fill="url(#hx)"/>
  <polygon points="1200,250 1060,630 1200,630" fill="#e3141b"/>
  <rect x="0" y="0" width="1200" height="44" fill="#e3141b"/>
  <text x="72" y="29" font-family="Consolas, monospace" font-size="17" letter-spacing="4" fill="#ffffff">PATRICK ULAD-LIEU // ${xml(pg.kicker)}</text>
  <g transform="translate(72 96) scale(1.6)">${mark('#ffffff')}</g>
  ${lines.map((l, i) => `<text x="72" y="${250 + i * (size + 14)}" font-family="Arial Black, Arial, sans-serif" font-size="${size}" font-weight="900" letter-spacing="2" fill="${i === lines.length - 1 ? '#e3141b' : '#f4f4f2'}">${xml(l)}</text>`).join('\n  ')}
  <rect x="72" y="${250 + lines.length * (size + 14) - 18}" width="56" height="5" fill="#e3141b"/>
  <text x="72" y="560" font-family="Consolas, monospace" font-size="22" letter-spacing="1" fill="#9a9ea4">${xml(pg.sub.slice(0, 80))}</text>
</svg>`
  await sharp(Buffer.from(svg)).png().toFile(resolve(pub, 'og', `${pg.path.slice(1, -1).replace(/\//g, '-')}.png`))
}
console.log(`Wrote public/og-image.png, public/apple-touch-icon.png and ${inner.length} page images in public/og/`)
