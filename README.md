# Samuel Ngobi, Personal Site

A personal portfolio and writing site built with Next.js 15 (App Router) and
Tailwind CSS 4. The homepage leads with a plain-language value proposition,
services, and a call to action, so a non-technical visitor can tell what I do
and how to hire me without reading any jargon. Content lives in Markdown files
and JavaScript modules; there is no database and no CMS.

The layout is a left rail, a persistent sidebar on
desktop, and a fixed header with a hamburger menu on mobile. The palette is
deliberately light only, ink (`#101113`) on paper (`#F4F4F4`), held in CSS
variables in `app/globals.css`: a visitor whose OS is set to dark mode still
sees the same design as everyone else. Typography pairs Instrument Serif for
headlines with Geist for body copy, both self-hosted at build time. The favicon
in `app/icon.svg` is the Instrument Serif italic "S" as a vector outline, so the
mark and the headlines share one letterform.




## Unlinked routes

`/writings` and `/now` build and render, but nothing currently links to them:
`NAV` in `lib/nav.js` lists only Home, Work, Books, and About. They are reachable
by URL only until they are added back to that array.

## Current state

Open TODOs, all findable by searching for `TODO`:

- `app/work/page.js`: the E-Commerce store has no live URL yet, so
  its card renders without them.
- `app/about/page.js`: LinkedIn link is stubbed out.
- `content/writings/building-fruitland-cyprus.md`: a starter draft, with two
  sections still unwritten. It is the only post in `content/writings/`.

