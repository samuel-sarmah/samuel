"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { addComment, deleteComment, signOut } from "@/lib/actions";
import { GoogleIcon, GithubIcon } from "@/components/writings/AuthIcons";

function formatDate(iso) {
  // Fixed locale + UTC so the server and client render the same string.
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function AuthPrompt({ slug }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const redirectTo = () =>
    `${window.location.origin}/auth/callback?next=/writings/${slug}`;

  async function signInWithProvider(provider) {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectTo() },
    });
  }

  async function sendMagicLink(e) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo() },
    });
    setSending(false);
    if (error) setError("Couldn't send the link. Try again in a minute.");
    else setSent(true);
  }

  return (
    <div className="mt-5 border border-[var(--line)] bg-[var(--card)] p-5">
      <p className="text-[14px] text-[var(--muted)]">
        Sign in to join the conversation.
      </p>
      <div className="mt-4 flex flex-col gap-y-4">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          <button
            type="button"
            onClick={() => signInWithProvider("google")}
            className="flex items-center gap-x-2 border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[13.5px] font-medium transition-opacity hover:opacity-70"
          >
            <GoogleIcon size={16} />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signInWithProvider("github")}
            className="flex items-center gap-x-2 border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[13.5px] font-medium transition-opacity hover:opacity-70"
          >
            <GithubIcon size={16} />
            Continue with GitHub
          </button>
        </div>
        <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:gap-x-3 sm:gap-y-0">
          <span className="text-[13px] text-[var(--muted)]">or</span>
          {sent ? (
            <p className="text-[13.5px] text-[var(--ok)]">
              Check your inbox for a sign-in link.
            </p>
          ) : (
            <form onSubmit={sendMagicLink} className="flex gap-x-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-48 border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[13.5px] outline-none focus:border-[var(--muted)]"
              />
              <button
                type="submit"
                disabled={sending}
                className="border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[13.5px] font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                {sending ? "Sending…" : "Email me a link"}
              </button>
            </form>
          )}
        </div>
      </div>
      {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}
    </div>
  );
}

function CommentForm({ slug, user }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await addComment(slug, formData);
      if (result?.error) setError(result.error);
      else {
        setError(null);
        setBody("");
      }
    });
  }

  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[var(--muted)]">
          Commenting as{" "}
          <span className="font-medium text-[var(--fg)]">
            {user.displayName}
          </span>
        </p>
        <button
          type="button"
          onClick={() => signOut(slug)}
          className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          Sign out
        </button>
      </div>
      <textarea
        name="body"
        required
        maxLength={2000}
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment…"
        className="mt-2 w-full resize-y border border-[var(--line)] bg-[var(--card)] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--muted)]"
      />
      <div className="mt-2 flex items-center gap-x-3">
        <button
          type="submit"
          disabled={isPending || !body.trim()}
          className="border border-[var(--fg)] bg-[var(--fg)] px-4 py-1.5 text-[13.5px] font-medium text-[var(--bg)] transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          {isPending ? "Posting…" : "Post comment"}
        </button>
        {error && <p className="text-[13px] text-red-600">{error}</p>}
      </div>
    </form>
  );
}

function Comment({ comment, isOwn, slug }) {
  const [isPending, startTransition] = useTransition();
  const name = comment.profiles?.display_name || "Reader";

  return (
    <li className={"py-5 " + (isPending ? "opacity-40" : "")}>
      <div className="flex items-center gap-x-2.5">
        {comment.profiles?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={comment.profiles.avatar_url}
            alt=""
            referrerPolicy="no-referrer"
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--chrome)] text-[11px] font-semibold text-[var(--muted)]">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="text-[13.5px] font-medium">{name}</span>
        <span className="text-[12.5px] text-[var(--muted)]">
          {formatDate(comment.created_at)}
        </span>
        {isOwn && (
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              startTransition(() => deleteComment(comment.id, slug))
            }
            className="ml-auto text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            Delete
          </button>
        )}
      </div>
      {/* Rendered as escaped text — user content never goes through markdown. */}
      <p className="mt-2 whitespace-pre-wrap text-[14px]">{comment.body}</p>
    </li>
  );
}

export default function CommentsSection({ slug, comments, user }) {
  return (
    <section id="comments" className="mt-12 scroll-mt-14">
      <h2 className="section-label">
        Comments{comments.length > 0 && ` · ${comments.length}`}
      </h2>

      {user ? <CommentForm slug={slug} user={user} /> : <AuthPrompt slug={slug} />}

      {comments.length > 0 && (
        <ul className="mt-4 divide-y divide-[var(--line)]">
          {comments.map((c) => (
            <Comment
              key={c.id}
              comment={c}
              slug={slug}
              isOwn={user?.id === c.user_id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
