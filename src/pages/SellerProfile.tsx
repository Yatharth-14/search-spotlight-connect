import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Tag,
  Package,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import { sellers } from "@/data/mockData";
import { Footer } from "@/components/Footer";
import { MovingBanner } from "@/components/MovingBanner";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { mockProductSellersProfile } from "@/data/mockData";

// Extend seller type with additional profile information
interface SellerProfile {
  id: number;
  name: string;
  badge: string;
  products: number;
  rating: number;
  image: string;
  description?: string;
  established?: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  specialization?: string[];
  certifications?: string[];
  followers?: number;
  verified?: boolean;
}



const SellerProfile = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Get seller from mock data and extend with profile details
    const findSeller = sellers.find((s) => s.id === Number(sellerId));

    if (findSeller) {
      // Extend with additional profile details (normally would come from API)
      const extendedSeller: SellerProfile = {
        ...findSeller,
        description:
          "Leading provider of high-quality technology solutions for businesses of all sizes. Specializing in enterprise hardware, networking equipment, and IT infrastructure.",
        established: "2010",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        email: `contact@${findSeller.name
          .toLowerCase()
          .replace(/\s+/g, "")}.com`,
        website: `https://www.${findSeller.name
          .toLowerCase()
          .replace(/\s+/g, "")}.com`,
        specialization: [
          "Enterprise Hardware",
          "Networking Equipment",
          "IT Infrastructure",
          "Cloud Solutions",
        ],
        certifications: ["ISO 9001", "ISO 27001", "Cisco Gold Partner"],
        followers: 1240 + Math.floor(Math.random() * 500),
        verified: true,
      };

      setSeller(extendedSeller);
    }

    // Check if user follows this seller (from localStorage)
    const followedSellers = JSON.parse(
      localStorage.getItem("followedSellers") || "[]"
    );
    setIsFollowing(followedSellers.includes(Number(sellerId)));
  }, [sellerId]);

  const handleFollow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to login to follow sellers",
        variant: "destructive",
      });
      return;
    }

    // Toggle follow status
    setIsFollowing((prev) => !prev);

    // Update localStorage
    const followedSellers = JSON.parse(
      localStorage.getItem("followedSellers") || "[]"
    );
    let updatedFollowers;

    if (isFollowing) {
      updatedFollowers = followedSellers.filter(
        (id: number) => id !== Number(sellerId)
      );
      toast({
        title: "Unfollowed",
        description: `You have unfollowed ${seller?.name}`,
      });
    } else {
      updatedFollowers = [...followedSellers, Number(sellerId)];
      toast({
        title: "Following",
        description: `You are now following ${seller?.name}`,
      });
    }

    localStorage.setItem("followedSellers", JSON.stringify(updatedFollowers));
  };

  const handleContact = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to login to contact sellers",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Your inquiry has been sent to ${seller?.name}`,
    });
  };

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">Seller not found</h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
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

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700 shadow-md">
              <AvatarImage src={seller.image} />
              <AvatarFallback className="text-3xl">
                {seller.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white flex justify-center items-center gap-2">
                  {seller.name}
                  {seller.verified && (
                    <CheckCircle2 className="h-6 w-6 mt-1 text-blue-500" />
                  )}
                </h1>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                <Badge className="bg-primary">{seller.badge}</Badge>
                {seller.specialization?.map((spec, index) => (
                  <Badge key={index} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
                {seller.description}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                {seller.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{seller.location}</span>
                  </div>
                )}
                {seller.established && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Est. {seller.established}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  <span>{seller.products} Products</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>{seller.rating}/5.0</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{seller.followers} Followers</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button
                  onClick={handleFollow}
                  variant={isFollowing ? "secondary" : "default"}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" onClick={handleContact}>
                  Contact
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${seller.email}`}>Email</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProductSellersProfile.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold dark:text-white">
                      {product.name}
                    </h3>
                    <div className="flex justify-between mt-2">
                      <Badge variant="outline">{product.category}</Badge>
                      <span className="font-semibold dark:text-white">
                        {product.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">View All Products</Button>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {seller.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="dark:text-gray-300">
                  {seller.description} Our company was established in{" "}
                  {seller.established} with a mission to provide top-tier
                  technology solutions to businesses worldwide. With years of
                  experience in the industry, we've built a reputation for
                  reliability and excellence.
                </p>

                <div>
                  <h3 className="font-semibold dark:text-white mb-2">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {seller.specialization?.map((spec, index) => (
                      <Badge key={index} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seller.certifications?.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 border rounded-md dark:border-gray-700"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                      <div>
                        <h3 className="font-semibold dark:text-white">
                          {cert}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Verified Certification
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seller.email && (
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold dark:text-white">Email</h3>
                        <a
                          href={`mailto:${seller.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {seller.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {seller.phone && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold dark:text-white">Phone</h3>
                        <a
                          href={`tel:${seller.phone}`}
                          className="text-blue-500 hover:underline"
                        >
                          {seller.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {seller.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-3 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold dark:text-white">
                          Website
                        </h3>
                        <a
                          href={seller.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {seller.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {seller.location && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold dark:text-white">
                          Location
                        </h3>
                        <p className="dark:text-gray-300">{seller.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between mb-8">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <div className="text-4xl font-bold dark:text-white">
                      {seller.rating} <span className="text-2xl">/5.0</span>
                    </div>
                    <div className="flex text-yellow-500 text-2xl my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(seller.rating) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Based on 48 reviews
                    </p>
                  </div>

                  <Button
                    disabled={!isAuthenticated}
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast({
                          title: "Authentication Required",
                          description: "You need to login to write a review",
                          variant: "destructive",
                        });
                        return;
                      }

                      toast({
                        title: "Feature Coming Soon",
                        description:
                          "The review feature will be available soon!",
                      });
                    }}
                  >
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Review content will appear here soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SellerProfile;
