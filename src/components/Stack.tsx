import { useState } from 'react'
import { AnimatePresence, LayoutGroup, m } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { STACK } from '@/data/profile'
import { cn } from '@/lib/utils'
import { HexIcon } from './icons'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

export function Stack({ page = false }: { page?: boolean }) {
  const [cat, setCat] = useState('all')
  const shown = STACK.filter((c) => cat === 'all' || c.key === cat)

  return (
    <section id="stack" className={cn('py-20 sm:py-[110px]', page && 'pt-[120px] sm:pt-[150px]')} aria-labelledby="stack-title">
      <div className="wrap">
        <SectionHead h1={page} id="stack" num="01" eyebrow="Skills" title="Tech stack" desc="Languages, frameworks, systems, and engineering practices I use day to day. Select a category to filter." />
        <Reveal>
          <Tabs value={cat} onValueChange={(v) => setCat(String(v))}>
            <TabsList aria-label="Skill categories">
              <TabsTrigger value="all">All skills</TabsTrigger>
              {STACK.map((c) => <TabsTrigger key={c.key} value={c.key}>{c.title}</TabsTrigger>)}
            </TabsList>
          </Tabs>
        </Reveal>
        <LayoutGroup>
          <m.div layout className={cn('mt-[22px] grid gap-4', cat === 'all' && 'md:grid-cols-2')}>
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((c, i) => (
                <m.article
                  key={c.key}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('panel cut p-[22px] sm:p-[26px]', cat === 'all' && i === shown.length - 1 && shown.length % 2 === 1 && 'md:col-span-2')}
                >
                  <div className="flex items-center gap-3.5">
                    <HexIcon name={c.icon} />
                    <div>
                      <div className="label">Category {pad(STACK.indexOf(c) + 1)}</div>
                      <h3 className="font-heading text-[21px] leading-[1.1] font-bold tracking-[.08em] uppercase">{c.title}</h3>
                    </div>
                    <span className="label ml-auto">[{pad(c.items.length)}]</span>
                  </div>
                  <ul className="mt-[22px] flex flex-wrap gap-2">
                    {c.items.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
                  </ul>
                </m.article>
              ))}
            </AnimatePresence>
          </m.div>
        </LayoutGroup>
        <p className="mt-8 text-muted-foreground">
          See these skills in use in the <a href="/projects/" className="text-primary underline">case studies</a>, the{' '}
          <a href="/experience/" className="text-primary underline">roles they came from</a>, and the{' '}
          <a href="/education/" className="text-primary underline">coursework behind them</a>.
        </p>
      </div>
    </section>
  )
}
