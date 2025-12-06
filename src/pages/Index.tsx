import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tours from "@/components/Tours";
import About from "@/components/About";
import Partnership from "@/components/Partnership";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Tours />
      <About />
      <Partnership />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
