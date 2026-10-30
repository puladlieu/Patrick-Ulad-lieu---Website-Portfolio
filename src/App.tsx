import { LazyMotion, MotionConfig } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { BootScreen } from '@/components/BootScreen'
import { Contact } from '@/components/Contact'
import { Credentials } from '@/components/Credentials'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pillars } from '@/components/Pillars'
import { Projects } from '@/components/Projects'
import { Recommendations } from '@/components/Recommendations'
import { Stack } from '@/components/Stack'

// Animation engine loads in its own chunk after the page is visible
const loadMotionFeatures = () => import('@/lib/motion-features').then((r) => r.default)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <a href="#main" className="sr-only z-[200] bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Skip to content</a>
        <BootScreen />
        <Header />
        <main id="main">
          <Hero />
          <Stack />
          <Pillars />
          <Projects />
          <Experience />
          <Credentials />
          <Recommendations />
          <div className="pt-20 sm:pt-[110px]"><Contact /></div>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </LazyMotion>
    </MotionConfig>
  )
}
