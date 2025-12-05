import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Import tour images
import villaGardens from "@/assets/tours/villa-gardens.jpg";
import tourInstax from "@/assets/tours/tour-instax.jpg";
import seixalMedieval from "@/assets/tours/seixal-medieval.jpg";
import boatripSeixal from "@/assets/tours/boatrip-seixal.jpg";
import sesimbraEmotion from "@/assets/tours/sesimbra-emotion.webp";
import setubalArrabida from "@/assets/tours/setubal-arrabida.jpg";
import azeitaoVineyard from "@/assets/tours/azeitao-vineyard.jpg";
import almadaCristoRei from "@/assets/tours/almada-cristo-rei.jpg";
import whiteGoldRoute from "@/assets/tours/white-gold-route.webp";
import seixalBay from "@/assets/seixal-bay.jpg";

const galleryImages = [
  { src: seixalBay, alt: "Baía do Seixal", caption: "Baía do Seixal" },
  { src: villaGardens, alt: "Villa & Gardens Tour", caption: "Tour Villa & Gardens" },
  { src: tourInstax, alt: "Instax Photos Tour", caption: "Tour Instax Photos" },
  { src: seixalMedieval, alt: "Seixal Medieval Tour", caption: "Seixal Medieval" },
  { src: boatripSeixal, alt: "Boatrip Seixal", caption: "Boatrip Seixal" },
  { src: sesimbraEmotion, alt: "Sesimbra Emotion", caption: "Sesimbra Emotion" },
  { src: setubalArrabida, alt: "Setúbal & Arrábida", caption: "Setúbal & Arrábida" },
  { src: azeitaoVineyard, alt: "Azeitão Vineyard", caption: "Azeitão Vineyard" },
  { src: almadaCristoRei, alt: "Almada Cristo Rei", caption: "Almada" },
  { src: whiteGoldRoute, alt: "White Gold Route", caption: "Rota do Ouro Branco" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Galeria
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra os destinos e experiências que oferecemos através das nossas fotografias
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              {/* Image */}
              {selectedImage !== null && (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="max-h-[70vh] max-w-full object-contain"
                  />
                  <p className="text-white text-lg font-medium">
                    {galleryImages[selectedImage].caption}
                  </p>
                </div>
              )}

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
