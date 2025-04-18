// Mock data for the entire application

// MovingBanner Offers data
export const defaultOffers = [
  "🔥 Big Summer Sale — Up to 70% OFF!",
  "🚚 Free Shipping on Orders Above ₹499",
  "💳 Extra 10% Cashback on Credit Cards",
  "🎁 Buy 1 Get 1 Free — Limited Time Offer!",
  "🛍️ New Arrivals Just Dropped!",
  "🏷️ Festive Combo Deals Available Now",
];

// Hero carousel Card data
export const cards = [
  {
    title: "50% OFF",
    description: "On all items above ₹999",
    price: "Use Code: HALFOFF",
    bg: "bg-gradient-to-r from-purple-600 to-pink-500",
  },
  {
    title: "FREE SHIPPING",
    description: "For orders above ₹499",
    price: "Limited time only",
    bg: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    title: "BUY 1 GET 1",
    description: "On select items",
    price: "BOGO SALE",
    bg: "bg-gradient-to-r from-yellow-400 to-red-500",
  },
  {
    title: "EXTRA 20% OFF",
    description: "Using HDFC Cards",
    price: "Bank Offer",
    bg: "bg-gradient-to-r from-blue-600 to-indigo-500",
  },
  {
    title: "NEW ARRIVALS",
    description: "Trendy fashion wear",
    price: "Starting at ₹299",
    bg: "bg-gradient-to-r from-pink-500 to-orange-400",
  },
];

// Carousel Images
export const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Technology Solutions",
    description: "Discover the latest tech innovations for your business",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Connect with Suppliers",
    description: "Build relationships with global suppliers",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Business Opportunities",
    description: "Explore new markets and business opportunities",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "National Trade Fair",
    description: "Where businesses connect and grow",
  },
];

// Categories
export const categories = [
  { id: 1, name: "IT Hardware", color: "bg-blue-500" },
  { id: 2, name: "Electrical Components", color: "bg-red-500" },
  { id: 3, name: "Consumer Electronics", color: "bg-green-500" },
  { id: 4, name: "Industrial Machinery", color: "bg-yellow-500" },
  { id: 5, name: "Office Equipment", color: "bg-purple-500" },
  { id: 6, name: "Smart Devices", color: "bg-orange-500" },
  { id: 7, name: "Networking Equipment", color: "bg-pink-500" },
  { id: 8, name: "Software Solutions", color: "bg-teal-500" },
];

// New sellers
export const newSellers = [
  {
    id: "n1",
    name: "Riya Mehta",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    badge: "Newcomer",
    products: 10,
    rating: 4.2,
  },
  {
    id: "n2",
    name: "Aryan Shah",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    badge: "Rising Star",
    products: 8,
    rating: 4.0,
  },
  {
    id: "n3",
    name: "Sneha Verma",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    badge: "New Arrival",
    products: 12,
    rating: 4.3,
  },
];

// Top Sellers
export const sellers = [
  {
    id: 1,
    name: "TechPro Solutions",
    badge: "Top Vendor",
    products: 145,
    rating: 4.9,
    image: "https://i.pravatar.cc/150?u=1",
    description:
      "Leading provider of enterprise tech solutions with over 10 years of experience in the industry.",
    address: "123 Tech Park, Silicon Valley",
    contact: "+1 (555) 123-4567",
    email: "info@techprosolutions.com",
  },
  {
    id: 2,
    name: "ElectraTech",
    badge: "Premium",
    products: 98,
    rating: 4.7,
    image: "https://i.pravatar.cc/150?u=2",
    description:
      "Specializing in electrical components and innovative power solutions for industrial applications.",
    address: "456 Circuit Avenue, Boston",
    contact: "+1 (555) 234-5678",
    email: "sales@electratech.com",
  },
  {
    id: 3,
    name: "Global Gear",
    badge: "Popular",
    products: 120,
    rating: 4.8,
    image: "https://i.pravatar.cc/150?u=3",
    description:
      "International supplier of mechanical equipment and precision engineering tools.",
    address: "789 Industrial Lane, Chicago",
    contact: "+1 (555) 345-6789",
    email: "support@globalgear.com",
  },
  {
    id: 4,
    name: "FutureTech",
    badge: "Trusted",
    products: 210,
    rating: 4.8,
    image: "https://i.pravatar.cc/150?u=4",
    description:
      "Cutting-edge technological innovations for businesses looking to stay ahead of the curve.",
    address: "101 Innovation Road, Austin",
    contact: "+1 (555) 456-7890",
    email: "hello@futuretech.io",
  },
  {
    id: 5,
    name: "SmartSystems",
    badge: "Verified",
    products: 87,
    rating: 4.6,
    image: "https://i.pravatar.cc/150?u=5",
    description:
      "Intelligent automation systems and IoT solutions for modern businesses.",
    address: "202 Smart Street, Seattle",
    contact: "+1 (555) 567-8901",
    email: "info@smartsystems.com",
  },
  {
    id: 6,
    name: "EcoTech Solutions",
    badge: "Eco-Friendly",
    products: 76,
    rating: 4.5,
    image: "https://i.pravatar.cc/150?u=6",
    description:
      "Sustainable technology solutions with a focus on reducing environmental impact.",
    address: "303 Green Boulevard, Portland",
    contact: "+1 (555) 678-9012",
    email: "green@ecotechsolutions.org",
  },
  {
    id: 7,
    name: "Industrial Innovators",
    badge: "Expert",
    products: 132,
    rating: 4.7,
    image: "https://i.pravatar.cc/150?u=7",
    description:
      "Revolutionizing industrial processes with innovative machinery and equipment.",
    address: "404 Factory Lane, Detroit",
    contact: "+1 (555) 789-0123",
    email: "sales@industrialinnovators.com",
  },
  {
    id: 8,
    name: "Tech Titans",
    badge: "Platinum",
    products: 185,
    rating: 4.9,
    image: "https://i.pravatar.cc/150?u=8",
    description:
      "Premium technology provider for enterprise-level solutions and services.",
    address: "505 Titan Tower, New York",
    contact: "+1 (555) 890-1234",
    email: "enterprise@techtitans.com",
  },
  {
    id: 9,
    name: "Quantum Computing",
    badge: "Advanced",
    products: 64,
    rating: 4.8,
    image: "https://i.pravatar.cc/150?u=9",
    description:
      "Specializing in next-generation quantum computing solutions for research and industry.",
    address: "606 Quantum Court, San Francisco",
    contact: "+1 (555) 901-2345",
    email: "quantum@quantumcomputing.tech",
  },
  {
    id: 10,
    name: "Digital Dynamics",
    badge: "Innovative",
    products: 109,
    rating: 4.6,
    image: "https://i.pravatar.cc/150?u=10",
    description:
      "Creating dynamic digital solutions for businesses in the modern marketplace.",
    address: "707 Digital Drive, Los Angeles",
    contact: "+1 (555) 012-3456",
    email: "info@digitaldynamics.co",
  },
  {
    id: 11,
    name: "Cyber Security Solutions",
    badge: "Security Expert",
    products: 93,
    rating: 4.9,
    image: "https://i.pravatar.cc/150?u=11",
    description:
      "Providing state-of-the-art cyber security services and products for businesses of all sizes.",
    address: "808 Security Boulevard, Washington DC",
    contact: "+1 (555) 123-7890",
    email: "secure@cybersecuritysolutions.com",
  },
  {
    id: 12,
    name: "Cloud Innovate",
    badge: "Cloud Expert",
    products: 147,
    rating: 4.7,
    image: "https://i.pravatar.cc/150?u=12",
    description:
      "Specializing in cloud infrastructure and solutions for modern businesses.",
    address: "909 Cloud Avenue, Seattle",
    contact: "+1 (555) 234-8901",
    email: "info@cloudinnovate.io",
  },
  {
    id: 13,
    name: "AI Systems",
    badge: "AI Pioneer",
    products: 78,
    rating: 4.8,
    image: "https://i.pravatar.cc/150?u=13",
    description:
      "Developing cutting-edge artificial intelligence systems for various industries.",
    address: "110 Intelligence Street, Palo Alto",
    contact: "+1 (555) 345-9012",
    email: "hello@aisystems.com",
  },
  {
    id: 14,
    name: "Mobile Tech Pro",
    badge: "Mobile Expert",
    products: 112,
    rating: 4.6,
    image: "https://i.pravatar.cc/150?u=14",
    description:
      "Creating innovative mobile technology solutions for businesses worldwide.",
    address: "211 Mobile Lane, Austin",
    contact: "+1 (555) 456-0123",
    email: "support@mobiletechpro.com",
  },
  {
    id: 15,
    name: "Data Analytics Group",
    badge: "Data Expert",
    products: 91,
    rating: 4.7,
    image: "https://i.pravatar.cc/150?u=15",
    description:
      "Providing comprehensive data analysis and business intelligence solutions.",
    address: "312 Data Drive, Boston",
    contact: "+1 (555) 567-1234",
    email: "info@dataanalyticsgroup.com",
  },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "John Stevenson",
    role: "Procurement Director",
    content:
      "The National Trade Fair has transformed our supply chain. We've found reliable partners and cutting-edge technologies that have improved our operations dramatically.",
    image: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CEO, TechVision Inc.",
    content:
      "As a technology provider, the fair has been instrumental in connecting us with businesses across industries. The quality of leads generated is exceptional!",
    image: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Supply Chain Manager",
    content:
      "Finding specialized equipment was always challenging until we discovered the National Trade Fair. The variety of vendors and products is impressive.",
    image: "https://i.pravatar.cc/150?u=7",
  },
];

// Featured Products
export const featuredProducts = [
  {
    id: 1,
    title: "Enterprise Server Solution",
    description: "High-performance server for business applications",
    category: "IT Hardware",
  },
  {
    id: 2,
    title: "Industrial Control System",
    description: "Advanced control systems for manufacturing",
    category: "Electrical Components",
  },
  {
    id: 3,
    title: "Smart Office Suite",
    description: "Connected devices for the modern workplace",
    category: "Office Equipment",
  },
];
