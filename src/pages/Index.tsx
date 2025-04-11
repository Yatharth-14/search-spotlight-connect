
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
import { MovingBanner } from "@/components/MovingBanner";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { Search, LogOut, User, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleButtonClick = (path: string, action: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      toast({
        title: "Authentication Required",
        description: `You need to login to ${action}`,
        variant: "destructive",
      });
      navigate("/login");
    }
  };

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
              <Button 
                variant="outline" 
                size="sm" 
                className="dark:text-white dark:hover:bg-gray-700"
                onClick={() => handleButtonClick("/post-requirement", "post requirements")}
              >
                Post Requirements
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden lg:inline-flex dark:text-white dark:hover:bg-gray-700"
                onClick={() => handleButtonClick("/bid-now", "place bids")}
              >
                Bid Now
              </Button>
            </div>
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center dark:text-white"
                    >
                      <User className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 w-48">
                    <DropdownMenuItem onClick={() => navigate("/my-profile")}>
                      <User className="h-4 w-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-2">
                <div className="flex">
                  <Link to="/login">
                    <Button className="bg-primary rounded-r-none">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="dark:text-white rounded-l-none border-l-0">Register</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Moving Banner */}
      <MovingBanner />

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
