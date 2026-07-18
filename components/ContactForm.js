"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/lib/actions";
import { EMAIL } from "@/lib/nav";

const initialState = { ok: false, error: null };

const fieldClasses =
  "w-full border border-[var(--line)] bg-[var(--card)] px-3.5 py-2.5 text-[15.5px] " +
  "placeholder:text-[var(--muted)] focus:border-[var(--fg)] focus:outline-none";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );

  if (state.ok) {
    return (
      <div className="border border-[var(--line)] bg-[var(--card)] p-6">
        <p className="text-[16px] font-medium">Message sent — thank you.</p>
        <p className="mt-1.5 text-[15px] text-[var(--muted)]">
          I read every message and reply within 4 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[13.5px] font-medium text-[var(--muted)]">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            defaultValue={state.values?.name}
            className={`mt-1.5 ${fieldClasses}`}
          />
        </label>
        <label className="block">
          <span className="text-[13.5px] font-medium text-[var(--muted)]">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            defaultValue={state.values?.email}
            className={`mt-1.5 ${fieldClasses}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[13.5px] font-medium text-[var(--muted)]">
          What do you need?
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="The project, the deadline, and what's blocking you."
          defaultValue={state.values?.message}
          className={`mt-1.5 resize-y ${fieldClasses}`}
        />
      </label>

      {state.error && (
        <p className="text-[14.5px] text-[var(--muted)]" role="alert">
          {state.error === "send-failed" ? (
            <>
              Couldn&apos;t send right now — email me directly at{" "}
              <a href={`mailto:${EMAIL}`} className="link">
                {EMAIL}
              </a>
              .
            </>
          ) : (
            state.error
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-[var(--fg)] px-6 py-2.5 text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
