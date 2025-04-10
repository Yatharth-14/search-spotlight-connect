
import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png" 
              alt="National Trade Fair" 
              className={`h-10 md:h-12 ${theme === 'dark' ? 'invert' : ''}`}
            />
          </div>
          
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
