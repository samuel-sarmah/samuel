export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/open-source", label: "Open source" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
];

export const SOCIALS = [
  { href: "https://github.com/samuel-sarmah", label: "GitHub" },
];

export function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
