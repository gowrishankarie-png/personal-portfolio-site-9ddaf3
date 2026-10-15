import { Link } from '@tanstack/react-router'
import { site, socials } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 md:px-10">
        <p className="meta text-paper/50">End of roll</p>
        <Link
          to="/contact"
          className="group mt-4 block font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-tight"
        >
          Let's make
          <br />
          something <span className="italic text-vermilion transition-colors group-hover:text-paper">good</span>
          <span className="inline-block translate-x-0 transition-transform duration-500 group-hover:translate-x-4">→</span>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-paper/15 pt-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="meta text-paper/50">Studio</p>
            <p className="mt-2">{site.city}</p>
            <p className="meta mt-1 text-paper/50">{site.coords}</p>
          </div>
          <div className="md:col-span-4">
            <p className="meta text-paper/50">Write</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block underline decoration-vermilion underline-offset-4 hover:text-vermilion">
              {site.email}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-4 md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-vermilion">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="meta mt-12 flex justify-between text-paper/40">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Printed in {site.city.split(',')[0]}</span>
        </p>
      </div>
    </footer>
  )
}
