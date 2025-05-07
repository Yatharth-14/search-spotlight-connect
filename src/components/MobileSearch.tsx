
import {
  handleSearch,
  handleSearchInputChange,
  handleSuggestionClick,
} from "@/handlerFunctions/indexPageHandlerFunctions";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// Define the Seller type (adjust based on src/data/mockData.ts)
interface Seller {
  id: number;
  name: string;
  image: string;
  badge: string;
}

// Define the props interface
interface MobileSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Seller[];
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: ReturnType<typeof import("react-router-dom").useNavigate>;
}

export const MobileSearch = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  navigate,
}: MobileSearchProps) => {
  return (
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
          className="w-full pl-10 mt-3 dark:bg-gray-700 dark:text-white"
          value={searchQuery}
          onChange={(e) => handleSearchInputChange(e, setSearchQuery)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 bg-white dark:bg-gray-800 w-full rounded-md shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
            <ul className="py-1">
              {suggestions.map((seller) => (
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
                    <p className="dark:text-white font-medium">{seller.name}</p>
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
  );
};
