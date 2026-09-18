# Samuel Ngobi, Personal Site

A personal portfolio built with Next.js 15 (App Router) and Tailwind CSS 4.
The homepage leads with a plain-language value proposition, selected work,
and a call to action, so a non-technical visitor can tell what I do and how
to hire me without reading any jargon. Content lives in JavaScript modules
and one Markdown file; the only backend is a Supabase table that receives
contact-form messages.

The layout is a left rail, a persistent sidebar on desktop, and a fixed
header with a hamburger menu on mobile. Light is the default palette, ink on
warm paper, with an opt-in dark theme stored in local storage; both live as
CSS variables in `app/globals.css`. Typography pairs Instrument Serif for
headlines with Geist for body copy, both self-hosted at build time. The
favicon in `app/icon.svg` is the Instrument Serif italic "S" as a vector
outline, so the mark and the headlines share one letterform.

## Design system

Every page is assembled from the same handful of pieces, defined once and
reused so the homepage and the inner pages can't drift:

- `components/PageHeader.js`: display-serif page title plus an optional
  muted intro.
- `components/Section.js`: a titled section with the homepage's spacing and
  an optional right-aligned action link.
- `components/ClosingCta.js`: the display question, one-line pitch and
  primary button that ends every page.
- `components/ProcessSteps.js`: the Scope / Build / Handoff steps, shown on
  the homepage and the contact page.
- `lib/projects.js`: one list of projects feeding both the homepage's
  selected work and the Work page.
- `app/globals.css`: shared classes `.btn`, `.btn-inverse`, `.btn-sm`,
  `.eyebrow`, `.section-label`, `.item-title`, `.link`, `.display`.

## Unlinked routes

`/now` builds and renders, but nothing currently links to it: `NAV` in
`lib/nav.js` lists only Home, Work, Books, and About. It is reachable by URL
only until it is added back to that array.

## Current state

Open TODOs, all findable by searching for `TODO`:

- `lib/projects.js`: the E-Commerce store has no live URL yet, so its card
  renders without one.
