import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { site, socials } from '@/lib/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact — Noa Kestrel' }] }),
  component: Contact,
})

type State = 'idle' | 'pending' | 'success' | 'error'

const kinds = ['Identity', 'Book / editorial', 'Exhibition', 'Photography', 'Something else']
const budgets = ['Under €8k', '€8–20k', '€20–45k', '€45k +']

function Contact() {
  const [state, setState] = useState<State>('idle')
  const [kind, setKind] = useState(kinds[0])
  const [budget, setBudget] = useState(budgets[1])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      // A plain static server echoes the registration file back with a 200.
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10 md:pt-20">
      <header>
        <p className="meta develop text-smoke">Index 04 · Contact</p>
        <h1
          className="develop mt-4 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-[-0.03em]"
          style={{ '--d': '80ms' } as React.CSSProperties}
        >
          Say <span className="italic text-vermilion">hello</span>.
        </h1>
      </header>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        {/* Form */}
        <div className="develop md:col-span-7" style={{ '--d': '160ms' } as React.CSSProperties}>
          {state === 'success' ? (
            <div className="border border-ink p-10 md:p-14">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-vermilion text-paper">
                <Check />
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">Message received.</h2>
              <p className="mt-4 max-w-md text-lg text-ink-soft">
                Thank you. I read everything myself and reply within three working days — usually
                sooner, unless I'm in the darkroom.
              </p>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="meta mt-8 border-b border-ink pb-1 hover:text-vermilion"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              action="/contact-form.html"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submit}
              className="space-y-10"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="kind" value={kind} />
              <input type="hidden" name="budget" value={budget} />
              <p hidden>
                <label>
                  Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <fieldset disabled={state === 'pending'} className="space-y-10">
                <div className="grid gap-10 md:grid-cols-2">
                  <Field label="Your name" name="name" autoComplete="name" maxLength={100} placeholder="Marta Lobo" />
                  <Field label="Email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="marta@studio.pt" />
                </div>

                <Choice legend="What are we making?" options={kinds} value={kind} onChange={setKind} />
                <Choice legend="Rough budget" options={budgets} value={budget} onChange={setBudget} />

                <label className="block">
                  <span className="meta text-smoke">Tell me about it</span>
                  <textarea
                    name="message"
                    required
                    maxLength={3000}
                    rows={5}
                    placeholder="What it is, who it's for, and when it needs to exist."
                    className="mt-3 block w-full resize-none border-0 border-b border-ink bg-transparent py-3 text-xl outline-none placeholder:text-smoke/60 focus:border-vermilion"
                  />
                </label>

                {state === 'error' && (
                  <p role="alert" className="border-l-2 border-vermilion pl-4 text-vermilion-deep">
                    That didn't go through. Please try again, or write directly to{' '}
                    <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-lg text-paper transition-colors hover:bg-vermilion disabled:opacity-60"
                >
                  {state === 'pending' ? 'Sending…' : 'Send message'}
                  <ArrowUpRight size={20} className="transition-transform group-hover:rotate-45" />
                </button>
              </fieldset>
            </form>
          )}
        </div>

        {/* Direct + socials */}
        <aside className="develop md:col-span-4 md:col-start-9" style={{ '--d': '240ms' } as React.CSSProperties}>
          <p className="meta text-smoke">Direct</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block break-all font-display text-3xl leading-tight underline decoration-vermilion decoration-2 underline-offset-[6px] hover:text-vermilion"
          >
            {site.email}
          </a>
          <p className="mt-6 flex items-center gap-2 text-ink-soft">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vermilion" />
            {site.availability}
          </p>

          <p className="meta mt-14 text-smoke">Elsewhere</p>
          <ul className="mt-3 border-t border-ink">
            {socials.map((s, i) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between border-b border-line py-4 transition-colors hover:text-vermilion"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="meta text-smoke">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-2xl transition-transform duration-300 group-hover:translate-x-2">{s.label}</span>
                  </span>
                  <span className="meta flex items-center gap-1 text-smoke group-hover:text-vermilion">
                    {s.handle} <ArrowUpRight size={12} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="meta mt-14 text-smoke">Visit</p>
          <p className="mt-3 text-lg leading-relaxed">
            Rua do Heroísmo 214, Bonfim
            <br />
            {site.city} — by appointment
          </p>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="meta text-smoke">{label}</span>
      <input
        name={name}
        required
        {...rest}
        className="mt-3 block w-full border-0 border-b border-ink bg-transparent py-3 text-xl outline-none placeholder:text-smoke/60 focus:border-vermilion"
      />
    </label>
  )
}

function Choice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div role="radiogroup" aria-label={legend}>
      <p className="meta text-smoke">{legend}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            onClick={() => onChange(o)}
            className={cn(
              'border px-4 py-2 transition-colors',
              value === o ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink',
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
