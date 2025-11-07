import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Partnership = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">Parceria Oficial</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Parceiros GetYourGuide
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Estamos orgulhosamente em parceria com a GetYourGuide, uma das maiores plataformas 
            de reservas de experiências de viagem do mundo. Esta colaboração permite-nos oferecer 
            aos nossos clientes acesso a milhares de atividades verificadas e avaliadas, com 
            reservas fáceis e seguras.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Experiências Disponíveis</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <p className="text-muted-foreground">Suporte ao Cliente</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <div className="text-4xl font-bold text-adventure mb-2">100%</div>
              <p className="text-muted-foreground">Reservas Seguras</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="mt-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={() => window.open('https://www.getyourguide.com', '_blank')}
          >
            Visitar GetYourGuide
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
