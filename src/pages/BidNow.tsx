
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define the bid interface
interface Bid {
  id: string;
  userId: string;
  itemName: string;
  category: string;
  description: string;
  startingPrice: string;
  bidIncrement: string;
  auctionEndDate: string;
  contactInfo: string;
  createdAt: string;
}

const BidNow = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [bidIncrement, setBidIncrement] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName || !category || !description || !startingPrice || !bidIncrement || !auctionEndDate || !contactInfo) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new bid object
    const newBid: Bid = {
      id: Date.now().toString(),
      userId: user?.email || "",
      itemName,
      category,
      description,
      startingPrice,
      bidIncrement,
      auctionEndDate,
      contactInfo,
      createdAt: new Date().toISOString(),
    };
    
    // Get existing bids from localStorage or initialize an empty array
    const existingBids = JSON.parse(localStorage.getItem("bids") || "[]");
    
    // Add the new bid
    existingBids.push(newBid);
    
    // Save back to localStorage
    localStorage.setItem("bids", JSON.stringify(existingBids));
    
    // Update moving banner data
    const bannerItems = JSON.parse(localStorage.getItem("bannerItems") || "[]");
    bannerItems.push(`🔥 New Auction: ${itemName} - Starting at ₹${startingPrice}!`);
    localStorage.setItem("bannerItems", JSON.stringify(bannerItems));
    
    // Show success message
    toast({
      title: "Bid Created",
      description: "Your auction has been created successfully!",
    });
    
    // Redirect to home page
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png" 
              alt="National Trade Fair" 
              className={`h-10 md:h-12 ${theme === 'dark' ? 'invert' : ''}`}
            />
          </div>
          
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Auction</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Name</label>
              <Input 
                placeholder="Enter item name" 
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="collectibles">Collectibles</SelectItem>
                  <SelectItem value="antiques">Antiques</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Describe your item in detail" 
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Starting Price (₹)</label>
                <Input 
                  type="text" 
                  placeholder="Enter starting price" 
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Bid Increment (₹)</label>
                <Input 
                  type="text" 
                  placeholder="Enter bid increment" 
                  value={bidIncrement}
                  onChange={(e) => setBidIncrement(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Auction End Date</label>
              <Input 
                type="date" 
                value={auctionEndDate}
                onChange={(e) => setAuctionEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Information</label>
              <Input 
                placeholder="Your email or phone number"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="mr-2"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit">Create Auction</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BidNow;
