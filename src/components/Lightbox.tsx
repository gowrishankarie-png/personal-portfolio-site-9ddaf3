import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { Photo } from '@/lib/site'
import { cdn, placeholder } from '@/lib/image'

type Props = {
  photos: Photo[]
  index: number | null
  onChange: (index: number | null) => void
}

// Full-screen "loupe" view. Arrow keys step through frames, Esc closes.
export function Lightbox({ photos, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const photo = index === null ? null : photos[index]

  useEffect(() => {
    if (index === null) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [index, photos.length, onChange])

  if (!photo || index === null) return null

  const portrait = photo.height > photo.width

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex flex-col bg-ink text-paper animate-in fade-in duration-300"
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <p className="meta text-paper/60">
          Frame {photo.id} <span className="text-vermilion">▸</span> {photo.series}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onChange(null)}
          className="meta flex items-center gap-2 hover:text-vermilion"
        >
          Close <X size={16} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-24" onClick={() => onChange(null)}>
        <img
          key={photo.src}
          src={cdn(photo.src, { w: portrait ? 1100 : 2000, q: 80 })}
          alt={photo.title}
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundImage: `url(${placeholder(photo.src)})`, backgroundSize: 'cover' }}
          className="max-h-full max-w-full object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-500"
        />
        <button
          type="button"
          aria-label="Previous frame"
          onClick={(e) => {
            e.stopPropagation()
            onChange((index - 1 + photos.length) % photos.length)
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-paper/60 hover:text-vermilion md:left-6"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          aria-label="Next frame"
          onClick={(e) => {
            e.stopPropagation()
            onChange((index + 1) % photos.length)
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-paper/60 hover:text-vermilion md:right-6"
        >
          <ArrowRight />
        </button>
      </div>

      <div className="grid gap-2 px-5 py-5 md:grid-cols-3 md:px-10">
        <p className="font-display text-2xl">{photo.title}</p>
        <p className="meta self-center text-paper/60 md:text-center">
          {photo.place} · {photo.year} · {photo.film}
        </p>
        <p className="meta self-center text-paper/60 md:text-right">
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
