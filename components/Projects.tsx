const projects = [
  {
    title: "NutriAI — AI Food Tracker",
    description:
      "A mobile app that uses Claude's vision API to instantly analyze meals from photos, tracking calories, macros, and nutritional data. Built with Expo React Native and Supabase.",
    tags: ["Expo", "Claude Vision", "Supabase", "React Native", "AI"],
    emoji: "🥗",
    gradient: "from-green-500/20 to-teal-500/10",
    border: "border-green-500/20",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Resume Builder SaaS",
    description:
      "An AI-powered resume builder that generates tailored resumes based on job descriptions. Includes PDF export, ATS optimization, and a drag-and-drop editor.",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind", "PDFKit"],
    emoji: "📄",
    gradient: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/20",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Sher Kebab — Restaurant Platform",
    description:
      "A full-stack restaurant ordering platform with real-time order tracking, menu management, and an admin dashboard. Includes WhatsApp order notifications.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind", "Real-time"],
    emoji: "🍢",
    gradient: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/20",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    title: "AI Study Assistant",
    description:
      "Transforms lecture notes and PDFs into flashcards, quizzes, and summaries using LLMs. Helps students learn faster with spaced repetition algorithms.",
    tags: ["Python", "FastAPI", "Claude API", "React", "LangChain"],
    emoji: "📚",
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    link: "#",
    github: "#",
    featured: false,
  },
];

function GithubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function ProjectCard({ project, large = false }: { project: typeof projects[0]; large?: boolean }) {
  return (
    <article
      className={`glass-hover rounded-2xl ${large ? "p-7" : "p-6"} bg-gradient-to-br ${project.gradient} ${project.border} border group`}
      aria-label={project.title}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`${large ? "text-4xl" : "text-3xl"}`} role="img" aria-hidden="true">
          {project.emoji}
        </span>
        <div className="flex gap-3">
          <a href={project.github} className="text-slate-500 hover:text-white transition-colors" aria-label={`View ${project.title} on GitHub`}>
            <GithubIcon />
          </a>
          <a href={project.link} className="text-slate-500 hover:text-white transition-colors" aria-label={`Open ${project.title}`}>
            <ExternalIcon />
          </a>
        </div>
      </div>

      <h3 className={`${large ? "text-xl" : "text-lg"} font-bold text-white mb-2 group-hover:text-blue-300 transition-colors`}>
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="tag">Projects</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <h2 id="projects-heading" className="section-heading">
          Things I&apos;ve <span className="gradient-text">Built</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl">
          A selection of projects by Abdulakhad Turgunaliev — spanning AI integrations, full-stack apps, and mobile development.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter((p) => p.featured).map((p) => (
            <ProjectCard key={p.title} project={p} large />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter((p) => !p.featured).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/abdulakhad-turgunaliev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <GithubIcon />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
