# Samuel Ngobi — Personal Site
Next.js 15 + Tailwind CSS 4. Left-sidebar navigation, no top header. The
homepage leads with a plain-language value proposition, services, and a
clear call to action so non-technical clients immediately understand what
I do and how to hire me. Blog, books, and now pages are driven by plain
Markdown files, no database and no CMS.

Light/dark mode is automatic (follows the visitor's system setting) via
CSS variables in `app/globals.css`.

## Structure

```
app/            pages (home, work, writings, books, now, about)
components/
  Sidebar.js    left-rail nav + contact (active link highlighted)
  BookCover.js  book cover image with initials fallback
content/
  writings/     blog posts (one .md file per post)
  now.md        current learnings & hobbies
lib/
  content.js    reads and parses the markdown (writings, now)
  books.js      books data: title, author, note, buy link, cover slug
public/books/   book cover images (<slug>.jpg, from Open Library)
```

The Books page renders structured data from `lib/books.js` as cards with
cover images. To add or change a book, edit that file; cover images live
in `public/books/<slug>.jpg` (re-run `scripts/fetch_covers` style lookup
against Open Library, or drop a JPG in with the matching slug). If a cover
is missing, the card falls back to a clean initials placeholder.

Contact is a plain `mailto:` link (address set in `components/Sidebar.js`
and reused on the home and about pages).

## Publishing a blog post

Drop a `.md` file into `content/writings/`:

```markdown
---
title: "My post title"
date: "2026-07-20"
summary: "One line shown in the list."
---

Post body in plain Markdown...
```

Push to GitHub — Vercel rebuilds and the post is live. Same idea for
`now.md`: edit, push, done. Books are edited in `lib/books.js`.

## TODOs before deploying (search for "TODO")

- `app/work/page.js` — add the E-Commerce live URL once deployed
- `content/now.md` — keep learnings and hobbies current
- `content/writings/building-fruitland-cyprus.md` — finish the draft sections
- `content/writings/how-to-add-a-post.md` — delete after your first real post
- `app/about/page.js` — add LinkedIn when ready

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (free)

1. Push this folder to a GitHub repo
2. vercel.com → Add New Project → import → Deploy (zero config)
3. Optional: add a custom domain in Vercel → Domains

## Contact

Contact is a standard `mailto:` link that opens the visitor's email app
addressed to you. The address lives in `components/Sidebar.js` (and is
reused on the home and about pages); change it in those spots if your
address ever changes.
