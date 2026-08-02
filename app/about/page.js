import Link from "next/link";
import { SOCIALS } from "@/lib/nav";

export const metadata = { title: "About · Samuel Ngobi" };

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "FruitlandCyprus",
    link: "https://fruitlandcyprus.com",
    period: "Feb 2026 – Present",
    points: [
      "Engineered a high-performance, mobile-responsive web app with Next.js and Tailwind CSS, hitting a 95+ Lighthouse score across devices.",
      "Cut initial page load time by 48% by optimizing asset delivery for a 40+ image gallery with the Next.js Image component and lazy loading.",
      "Set up custom domain mapping and automated SSL, giving the client a secure, always-on channel for inquiries.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Space Launch Tracker",
    link: "https://launch-status.vercel.app",
    period: "Jan 2026 – Present",
    points: [
      "Built a real-time mission-tracking engine in React 19, syncing high-frequency data from global space-agency APIs for sub-second countdown accuracy.",
      "Turned client feedback into shipped UI features, including a dynamic launch-window slider and a glassmorphic visual redesign.",
      "Standardized a Git-flow deployment strategy with API versioning, keeping feature delivery fast with zero downtime during active client review.",
    ],
  },
  {
    role: "Backend Developer",
    company: "E-Commerce Production Recovery (MERN)",
    link: "https://github.com/samuel-sarmah/mern-app",
    period: "Dec 2025 – Feb 2026",
    points: [
      "Inherited a failing, undocumented production platform and stabilized it within a tight deadline.",
      "Hardened security by identifying and patching 7+ critical CVE vulnerabilities in the Node.js runtime, closing high-risk exploits on the customer data pipeline.",
      "Resolved a total authentication outage by re-architecting broken MongoDB connection logic and Express middleware, restoring checkout and account access.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Sterz Creator Marketplace",
    link: "https://ster-seven.vercel.app",
    period: "June 2026",
    points: [
      "Architected a two-sided creator marketplace from scratch, modeling the full escrow lifecycle across hold, verification, and release states.",
      "Built a multi-tenant data model with auth isolating brand and creator accounts, mirroring the tenant-separation pattern production commerce platforms rely on.",
    ],
  },
  {
    role: "Frontend Content Board Member",
    company: "LogRocket",
    link: null,
    period: "Sept 2025 – Mar 2026",
    points: [
      "Technical reviewer for a leading industry publication, vetting 12+ deep-dive frontend and backend articles monthly for technical accuracy.",
      "Gave architectural feedback on 60+ technical guides, upholding quality standards for a global developer audience.",
    ],
  },
];

export default function About() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">About</h1>
      <div className="mt-5 space-y-4 text-[17px]">
        <p>
          I'm Samuel Ngobi, a web developer with 2+ years of experience. I work mainly with Next.js, React, Rails, and Tailwind CSS.
        </p>
        <p>
          I care about software that loads fast, works on every
          device, inclusive with accessibility compliance to WCAG 2.1.
          I value precision, clear communication, and continuous learning.
          When I'm not debugging code or managing CI/CD pipelines, I'm analyzing feedback and adjusting my strategies to work smarter and faster.
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
            <div key={`${job.role}-${job.company}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[17px] font-semibold tracking-tight">
                  {job.role}
                  <span className="font-normal text-[var(--muted)]"> · </span>
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
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
