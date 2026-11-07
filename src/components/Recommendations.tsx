import { useState } from 'react'
import { m } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { RECS } from '@/data/profile'
import { cn } from '@/lib/utils'
import { fadeUp, StaggerGroup } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')
const initials = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')

function Rec({ r, i }: { r: (typeof RECS)[number]; i: number }) {
  const long = r.text.length > 320
  const [open, setOpen] = useState(false)
  return (
    <m.figure data-reveal variants={fadeUp} layout className="panel cut m-0 flex flex-col p-[22px] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="label">Recommendation {pad(i + 1)}</span>
        <span className="label inline-flex items-center gap-1.5 text-ok!"><BadgeCheck className="size-3.5" />LinkedIn</span>
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] text-text-2">
        <m.p layout="position" className={cn(long && !open && 'clamp-8')}>“{r.text}”</m.p>
        {long && (
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2.5 cursor-pointer font-mono text-[12px] tracking-[.14em] text-primary uppercase">
            {open ? '− Show less' : '+ Read more'}
          </button>
        )}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-[18px]">
        <span aria-hidden className="grid size-11 flex-none place-items-center bg-primary font-brand text-sm text-white">{initials(r.author)}</span>
        <div>
          <cite className="block font-heading text-lg leading-[1.1] font-bold tracking-[.05em] uppercase not-italic">{r.author}</cite>
          <div className="mt-[3px] text-[13px] leading-snug text-muted-foreground">{r.role}</div>
        </div>
      </figcaption>
    </m.figure>
  )
}

export function Recommendations({ page = false }: { page?: boolean }) {
  return (
    <section id="recommendations" className={cn("dark hex-bg-dark relative py-20 sm:py-[110px]", page && 'pt-[120px] sm:pt-[150px]')} aria-labelledby="recommendations-title">
      <div className="wrap relative">
        <SectionHead h1={page} id="recommendations" num="05" eyebrow="Testimonials" title="Recommendations" desc="What managers, colleagues, and mentees say about working with me." />
        <StaggerGroup className="grid items-start gap-4 lg:grid-cols-3">
          {RECS.map((r, i) => <Rec key={r.author} r={r} i={i} />)}
        </StaggerGroup>
      </div>
    </section>
  )
}
