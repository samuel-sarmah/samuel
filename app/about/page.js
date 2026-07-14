export const metadata = { title: "About · Samuel Sarmah" };

const EMAIL = "sarmah2020samuel@gmail.com";

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

      <div className="mt-10">
        <p className="section-label">Get in touch</p>
        <p className="mt-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block bg-[var(--fg)] px-6 py-2.5 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Contact me →
          </a>
        </p>
        <p className="mt-5 text-[14px] text-[var(--muted)]">
          Also on{" "}
          <a href="https://github.com/samuel-sarmah" target="_blank" rel="noreferrer" className="link">
            GitHub ↗
          </a>
          {/* TODO: add LinkedIn link here when ready */}
        </p>
      </div>
    </div>
  );
}
