"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Keyframes injected once — no globals modified
const ROBOT_CSS = `
@keyframes rfloat {
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-10px); }
}
@keyframes rwave {
  0%   { transform: rotate(0deg);   }
  18%  { transform: rotate(-18deg); }
  36%  { transform: rotate(6deg);   }
  54%  { transform: rotate(-14deg); }
  72%  { transform: rotate(4deg);   }
  100% { transform: rotate(0deg);   }
}
.rf-float { animation: rfloat 3.2s ease-in-out infinite; }
.rf-wave  {
  transform-origin: bottom center;
  animation: rwave 0.9s ease-in-out;
}
`;

/**
 * Fixed bottom-right floating robot.
 * - Floats up/down continuously
 * - Waves every 3 s (whole-body rock — only way to animate a raster image)
 * - "let's chat" bubble above
 * - Entire element links to WhatsApp
 */
export default function FloatingRobot() {
  const waveRef    = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const doWave = () => {
      const el = waveRef.current;
      if (!el) return;

      // Remove first (force reflow) so re-triggering always restarts animation
      el.classList.remove("rf-wave");
      void el.getBoundingClientRect();
      el.classList.add("rf-wave");

      el.addEventListener(
        "animationend",
        () => {
          el.classList.remove("rf-wave");
          timerRef.current = setTimeout(doWave, 3000);
        },
        { once: true }
      );
    };

    // First wave 2 s after mount
    timerRef.current = setTimeout(doWave, 2000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      <style>{ROBOT_CSS}</style>

      <a
        href="https://wa.me/14376962005"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col items-center gap-1 cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        {/* ── Chat bubble ──────────────────────────────────────────────── */}
        <div
          className="relative px-3 py-1.5 rounded-2xl text-xs md:text-sm font-semibold text-blue-200 whitespace-nowrap glass border border-blue-500/30 shadow-xl backdrop-blur-xl transition-transform duration-200 group-hover:-translate-y-1"
          style={{ boxShadow: "0 0 16px rgba(59,130,246,0.25)" }}
        >
          let&apos;s chat&nbsp;💬

          {/* Bubble tail — rotated square clipped to look like a pointer */}
          <span
            className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 glass border-b border-r border-blue-500/30 rotate-45"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
        </div>

        {/* ── Float wrapper (Y only) ────────────────────────────────────── */}
        <div className="rf-float">
          {/* ── Wave wrapper (rotate only, never conflicts with float) ──── */}
          <div ref={waveRef}>
            <Image
              src="/robot-buddy.png"
              alt="Chat robot"
              width={120}
              height={120}
              priority
              className="
                w-28 h-28 md:w-24 md:h-24
                object-contain
                drop-shadow-[0_8px_24px_rgba(59,130,246,0.35)]
                transition-all duration-200
                group-hover:drop-shadow-[0_12px_32px_rgba(59,130,246,0.55)]
                group-hover:scale-105
              "
            />
          </div>
        </div>
      </a>
    </>
  );
}
