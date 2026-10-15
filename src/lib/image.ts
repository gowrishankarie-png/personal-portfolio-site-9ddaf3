// Every image is served through Netlify Image CDN so visitors never download
// the full-resolution originals in /public/img.

type ImageOptions = { w: number; h?: number; q?: number; fit?: 'cover' | 'contain' }

export function cdn(src: string, { w, h, q = 72, fit }: ImageOptions) {
  const params = new URLSearchParams({ url: src, w: String(w), q: String(q), fm: 'webp' })
  if (h) params.set('h', String(h))
  if (fit) params.set('fit', fit)
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src: string, widths: number[], opts: Omit<ImageOptions, 'w'> & { ratio?: number } = {}) {
  const { ratio, ...rest } = opts
  return widths
    .map((w) => `${cdn(src, { ...rest, w, h: ratio ? Math.round(w * ratio) : undefined })} ${w}w`)
    .join(', ')
}

// Tiny, blurred preview painted behind each frame while the real image loads.
export function placeholder(src: string) {
  return cdn(src, { w: 24, q: 30 })
}
