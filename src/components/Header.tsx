
import { useTheme } from "next-themes";
import { Logo } from "./Header/Logo";
import DesktopSearch from "./Header/DesktopSearch";
import MobileMenu from "./Header/MobileMenu";
import AuthButtons from "./Header/AuthButtons";
import { MobileSearch } from "./MobileSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

// Define the Seller type
interface Seller {
  id: number;
  name: string;
  image: string;
  badge: string;
}

// Define the props interface
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Seller[];
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="hidden md:block flex-1 max-w-lg mx-2">
          <DesktopSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </div>
        <div className="block md:hidden w-full mx-2">
          <MobileSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            navigate={useNavigate()}
          />
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <AuthButtons />
          <MobileMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
