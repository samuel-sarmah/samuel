import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

/* Editorial pairing: a high-contrast serif carries the headlines, a clean
   grotesk carries everything you actually have to read. Both self-hosted at
   build time so every visitor sees the same faces. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://www.samuelsarmah.com"),
  title: "Samuel Ngobi · Web Developer",
  description:
    "I build fast, modern websites, web apps, and SaaS products for businesses and founders with Next.js, React, and Rails. Available for freelance projects and full-time roles.",
  openGraph: {
    title: "Samuel Ngobi · Web Developer",
    description:
      "Fast, modern websites, web apps, and SaaS products for businesses and founders, built with Next.js, React, and Rails.",
    type: "website",
    url: "/",
    siteName: "Samuel Ngobi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Ngobi · Web Developer",
    description:
      "Fast, modern websites, web apps, and SaaS products for businesses and founders, built with Next.js, React, and Rails.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint so a dark-mode visitor
            never sees a light flash. Light is the default; only "dark" is
            ever stored. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <MobileHeader />
        <div className="mx-auto flex min-h-screen max-w-[61.6rem] flex-col gap-10 px-5 py-10 sm:px-8 md:flex-row md:gap-14 md:py-14">
          <Sidebar />
          <main className="min-w-0 flex-1 md:max-w-[46rem]">{children}</main>
        </div>
        <footer className="px-5 pb-10 text-[13px] text-[var(--muted)] sm:px-8 md:hidden">
          © {new Date().getFullYear()} Samuel Ngobi
        </footer>
      </body>
    </html>
  );
}
