import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="orb w-[600px] h-[600px] bg-blue-600/10 -top-40 -left-32"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          className="orb w-[500px] h-[500px] bg-violet-600/8 top-1/3 -right-40"
          style={{ animation: "float 14s ease-in-out infinite reverse" }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-cyan-600/6 bottom-0 left-1/3"
          style={{ animation: "float 12s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <ProjectsCarousel />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
