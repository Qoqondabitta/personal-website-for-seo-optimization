"use client";

import { useEffect, useRef } from "react";

/**
 * Floating 🤖 robot — same icon as the "AI Freak" Hero badge.
 * Reacts to scroll with a zig-zag path:
 * - Scroll down  → moves down
 * - Scroll up    → moves up
 * - Idle         → gentle float + slow side-to-side drift
 * Glass container matches Hero floating badge style exactly.
 * Fully non-interactive: pointer-events none, aria-hidden.
 */
export default function ScrollEagle() {
  const robotRef = useRef<HTMLDivElement>(null);

  // All animated state lives in refs — zero re-renders
  const posY        = useRef(120);
  const targetY     = useRef(120);
  const sway        = useRef(0);       // rotation (deg)
  const targetSway  = useRef(0);
  const scrollVel   = useRef(0);       // decaying scroll velocity
  const lastScrollY = useRef(0);
  const startTime   = useRef(0);
  const rafId       = useRef<number>(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    startTime.current   = performance.now();

    const onScroll = () => {
      const current = window.scrollY;
      const delta   = current - lastScrollY.current;
      lastScrollY.current = current;

      // Chase the scroll position, clamped to viewport
      const maxY = window.innerHeight - 110;
      targetY.current   = Math.max(80, Math.min(maxY, targetY.current + delta * 0.45));

      // Sway in travel direction — snaps back when idle
      targetSway.current = Math.sign(delta) * 9;

      // Store raw velocity for zig-zag amplitude
      scrollVel.current = delta;
    };

    const tick = (now: number) => {
      const elapsed = now - startTime.current;

      // ── Vertical position (lerp towards scroll target) ──────────────────
      posY.current += (targetY.current - posY.current) * 0.06;

      // ── Sway (rotation) — decays back to 0 between scrolls ──────────────
      sway.current        += (targetSway.current - sway.current) * 0.08;
      targetSway.current  *= 0.90;

      // ── Scroll velocity decay ────────────────────────────────────────────
      scrollVel.current *= 0.80;
      const energy = Math.min(Math.abs(scrollVel.current), 15) / 15; // 0..1

      // ── Zig-zag X: gentle idle drift (±6px), expands to ±20px on scroll ─
      const amplitude = 6 + energy * 14;
      const speed     = 0.0010 + energy * 0.0008;
      const zigX      = Math.sin(elapsed * speed) * amplitude;

      // ── Idle float on Y (±5px slow sine) ─────────────────────────────────
      const floatY = Math.sin(elapsed * 0.00075) * 5;

      if (robotRef.current) {
        robotRef.current.style.transform =
          `translate(${zigX}px, ${posY.current + floatY}px) rotate(${sway.current}deg)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={robotRef}
      className="fixed right-3 md:right-8 top-0 z-40 pointer-events-none select-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* Matches floating badge style from Hero exactly */}
      <div
        className="glass border border-blue-500/30 rounded-xl px-3 py-2 backdrop-blur-xl shadow-xl"
        style={{ boxShadow: "0 0 20px rgba(59,130,246,0.2), inset 0 0 8px rgba(59,130,246,0.03)" }}
      >
        <span
          className="block text-2xl md:text-3xl leading-none"
          style={{ filter: "drop-shadow(0 0 8px rgba(147,197,253,0.7))" }}
        >
          🤖
        </span>
      </div>
    </div>
  );
}
