import { sellers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const handleButtonClick = (
  path: string,
  action: string,
  isAuthenticated: boolean,
  navigate: ReturnType<typeof useNavigate>,
  toast: ReturnType<typeof useToast>["toast"]
) => {
  if (isAuthenticated) {
    setTimeout(() => {
      navigate(path);
    }, 500);
  } else {
    toast({
      title: "Authentication Required",
      description: `You need to login to ${action}`,
      variant: "destructive",
    });
    navigate("/login");
  }
};

export const handleSearch = (
  e: React.FormEvent,
  searchQuery: string,
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) => {
  e.preventDefault();
  setShowSuggestions(false);
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  }
};

export const handleSuggestionClick = (
  sellerId: number,
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) => {
  setShowSuggestions(false);
  navigate(`/seller/${sellerId}`);
};

export const handleSearchInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
  setSearchQuery(e.target.value);
};
