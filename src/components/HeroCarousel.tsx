
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

interface CarouselCard {
  carouselId: number;
  title: string;
  imgURL: string;
  desc: string;
  couponCode: string;
}

export const HeroCarousel = () => {
  const [cards, setCards] = useState<CarouselCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5161/api/carouselcard");
        console.log("Response data:", response.data);
        setCards(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        setError("Failed to load carousel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="animate-pulse text-lg">Loading carousel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        <div className="text-lg">No carousel data available at the moment.</div>
      </div>
    );
  }

  return (
    <div className="w-full py-2 px-2 sm:px-4 lg:px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* First card is always featured if it exists */}
        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ backgroundImage: `url(${cards[0].imgURL})` }}
            className="lg:col-span-2 lg:row-span-2 rounded-none h-[368px] p-8 shadow-xl text-white flex flex-col justify-between bg-cover bg-center relative"
          >
            <div className="z-10">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">{cards[0].title}</h1>
              <p className="text-base sm:text-xl">{cards[0].desc}</p>
            </div>
            <div className="mt-6 z-10">
              <p className="text-yellow-300 text-sm sm:text-lg">{cards[0].couponCode}</p>
              <Button className="mt-4 bg-white text-black hover:bg-black hover:text-white">
                CLICK HERE
              </Button>
            </div>
            {/* Add overlay to improve text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </motion.div>
        )}

        {/* Render remaining cards in 2 columns if they exist */}
        {cards.length > 1 && (
          <div className="flex flex-col gap-2 lg:col-span-1">
            {cards.slice(1, 3).map((offer, idx) => (
              <motion.div
                key={offer.carouselId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                style={{ backgroundImage: `url(${offer.imgURL})` }}
                className="rounded-lg p-4 sm:p-6 shadow-md text-center bg-cover bg-center relative rounded-none"
              >
                <div className="relative z-10">
                  <h2 className="text-green-200 text-xs sm:text-sm font-bold uppercase mb-1">
                    {offer.title}
                  </h2>
                  <p className="text-white font-semibold text-sm sm:text-base">{offer.desc}</p>
                  <p className="text-yellow-300 text-xs sm:text-sm my-2">{offer.couponCode}</p>
                  <Button className="mt-2 bg-black text-white hover:bg-white hover:text-black text-xs sm:text-sm">
                    CLICK HERE
                  </Button>
                </div>
                {/* Add overlay to improve text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Render cards 4 and 5 if they exist */}
        {cards.length > 3 && (
          <div className="flex flex-col gap-2 lg:col-span-1">
            {cards.slice(3, 5).map((offer, idx) => (
              <motion.div
                key={offer.carouselId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (idx + 2) }}
                style={{ backgroundImage: `url(${offer.imgURL})` }}
                className="rounded-lg p-4 sm:p-6 shadow-md text-center bg-cover bg-center relative rounded-none"
              >
                <div className="relative z-10">
                  <h2 className="text-green-200 text-xs sm:text-sm font-bold uppercase mb-1">
                    {offer.title}
                  </h2>
                  <p className="text-white font-semibold text-sm sm:text-base">{offer.desc}</p>
                  <p className="text-yellow-300 text-xs sm:text-sm my-2">{offer.couponCode}</p>
                  <Button className="mt-2 bg-black text-white hover:bg-white hover:text-black text-xs sm:text-sm">
                    CLICK HERE
                  </Button>
                </div>
                {/* Add overlay to improve text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
