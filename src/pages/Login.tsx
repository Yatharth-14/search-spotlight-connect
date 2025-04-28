import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import Header from "@/components/Header";
import { SetStateAction } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
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
    </>
  );
};

export default Login;
