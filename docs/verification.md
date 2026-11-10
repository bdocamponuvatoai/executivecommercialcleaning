# Verification

Recorded November 11, 2026, on Windows 11 with Node.js 24.15, Next.js 16.4.6 and React 19.3.1.
Browser checks used `playwright-core` 1.65 driving the installed Google Chrome, with reduced
motion, images forced to load eagerly, and `img.decode()` plus `document.fonts.ready` awaited
before each capture.

The original ChatGPT Sites build (Vinext on Cloudflare Workers) was backed up, built and served
locally with Wrangler as the comparison baseline. This rebuild **intentionally changes the design**,
so pixel parity is not a goal. Behaviour parity is: the same scripted interactions ran against both
sites and their JSON outcomes were compared.

## Build and code checks

| Check                   | Result                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `npm run build`         | Pass. 17 routes, all static. Postbuild: 11 prefetch files fixed, 37 image sizes written. |
| `npm run typecheck`     | Pass                                                                                     |
| `npm run lint`          | Pass, no warnings                                                                        |
| `npm run format:check`  | Pass                                                                                     |
| `npm audit --omit=dev`  | 0 vulnerabilities                                                                        |
| `npm audit` (incl. dev) | 7 moderate, all from one advisory (see below)                                            |

The dev-only finding is GHSA-g3hv-75wg-m249 (`minimatch` denial of service via crafted glob
patterns), reached through `typescript-eslint` inside `eslint-config-next`. It only runs on
developer machines and in CI against this repository’s own files, and nothing from it ships in
`out/`. Fixing it means overriding the version `eslint-config-next` expects, so it is left for
Dependabot to pick up when Next.js updates its config.

## Responsive sweep

Every route (home, services, four service pages, spaces, our work, about, contact, privacy, 404)
plus `/contact/?space=Shared%20spaces`, full page, at 1600, 1280, 1024, 768, 390 and 320 px wide:
**78 captures, zero horizontal overflow, zero console errors** (other than the expected 404 response
when loading the 404 page). Captures were reviewed by eye at each breakpoint. Two issues found and
fixed during review: images in vertically centred grid cells did not fill their frames, and the
space tabs were cut off at 390 px (now wrapping pills below 640 px).

## Behaviour parity (old vs new)

Same script, both sites. **52 recorded outcomes identical**, including:

- **Walkthrough form, desktop and 390 px mobile:** an empty Continue stays on step 1 with the
  location field invalid. An invalid email blocks review. Back keeps the frequency, the checked
  priorities and multi-line notes. Edit keeps the business name. The review summary text is the same.
  **The `mailto:` href is byte-identical (832 characters).** The downloaded text file is identical
  (`executive-cleaning-walkthrough-request.txt`), and so is the status message.
- **Presets:** `?space=Shared%20spaces` preselects Shared spaces; `?service=Office%20cleaning`
  pre-fills “I’m interested in Office cleaning.”; an unknown `?space=` falls back to Offices.
- **Mobile menu:** opens with `aria-expanded="true"`, closes on Escape with focus returned to the
  toggle, closes after navigating.
- **FAQ:** first disclosure opens with the same answer structure.
- **Gallery:** opens as a modal dialog, arrow keys advance and wrap, Escape closes and focus returns
  to the photo that opened it.

Intended differences:

| Area             | Old                                             | New                                                             |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Menu on resize   | Stayed open (`aria-expanded` true) at 1280px    | Closes when the viewport reaches desktop width                  |
| Space tabs       | Toggle buttons, no arrow-key support            | WAI-ARIA tabs: arrow keys, Home and End move between tabs       |
| Navigation       | Full page reload on every link                  | Client-side navigation; page state survives (marker kept)       |
| URLs             | `/services`                                     | `/services/` (trailing slash, static-host friendly)             |
| 404 page         | Home page title                                 | “Page not found \| Executive Commercial Cleaning”               |
| Copy             | “About us”, “01 Offices”, slogan gallery titles | “About”, “Offices”, plain gallery titles; FAQ answer reworded   |
| Priorities order | Joined in click order                           | Joined in on-screen order (identical when picked top to bottom) |

## Navigation

Clicking Services, Spaces we clean, Our work and About from the header: the URL, the document title
and `aria-current="page"` update each time, and a value stored on `window` survives (no reload).
Back returns to the previous page, “Back to top” scrolls to 0, and `/nope/` returns HTTP 404 with the
styled not-found page. **Zero 4xx responses** across the whole behaviour run (after the Windows
prefetch fix), **zero console errors and no hydration warnings.**

## Head tags

| Tag             | Old                                     | New                                                                        |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Title pattern   | `Page \| Executive Commercial Cleaning` | Same, home title unchanged                                                 |
| Description     | One site-wide                           | Per page, from on-page copy                                                |
| Robots          | `noindex, nofollow`                     | `noindex, nofollow` until `SITE_INDEXABLE=true`                            |
| Canonical       | none                                    | Per page, absolute, from `SITE_URL`                                        |
| Open Graph      | none                                    | Title, description, URL, image (salon photo)                               |
| Theme colour    | none                                    | `#1a3c69` (logo navy)                                                      |
| Icons           | Logo JPG (non-square)                   | Square `icon.png` and `apple-icon.png` made from the logo                  |
| Structured data | none                                    | `LocalBusiness` JSON-LD (name, address, phone, email, founding year, area) |

`robots.txt` disallows everything while indexing is off. `sitemap.xml` lists all 11 pages.

## Lighthouse

**Not measured on a live deployment.** Lighthouse 13.6.0, mobile preset (412 px at 1.75× DPR,
simulated throttling: 150 ms RTT, about 1.6 Mbps down, 4× CPU slowdown), headless Chrome 156,
three runs per page. The production build was served from `out/` by a local Node static server with
Brotli compression (as Vercel serves it) and no cache headers.

| Page        | Performance | Accessibility | Best practices | SEO | Largest paint | Page weight |
| ----------- | ----------- | ------------- | -------------- | --- | ------------- | ----------- |
| `/`         | 92–99       | 100           | 100            | 69  | 2.3–3.4 s     | 378 KiB     |
| `/contact/` | 99          | 100           | 100            | 69  | 0.9 s         | 259 KiB     |

SEO is 69 only because the preview is deliberately not crawlable (`noindex` plus a disallow-all
robots.txt). It should rise once `SITE_INDEXABLE=true`.

Changes made because of these runs (home page, same server without compression, to compare):

- Responsive image sizes (`scripts/resize-images.mjs`): performance 68–76 → 78–80, largest paint
  6.8–8.1 s → 5.5–5.6 s, page weight 1,377 → 1,017 KiB. Phones now load the 768 px hero (69 KB)
  instead of the 1,600 px original (192 KB).
- Favicon: 186 KB → 13 KB (192 px palette PNG).
- Logo link: removed an `aria-label` that did not match the visible wordmark (label-in-name).

What still holds the home page back: the hero photo competes with the 96 KiB Mona Sans file for
bandwidth on a slow connection. Subsetting the font to the characters the site uses would cut most
of that. The cache warnings come from the local server; Vercel serves `/_next/static` with
long-lived immutable caching.

## Browsers covered

Desktop Google Chrome (156) at all six widths, including phone widths (390 and 320 px) in Chrome’s
viewport emulation. **Not tested:** Safari or iOS, Firefox, Android devices, or real phones.
