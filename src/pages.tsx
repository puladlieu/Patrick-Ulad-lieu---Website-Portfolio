import type { ReactNode } from 'react'
import { PERSON, PROJECTS } from '@/data/profile'
import { Contact } from '@/components/Contact'
import { Credentials } from '@/components/Credentials'
import { Experience } from '@/components/Experience'
import { Hero } from '@/components/Hero'
import { Pillars } from '@/components/Pillars'
import { ProjectDetail, Projects } from '@/components/Projects'
import { Recommendations } from '@/components/Recommendations'
import { Stack } from '@/components/Stack'
import { NotePost, Notes } from '@/components/Notes'
import { NOTES } from '@/data/notes'

// One entry per real URL. The build pre-renders each into its own HTML file with its own
// title, description, canonical link, and sitemap entry.
export type PageDef = {
  path: string
  nav: string
  title: string
  description: string
  priority: number
  parent?: string
  article?: { date: string } // marks a dated article (BlogPosting structured data)
  render: () => ReactNode
}

const NAME = PERSON.name

// Share image for a page: public/og-image.png for home, public/og/<path-with-dashes>.png otherwise (made by `npm run og`)
export const ogImage = (path: string) => (path === '/' ? '/og-image.png' : `/og/${path.slice(1, -1).replace(/\//g, '-')}.png`)

const notePages: PageDef[] = NOTES.map((n) => ({
  path: `/notes/${n.slug}/`,
  nav: n.title,
  title: `${n.title} | ${NAME}`,
  description: n.description,
  priority: 0.6,
  parent: '/notes/',
  article: { date: n.date },
  render: () => <NotePost slug={n.slug} />,
}))

const projectPages: PageDef[] = PROJECTS.map((p) => ({
  path: `/projects/${p.slug}/`,
  nav: p.title,
  title: `${p.title} — Case study | ${NAME}`,
  description: `${p.title}: ${p.outcome} ${p.metrics.map(([v, k]) => `${v} ${k}`).join(', ')}.`.slice(0, 300),
  priority: 0.7,
  parent: '/projects/',
  render: () => <ProjectDetail slug={p.slug} />,
}))

export const PAGES: PageDef[] = [
  {
    path: '/', nav: 'Home',
    title: `${NAME} — Software Engineer | Systems Automation | Philadelphia`,
    description: 'Patrick Ulad-Lieu is a software engineer and systems automation specialist in Greater Philadelphia: hardware lifecycle forecasting for 30,000+ City employees, 100,000+ assets migrated to TeamDynamix, full-stack development, and data pipelines.',
    priority: 1.0,
    render: () => <Home />,
  },
  {
    path: '/skills/', nav: 'Skills',
    title: `Skills & Tech Stack — ${NAME} | Software Engineer, Philadelphia`,
    description: 'Languages, frameworks, security and hardware tooling, and delivery practices used by Patrick Ulad-Lieu: Python, JavaScript, Java, SQL, VBA, PowerShell, REST APIs, TeamDynamix, and more.',
    priority: 0.8,
    render: () => <Stack page />,
  },
  {
    path: '/projects/', nav: 'Projects',
    title: `Projects & Case Studies — ${NAME} | Software Engineer`,
    description: 'Case studies by Patrick Ulad-Lieu: a hardware lifecycle forecast for 30,000+ employees, a 100,000+ asset TeamDynamix migration, and Windows 11 readiness reporting for 14,000+ devices.',
    priority: 0.9,
    render: () => <Projects page />,
  },
  ...projectPages,
  {
    path: '/experience/', nav: 'Experience',
    title: `Experience — ${NAME} | IT Project Manager, Data Analyst, Consultant`,
    description: 'Work history of Patrick Ulad-Lieu: City of Philadelphia Office of Innovation & Technology, Deloitte, security and hardware R&D consulting, and leadership roles, grouped by discipline.',
    priority: 0.9,
    render: () => <Experience page />,
  },
  {
    path: '/education/', nav: 'Education',
    title: `Education & Certifications — ${NAME} | BS Computer Science`,
    description: 'Patrick Ulad-Lieu holds a BS in Computer Science from Wilmington University (2026) and an AS from Community College of Philadelphia, plus freeCodeCamp certifications, scholarships, and awards.',
    priority: 0.7,
    render: () => <Credentials page />,
  },
  {
    path: '/recommendations/', nav: 'Testimonials',
    title: `Recommendations — What Colleagues Say About ${NAME}`,
    description: 'LinkedIn recommendations for Patrick Ulad-Lieu from managers, colleagues, and mentees on his engineering, analytics, and leadership work.',
    priority: 0.6,
    render: () => <Recommendations page />,
  },
  {
    path: '/notes/', nav: 'Notes',
    title: `Notes on Forecasting, Data Migration & Automation — ${NAME}`,
    description: 'Practical write-ups by Patrick Ulad-Lieu on hardware lifecycle forecasting, moving IT asset tracking off spreadsheets, and automating reporting with Excel and VBA.',
    priority: 0.7,
    render: () => <Notes page />,
  },
  ...notePages,
  {
    path: '/contact/', nav: 'Contact',
    title: `Contact ${NAME} — Software Engineer in Philadelphia`,
    description: 'Hiring for a software engineering role, need a data pipeline automated, or want a technical advisor? Contact Patrick Ulad-Lieu in Greater Philadelphia.',
    priority: 0.8,
    render: () => <Contact page />,
  },
]

// The home page is every section in one scroll. Each wrapper's data-path is the section's own page,
// which the address bar switches to while that section is on screen (see useScrollRoute in App.tsx).
function Home() {
  return (
    <>
      <div data-path="/"><Hero /><Pillars /></div>
      <div data-path="/skills/"><Stack /></div>
      <div data-path="/projects/"><Projects /></div>
      <div data-path="/experience/"><Experience /></div>
      <div data-path="/education/"><Credentials /></div>
      <div data-path="/recommendations/"><Recommendations /></div>
      <div data-path="/notes/"><Notes /></div>
      <div data-path="/contact/" className="pt-20 sm:pt-[110px]"><Contact /></div>
    </>
  )
}

export const normalizePath = (p: string) => (p.endsWith('/') ? p : `${p}/`)
export const findPage = (path: string) => PAGES.find((p) => p.path === normalizePath(path)) ?? PAGES[0]
