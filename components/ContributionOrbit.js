"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PrList, Stars } from "@/components/ContributionCard";

const STEP_MS = 3000;
const TURN_MS = 900;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ContributionOrbit({ contributions }) {
  const n = contributions.length;
  const [target, setTarget] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pos = useRef(0);
  const items = useRef([]);

  const active = ((target % n) + n) % n;
  const current = contributions[active];

  const place = useCallback(() => {
    items.current.forEach((el, i) => {
      if (!el) return;
      const angle = ((i - pos.current) * 2 * Math.PI) / n;
      const depth = (Math.cos(angle) + 1) / 2;
      el.style.transform = `translateX(${-50 + Math.sin(angle) * 65}%) scale(${0.45 + 0.55 * depth * depth})`;
      el.style.opacity = String(0.3 + 0.7 * depth);
      el.style.zIndex = String(Math.round(depth * 10));
    });
  }, [n]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const from = pos.current;
    if (reduced || from === target) {
      pos.current = target;
      place();
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / TURN_MS, 1);
      pos.current = from + (target - from) * ease(t);
      place();
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced, place]);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      if (!document.hidden) setTarget((t) => t + 1);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const goTo = (i) => {
    let delta = (i - active) % n;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    setTarget((t) => t + delta);
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Open source highlights"
    >
      <div className="relative overflow-hidden pb-8 pt-2">
        <div aria-hidden="true" className="mx-auto aspect-square w-[74%] sm:w-[54%]" />
        {contributions.map((c, i) => {
          const front = i === active;
          return (
            <div
              key={c.repo}
              ref={(el) => (items.current[i] = el)}
              aria-hidden={!front}
              onClickCapture={(e) => {
                if (front) return;
                e.preventDefault();
                goTo(i);
              }}
              className={
                "absolute left-1/2 top-2 w-[74%] origin-center will-change-transform sm:w-[54%] " +
                (front ? "" : "cursor-pointer")
              }
              style={{ transform: "translateX(-50%)" }}
            >
              <a
                href={c.live}
                target="_blank"
                rel="noreferrer"
                tabIndex={front ? undefined : -1}
                aria-label={`Open ${new URL(c.live).hostname}`}
                className="relative block aspect-square overflow-hidden rounded-full border border-[var(--line)] bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.25)]"
              >
                <Image
                  src={c.circle ?? c.preview}
                  alt={`Screenshot of ${c.name}`}
                  fill
                  sizes="(max-width: 640px) 74vw, 400px"
                  className={"object-cover " + (c.circle ? "object-center" : "object-[50%_30%]")}
                />
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setTarget((t) => t - 1)}
          aria-label="Previous project"
          className="flex h-8 w-8 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          ←
        </button>
        <div className="flex gap-2">
          {contributions.map((c, i) => (
            <button
              key={c.repo}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${c.name}`}
              aria-current={i === active}
              className={
                "h-1.5 transition-all " +
                (i === active ? "w-6 bg-[var(--fg)]" : "w-1.5 bg-[var(--line)] hover:bg-[var(--muted)]")
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTarget((t) => t + 1)}
          aria-label="Next project"
          className="flex h-8 w-8 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          →
        </button>
      </div>

      <div key={current.repo} className="fade-in mt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{current.repo}</p>
          <Stars count={current.stars} />
        </div>
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[19px] font-semibold tracking-tight">{current.name}</h3>
          <a
            href={`https://github.com/${current.repo}`}
            target="_blank"
            rel="noreferrer"
            className="link text-[14px]"
          >
            Repository ↗
          </a>
        </div>
        <p className="mt-2 max-w-[60ch] text-[15.5px] text-[var(--muted)]">
          {current.description}
        </p>
        <div className="mt-4">
          <PrList repo={current.repo} prs={current.prs} />
        </div>
      </div>
    </div>
  );
}
