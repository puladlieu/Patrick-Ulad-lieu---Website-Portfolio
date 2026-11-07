import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CERTS, EDUCATION, HONORS } from '@/data/profile'
import { HexIcon } from './icons'
import { fadeUp, Reveal, StaggerGroup } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')
// College-level awards show first; high school ones sit behind a toggle (still in the HTML)
const FIRST_HONORS = 4

export function Credentials() {
  const [allHonors, setAllHonors] = useState(false)
  return (
    <section id="credentials" className="py-20 pt-[120px] sm:py-[110px] sm:pt-[150px]" aria-labelledby="credentials-title">
      <div className="wrap">
        <SectionHead h1 id="credentials" num="04" eyebrow="Education" title="Education & credentials" desc="Computer science degrees and coursework, plus certifications, scholarships, and awards." />

        <StaggerGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {EDUCATION.map((ed, i) => (
            <m.article key={ed.institution} data-reveal variants={fadeUp} className="panel cut brackets p-[22px] sm:p-[30px]">
              {i === 0 && <><span className="bk tl" /><span className="bk tr" /><span className="bk bl" /><span className="bk br" /></>}
              <div className="flex items-center justify-between border-b border-line pb-3.5">
                <strong className="font-brand text-4xl leading-none font-normal text-primary">{ed.short}</strong>
                <span className="label">{ed.year}</span>
              </div>
              <h3 className="mt-[18px] mb-1 font-heading text-[23px] leading-[1.15] font-bold tracking-[.03em] uppercase">{ed.degree}</h3>
              <div className="font-medium">{ed.institution}</div>
              <p className="mt-3 text-muted-foreground">{ed.details}</p>
              <div className="mt-5 border-t border-dashed border-line-2 pt-3.5">
                <div className="label">{ed.listLabel}</div>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {ed.list.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                </ul>
              </div>
            </m.article>
          ))}
        </StaggerGroup>

        <StaggerGroup gap={0.06} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c) => (
            <m.article key={c.title} data-reveal variants={fadeUp} whileHover={{ y: -3 }} className="panel cut grid grid-cols-[44px_1fr] items-start gap-4 p-[22px]">
              <HexIcon name={c.icon} className="bg-foreground text-background" />
              <div>
                <h3 className="font-heading text-[18px] leading-[1.15] font-bold tracking-[.03em] uppercase">{c.title}</h3>
                <div className="mt-1.5 text-sm text-muted-foreground">{c.issuer}</div>
                {c.id && <span className="mt-2.5 inline-block border border-line px-[7px] py-[3px] font-mono text-[11px] break-all text-dim">ID {c.id}</span>}
              </div>
            </m.article>
          ))}
        </StaggerGroup>

        <Reveal className="mt-11 mb-3.5 flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-[23px] leading-[1.15] font-bold tracking-[.03em] uppercase">Honors &amp; awards</h3>
          <span className="label">[{pad(HONORS.length)}]</span>
        </Reveal>
        <StaggerGroup gap={0.04} className="grid gap-x-8 md:grid-cols-2">
          {HONORS.map((h, i) => (
            <m.div key={h.title} data-reveal variants={fadeUp} className={cn(!allHonors && i >= FIRST_HONORS ? 'hidden' : 'grid', 'grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-line-2 py-3.5')}>
              <span className="font-heading text-[17px] leading-tight font-semibold tracking-[.03em] uppercase">{h.title}</span>
              <span className="font-mono text-[12px] leading-relaxed tracking-[.1em] whitespace-nowrap text-primary">{h.date}</span>
              <span className="col-span-full text-sm text-muted-foreground">{h.issuer}</span>
            </m.div>
          ))}
        </StaggerGroup>
        <div className="mt-4 flex justify-center border-t border-line-2 pt-5">
          <Button variant="outline" size="sm" onClick={() => setAllHonors((v) => !v)} aria-expanded={allHonors}>
            {allHonors ? 'Show fewer' : `Show high school honors (${HONORS.length - FIRST_HONORS})`}
            <ChevronDown className={cn('transition-transform', allHonors && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </section>
  )
}
