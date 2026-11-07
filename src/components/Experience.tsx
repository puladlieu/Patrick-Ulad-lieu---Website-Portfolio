import { useEffect } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EXP_FILTERS, EXPERIENCE, PROJECTS, type Role } from '@/data/profile'
import { roleId } from '@/lib/slug'
import { cn } from '@/lib/utils'
import { Disclosure } from './Disclosure'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')
const CATEGORIES = EXP_FILTERS.filter((f) => f.key !== 'all')

function RoleCard({ x }: { x: Role }) {
  const n = EXPERIENCE.length - EXPERIENCE.indexOf(x)
  const related = PROJECTS.filter((p) => p.role === x.role)
  // Each role is its own expandable card: the header row always shows, details open on click.
  // Native <details> keeps every bullet in the HTML for search engines even when closed.
  return (
    <details id={roleId(x.role)} open={x.featured} className="group/role panel cut scroll-mt-[120px]">
      <summary className="grid cursor-pointer list-none select-none min-[900px]:grid-cols-[200px_1fr] [&::-webkit-details-marker]:hidden">
        <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-line bg-chip px-[22px] py-[18px] min-[900px]:block min-[900px]:border-r min-[900px]:border-b-0 min-[900px]:p-6', x.featured && 'bg-foreground text-background')}>
          <div className="font-brand text-2xl leading-none">{pad(n)}</div>
          <Badge variant={x.active ? 'current' : 'past'} className="min-[900px]:mt-3.5">{x.active ? 'CURRENT' : 'PAST'}</Badge>
          <div className={cn('label min-[900px]:mt-3.5', x.featured && 'text-white/60')}>{x.period}</div>
          {x.note && <div className={cn('w-full text-[13px] text-dim min-[900px]:mt-1.5', x.featured && 'text-white/60')}>{x.note}</div>}
        </div>
        <div className="flex items-start gap-4 p-5 sm:px-7 sm:py-6">
          <div className="min-w-0 flex-1">
            {x.featured && <div className="label mb-2 text-primary!">★ Primary role</div>}
            <h4 className="font-heading text-[25px] leading-[1.1] font-bold tracking-[.03em] uppercase">{x.role}</h4>
            <div className="mt-1 font-heading text-base leading-snug font-semibold tracking-[.08em] text-primary uppercase">{x.org}</div>
            <div className="label mt-3 group-open/role:hidden">{x.bullets.length} highlights · tap to expand</div>
          </div>
          <ChevronDown aria-hidden className="mt-1 size-5 flex-none text-primary transition-transform group-open/role:rotate-180" />
        </div>
      </summary>
      <div className="border-t border-line px-5 pb-5 sm:px-7 sm:pb-6 min-[900px]:ml-[200px] min-[900px]:border-l">
        <ul className="mt-4 grid gap-[9px]">
          {x.bullets.map((b) => (
            <li key={b} className="grid grid-cols-[18px_1fr] text-[15px] text-text-2 before:font-heading before:text-lg before:leading-[1.3] before:font-bold before:text-primary before:content-['›']">{b}</li>
          ))}
        </ul>
        {related.length > 0 && (
          <div className="mt-[18px]">
            <div className="label">Case studies from this role</div>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {related.map((p) => (
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
    </details>
  )
}

export function Experience({ page = false }: { page?: boolean }) {
  // Links like /experience/#role-id open the collapsed category that holds that role
  useEffect(() => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (!target) return
    // Open the role itself and every group around it, then bring it into view
    for (let d: Element | null = target; d; d = d.parentElement?.closest('details') ?? null) if (d instanceof HTMLDetailsElement) d.open = true
    // Wait for the opened groups to lay out (and the page's entrance animation) before scrolling
    const t = window.setTimeout(() => target.scrollIntoView(), 150)
    return () => window.clearTimeout(t)
  }, [])

  // Each role sits under its primary category; every category is a collapsible group
  const groups = CATEGORIES.map((c) => ({ ...c, roles: EXPERIENCE.filter((x) => x.tags[0] === c.key) })).filter((g) => g.roles.length)
  return (
    <section id="experience" className={cn('py-20 sm:py-[110px]', page && 'pt-[120px] sm:pt-[150px]')} aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead h1={page} id="experience" num="03" eyebrow="Career" title="Experience" desc="Municipal government IT, consulting, security, and applied hardware R&D, grouped by discipline. Open a category to read each role." />
        <Reveal className="grid gap-4">
          {groups.map((g, i) => (
            <Disclosure key={g.key} defaultOpen={i === 0} kicker={`Category ${pad(i + 1)}`} title={g.label} count={`${pad(g.roles.length)} ${g.roles.length === 1 ? 'role' : 'roles'}`}>
              <ol className="grid gap-3.5">
                {g.roles.map((x) => <li key={x.role + x.org}><RoleCard x={x} /></li>)}
              </ol>
            </Disclosure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
