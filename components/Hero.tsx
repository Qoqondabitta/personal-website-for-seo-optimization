import Image from "next/image";
import Abdulakhad from "../public/Abdulakhad-Turgunaliev.png"

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-16" aria-label="Introduction">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className="order-2 md:order-1 space-y-6">
          {/* Status badge */}
          <div className="animate-fade-in delay-100">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/30 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </div>

          {/* H1 — primary SEO signal */}
          <h1 className="animate-slide-up delay-200 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="block text-white">Abdulakhad</span>
            <span className="block gradient-text">Turgunaliev</span>
          </h1>

          <p className="animate-slide-up delay-300 text-xl md:text-2xl text-slate-400 font-light font-mono tracking-wide">
            AI Freak&nbsp;<span className="text-blue-500">|</span>&nbsp;Entrepreneur&nbsp;<span className="text-blue-500">|</span>&nbsp;Web&App Developer
          </p>

          <p className="animate-slide-up delay-400 text-slate-400 text-base leading-relaxed max-w-lg">
            Abdulakhad Turgunaliev (born 2005) is an entrepreneur and web developer specializing in full-stack website and application development for businesses. He is also involved in an e-bike rental business in Poland and works at Four Seasons Hotel Toronto.
          </p>

          <div className="animate-slide-up delay-500 flex flex-wrap gap-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5">
              Get in Touch
            </a>
          </div>

          {/* Quick stats */}
          <div className="animate-fade-in delay-600 flex gap-8 pt-4 border-t border-white/5">
            {[
              { value: "50+", label: "Projects Built" },
              { value: "3+", label: "Years Coding" },
              { value: "AI", label: "Core Focus" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-in delay-300">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-violet-500/30 to-cyan-500/20 blur-2xl scale-110 animate-pulse-slow" />

            {/* Photo frame */}
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/10 glow-blue"
              style={{ animation: "float 8s ease-in-out infinite" }}
            >
              <Image
                src={Abdulakhad}
                alt="Abdulakhad Turgunaliev portrait"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-[15px] -left-[10px] md:top-4 md:-top-auto md:-right-6 md:left-auto glass border border-blue-500/30 rounded-xl px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium text-blue-300 backdrop-blur-xl shadow-xl whitespace-nowrap">
              🤖 AI Freak
            </div>
            <div className="absolute bottom-[20px] -right-[20px] md:bottom-4 md:right-auto md:-left-6 glass border border-violet-500/30 rounded-xl px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium text-violet-300 backdrop-blur-xl shadow-xl whitespace-nowrap">
              🚀 Web Developer
            </div>
            <div className="absolute -bottom-[10px] -left-[20px] md:bottom-4 md:left-auto md:-right-6 glass border border-cyan-500/30 rounded-xl px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium text-cyan-300 backdrop-blur-xl shadow-xl whitespace-nowrap">
              📱 App Developer
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-fade-in delay-600" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  );
}
