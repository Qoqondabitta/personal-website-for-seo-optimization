"use client";

import { useEffect, useRef } from "react";

// Injected once — only affects .robot-arm-wave, no globals touched
const WAVE_CSS = `
@keyframes robotWave {
  0%   { transform: rotate(0deg);   }
  15%  { transform: rotate(-55deg); }
  30%  { transform: rotate(-15deg); }
  45%  { transform: rotate(-50deg); }
  60%  { transform: rotate(-15deg); }
  80%  { transform: rotate(-35deg); }
  100% { transform: rotate(0deg);   }
}
.robot-arm-wave {
  transform-box:    fill-box;
  transform-origin: 50% 0%;
  animation: robotWave 1.2s ease-in-out;
}
`;

/**
 * Full-body robot that reacts to scroll with a zig-zag path.
 * Left arm waves every 5 s when idle; wave is suppressed during scroll.
 * Glass container matches Hero floating badge style exactly.
 * Fully non-interactive: pointer-events none, aria-hidden.
 */
export default function ScrollEagle() {
  const robotRef = useRef<HTMLDivElement>(null);
  const armRef   = useRef<SVGGElement>(null);

  // ── Scroll animation state (refs → zero re-renders) ──────────────────
  const posY        = useRef(120);
  const targetY     = useRef(120);
  const sway        = useRef(0);
  const targetSway  = useRef(0);
  const scrollVel   = useRef(0);
  const lastScrollY = useRef(0);
  const startTime   = useRef(0);
  const rafId       = useRef<number>(0);

  // ── Idle wave state ───────────────────────────────────────────────────
  const isScrolling  = useRef(false);
  const idleTimeout  = useRef<ReturnType<typeof setTimeout>>();
  const waveTimeout  = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    startTime.current   = performance.now();

    // Trigger a single wave cycle, then schedule the next one 5 s later
    const triggerWave = () => {
      if (isScrolling.current || !armRef.current) return;

      // Force reflow so re-adding the class always restarts the animation
      armRef.current.classList.remove("robot-arm-wave");
      void armRef.current.getBoundingClientRect();
      armRef.current.classList.add("robot-arm-wave");

      // 1.2 s animation + 5 s gap before next wave
      waveTimeout.current = setTimeout(() => {
        if (!isScrolling.current) triggerWave();
      }, 1200 + 5000);
    };

    // First wave 3 s after mount
    waveTimeout.current = setTimeout(triggerWave, 3000);

    // ── Scroll handler ────────────────────────────────────────────────
    const onScroll = () => {
      const current = window.scrollY;
      const delta   = current - lastScrollY.current;
      lastScrollY.current = current;

      const maxY = window.innerHeight - 110;
      targetY.current    = Math.max(80, Math.min(maxY, targetY.current + delta * 0.45));
      targetSway.current = Math.sign(delta) * 9;
      scrollVel.current  = delta;

      // Interrupt wave while scrolling
      isScrolling.current = true;
      armRef.current?.classList.remove("robot-arm-wave");
      clearTimeout(waveTimeout.current);

      // Resume idle wave 2 s after scroll stops
      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        waveTimeout.current = setTimeout(triggerWave, 3000);
      }, 2000);
    };

    // ── RAF tick ──────────────────────────────────────────────────────
    const tick = (now: number) => {
      const elapsed = now - startTime.current;

      posY.current += (targetY.current - posY.current) * 0.06;

      sway.current       += (targetSway.current - sway.current) * 0.08;
      targetSway.current *= 0.90;

      scrollVel.current *= 0.80;
      const energy = Math.min(Math.abs(scrollVel.current), 15) / 15;

      const amplitude = 6 + energy * 14;
      const speed     = 0.0010 + energy * 0.0008;
      const zigX      = Math.sin(elapsed * speed) * amplitude;
      const floatY    = Math.sin(elapsed * 0.00075) * 5;

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
      clearTimeout(idleTimeout.current);
      clearTimeout(waveTimeout.current);
    };
  }, []);

  return (
    <>
      <style>{WAVE_CSS}</style>

      <div
        ref={robotRef}
        className="fixed right-3 md:right-8 top-0 z-40 pointer-events-none select-none"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {/* Glass container — mirrors Hero badge style */}
        <div
          className="glass border border-blue-500/30 rounded-xl px-2 py-2 md:px-3 md:py-2.5 backdrop-blur-xl shadow-xl"
          style={{ boxShadow: "0 0 20px rgba(59,130,246,0.22), inset 0 0 8px rgba(59,130,246,0.04)" }}
        >
          {/*
           * Full-body robot SVG
           * viewBox: 56 wide × 88 tall
           * Left arm is a <g> with ref so only it gets the wave CSS class.
           * The g's SVG translate is a presentation attribute — CSS rotate
           * stacks on top of it without disturbing the position.
           */}
          <svg
            viewBox="0 0 56 88"
            className="w-8 h-[46px] md:w-10 md:h-[58px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 6px rgba(147,197,253,0.5))" }}
          >
            {/* ── Antenna ─────────────────────────────────────── */}
            <line x1="28" y1="6" x2="28" y2="1" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="28" cy="1" r="2.4" fill="#93c5fd"/>
            <circle cx="28" cy="1" r="1"   fill="white" opacity="0.9"/>

            {/* ── Head ────────────────────────────────────────── */}
            <rect x="10" y="6" width="36" height="24" rx="6"
              fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.4"/>

            {/* Left eye */}
            <circle cx="20" cy="18" r="5"   fill="#0f172a"/>
            <circle cx="20" cy="18" r="3"   fill="#3b82f6"/>
            <circle cx="20" cy="18" r="1.4" fill="#93c5fd"/>
            <circle cx="18.5" cy="16.5" r="0.9" fill="white" opacity="0.85"/>

            {/* Right eye */}
            <circle cx="36" cy="18" r="5"   fill="#0f172a"/>
            <circle cx="36" cy="18" r="3"   fill="#3b82f6"/>
            <circle cx="36" cy="18" r="1.4" fill="#93c5fd"/>
            <circle cx="34.5" cy="16.5" r="0.9" fill="white" opacity="0.85"/>

            {/* Mouth */}
            <rect x="18" y="26" width="20" height="2.5" rx="1.25"
              fill="#60a5fa" opacity="0.7"/>

            {/* ── Neck ────────────────────────────────────────── */}
            <rect x="23" y="30" width="10" height="5" rx="2"
              fill="rgba(30,58,138,0.85)"/>

            {/* ── Body ────────────────────────────────────────── */}
            <rect x="8" y="35" width="40" height="28" rx="6"
              fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.4"/>

            {/* Chest core */}
            <circle cx="28" cy="49" r="6.5" fill="#0f172a"/>
            <circle cx="28" cy="49" r="4"   fill="#3b82f6"/>
            <circle cx="28" cy="49" r="2"   fill="#93c5fd"/>

            {/* ── Left arm — isolated <g> so only it gets the wave class ── */}
            <g ref={armRef} transform="translate(0, 37)">
              <rect x="0" y="0" width="8" height="20" rx="4"
                fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>
            </g>

            {/* ── Right arm (static) ───────────────────────────── */}
            <rect x="48" y="37" width="8" height="20" rx="4"
              fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>

            {/* ── Legs ────────────────────────────────────────── */}
            <rect x="13" y="63" width="12" height="20" rx="5"
              fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>
            <rect x="31" y="63" width="12" height="20" rx="5"
              fill="rgba(30,58,138,0.6)" stroke="#60a5fa" strokeWidth="1.2"/>
          </svg>
        </div>
      </div>
    </>
  );
}
