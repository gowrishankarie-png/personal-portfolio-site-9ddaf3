import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/gallery', label: 'Gallery', n: '01' },
  { to: '/projects', label: 'Work', n: '02' },
  { to: '/about', label: 'About', n: '03' },
  { to: '/contact', label: 'Contact', n: '04' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl leading-none tracking-tight">
            {site.name}
          </span>
          <span className="meta hidden text-smoke sm:inline">
            {site.title}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex items-baseline gap-1.5 py-1 text-[15px]"
              activeProps={{ className: 'text-vermilion' }}
            >
              <span className="meta text-[10px] opacity-50">{item.n}</span>
              <span>{item.label}</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="meta flex items-center gap-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className={cn('inline-block h-2 w-2 rounded-full transition-colors', open ? 'bg-vermilion' : 'bg-ink')} />
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-5 pb-8 pt-4 md:hidden">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="develop flex items-baseline justify-between border-b border-line py-4 font-display text-4xl"
              style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
              activeProps={{ className: 'text-vermilion' }}
            >
              {item.label}
              <span className="meta text-smoke">{item.n}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
