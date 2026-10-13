import { BrowserFrame } from "@/components/ProjectCard";
import { formatStars, prUrl } from "@/lib/contributions";

export function Stars({ count }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--muted)]">
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
      </svg>
      <span>
        {formatStars(count)}
        <span className="sr-only"> GitHub stars</span>
      </span>
    </span>
  );
}

export function PrList({ repo, prs }) {
  return (
    <ul className="space-y-1.5">
      {prs.map((pr) => (
        <li key={pr.number} className="flex items-baseline gap-2 text-[14.5px]">
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="var(--merged)"
            role="img"
            aria-label="Merged"
            className="shrink-0 translate-y-[2px]"
          >
            <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
          </svg>
          <a href={prUrl(repo, pr.number)} target="_blank" rel="noreferrer" className="link">
            {pr.title}&nbsp;↗
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ContributionCard({ contribution, headingLevel = 3 }) {
  const { name, repo, stars, description, live, preview, prs } = contribution;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article>
      {preview && (
        <BrowserFrame
          src={preview}
          alt={`Screenshot of ${name}`}
          domain={live ? new URL(live).hostname : null}
          href={live}
        />
      )}
      <div className={preview ? "mt-5" : ""}>
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{repo}</p>
          <Stars count={stars} />
        </div>
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <Heading className="text-[19px] font-semibold tracking-tight">{name}</Heading>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            rel="noreferrer"
            className="link text-[14px]"
          >
            Repository ↗
          </a>
        </div>
        <p className="mt-2 max-w-[60ch] text-[15.5px] text-[var(--muted)]">
          {description}
        </p>
        <div className="mt-4">
          <PrList repo={repo} prs={prs} />
        </div>
      </div>
    </article>
  );
}
