const skills = [
  { category: "AI / ML", items: ["Python", "TensorFlow", "OpenAI API", "Claude API", "Computer Vision"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Expo"] },
  { category: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "Supabase", "REST APIs"] },
  { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma", "VS Code"] },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="tag">About</span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/50 to-transparent" />
        </div>

        <h2 id="about-heading" className="section-heading">
          Who is <span className="gradient-text">Abdulakhad Turgunaliev?</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Bio */}
          <div className="space-y-5 text-slate-300 leading-relaxed text-[1.05rem]">
            <p>
              Hi — I&apos;m <strong className="text-white">Abdulakhad Turgunaliev</strong>, an AI developer,
              entrepreneur, and student with a passion for building intelligent software that solves real-world
              problems. I&apos;ve been writing code for over three years, focusing on the intersection of
              artificial intelligence and product development.
            </p>
            <p>
              My journey started with a curiosity about how machines learn. Today,{" "}
              <strong className="text-white">Abdulakhad Turgunaliev</strong> ships products that integrate AI
              APIs, computer vision, and full-stack web technologies — from concept to deployment.
            </p>
            <p>
              As a student, I believe the best education comes from building. I combine academic rigor with
              hands-on projects, constantly iterating and learning from real users. Whether it&apos;s a
              food-tracking app powered by Claude&apos;s vision API or a SaaS tool that automates workflows,
              I approach every project with the mindset of a founder.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m reading about emerging AI research, exploring new frameworks,
              or brainstorming the next product idea.
            </p>

            <div className="pt-2">
              <a
                href="/abdulakhad-turgunaliev-resume.pdf"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                aria-label="Download Abdulakhad Turgunaliev resume"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="group-hover:underline">Download Resume</span>
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-5">
            {skills.map((group) => (
              <div key={group.category} className="glass rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-300 text-sm hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
