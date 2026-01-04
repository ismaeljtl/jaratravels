import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";

// Tour images
import villaGardensImg from "@/assets/tours/villa-gardens.jpg";
import tourInstaxImg from "@/assets/tours/tour-instax.jpg";
import seixalMedievalImg from "@/assets/tours/seixal-medieval-new.png";
import boatripSeixalImg from "@/assets/tours/boatrip-seixal.jpg";
import sesimbraEmotionImg from "@/assets/tours/sesimbra-emotion.png";
import setubalArrabidaImg from "@/assets/tours/setubal-arrabida.jpg";
import azeitaoVineyardImg from "@/assets/tours/azeitao-vineyard.jpg";
import almadaCristoReiImg from "@/assets/tours/almada-cristo-rei.png";
import whiteGoldRouteImg from "@/assets/tours/white-gold-route.webp";

const tourData = [
  { price: 30, duration: "2h30", category: "cultural", image: villaGardensImg },
  { price: 20, duration: "1h30", category: "photography", image: tourInstaxImg },
  { price: 35, duration: "2h", category: "historical", image: seixalMedievalImg },
  { price: 50, duration: "3h", category: "maritime", image: boatripSeixalImg },
  { price: 60, duration: "3h", category: "nature", image: sesimbraEmotionImg },
  { price: 80, duration: "4h", category: "nature", image: setubalArrabidaImg },
  { price: 80, duration: "4h", category: "gastronomy", image: azeitaoVineyardImg },
  { price: 60, duration: "4h", fullDayPrice: 120, category: "cultural", image: almadaCristoReiImg },
  { price: 60, duration: "4h", category: "nature", image: whiteGoldRouteImg },
];

const Tours = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  const getCategoryLabel = (category: string) => {
    const categories = t.tours.categories as Record<string, string>;
    return categories[category] || category;
  };

  const tours = t.tours.items.map((item, index) => ({
    ...item,
    ...tourData[index],
  }));

  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.tours.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.tours.subtitle}
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
                    {getCategoryLabel(tour.category)}
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
                        ({t.tours.fullDay}: {tour.fullDayPrice}€)
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  onClick={handleBookNow}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {t.tours.bookNow}
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
