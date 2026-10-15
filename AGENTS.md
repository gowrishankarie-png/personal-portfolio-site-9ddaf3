# Agent guide — Noa Kestrel portfolio

A single-person portfolio (designer & photographer) built on TanStack Start, React 19, Tailwind v4 and Content Collections, deployed on Netlify. No database, no auth.

## Layout

- `src/routes/` — file routes: `index.tsx` (home), `gallery.tsx`, `about.tsx`, `contact.tsx`, `projects/index.tsx`, `projects/$slug.tsx`. `__root.tsx` holds the shell (header, footer, grain overlay, Google Fonts, site meta).
- `src/lib/site.ts` — **single source of truth** for persona, contact details, social links and gallery photo metadata (including pixel dimensions, used for aspect ratios).
- `src/lib/image.ts` — builds Netlify Image CDN URLs (`cdn`, `srcSet`, `placeholder`). Always use these; never point `<img>` at `/img/...` directly.
- `src/components/Picture.tsx` — responsive image with blurred preview and "develop" fade-in. `ratio` (h/w) forces a cover crop.
- `src/components/Lightbox.tsx` — full-screen gallery viewer (Esc / ← / →).
- `src/hooks/use-reveal.ts` — IntersectionObserver that adds `.is-in` to `.reveal` elements; pass deps when the list changes.
- `content/projects/*.md` — case studies; schema in `content-collections.ts` (`order` controls sort, `accent` colours the stats band). Imported via the `content-collections` path alias in `tsconfig.json`.
- `public/img/` — AI-generated source photography (JPG). `public/contact-form.html` — static Netlify Forms registration.
- `src/components/ui/` — leftover shadcn primitives from the starter; currently unused.

## Design system (keep it consistent)

- Palette tokens in `src/styles.css`: `paper`, `paper-deep`, `ink`, `ink-soft`, `smoke`, `line`, `vermilion`. Vermilion is the only accent — use it sparingly. Radius is 0 everywhere.
- Fonts: `font-display` (Gloock, headlines only), `font-sans` (Familjen Grotesk), `.meta` class (IBM Plex Mono, uppercase micro-labels for frame numbers/metadata).
- Motifs: `.crop` + inner `<span className="crop-b" />` for crop marks, `.develop` (page-load stagger via `--d` CSS var), `.reveal` (scroll-in), `.marquee`, `.grain`.
- Page headers follow "Index 0X · …" meta line + giant display title.

## Non-obvious decisions

- The form registration file is `contact-form.html`, not `contact.html`, so pretty URLs can't shadow the `/contact` route. The React form POSTs there; fields (`name`, `email`, `kind`, `budget`, `message`, `bot-field`) must stay in sync with that file. The handler rejects non-2xx responses and an echoed registration file.
- Gallery filter/layout state is in URL search params (`?series=…&view=sheet`), validated with zod.
- Case-study Markdown is rendered with `marked` unsanitised — fine because content is repo-authored only.
