import { RegisterForm } from "@/components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import Header from "@/components/Header";
import { SetStateAction } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground mt-2">
                Fill in your details to join National Trade Fair
              </p>
            </div>
            <RegisterForm />
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
