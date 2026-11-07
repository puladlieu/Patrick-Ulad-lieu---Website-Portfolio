import { createElement } from 'react'
import type { ExternalToast } from 'sonner'

// Pop-up messages are only used by the contact section, so their code (sonner) loads on first use
// instead of being part of every page's first download.
type Toast = typeof import('sonner').toast
let ready: Promise<Toast> | null = null

function load() {
  return (ready ??= Promise.all([import('sonner'), import('@/components/ui/sonner'), import('react-dom/client')]).then(
    async ([{ toast }, { Toaster }, { createRoot }]) => {
      const el = document.createElement('div')
      document.body.appendChild(el)
      createRoot(el).render(createElement(Toaster, { position: 'bottom-right' }))
      await new Promise((r) => setTimeout(r, 60)) // let the toaster mount before the first message
      return toast
    },
  ))
}

const show = (kind: 'success' | 'error' | 'info') => (message: string, opts?: ExternalToast) => {
  void load().then((t) => t[kind](message, opts))
}

export const toast = { success: show('success'), error: show('error'), info: show('info') }
