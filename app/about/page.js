import Link from "next/link";
import { SOCIALS } from "@/lib/nav";

export const metadata = { title: "About · Samuel Ngobi" };

const EXPERIENCE = [
  {
    role: "Freelance Fullstack Web Developer",
    period: "2+ years · remote",
    points: [
      "Designed, built, and shipped a marketing site for Fruitland Cyprus, a family citrus farm including a Sanity CMS handoff so the owners update products and content themselves, no developer on call.",
      "Built Sterz, a two-sided creator marketplace, solo: auth, campaign escrow, payouts, and view counts verified against each platform's API.",
      "Built LaunchTracker, a real-time rocket-launch dashboard with live countdowns, go/no-go status, and news that updates without a page refresh.",
      "Shipped a fullstack MERN e-commerce build: catalog with filtering, wishlist, ratings, and an Express REST API over MongoDB.",
    ],
  },
];

export default function About() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">About</h1>
      <div className="mt-5 space-y-4 text-[17px]">
        <p>
          I'm Samuel Ngobi, a web developer with 2+ years of experience. I build websites, web apps,
          and SaaS products, and I modernize sites and tools that have fallen
          behind. I work mainly with Next.js, React, Rails, and Tailwind CSS.
        </p>
        <p>
          I care about software that loads fast, works on every
          device, inclusive with accessibility compliance to WCAG 2.1, and feels trustworthy to the people you want as users, and that
          you can run without needing a developer on call. You can see the{" "}
          <a href="/work" className="link">projects I've shipped</a> with live
          links and source code.
        </p>
        <p>
          I'm currently available for freelance projects and open to
          full-time roles. If you have a project in mind, or a site that
          isn't pulling its weight, tell me about it and I'll reply
          within 4 hours.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="section-label">Experience</h2>
        <div className="mt-6 space-y-10">
          {EXPERIENCE.map((job) => (
            <div key={job.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[17px] font-semibold tracking-tight">
                  {job.role}
                </h3>
                <span className="text-[14px] text-[var(--muted)]">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-3 border-l border-[var(--line)]">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-[15.5px] text-[var(--muted)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.62em] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[var(--fg)]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="section-label">Education</h2>
        <div className="mt-6">
          <h3 className="text-[17px] font-semibold tracking-tight">
            Information Security Studies
          </h3>
          <p className="mt-1 text-[15.5px] text-[var(--muted)]">
            European University of Lefke, Cyprus
          </p>
        </div>
      </div>

      <div className="mt-14">
        <p className="section-label">Get in touch</p>
        <p className="mt-4">
          <Link
            href="/contact"
            className="inline-block bg-[var(--fg)] px-6 py-2.5 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Contact me →
          </Link>
        </p>
        <p className="mt-5 text-[14px] text-[var(--muted)]">
          Also on{" "}
          {SOCIALS.map((s, i) => (
            <span key={s.label}>
              {i > 0 && " and "}
              <a href={s.href} target="_blank" rel="noreferrer" className="link">
                {s.label} 
              </a>
            </span>
          ))}
          {/* TODO: add LinkedIn link here when ready */}
        </p>
      </div>
    </div>
  );
}
