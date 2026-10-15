import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Picture } from '@/components/Picture'
import { useReveal } from '@/hooks/use-reveal'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = allProjects.find((p) => p._meta.path === params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Noa Kestrel` },
          { name: 'description', content: loaderData.summary },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-[1500px] px-5 py-40 md:px-10">
      <p className="meta text-smoke">Frame missing</p>
      <h1 className="mt-4 font-display text-6xl">This project was never printed.</h1>
      <Link to="/projects" className="meta mt-8 inline-block border-b border-ink pb-1 hover:text-vermilion">
        Back to all work
      </Link>
    </div>
  ),
  component: Project,
})

function Project() {
  const project = Route.useLoaderData()
  useReveal([project._meta.path])

  const ordered = [...allProjects].sort((a, b) => a.order - b.order)
  const next = ordered[(ordered.findIndex((p) => p._meta.path === project._meta.path) + 1) % ordered.length]
  // Content is authored in this repo, so rendering it as HTML is safe.
  const html = marked.parse(project.content, { async: false })

  return (
    <article>
      <div className="mx-auto max-w-[1500px] px-5 pt-10 md:px-10 md:pt-16">
        <Link to="/projects" className="meta develop inline-flex items-center gap-2 text-smoke hover:text-vermilion">
          <ArrowLeft size={14} /> All work
        </Link>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <h1
            className="develop font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85] tracking-[-0.03em] md:col-span-9"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            {project.title}
          </h1>
          <p className="meta develop self-end text-smoke md:col-span-3 md:text-right" style={{ '--d': '160ms' } as React.CSSProperties}>
            {project.discipline} · {project.year}
          </p>
        </div>
      </div>

      <div className="develop mx-auto mt-12 max-w-[1500px] md:px-10" style={{ '--d': '220ms' } as React.CSSProperties}>
        <Picture
          src={project.image}
          alt={`${project.title} for ${project.client}`}
          width={1408}
          height={768}
          sizes="(min-width: 1500px) 1420px, 100vw"
          widths={[640, 960, 1280, 1600, 2000]}
          priority
        />
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-20 md:grid-cols-12 md:px-10">
        <aside className="reveal space-y-8 md:col-span-3">
          <Fact label="Client" value={project.client} />
          <Fact label="Role" value={project.role} />
          <Fact label="Year" value={project.year} />
          <div>
            <p className="meta text-smoke">Disciplines</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <li key={t} className="meta border border-line px-2 py-1">{t}</li>
              ))}
            </ul>
          </div>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="meta inline-flex items-center gap-1 border-b border-ink pb-1 hover:text-vermilion">
              Visit live <ArrowUpRight size={14} />
            </a>
          )}
        </aside>

        <div className="reveal prose-case md:col-span-8 md:col-start-5" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <section className="border-y border-ink" style={{ backgroundColor: project.accent }}>
        <dl className="mx-auto grid max-w-[1500px] divide-y divide-ink/30 px-5 text-paper md:grid-cols-3 md:divide-x md:divide-y-0 md:px-10">
          {project.stats.map((s, i) => (
            <div key={s.label} className="reveal py-10 md:px-8 md:first:pl-0" style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
              <dt className="meta opacity-80">{s.label}</dt>
              <dd className="mt-2 font-display text-6xl leading-none md:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Link
        to="/projects/$slug"
        params={{ slug: next._meta.path }}
        className="group mx-auto mt-24 block max-w-[1500px] px-5 md:px-10"
      >
        <p className="meta text-smoke">Next project</p>
        <p className="mt-3 font-display text-[clamp(2.8rem,8vw,7rem)] leading-none transition-colors group-hover:text-vermilion">
          {next.title} <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
        </p>
      </Link>
    </article>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="meta text-smoke">{label}</p>
      <p className="mt-1.5 text-lg leading-snug">{value}</p>
    </div>
  )
}
