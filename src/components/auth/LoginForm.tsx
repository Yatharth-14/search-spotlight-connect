
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, clearError } from "@/store/slices/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Dispatch the login action
      const resultAction = await dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password 
      }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast({
          title: "Login Successful",
          description: "Welcome to National Trade Fair!",
          variant: "default",
        });
        
        // Navigate to home page after successful login
        navigate("/");
      } else if (loginUser.rejected.match(resultAction) && resultAction.payload) {
        toast({
          title: "Login Failed",
          description: resultAction.payload as string,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-normal text-xs"
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm cursor-pointer">
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register">
          <Button variant="link" className="p-0 h-auto font-normal">
            Sign up
          </Button>
        </Link>
      </div>

      {/* Demo credentials */}
      <div className="text-xs text-center text-muted-foreground mt-4">
        <p>Register a new account to get started!</p>
      </div>
    </form>
  );
};
