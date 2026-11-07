import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { NAV, PERSON, TICKER } from '@/data/profile'
import { cn } from '@/lib/utils'
import { LinkedInIcon, PMark } from './icons'

const pad = (n: number) => String(n).padStart(2, '0')

export function Header({ path }: { path: string }) {
  // A nav item is current on its own page and on pages beneath it
  const active = NAV.find((n) => path.startsWith(n.href))?.href ?? null
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('dark fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(11,11,12,.97)]! transition-[background-color]', scrolled && 'bg-[rgba(11,11,12,.9)]! backdrop-blur-md')}>
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3" aria-label={`${PERSON.name}, home`}>
          <PMark className="size-[34px] flex-none text-foreground" />
          <span>
            <span className="block font-brand text-[15px] leading-none tracking-[.08em] [text-shadow:2px_2px_0_rgba(0,0,0,.6)] sm:text-[18px]">PATRICK</span>
            <span className="mt-[7px] hidden font-brand text-[8px] leading-none tracking-[.42em] whitespace-nowrap text-muted-foreground sm:block">SYSTEMS ENGINEERING</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex gap-0.5">
            {NAV.map(({ href, label }, i) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active === href ? 'true' : undefined}
                  className={cn('relative block px-3 py-2 font-heading text-[14px] leading-none font-semibold tracking-[.14em] uppercase transition-colors hover:text-foreground', active === href ? 'text-foreground' : 'text-muted-foreground')}
                >
                  <span className="mr-1.5 font-mono text-[10px] text-dim">{pad(i + 1)}</span>
                  {label}
                  {active === href && (
                    <m.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-0.5 bg-primary" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn profile" title="LinkedIn" className={cn(buttonVariants({ variant: 'icon', size: 'icon' }), 'hidden sm:grid')}>
            <LinkedInIcon className="size-[18px]" />
          </a>
          {PERSON.resume
            ? <a href={PERSON.resume} download className={cn(buttonVariants({ size: 'sm' }), 'hidden 2xl:inline-flex')}>Download résumé</a>
            : <a href="/contact/" className={cn(buttonVariants({ size: 'sm' }), 'hidden 2xl:inline-flex')}>Hire as engineer</a>}
          <Button variant="icon" size="icon" className="xl:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            aria-label="Mobile"
            className="overflow-hidden border-t border-line xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="wrap pt-3 pb-5">
              {NAV.map(({ href, label }, i) => (
                <m.li key={href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
                  <a href={href} onClick={() => setOpen(false)} className="flex gap-3 border-b border-line py-3 font-heading text-[17px] leading-none font-semibold tracking-[.14em] uppercase">
                    <span className="font-mono text-[11px] text-primary">{pad(i + 1)}</span>{label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>

      <div className="ticker overflow-hidden border-t border-line bg-primary" aria-hidden="true">
        <div className="ticker-track flex w-max">
          {[...TICKER, ...TICKER].map(([k, v], i) => (
            <span key={i} className="px-7 py-[7px] font-mono text-[11px] leading-none tracking-[.2em] whitespace-nowrap text-white/75 uppercase">
              {k} <b className="font-normal text-white">// {v}</b>
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
