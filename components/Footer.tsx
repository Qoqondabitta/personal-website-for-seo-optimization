export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <p>
          &copy; {year}{" "}
          <span className="text-slate-400 font-medium">Abdulakhad Turgunaliev</span>.
          All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 list-none">
            {["#about", "#projects", "#contact"].map((href) => (
              <li key={href}>
                <a href={href} className="hover:text-white transition-colors capitalize">
                  {href.replace("#", "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-slate-600">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
