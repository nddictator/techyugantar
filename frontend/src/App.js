import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import ServicesBento from "@/components/ServicesBento";
import IndustriesGrid from "@/components/IndustriesGrid";
import ProcessTimeline from "@/components/ProcessTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import Testimonials from "@/components/Testimonials";
import EngagementModels from "@/components/EngagementModels";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-[#07090E] text-slate-100 min-h-screen">
      <Header />
      <main>
        <Hero />
        <TechMarquee />
        <ServicesBento />
        <IndustriesGrid />
        <ProcessTimeline />
        <ProjectShowcase />
        <Testimonials />
        <EngagementModels />
        <ContactSection />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
