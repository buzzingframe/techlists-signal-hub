
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Index from './pages/Index';
import Auth from './pages/Auth';
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
import StackEdit from './pages/StackEdit';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/submit" element={
            <ProtectedRoute>
              <SubmitProduct />
            </ProtectedRoute>
          } />
          <Route path="/curated-lists" element={<CuratedLists />} />
          <Route path="/curated-lists/:listId" element={<CuratedListDetail />} />
          <Route path="/news" element={<NewsIndex />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/list/new" element={
            <ProtectedRoute>
              <AdminCuratedListForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/list/:listId" element={
            <ProtectedRoute>
              <AdminCuratedListForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/list/:listId/select-products" element={
            <ProtectedRoute>
              <AdminProductSelector />
            </ProtectedRoute>
          } />
          <Route path="/admin/news/new" element={
            <ProtectedRoute>
              <AdminNewsEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/news/:newsId" element={
            <ProtectedRoute>
              <AdminNewsEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/news" element={
            <ProtectedRoute>
              <AdminNews />
            </ProtectedRoute>
          } />
          <Route path="/stacks/:stackId" element={<StackDetail />} />
          <Route path="/stacks/:stackId/edit" element={
            <ProtectedRoute>
              <StackEdit />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
