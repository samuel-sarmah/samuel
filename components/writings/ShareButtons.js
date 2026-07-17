"use client";

import { useEffect, useState } from "react";

// Share row: native share sheet where available, copy link, X / LinkedIn intents.
// No backend involved — everything works off the current URL.
export default function ShareButtons({ title }) {
  const [url, setUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  // Read location + feature-detect after hydration to avoid SSR mismatch.
  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url: url || window.location.href });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  }

  const itemClass =
    "text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]";

  return (
    <div className="flex items-center gap-x-4">
      <span className="text-[13px] text-[var(--muted)]">Share</span>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={itemClass}>
          Share…
        </button>
      )}
      <button type="button" onClick={copyLink} className={itemClass}>
        {copied ? <span className="text-[var(--ok)]">Copied</span> : "Copy link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className={itemClass}
      >
        X ↗
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className={itemClass}
      >
        LinkedIn ↗
      </a>
    </div>
  );
}
