import ProfileFacts from "./ProfileFacts";

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

        {/* Bio + ProfileFacts */}
        <div className="grid lg:grid-cols-2 gap-12 mt-12">

          {/* (A) Luxury Bio */}
          <div className="space-y-5 text-slate-300 leading-relaxed text-[1.05rem]">
            <p>
              <strong className="text-white">Abdulakhad Turgunaliev</strong> is a{" "}
              <span className="text-blue-300 font-semibold">young entrepreneur</span> and digital
              solutions specialist focused on building high-quality, full-stack websites and applications for
              modern businesses.
            </p>
            <p>
              With a strong interest in artificial intelligence and emerging technologies, he helps business owners
              transform their ideas into scalable, efficient digital products. His work emphasizes clean design,
              performance, and real-world impact.
            </p>
            <p>
              In addition to his work in tech, he operates an{" "}
              <span className="text-violet-300 font-semibold">international e-bike rental business in Poland</span>{" "}
              and brings hands-on professional experience from his role at the Four Seasons Hotel Toronto.
            </p>
            <p>
              Driven by growth, discipline, and innovation, Turgunaliev is committed to delivering value and
              continuously evolving in the fast-changing world of technology and business.
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

          {/* (B) Knowledge Panel Card */}
          <ProfileFacts />
        </div>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {skills.map((group) => (
            <div key={group.category} className="glass rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
    </section>
  );
}
