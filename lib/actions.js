"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getWriting } from "@/lib/content";

export async function addComment(slug, formData) {
  if (!getWriting(slug)) return { error: "Unknown post." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in to comment." };

  const body = (formData.get("body") || "").trim();
  if (!body) return { error: "Comment can't be empty." };
  if (body.length > 2000) return { error: "Comment is too long (2000 characters max)." };

  const { error } = await supabase
    .from("comments")
    .insert({ slug, user_id: user.id, body });
  if (error) return { error: "Couldn't post your comment. Try again." };

  revalidatePath(`/writings/${slug}`);
  return { error: null };
}

export async function deleteComment(id, slug) {
  const supabase = await createClient();
  // RLS only lets users delete their own comments.
  await supabase.from("comments").delete().eq("id", id);
  revalidatePath(`/writings/${slug}`);
}

export async function toggleLike(slug) {
  if (!getWriting(slug)) return;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: existing } = await supabase
    .from("likes")
    .select("slug")
    .eq("slug", slug)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("slug", slug).eq("user_id", user.id);
  } else {
    // A rapid double-toggle can race into a duplicate insert; the composite
    // primary key rejects it (23505) and we treat that as already-liked.
    await supabase.from("likes").insert({ slug, user_id: user.id });
  }

  revalidatePath(`/writings/${slug}`);
}

export async function signOut(slug) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath(slug ? `/writings/${slug}` : "/writings");
}
