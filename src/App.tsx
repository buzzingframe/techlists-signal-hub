
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import SubmitProduct from "./pages/SubmitProduct";
import NotFound from "./pages/NotFound";
import CuratedLists from "./pages/CuratedLists";
import CuratedListDetail from "./pages/CuratedListDetail";
import AdminCuratedListForm from "./pages/AdminCuratedListForm";
import AdminProductSelector from "./pages/AdminProductSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
