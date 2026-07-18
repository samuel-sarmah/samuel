// Shared by the desktop sidebar and the mobile header so the two can't drift.
export const EMAIL = "sarmah2020samuel@gmail.com";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/books", label: "Books" },
  { href: "/writings", label: "Writings" },
  { href: "/about", label: "About" },
];

export const SOCIALS = [
  { href: "https://github.com/samuel-sarmah", label: "GitHub" },
];

export function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
