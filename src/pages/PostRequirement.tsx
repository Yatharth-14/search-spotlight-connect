import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

// Define the requirement interface
interface Requirement {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  budget: string;
  timeline: string;
  contactMethod: string;
  contactInfo: string;
  createdAt: string;
}

const PostRequirement = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !description ||
      !budget ||
      !timeline ||
      !contactInfo
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    // Create a new requirement object
    const newRequirement: Requirement = {
      id: Date.now().toString(),
      userId: user?.email || "",
      title,
      category,
      description,
      budget,
      timeline,
      contactMethod,
      contactInfo,
      createdAt: new Date().toISOString(),
    };

    // Get existing requirements from localStorage or initialize an empty array
    const existingRequirements = JSON.parse(
      localStorage.getItem("requirements") || "[]"
    );

    // Add the new requirement
    existingRequirements.push(newRequirement);

    // Save back to localStorage
    localStorage.setItem("requirements", JSON.stringify(existingRequirements));

    // Show success message
    toast({
      title: "Requirement Posted",
      description: "Your requirement has been posted successfully!",
    });

    // Redirect to home page
    navigate("/");
  };

  return (
    <>
      <Header
        isAuthenticated={false}
        user={undefined}
        logout={function (): void {
          throw new Error("Function not implemented.");
        }}
        searchQuery={""}
        setSearchQuery={function (value: SetStateAction<string>): void {
          throw new Error("Function not implemented.");
        }}
        suggestions={[]}
        showSuggestions={false}
        setShowSuggestions={function (value: SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        {/* Main Content */}
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Post Your Requirement</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="What do you need?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your requirements in detail"
                  className="min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget (₹)</label>
                  <Input
                    type="text"
                    placeholder="Your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline</label>
                  <Select value={timeline} onValueChange={setTimeline} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (1-2 days)</SelectItem>
                      <SelectItem value="1week">Within a week</SelectItem>
                      <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="1month">Within a month</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Preferred Contact Method
                  </label>
                  <Select
                    value={contactMethod}
                    onValueChange={setContactMethod}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Contact Information
                  </label>
                  <Input
                    placeholder={
                      contactMethod === "email"
                        ? "Your email"
                        : "Your phone number"
                    }
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-2"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit">Post Requirement</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default PostRequirement;
