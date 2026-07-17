# Asma Babazadehkahrizi — Portfolio Website

A premium, minimal portfolio website for **Asma Babazadehkahrizi** — Data Analyst
(Power BI · SQL · Python) and Mechanical Engineer based in London, UK.

Built with an Apple/Tesla-inspired design language: white space, black
typography, restrained motion, and a strong focus on speed and accessibility.

**Live site:** _add your deployed Vercel URL here once deployed_

---

## Tech Stack

| Layer            | Choice                                             |
| ----------------- | --------------------------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org) (App Router)       |
| Language           | TypeScript                                          |
| Styling            | Tailwind CSS                                        |
| Animation          | Framer Motion                                       |
| Icons              | lucide-react                                        |
| Theming            | next-themes (light / dark, class strategy)          |
| Deployment target  | Vercel                                               |

No UI component library is used — every primitive (buttons, cards, badges,
timeline, skill bars) is hand-built and lives in `src/components/ui`.

---

## Project Structure

```
.
├── projects/                    # 6 standalone "Personal Data Analytics Project"
│   │                              case studies — real public datasets, real
│   │                              Python/SQL analysis, real chart output.
│   │                              See "The /projects folder" below.
│   ├── hr-analytics-dashboard/
│   ├── recruitment-analytics-dashboard/
│   ├── sales-performance-dashboard/
│   ├── customer-analytics-dashboard/
│   ├── python-data-cleaning-automation/
│   └── sql-business-intelligence-analysis/
├── public/
│   ├── documents/              # Supplementary PDFs
│   ├── images/
│   │   ├── projects/           # Real dashboard chart exports (copied from
│   │   │                         projects/*/charts/), used on the site
│   │   ├── profile-placeholder.svg   # Monogram placeholder (no photo yet)
│   │   └── og-image.svg        # Social share image
│   ├── favicon.svg
│   ├── apple-touch-icon.svg
│   └── site.webmanifest
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── layout.tsx          # Root layout, fonts, theming, JSON-LD
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/contact/route.ts   # Contact form submission handler
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   ├── home/                # Hero, animated background, CTA, featured projects
│   │   ├── projects/             # Project card
│   │   ├── skills/                # Skill proficiency bar
│   │   ├── experience/            # Timeline
│   │   ├── contact/               # Contact form
│   │   ├── ui/                    # Button, Container, SectionHeading, Badge
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── data/                    # Typed content — edit this to update the site
│   │   ├── site.ts               # Name, bio, nav links, social links
│   │   ├── projects.ts           # 6 case studies
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── education.ts
│   ├── lib/
│   │   ├── metadata.ts           # buildMetadata() SEO helper
│   │   └── utils.ts
│   └── types/                   # Shared TypeScript interfaces
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## The `/projects` folder

The six portfolio projects are **real, working analyses**, not filler copy.
Each one lives in its own folder at the repo root (separate from the Next.js
app in `src/`) with an identical, self-contained structure:

```
projects/<slug>/
├── README.md          # business problem, approach, real insights, recommendations
├── data/raw/           # the original public dataset
├── data/cleaned/        # cleaned output + SQLite database
├── python/                # cleaning/analysis scripts (reproducible, no notebooks required)
├── sql/                    # queries.sql + sample_results.md (real output from a real run)
├── powerbi/                 # data model + DAX measures, documented
└── charts/                    # PNG dashboard exports, also copied into public/images/projects/
```

Every number in every project README was computed by actually running the
scripts in that project against the real public dataset — nothing is
invented. Two projects (`customer-analytics-dashboard`,
`sales-performance-dashboard`) work with datasets too large to commit in
full; their `.gitignore` and README explain how to regenerate the full data
locally via a `download_data.py` script.

Each project is explicitly labeled **"Personal Data Analytics Project"** on
the site and in its own README — these are practice projects built to
demonstrate technique on public data, not client or employer work.

**Why aren't there `.pbix` files?** Power BI Desktop is Windows-only
software and wasn't available in the environment these projects were built
in. Each project's `powerbi/data-model.md` documents the exact data model
and DAX measures instead, ready to paste into Power BI Desktop against the
project's cleaned CSV — and the site shows genuine interactive-style chart
exports built from the same real analysis in the meantime.

---

## Getting Started

**Requirements:** Node.js 18.18+ (Node 20/22 recommended), npm.

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script             | Purpose                                   |
| ------------------- | ------------------------------------------ |
| `npm run dev`        | Start the local dev server                |
| `npm run build`       | Production build                          |
| `npm run start`        | Serve the production build locally       |
| `npm run lint`          | ESLint (Next.js core-web-vitals ruleset) |
| `npm run typecheck`      | `tsc --noEmit`                          |
| `npm run format`          | Prettier (with Tailwind class sorting) |

---

## Editing Content

All personal content lives in `src/data/*.ts` as typed objects — no CMS
required, and no need to touch component code to update copy:

- `data/site.ts` — name, tagline, bio, location, social URLs
- `data/projects.ts` — the 6 case studies (business problem, solution,
  outcomes, tech, GitHub/demo links)
- `data/skills.ts` — skill categories and proficiency levels
- `data/experience.ts` — career timeline
- `data/education.ts` — degrees and certifications

### What's real vs. still a placeholder

- **Project case studies, charts, SQL, and insights** — real. See
  "The `/projects` folder" above.
- **Social links** — real (`src/data/site.ts`): LinkedIn and GitHub point to
  the actual profiles.
- **Profile photo** — still a monogram placeholder
  (`public/images/profile-placeholder.svg`) by design, until a real photo is
  supplied. Swap the file and update the `alt` text in `hero.tsx` and
  `about/page.tsx` when ready.
- **OG image** (`public/images/og-image.svg`) — a simple placeholder social
  share card; swap for a designed one before publishing widely.

### Contact form

The contact form posts to `src/app/api/contact/route.ts`. Without any
configuration it validates input and logs submissions server-side. To send
real emails:

1. Create a free [Resend](https://resend.com) account and get an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and
   `CONTACT_TO_EMAIL`.
3. Redeploy — the route automatically switches to sending real email once
   `RESEND_API_KEY` is present.

---

## Design System

- **Color:** white/`#0a0a0a` in light mode, inverted in dark mode, one accent
  blue (`#0071e3`) used sparingly for links, highlights, and chart accents.
- **Type:** system font stack (San Francisco on Apple devices, Segoe UI on
  Windows) — no webfont download, keeps the site fast and avoids
  render-blocking font requests.
- **Motion:** Framer Motion `fade-up` / `scale-in` entrances on scroll,
  respecting `prefers-reduced-motion`. Nothing loops aggressively or
  distracts from content.
- **Dark mode:** class-based (`next-themes`), toggle in the header, persisted
  to `localStorage`, defaults to the visitor's OS preference.

---

## SEO & Accessibility

- Per-page `<title>` / meta description via `buildMetadata()`
  (`src/lib/metadata.ts`), OpenGraph + Twitter Card tags, canonical URLs.
- JSON-LD `Person` structured data in the root layout (name, job title,
  socials, alma maters).
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` /
  `robots.ts` — automatically includes every project detail page.
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, heading hierarchy), skip-to-
  content link, visible focus rings, `aria-label`/`aria-current` on
  navigation, accessible form labels + error messaging with `aria-invalid` /
  `aria-describedby`.
- Color contrast and interactive target sizes designed to meet WCAG 2.1 AA.

Run a Lighthouse audit locally against `npm run build && npm run start` for
accurate performance numbers (dev mode is not representative).

---

## Deployment (Vercel)

### Option A — Vercel Dashboard

1. Push this repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected). No build config changes
   needed.
4. Add environment variables under **Project Settings → Environment
   Variables** (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your production domain, e.g.
     `https://asmababazadehkahrizi.com`
   - `RESEND_API_KEY` (optional, enables real contact-form emails)
   - `CONTACT_TO_EMAIL` (optional)
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # preview deployment
vercel --prod     # production deployment
```

### Custom domain

Add your domain under **Project Settings → Domains** in Vercel, then update
`NEXT_PUBLIC_SITE_URL` to match so metadata/sitemap URLs stay correct.

---

## Suggested Commit History

If you're evolving this project further, keep commits scoped and
conventional, for example:

```
feat: scaffold Next.js + TypeScript + Tailwind project
feat: add typed content layer for projects, skills, experience, education
feat: build global layout, theming, header and footer
feat: build home page with hero, animated background and CTAs
feat: build about page with career journey
feat: build project grid and case-study detail pages
feat: build skills, experience and education pages
feat: build contact page with validated form and API route
feat: add SEO metadata, sitemap, robots and structured data
chore: add placeholder screenshots, profile photo and favicon
feat: build HR analytics, recruitment, and sales personal data projects
feat: build customer analytics, data cleaning, and SQL BI personal data projects
feat: replace placeholder project copy and screenshots with real analysis
chore: configure Vercel deployment and environment variables
docs: add README with setup and deployment instructions
```

---

## Note on this repository

This repository previously held a standalone "Google Play Market Analysis &
Insights" report. That presentation has been preserved at
`public/documents/google-play-market-analysis-presentation.pdf` and is still
reachable from the deployed site; the repository itself has been rebuilt from
scratch into this full portfolio website.

## License

MIT — personal portfolio content (name, bio, project descriptions) is not
covered by the license and should not be reused as-is.
