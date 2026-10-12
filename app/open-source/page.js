import ClosingCta from "@/components/ClosingCta";
import ContributionCard, { PrList, Stars } from "@/components/ContributionCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { CREED, HIGHLIGHTS, OTHERS, withRepoInfo } from "@/lib/contributions";

export const metadata = { title: "Open source · Samuel Ngobi" };

export default async function OpenSource() {
  const [highlights, others] = await Promise.all([withRepoInfo(HIGHLIGHTS), withRepoInfo(OTHERS)]);

  return (
    <div>
      <PageHeader
        title="Open source"
        intro="I contribute to projects I use and admire, from 3D-printing tools to commerce platforms. Every entry below is a merged pull request you can read."
      />

      <section aria-labelledby="creed" className="mt-12 border border-[var(--line)] bg-[var(--card)] px-6 py-8 sm:px-9 sm:py-10">
        <h2 id="creed" className="eyebrow">
          The open source creed
        </h2>
        <blockquote className="mt-5">
          <p className="display text-[clamp(1.6rem,4vw,2.1rem)]">&ldquo;{CREED}&rdquo;</p>
        </blockquote>
      </section>

      <Section title="Highlights">
        <div className="space-y-16">
          {highlights.map((c) => (
            <ContributionCard key={c.repo} contribution={c} />
          ))}
        </div>
      </Section>

      <Section title="More contributions">
        <ul className="space-y-10">
          {others.map((c) => (
            <li key={c.repo}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="item-title">
                  <a
                    href={`https://github.com/${c.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-70"
                  >
                    {c.name}
                  </a>
                </h3>
                <Stars count={c.stars} />
              </div>
              <p className="mt-1 max-w-[60ch] text-[15px] text-[var(--muted)]">{c.description}</p>
              <div className="mt-3">
                <PrList repo={c.repo} prs={c.prs} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta
        title="Maintain a project?"
        body="If your repo has an issue that needs a careful pair of hands, point me at it. I read the contributing guide first and keep the diff small."
        cta="Get in touch"
      />
    </div>
  );
}
