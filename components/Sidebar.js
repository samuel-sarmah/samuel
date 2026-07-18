"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SOCIALS, isActive } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";

// Desktop only. Below md, navigation is handled by MobileHeader.
export default function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden md:sticky md:top-14 md:block md:h-fit md:w-48 md:shrink-0">
      <div className="flex items-start justify-between gap-2">
        <Link href="/" className="block">
          <span className="text-[16px] font-bold tracking-tight">Samuel Ngobi</span>
          <span className="block text-[13.5px] text-[var(--muted)]">Fullstack Web Developer</span>
        </Link>
        <ThemeToggle className="-mr-2 mt-0.5" />
      </div>

      <nav className="mt-8 flex flex-col gap-y-2.5">
        {NAV.map((n) => {
          const active = isActive(pathname, n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={
                "text-[15px] transition-colors " +
                (active
                  ? "font-medium text-[var(--fg)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]")
              }
            >
              {n.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contact"
        className="mt-8 inline-block bg-[var(--fg)] px-4 py-2 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
      >
        Contact me 
      </Link>

      <div className="mt-8 flex flex-col gap-y-2.5 text-[14px] text-[var(--muted)]">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
          >
            {s.label} 
          </a>
        ))}
      </div>

      <p className="mt-8 text-[13px] text-[var(--muted)]">
        © {new Date().getFullYear()} Samuel Ngobi
      </p>
    </aside>
  );
}
