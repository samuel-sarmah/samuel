import Link from "next/link";
import { getWritings } from "@/lib/content";

export const metadata = { title: "Writings · Samuel Sarmah" };

export default function Writings() {
  const posts = getWritings();
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Writings</h1>
      <p className="mt-4 text-[var(--muted)]">
        Notes on building for the web: what I&apos;m making, breaking, and
        learning along the way.
      </p>
      <ul className="mt-10 space-y-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/writings/${p.slug}`} className="text-lg font-semibold hover:opacity-70">
              {p.title}
            </Link>
            {p.date && <p className="mt-1 text-[13px] uppercase tracking-wide text-[var(--muted)]">{p.date}</p>}
            {p.summary && <p className="mt-2 text-[var(--muted)]">{p.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
