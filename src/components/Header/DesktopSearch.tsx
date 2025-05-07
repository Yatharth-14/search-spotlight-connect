
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  handleSearch,
  handleSearchInputChange,
  handleSuggestionClick,
} from "@/handlerFunctions/indexPageHandlerFunctions";

// Define the Seller type
interface Seller {
  id: number;
  name: string;
  image: string;
  badge: string;
}

interface DesktopSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Seller[];
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopSearch = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: DesktopSearchProps) => {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => handleSearch(e, searchQuery, setShowSuggestions, navigate)}
      className="relative w-full"
    >
      <Input
        type="text"
        placeholder="Search products, suppliers..."
        className="w-full pl-10 dark:bg-gray-700 dark:text-white"
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
                  handleSuggestionClick(seller.id, setShowSuggestions, navigate)
                }
              >
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={seller.image} />
                  <AvatarFallback>{seller.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="dark:text-white font-medium">{seller.name}</p>
                  <Badge variant="secondary" className="text-xs dark:bg-gray-700">
                    {seller.badge}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default DesktopSearch;
