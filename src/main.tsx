import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'

initAnalytics()

const root = document.getElementById('root')!
const app = <StrictMode><App path={location.pathname} /></StrictMode>

// Production pages are pre-rendered to HTML (scripts/prerender.ts), so React attaches to that markup.
// The dev server serves an empty root, so it renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
