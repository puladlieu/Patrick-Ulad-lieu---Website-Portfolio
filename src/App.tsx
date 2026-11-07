import { LazyMotion, MotionConfig } from 'framer-motion'
import { BootScreen } from '@/components/BootScreen'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { findPage } from '@/pages'
import { useScrollRoute } from '@/lib/scroll-route'

// Animation engine loads in its own chunk after the page is visible
const loadMotionFeatures = () => import('@/lib/motion-features').then((r) => r.default)

export default function App({ path }: { path: string }) {
  const page = findPage(path)
  useScrollRoute(page.path === '/')
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <a href="#main" className="sr-only z-[200] bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Skip to content</a>
        {page.path === '/' && <BootScreen />}
        <Header path={page.path} />
        <main id="main">{page.render()}</main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}
