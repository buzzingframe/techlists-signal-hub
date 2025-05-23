import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { ProductModalProvider } from "./contexts/ProductModalContext";
import { DebugProvider } from "./contexts/DebugContext";
import { DebugPanel } from "./components/debug/DebugPanel";
import { useDebugNetworkMonitor } from "./hooks/useDebugNetworkMonitor";
import Index from "./pages/Index";
import SubmitProduct from "./pages/SubmitProduct";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import { ProductLayout } from "./components/product/ProductLayout";
import { CategoryLayout } from "./components/category/CategoryLayout";
import { AppLayout } from "./components/AppLayout";

const queryClient = new QueryClient();

function AppContent() {
  useDebugNetworkMonitor();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/submit" element={<SubmitProduct />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/product/:slug" element={<ProductLayout><Product /></ProductLayout>} />
        <Route path="/category/:slug" element={<CategoryLayout><Category /></CategoryLayout>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <DebugPanel />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DebugProvider>
        <AuthProvider>
          <OnboardingProvider>
            <ProductModalProvider>
              <BrowserRouter>
                <AppContent />
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </ProductModalProvider>
          </OnboardingProvider>
        </AuthProvider>
      </DebugProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
