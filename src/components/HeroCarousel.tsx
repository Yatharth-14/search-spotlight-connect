import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

interface CarouselCard {
  _id: string; // Unique ID from API for each card
  title: string; // Card title
  imgURL: string; // Background image URL
  desc: string; // Card description
  couponCode: string; // Coupon code text
}

export const HeroCarousel = () => {
  const [cards, setCards] = useState<CarouselCard[]>([]); // State for storing fetched cards
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [error, setError] = useState<string | null>(null); // Error state for API issues

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:5000/api/carouselCardImages"); // Fetch cards from API
        console.log("Response data Hero Carousel:", response.data); // Log API response for debugging
        setCards(response.data || []); // Set cards or empty array
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching carousel data:", error); // Log error
        setError("Failed to load carousel data. Please try again later."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCards(); // Run fetch on component mount
  }, []); // Empty dependency array for one-time fetch

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center items-center"> {/* Full-width container for loading state */}
        <div className="animate-pulse text-lg">Loading carousel...</div> {/* Loading message with pulse animation */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 flex justify-center items-center"> {/* Full-width container for error state */}
        <div className="text-red-500">{error}</div> {/* Display error message in red */}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="w-full py-12 flex justify-center items-center"> {/* Full-width container for empty state */}
        <div className="text-lg">No carousel data available at the moment.</div> {/* Message for no cards */}
      </div>
    );
  }

  return (
    <div className="w-full py-2 px-2 sm:px-4 lg:px-2"> {/* Full-width container with responsive padding: 2px mobile, 4px tablet, 2px desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"> {/* Grid layout: 1 column mobile, 2 columns tablet, 4 columns desktop */}
        {cards.map((card, index) => ( // Loop through all cards
          <motion.div
            key={card._id} // Unique key for each card using _id
            initial={{ opacity: 0, y: index === 0 ? -30 : 40 }} // Animation: first card slides down, others slide up
            animate={{ opacity: 1, y: 0 }} // Final animation state
            transition={{ duration: 0.5, delay: 0.1 * index }} // Animation duration with staggered delay
            style={{ backgroundImage: `url(${card.imgURL})` }} // Set background image from API
            className={`${
              index === 0
                ? "lg:col-span-2 lg:row-span-2 h-[368px] p-8 shadow-xl flex flex-col justify-between" // First card: spans 2 cols/rows on desktop, fixed height, more padding
                : "p-4 sm:p-6 shadow-md text-center" // Other cards: smaller padding, centered text
            } rounded-none bg-cover bg-center relative text-white`} // No border radius, cover image, centered, white text
          >
            <div className="relative z-10"> {/* Content container above overlay */}
              {index === 0 ? ( // First card content
                <>
                  <h1 className="text-2xl sm:text-4xl font-bold mb-2">{card.title}</h1> {/* Large title: 2xl mobile, 4xl tablet/desktop */}
                  <p className="text-base sm:text-xl">{card.desc}</p> {/* Description: base mobile, xl tablet/desktop */}
                </>
              ) : ( // Other cards content
                <>
                  <h2 className="text-green-200 text-xs sm:text-sm font-bold uppercase mb-1">
                    {card.title}
                  </h2> {/* Small title: xs mobile, sm tablet/desktop, green color */}
                  <p className="text-white font-semibold text-sm sm:text-base">{card.desc}</p> {/* Description: sm mobile, base tablet/desktop */}
                </>
              )}
              <p className="text-yellow-300 text-xs sm:text-sm my-2">{card.couponCode}</p> {/* Coupon code: xs mobile, sm tablet/desktop, yellow */}
              <Button
                className={`mt-2 ${
                  index === 0
                    ? "bg-white text-black hover:bg-black hover:text-white" // First card button: white background, black text
                    : "bg-black text-white hover:bg-white hover:text-black text-xs sm:text-sm" // Other cards button: black background, white text, smaller
                }`} // Button with responsive text size
              >
                CLICK HERE
              </Button>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Dark overlay for text readability */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};