
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Save, UserRound } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  bio: string;
  company: string;
  position: string;
}

const MyProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    bio: "",
    company: "",
    position: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to login to view your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Load profile data from localStorage if it exists
    const savedProfile = localStorage.getItem(`profile_${user?.email}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfileData({
        ...profileData,
        ...parsedProfile,
        name: user?.name || parsedProfile.name,
        email: user?.email || parsedProfile.email,
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(`profile_${user?.email}`, JSON.stringify(profileData));
    
    // Update users array to ensure name is updated everywhere
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        return {
          ...u,
          name: profileData.name
        };
      }
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current user in local storage
    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.name
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <UserRound className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">My Profile</CardTitle>
            <CardDescription className="text-center">
              {isEditing ? "Edit your personal information" : "View and manage your profile information"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 px-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={profileData.name} 
                  onChange={handleChange} 
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  value={profileData.email} 
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={profileData.phone} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={profileData.company} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={profileData.position} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select 
                  disabled={!isEditing} 
                  value={profileData.country} 
                  onValueChange={(value) => handleSelectChange(value, "country")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={profileData.address} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={profileData.city} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={profileData.state} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input 
                  id="zip" 
                  name="zip" 
                  value={profileData.zip} 
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-24"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
