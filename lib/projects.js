// One list of projects for the homepage and the Work page, so the copy,
// links and previews can't drift between the two. Order is display order;
// `featured` picks the ones the homepage shows.
export const PROJECTS = [
  {
    name: "Fruitland Cyprus",
    tagline: "client work · citrus farm",
    description:
      "Marketing site for a family citrus farm in Cyprus. The owners needed a fast site they could update. In the first month of launch, orders increased by 57% doubling the profits. I owned the whole build, from design through Sanity CMS setup to deployment, so they edit products and content themselves.",
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
    live: "https://fruitlandcyprus.com",
    code: "https://github.com/samuel-sarmah/fruitland-cyprus",
    preview: "/previews/fruitland.webp",
    featured: true,
  },
  {
    name: "Sterz",
    tagline: "creator marketplace",
    description:
      "A two-sided marketplace where brands fund campaigns into escrow and creators get paid as verified views land, view counts checked against each platform's API. Owned building of auth, marketplace flows, and payouts.",
    stack: ["Next.js", "Supabase", "Vercel"],
    live: "https://ster-seven.vercel.app",
    code: null,
    preview: "/previews/sterz.webp",
    featured: true,
  },
  {
    name: "LaunchTracker",
    tagline: "live mission dashboard",
    description:
      "A real-time dashboard for rocket launches: live countdowns, go/no-go status, a watchlist, and space-industry news, all updating without a page refresh. During Artemis 2 season, this site served 3000+ users with realtime streaming links and updates through the news channels.",
    stack: ["Next.js", "Vercel"],
    live: "https://launch-status.vercel.app",
    code: null,
    preview: "/previews/launch-status.webp",
    featured: true,
  },
  {
    name: "E-Commerce Store",
    tagline: "fullstack MERN build",
    description:
      "A full-stack e-commerce application: product catalog with brand and category filtering, wishlist, ratings, and a seeded MongoDB backend behind an Express REST API.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: null, // TODO: deploy and add the URL
    code: "https://github.com/samuel-sarmah/mern-app",
    preview: "/previews/ecommerce.webp",
    featured: false,
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
