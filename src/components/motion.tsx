import { m, type HTMLMotionProps, type Variants } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (gap = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
})

// Fades content up the first time it scrolls into view.
// `data-reveal` lets CSS show it anyway when JavaScript is off (see index.css).
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <m.div
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { duration: 0.7, ease: EASE, delay } } }}
      {...props}
    />
  )
}

// Container whose direct `motion` children stagger in
export function StaggerGroup({ gap, ...props }: HTMLMotionProps<'div'> & { gap?: number }) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={stagger(gap)}
      {...props}
    />
  )
}
