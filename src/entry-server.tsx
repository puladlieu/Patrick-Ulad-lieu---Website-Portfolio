import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { CERTS, EDUCATION, EXPERIENCE, PERSON, STACK } from './data/profile'

// Used at build time by scripts/prerender.ts
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}

// schema.org data so search engines understand who this page is about
export function structuredData(siteUrl: string) {
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
