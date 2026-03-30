"use client";

import { useEffect, useRef } from "react";

/**
 * Premium glowing cursor — two-layer trailing effect.
 * - Outer glow: large blurred radial, lags behind cursor (lerp 0.08)
 * - Inner dot:  small crisp circle, snaps instantly to cursor
 * Auto-disabled on touch/mobile devices via (pointer: fine) media query.
 */
export default function GlowCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on true pointer (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // Lerp outer glow toward cursor — the lag creates the trailing feel
      outerX += (mouseX - outerX) * 0.08;
      outerY += (mouseY - outerY) * 0.08;

      if (outerRef.current) {
        // Centre the 400px div on the lerped position
        outerRef.current.style.transform = `translate(${outerX - 200}px, ${outerY - 200}px)`;
      }
      if (innerRef.current) {
        // Centre the 12px dot on the exact cursor position
        innerRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer trailing glow */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-50"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(59,130,246,0.07) 45%, transparent 70%)",
          filter: "blur(48px)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Inner crisp dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50"
        style={{
          background:
            "radial-gradient(circle, rgba(147,197,253,0.9) 0%, rgba(99,102,241,0.5) 100%)",
          boxShadow: "0 0 14px rgba(147,197,253,0.65)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
