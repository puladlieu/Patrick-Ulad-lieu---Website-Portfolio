import { ChartLine, Code, Cpu, Drone, Layers, Lock, ShieldCheck, Target, Terminal, type LucideIcon } from 'lucide-react'
import type { IconName } from '@/data/profile'
import { cn } from '@/lib/utils'

export const ICONS: Record<IconName, LucideIcon> = {
  code: Code, layers: Layers, cpu: Cpu, target: Target, chart: ChartLine,
  terminal: Terminal, shield: ShieldCheck, lock: Lock, drone: Drone,
}

// Hexagon badge holding a lucide icon
export function HexIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = ICONS[name]
  return (
    <span className={cn('hexagon grid size-11 flex-none place-items-center bg-primary text-white', className)}>
      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
    </span>
  )
}

// Patrick's P mark: white/black letterform with a red wedge
export function PMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M5 3h23l8 8v11l-8 8H15v7H5V3Zm10 9v9h10l2-2v-5l-2-2H15Z" />
      <path fill="var(--primary)" d="M19 37h17V27L19 37Z" />
    </svg>
  )
}

// Lucide dropped brand logos, so LinkedIn is drawn here
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
