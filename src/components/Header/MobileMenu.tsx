
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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  // Close dropdown when screen size crosses md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close dropdown on md and above
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="dark:text-white cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white dark:bg-gray-800 w-48"
        >
          <DropdownMenuItem
            onClick={() => {
              handleButtonClick(
                "/bid-now",
                "place bids",
                isAuthenticated,
                navigate,
                toast
              );
              setIsOpen(false);
            }}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Bid Now</span>
          </DropdownMenuItem>
          {isAuthenticated ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/my-profile");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User className="h-4 w-4 mr-2" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>Register</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
