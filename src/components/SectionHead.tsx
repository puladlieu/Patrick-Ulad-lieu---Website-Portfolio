import { Reveal } from './motion'

export function SectionHead({ num, eyebrow, title, desc, id, h1 }: { num: string; eyebrow: string; title: string; desc?: string; id: string; h1?: boolean }) {
  const H = h1 ? 'h1' : 'h2'
  return (
    <Reveal className="mb-11 grid grid-cols-1 items-end gap-x-[22px] sm:grid-cols-[auto_1fr]">
      {num && <div aria-hidden className="outline-num mb-3 font-brand text-[52px] leading-[.85] sm:mb-0 sm:text-[clamp(54px,7vw,96px)]">{num}</div>}
      <div>
        <div className="label text-primary!">{eyebrow}</div>
        <H id={`${id}-title`} className="mt-2 font-brand text-[clamp(15px,4.5vw,26px)] leading-[1.1] uppercase [overflow-wrap:anywhere] sm:text-[clamp(24px,3.2vw,42px)]">
          {title}
        </H>
      </div>
      <div className="col-span-full mt-[22px] flex items-center gap-3 before:h-1 before:w-10 before:bg-primary before:content-[''] after:h-px after:flex-1 after:bg-line-2 after:content-['']" />
      {desc && <p className="col-span-full mt-[18px] max-w-[640px] text-muted-foreground">{desc}</p>}
    </Reveal>
  )
}
