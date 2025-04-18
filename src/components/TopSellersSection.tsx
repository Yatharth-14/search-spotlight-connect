import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { sellers, newSellers } from "@/data/mockData";
import { Link } from "react-router-dom";

export const TopSellersSection = () => {
  const displayedSellers = sellers.slice(0, 6);

  return (
    <section className="py-8 container mx-auto px-4 dark:bg-gray-900">
      {/* Top Sellers */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Top Sellers</h2>
        <Link
          to="/search"
          className="text-primary hover:underline text-sm font-medium"
        >
          View All Sellers
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {displayedSellers.map((seller) => (
          <Link to={`/seller/${seller.id}`} key={seller.id}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={seller.image} />
                    <AvatarFallback>
                      {seller.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="font-semibold text-lg mb-1 dark:text-white">
                    {seller.name}
                  </h3>
                  <Badge variant="secondary" className="mb-2 dark:bg-gray-700">
                    {seller.badge}
                  </Badge>

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
          </Link>
        ))}
      </div>

      {/* New Sellers */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">New Sellers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newSellers.map((seller) => (
          <Link to={`/seller/${seller.id}`} key={seller.id}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={seller.image} />
                    <AvatarFallback>
                      {seller.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="font-semibold text-lg mb-1 dark:text-white">
                    {seller.name}
                  </h3>
                  <Badge variant="secondary" className="mb-2 dark:bg-gray-700">
                    {seller.badge}
                  </Badge>

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
          </Link>
        ))}
      </div>
    </section>
  );
};
