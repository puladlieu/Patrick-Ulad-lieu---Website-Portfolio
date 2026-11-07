import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EXP_FILTERS, EXPERIENCE, PROJECTS } from '@/data/profile'
import { roleId } from '@/lib/slug'
import { cn } from '@/lib/utils'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')
// Roles shown before "Show earlier roles" on the All tab; the rest stay in the HTML for search engines
const FIRST = 6

export function Experience({ page = false }: { page?: boolean }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const shown = EXPERIENCE.filter((x) => filter === 'all' || x.tags.includes(filter))
  const collapsed = filter === 'all' && !expanded && shown.length > FIRST
  const visible = collapsed ? FIRST : shown.length
  // Each role card opens on click; the primary role starts open. Closed cards keep their text in the HTML for search engines.
  const [open, setOpen] = useState<Set<string>>(() => new Set(EXPERIENCE.filter((x) => x.featured).map((x) => roleId(x.role))))
  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n })
  const allOpen = shown.every((x) => open.has(roleId(x.role)))
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(EXPERIENCE.map((x) => roleId(x.role))))

  // Links like /experience/#it-project-manager-data-analyst open that role, even if it sits behind "Show earlier roles"
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    const i = EXPERIENCE.findIndex((x) => roleId(x.role) === id)
    if (i < 0) return
    setOpen((s) => new Set(s).add(id))
    if (i >= FIRST) setExpanded(true)
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 150)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section id="experience" className={cn('py-20 sm:py-[110px]', page && 'pt-[120px] sm:pt-[150px]')} aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead h1={page} id="experience" num="04" eyebrow="Career" title="Experience" desc="Municipal government IT, consulting, security, and applied hardware R&D, from early internships to current roles." />
        <Reveal className="mb-[18px] flex flex-wrap items-center justify-between gap-3.5">
          <Tabs value={filter} onValueChange={(v) => setFilter(String(v))}>
            <TabsList aria-label="Filter roles">
              {EXP_FILTERS.map((f) => <TabsTrigger key={f.key} value={f.key}>{f.label}</TabsTrigger>)}
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-4">
            <span className="label" aria-live="polite">Showing {pad(visible)} / {pad(EXPERIENCE.length)} roles</span>
            <Button variant="outline" size="sm" onClick={toggleAll}>{allOpen ? 'Collapse all' : 'Expand all'}</Button>
          </div>
        </Reveal>

        <ol className="grid gap-3.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((x, idx) => {
              const n = EXPERIENCE.length - EXPERIENCE.indexOf(x)
              const id = roleId(x.role)
              const isOpen = open.has(id)
              return (
                <m.li
                  key={x.role + x.org}
                  className={cn(collapsed && idx >= FIRST && 'hidden')}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Reveal>
                    <article
                      id={id}
                      className="panel cut grid cursor-pointer scroll-mt-[120px] min-[900px]:grid-cols-[200px_1fr]"
                      onClick={(e) => {
                        // Clicking anywhere on the card toggles it, except links, buttons, and selected text in the open details
                        const t = e.target as Element
                        if (t.closest('a, button, [data-details]') || getSelection()?.toString()) return
                        toggle(id)
                      }}
                    >
                      <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-line bg-chip px-[22px] py-[18px] min-[900px]:block min-[900px]:border-r min-[900px]:border-b-0 min-[900px]:p-6', x.featured && 'bg-foreground text-background')}>
                        <div className="font-brand text-2xl leading-none">{pad(n)}</div>
                        <Badge variant={x.active ? 'current' : 'past'} className="min-[900px]:mt-3.5">{x.active ? 'CURRENT' : 'PAST'}</Badge>
                        <div className={cn('label min-[900px]:mt-3.5', x.featured && 'text-white/60')}>{x.period}</div>
                        {x.note && <div className={cn('w-full text-[13px] text-dim min-[900px]:mt-1.5', x.featured && 'text-white/60')}>{x.note}</div>}
                      </div>
                      <div className="p-5 sm:px-7 sm:py-6">
                        {x.featured && <div className="label mb-2 text-primary!">★ Primary role</div>}
                        <h3 className="font-heading text-[25px] leading-[1.1] font-bold tracking-[.03em] uppercase">
                          <button
                            type="button"
                            className="flex w-full cursor-pointer items-start justify-between gap-4 text-left uppercase"
                            aria-expanded={isOpen}
                            aria-controls={`${id}-details`}
                            onClick={() => toggle(id)}
                          >
                            <span>{x.role}</span>
                            <ChevronDown className={cn('mt-0.5 size-6 flex-none text-primary transition-transform duration-300', isOpen && 'rotate-180')} aria-hidden="true" />
                          </button>
                        </h3>
                        <div className="mt-1 font-heading text-base leading-snug font-semibold tracking-[.08em] text-primary uppercase">{x.org}</div>
                        {!isOpen && <div className="label mt-3">{x.bullets.length} highlights · click to expand</div>}
                        <div
                          id={`${id}-details`}
                          data-details
                          inert={!isOpen}
                          className={cn('grid cursor-auto transition-[grid-template-rows,opacity] duration-300 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
                        >
                        <div className="overflow-hidden">
                        <ul className="mt-4 grid gap-[9px]">
                          {x.bullets.map((b) => (
                            <li key={b} className="grid grid-cols-[18px_1fr] text-[15px] text-text-2 before:font-heading before:text-lg before:leading-[1.3] before:font-bold before:text-primary before:content-['›']">{b}</li>
                          ))}
                        </ul>
                        {PROJECTS.some((p) => p.role === x.role) && (
                          <div className="mt-[18px]">
                            <div className="label">Case studies from this role</div>
                            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                              {PROJECTS.filter((p) => p.role === x.role).map((p) => (
                                <li key={p.slug}>
                                  <a href={`/projects/${p.slug}/`} className="inline-flex items-center gap-1.5 font-heading text-[15px] font-semibold tracking-[.08em] text-primary uppercase hover:underline">{p.title} <ArrowRight className="size-3.5" /></a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <ul className="mt-[18px] flex flex-wrap gap-2 border-t border-dashed border-line-2 pt-4">
                          {x.tech.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                        </ul>
                        </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </m.li>
              )
            })}
          </AnimatePresence>
        </ol>
        {filter === 'all' && shown.length > FIRST && (
          <div className="mt-5 flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
              {expanded ? 'Show fewer roles' : `Show earlier roles (${shown.length - FIRST})`}
              <ChevronDown className={cn('transition-transform', expanded && 'rotate-180')} />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
