import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import SoftwareTools from "@/components/SoftwareTools";
import Projects from "@/components/Projects";
import WhyChooseMe from "@/components/WhyChooseMe";
import WorkProcess from "@/components/WorkProcess";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full bg-[#121212] min-h-screen">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <AboutMe />
      <Services />
      <SoftwareTools />
      <Projects />
      <WhyChooseMe />
      <WorkProcess />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
