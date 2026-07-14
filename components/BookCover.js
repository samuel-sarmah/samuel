"use client";

import { useState } from "react";

// Renders a book cover from /public/books/<slug>.jpg. If the image is
// missing or fails to load, it falls back to a clean placeholder showing
// the book's initials, so the page never shows a broken-image icon.
export default function BookCover({ slug, title }) {
  const [failed, setFailed] = useState(false);

  const initials = title
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  // Small, uniform 2:3 thumbnail (qy.co-style): every cover is the exact same
  // width and height across the page.
  const frame =
    "aspect-[2/3] w-[104px] shrink-0 overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--bg)] shadow-sm";

  if (failed) {
    return (
      <div
        className={`${frame} flex items-center justify-center text-[18px] font-semibold text-[var(--muted)]`}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={`/books/${slug}.jpg`}
      alt={`Cover of ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${frame} object-cover`}
    />
  );
}
