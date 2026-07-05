import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Results from "@/components/Results";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ background: "#0A0E15", color: "#F2F5FA" }}>
      <Nav />
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <Services />
      <Process />
      <Results />
      <About />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}
