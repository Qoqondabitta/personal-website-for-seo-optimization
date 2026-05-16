import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

function ArrowLeft() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const color = project.color;

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #04080f 0%, #0a0f1e 50%, #04080f 100%)" }}
    >
      {/* ── Ambient glow orb ────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, ${color}18 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── Back link ─────────────────────────────────────────────────────── */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium
                     transition-colors duration-200 mb-10 group"
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10
                       group-hover:border-white/30 transition-colors duration-200"
          >
            <ArrowLeft />
          </span>
          Back to portfolio
        </Link>

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${color}20`,
                color: color,
                border: `1px solid ${color}40`,
              }}
            >
              {project.category}
            </span>
            <span className="text-slate-500 text-sm">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {project.title}
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* ── CTA buttons ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm
                       text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
              boxShadow: `0 4px 24px ${color}40`,
            }}
          >
            <ExternalIcon />
            View Live Site
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm
                       text-white border border-white/10 backdrop-blur-sm
                       transition-all duration-200 hover:border-white/30 hover:scale-[1.02]
                       active:scale-[0.98]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <GithubIcon />
            View on GitHub
          </a>
        </div>

        {/* ── Project image ────────────────────────────────────────────────────── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-12"
          style={{
            border: `1px solid ${color}30`,
            boxShadow: `0 0 60px ${color}20, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          <div className="relative aspect-[16/9]">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${color}10 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
              }}
            />
          </div>
        </div>

        {/* ── Two-column layout: About + Highlights ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">

          {/* About ─────────────────────────────────────────────────────────── */}
          <div
            className="lg:col-span-3 rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="text-lg font-bold text-white mb-4">About this project</h2>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              {project.longDescription}
            </p>
          </div>

          {/* Tech stack ──────────────────────────────────────────────────── */}
          <div
            className="lg:col-span-2 rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h2 className="text-lg font-bold text-white mb-4">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{
                    background: `${color}15`,
                    color: color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Highlights ─────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-12"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2 className="text-lg font-bold text-white mb-6">Key highlights</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5"
                  style={{ background: `${color}20`, color: color }}
                >
                  <CheckIcon />
                </span>
                <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom CTA bar ──────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center
                     justify-between gap-5"
          style={{
            background: `linear-gradient(135deg, ${color}0d 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${color}25`,
          }}
        >
          <div>
            <p className="text-white font-semibold mb-1">Ready to see it live?</p>
            <p className="text-slate-400 text-sm">Visit the deployed site or explore the source code on GitHub.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                         text-white transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
                boxShadow: `0 4px 16px ${color}30`,
              }}
            >
              <ExternalIcon />
              Live Site
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                         text-white border border-white/10 hover:border-white/25
                         transition-all duration-200 hover:scale-[1.03]"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
