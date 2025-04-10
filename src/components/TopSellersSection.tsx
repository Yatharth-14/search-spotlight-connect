
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const sellers = [
  { id: 1, name: "Seller One", badge: "Top Seller", products: 120, rating: 4.8 },
  { id: 2, name: "Seller Two", badge: "New Seller", products: 45, rating: 4.5 },
  { id: 3, name: "Seller Three", badge: "Popular", products: 89, rating: 4.7 },
  { id: 4, name: "Seller Four", badge: "Trusted", products: 200, rating: 4.9 },
];

export const TopSellersSection = () => {
  return (
    <section className="py-8 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Top Sellers Show</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sellers.map((seller) => (
          <Card key={seller.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${seller.id}`} />
                  <AvatarFallback>{seller.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-lg mb-1">{seller.name}</h3>
                <Badge variant="secondary" className="mb-2">{seller.badge}</Badge>
                
                <div className="text-sm text-gray-500 mt-2">
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
