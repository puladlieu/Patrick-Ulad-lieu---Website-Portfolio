// Public site settings. Values come from .env (see .env.example).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://patrickuladlieu.netlify.app').replace(/\/$/, '')

// Free key from https://web3forms.com. Without it the contact form falls back to opening the visitor's email app.
export const WEB3FORMS_KEY: string = import.meta.env.VITE_WEB3FORMS_KEY || ''
