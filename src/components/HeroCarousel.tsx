
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Updated carousel images with different photos
const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Discover Premium Products",
    description: "Find high-quality products from verified suppliers across the globe",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1612831197310-ff5cf7a211b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Connect with Global Suppliers",
    description: "Build relationships with trusted manufacturers and exporters",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1677911034156-89ce48be5714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Competitive Pricing",
    description: "Get the best deals directly from manufacturers",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Secure Transactions",
    description: "Trade with confidence using our secure payment methods",
  },
];

export const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Automatic carousel sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gray-100 dark:bg-gray-900">
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                    {image.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl text-center">
                    {image.description}
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
