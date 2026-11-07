import { m } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { PILLARS } from '@/data/profile'
import { HexIcon } from './icons'
import { fadeUp, StaggerGroup } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

export function Pillars() {
  return (
    <section id="pillars" className="dark hex-bg-dark relative py-20 sm:py-[110px]" aria-labelledby="pillars-title">
      <div className="wrap relative">
        <SectionHead id="pillars" num="" eyebrow="Core strengths" title="Engineering pillars" desc="Four disciplines that compound: write the software, feed it clean data, automate the workflow, and connect it to real hardware." />
        <StaggerGroup className="grid gap-4 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <m.article
              key={p.title}
              data-reveal
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="panel cut group overflow-hidden p-[22px] sm:p-[30px]"
            >
              <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-25 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
              <span aria-hidden className="ghost-num pointer-events-none absolute -right-1.5 -bottom-[22px] font-brand text-[120px] leading-none">{pad(i + 1)}</span>
              <div className="flex items-center justify-between">
                <HexIcon name={p.icon} />
                <span className="label">{pad(i + 1)} / 04</span>
              </div>
              <h3 className="mt-[22px] mb-2.5 font-heading text-[26px] leading-[1.05] font-bold tracking-[.03em] uppercase">{p.title}</h3>
              <p className="text-muted-foreground">{p.description}</p>
              <ul className="relative mt-[22px] flex flex-wrap gap-2">
                {p.skills.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
              </ul>
            </m.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
