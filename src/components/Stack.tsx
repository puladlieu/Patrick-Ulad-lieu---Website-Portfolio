import { Badge } from '@/components/ui/badge'
import { STACK } from '@/data/profile'
import { Disclosure } from './Disclosure'
import { HexIcon } from './icons'
import { Reveal } from './motion'
import { SectionHead } from './SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

export function Stack() {
  return (
    <section id="stack" className="py-20 pt-[120px] sm:py-[110px] sm:pt-[150px]" aria-labelledby="stack-title">
      <div className="wrap">
        <SectionHead h1 id="stack" num="01" eyebrow="Skills" title="Tech stack" desc="Languages, frameworks, systems, and engineering practices I use day to day. Open a category to see everything in it." />
        <Reveal className="grid items-start gap-4 lg:grid-cols-2">
          {STACK.map((c, i) => (
            <Disclosure key={c.key} defaultOpen={i < 2} icon={<HexIcon name={c.icon} />} kicker={`Category ${pad(i + 1)}`} title={c.title} count={`[${pad(c.items.length)}]`}>
              <ul className="flex flex-wrap gap-2">
                {c.items.map((t) => <li key={t}><Badge>{t}</Badge></li>)}
              </ul>
            </Disclosure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
