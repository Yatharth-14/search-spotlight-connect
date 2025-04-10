
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      if (email === "demo@example.com" && password === "password") {
        // Store auth state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ 
          email,
          name: "Demo User",
          role: "member"
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome to National Trade Fair!",
          variant: "default",
        });
        
        // Redirect to home page after successful login
        navigate("/");
      } else {
        throw new Error("Invalid credentials. Try demo@example.com / password");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred",
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="link" className="p-0 h-auto font-normal">
          Sign up
        </Button>
      </div>
      <div className="text-xs text-center text-muted-foreground mt-4">
        <p>Demo credentials: demo@example.com / password</p>
      </div>
    </form>
  );
};
