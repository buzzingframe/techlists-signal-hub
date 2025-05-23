
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import SubmitProduct from './pages/SubmitProduct';
import CuratedLists from './pages/CuratedLists';
import CuratedListDetail from './pages/CuratedListDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminCuratedListForm from './pages/AdminCuratedListForm';
import AdminProductSelector from './pages/AdminProductSelector';
import AdminNewsEditor from './pages/AdminNewsEditor';
import AdminNews from './pages/AdminNews';
import NewsIndex from './pages/NewsIndex';
import NewsArticle from './pages/NewsArticle';
import StackDetail from './pages/StackDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/submit" element={<SubmitProduct />} />
        <Route path="/curated-lists" element={<CuratedLists />} />
        <Route path="/curated-lists/:listId" element={<CuratedListDetail />} />
        <Route path="/news" element={<NewsIndex />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/list/new" element={<AdminCuratedListForm />} />
        <Route path="/admin/list/:listId" element={<AdminCuratedListForm />} />
        <Route path="/admin/list/:listId/select-products" element={<AdminProductSelector />} />
        <Route path="/admin/news/new" element={<AdminNewsEditor />} />
        <Route path="/admin/news/:newsId" element={<AdminNewsEditor />} />
        <Route path="/admin/news" element={<AdminNews />} />
        <Route path="/stacks/:stackId" element={<StackDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
