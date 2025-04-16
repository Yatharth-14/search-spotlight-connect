import { useState, useEffect } from "react";
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
import { sellers } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MotionConfig } from "framer-motion";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof sellers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update suggestions as user types - modified to show suggestions immediately
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = sellers.filter((seller) =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true); // Always show suggestions when there's input
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleButtonClick = (path: string, action: string) => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate(path);
      }, 500); //500ms delay
    } else {
      toast({
        title: "Authentication Required",
        description: `You need to login to ${action}`,
        variant: "destructive",
      });
      navigate("/login");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (sellerId: number) => {
    setShowSuggestions(false);
    navigate(`/seller/${sellerId}`);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Suggestions will be shown/hidden by the useEffect
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
                className={`h-10 md:h-12 ${theme === "dark" ? "invert" : ""}`}
              />
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <Input
              type="text"
              placeholder="Search products, suppliers..."
              className="w-full pl-10 dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={handleSearchInputChange}
              // Remove onFocus and onBlur handlers to keep showing suggestions while typing
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 h-8"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Suggestions Dropdown - modified to always show when there's input */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-10 rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {suggestions.map((seller) => (
                    <li
                      key={seller.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(seller.id)}
                    >
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={seller.image} />
                        <AvatarFallback>
                          {seller.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="dark:text-white font-medium">
                          {seller.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs dark:bg-gray-700"
                        >
                          {seller.badge}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="dark:text-white dark:hover:bg-gray-700"
                onClick={() =>
                  handleButtonClick("/post-requirement", "post requirements")
                }
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
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-gray-800 w-48"
                  >
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
                    <Button
                      variant="outline"
                      className="dark:text-white rounded-l-none border-l-0"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search - also update mobile search */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products, suppliers..."
              className="w-full pl-10 dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={handleSearchInputChange}
              // Remove onFocus and onBlur handlers to keep showing suggestions while typing
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 h-8"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Suggestions Dropdown for Mobile - modified to always show when there's input */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-1 rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {suggestions.map((seller) => (
                    <li
                      key={seller.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(seller.id)}
                    >
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={seller.image} />
                        <AvatarFallback>
                          {seller.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="dark:text-white font-medium">
                          {seller.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs dark:bg-gray-700"
                        >
                          {seller.badge}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
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
