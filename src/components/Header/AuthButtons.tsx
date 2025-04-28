import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import PostAndBidButton from "../ui/PostAndBidButton";

// Define the User type
interface User {
  name: string;
}

interface AuthButtonsProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const AuthButtons = ({ isAuthenticated, user, logout }: AuthButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center space-x-2">
      <PostAndBidButton />
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center dark:text-white"
            >
              <User className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 w-48"
          >
            <DropdownMenuItem onClick={() => navigate("/my-profile")}>
              <User className="h-4 w-4 mr-2" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex space-x-2">
          <Link to="/login">
            <Button className="bg-primary rounded-r-none">Login</Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              className="dark:text-white rounded-l-none border-l-0"
            >
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;