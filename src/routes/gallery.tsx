import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'
import { Picture } from '@/components/Picture'
import { Lightbox } from '@/components/Lightbox'
import { useReveal } from '@/hooks/use-reveal'
import { allSeries, photos, seriesNotes, type Series } from '@/lib/site'
import { cdn } from '@/lib/image'
import { cn } from '@/lib/utils'

const searchSchema = z.object({
  series: z.enum(allSeries as [Series, ...Series[]]).optional(),
  view: z.enum(['wall', 'sheet']).optional(),
})

export const Route = createFileRoute('/gallery')({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: 'Gallery — Noa Kestrel' }] }),
  component: Gallery,
})

function Gallery() {
  const { series, view = 'wall' } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [open, setOpen] = useState<number | null>(null)
  const onChange = useCallback((i: number | null) => setOpen(i), [])

  const visible = useMemo(
    () => (series ? photos.filter((p) => p.series === series) : photos),
    [series],
  )

  useReveal([series, view])

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-12 md:px-10 md:pt-20">
      <header className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="meta develop text-smoke">Index 01 · {photos.length} frames · 4 series</p>
          <h1 className="develop mt-4 font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-[-0.03em]" style={{ '--d': '80ms' } as React.CSSProperties}>
            Gallery
          </h1>
        </div>
        <p className="develop self-end text-lg leading-relaxed text-ink-soft md:col-span-4 md:col-start-9" style={{ '--d': '160ms' } as React.CSSProperties}>
          {series
            ? seriesNotes[series]
            : 'Personal work, shot on film and scanned at the studio. Four ongoing series — pick one, or let them bleed into each other.'}
        </p>
      </header>

      {/* Controls */}
      <div className="sticky top-[49px] z-30 -mx-5 mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-line bg-paper/90 px-5 py-3 backdrop-blur md:-mx-10 md:px-10">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by series">
          <FilterChip active={!series} onClick={() => navigate({ search: (s) => ({ ...s, series: undefined }) })}>
            All <span className="opacity-50">{photos.length}</span>
          </FilterChip>
          {allSeries.map((s) => (
            <FilterChip key={s} active={series === s} onClick={() => navigate({ search: (prev) => ({ ...prev, series: s }) })}>
              {s} <span className="opacity-50">{photos.filter((p) => p.series === s).length}</span>
            </FilterChip>
          ))}
        </div>
        <div className="meta flex border border-ink" role="group" aria-label="Layout">
          {(['wall', 'sheet'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => navigate({ search: (s) => ({ ...s, view: v === 'wall' ? undefined : v }) })}
              className={cn('px-3 py-1.5 transition-colors', view === v ? 'bg-ink text-paper' : 'hover:text-vermilion')}
            >
              {v === 'wall' ? 'Wall' : 'Contact sheet'}
            </button>
          ))}
        </div>
      </div>

      {view === 'wall' ? (
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {visible.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpen(i)}
              className="reveal group mb-10 block w-full break-inside-avoid text-left"
              style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <div className="crop transition-transform duration-500 group-hover:-translate-y-1">
                <span className="crop-b opacity-0 transition-opacity group-hover:opacity-100" />
                <Picture
                  src={p.src}
                  alt={p.title}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  imgClassName="transition duration-700 group-hover:saturate-[1.15]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-display text-xl leading-tight transition-colors group-hover:text-vermilion">{p.title}</span>
                <span className="meta shrink-0 text-smoke">Fr. {p.id}</span>
              </div>
              <p className="meta mt-1 text-smoke">
                {p.series} · {p.place} · {p.year}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-12 bg-ink p-4 md:p-8">
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpen(i)}
                className="reveal group text-left"
                style={{ '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}
              >
                <p className="meta mb-1.5 flex justify-between text-[10px] text-vermilion">
                  <span>▸ {p.id}</span>
                  <span>{p.film}</span>
                </p>
                <div className="relative overflow-hidden ring-1 ring-paper/10">
                  <img
                    src={cdn(p.src, { w: 480, h: 360, fit: 'cover', q: 65 })}
                    srcSet={`${cdn(p.src, { w: 480, h: 360, fit: 'cover', q: 65 })} 480w, ${cdn(p.src, { w: 760, h: 570, fit: 'cover', q: 65 })} 760w`}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 48vw"
                    alt={p.title}
                    loading="lazy"
                    width={480}
                    height={360}
                    className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  />
                  <span className="pointer-events-none absolute inset-2 rounded-full border-2 border-vermilion opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
                </div>
                <p className="meta mt-1.5 text-[10px] text-paper/60">{p.title}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 && (
        <p className="py-24 text-center font-display text-3xl text-smoke">Nothing on this roll yet.</p>
      )}

      <Lightbox photos={visible} index={open} onChange={onChange} />
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'meta flex items-center gap-1.5 border px-3 py-1.5 transition-colors',
        active ? 'border-vermilion bg-vermilion text-paper' : 'border-line hover:border-ink',
      )}
    >
      {children}
    </button>
  )
}
