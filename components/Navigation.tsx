"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 shadow-2xl shadow-black/50" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity" aria-label="Abdulakhad Turgunaliev — Home">
          <span className="text-blue-400">A</span>
          <span className="text-white">T</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link text-sm font-medium">{l.label}</a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <ul className="flex flex-col px-6 py-4 gap-4 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block text-slate-300 hover:text-white font-medium" onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block text-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
