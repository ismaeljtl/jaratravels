import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro } from "lucide-react";

// Tour images
import villaGardensImg from "@/assets/tours/villa-gardens.jpg";
import tourInstaxImg from "@/assets/tours/tour-instax.jpg";
import seixalMedievalImg from "@/assets/tours/seixal-medieval.jpg";
import boatripSeixalImg from "@/assets/tours/boatrip-seixal.jpg";
import sesimbraEmotionImg from "@/assets/tours/sesimbra-emotion.webp";
import setubalArrabidaImg from "@/assets/tours/setubal-arrabida.jpg";
import azeitaoVineyardImg from "@/assets/tours/azeitao-vineyard.jpg";
import almadaCristoReiImg from "@/assets/tours/almada-cristo-rei.jpg";
import whiteGoldRouteImg from "@/assets/tours/white-gold-route.jpg";

const tours = [
  {
    title: "Tour Villa & Gardens",
    description: "Guided walk through beautiful gardens and historic villa of Seixal.",
    price: 30,
    duration: "2h30",
    category: "Cultural",
    image: villaGardensImg,
  },
  {
    title: "Tour Instax Photos",
    description: "Take instant polaroids while discovering local gems.",
    price: 20,
    duration: "1h30",
    category: "Photography",
    image: tourInstaxImg,
  },
  {
    title: "Seixal Medieval",
    description: "Step back in time with a medieval-themed tour.",
    price: 35,
    duration: "2h",
    category: "Historical",
    image: seixalMedievalImg,
  },
  {
    title: "Boatrip Seixal",
    description: "Sail through the beautiful Seixal Bay, aboard one of the typical boats of the past. Visit Corroios Tide Mill. Welcome drink, water and snacks aboard.",
    price: 50,
    duration: "3h",
    category: "Maritime",
    image: boatripSeixalImg,
  },
  {
    title: "Sesimbra Emotion",
    description: "Unique experience in Sado River to watch Dolphins.",
    price: 60,
    duration: "3h",
    category: "Nature",
    image: sesimbraEmotionImg,
  },
  {
    title: "Setúbal & Arrábida",
    description: "Arrábida is a protected natural reserve classified by UNESCO whose history is written in the stones, and quality of life can be felt in the air, unique landscape and typical lunch with fried cuttlefish.",
    price: 80,
    duration: "4h",
    category: "Nature",
    image: setubalArrabidaImg,
  },
  {
    title: "Azeitão Vineyard Tour & Wine Tasting",
    description: "Quick getaway in small town called Azeitão, one of the most important wine regions in Portugal with delicious pastry.",
    price: 80,
    duration: "4h",
    category: "Gastronomy",
    image: azeitaoVineyardImg,
  },
  {
    title: "Almada - Cristo Rei",
    description: "In the heart of the Tagus River, a unique piece of Portuguese religion, Cristo Rei with 110 meters and a high viewing platform with panoramic view of Lisbon and the bridge 25 de Abril!",
    price: 60,
    duration: "4h",
    fullDayPrice: 120,
    category: "Cultural",
    image: almadaCristoReiImg,
  },
  {
    title: "White Gold Route",
    description: "Alcochete, land of salt, called 'White gold' have a beautiful landscape under Tagus River, idyllic setting for a walk by the sea. Observing our history and our customs, contemplate nature along a route.",
    price: 60,
    duration: "4h",
    category: "Nature",
    image: whiteGoldRouteImg,
  },
];

const Tours = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Tours</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore as melhores experiências na região de Lisboa e arredores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <Card 
              key={index} 
              className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-border/50 overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground border-none">
                    {tour.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{tour.duration}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{tour.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <CardDescription className="text-sm leading-relaxed">
                  {tour.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Euro className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">{tour.price}</span>
                    {tour.fullDayPrice && (
                      <span className="text-sm text-muted-foreground ml-2">
                        (Full day: {tour.fullDayPrice}€)
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Reservar Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
