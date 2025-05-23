
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import SubmitProduct from "./pages/SubmitProduct";
import NotFound from "./pages/NotFound";
import CuratedLists from "./pages/CuratedLists";
import CuratedListDetail from "./pages/CuratedListDetail";
import AdminCuratedListForm from "./pages/AdminCuratedListForm";
import AdminProductSelector from "./pages/AdminProductSelector";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import NewsIndex from "./pages/NewsIndex";
import NewsArticle from "./pages/NewsArticle";
import AdminNews from "./pages/AdminNews";
import AdminNewsEditor from "./pages/AdminNewsEditor";

const queryClient = new QueryClient();

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check if user is authenticated and if they need onboarding
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check current auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUserId(session.user.id);
          setIsAuthenticated(true);
          
          // Check if user has completed onboarding
          const { data } = await supabase
            .from('profiles')
            .select('has_completed_onboarding')
            .eq('id', session.user.id)
            .single();
            
          if (data) {
            // If onboarding hasn't been completed, show the onboarding flow
            setShowOnboarding(data.has_completed_onboarding !== true);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setIsAuthenticated(true);
      } else {
        setUserId(null);
        setIsAuthenticated(false);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    
    // Update the profile to mark onboarding as complete
    if (userId) {
      await supabase
        .from('profiles')
        .update({ has_completed_onboarding: true })
        .eq('id', userId);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Onboarding Flow */}
        {authChecked && (
          <OnboardingFlow 
            isOpen={showOnboarding && isAuthenticated}
            onClose={() => setShowOnboarding(false)}
            userId={userId ?? undefined}
            onComplete={handleOnboardingComplete}
          />
        )}
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/submit" element={<SubmitProduct />} />
            <Route path="/curated-lists" element={<CuratedLists />} />
            <Route path="/curated-lists/:listId" element={<CuratedListDetail />} />
            <Route path="/curated-lists/create" element={<AdminCuratedListForm />} />
            <Route path="/curated-lists/:listId/edit" element={<AdminCuratedListForm />} />
            <Route path="/curated-lists/:listId/products" element={<AdminProductSelector />} />
            <Route path="/profile" element={<UserProfile />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/news/new" element={<AdminNewsEditor />} />
            <Route path="/admin/news/:articleId/edit" element={<AdminNewsEditor />} />
            
            {/* News routes */}
            <Route path="/news" element={<NewsIndex />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
