# Byteex — Product Page

A responsive loungewear product landing page built from the Byteex Figma design, with all content managed in **Sanity** (headless CMS).

**Live demo:** <https://byteex-product-page-omega.vercel.app> · **CMS Studio:** [`/studio`](https://byteex-product-page-omega.vercel.app/studio)

![Stack](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![Sanity](https://img.shields.io/badge/Sanity-v6-f03e2f)

---

## Tech stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React Server Components, Turbopack)   |
| Language   | TypeScript (strict)                                           |
| Styling    | Tailwind CSS v4 with design tokens taken from Figma          |
| CMS        | Sanity — Studio embedded in the app at `/studio`             |
| Images     | Sanity image CDN (WebP/AVIF, responsive `srcset`, LQIP blur) |
| Deployment | Vercel                                                        |

## Getting started

Requirements: Node.js **20.9+**.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No environment variables are needed: the app reads from a public, read-only Sanity dataset by default.

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Production build                               |
| `npm start`         | Serve the production build                     |
| `npm run lint`      | ESLint                                         |
| `npm run typecheck` | TypeScript type check                          |
| `npm run seed`      | Upload the Figma content and images to Sanity  |

### Environment variables (optional)

Copy `.env.example` to `.env.local` to point at your own Sanity project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...   # defaults to the demo project
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=...        # secret for the publish webhook
NEXT_PUBLIC_SITE_URL=https://...    # canonical URL for SEO metadata
```

## Headless CMS

Every piece of copy and every photo on the page comes from one Sanity document, **Product page**. Nothing is hard-coded in the components.

- **Studio.** Open `/studio` to edit content. Each page section has its own tab: Hero, Benefits, Founder, How it works, Reviews, FAQ, Impact and Final CTA.
- **Schema.** Defined in [`src/sanity/schemaTypes`](src/sanity/schemaTypes). Reusable objects: image with alt text, link, icon + text, feature, stat, review, FAQ item, press logo. Icons are picked from a dropdown that maps to the SVG icon set, so editors can't break the design.
- **Fetching.** A single typed GROQ query ([`queries.ts`](src/sanity/lib/queries.ts)) returns exactly the shape the UI needs, including image dimensions and LQIP placeholders.
- **Caching.** The page is statically generated with ISR (60 s). A Sanity webhook pointed at `POST /api/revalidate` (signed with `SANITY_REVALIDATE_SECRET`) refreshes it as soon as content is published.
- **Seeding.** [`seed/seed.ts`](seed/seed.ts) uploads the optimised images and the Figma copy. It's idempotent and removes orphaned images:

  ```bash
  npx sanity login
  npm run seed
  ```

To try the CMS end to end with your own project, create one at [sanity.io/manage](https://www.sanity.io/manage), set `NEXT_PUBLIC_SANITY_PROJECT_ID`, add `http://localhost:3000` as a CORS origin, then run `npm run seed`.

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Composes the page from CMS data
│   ├── layout.tsx               # Fonts, metadata, CDN preconnect
│   ├── studio/[[...tool]]/      # Embedded Sanity Studio
│   ├── api/revalidate/          # Webhook → on-demand revalidation
│   └── robots.ts, sitemap.ts, icon.svg
├── components/
│   ├── sections/                # One component per page section
│   ├── ui/                      # Primitives: CTA, rating, collage, photo, carousel controls…
│   └── icons/                   # SVG icons exported from Figma + CMS icon registry
├── hooks/useCarousel.ts         # Scroll-snap carousel state
├── lib/                         # cn() helper, site URL
└── sanity/                      # Env, client, GROQ query, types, schemas, desk structure
seed/                            # Seed script + optimised images from Figma
```

## Implementation notes

### Design fidelity

- Colours, font sizes, line heights, letter spacing, radii and shadows were read directly from the Figma file through its REST API. They live as tokens in [`globals.css`](src/app/globals.css).
- The desktop layout was checked against the Figma render at 1465 px, and section offsets match to within a few pixels. The mobile layout was checked at 428 px, the width of the mobile artboard.
- The overlapping photo compositions (hero, founder, FAQ, final CTA) reuse the exact Figma coordinates, converted to percentages ([`Collage.tsx`](src/components/ui/Collage.tsx)). They scale fluidly at any width without breaking the composition.
- Photos come from the original full-resolution image fills in Figma rather than from rendered crops.

### Deviations from the mockup (intentional)

- **Fonts.** The design uses *Sofia Pro* and *Suisse Int'l*, which are commercial fonts. The closest open alternatives are used instead: **Outfit** for Sofia Pro and **Inter** for Suisse. Both are self-hosted by `next/font`, so there is no layout shift and no request to Google at runtime.
- **Muted grey** (`#828282`) is darkened to `#767676` so that small text meets WCAG AA contrast.
- **Carousel dots** keep their 8 px look but have 24 px hit areas, so they are easy to tap.
- **Product gallery** thumbnails in Figma repeat the same image; the CMS content uses distinct product shots instead, so the gallery works as a real gallery.

### Responsiveness and interaction

- Mobile-first, with breakpoints at 640 / 1024 / 1280 px. Layouts between the two artboards (tablet, small laptop) were checked at 768, 1024 and 1280 px, with no horizontal scroll at any width.
- Carousels use native CSS scroll-snap, so touch, trackpad and keyboard all work without a carousel library. They switch to grids where the design shows grids (the steps and the press-logo row on desktop).
- The FAQ is an accessible accordion (`aria-expanded`, `aria-controls`, `inert` when collapsed) with an animated height transition.
- The announcement bar shows every message on desktop and rotates through them on mobile.
- `prefers-reduced-motion` is respected.

### Performance

Lighthouse on the production build:

| Mode    | Performance | Accessibility | Best practices | SEO |
| ------- | :---------: | :-----------: | :------------: | :-: |
| Mobile  | 95          | 100           | 100            | 100 |
| Desktop | 100         | 100           | 100            | 100 |

- The page is statically rendered with ISR; the only JavaScript shipped is for the interactive islands (carousels, gallery, accordion, announcement rotation).
- Every image goes through the Sanity CDN with an accurate `sizes` hint. That means modern formats, correctly sized files, lazy loading below the fold, blurred LQIP placeholders, and `fetchpriority="high"` on the LCP image.
- Fonts are subset and self-hosted with `display: swap`. The page has zero cumulative layout shift.

### Git workflow

Work was done on feature branches and merged into `main` with merge commits, so the history shows how the project was built:

`feature/design-system` → `feature/cms` → `feature/page-sections` → `feature/performance-seo` → `docs/readme`

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
