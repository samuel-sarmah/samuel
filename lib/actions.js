"use server";

import { createClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";
import { validateEmailAddress } from "@/lib/email-validation";

export async function sendContactMessage(prevState, formData) {
  const token = Date.now();

  // Honeypot: real visitors never see this field, so a value means a bot.
  // Report success so the bot moves on.
  if (formData.get("company")) return { ok: true, error: null, token };

  const name = (formData.get("name") || "").trim();
  const email = (formData.get("email") || "").trim();
  const message = (formData.get("message") || "").trim();
  const values = { name, email, message };

  if (!name || name.length > 120)
    return { ok: false, error: "Please add your name.", values, token };
  const emailProblem = await validateEmailAddress(email);
  if (emailProblem) return { ok: false, error: emailProblem, values, token };
  if (!message)
    return { ok: false, error: "Tell me a little about your project.", values, token };
  if (message.length > 5000)
    return { ok: false, error: "Message is too long (5000 characters max).", values, token };

  const mailed = await sendContactNotification({ name, email, message });

  let stored = false;
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });
    if (error) console.error("[contact] archive failed:", error);
    else stored = true;
  } catch (cause) {
    console.error("[contact] archive threw:", cause);
  }

  if (!mailed && !stored) return { ok: false, error: "send-failed", values, token };

  return { ok: true, error: null, token };
}
