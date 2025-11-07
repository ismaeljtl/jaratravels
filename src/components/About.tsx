import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary text-primary-foreground">Sobre Nós</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Criamos Experiências de Viagem Memoráveis
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A JaraTravels é especializada em criar experiências de viagem únicas e inesquecíveis. 
              Com anos de experiência no setor do turismo, oferecemos serviços de qualidade superior 
              e atenção personalizada a cada cliente.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Trabalhamos em parceria com plataformas líderes como a GetYourGuide para garantir 
              as melhores experiências e facilidade nas reservas.
            </p>
            
            <div className="space-y-4">
              {[
                "Tours guiados por profissionais especializados",
                "Parceria oficial com GetYourGuide",
                "Experiências personalizadas para cada cliente",
                "Organização completa de eventos",
              ].map((item, index) => (
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
                <h3 className="text-2xl font-bold mb-4">Por que escolher JaraTravels?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Experiência comprovada no setor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Atendimento personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Parcerias com as melhores plataformas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Preços competitivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Satisfação garantida</span>
                  </li>
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
