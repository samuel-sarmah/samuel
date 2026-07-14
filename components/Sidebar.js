"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMAIL, NAV, isActive } from "@/lib/nav";

// Desktop only. Below md, navigation is handled by MobileHeader.
export default function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden md:sticky md:top-14 md:block md:h-fit md:w-48 md:shrink-0">
      <Link href="/" className="block">
        <span className="text-[16px] font-bold tracking-tight">Samuel Ngobi</span>
        <span className="block text-[13.5px] text-[var(--muted)]">Fullstack Web Developer</span>
      </Link>

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

      <div className="mt-8 flex flex-col gap-y-2.5 text-[14px] text-[var(--muted)]">
        <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[var(--fg)]">
          Contact
        </a>
        <a
          href="https://github.com/samuel-sarmah"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-[var(--fg)]"
        >
          GitHub ↗
        </a>
      </div>

      <p className="mt-8 text-[13px] text-[var(--muted)]">
        © {new Date().getFullYear()} Samuel Ngobi
      </p>
    </aside>
  );
}
