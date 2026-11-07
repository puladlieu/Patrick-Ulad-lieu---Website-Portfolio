import { ArrowRight } from 'lucide-react'
import { PAGES } from '@/pages'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

// Home-page doorway to every section; each card is a plain link to its own page
export function Explore() {
  const cards = PAGES.filter((p) => p.card)
  return (
    <section id="explore" className="py-20 sm:py-[110px]" aria-labelledby="explore-title">
      <div className="wrap">
        <SectionHead id="explore" num="03" eyebrow="Explore" title="Dig into the work" desc="Each topic has its own page: skills, case studies, career history, education, and what colleagues say." />
        <Reveal className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((p, i) => (
            <a key={p.path} href={p.path} className="panel cut group flex flex-col p-6 transition-colors hover:text-primary sm:p-8">
              <span className="label">{String(i + 1).padStart(2, '0')} // {p.nav}</span>
              <h3 className="mt-3 font-heading text-[26px] leading-[1.05] font-bold tracking-[.03em] uppercase">{p.card!.heading}</h3>
              <p className="mt-3 flex-1 text-text-2 group-hover:text-foreground">{p.card!.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-heading text-base font-semibold tracking-[.12em] text-primary uppercase">Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
