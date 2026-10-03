import "server-only";

import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.CONTACT_FROM_EMAIL;
const TO = process.env.CONTACT_TO_EMAIL;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headerSafe(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendContactNotification({ name, email, message }) {
  if (!API_KEY || !FROM || !TO) {
    console.error(
      "[contact] mail not configured — set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL"
    );
    return false;
  }

  const safeName = headerSafe(name);

  try {
    const { error } = await new Resend(API_KEY).emails.send({
      from: `Portfolio contact <${FROM}>`,
      to: [TO],
      replyTo: `${safeName} <${headerSafe(email)}>`,
      subject: `Portfolio message from ${safeName}`.slice(0, 180),
      text: `${safeName} <${email}>\n\n${message}`,
      html:
        `<p style="margin:0 0 4px"><strong>${escapeHtml(safeName)}</strong></p>` +
        `<p style="margin:0 0 16px">${escapeHtml(email)}</p>` +
        `<div style="white-space:pre-wrap">${escapeHtml(message)}</div>`,
    });

    if (error) {
      console.error("[contact] mail failed:", error);
      return false;
    }
    return true;
  } catch (cause) {
    console.error("[contact] mail threw:", cause);
    return false;
  }
}
