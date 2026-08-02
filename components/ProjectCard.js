import Image from "next/image";
import { TechRow } from "@/components/TechIcon";

/* Browser-chrome frame around a live screenshot so previews read as real,
   running products rather than mockups. */
function BrowserFrame({ src, alt, domain, href }) {
  const frame = (
    <figure className="overflow-hidden border border-[var(--line)] bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--chrome)] px-3.5 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        {/* No address pill for a project that isn't deployed yet: an empty
            URL bar reads as broken, where bare chrome just reads as a window. */}
        {domain && (
          <span className="mx-auto flex max-w-[70%] items-center gap-1.5 bg-[var(--bg)] px-3 py-0.5 text-[11px] tracking-wide text-[var(--muted)]">
            <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" aria-hidden="true">
              <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 1 1 6 0v3Z" />
            </svg>
            {domain}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={750}
        className="block w-full"
        sizes="(max-width: 768px) 100vw, 736px"
      />
    </figure>
  );

  if (!href) return frame;
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${domain}`}>
      {frame}
    </a>
  );
}

export default function ProjectCard({ project, headingLevel = 3 }) {
  const { name, tagline, description, stack, live, code, preview } = project;
  const domain = live ? new URL(live).hostname : null;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article>
      {preview && (
        <BrowserFrame
          src={preview}
          alt={`Screenshot of ${name}`}
          domain={domain}
          href={live}
        />
      )}
      <div className={preview ? "mt-5" : ""}>
        {tagline && (
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {tagline}
          </p>
        )}
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <Heading className="text-[19px] font-semibold tracking-tight">{name}</Heading>
          <span className="flex gap-4 text-[14px] font-medium">
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="link">
                Live site ↗
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noreferrer" className="link">
                Source ↗
              </a>
            )}
          </span>
        </div>
        <p className="mt-2 max-w-[60ch] text-[15.5px] text-[var(--muted)]">
          {description}
        </p>
        {stack && (
          <div className="mt-4">
            <TechRow items={stack} size={14} />
          </div>
        )}
      </div>
    </article>
  );
}
