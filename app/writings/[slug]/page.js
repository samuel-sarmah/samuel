import { notFound } from "next/navigation";
import { marked } from "marked";
import { getWriting, getWritings } from "@/lib/content";

export function generateStaticParams() {
  return getWritings().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  return { title: post ? `${post.title} · Samuel Sarmah` : "Not found" };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  if (!post) notFound();

  return (
    <article>
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      {post.date && <p className="mt-2 text-[13px] uppercase tracking-wide text-[var(--muted)]">{post.date}</p>}
      <div
        className="prose mt-6"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </article>
  );
}
