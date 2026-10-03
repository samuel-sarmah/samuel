export default function PageHeader({ title, intro, children }) {
  return (
    <header>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">{title}</h1>
      {intro && (
        <p className="mt-4 max-w-[56ch] text-[16px] text-[var(--muted)]">{intro}</p>
      )}
      {children}
    </header>
  );
}
