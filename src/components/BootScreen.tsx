import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EXPERIENCE } from '@/data/profile'
import { PMark } from './icons'

const LINES = [
  ['> LOADING PORTFOLIO', ''],
  ['> PATRICK ................ ', 'SOFTWARE ENGINEER'],
  ['> EXPERIENCE ............. ', `${EXPERIENCE.length} ROLES`],
  ['> CREDENTIALS ............ ', 'VERIFIED'],
  ['> ', 'READY'],
]

// Intro shown once per visit. index.html adds `booting` to <html> before React loads
// (CSS paints a blank cover), and this component takes over once hydrated.
export function BootScreen() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (document.documentElement.classList.contains('booting')) setShow(true)
  }, [])

  const done = step > LINES.length

  useEffect(() => {
    if (!show) return
    const skip = () => setStep(LINES.length + 1)
    const timer = setInterval(() => setStep((s) => s + 1), 75)
    window.addEventListener('keydown', skip, { once: true })
    return () => { clearInterval(timer); window.removeEventListener('keydown', skip) }
  }, [show])

  useEffect(() => {
    if (!show || !done) return
    setShow(false)
    document.documentElement.classList.remove('booting')
    try { sessionStorage.setItem('booted', '1') } catch { /* storage blocked */ }
  }, [show, done])

  return (
    <AnimatePresence>
      {show && (
        <m.div
          role="presentation"
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-[#f6f6f4]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setStep(LINES.length + 1)}
        >
          <div className="w-[min(560px,calc(100%-48px))]">
            <div className="mb-[26px] flex items-center gap-4">
              <PMark className="size-[52px] text-[#0c0c0d]" />
              <div>
                <div className="font-brand text-[18px] leading-none tracking-[.08em] text-[#0c0c0d]">PATRICK</div>
                <div className="mt-[7px] font-brand text-[8px] leading-none tracking-[.42em] text-[#43474c]">SYSTEMS ENGINEERING</div>
              </div>
            </div>
            <div className="min-h-[150px] font-mono text-[13px] leading-[1.9] tracking-[.06em] text-[#43474c]">
              {LINES.slice(0, step).map(([a, b]) => (
                <m.div key={a + b} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>{a}<span className="text-[#c80000]">{b}</span></m.div>
              ))}
            </div>
            <div className="mt-[18px] h-[3px] overflow-hidden bg-black/10">
              <m.i className="block h-full bg-[#c80000]" animate={{ width: `${(Math.min(step, LINES.length) / LINES.length) * 100}%` }} transition={{ ease: 'linear', duration: 0.07 }} />
            </div>
            <div className="mt-3.5 font-mono text-[11px] tracking-[.14em] text-[#6f747a]">CLICK OR PRESS ANY KEY TO SKIP</div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
