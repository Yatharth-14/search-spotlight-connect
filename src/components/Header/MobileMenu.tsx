import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { handleButtonClick } from "@/handlerFunctions/indexPageHandlerFunctions";

// Define the User type
interface User {
  name: string;
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const MobileMenu = ({ isAuthenticated, user, logout }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="dark:text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

          <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-gray-800 w-480 md:hidden"
        >
          <DropdownMenuItem
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
            <span className="cursor-pointer">Post Requirements</span>
          </DropdownMenuItem>
          <DropdownMenuItem
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
            <span className="cursor-pointer">Bid Now</span>
          </DropdownMenuItem>
          {isAuthenticated ? (
            <>
              <DropdownMenuItem onClick={() => navigate("/my-profile")}>
                <User className="h-4 w-4 mr-2" />
                <span className="cursor-pointer">My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="cursor-pointer">Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => navigate("/login")}>
                <span className="cursor-pointer">Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/register")}>
                <span className="cursor-pointer">Register</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>

        
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;