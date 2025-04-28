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

// Define the User type
interface User {
  name: string;
}

// Define the props interface
interface HeaderProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Seller[];
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  isAuthenticated,
  user,
  logout,
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <DesktopSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
        <div className="flex items-center space-x-2">
          <AuthButtons
            isAuthenticated={isAuthenticated}
            user={user}
            logout={logout}
          />
          <MobileMenu
            isAuthenticated={isAuthenticated}
            user={user}
            logout={logout}
          />
          <ThemeToggle />
        </div>
      </div>
      <MobileSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        navigate={useNavigate()}
      />
    </header>
  );
};

export default Header;
