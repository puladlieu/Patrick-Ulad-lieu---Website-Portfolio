import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { ogImage, PAGES } from './pages'
import { CERTS, EDUCATION, EXPERIENCE, PERSON, PROJECTS, STACK } from './data/profile'

// /llms.txt: a plain-text profile AI assistants (ChatGPT, Gemini, Claude, Perplexity) can read in one request.
// Built from the same data as the site, so it never drifts. Format: https://llmstxt.org
export function llmsText(siteUrl: string) {
  const nl = String.fromCharCode(10)
  const lines: string[] = [
    `# ${PERSON.name}`,
    '',
    `> ${PERSON.headline} based in ${PERSON.location}. ${PERSON.status}. Work style: ${PERSON.workStyle}.`,
    '',
    PERSON.summary,
    '',
    `Contact: ${PERSON.email} · LinkedIn: ${PERSON.linkedin} · Site: ${siteUrl}/`,
    '',
    '## Experience',
    ...EXPERIENCE.map((x) => `- ${x.role}, ${x.org} (${x.period})${x.active ? ' [current]' : ''}: ${x.bullets[0]}`),
    '',
    '## Case studies',
    ...PROJECTS.map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}/): ${p.outcome}`),
    '',
    '## Education',
    ...EDUCATION.map((e) => `- ${e.degree}, ${e.institution} (${e.year})`),
    '',
    '## Skills',
    ...STACK.map((s) => `- ${s.title}: ${s.items.join(', ')}`),
    '',
    '## Certifications',
    ...CERTS.map((c) => `- ${c.title} (${c.issuer})`),
    '',
    '## Pages',
    ...PAGES.map((p) => `- [${p.title}](${siteUrl}${p.path}): ${p.description}`),
    '',
  ]
  return lines.join(nl)
}

// Used at build time by scripts/prerender.ts
export function render(path: string) {
  return renderToString(<StrictMode><App path={path} /></StrictMode>)
}

// Everything the build needs to write one HTML file per URL
export function pages() {
  return PAGES.map(({ path, title, description, priority, parent, nav, article }) => ({ path, title, description, priority, parent, nav, article, og: ogImage(path) }))
}

// schema.org data so search engines understand who this page is about
export function structuredData(siteUrl: string, path = '/') {
  const page = PAGES.find((x) => x.path === path)!
  if (path !== '/') return pageData(siteUrl, page)
  const current = EXPERIENCE.filter((x) => x.active)
  const orgs = [...new Set(current.map((x) => x.org.replace(/ — .*/, '')))]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: `${PERSON.name} — ${PERSON.role}`,
        inLanguage: 'en-US',
        dateModified: new Date().toISOString().slice(0, 10),
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: PERSON.name,
        givenName: 'Patrick',
        familyName: 'Ulad-Lieu',
        url: `${siteUrl}/`,
        image: PERSON.photo ? `${siteUrl}${PERSON.photo}` : `${siteUrl}/og-image.png`,
        email: `mailto:${PERSON.email}`,
        jobTitle: PERSON.headline,
        description: PERSON.summary,
        sameAs: [PERSON.linkedin],
        address: { '@type': 'PostalAddress', addressLocality: 'Philadelphia', addressRegion: PERSON.region, addressCountry: 'US' },
        worksFor: orgs.map((name) => ({ '@type': 'Organization', name })),
        alumniOf: EDUCATION.map((e) => ({ '@type': 'EducationalOrganization', name: e.institution })),
        hasCredential: [
          ...EDUCATION.slice(0, 2).map((e) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: e.degree, recognizedBy: { '@type': 'EducationalOrganization', name: e.institution } })),
          ...CERTS.map((c) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'certificate', name: c.title, recognizedBy: { '@type': 'Organization', name: c.issuer } })),
        ],
        knowsAbout: [...new Set(STACK.flatMap((c) => c.items))],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: PERSON.name,
        publisher: { '@id': `${siteUrl}/#person` },
      },
    ],
  }
}

// Smaller graph for inner pages: the page, its place in the site, and a link back to the person
function pageData(siteUrl: string, page: (typeof PAGES)[number]) {
  const crumbs = [{ name: 'Home', path: '/' }, ...(page.parent ? [{ name: PAGES.find((x) => x.path === page.parent)!.nav, path: page.parent }] : []), { name: page.nav, path: page.path }]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}${page.path}#webpage`,
        url: `${siteUrl}${page.path}`,
        name: page.title,
        description: page.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        breadcrumb: { '@id': `${siteUrl}${page.path}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${page.path}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${siteUrl}${c.path}` })),
      },
      ...(page.article ? [{
        '@type': 'BlogPosting',
        '@id': `${siteUrl}${page.path}#article`,
        mainEntityOfPage: { '@id': `${siteUrl}${page.path}#webpage` },
        headline: page.nav,
        description: page.description,
        datePublished: page.article.date,
        dateModified: page.article.date,
        image: `${siteUrl}${ogImage(page.path)}`,
        inLanguage: 'en-US',
        author: { '@type': 'Person', '@id': `${siteUrl}/#person`, name: PERSON.name, url: `${siteUrl}/` },
        publisher: { '@type': 'Person', '@id': `${siteUrl}/#person`, name: PERSON.name },
      }] : []),
    ],
  }
}
