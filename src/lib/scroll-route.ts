import { useEffect, useState } from 'react'
import { PAGES } from '@/pages'

// On the home page, every section is also a real page (/skills/, /experience/, ...).
// While you scroll, the address bar and tab title switch to the section on screen, without reloading.
// Search engines still get one real, pre-rendered page per URL.
const EVENT = 'scrollroute'

export function useScrollRoute(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const sections = [...document.querySelectorAll<HTMLElement>('main [data-path]')]
    let current = location.pathname
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const path = e.target.getAttribute('data-path')!
        if (path === current) continue
        current = path
        history.replaceState(history.state, '', path)
        const page = PAGES.find((p) => p.path === path)
        if (page) document.title = page.title
        window.dispatchEvent(new CustomEvent(EVENT, { detail: path }))
      }
    }, { rootMargin: '-45% 0px -50% 0px' }) // a section counts once it crosses the middle of the screen
    sections.forEach((s) => io.observe(s))

    // Nav links to a section that is on this page scroll to it instead of loading the standalone page
    const onClick = (ev: MouseEvent) => {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return
      const a = (ev.target as Element | null)?.closest?.('a')
      const href = a?.getAttribute('href')
      if (!href || !href.startsWith('/') || href.includes('#')) return
      const target = sections.find((s) => s.getAttribute('data-path') === href)
      if (!target) return
      ev.preventDefault()
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => { io.disconnect(); document.removeEventListener('click', onClick) }
  }, [enabled])
}

// The path of the section on screen (home page) or of the page itself (everywhere else)
export function useActivePath(path: string) {
  const [active, setActive] = useState(path)
  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<string>).detail)
    window.addEventListener(EVENT, on)
    return () => window.removeEventListener(EVENT, on)
  }, [])
  return active
}
