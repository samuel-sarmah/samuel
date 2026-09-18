/* The three-step way a project runs, shown on the homepage and again on the
   contact page so people know what happens after they hit send. */
export const PROCESS = [
  {
    title: "Scope",
    body: "You tell me what you need, we settle a fixed scope and timeline over a short call or email thread before any work starts.",
  },
  {
    title: "Build",
    body: "You watch progress on a live staging link as I build. Feedback goes straight into the next update.",
  },
  {
    title: "Handoff",
    body: "You receive the deployed site, the source code, and a CMS you can edit yourself, plus a walkthrough.",
  },
];

export default function ProcessSteps() {
  return (
    <ol className="space-y-8">
      {PROCESS.map((step) => (
        <li key={step.title}>
          <h3 className="item-title">{step.title}</h3>
          <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-[var(--muted)]">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
