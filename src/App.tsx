
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./hooks/useAuth";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostRequirement from "./pages/PostRequirement";
import BidNow from "./pages/BidNow";
import MyProfile from "./pages/MyProfile";
import SearchResults from "./pages/SearchResults";
import SellerProfile from "./pages/SellerProfile";
import CategoryPage from "./pages/CategoryPage";
import Layout from "./components/Layout";

const App = () => {
  // Create a client instance that persists across renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/post-requirement"
                    element={<PostRequirement />}
                  />
                  <Route path="/bid-now" element={<BidNow />} />
                  <Route path="/my-profile" element={<MyProfile />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/seller/:sellerId" element={<SellerProfile />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
