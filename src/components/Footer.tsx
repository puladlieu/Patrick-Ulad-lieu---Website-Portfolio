import { ArrowUp } from 'lucide-react'
import { PERSON } from '@/data/profile'

export function Footer() {
  return (
    <footer className="dark border-t-[3px] border-primary">
      <div className="wrap flex flex-wrap items-center justify-between gap-3.5 py-[26px]">
        <span className="label">© {new Date().getFullYear()} {PERSON.name} <span className="text-primary">//</span> {PERSON.role}</span>
        <span className="label inline-flex items-center gap-2"><span className="status-dot" />Available for new roles</span>
        <a href="#hero" className="label inline-flex items-center gap-1.5 transition-colors hover:text-primary!">Back to top <ArrowUp className="size-3.5" /></a>
      </div>
    </footer>
  )
}
