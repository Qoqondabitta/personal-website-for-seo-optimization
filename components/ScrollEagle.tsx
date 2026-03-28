"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative eagle that reacts to scroll.
 * - Scroll down → eagle drifts down
 * - Scroll up  → eagle drifts up
 * - Idle       → returns to a neutral tilt
 * Fully non-interactive: pointer-events none, aria-hidden.
 */
export default function ScrollEagle() {
  const eagleRef = useRef<HTMLDivElement>(null);

  // Animated state kept in refs so we never re-render
  const posY = useRef(100);       // current rendered Y (px from top-0)
  const targetY = useRef(100);    // where we want to be
  const tilt = useRef(0);         // current tilt (deg)
  const targetTilt = useRef(0);   // target tilt
  const lastScrollY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      lastScrollY.current = current;

      // Clamp Y between just below the nav bar and near the bottom
      const maxY = window.innerHeight - 90;
      targetY.current = Math.max(72, Math.min(maxY, targetY.current + delta * 0.45));

      // Tilt in the direction of travel (±10 deg), snaps back when idle
      targetTilt.current = Math.sign(delta) * 10;
    };

    const tick = () => {
      // Lerp towards targets — 0.06 feels like light air resistance
      posY.current  += (targetY.current  - posY.current)  * 0.06;
      tilt.current  += (targetTilt.current - tilt.current) * 0.10;

      // Decay tilt back to 0 when not scrolling
      targetTilt.current *= 0.88;

      if (eagleRef.current) {
        eagleRef.current.style.transform =
          `translateY(${posY.current}px) rotate(${tilt.current}deg)`;
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
      ref={eagleRef}
      className="fixed right-2 md:right-8 top-0 z-40 pointer-events-none select-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <span
        className="block text-3xl md:text-5xl"
        style={{
          opacity: 0.18,
          filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.45))",
          lineHeight: 1,
        }}
      >
        🦅
      </span>
    </div>
  );
}
