import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowUpRight } from 'lucide-react'
import { Picture } from '@/components/Picture'
import { useReveal } from '@/hooks/use-reveal'
import { photos, site } from '@/lib/site'
import { cdn } from '@/lib/image'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  useReveal()
  const projects = [...allProjects].sort((a, b) => a.order - b.order)
  const hero = photos[0]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1500px] px-5 pb-24 pt-10 md:px-10 md:pt-16">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="meta develop flex items-center gap-2 text-smoke">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-vermilion" />
              {site.availability}
            </p>
            <h1 className="mt-6 font-display text-[clamp(3.6rem,13vw,12.5rem)] leading-[0.82] tracking-[-0.035em]">
              <span className="develop block" style={{ '--d': '80ms' } as React.CSSProperties}>
                Noa
              </span>
              <span className="develop block pl-[12vw] md:pl-[9vw]" style={{ '--d': '180ms' } as React.CSSProperties}>
                Kestrel<span className="text-vermilion">.</span>
              </span>
            </h1>
            <p
              className="develop mt-10 max-w-xl text-xl leading-snug text-ink-soft md:ml-[9vw] md:text-2xl"
              style={{ '--d': '320ms' } as React.CSSProperties}
            >
              I design identities, books and rooms — and photograph{' '}
              <em className="font-display not-italic text-ink">everything in between</em>. Working from a
              former print shop in {site.city.split(',')[0]}.
            </p>
            <div
              className="develop mt-10 flex flex-wrap gap-3 md:ml-[9vw]"
              style={{ '--d': '420ms' } as React.CSSProperties}
            >
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-vermilion"
              >
                Enter the gallery
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 transition-colors hover:border-vermilion hover:text-vermilion"
              >
                Selected work
              </Link>
            </div>
          </div>

          <figure
            className="develop crop md:col-span-4 md:-mt-24 md:rotate-[1.5deg]"
            style={{ '--d': '240ms' } as React.CSSProperties}
          >
            <span className="crop-b" />
            <Picture
              src={hero.src}
              alt={hero.title}
              width={hero.width}
              height={hero.height}
              ratio={1.28}
              sizes="(min-width: 768px) 33vw, 100vw"
              priority
            />
            <figcaption className="meta mt-3 flex justify-between text-smoke">
              <span>Fr. {hero.id} — {hero.title}</span>
              <span>{hero.film}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Film strip ───────────────────────────────────── */}
      <section aria-label="Recent frames" className="overflow-hidden border-y border-ink bg-ink py-4">
        <Link to="/gallery" className="marquee gap-3">
          {[...photos, ...photos].map((p, i) => (
            <div key={i} className="flex shrink-0 flex-col gap-2">
              <span className="meta flex justify-between px-1 text-[10px] text-vermilion/90">
                <span>{p.id}</span>
                <span>▸ {p.id}A</span>
              </span>
              <img
                src={cdn(p.src, { w: 440, h: 300, fit: 'cover', q: 65 })}
                alt={i < photos.length ? p.title : ''}
                aria-hidden={i >= photos.length}
                loading="lazy"
                width={220}
                height={150}
                className="h-[150px] w-[220px] object-cover grayscale-[35%] transition hover:grayscale-0"
              />
            </div>
          ))}
        </Link>
      </section>

      {/* ── Selected work ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-5 py-28 md:px-10">
        <div className="reveal mb-16 flex items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Selected <span className="italic text-vermilion">work</span>
          </h2>
          <Link to="/projects" className="meta hidden border-b border-ink pb-1 hover:text-vermilion md:block">
            All {projects.length} projects →
          </Link>
        </div>

        <div className="space-y-24 md:space-y-36">
          {projects.slice(0, 3).map((p, i) => (
            <Link
              key={p._meta.path}
              to="/projects/$slug"
              params={{ slug: p._meta.path }}
              className={`reveal group grid items-center gap-8 md:grid-cols-12 ${i % 2 ? 'md:[direction:rtl]' : ''}`}
            >
              <div className="overflow-hidden md:col-span-7 [direction:ltr]">
                <Picture
                  src={p.image}
                  alt={`${p.title} for ${p.client}`}
                  width={1408}
                  height={768}
                  ratio={0.62}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="md:col-span-5 [direction:ltr] md:px-6">
                <p className="meta text-smoke">
                  <span className="text-vermilion">{String(i + 1).padStart(2, '0')}</span> — {p.discipline} · {p.year}
                </p>
                <h3 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">{p.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{p.summary}</p>
                <span className="meta mt-8 inline-flex items-center gap-2 border-b border-current pb-1 transition-colors group-hover:text-vermilion">
                  Read the case <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────── */}
      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-28 md:grid-cols-12 md:px-10">
          <div className="reveal md:col-span-4">
            <Picture
              src="/img/portrait.jpg"
              alt={`${site.name} in the studio`}
              width={768}
              height={1376}
              ratio={1.25}
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
          <div className="reveal md:col-span-7 md:col-start-6 md:self-center" style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="meta text-smoke">A note on method</p>
            <blockquote className="mt-6 font-display text-3xl leading-[1.15] md:text-5xl">
              “I still proof everything on paper. A screen will tell you if something is right;
              <span className="text-vermilion"> paper tells you if it's true.</span>”
            </blockquote>
            <Link to="/about" className="meta mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 hover:text-vermilion">
              More about the studio <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
