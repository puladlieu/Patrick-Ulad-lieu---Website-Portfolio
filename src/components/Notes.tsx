import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { NOTES } from '@/data/notes'
import { PERSON, PROJECTS } from '@/data/profile'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function Notes() {
  return (
    <section id="notes" className="py-20 pt-[120px] sm:py-[110px] sm:pt-[150px]" aria-labelledby="notes-title">
      <div className="wrap">
        <SectionHead h1 id="notes" num="06" eyebrow="Writing" title="Notes" desc="Practical write-ups on forecasting, data migration, and automation, drawn from real projects." />
        <Reveal className="grid gap-4 lg:grid-cols-2">
          {NOTES.map((n) => (
            <a key={n.slug} href={`/notes/${n.slug}/`} className="panel cut group flex flex-col p-6 transition-colors hover:text-primary sm:p-8">
              <time dateTime={n.date} className="label">{fmt(n.date)}</time>
              <h2 className="mt-3 font-heading text-[26px] leading-[1.1] font-bold tracking-[.03em] uppercase">{n.title}</h2>
              <p className="mt-3 flex-1 text-text-2 group-hover:text-foreground">{n.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-heading text-base font-semibold tracking-[.12em] text-primary uppercase">Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export function NotePost({ slug }: { slug: string }) {
  const n = NOTES.find((x) => x.slug === slug)!
  const project = PROJECTS.find((p) => p.slug === n.project)
  return (
    <article className="py-20 pt-[120px] sm:py-[110px] sm:pt-[150px]">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="label mb-6">
          <a href="/notes/" className="hover:text-primary">Notes</a> <span className="text-primary">/</span> {n.title}
        </nav>
        <div className="mx-auto max-w-[760px]">
          <header>
            <h1 className="font-brand text-[clamp(24px,4vw,40px)] leading-[1.15] uppercase">{n.title}</h1>
            <p className="label mt-4">By {PERSON.name} · <time dateTime={n.date}>{fmt(n.date)}</time></p>
            <ul className="mt-4 flex flex-wrap gap-2">{n.tags.map((t) => <li key={t}><Badge>{t}</Badge></li>)}</ul>
          </header>
          <div className="mt-10 grid gap-5 text-[17px] leading-[1.7] text-text-2">
            {n.body.map((b, i) => (
              b.h ? <h2 key={i} className="mt-4 font-heading text-[24px] leading-tight font-bold tracking-[.03em] text-foreground uppercase">{b.h}</h2>
              : b.list ? <ul key={i} className="grid gap-2">{b.list.map((li) => <li key={li} className="grid grid-cols-[18px_1fr] before:font-heading before:font-bold before:text-primary before:content-['›']">{li}</li>)}</ul>
              : <p key={i}>{b.p}</p>
            ))}
          </div>
          {project && (
            <a href={`/projects/${project.slug}/`} className="panel cut mt-12 flex items-center justify-between gap-3 p-6 hover:text-primary">
              <span><span className="label block">Related case study</span><span className="font-heading text-xl font-bold tracking-[.03em] uppercase">{project.title}</span></span>
              <ArrowRight className="size-5 flex-none" />
            </a>
          )}
          <p className="mt-8 text-muted-foreground">Want help with something similar? <a href="/contact/" className="text-primary underline">Get in touch</a>.</p>
        </div>
      </div>
    </article>
  )
}
