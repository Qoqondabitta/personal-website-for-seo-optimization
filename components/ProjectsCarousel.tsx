"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";

// ── Desktop card width ──────────────────────────────────────────────────────
const CARD_W_D = 340;

function getGap(w: number): number {
  if (w < 500)  return 14;
  if (w < 768)  return 18;
  if (w < 1024) return 22;
  if (w < 1280) return 26;
  if (w < 1536) return 28;
  return 32;
}

const LOOP_ITEMS = [...projects, ...projects];

// ── Icons ───────────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ArrowDiagonalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

// ── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  movedRef,
}: {
  project: typeof projects[0];
  index: number;
  movedRef: React.MutableRefObject<boolean>;
}) {
  const cardNum = String((index % projects.length) + 1).padStart(2, "0");
  const color = project.color;

  return (
    <div
      onClick={() => {
        if (!movedRef.current) window.open(`/projects/${project.slug}`, "_blank");
      }}
      onMouseMove={(e) => {
        const rect    = e.currentTarget.getBoundingClientRect();
        const rotateY = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
        const rotateX = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
        e.currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
      className="cursor-pointer rounded-2xl overflow-hidden group relative"
      style={{
        background: "rgba(5, 10, 28, 0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Hover glow border overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
                   group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}55, 0 0 48px ${color}1a`,
        }}
      />

      {/* ── Top bar: category + number ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-0">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: `${color}18`,
            color: color,
            border: `1px solid ${color}35`,
          }}
        >
          {project.category}
        </span>
        <span
          className="font-mono text-xs font-bold tabular-nums"
          style={{ color: `${color}65` }}
        >
          {cardNum}
        </span>
      </div>

      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <div className="relative mx-4 mt-3 rounded-xl overflow-hidden" style={{ height: 172 }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 276px, 340px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Accent color tint */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${color}55, transparent 60%)` }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05091c]/80 via-transparent to-transparent" />

        {/* Year badge */}
        <div
          className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          {project.year}
        </div>

        {/* "View Project" pill overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            background: "rgba(0,0,0,0.42)",
            backdropFilter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold
                       scale-90 group-hover:scale-100 transition-transform duration-200"
            style={{
              background: `linear-gradient(135deg, ${color}e0, ${color}99)`,
              boxShadow: `0 4px 20px ${color}55`,
              color: "#fff",
            }}
          >
            View Project
            <ArrowDiagonalIcon />
          </div>
        </div>
      </div>

      {/* ── Text content ──────────────────────────────────────────────────── */}
      <div className="px-4 pt-3.5 pb-4">
        <h3
          className="font-bold text-[15px] mb-1.5 leading-snug transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.93)" }}
        >
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags + GitHub icon */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (movedRef.current) e.preventDefault();
            }}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg
                       text-slate-500 hover:text-white hover:bg-white/10
                       transition-all duration-200"
            title="View on GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main carousel ───────────────────────────────────────────────────────────
export default function ProjectsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const skewRef      = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const posRef       = useRef(0);
  const pausedRef    = useRef(false);
  const draggingRef  = useRef(false);
  const movedRef     = useRef(false);
  const velocityRef  = useRef(0);
  const prevClientX  = useRef(0);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);
  const rafRef       = useRef<number>(0);

  const layoutRef = useRef({
    cardW:  CARD_W_D,
    stride: CARD_W_D + 32,
    halfW:  projects.length * (CARD_W_D + 32),
    mobile: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    const skewEl    = skewRef.current;
    if (!container || !track) return;

    const w       = window.innerWidth;
    const mobile  = w < 640;
    const cardW   = mobile ? 276 : CARD_W_D;
    const cardGap = getGap(w);
    const stride  = cardW + cardGap;
    const halfW   = projects.length * stride;
    layoutRef.current = { cardW, stride, halfW, mobile };

    track.style.gap = `${cardGap}px`;
    cardRefs.current.forEach((card) => {
      if (card) card.style.width = `${cardW}px`;
    });

    if (skewEl) {
      skewEl.style.transform = mobile ? "none" : "skewX(-4deg)";
    }

    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 64);
      lastTime    = time;

      const { stride: st, halfW: hw, cardW: cw, mobile: mob } = layoutRef.current;
      const dtFactor = delta / 16;

      if (!draggingRef.current) {
        if (!pausedRef.current || mob) {
          const containerW = container.clientWidth;
          const viewCenter = containerW / 2;
          let closestDist  = Infinity;
          cardRefs.current.forEach((_, i) => {
            const cardCenter = i * st - posRef.current + cw / 2;
            const d = Math.abs(cardCenter - viewCenter);
            if (d < closestDist) closestDist = d;
          });
          const t            = Math.min(1, closestDist / (containerW * 0.5));
          const baseSpeed    = window.innerWidth < 500 ? 0.8 : 0.55;
          const dynamicSpeed = baseSpeed * (0.8 + t * 0.6) * dtFactor;
          velocityRef.current  = 0;
          posRef.current      += dynamicSpeed;
        } else {
          if (Math.abs(velocityRef.current) > 0.3) {
            posRef.current      += velocityRef.current;
            velocityRef.current *= 0.92;
          } else {
            velocityRef.current = 0;
            const target = Math.round(posRef.current / st) * st;
            posRef.current += (target - posRef.current) * 0.1;
          }
        }
        posRef.current = ((posRef.current % hw) + hw) % hw;
      }

      track.style.transform = `translateX(-${posRef.current}px)`;

      const containerW = container.clientWidth;
      const viewCenter = containerW / 2;
      const maxDist    = containerW * (mob ? 0.9 : 0.52);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = i * st - posRef.current + cw / 2;
        const dist       = Math.abs(cardCenter - viewCenter);
        const t          = Math.max(0, 1 - dist / maxDist);
        const vw = window.innerWidth;
        const scale =
          vw < 500  ? 0.94 + t * 0.07 :
          vw < 768  ? 0.91 + t * 0.11 :
          vw < 1280 ? 0.89 + t * 0.13 :
                      0.87 + t * 0.15;
        const opacity = mob ? 0.7 + t * 0.3 : 0.6 + t * 0.4;
        const zIdx    = Math.floor(t * 10);

        card.style.transform = !mob
          ? `skewX(4deg) scale(${scale})`
          : `scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex  = String(zIdx);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((t) => { lastTime = t; tick(t); });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startDrag = useCallback((clientX: number) => {
    draggingRef.current  = true;
    movedRef.current     = false;
    velocityRef.current  = 0;
    dragStartX.current   = clientX;
    dragStartPos.current = posRef.current;
    prevClientX.current  = clientX;
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!draggingRef.current) return;
    const { halfW } = layoutRef.current;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > 5) movedRef.current = true;
    velocityRef.current = (prevClientX.current - clientX) * 0.5;
    prevClientX.current = clientX;
    posRef.current = ((dragStartPos.current + delta) % halfW + halfW) % halfW;
  }, []);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => { startDrag(e.clientX); },
    [startDrag],
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      moveDrag(e.clientX);
      if (movedRef.current && containerRef.current) containerRef.current.style.cursor = "grabbing";
    },
    [moveDrag],
  );
  const onPointerUp   = useCallback(() => endDrag(), [endDrag]);
  const onTouchStart  = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => { startDrag(e.touches[0].clientX); },
    [startDrag],
  );
  const onTouchMove   = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => { moveDrag(e.touches[0].clientX); },
    [moveDrag],
  );
  const onTouchEnd    = useCallback(() => endDrag(), [endDrag]);

  return (
    <section id="projects" className="py-24" aria-labelledby="projects-heading">

      {/* ── Section header ────────────────────────────────────────────────── */}
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="tag">Projects</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>
        <h2 id="projects-heading" className="section-heading">
          Things I&apos;ve <span className="gradient-text">Built</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl">
          Real client projects and products — spanning web apps, e-commerce, SaaS, and AI.
          Click any card to explore. Drag or swipe to browse.
        </p>
      </div>

      {/* ── Infinite carousel ─────────────────────────────────────────────── */}
      <div className="max-w-[92vw] sm:max-w-[1320px] mx-auto overflow-hidden">
        <div
          ref={containerRef}
          className="overflow-hidden py-12"
          style={{ cursor: "grab", touchAction: "pan-y" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; draggingRef.current = false; }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={skewRef}
            style={{ transform: "skewX(-4deg)", transformOrigin: "center center" }}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{ gap: 32, willChange: "transform" }}
            >
              {LOOP_ITEMS.map((project, i) => (
                <div
                  key={`${project.slug}-${i}`}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="flex-shrink-0"
                  style={{
                    width: CARD_W_D,
                    transform: "skewX(4deg) scale(0.91)",
                    transformOrigin: "center center",
                    opacity: 0.6,
                    willChange: "transform, opacity",
                  }}
                >
                  <ProjectCard project={project} index={i} movedRef={movedRef} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 px-6">
        <p className="text-slate-500 text-sm">
          Showing{" "}
          <span className="text-slate-300 font-semibold">{projects.length}</span>{" "}
          projects
        </p>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
        <a
          href="https://github.com/Qoqondabitta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass
                     border border-white/10 hover:border-blue-500/40
                     text-slate-300 hover:text-white font-semibold text-sm
                     transition-all duration-200 hover:-translate-y-0.5"
        >
          <GithubIcon />
          View All on GitHub
        </a>
      </div>
    </section>
  );
}
