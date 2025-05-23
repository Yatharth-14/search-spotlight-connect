
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/store/slices/authSlice";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const resultAction = await dispatch(registerUser({
        name: formData.username,
        email: formData.email,
        password: formData.password
      }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Registration successful! Redirecting...",
        });
        // Navigate to login or home page after successful registration
        setTimeout(() => navigate("/"), 2000);
      } else if (registerUser.rejected.match(resultAction) && resultAction.payload) {
        toast({
          title: "Error",
          description: resultAction.payload as string,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="username"
          type="text"
          placeholder="Your full name"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
      </div>
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm cursor-pointer">
          I agree to the Terms and Conditions
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Register"}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login">
          <Button variant="link" className="p-0 h-auto font-normal">
            Login
          </Button>
        </Link>
      </div>
    </form>
  );
};
