"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SOCIALS, isActive } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";

// The sidebar is desktop-only, so on mobile navigation lives here: name and
// role on the left, hamburger on the right, in a header that stays put while
// the page scrolls.
export default function MobileHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // Close the menu after navigating, and on Escape.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="leading-tight">
          <span className="block text-[15px] font-bold tracking-tight">
            Samuel Ngobi
          </span>
          <span className="block text-[12.5px] text-[var(--muted)]">
            Fullstack Web Developer
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="bg-[var(--fg)] px-3.5 py-1.5 text-[13.5px] font-medium text-[var(--bg)]"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-10 w-10 items-center justify-center text-[var(--fg)]"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--bg)] px-5 pb-6 pt-3"
        >
          <ul className="flex flex-col">
            {NAV.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={
                      "block py-2.5 text-[17px] " +
                      (active
                        ? "font-medium text-[var(--fg)]"
                        : "text-[var(--muted)]")
                    }
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex gap-6 border-t border-[var(--line)] pt-4 text-[15px] text-[var(--muted)]">
            <Link href="/contact">Contact</Link>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
