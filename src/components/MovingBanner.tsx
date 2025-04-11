import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const dummyOffers = [
  "🔥 Big Summer Sale — Up to 70% OFF!",
  "🚚 Free Shipping on Orders Above ₹499",
  "💳 Extra 10% Cashback on Credit Cards",
  "🎁 Buy 1 Get 1 Free — Limited Time Offer!",
  "🛍️ New Arrivals Just Dropped!",
  "🏷️ Festive Combo Deals Available Now",
];

export const MovingBanner = () => {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Start auto animation when component mounts
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    controls.start({
      x: "-100%",
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 20,
      },
    });
  };

  const stopAnimation = () => {
    controls.stop();
  };

  return (
    <div
      className="w-full overflow-hidden bg-black text-white py-2 cursor-pointer"
      onMouseEnter={() => {
        setIsPaused(true);
        stopAnimation();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        startAnimation();
      }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-10 text-sm font-semibold"
        animate={controls}
        initial={{ x: "100%" }}
      >
        {dummyOffers.map((offer, idx) => (
          <span key={idx} className="px-4 uppercase tracking-wider">
            {offer}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
