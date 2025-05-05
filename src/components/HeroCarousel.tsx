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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:5161/api/carouselcard");
        console.log("Response data:", response.data);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchCards();
  }, []);

  if (cards.length === 0) {
    return <div>Loading...</div>;
  }

  console.log("Cards:",cards);

  return (
    <div className="w-full py-2 px-2 sm:px-4 lg:px-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Card 1: Big Featured Card (takes 2 cols and 2 rows) */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ backgroundImage: `url(${cards[0].imgURL})` }}
          className="lg:col-span-2 lg:row-span-2 rounded-none h-[368px] p-8 shadow-xl text-white flex flex-col justify-between bg-cover bg-center relative"
        >
          <>{(console.log("Card 1 imgURL:", cards[0].imgURL), null)}</>
          
          <div>
            <h1 className="text-4xl font-bold mb-2">{cards[0].title}</h1>
            <p className="text-xl">{cards[0].desc}</p>
          </div>
          <div className="mt-6">
            <p className="text-yellow-300 text-lg">{cards[0].couponCode}</p>
            <Button className="mt-4 bg-white text-black hover:bg-black hover:text-white">
              CLICK HERE
            </Button>
          </div>
        </motion.div>

        {/* Column: Card 2 and 3 */}
        <div className="flex flex-col gap-2 lg:col-span-1">
          {[cards[1], cards[2]].map((offer, idx) => (
            <motion.div
              key={offer.carouselId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              style={{ backgroundImage: `url(${offer.imgURL})` }}
              className="rounded-lg p-6 shadow-md text-center bg-cover bg-center relative rounded-none"
            >
              <h2 className="text-green-200 text-sm font-bold uppercase mb-1">
                {offer.title}
              </h2>
              <p className="text-white font-semibold text-base">{offer.desc}</p>
              <p className="text-yellow-300 text-sm my-2">{offer.couponCode}</p>
              <Button className="mt-2 bg-black text-white hover:bg-white hover:text-black">
                CLICK HERE
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Column: Card 4 and 5 */}
        <div className="flex flex-col gap-2 lg:col-span-1">
          {[cards[3], cards[4]].map((offer, idx) => (
            <motion.div
              key={offer.carouselId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 2) }}
              style={{ backgroundImage: `url(${offer.imgURL})` }}
              className="rounded-lg p-6 shadow-md text-center bg-cover bg-center relative rounded-none"
            >
              <h2 className="text-green-200 text-sm font-bold uppercase mb-1">
                {offer.title}
              </h2>
              <p className="text-white font-semibold text-base">{offer.desc}</p>
              <p className="text-yellow-300 text-sm my-2">{offer.couponCode}</p>
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