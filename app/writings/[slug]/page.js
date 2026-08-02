import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { marked } from "marked";
import { getWriting } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import LikeButton from "@/components/writings/LikeButton";
import ShareButtons from "@/components/writings/ShareButtons";

// Rendered per-request (the visitor cookie opts this route out of static
// rendering) so like counts are always fresh.

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  return { title: post ? `${post.title} · Samuel Ngobi` : "Not found" };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  if (!post) notFound();

  const cookieStore = await cookies();
  const visitorId = cookieStore.get("visitor_id")?.value;

  const supabase = await createClient();
  const { data: likes } = await supabase
    .from("likes")
    .select("visitor_id")
    .eq("slug", slug);

  const likeCount = likes?.length ?? 0;
  const likedByMe = !!visitorId && !!likes?.some((l) => l.visitor_id === visitorId);

  return (
    <article>
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      {post.date && <p className="mt-2 text-[13px] uppercase tracking-wide text-[var(--muted)]">{post.date}</p>}
      <div
        className="prose mt-6"
        // Safe: post.content is author-written markdown committed to the repo.
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-y-3 border-t border-[var(--line)] pt-5">
        <LikeButton slug={slug} count={likeCount} liked={likedByMe} />
        <ShareButtons title={post.title} />
      </div>
    </article>
  );
}
