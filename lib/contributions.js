export const CREED =
  "Every human has an intrinsic right to set their original creations free into the commons, to be indefinitely and irrevocably available for progress, without duty or commitment.";

export const CONTRIBUTIONS = [
  {
    name: "Manyfold",
    repo: "manyfold3d/manyfold",
    description: "A self-hosted digital asset manager for 3d print files.",
    stars: 2198,
    live: "https://manyfold.app",
    preview: "/contributions/manyfold.webp",
    prs: [
      { number: 7157, title: "Print via the new PrusaLink API" },
      { number: 7160, title: "Print via the Duet API" },
    ],
    featured: true,
  },
  {
    name: "ONEARMY Platform",
    repo: "ONEARMY/community-platform",
    description: "A platform to build useful communities that aim to tackle global problems",
    stars: 1404,
    live: "https://community.preciousplastic.com",
    preview: "/contributions/onearmy.webp",
    prs: [
      { number: 4890, title: "Migrate the site footer to the new UI library" },
      { number: 4931, title: "Migrate the article call to action" },
    ],
    featured: true,
  },
  {
    name: "Adelpha",
    repo: "imr-framework/adelpha",
    description: "Adelpha is an advanced smart low-field MRI console and digital twin platform.",
    stars: 17,
    live: "https://imr-framework.github.io/adelpha/",
    preview: "/contributions/adelpha.webp",
    prs: [{ number: 28, title: "Refactor the app shell components" }],
    featured: true,
  },
  {
    name: "Spree Commerce",
    repo: "spree/spree",
    description: "Open Source Platform for DTC, B2B Commerce, Marketplaces & Omnichannel. REST APIs, TypeScript SDKs, and production-ready Next.js storefront. Self-host it. Own your data. No vendor lock-in. Zero platform fees.",
    stars: 15752,
    live: "https://spreecommerce.org",
    preview: "/contributions/spree.webp",
    prs: [
      { number: 13718, title: "Fix trailing backticks in the testing tutorial" },
    ],
    featured: true,
  },
  {
    name: "The Odin Project",
    repo: "TheOdinProject/curriculum",
    description: "The open curriculum for learning web development",
    stars: 13138,
    prs: [
      { number: 29801, title: "Fix a typo in the Rails forms project" },
      { number: 29813, title: "Remove a broken link from Rock Paper Scissors" },
    ],
  },
  {
    name: "HostedGPT",
    repo: "AllYourBot/hostedgpt",
    description: "An open version of ChatGPT you can host anywhere or run locally.",
    stars: 513,
    prs: [{ number: 820, title: "Fix the RubyLLM test link" }],
  },
  {
    name: "RubyEvents",
    repo: "rubyevents/rubyevents",
    description: "On a mission to index all Ruby events.",
    stars: 569,
    prs: [{ number: 2133, title: "Migrate RubyLLM::Schema to Schematist" }],
  },
  {
    name: "CASA",
    repo: "rubyforgood/casa",
    description: "Volunteer management system for nonprofit CASA, which serves foster youth in counties across America.",
    stars: 382,
    prs: [
      { number: 7200, title: "Drop the stale EOL Rails Brakeman ignore" },
    ],
  },
];

export const HIGHLIGHTS = CONTRIBUTIONS.filter((c) => c.featured);
export const OTHERS = CONTRIBUTIONS.filter((c) => !c.featured);

export async function withRepoInfo(list) {
  return Promise.all(
    list.map(async (c) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${c.repo}`, {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 86400 },
        });
        if (!res.ok) return c;
        const { stargazers_count, description } = await res.json();
        return {
          ...c,
          stars: stargazers_count ?? c.stars,
          description: description || c.description,
        };
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
