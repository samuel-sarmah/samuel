"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContactMessage } from "@/lib/actions";

const initialState = { ok: false, error: null };

const fieldClasses =
  "w-full border border-[var(--line)] bg-[var(--card)] px-3.5 py-2.5 text-[15.5px] " +
  "placeholder:text-[var(--muted)] focus:border-[var(--fg)] focus:outline-none";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!state.ok) {
      setFlash(false);
      return;
    }
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 6000);
    return () => clearTimeout(timer);
  }, [state.ok, state.token]);

  return (
    <>
      {flash && (
        <p className="flash" role="status" aria-live="polite">
          Message sent, I&apos;ll reply within 4 hours.
        </p>
      )}

      <form
        key={state.token ?? "contact"}
        action={formAction}
        className="space-y-5"
      >
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
            A brief description
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
          <p
            className="text-[14.5px] font-medium text-[var(--danger)]"
            role="alert"
          >
            {state.error === "send-failed"
              ? "Couldn't send right now, please try again in a moment."
              : state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </form>
    </>
  );
}
