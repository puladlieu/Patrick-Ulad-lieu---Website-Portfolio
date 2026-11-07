import { useState, type FormEvent } from 'react'
import { m } from 'framer-motion'
import { Copy, Loader2, Send } from 'lucide-react'
import { toast } from '@/lib/toast'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PERSON, TOPICS } from '@/data/profile'
import { WEB3FORMS_KEY } from '@/lib/site'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { Reveal } from './motion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact({ page = false }: { page?: boolean }) {
  const Title = page ? 'h1' : 'h2'
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(PERSON.email); toast.success('Email copied') }
    catch { toast.error('Could not copy. Select the address instead.') }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const topic = String(fd.get('topic') || TOPICS[0])
    if (!name || !message || !EMAIL_RE.test(email)) {
      setError('Please enter your name, a valid email, and a message.')
      return
    }
    setError('')
    const subject = `[Portfolio] ${topic} — ${name}`

    // No form key configured: hand off to the visitor's email app and keep what they typed
    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:${PERSON.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`
      toast.info(`Your email app should open with this message. If it doesn't, email ${PERSON.email} directly.`, { duration: 8000 })
      return
    }

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: name, name, email, topic, message, botcheck: fd.get('botcheck') ? true : '' }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      track('contact_form_sent', { topic })
      toast.success("Message sent. Thanks for reaching out, I'll get back to you soon.")
      form.reset()
    } catch {
      toast.error(`Message didn't send. Please email ${PERSON.email} directly.`, { duration: 8000 })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className={cn('pb-20 sm:pb-[110px]', page && 'pt-[120px] sm:pt-[150px]')} aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal className="dark panel cut grid overflow-hidden min-[900px]:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-line bg-[linear-gradient(160deg,transparent_55%,var(--red-dim))] px-5 py-7 sm:p-11 min-[900px]:border-r min-[900px]:border-b-0">
            <div className="label text-primary!">08 // Contact</div>
            <Title id="contact-title" className="mt-4 font-brand text-[clamp(28px,3.4vw,44px)] leading-[1.12] uppercase">Let's work<br />together.</Title>
            <p className="mt-[18px] max-w-[420px] text-muted-foreground">
              Hiring for a software engineering role, need a data pipeline automated, or looking for a technical advisor? Send a message and I'll get back to you.
            </p>
            <address className="mt-[30px] grid gap-px border border-line bg-line not-italic">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3.5">
                <span className="label">Email</span>
                <a href={`mailto:${PERSON.email}`} className="font-mono text-sm break-all hover:text-primary">{PERSON.email}</a>
                <Button variant="mini" size="mini" onClick={copyEmail}><Copy className="size-3" />Copy</Button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3.5">
                <span className="label">Location</span><span className="font-mono text-sm">{PERSON.location}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3.5">
                <span className="label">Work style</span><span className="font-mono text-sm">{PERSON.workStyle}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3.5">
                <span className="label">Profile</span>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me" className={buttonVariants({ variant: 'mini', size: 'mini' })}>LinkedIn</a>
              </div>
            </address>
          </div>

          <form onSubmit={onSubmit} noValidate className="grid gap-[18px] px-5 py-7 sm:p-11" aria-describedby="form-error">
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="grid gap-2"><Label htmlFor="f-name">Name</Label><Input id="f-name" name="name" autoComplete="name" placeholder="Jane Recruiter" required /></div>
              <div className="grid gap-2"><Label htmlFor="f-email">Email</Label><Input id="f-email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></div>
            </div>
            <fieldset className="m-0 border-0 p-0">
              <legend className="label mb-2">Inquiry type</legend>
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.map((t, i) => (
                  <label key={t} className="relative">
                    <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer absolute opacity-0" />
                    <span className="inline-block cursor-pointer border border-line-2 px-[11px] py-[7px] font-mono text-[12px] tracking-[.08em] text-muted-foreground uppercase transition-colors hover:text-foreground peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-2"><Label htmlFor="f-msg">Message</Label><Textarea id="f-msg" name="message" placeholder="Tell me about the role or project..." required /></div>
            <m.p id="form-error" role="alert" className={cn('min-h-[1.4em] font-mono text-[13px] tracking-[.06em] text-[#ff6b6b]')} key={error} initial={{ x: error ? -6 : 0 }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 600, damping: 12 }}>
              {error}
            </m.p>
            <Button type="submit" disabled={sending} className="w-full">
              {sending ? <><Loader2 className="animate-spin" />Sending</> : <>Send message <Send /></>}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
