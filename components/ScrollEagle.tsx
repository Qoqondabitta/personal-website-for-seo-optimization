"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative robot that reacts to scroll with a zig-zag path.
 * - Scroll down  → robot moves down
 * - Scroll up    → robot moves up
 * - Idle         → gentle float + slow side-to-side drift
 * Visually matches the floating badge style (glassmorphism + neon blue).
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
      {/* Container matches floating badge aesthetic exactly */}
      <div
        className="glass border border-blue-500/40 rounded-2xl px-2 py-2 md:px-3 md:py-2.5 shadow-xl backdrop-blur-xl flex flex-col items-center gap-1"
        style={{ boxShadow: "0 0 24px rgba(59,130,246,0.25), inset 0 0 12px rgba(59,130,246,0.04)" }}
      >
        {/* ── Robot SVG ────────────────────────────────────────────────────── */}
        <svg
          viewBox="0 0 48 58"
          className="w-7 h-8 md:w-9 md:h-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna pole */}
          <line x1="24" y1="8" x2="24" y2="2" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
          {/* Antenna tip */}
          <circle cx="24" cy="1.5" r="2.2" fill="#93c5fd"/>
          <circle cx="24" cy="1.5" r="1" fill="#fff" opacity="0.9"/>

          {/* Head */}
          <rect x="9" y="8" width="30" height="21" rx="5" fill="rgba(30,58,138,0.55)" stroke="#60a5fa" strokeWidth="1.3"/>

          {/* Left eye socket + iris */}
          <circle cx="17.5" cy="18.5" r="5" fill="#0f172a"/>
          <circle cx="17.5" cy="18.5" r="3" fill="#3b82f6"/>
          <circle cx="17.5" cy="18.5" r="1.4" fill="#93c5fd"/>
          <circle cx="16"   cy="17"   r="0.9" fill="#fff" opacity="0.85"/>

          {/* Right eye socket + iris */}
          <circle cx="30.5" cy="18.5" r="5" fill="#0f172a"/>
          <circle cx="30.5" cy="18.5" r="3" fill="#3b82f6"/>
          <circle cx="30.5" cy="18.5" r="1.4" fill="#93c5fd"/>
          <circle cx="29"   cy="17"   r="0.9" fill="#fff" opacity="0.85"/>

          {/* Mouth bar */}
          <rect x="16" y="25.5" width="16" height="2.5" rx="1.25" fill="#60a5fa" opacity="0.65"/>

          {/* Neck */}
          <rect x="20" y="29" width="8" height="4" rx="1.5" fill="rgba(30,58,138,0.8)"/>

          {/* Body */}
          <rect x="7" y="33" width="34" height="21" rx="5" fill="rgba(30,58,138,0.55)" stroke="#60a5fa" strokeWidth="1.3"/>

          {/* Chest core (pulsing handled by animate-pulse on the inner circle) */}
          <circle cx="24" cy="43.5" r="5.5" fill="#0f172a"/>
          <circle cx="24" cy="43.5" r="3.5" fill="#3b82f6"/>
          {/* Static bright dot — looks "lit" without needing JS */}
          <circle cx="24" cy="43.5" r="1.8" fill="#93c5fd"/>

          {/* Left arm */}
          <rect x="0"  y="34" width="7"  height="15" rx="3.5" fill="rgba(30,58,138,0.55)" stroke="#60a5fa" strokeWidth="1"/>
          {/* Right arm */}
          <rect x="41" y="34" width="7"  height="15" rx="3.5" fill="rgba(30,58,138,0.55)" stroke="#60a5fa" strokeWidth="1"/>

          {/* Leg hints at bottom of body */}
          <rect x="12" y="54" width="9" height="4" rx="2" fill="rgba(30,58,138,0.7)" stroke="#60a5fa" strokeWidth="0.8"/>
          <rect x="27" y="54" width="9" height="4" rx="2" fill="rgba(30,58,138,0.7)" stroke="#60a5fa" strokeWidth="0.8"/>
        </svg>

        {/* Label — matches badge font style */}
        <span className="text-[8px] md:text-[10px] font-semibold text-blue-300 tracking-widest uppercase">
          AI.bot
        </span>
      </div>
    </div>
  );
}
