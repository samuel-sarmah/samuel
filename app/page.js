import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { TechGrid } from "@/components/TechIcon";

const EMAIL = "sarmah2020samuel@gmail.com";

const STACK = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Rails"],
  },
  {
    label: "Data & infra",
    items: [
      "PostgreSQL",
      "SQLite",
      "MongoDB",
      "Supabase",
      "Sanity",
      "Vercel",
    ],
  },
];

const FEATURED = [
  {
    name: "Fruitland Cyprus",
    tagline: "citrus farm, Cyprus",
    description:
      "A marketing website for a citrus farm. Product showcase and content the owners update themselves, no code needed.",
    live: "https://fruitlandcyprus.com",
    preview: "/previews/fruitland.webp",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
  },
  {
    name: "Sterz",
    tagline: "creator marketplace",
    description:
      "A two-sided marketplace connecting content creators with brands, matching paid work to the right people.",
    live: "https://ster-seven.vercel.app",
    preview: "/previews/sterz.webp",
    stack: ["Next.js", "Supabase", "Vercel"],
  },
  {
    name: "LaunchTracker",
    tagline: "live mission dashboard",
    description:
      "A real-time dashboard for rocket launches: live countdowns, mission status, a watchlist, and aggregated space-industry news.",
    live: "https://launch-status.vercel.app",
    preview: "/previews/launch-status.webp",
    stack: ["Next.js", "Vercel"],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section>
        <p className="flex items-center gap-2.5 text-[13.5px] font-medium text-[var(--muted)]">
          <span className="status-dot" />
          Available for freelance projects &amp; full-time roles
        </p>
        <h1 className="display mt-6 text-[clamp(2.4rem,6.5vw,3.4rem)]">
          Websites, web apps, and SaaS products.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[17px] text-[var(--muted)]">
          I'm Samuel Ngobi, a fullstack web developer. I turn ideas, into fast, modern software that people trust.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <a
            href={`mailto:${EMAIL}`}
            className="bg-[var(--fg)] px-6 py-2.5 font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Start a project →
          </a>
          <Link href="/work" className="link">
            See my work
          </Link>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mt-24">
        <h2 className="section-label">Tech stack</h2>
        <div className="mt-8">
          <TechGrid groups={STACK} />
        </div>
      </section>

      {/* Selected work */}
      <section className="mt-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-label">Selected work</h2>
          <Link
            href="/work"
            className="text-[14px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-10 space-y-16">
          {FEATURED.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mt-24">
        <h2 className="display text-[clamp(1.9rem,4.5vw,2.4rem)]">
          Have something in mind?
        </h2>
        <p className="mt-4 max-w-[48ch] text-[16px] text-[var(--muted)]">
          Tell me what you're trying to build or fix. I read every message
          and reply within 4 hours.
        </p>
        <p className="mt-6">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block bg-[var(--fg)] px-6 py-2.5 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            contact me
          </a>
        </p>
      </section>
    </div>
  );
}
