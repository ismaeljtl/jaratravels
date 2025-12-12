import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/seixal-bay.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in opacity-90">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            onClick={() => navigate("/reservas")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            {t.hero.bookNow}
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            {t.hero.ourServices}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white cursor-pointer" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
