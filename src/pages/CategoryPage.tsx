
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockProducts, categories } from "@/data/mockData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, SlidersHorizontal } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Find the category by name
  useEffect(() => {
    if (categoryName) {
      // Normalize the category name (replace hyphens with spaces and capitalize properly)
      const normalizedName = categoryName
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
      
      const categoryObj = categories.find(
        (cat) => cat.name.toLowerCase() === normalizedName.toLowerCase()
      );
      
      if (categoryObj) {
        setCategory(categoryObj.name);
        
        // Filter products by category
        const filteredProducts = mockProducts.filter(
          (product) => product.category === categoryObj.name
        );
        
        setAllProducts(filteredProducts);
        setProducts(filteredProducts);
        
        // Reset filters when changing categories
        setSortBy("default");
        setPriceRange([0, 1000]);
      }
    }
  }, [categoryName]);

  // Apply sorting and filtering
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (no sorting)
        break;
    }
    
    setProducts(filtered);
  }, [sortBy, priceRange, allProducts]);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold dark:text-white">
          {category || "Category"} Products
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="ml-2">
            <Tabs value={view} onValueChange={(value) => setView(value as "grid" | "list")}>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Price Range</h3>
              <Slider 
                defaultValue={[0, 1000]} 
                max={1000} 
                step={10} 
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Availability</h3>
              <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <label htmlFor="all" className="text-sm dark:text-gray-300">All</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-stock" id="in-stock" />
                  <label htmlFor="in-stock" className="text-sm dark:text-gray-300">In Stock</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                  <label htmlFor="out-of-stock" className="text-sm dark:text-gray-300">Out of Stock</label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 dark:text-white">Rating</h3>
              <RadioGroup defaultValue="any">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any-rating" />
                  <label htmlFor="any-rating" className="text-sm dark:text-gray-300">Any Rating</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4stars" id="4stars" />
                  <label htmlFor="4stars" className="text-sm dark:text-gray-300">4★ & Above</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3stars" id="3stars" />
                  <label htmlFor="3stars" className="text-sm dark:text-gray-300">3★ & Above</label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex flex-col justify-end">
              <Button variant="outline" className="mb-2">Apply Filters</Button>
              <Button variant="ghost" onClick={() => {
                setPriceRange([0, 1000]);
                setSortBy("default");
              }}>Reset All</Button>
            </div>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold dark:text-white">No products found in this category</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try browsing other categories or adjusting your filters
          </p>
        </div>
      ) : (
        <Tabs value={view} className="w-full">
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {product.category}
                      </Badge>
                      <span className="font-semibold">{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/4 bg-gray-100 dark:bg-gray-800">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-48 md:h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 md:h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="md:w-3/4 p-6">
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">{product.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          {product.category}
                        </Badge>
                        <span className="font-semibold">{product.price}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CategoryPage;
