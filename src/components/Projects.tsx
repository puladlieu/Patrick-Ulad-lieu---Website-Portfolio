import { m } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { PROJECTS } from '@/data/profile'
import { HexIcon } from './icons'
import { fadeUp, StaggerGroup } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-[110px]" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead id="projects" num="03" eyebrow="Case studies" title="Selected projects" desc="What I built, why it was needed, and what changed because of it." />
        <StaggerGroup gap={0.12} className="grid gap-5">
          {PROJECTS.map((p, i) => (
            <m.article key={p.title} data-reveal variants={fadeUp} className="panel cut grid overflow-hidden lg:grid-cols-[320px_1fr]" aria-labelledby={`project-${i}`}>
              {/* Metrics rail */}
              <div className="dark relative flex flex-col gap-6 bg-background p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <HexIcon name={p.icon} />
                  <span className="font-brand text-[44px] leading-none text-white/10">{pad(i + 1)}</span>
                </div>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-5 min-[520px]:grid-cols-3 lg:grid-cols-1">
                  {p.metrics.map(([v, k]) => (
                    <div key={k} className="border-l-2 border-primary pl-3.5">
                      <dt className="sr-only">{k}</dt>
                      <dd className="font-brand text-[24px] leading-none sm:text-[26px]">{v}</dd>
                      <div aria-hidden className="mt-1.5 font-mono text-[11px] tracking-[.14em] text-muted-foreground uppercase">{k}</div>
                    </div>
                  ))}
                </dl>
                <div className="label mt-auto">{p.org} · {p.period}</div>
              </div>

              {/* Story */}
              <div className="p-6 sm:p-8">
                <h3 id={`project-${i}`} className="font-heading text-[28px] leading-[1.05] font-bold tracking-[.03em] uppercase">{p.title}</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-[150px_1fr]">
                  <div className="label pt-0.5 text-primary!">The problem</div>
                  <p className="text-text-2">{p.problem}</p>
                  <div className="label pt-0.5 text-primary!">What I built</div>
                  <ul className="grid gap-2">
                    {p.built.map((b) => (
                      <li key={b} className="grid grid-cols-[18px_1fr] text-[15px] text-text-2 before:font-heading before:text-lg before:leading-[1.3] before:font-bold before:text-primary before:content-['›']">{b}</li>
                    ))}
                  </ul>
                  <div className="label pt-0.5 text-primary!">Outcome</div>
                  <p className="font-medium">{p.outcome}</p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-dashed border-line-2 pt-4">
                  {p.tech.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                </ul>
              </div>
            </m.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
