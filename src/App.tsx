
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useDebugNetworkMonitor();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/submit" element={<SubmitProduct />} />
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
        <BrowserRouter>
          <AuthProvider>
            <OnboardingProvider>
              <ProductModalProvider>
                <AppContent />
                <Toaster />
                <Sonner />
              </ProductModalProvider>
            </OnboardingProvider>
          </AuthProvider>
        </BrowserRouter>
      </DebugProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
