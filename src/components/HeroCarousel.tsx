
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const carouselImages = [
  { 
    id: 1, 
    url: "/lovable-uploads/5f8c5f76-30b4-4825-9833-b2ee160443dd.png", 
    title: "Marketplace for Businesses" 
  },
  { 
    id: 2, 
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", 
    title: "Connect with Suppliers" 
  },
  { 
    id: 3, 
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", 
    title: "Find the Best Deals" 
  },
];

export const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gray-100">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={image.id} className="relative">
              <div className="relative w-full h-80 md:h-96 overflow-hidden">
                <img 
                  src={image.url} 
                  alt={`Carousel image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    {image.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl text-center">
                    Hero Section With Carousel of Images
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">Explore Now</Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-primary" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
