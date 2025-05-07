
import React from "react";
import { Button } from "./button";
import { handleButtonClick } from "@/handlerFunctions/indexPageHandlerFunctions";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PostAndBidButton = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex space-x-1 sm:space-x-2">
      <Button
        variant="outline"
        size={isMobile ? "sm" : "sm"}
        className="dark:text-white dark:hover:bg-gray-700 text-xs sm:text-sm px-2 sm:px-3"
        onClick={() =>
          handleButtonClick(
            "/bid-now",
            "place bids",
            isAuthenticated,
            navigate,
            toast
          )
        }
      >
        Bid Now
      </Button>
    </div>
  );
};

export default PostAndBidButton;
