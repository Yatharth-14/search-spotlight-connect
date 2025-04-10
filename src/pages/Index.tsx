
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategorySection } from "@/components/CategorySection";
import { AdvertisementSection } from "@/components/AdvertisementSection";
import { TopSellersSection } from "@/components/TopSellersSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { Search, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png" 
                alt="National Trade Fair" 
                className={`h-10 md:h-12 ${theme === 'dark' ? 'invert' : ''}`}
              />
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Input type="text" placeholder="Search products, suppliers..." className="w-full pl-10 dark:bg-gray-700 dark:text-white" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex space-x-2">
              <Button variant="outline" size="sm" className="dark:text-white dark:hover:bg-gray-700">Post Requirements</Button>
              <Button variant="outline" size="sm" className="hidden lg:inline-flex dark:text-white dark:hover:bg-gray-700">Send Inquiry</Button>
              <Button variant="outline" size="sm" className="hidden lg:inline-flex dark:text-white dark:hover:bg-gray-700">Bid Now</Button>
            </div>
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block">
                  <span className="text-sm dark:text-white">Welcome, {user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => logout()} 
                  className="dark:text-white"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button className="bg-primary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="dark:text-white">Register</Button>
                </Link>
              </div>
            )}
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
