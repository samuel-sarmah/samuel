import Link from "next/link";

export default function ClosingCta({
  title = "Need a website shipped?",
  body = "Tell me what's blocking you: a build that stalled, a site that's slow, or an idea that needs to go live. I read every message and reply within 4 hours.",
  cta = "Let's chat",
  href = "/contact",
  children,
}) {
  return (
    <section className="mt-24">
      <h2 className="display text-[clamp(1.9rem,4.5vw,2.4rem)]">{title}</h2>
      <p className="mt-4 max-w-[48ch] text-[16px] text-[var(--muted)]">{body}</p>
      <p className="mt-6">
        <Link href={href} className="btn">
          {cta} →
        </Link>
      </p>
      {children}
    </section>
  );
}
