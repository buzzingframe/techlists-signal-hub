
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
import NewsIndex from "./pages/NewsIndex";
import SubmitProduct from "./pages/SubmitProduct";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminNewsEditor from "./pages/AdminNewsEditor";
import AdminCuratedListForm from "./pages/AdminCuratedListForm";
import AdminProductSelector from "./pages/AdminProductSelector";
import CuratedLists from "./pages/CuratedLists";
import CuratedListDetail from "./pages/CuratedListDetail";
import ProductDetail from "./pages/ProductDetail";
import NewsArticle from "./pages/NewsArticle";
import StackDetail from "./pages/StackDetail";
import StackEdit from "./pages/StackEdit";

const queryClient = new QueryClient();

function AppContent() {
  useDebugNetworkMonitor();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/news" element={<NewsIndex />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/submit" element={<SubmitProduct />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<AdminNews />} />
        <Route path="/admin/news/editor" element={<AdminNewsEditor />} />
        <Route path="/admin/news/editor/:id" element={<AdminNewsEditor />} />
        <Route path="/admin/curated-lists/new" element={<AdminCuratedListForm />} />
        <Route path="/admin/curated-lists/:id/edit" element={<AdminCuratedListForm />} />
        <Route path="/admin/products" element={<AdminProductSelector />} />
        <Route path="/curated-lists" element={<CuratedLists />} />
        <Route path="/curated-lists/:id" element={<CuratedListDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/stacks/:id" element={<StackDetail />} />
        <Route path="/stacks/:id/edit" element={<StackEdit />} />
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
