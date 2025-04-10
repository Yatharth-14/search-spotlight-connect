
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategorySection } from "@/components/CategorySection";
import { AdvertisementSection } from "@/components/AdvertisementSection";
import { TopSellersSection } from "@/components/TopSellersSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Logo</h1>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <Input type="text" placeholder="Search Bar" className="w-full" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Post your requirements</Button>
            <Button variant="outline" size="sm">Send Your Requirements</Button>
            <Button variant="outline" size="sm">Bid Now</Button>
            <Button className="bg-primary">Login/Register</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Categories */}
        <CategorySection />

        {/* Advertisements */}
        <AdvertisementSection />

        {/* Top Sellers */}
        <TopSellersSection />

        {/* Testimonials */}
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
