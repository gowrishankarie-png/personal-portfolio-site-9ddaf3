import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Picture } from '@/components/Picture'
import { useReveal } from '@/hooks/use-reveal'
import { photos, site } from '@/lib/site'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About — Noa Kestrel' }] }),
  component: About,
})

const principles = [
  {
    title: 'Fewer, longer',
    body: 'Four or five commissions a year. Each one gets my full attention from the first sketch to the last proof, with no hand-offs to juniors.',
  },
  {
    title: 'Paper first',
    body: 'Everything is printed, pinned to the wall and lived with for a week. What still holds up after that week is what ships.',
  },
  {
    title: 'One loud thing',
    body: 'Every project gets exactly one gesture that carries it — a colour, a cut, a material. The rest stays quiet so that gesture is heard.',
  },
]

const timeline = [
  { year: '2026', what: 'Tidewater identity launches in 37 stores' },
  { year: '2025', what: 'Atlas of Concrete shortlisted, Portuguese Book Design Awards' },
  { year: '2025', what: 'Lumen Hall opens at Museu da Imagem, Braga' },
  { year: '2024', what: 'Ferro Line — honourable mention, Porto metro competition' },
  { year: '2023', what: 'Studio opens in a former print shop in Bonfim' },
  { year: '2019', what: 'Senior designer, Atelier Ribeira, Lisbon' },
  { year: '2016', what: 'MA Communication Design, ESAD Matosinhos' },
]

const kit = ['Mamiya 7 II', 'Pentax 67', 'Hasselblad X5 scanner', 'Risograph MZ970', 'Indesign, still', 'A drawer of grease pencils']

function About() {
  useReveal()

  return (
    <div>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 pt-12 md:grid-cols-12 md:px-10 md:pt-20">
        <div className="md:col-span-7">
          <p className="meta develop text-smoke">Index 03 · About the studio</p>
          <h1
            className="develop mt-4 font-display text-[clamp(3rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.025em]"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            I make things you can <span className="italic text-vermilion">hold</span>, then photograph the
            world around them.
          </h1>
          <div
            className="develop mt-12 grid gap-6 text-lg leading-relaxed text-ink-soft md:grid-cols-2"
            style={{ '--d': '200ms' } as React.CSSProperties}
          >
            <p>
              I'm {site.name}, an independent designer and photographer based in {site.city}. I spent
              eight years in Lisbon studios designing for banks and beer brands before deciding I'd
              rather do fewer things, more carefully.
            </p>
            <p>
              Today I run a two-desk studio in a former print shop in Bonfim. I work with founders,
              publishers and museums on identities, books and exhibitions — and keep a camera loaded
              for everything in between.
            </p>
          </div>
        </div>

        <figure className="develop crop md:col-span-4 md:col-start-9 md:mt-10" style={{ '--d': '140ms' } as React.CSSProperties}>
          <span className="crop-b" />
          <Picture
            src="/img/portrait.jpg"
            alt={`Portrait of ${site.name} in the studio`}
            width={768}
            height={1376}
            ratio={1.32}
            sizes="(min-width: 768px) 33vw, 100vw"
            priority
          />
          <figcaption className="meta mt-3 flex justify-between text-smoke">
            <span>The studio, Bonfim</span>
            <span>{site.coords.split(',')[0]}</span>
          </figcaption>
        </figure>
      </section>

      {/* Principles */}
      <section className="mx-auto mt-32 max-w-[1500px] px-5 md:px-10">
        <h2 className="reveal meta border-b border-ink pb-3">Three rules I don't break</h2>
        <div className="grid md:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="reveal border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              style={{ '--d': `${i * 120}ms` } as React.CSSProperties}
            >
              <p className="font-display text-7xl leading-none text-vermilion">{i + 1}</p>
              <h3 className="mt-6 font-display text-3xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline + kit */}
      <section className="mx-auto mt-28 grid max-w-[1500px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <h2 className="reveal font-display text-5xl">Along the way</h2>
          <ol className="mt-8">
            {timeline.map((t, i) => (
              <li
                key={t.what}
                className="reveal grid grid-cols-[5rem_1fr] gap-4 border-t border-line py-4 last:border-b"
                style={{ '--d': `${i * 50}ms` } as React.CSSProperties}
              >
                <span className="meta pt-1 text-smoke">{t.year}</span>
                <span className="text-lg">{t.what}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="reveal font-display text-5xl">In the bag</h2>
          <ul className="reveal mt-8 space-y-3">
            {kit.map((k) => (
              <li key={k} className="flex items-center gap-3 text-lg">
                <span className="h-1.5 w-1.5 shrink-0 bg-vermilion" />
                {k}
              </li>
            ))}
          </ul>
          <div className="reveal mt-12 grid grid-cols-3 gap-2">
            {photos.slice(3, 6).map((p) => (
              <Link key={p.id} to="/gallery" search={{ series: p.series }} aria-label={`See ${p.series}`}>
                <Picture src={p.src} alt={p.title} width={p.width} height={p.height} ratio={1} sizes="12vw" widths={[200, 320, 480]} imgClassName="grayscale hover:grayscale-0 transition" />
              </Link>
            ))}
          </div>
          <Link to="/contact" className="reveal meta mt-10 inline-flex items-center gap-2 bg-ink px-5 py-3 text-paper hover:bg-vermilion">
            Start a project <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
