"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/lib/actions";

export default function LikeButton({ slug, count, liked }) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { count, liked },
    (state) => ({
      count: state.count + (state.liked ? -1 : 1),
      liked: !state.liked,
    })
  );

  function onClick() {
    startTransition(async () => {
      setOptimistic();
      await toggleLike(slug);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-pressed={optimistic.liked}
      className={
        "flex items-center gap-x-1.5 text-[13px] transition-colors " +
        (optimistic.liked
          ? "text-[var(--fg)]"
          : "text-[var(--muted)] hover:text-[var(--fg)]")
      }
    >
      <span aria-hidden="true" className="text-[15px] leading-none">
        {optimistic.liked ? "♥" : "♡"}
      </span>
      <span>
        {optimistic.count} {optimistic.count === 1 ? "like" : "likes"}
      </span>
    </button>
  );
}
