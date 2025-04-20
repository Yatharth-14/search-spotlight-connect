import React from "react";
import { Button } from "./button";
import { handleButtonClick } from "@/handlerFunctions/indexPageHandlerFunctions";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

const PostAndBidButton = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <div className="hidden md:flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="dark:text-white dark:hover:bg-gray-700"
        onClick={() =>
          handleButtonClick(
            "/post-requirement",
            "post requirements",
            isAuthenticated,
            navigate,
            toast
          )
        }
      >
        Post Requirements
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="lg:inline-flex dark:text-white dark:hover:bg-gray-700"
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
