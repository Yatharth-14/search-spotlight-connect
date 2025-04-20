import { useState } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategorySection } from "@/components/CategorySection";
import { AdvertisementSection } from "@/components/AdvertisementSection";
import { TopSellersSection } from "@/components/TopSellersSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";
import { MovingBanner } from "@/components/MovingBanner";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { sellers } from "@/data/mockData";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof sellers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
      />
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
