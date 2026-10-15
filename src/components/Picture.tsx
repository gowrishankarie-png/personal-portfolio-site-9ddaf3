import { useState } from 'react'
import { cn } from '@/lib/utils'
import { cdn, placeholder, srcSet } from '@/lib/image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  widths?: number[]
  // Force a crop ratio (height / width). Defaults to the image's own ratio.
  ratio?: number
  priority?: boolean
  className?: string
  imgClassName?: string
}

// Responsive, CDN-optimised image with a blurred low-res preview underneath.
export function Picture({
  src,
  alt,
  width,
  height,
  sizes,
  widths = [360, 540, 720, 960, 1280, 1600],
  ratio,
  priority,
  className,
  imgClassName,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const r = ratio ?? height / width
  const fit = ratio ? 'cover' : undefined

  return (
    <div
      className={cn('relative overflow-hidden bg-paper-deep', className)}
      style={{ aspectRatio: `${1} / ${r}` }}
    >
      <img
        aria-hidden
        alt=""
        src={placeholder(src)}
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
      />
      <img
        src={cdn(src, { w: 960, h: ratio ? Math.round(960 * r) : undefined, fit })}
        srcSet={srcSet(src, widths, { ratio, fit })}
        sizes={sizes}
        alt={alt}
        width={width}
        height={Math.round(width * r)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        ref={(el) => {
          if (el?.complete) setLoaded(true)
        }}
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-1000',
          loaded ? 'opacity-100 [filter:none]' : 'opacity-0 [filter:sepia(1)_contrast(1.4)]',
          imgClassName,
        )}
      />
    </div>
  )
}
