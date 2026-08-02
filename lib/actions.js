"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { getWriting } from "@/lib/content";

const VISITOR_COOKIE = "visitor_id";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Identifies a browser for like de-duplication, without any account or
// sign-in. httpOnly so page JS can't read or spoof it.
async function getOrCreateVisitorId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(VISITOR_COOKIE)?.value;
  if (existing) return existing;

  const id = randomUUID();
  cookieStore.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });
  return id;
}

export async function toggleLike(slug) {
  if (!getWriting(slug)) return;

  const visitorId = await getOrCreateVisitorId();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("likes")
    .select("slug")
    .eq("slug", slug)
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("slug", slug).eq("visitor_id", visitorId);
  } else {
    // A rapid double-toggle can race into a duplicate insert; the composite
    // primary key rejects it (23505) and we treat that as already-liked.
    await supabase.from("likes").insert({ slug, visitor_id: visitorId });
  }

  revalidatePath(`/writings/${slug}`);
}

export async function sendContactMessage(prevState, formData) {
  // Honeypot: real visitors never see this field, so a value means a bot.
  // Report success so the bot moves on.
  if (formData.get("company")) return { ok: true, error: null };

  const name = (formData.get("name") || "").trim();
  const email = (formData.get("email") || "").trim();
  const message = (formData.get("message") || "").trim();
  // React resets the form after the action runs, so failures echo the
  // submitted values back for the form to restore — nobody should have to
  // retype a five-paragraph brief.
  const values = { name, email, message };

  if (!name || name.length > 120)
    return { ok: false, error: "Please add your name.", values };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return { ok: false, error: "That email address doesn't look right.", values };
  if (!message)
    return { ok: false, error: "Tell me a little about your project.", values };
  if (message.length > 5000)
    return { ok: false, error: "Message is too long (5000 characters max).", values };

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, message });
  if (error) return { ok: false, error: "send-failed", values };

  return { ok: true, error: null };
}
