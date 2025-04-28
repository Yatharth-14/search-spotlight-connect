import { useState } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategorySection } from "@/components/CategorySection";
import { AdvertisementSection } from "@/components/AdvertisementSection";
import { TopSellersSection } from "@/components/TopSellersSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";
import { MovingBanner } from "@/components/MovingBanner";
import { LoginModal } from "@/components/auth/LoginModal";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Main Sections */}
      <HeroCarousel />
      <MovingBanner />
      <CategorySection />
      <AdvertisementSection />
      <TopSellersSection />
      <TestimonialSection />
      <Footer />

      <LoginModal
        open={loginModalOpen}
        onOpenChange={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default Index;
