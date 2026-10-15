# Noa Kestrel — Designer & Photographer

A personal portfolio for an independent designer and photographer, designed like a darkroom contact sheet: bone paper, warm ink, film grain, frame numbers and crop marks, with one loud colour (safelight vermilion).

## Pages

- **Home** (`/`) — oversized name, a hero frame, a film-strip marquee of recent photographs, selected work and a note on method.
- **Gallery** (`/gallery`) — twelve photographs across four series, filterable by series, with two layouts ("Wall" masonry and "Contact sheet") and a full-screen keyboard-navigable lightbox. Filters and layout live in the URL, so any view can be shared.
- **Work** (`/projects`) — an index of commissions with a sticky hover preview, plus a full case-study page for each project (`/projects/<slug>`).
- **About** (`/about`) — bio, portrait, principles, a timeline and kit list.
- **Contact** (`/contact`) — a project enquiry form (Netlify Forms) and social links.

## Optimised images

Original photographs live in `public/img/`. They're never served directly: every `<img>` goes through Netlify Image CDN (`/.netlify/images`) with responsive `srcset`s, WebP output, and a tiny blurred preview that shows while the full frame "develops". See `src/lib/image.ts` and `src/components/Picture.tsx`.

## Tech

- TanStack Start + React 19, file-based routes in `src/routes/`
- Tailwind CSS v4 (theme in `src/styles.css`)
- Content Collections for project case studies (`content/projects/*.md`)
- Netlify Forms for the contact form, Netlify Image CDN for images
- Fonts: Gloock (display), Familjen Grotesk (text), IBM Plex Mono (metadata)

## Make it yours

- Name, email, city, availability and social links: `src/lib/site.ts`
- Gallery photos and their captions: the `photos` array in `src/lib/site.ts` (drop files in `public/img/`)
- Projects: add or edit Markdown files in `content/projects/`

## Run locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```

`netlify dev` is recommended so the Image CDN and form handling are emulated locally.
