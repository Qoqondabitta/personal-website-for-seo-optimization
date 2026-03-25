"use client";

import { useState } from "react";

const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/abdulakhad-turgunaliev", // ← update
    color: "hover:text-blue-400 hover:border-blue-400/40",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/abdulakhad-turgunaliev", // ← update
    color: "hover:text-slate-200 hover:border-slate-400/40",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:abdulakhad@example.com", // ← update with real email
    color: "hover:text-green-400 hover:border-green-400/40",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: Replace with your form handler (Resend, Formspree, or a Next.js /api/contact route)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-28 px-6" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="tag">Contact</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <h2 id="contact-heading" className="section-heading">
          Let&apos;s <span className="gradient-text">Work Together</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl">
          Have a project idea or opportunity? Abdulakhad Turgunaliev is always open to interesting conversations.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
              <input
                id="name" type="text" required value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Jane Smith"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                id="email" type="email" required value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="jane@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea
                id="message" required rows={5} value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 transition-all resize-none text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : "Send Message"}
            </button>
            {status === "sent" && (
              <p className="text-green-400 text-sm text-center">Thanks! I&apos;ll get back to you soon.</p>
            )}
          </form>

          {/* Socials */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-semibold text-white">Or reach me directly</h3>
              <div className="space-y-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.name !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 ${s.color}`}
                    aria-label={`Connect with Abdulakhad Turgunaliev on ${s.name}`}
                  >
                    {s.icon}
                    <span className="font-medium">{s.name}</span>
                    <svg className="w-4 h-4 ml-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Currently Available</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Abdulakhad Turgunaliev is open to freelance projects, internships, and full-time opportunities
                in AI development and software engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
