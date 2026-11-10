import Link from "next/link";

export default function NotFound() {
  return (
    <article className="prose-guide">
      <h1 className="text-3xl font-bold text-zinc-50">Page not found</h1>
      <p>That page does not exist. Pick an exam from the menu, or go to the <Link href="/">home page</Link>.</p>
    </article>
  );
}
