
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the API endpoint for login
      const response = await axios.post("http://localhost:5161/api/auth/login", {
        email: formData.email,
        password: formData.password
      });
      
      // Use the login function from auth context with the returned data
      await login(formData.email, formData.password);
      
      toast({
        title: "Login Successful",
        description: "Welcome to National Trade Fair!",
        variant: "default",
      });
      
      // Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          <Button type="button" variant="link" className="p-0 h-auto font-normal text-xs">
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
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
