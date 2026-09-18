import Image from "next/image";
import Link from "next/link";
import ClosingCta from "@/components/ClosingCta";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
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
    name: "Fruitland Cyprus",
    tagline: "client work · citrus farm",
    description:
      "Marketing site for a family citrus farm in Cyprus. The owners needed a fast site they could update. In the first month of launch, orders increased by 57% doubling the profits. I owned the whole build, from design through Sanity CMS setup to deployment, so they edit products and content themselves.",
    live: "https://fruitlandcyprus.com",
    preview: "/previews/fruitland.webp",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
  },
  {
    name: "Sterz",
    tagline: "creator marketplace",
    description:
      "A two-sided marketplace where brands fund campaigns into escrow and creators get paid as verified views land, view counts checked against each platform's API. Owned building of auth, marketplace flows, and payouts.",
    live: "https://ster-seven.vercel.app",
    preview: "/previews/sterz.webp",
    stack: ["Next.js", "Supabase", "Vercel"],
  },
  {
    name: "LaunchTracker",
    tagline: "live mission dashboard",
    description:
      "A real-time dashboard for rocket launches: live countdowns, go/no-go status, a watchlist, and space-industry news, all updating without a page refresh. During artemis 2 season, this site served 3000+ users with realtime streaming links and updates through the news channels. ",
    live: "https://launch-status.vercel.app",
    preview: "/previews/launch-status.webp",
    stack: ["Next.js", "Vercel"],
  },
];

const PROCESS = [
  {
    title: "Scope",
    body: "You tell me what you need, we settle a fixed scope and timeline over a short call or email thread before any work starts.",
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
      {/* Hero — the full artwork shows edge to edge behind a uniform dark
          scrim, with light text on top so both sides of the piece stay
          visible in either theme. */}
      <section className="relative overflow-hidden border border-[var(--line)]">
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 736px"
          className="object-cover "
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
        <div className="relative px-6 py-20 text-white sm:px-9 sm:py-28">         
          <h1 className="mt-6 max-w-[46ch] text-[20px] font-normal text-white/90">
            I'm Samuel Ngobi(Sarmah), a fullstack web developer driven by the challenge of turning complex requirements
            into clean, intuitive digital experiences.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <Link
              href="/contact"
              className="btn btn-inverse"
            >
              Start a project →
            </Link>
            <Link
              href="/work"
              className="font-[550] text-white transition-opacity hover:opacity-70"
            >
              See my work
            </Link>
          </div>
        </div>
      </section>

      <Section title="Tech stack">
        <TechGrid groups={STACK} />
      </Section>

      <Section title="Selected work" action={{ href: "/work", label: "All projects" }}>
        <div className="space-y-16">
          {FEATURED.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </Section>

      <Section title="How we work">
        <ol className="space-y-8">
          {PROCESS.map((step) => (
            <li key={step.title}>
              <h3 className="text-[16px] font-medium">{step.title}</h3>
              <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-[var(--muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta />
    </div>
  );
}
