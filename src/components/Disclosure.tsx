import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Native <details>: expands without JavaScript, and the content stays in the HTML for search engines.
export function Disclosure({ title, kicker, count, icon, defaultOpen, children, className }: {
  title: string; kicker?: string; count?: string; icon?: ReactNode; defaultOpen?: boolean; children: ReactNode; className?: string
}) {
  return (
    <details open={defaultOpen} className={cn('group panel cut', className)}>
      <summary className="flex cursor-pointer list-none items-center gap-3.5 px-[22px] py-[18px] select-none sm:px-7 sm:py-5 [&::-webkit-details-marker]:hidden">
        {icon}
        <div className="min-w-0 flex-1">
          {kicker && <div className="label">{kicker}</div>}
          <h3 className="font-heading text-[21px] leading-[1.1] font-bold tracking-[.08em] uppercase sm:text-[24px]">{title}</h3>
        </div>
        {count && <span className="label">{count}</span>}
        <ChevronDown aria-hidden className="size-5 flex-none text-primary transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-line px-[22px] py-5 sm:px-7 sm:py-6">{children}</div>
    </details>
  )
}
