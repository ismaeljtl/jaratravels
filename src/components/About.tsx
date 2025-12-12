import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">{t.about.badge}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t.about.description1}
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              {t.about.description2}
            </p>
            
            <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-primary">
                {t.about.registration}
              </p>
            </div>
            
            <div className="space-y-4">
              {t.about.features.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{t.about.whyChoose}</h3>
                <ul className="space-y-3">
                  {t.about.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
