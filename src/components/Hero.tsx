import { useEffect, useRef, useState } from 'react'
import { animate, m, useInView } from 'framer-motion'
import { ArrowRight, FileDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { PERSON, STATS } from '@/data/profile'
import { cn } from '@/lib/utils'
import { PMark } from './icons'

const pad = (n: number) => String(n).padStart(2, '0')
// Above-the-fold entrance runs in CSS so the text is visible before JavaScript loads
const enter = 'animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700'

function IdCard() {
  const fields = [
    ['Role', PERSON.role],
    ['Specialty', PERSON.specialty],
    ['Base', PERSON.location],
    ['Work style', PERSON.workStyle],
  ]
  return (
    <aside aria-label="Profile summary" className={cn('relative mx-auto mb-2.5 w-full max-w-[440px] border-[1.5px] border-foreground bg-card shadow-[6px_6px_0_var(--foreground)] min-[900px]:mr-0 min-[900px]:ml-auto sm:shadow-[10px_10px_0_var(--foreground)]', enter, 'delay-300')}>
      <div className="flex justify-between gap-3 border-b-[3px] border-primary bg-ink px-[18px] py-3 font-mono text-[11px] leading-tight tracking-[.2em] text-white uppercase">
        <span>Profile</span><span className="text-white/55">{PERSON.role}</span>
      </div>
      <div className="grid grid-cols-[92px_1fr] gap-4 px-[18px] pt-[22px] pb-[18px] sm:grid-cols-[118px_1fr] sm:gap-5">
        <div className="id-photo grid aspect-[3/4] place-items-center overflow-hidden border border-line-2">
          {/* Headshot comes from PERSON.photo in profile.ts; the P logo shows until one is set */}
          {PERSON.photo
            ? <img src={PERSON.photo} alt={`${PERSON.name}, headshot`} width={236} height={315} className="size-full object-cover" />
            : <PMark className="w-[56%] text-foreground" />}
        </div>
        <dl className="m-0 grid content-start gap-[9px]">
          <div>
            <dt className="font-mono text-[10px] leading-tight tracking-[.18em] text-muted-foreground uppercase">Name</dt>
            <dd className="mt-[3px] font-brand text-[19px] leading-[1.2] uppercase">Patrick<br /><span className="whitespace-nowrap">Ulad-Lieu</span></dd>
          </div>
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[10px] leading-tight tracking-[.18em] text-muted-foreground uppercase">{k}</dt>
              <dd className="mt-[3px] font-heading text-[16px] leading-tight font-semibold tracking-[.04em] uppercase">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[10px] leading-tight tracking-[.18em] text-muted-foreground uppercase">Education</dt>
            <dd className="mt-[3px] font-heading text-[16px] leading-tight font-semibold tracking-[.04em]">BS COMPUTER SCIENCE · 2026</dd>
          </div>
        </dl>
      </div>
      <div className="px-[18px] pb-4">
        <div className="label">Core focus</div>
        <ul className="mt-2">
          {PERSON.focus.map((f, i) => (
            <li key={f} className="group flex items-center gap-3 border-t border-line py-[9px] font-heading text-[15px] leading-tight font-semibold tracking-[.06em] uppercase">
              <span className="font-mono text-[11px] text-primary">{pad(i + 1)}</span>{f}
              <i className="ml-auto size-[7px] flex-none bg-primary transition-transform group-hover:rotate-45" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3.5 border-t border-dashed border-line-2 px-[18px] py-3.5">
        <div className="flex items-center gap-2 font-mono text-[11px] leading-snug tracking-[.14em] uppercase"><span className="status-dot" />Available · Remote OK</div>
        {/* Real QR code: scanning it with a phone opens the LinkedIn profile; clicking it does the same */}
        <a
          href={PERSON.linkedin}
          target="_blank"
          rel="noopener noreferrer me"
          title="Scan or click to open my LinkedIn"
          className="group flex flex-none items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="hidden text-right font-mono text-[10px] leading-tight tracking-[.16em] text-muted-foreground uppercase sm:block">Scan for<br /><span className="text-primary">LinkedIn</span></span>
          <img src="/linkedin-qr.svg" alt="QR code linking to Patrick Ulad-Lieu's LinkedIn profile" width={64} height={64} className="size-14 border border-line-2 sm:size-16" />
        </a>
      </div>
    </aside>
  )
}

// Counts up when scrolled into view. The final number is in the HTML for search engines and no-JS visitors.
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Only animate numbers that start off-screen, so visible ones never flash to zero
    if (el.getBoundingClientRect().top > window.innerHeight) { el.textContent = '0'; setArmed(true) }
  }, [])

  useEffect(() => {
    if (!armed || !inView || !ref.current) return
    const el = ref.current
    const controls = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString('en-US') } })
    return () => controls.stop()
  }, [armed, inView, value])

  return <span ref={ref}>{value.toLocaleString('en-US')}</span>
}

function Meter({ fill }: { fill: number }) {
  return (
    <m.div className="mt-[18px] grid grid-cols-[repeat(24,1fr)] gap-0.5" initial="off" whileInView="on" viewport={{ once: true }} variants={{ on: { transition: { staggerChildren: 0.045 } } }} aria-hidden>
      {Array.from({ length: 24 }, (_, i) => (
        <i key={i} className="relative h-1.5 bg-line">
          {i < fill && <m.i data-reveal className="absolute inset-0 bg-primary" variants={{ off: { opacity: 0 }, on: { opacity: 1 } }} />}
        </i>
      ))}
    </m.div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative pt-[140px] lg:pt-40" aria-labelledby="hero-title">
      <div className="wrap relative z-[1]">
        <div className="grid items-center gap-12 min-[900px]:grid-cols-[1.25fr_1fr]">
          <div>
            <span className={cn('inline-flex items-center gap-2.5 border border-line-2 bg-card px-3.5 py-2 font-mono text-[12px] leading-snug tracking-[.12em] uppercase', enter)}>
              <span className="status-dot" />{PERSON.status}
            </span>
            <h1 id="hero-title" className="mt-7 font-brand text-[clamp(30px,9.4vw,44px)] leading-[1.08] tracking-[.01em] uppercase sm:text-[clamp(38px,5.6vw,78px)]">
              <span className="sr-only">{PERSON.name}, {PERSON.headline}. </span>
              <span aria-hidden className={cn('block', enter, 'delay-75')}>Engineer.</span>
              <span aria-hidden className={cn('stroke-word block', enter, 'delay-150')}>Automate.</span>
              <span aria-hidden className={cn('red-word block', enter, 'delay-200')}>Deploy.</span>
            </h1>
            <p className={cn('mt-[30px] font-heading text-[22px] leading-tight font-bold tracking-[.12em] uppercase', enter, 'delay-300')}>
              {PERSON.role} <span className="mx-2 text-primary">//</span> Systems Automation Specialist
            </p>
            <p className={cn('mt-3.5 max-w-[560px] text-[17px] text-muted-foreground', enter, 'delay-300')}>{PERSON.summary}</p>
            <div className={cn('mt-[18px] flex flex-wrap gap-x-[22px] gap-y-2', enter, 'delay-500')}>
              <span className="label">Location <b className="font-normal text-foreground">{PERSON.location}</b></span>
              <span className="label">Education <b className="font-normal text-foreground">BS Computer Science</b></span>
              <span className="label">Work style <b className="font-normal text-foreground">{PERSON.workStyle}</b></span>
            </div>
            <div className={cn('mt-[34px] flex flex-wrap gap-3', enter, 'delay-500')}>
              <a href="/experience/" className={cn(buttonVariants(), 'group')}>
                View experience <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/contact/" className={buttonVariants({ variant: 'outline' })}>Get in touch</a>
              <a href={PERSON.github} target="_blank" rel="noopener noreferrer me" className={buttonVariants({ variant: 'outline' })}>GitHub</a>
              {PERSON.resume && (
                <a href={PERSON.resume} download className={cn(buttonVariants({ variant: 'outline' }), 'group')}>
                  Résumé <FileDown className="transition-transform group-hover:translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
          <IdCard />
        </div>

        <div className="dark mt-[70px] grid grid-cols-2 gap-px border border-line bg-line! lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={cn('relative bg-background px-4 pt-5 pb-[18px] sm:px-[22px] sm:pt-6 sm:pb-[22px]', i === 0 && 'shadow-[inset_4px_0_0_var(--primary)]')}>
              <span className="absolute top-3.5 right-4 font-mono text-[10px] tracking-[.14em] text-dim">M-{pad(i + 1)}</span>
              <div className="label pr-8">{s.label}</div>
              <div className="mt-3.5 font-brand text-[22px] leading-none sm:text-[clamp(26px,3vw,38px)]">
                <CountUp value={s.value} />
                <span className="ml-1 text-[.55em] text-primary">{s.suffix}</span>
              </div>
              <Meter fill={s.fill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
