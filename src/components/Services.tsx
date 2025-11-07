import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";
import toursImage from "@/assets/tours-image.jpg";
import tripsImage from "@/assets/trips-image.jpg";
import eventsImage from "@/assets/events-image.jpg";

const services = [
  {
    title: "Tours Guiados",
    description: "Explore destinos incríveis com guias especializados e roteiros cuidadosamente planeados",
    icon: MapPin,
    image: toursImage,
  },
  {
    title: "Passeios Personalizados",
    description: "Experiências únicas adaptadas aos seus interesses e preferências",
    icon: Calendar,
    image: tripsImage,
  },
  {
    title: "Eventos Especiais",
    description: "Organizamos eventos memoráveis para grupos e ocasiões especiais",
    icon: Users,
    image: eventsImage,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos experiências de viagem completas, desde tours guiados até eventos personalizados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
