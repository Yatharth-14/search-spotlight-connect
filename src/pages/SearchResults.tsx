
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { sellers } from "@/data/mockData";
import { Footer } from "@/components/Footer";
import { MovingBanner } from "@/components/MovingBanner";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState(sellers);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save search query to localStorage
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== "") {
      const updatedSearches = [initialQuery, ...recentSearches.filter(s => s !== initialQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  }, [initialQuery]);

  // Filter results based on search query
  useEffect(() => {
    if (initialQuery) {
      const filtered = sellers.filter(
        seller => 
          seller.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
          seller.badge.toLowerCase().includes(initialQuery.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : sellers);
    } else {
      setResults(sellers);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Header from main page */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png" 
              alt="National Trade Fair" 
              className="h-10 md:h-12 dark:invert"
            />
          </Link>
        </div>
      </header>

      {/* Moving Banner */}
      <MovingBanner />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Search Results</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-3xl mx-auto">
            <Input 
              type="text" 
              placeholder="Search sellers, products..." 
              className="pl-10 pr-4 py-2 w-full dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button 
              type="submit" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              Search
            </Button>
          </div>
        </form>
        
        {recentSearches.length > 0 && (
          <div className="mb-8 max-w-3xl mx-auto">
            <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent Searches:</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleRecentSearchClick(query)}
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((seller) => (
            <Link to={`/seller/${seller.id}`} key={seller.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={seller.image} />
                      <AvatarFallback>{seller.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-semibold text-lg mb-1 dark:text-white text-center">{seller.name}</h3>
                    <Badge variant="secondary" className="mb-2 dark:bg-gray-700">{seller.badge}</Badge>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                      <p>{seller.products} Products</p>
                      <div className="flex items-center justify-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{seller.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SearchResults;
