# Executive Commercial Cleaning: website

Marketing site for Executive Commercial Cleaning LLC, Lee’s Summit, Missouri. Built with Next.js
(App Router) and exported as static HTML, so it can be hosted on any static host. Vercel is the
intended host.

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins the current LTS, 24).

```sh
npm ci
npm run dev        # http://localhost:3000
```

To build and preview the production export:

```sh
npm run build      # writes the static site to out/
npm run preview    # serves out/ on http://localhost:3000
```

## Scripts

| Script                 | What it does                                                              |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm run dev`          | Development server with fast refresh.                                     |
| `npm run build`        | Static export to `out/`, then `postbuild` runs the two scripts below.     |
| `npm run preview`      | Serves `out/` locally with `serve` (fetched on demand, not a dependency). |
| `npm run lint`         | ESLint with the Next.js core-web-vitals and TypeScript rules.             |
| `npm run typecheck`    | Generates route types (`next typegen`), then runs `tsc --noEmit`.         |
| `npm run format`       | Formats everything with Prettier.                                         |
| `npm run format:check` | Fails if anything is not Prettier-formatted.                              |
| `npm run check`        | `typecheck`, `lint` and `format:check` together. CI runs this.            |

Post-build scripts:

- `scripts/fix-export-segments.mjs` works around a Next.js static-export bug on Windows, where
  prefetch files are written into nested folders and client-side prefetches 404. It does nothing
  on other platforms.
- `scripts/resize-images.mjs` writes the responsive image sizes. Static exports have no image
  server, so `src/lib/image-loader.ts` points each `srcset` entry at a file such as
  `work-salon.<hash>.w768.webp`, and this script creates every size the built pages reference
  (with `sharp`). Widths are set by `images.deviceSizes` and `images.imageSizes` in
  `next.config.ts`.

## Structure

```
src/
  app/                 Routes (one folder per page), root layout, 404, robots.ts, sitemap.ts, icons
    services/[slug]/   Service detail pages, generated from content/services.ts
  components/
    layout/            Site header (with mobile menu) and footer
    sections/          Sections shared between pages (FAQ, contact band, space explorer, …)
    home/              Home page hero
    contact/           Walkthrough request form
    work/              Photo gallery with lightbox
    ui/                Small building blocks: Icon, ButtonLink, TextLink, SmartLink, Brand, …
    seo/               JSON-LD structured data
  config/
    site.ts            Business details and navigation (safe for client code)
    deployment.ts      SITE_URL / SITE_INDEXABLE handling (build time, server only)
  content/             Typed copy: services, spaces, FAQ, gallery, form options, images
  lib/                 Framework-free helpers: metadata, walkthrough message and mailto, image loader
  styles/              globals.css imports ordered partials: base, components, sections, pages
  assets/              Images and the Mona Sans font, imported statically
scripts/               Post-build: fix-export-segments.mjs, resize-images.mjs
docs/                  Content provenance and verification notes
```

## Conventions

- **Server Components by default.** Only the header, space explorer, gallery and walkthrough form
  are client components, because they are interactive.
- **Facts live in one place.** Phone, emails and address come from `src/config/site.ts`. Do not add
  hours, prices, ratings, certifications or claims without a source (see
  `docs/content-provenance.md`).
- **AI-generated images are always labelled.** Set `illustrative: true` in `src/content/images.ts`
  and `SiteImage` adds the visible “Illustrative image” tag.
- **Links.** Use `SmartLink`, `ButtonLink` or `TextLink`. Internal paths use `next/link`;
  `tel:`, `mailto:` and external links render a plain `<a>`. Internal paths end in `/`.
- **Styling.** Plain CSS with design tokens in `src/styles/base/tokens.css`. One typeface, Mona
  Sans (variable weight and width), loaded with `next/font/local`. Brand colours are sampled from the
  logo. The three accent bars (yellow, blue, green) echo the building edges in the mark.
- **Accessibility.** Skip link, visible focus states, WAI-ARIA tabs with arrow/Home/End keys,
  focus returned after menus and dialogs, labelled form controls, reduced-motion support.

## Routes

| Path                               | Page                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `/`                                | Home                                                    |
| `/services/`                       | Services overview                                       |
| `/services/office-cleaning/`       | Office cleaning                                         |
| `/services/shared-space-cleaning/` | Shared spaces                                           |
| `/services/commercial-facilities/` | Commercial facilities                                   |
| `/services/detail-cleaning/`       | Detail cleaning                                         |
| `/spaces/`                         | Spaces we clean                                         |
| `/our-work/`                       | Photo gallery                                           |
| `/about/`                          | About                                                   |
| `/contact/`                        | Walkthrough request (`?space=` and `?service=` presets) |
| `/privacy/`                        | Privacy                                                 |
| `/robots.txt`, `/sitemap.xml`      | Generated from config and content                       |

The walkthrough form never sends data. It builds a `mailto:` draft to the sales address and offers
a text download; the visitor sends the email from their own app.

## Configuration

Copy `.env.example` to `.env.local` for local overrides.

| Variable         | Default                                                                | Purpose                                                                                               |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Origin for canonical URLs, Open Graph, robots.txt and sitemap.xml. No trailing slash.                 |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows search engines. While false, pages are `noindex,nofollow` and robots.txt disallows all. |

The build fails if `SITE_INDEXABLE=true` while `SITE_URL` is still localhost.

## Before launch

- [ ] Owner approves the design and all copy.
- [ ] Confirm the phone number (816-591-1607). The current website lists a different number.
- [ ] Confirm usage rights for the work photographs. The corridor photo carries a “Professional
      School Photography LLC” credit, and the corridor and warehouse photos carry a Gemini mark.
- [ ] Decide whether to keep the two AI-generated illustrative images or replace them with real
      photos of the team at work.
- [ ] Set `SITE_URL` to the real domain and connect the domain in Vercel.
- [ ] Set `SITE_INDEXABLE=true` for Production only, after approval.
- [ ] Run Lighthouse against the live site and submit `/sitemap.xml` in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on every push to `main` and on pull requests: `npm ci`,
`npm run check`, `npm run build`, then uploads `out/` as an artifact. Dependabot
(`.github/dependabot.yml`) proposes npm updates weekly (Next.js and React grouped) and GitHub
Actions updates monthly.

## Hosting

Vercel detects Next.js and serves the static export from `out/`. `vercel.json` adds security
headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`,
`Strict-Transport-Security`). No Content-Security-Policy is set yet; one must be tested against
Next.js’s inline scripts before it is added.

Set environment variables per environment in the Vercel project settings:

- Preview: `SITE_INDEXABLE=false`
- Production: `SITE_URL=https://<real domain>`; `SITE_INDEXABLE=true` only after owner approval

### Deployment

Not deployed yet. The preview URL goes here once the project is imported into Vercel.
