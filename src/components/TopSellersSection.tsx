
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { sellers } from "@/data/mockData";

export const TopSellersSection = () => {
  return (
    <section className="py-8 container mx-auto px-4 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Top Sellers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellers.map((seller) => (
          <Card key={seller.id} className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={seller.image} />
                  <AvatarFallback>{seller.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-lg mb-1 dark:text-white">{seller.name}</h3>
                <Badge variant="secondary" className="mb-2 dark:bg-gray-700">{seller.badge}</Badge>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <p>{seller.products} Products</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{seller.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
