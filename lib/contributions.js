export const CREED = [
  "Read the contributing guide before the code.",
  "Ask before building, so the work is wanted when it lands.",
  "Keep every change small enough to review in one sitting.",
  "Match the project's style, not my own.",
  "Let tests prove the fix, not the description.",
  "Respect the maintainer's time; it is the scarcest thing in the repo.",
  "Leave the codebase easier to read than I found it.",
];

export const CONTRIBUTIONS = [
  {
    name: "Manyfold",
    repo: "manyfold3d/manyfold",
    stars: 2198,
    about: "Self-hosted asset manager for 3D print files",
    summary:
      "Added print-host support so models go straight from the library to the printer. PrusaLink now detects each printer's API version and picks the matching upload method, and a new adapter sends G-code to Duet boards.",
    live: "https://manyfold.app",
    preview: "/contributions/manyfold.webp",
    prs: [
      { number: 7157, title: "Print via the new PrusaLink API", merged: "2026-09-22" },
      { number: 7160, title: "Print via the Duet API", merged: "2026-09-23" },
    ],
    featured: true,
  },
  {
    name: "ONEARMY Platform",
    repo: "ONEARMY/community-platform",
    stars: 1404,
    about: "The platform behind Precious Plastic and other communities tackling global problems",
    summary:
      "Migrated the site footer and the article call to action from the legacy theme-ui library to the new shadcn/Base UI components, with no visual change for users.",
    live: "https://community.preciousplastic.com",
    preview: "/contributions/onearmy.webp",
    prs: [
      { number: 4890, title: "Migrate the site footer to the new UI library", merged: "2026-09-15" },
      { number: 4931, title: "Migrate the article call to action", merged: "2026-09-28" },
    ],
    featured: true,
  },
  {
    name: "Adelpha",
    repo: "imr-framework/adelpha",
    stars: 17,
    about: "Smart low-field MRI console and digital twin",
    summary:
      "Split a 1,600-line App.tsx into shell, dashboard and panel modules, leaving a 200-line root that only wires them together.",
    live: "https://imr-framework.github.io/adelpha/",
    preview: "/contributions/adelpha.webp",
    prs: [{ number: 28, title: "Refactor the app shell components", merged: "2026-09-22" }],
    featured: true,
  },
  {
    name: "Spree Commerce",
    repo: "spree/spree",
    stars: 15752,
    about: "Open-source commerce platform for DTC, B2B and marketplaces",
    summary:
      "Fixed the testing tutorial's fixture command, which carried stray backticks that left the shell hanging when pasted.",
    live: "https://spreecommerce.org",
    preview: "/contributions/spree.webp",
    prs: [
      { number: 13718, title: "Fix trailing backticks in the testing tutorial", merged: "2026-03-04" },
    ],
    featured: true,
  },
  {
    name: "The Odin Project",
    repo: "TheOdinProject/curriculum",
    stars: 13138,
    about: "The open curriculum for learning web development",
    summary:
      "Fixed a typo in the Rails forms lesson and removed a resource link that raised a privacy error.",
    prs: [
      { number: 29801, title: "Fix a typo in the Rails forms project", merged: "2025-06-26" },
      { number: 29813, title: "Remove a broken link from Rock Paper Scissors", merged: "2025-06-30" },
    ],
  },
  {
    name: "HostedGPT",
    repo: "AllYourBot/hostedgpt",
    stars: 513,
    about: "An open ChatGPT you can host anywhere",
    summary:
      "Fixed the Test button on API services, which returned a 500 whenever RubyLLM served the provider, and covered it with tests.",
    prs: [{ number: 820, title: "Fix the RubyLLM test link", merged: "2026-10-08" }],
  },
  {
    name: "RubyEvents",
    repo: "rubyevents/rubyevents",
    stars: 569,
    about: "An index of every Ruby event",
    summary: "Moved the app from RubyLLM::Schema to its 1.0 successor, Schematist.",
    prs: [{ number: 2133, title: "Migrate RubyLLM::Schema to Schematist", merged: "2026-09-22" }],
  },
  {
    name: "CASA",
    repo: "rubyforgood/casa",
    stars: 382,
    about: "Volunteer management for nonprofits serving foster youth",
    summary: "Dropped a Brakeman suppression that the Rails 8.1 upgrade made stale.",
    prs: [
      { number: 7200, title: "Drop the stale EOL Rails Brakeman ignore", merged: "2026-09-21" },
    ],
  },
];

export const HIGHLIGHTS = CONTRIBUTIONS.filter((c) => c.featured);
export const OTHERS = CONTRIBUTIONS.filter((c) => !c.featured);

export async function withStars(list) {
  return Promise.all(
    list.map(async (c) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${c.repo}`, {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 86400 },
        });
        if (!res.ok) return c;
        const { stargazers_count } = await res.json();
        return { ...c, stars: stargazers_count ?? c.stars };
      } catch {
        return c;
      }
    }),
  );
}

export function formatStars(n) {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

export function prUrl(repo, number) {
  return `https://github.com/${repo}/pull/${number}`;
}

export function formatMerged(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
