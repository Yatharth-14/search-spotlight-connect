import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { sellers } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { handleButtonClick, handleSearch, handleSuggestionClick, handleSearchInputChange } from "@/handlerFunctions/indexPageHandlerFunctions";

const Header = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  isAuthenticated,
  user,
  logout,
}: any) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png"
            alt="National Trade Fair"
            className={`h-10 md:h-12 ${theme === "dark" ? "invert" : ""}`}
          />
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={(e) =>
            handleSearch(e, searchQuery, setShowSuggestions, navigate)
          }
          className="hidden md:flex flex-1 max-w-md mx-4 relative"
        >
          <Input
            type="text"
            placeholder="Search products, suppliers..."
            className="w-full pl-10 dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e, setSearchQuery)}
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

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-10 rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
              <ul className="py-1">
                {suggestions.map((seller: any) => (
                  <li
                    key={seller.id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    onClick={() =>
                      handleSuggestionClick(
                        seller.id,
                        setShowSuggestions,
                        navigate
                      )
                    }
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

        {/* Right Buttons */}
        <div className="flex items-center space-x-2">
          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="dark:text-white dark:hover:bg-gray-700"
              onClick={() =>
                handleButtonClick(
                  "/post-requirement",
                  "post requirements",
                  isAuthenticated,
                  navigate,
                  toast
                )
              }
            >
              Post Requirements
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="lg:inline-flex dark:text-white dark:hover:bg-gray-700"
              onClick={() =>
                handleButtonClick(
                  "/bid-now",
                  "place bids",
                  isAuthenticated,
                  navigate,
                  toast
                )
              }
            >
              Bid Now
            </Button>
          </div>

          {/* Dropdown for Mobile and Small Screens */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center dark:text-white"
                >
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 w-48"
              >
                <DropdownMenuItem
                  onClick={() =>
                    handleButtonClick(
                      "/post-requirement",
                      "post requirements",
                      isAuthenticated,
                      navigate,
                      toast
                    )
                  }
                >
                  Post Requirements
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleButtonClick(
                      "/bid-now",
                      "place bids",
                      isAuthenticated,
                      navigate,
                      toast
                    )
                  }
                >
                  Bid Now
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />

          {isAuthenticated ? (
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
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
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
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3 relative">
        <form
          onSubmit={(e) =>
            handleSearch(e, searchQuery, setShowSuggestions, navigate)
          }
          className="relative"
        >
          <Input
            type="text"
            placeholder="Search products, suppliers..."
            className="w-full pl-10 dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e, setSearchQuery)}
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

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 bg-white dark:bg-gray-800 w-full mt-10 rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
              <ul className="py-1">
                {suggestions.map((seller: any) => (
                  <li
                    key={seller.id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    onClick={() =>
                      handleSuggestionClick(
                        seller.id,
                        setShowSuggestions,
                        navigate
                      )
                    }
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
  );
};

export default Header;