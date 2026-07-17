import { notFound } from "next/navigation";
import { marked } from "marked";
import { getWriting } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";
import LikeButton from "@/components/writings/LikeButton";
import ShareButtons from "@/components/writings/ShareButtons";
import CommentsSection from "@/components/writings/CommentsSection";

// Rendered per-request (auth cookies opt this route out of static rendering)
// so comments and likes are always fresh.

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  return { title: post ? `${post.title} · Samuel Ngobi` : "Not found" };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getWriting(slug);
  if (!post) notFound();

  const supabase = await createClient();
  const [{ data: { user } }, { data: comments }, { data: likes }] =
    await Promise.all([
      supabase.auth.getUser(),
      supabase
        .from("comments")
        .select("id, body, created_at, user_id, profiles(display_name, avatar_url)")
        .eq("slug", slug)
        .order("created_at", { ascending: true }),
      supabase.from("likes").select("user_id").eq("slug", slug),
    ]);

  const likeCount = likes?.length ?? 0;
  const likedByMe = !!user && !!likes?.some((l) => l.user_id === user.id);

  return (
    <article>
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      {post.date && <p className="mt-2 text-[13px] uppercase tracking-wide text-[var(--muted)]">{post.date}</p>}
      <div
        className="prose mt-6"
        // Safe: post.content is author-written markdown committed to the repo.
        // Reader comments never pass through marked — they render as escaped JSX.
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-y-3 border-t border-[var(--line)] pt-5">
        <LikeButton
          slug={slug}
          count={likeCount}
          liked={likedByMe}
          signedIn={!!user}
        />
        <ShareButtons title={post.title} />
      </div>

      <CommentsSection
        slug={slug}
        comments={comments ?? []}
        user={
          user
            ? {
                id: user.id,
                displayName:
                  user.user_metadata?.full_name ||
                  user.email?.split("@")[0] ||
                  "Reader",
              }
            : null
        }
      />
    </article>
  );
}
