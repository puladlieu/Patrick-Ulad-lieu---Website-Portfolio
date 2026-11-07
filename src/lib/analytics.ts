// Google Analytics 4. Does nothing until VITE_GA_ID (e.g. G-XXXXXXXXXX) is set, so local builds and
// previews never send data. The build also opens the CSP for Google only when the ID is set.
const GA_ID: string = import.meta.env.VITE_GA_ID || ''

type Gtag = (...args: unknown[]) => void
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag } }

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return
  window.dataLayer = window.dataLayer || []
  // gtag must push the arguments object itself, not an array copy
  window.gtag = function gtag() { window.dataLayer!.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)

  // Conversion signals: anyone reaching out by email, LinkedIn, or résumé download
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a')
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('mailto:')) track('contact_email_click')
    else if (href.includes('linkedin.com')) track('linkedin_click')
    else if (a.hasAttribute('download')) track('resume_download')
  })
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params)
}
