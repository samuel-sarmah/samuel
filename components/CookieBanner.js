"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "cookie-notice-dismissed";

// The site sets no cookies just from browsing — only a single anonymous
// cookie, and only once a visitor likes a post, so a repeat like from the
// same browser doesn't count twice. This is a plain notice, not a consent
// gate, since there's nothing non-essential to opt in or out of.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--card)]"
    >
      <div className="mx-auto flex max-w-[61.6rem] flex-col items-start gap-3 px-5 py-4 text-[13.5px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="max-w-[54ch]">
          This site only sets a cookie when you like a post, so it isn&apos;t double-counted — no
          analytics or tracking. See the{" "}
          <Link href="/privacy" className="link">
            privacy policy
          </Link>{" "}
          for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 bg-[var(--fg)] px-4 py-2 text-[13.5px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
