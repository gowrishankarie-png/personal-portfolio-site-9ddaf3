import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { cdn } from '@/lib/image'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects/')({
  head: () => ({ meta: [{ title: 'Work — Noa Kestrel' }] }),
  component: Projects,
})

function Projects() {
  useReveal()
  const projects = [...allProjects].sort((a, b) => a.order - b.order)
  const [hover, setHover] = useState(0)

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10 md:pt-20">
      <header className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="meta develop text-smoke">Index 02 · Commissions 2024 — 2026</p>
          <h1 className="develop mt-4 font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-[-0.03em]" style={{ '--d': '80ms' } as React.CSSProperties}>
            Work
          </h1>
        </div>
        <p className="develop self-end text-lg leading-relaxed text-ink-soft md:col-span-4 md:col-start-9" style={{ '--d': '160ms' } as React.CSSProperties}>
          A short list on purpose. I take on four or five commissions a year and stay with each
          one from first sketch to final print run.
        </p>
      </header>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        {/* Index list */}
        <ol className="md:col-span-7">
          {projects.map((p, i) => (
            <li key={p._meta.path} className="reveal" style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <Link
                to="/projects/$slug"
                params={{ slug: p._meta.path }}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-ink py-7 last:border-b md:grid-cols-[4rem_1fr_10rem_auto]"
              >
                <span className={cn('meta transition-colors', hover === i ? 'text-vermilion' : 'text-smoke')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-4xl leading-none transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
                    {p.title}
                  </span>
                  <span className="mt-2 block text-ink-soft">{p.client}</span>
                </span>
                <span className="meta hidden text-smoke md:block">{p.discipline}</span>
                <span className="meta flex items-center gap-1 text-smoke">
                  {p.year}
                  <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45 group-hover:text-vermilion" />
                </span>
              </Link>
              {/* Mobile: show the image inline */}
              <img
                src={cdn(p.image, { w: 900, h: 560, fit: 'cover' })}
                alt=""
                loading="lazy"
                className="mb-6 aspect-[16/10] w-full object-cover md:hidden"
              />
            </li>
          ))}
        </ol>

        {/* Sticky preview */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-32">
            <div className="crop">
              <span className="crop-b" />
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                {projects.map((p, i) => (
                  <img
                    key={p._meta.path}
                    src={cdn(p.image, { w: 900, h: 1125, fit: 'cover' })}
                    srcSet={`${cdn(p.image, { w: 600, h: 750, fit: 'cover' })} 600w, ${cdn(p.image, { w: 900, h: 1125, fit: 'cover' })} 900w, ${cdn(p.image, { w: 1200, h: 1500, fit: 'cover' })} 1200w`}
                    sizes="40vw"
                    alt={`${p.title} preview`}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-all duration-700',
                      hover === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="meta mt-4 flex justify-between text-smoke">
              <span>{projects[hover]?.role}</span>
              <span style={{ color: projects[hover]?.accent }}>●</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
