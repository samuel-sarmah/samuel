import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { TechGrid } from "@/components/TechIcon";

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
    name: "LaunchTracker",
    tagline: "live mission dashboard",
    description:
      "A real-time dashboard for rocket launches: live countdowns, go/no-go status, a watchlist, and space-industry news, all updating without a page refresh. Designed and built solo, end to end — the clearest proof of how I handle live data, performance, and polish.",
    live: "https://launch-status.vercel.app",
    preview: "/previews/launch-status.webp",
    stack: ["Next.js", "Vercel"],
  },
  {
    name: "Fruitland Cyprus",
    tagline: "client work · citrus farm",
    description:
      "Marketing site for a family citrus farm in Cyprus. The owners needed a fast site they could update without calling a developer — I owned the whole build, from design through Sanity CMS setup to deployment, so they edit products and content themselves.",
    live: "https://fruitlandcyprus.com",
    preview: "/previews/fruitland.webp",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
  },
  {
    name: "Sterz",
    tagline: "creator marketplace",
    description:
      "A two-sided marketplace where brands fund campaigns into escrow and creators get paid as verified views land, view counts checked against each platform's API, so neither side has to trust screenshots. Built solo: auth, marketplace flows, and payouts.",
    live: "https://ster-seven.vercel.app",
    preview: "/previews/sterz.webp",
    stack: ["Next.js", "Supabase", "Vercel"],
  },
];

const PROCESS = [
  {
    title: "Scope",
    body: "You tell me what you need; we settle a fixed scope and timeline over a short call or email thread before any work starts.",
  },
  {
    title: "Build",
    body: "You watch progress on a live staging link as I build. Feedback goes straight into the next update.",
  },
  {
    title: "Handoff",
    body: "You receive the deployed site, the source code, and a CMS you can edit yourself, plus a walkthrough.",
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
        <h1 className="mt-6 text-[clamp(2.1rem,5.5vw,3rem)] font-bold leading-[1.12] tracking-tight">
          Fast, polished websites and web apps for online businesses.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[17px] text-[var(--muted)]">
          I'm Samuel Ngobi, a fullstack web developer. I'm driven by the challenge of turning complex requirements
          into clean, intuitive digital experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <Link
            href="/contact"
            className="bg-[var(--fg)] px-6 py-2.5 font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Start a project →
          </Link>
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

      {/* How I work */}
      <section className="mt-24">
        <h2 className="section-label">How we work</h2>
        <ol className="mt-8 space-y-8">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="display text-[15px] text-[var(--muted)]">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-[16px] font-medium">{step.title}</h3>
                <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-[var(--muted)]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing CTA */}
      <section className="mt-24">
        <h2 className="display text-[clamp(1.9rem,4.5vw,2.4rem)]">
          Need a website shipped?
        </h2>
        <p className="mt-4 max-w-[48ch] text-[16px] text-[var(--muted)]">
          Tell me what's blocking you: a build that stalled, a site
          that's slow, or an idea that needs to go live. I read every
          message and reply within 4 hours.
        </p>
        <p className="mt-6">
          <Link
            href="/contact"
            className="inline-block bg-[var(--fg)] px-6 py-2.5 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Let's chat
          </Link>
        </p>
      </section>
    </div>
  );
}
