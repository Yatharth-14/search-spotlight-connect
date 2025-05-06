
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockProducts, categories } from "@/data/mockData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Find the category by ID
  useEffect(() => {
    if (categoryId) {
      const categoryObj = categories.find((cat) => cat.id.toString() === categoryId);
      if (categoryObj) {
        setCategory(categoryObj.name);
        
        // Filter products by category
        const filteredProducts = mockProducts.filter(
          (product) => product.category === categoryObj.name
        );
        setProducts(filteredProducts);
      }
    }
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">
          {category || "Category"} Products
        </h1>
        <div>
          <Tabs value={view} onValueChange={(value) => setView(value as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold dark:text-white">No products found in this category</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try browsing other categories or check back later
          </p>
        </div>
      ) : (
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      )}
    </div>
  );
};

export default CategoryPage;
