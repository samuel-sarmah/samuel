import Link from "next/link";

/* A page section as the homepage lays them out: generous top margin, a bold
   section label, an optional right-aligned action link, and the content
   below. Sections are separated by whitespace rather than rules. */
export default function Section({ title, action, children, className = "" }) {
  return (
    <section className={`mt-24 ${className}`.trim()}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="section-label">{title}</h2>
        {action && (
          <Link
            href={action.href}
            className="text-[14px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            {action.label} →
          </Link>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
