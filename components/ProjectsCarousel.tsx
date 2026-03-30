"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

// ── Desktop defaults (overridden at runtime for mobile) ────────────────────
const CARD_W_D = 320;


// Responsive gap: proportional to viewport, not fixed
function getGap(w: number): number {
  if (w < 500)  return 12;  // mobile — do not touch
  if (w < 768)  return 16;  // small tablet
  if (w < 1024) return 20;  // tablet — do not touch
  if (w < 1280) return 24;  // small laptop — tighter
  if (w < 1536) return 26;  // 1440px — fixed
  return 30;                // large monitors
}

// ── Project data ───────────────────────────────────────────────────────────
const projects = [
  {
    title: "Vodiy Restaurant",
    description:
      "Digital menu and online ordering platform for a Central Asian restaurant with multi-language support and WhatsApp integration.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/vodiy-menu-bg.jpeg",
    link: "https://vodiy-pl.netlify.app/",
    github: "https://github.com/Qoqondabitta/vodiy-restaurant",
  },
  {
    title: "Xon Clothing Brand",
    description:
      "Full e-commerce storefront for a fashion label featuring product catalog, cart management, and Stripe-powered checkout.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    image: "/xon-clothing-brand.jpeg",
    link: "https://xon-org.netlify.app/",
    github: "https://github.com/Qoqondabitta/ecommerce",
  },
  {
    title: "Crown De Balon Barber",
    description:
      "Booking and showcase platform for a barber shop with service menu, gallery, and real-time appointment scheduling.",
    tags: ["Next.js", "Tailwind CSS", "Prisma"],
    image: "/crown-de-balon.jpeg",
    link: "https://crown-de-balon.netlify.app/",
    github: "https://github.com/Qoqondabitta/crown-de-balon",
  },
  {
    title: "Turgunaliev Sarvar Portfolio",
    description:
      "Personal portfolio site for a professional client, optimized for SEO and Core Web Vitals with a clean, modern design.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/turgunaliev-sarvar-bg.jpeg",
    link: "https://turgunaliev-sarvar.netlify.app/",
    github: "https://github.com/Qoqondabitta/Sarvar",
  },
  {
    title: "Resume Builder Platform",
    description:
      "AI-powered resume builder with ATS optimization, live PDF export, and job-description tailoring via Claude API.",
    tags: ["Next.js", "Claude API", "PDFKit", "TypeScript"],
    image: "/resume-yourself-bg.jpeg",
    link: "https://resume-yourself.netlify.app/",
    github: "https://github.com/Qoqondabitta/resume-builder",
  },
];

const LOOP_ITEMS = [...projects, ...projects];

// ── Icon helpers ───────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

// ── ProjectCard ────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  movedRef,
}: {
  project: typeof projects[0];
  movedRef: React.MutableRefObject<boolean>;
}) {
  return (
    <div
      onClick={() => { if (!movedRef.current) window.open(project.link, "_blank"); }}
      onMouseMove={(e) => {
        const rect    = e.currentTarget.getBoundingClientRect();
        const rotateY = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
        const rotateX = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
        e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
      className="cursor-pointer rounded-2xl overflow-hidden group transition-colors duration-300"
      style={{
        background: "rgba(2, 6, 23, 0.90)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.06)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Screenshot */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 260px, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* CTA overlay */}
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-[3px] opacity-0
                     group-hover:opacity-100 transition-opacity duration-300
                     flex items-center justify-center gap-3 z-10"
          style={{ pointerEvents: "none" }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); if (movedRef.current) e.preventDefault(); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                       bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold
                       transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            style={{ pointerEvents: "auto" }}
          >
            <ExternalIcon /> View Live
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); if (movedRef.current) e.preventDefault(); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                       border border-white/40 hover:border-white/70 text-white
                       text-xs font-semibold backdrop-blur-sm
                       transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
            style={{ pointerEvents: "auto" }}
          >
            <GithubIcon /> GitHub
          </a>
        </div>
      </div>

      {/* Text content */}
      <div className="p-5">
        <h3 className="font-bold text-white text-base mb-1.5 leading-snug
                       group-hover:text-blue-300 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ProjectsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const skewRef      = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  // Animation state — all in refs, zero re-renders
  const posRef       = useRef(0);
  const pausedRef    = useRef(false);
  const draggingRef  = useRef(false);
  const movedRef     = useRef(false);
  const velocityRef  = useRef(0);
  const prevClientX  = useRef(0);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);
  const rafRef       = useRef<number>(0);

  // Responsive layout values — computed at mount, shared across tick + drag handlers
  // Initialised with desktop defaults; overwritten inside useEffect once window is available
  const layoutRef = useRef({
    cardW:  CARD_W_D,
    stride: CARD_W_D + 30,           // 30 = getGap large-screen default
    halfW:  projects.length * (CARD_W_D + 30),
    mobile: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    const skewEl    = skewRef.current;
    if (!container || !track) return;

    // ── Compute layout based on screen size ─────────────────────────────────
    const w       = window.innerWidth;
    const mobile  = w < 640;
    const cardW   = mobile ? 260 : CARD_W_D;
    const cardGap = getGap(w);
    const stride  = cardW + cardGap;
    const halfW   = projects.length * stride;
    layoutRef.current = { cardW, stride, halfW, mobile };

    // Apply computed gap and card widths to DOM
    track.style.gap = `${cardGap}px`;
    cardRefs.current.forEach((card) => {
      if (card) card.style.width = `${cardW}px`;
    });

    // Disable skew wrapper on mobile (looks bad on narrow screens)
    if (skewEl) {
      skewEl.style.transform = mobile ? "none" : "skewX(-5deg)";
    }

    // ── RAF tick ─────────────────────────────────────────────────────────────
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 64); // cap at 64 ms (tab was hidden etc.)
      lastTime    = time;

      const { stride: st, halfW: hw, cardW: cw, mobile: mob } = layoutRef.current;
      const dtFactor = delta / 16; // frame-rate normalisation

      if (!draggingRef.current) {
        if (!pausedRef.current || mob) {
          // ── Dynamic speed: faster at edges, slower near centre ─────────────
          const containerW = container.clientWidth;
          const viewCenter = containerW / 2;
          let closestDist  = Infinity;
          cardRefs.current.forEach((_, i) => {
            const cardCenter = i * st - posRef.current + cw / 2;
            const d = Math.abs(cardCenter - viewCenter);
            if (d < closestDist) closestDist = d;
          });
          const t         = Math.min(1, closestDist / (containerW * 0.5));
          const baseSpeed = window.innerWidth < 500 ? 0.85 : 0.6;
          const dynamicSpeed = baseSpeed * (0.8 + t * 0.6) * dtFactor;

          velocityRef.current = 0;
          posRef.current += dynamicSpeed;
        } else {
          // Desktop hover: apply inertia then snap to nearest card
          if (Math.abs(velocityRef.current) > 0.3) {
            posRef.current += velocityRef.current;
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

      // Centre-focus scaling
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
          vw < 500  ? 0.95 + t * 0.08 :   // mobile  — DO NOT TOUCH
          vw < 768  ? 0.92 + t * 0.12 :   // tablet
          vw < 1280 ? 0.90 + t * 0.14 :   // laptop
                      0.88 + t * 0.16;    // large screens
        const opacity    = mob
          ? 0.75 + t * 0.25   // mobile:  0.75 → 1.00
          : 0.65 + t * 0.35;  // desktop: 0.65 → 1.00
        const zIdx       = Math.floor(t * 10);

        card.style.transform = (!mob)
          ? `skewX(5deg) scale(${scale})`
          : `scale(${scale})`;
        card.style.opacity   = String(opacity);
        card.style.zIndex    = String(zIdx);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((t) => { lastTime = t; tick(t); });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Shared drag core ────────────────────────────────────────────────────
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

  // ── Pointer handlers (mouse + stylus) ───────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    startDrag(e.clientX);
  }, [startDrag]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    moveDrag(e.clientX);
    if (movedRef.current && containerRef.current) containerRef.current.style.cursor = "grabbing";
  }, [moveDrag]);

  const onPointerUp = useCallback(() => endDrag(), [endDrag]);

  // ── Touch handlers (iOS / Android) ──────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    startDrag(e.touches[0].clientX);
  }, [startDrag]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    moveDrag(e.touches[0].clientX);
  }, [moveDrag]);

  const onTouchEnd = useCallback(() => endDrag(), [endDrag]);

  return (
    <section id="projects" className="py-24" aria-labelledby="projects-heading">

      {/* ── Section header ──────────────────────────────────────────────── */}
      <div className="px-6 max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="tag">Projects</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>
        <h2 id="projects-heading" className="section-heading">
          Things I&apos;ve <span className="gradient-text">Built</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl">
          Real client projects and products — spanning web apps, e-commerce, and AI platforms.
          Drag or swipe to explore.
        </p>
      </div>

      {/* ── Unified infinite carousel — all screen sizes ────────────────── */}
      <div className="max-w-[90vw] sm:max-w-[1280px] mx-auto overflow-hidden">
        <div
          ref={containerRef}
          className="overflow-hidden py-10"
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
          {/* skewRef: skew disabled on mobile via useEffect */}
          <div ref={skewRef} style={{ transform: "skewX(-5deg)", transformOrigin: "center center" }}>
            <div
              ref={trackRef}
              className="flex"
              style={{ gap: 30, willChange: "transform" }}
            >
              {LOOP_ITEMS.map((project, i) => (
                <div
                  key={`${project.title}-${i}`}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="flex-shrink-0"
                  style={{
                    width: CARD_W_D,
                    transform: "skewX(5deg) scale(0.92)",
                    transformOrigin: "center center",
                    opacity: 0.65,
                    willChange: "transform, opacity",
                  }}
                >
                  <ProjectCard project={project} movedRef={movedRef} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GitHub CTA ──────────────────────────────────────────────────── */}
      <div className="text-center mt-10 px-6">
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
          View All Projects on GitHub
        </a>
      </div>
    </section>
  );
}
