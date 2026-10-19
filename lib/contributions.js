export const CREED =
  "Every human has an intrinsic right to set their original creations free into the commons, to be indefinitely and irrevocably available for progress, without duty or commitment.";

export const CONTRIBUTIONS = [
  {
    name: "Karakeep",
    repo: "karakeep-app/karakeep",
    description: "A self-hostable bookmark-everything app (links, notes and images) with AI-based automatic tagging and full text search",
    stars: 29802,
    live: "https://karakeep.app",
    preview: "/contributions/karakeep.webp",
    circle: "/contributions/karakeep-circle.webp",
    prs: [
      {
        number: 3192,
        title: "Stop the new list button from nesting the preview modal",
        summary: "Swapped a link-based dialog trigger for a button, so creating a list from a bookmark preview no longer stacks two modals.",
      },
    ],
    featured: true,
  },
  {
    name: "Manyfold",
    repo: "manyfold3d/manyfold",
    description: "A self-hosted digital asset manager for 3d print files.",
    stars: 2198,
    live: "https://manyfold.app",
    preview: "/contributions/manyfold.webp",
    prs: [
      {
        number: 7157,
        title: "Print via the new PrusaLink API",
        summary: "Detected each printer's API version so uploads route to the v1 or legacy endpoint, making it work across Prusa firmware.",
      },
      {
        number: 7160,
        title: "Print via the Duet API",
        summary: "Added a Duet print adapter that sends gcode through short-lived DSF API sessions, so Duet owners can print from Manyfold.",
      },
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
    circle: "/contributions/onearmy-circle.webp",
    prs: [
      {
        number: 4890,
        title: "Migrate the site footer to the new UI library",
        summary: "Moved the footer from theme-ui to the new shadcn library with pixel-identical spacing and breakpoints, and restored its tests.",
      },
      {
        number: 4931,
        title: "Migrate the article call to action",
        summary: "Ported the article attribution panel to the new UI library, added a Storybook router decorator and six tests.",
      },
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
    circle: "/contributions/adelpha-circle.webp",
    prs: [
      {
        number: 28,
        title: "Refactor the app shell components",
        summary: "Split a 1,600-line App.tsx into shell, dashboard and panel modules and added the first frontend test suite: 158 Vitest tests.",
      },
    ],
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
      {
        number: 13718,
        title: "Fix trailing backticks in the testing tutorial",
        summary: "Removed stray backticks that hung the shell when readers copy-pasted the fixture command.",
      },
    ],
    featured: true,
  },
  {
    name: "The Odin Project",
    repo: "TheOdinProject/curriculum",
    description: "The open curriculum for learning web development",
    stars: 13138,
    prs: [
      {
        number: 29801,
        title: "Fix a typo in the Rails forms project",
        summary: "Corrected \"from\" to \"form\" in the lesson text.",
      },
      {
        number: 29813,
        title: "Remove a broken link from Rock Paper Scissors",
        summary: "Dropped a Git cheatsheet resource whose link threw a privacy error.",
      },
    ],
  },
  {
    name: "HostedGPT",
    repo: "AllYourBot/hostedgpt",
    description: "An open version of ChatGPT you can host anywhere or run locally.",
    stars: 513,
    prs: [
      {
        number: 820,
        title: "Fix the RubyLLM test link",
        summary: "Fixed a 500 on the Test button caused by a constant resolving to the backend instead of the gem, and made tests run the production path.",
      },
    ],
  },
  {
    name: "RubyEvents",
    repo: "rubyevents/rubyevents",
    description: "On a mission to index all Ruby events.",
    stars: 569,
    prs: [
      {
        number: 2133,
        title: "Migrate RubyLLM::Schema to Schematist",
        summary: "Swapped the renamed gem, updated the app to its flattened schema API and regenerated all 20 exported schemas.",
      },
    ],
  },
  {
    name: "CASA",
    repo: "rubyforgood/casa",
    description: "Volunteer management system for nonprofit CASA, which serves foster youth in counties across America.",
    stars: 382,
    prs: [
      {
        number: 7200,
        title: "Drop the stale EOL Rails Brakeman ignore",
        summary: "Removed a Brakeman suppression made obsolete by the Rails 8.1 upgrade and confirmed the scan still passes.",
      },
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
