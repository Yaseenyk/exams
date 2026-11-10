import Link from "next/link";
import NavLinks from "./NavLinks";
import { PORTFOLIO_URL, SITE_NAME } from "@/lib/site";

/** Header and footer around a page. Phone layout: brand on one row, the exams as a swipeable row of 44px pills below. */
export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <header className="border-b border-zinc-800/70">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 px-4 sm:px-6" aria-label="Main">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-md py-1 font-semibold text-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-cyan">
            {SITE_NAME}
          </Link>
          <NavLinks />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <footer className="mx-auto mt-12 w-full max-w-5xl border-t border-zinc-800/60 px-4 py-8 text-sm text-zinc-500 sm:mt-16 sm:px-6 sm:py-10">
        <p className="leading-relaxed">
          An independent site, not affiliated with the National Testing Agency, the Union Public Service Commission or any exam body. Every fact links to the official document it was read from, with the day it was checked. Rules and dates change, so always confirm on the official site before you apply or pay.
        </p>
        <p className="mt-3 leading-relaxed">
          © {new Date().getFullYear()} {SITE_NAME}. Written by <a href={`${PORTFOLIO_URL}/`} className="text-zinc-300 underline">Yaseen Khatib</a> ·{" "}
          <Link href="/how-we-check/" className="inline-block py-2 underline">How we check</Link> ·{" "}
          <Link href="/privacy/" className="inline-block py-2 underline">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
