import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

export const metadata = { title: "Work · Samuel Ngobi" };

const PROJECTS = [
  {
    name: "LaunchTracker",
    tagline: "live mission dashboard",
    description:
      "A real-time dashboard for upcoming rocket launches: live countdowns, mission and go/no-go status, a personal watchlist, and aggregated space-industry news, all updating without a page refresh. Designed and built solo, end to end — data fetching, live updates, and UI.",
    stack: ["Next.js", "Vercel"],
    live: "https://launch-status.vercel.app",
    preview: "/previews/launch-status.webp",
    code: null,
  },
  {
    name: "Fruitland Cyprus",
    tagline: "client work · citrus farm, Cyprus",
    description:
      "A complete marketing website for a family citrus farm. The owners needed a fast site they could update without a developer on call — I owned the whole project: design, build, Sanity CMS setup, and deployment. They now edit products and content themselves, no code needed.",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
    live: "https://fruitlandcyprus.com",
    preview: "/previews/fruitland.webp",
    code: "https://github.com/samuel-sarmah/fruitland-cyprus",
  },
  {
    name: "Sterz",
    tagline: "creator marketplace",
    description:
      "A two-sided marketplace that connects content creators with brands: campaign budgets are locked in escrow, view counts are verified straight from each platform's API, and creators are paid out as views land — neither side has to trust screenshots. Built solo: auth, marketplace flows, and payouts.",
    stack: ["Next.js", "Supabase", "Vercel"],
    live: "https://ster-seven.vercel.app",
    preview: "/previews/sterz.webp",
    code: null,
  },
  {
    name: "E-Commerce Store",
    tagline: "fullstack MERN build",
    description:
      "A full-stack e-commerce application: product catalog with brand and category filtering, wishlist, ratings, and a seeded MongoDB backend behind an Express REST API.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: null, // TODO: deploy and add the URL
    preview: "/previews/ecommerce.webp",
    code: "https://github.com/samuel-sarmah/mern-app",
  },
];

export default function Work() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Work</h1>
      <p className="mt-4 max-w-[56ch] text-[16px] text-[var(--muted)]">
        A few things I&apos;ve built. Every project links to the live site or
        the source code.
      </p>
      <div className="mt-12 space-y-16">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

      <p className="mt-16 text-[var(--muted)]">
        Need something like this shipped for your business?{" "}
        <Link href="/contact" className="link">
          Tell me what you need
        </Link>
        .
      </p>
    </div>
  );
}
