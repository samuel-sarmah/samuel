"use server";

import { createClient } from "@/lib/supabase/server";

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
