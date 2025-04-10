import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const cards = [
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

export const HeroCarousel = () => {
  return (
    <div className="w-full py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Big Featured Card (takes 2 cols and 2 rows) */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`lg:col-span-2 lg:row-span-2 rounded-xl h-[387px] p-8 shadow-xl text-white flex flex-col justify-between ${cards[0].bg}`}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">{cards[0].title}</h1>
            <p className="text-xl">{cards[0].description}</p>
          </div>
          <div className="mt-6">
            <p className="text-yellow-300 text-lg">{cards[0].price}</p>
            <Button className="mt-4 bg-white text-black hover:bg-black hover:text-white">
              CLICK HERE
            </Button>
          </div>
        </motion.div>

        {/* Column: Card 2 and 3 */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {[cards[1], cards[2]].map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className={`rounded-lg p-6 shadow-md text-center ${offer.bg}`}
            >
              <h2 className="text-green-200 text-sm font-bold uppercase mb-1">
                {offer.title}
              </h2>
              <p className="text-white font-semibold text-base">
                {offer.description}
              </p>
              <p className="text-yellow-300 text-sm my-2">{offer.price}</p>
              <Button className="mt-2 bg-black text-white hover:bg-white hover:text-black">
                CLICK HERE
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Column: Card 4 and 5 */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {[cards[3], cards[4]].map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 2) }}
              className={`rounded-lg p-6 shadow-md text-center ${offer.bg}`}
            >
              <h2 className="text-green-200 text-sm font-bold uppercase mb-1">
                {offer.title}
              </h2>
              <p className="text-white font-semibold text-base">
                {offer.description}
              </p>
              <p className="text-yellow-300 text-sm my-2">{offer.price}</p>
              <Button className="mt-2 bg-black text-white hover:bg-white hover:text-black">
                CLICK HERE
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
