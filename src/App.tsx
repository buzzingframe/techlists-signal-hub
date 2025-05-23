
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductModalProvider } from './contexts/ProductModalContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { ErrorBoundary } from './components/error/ErrorBoundary';
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
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ProductModalProvider>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/product/:productId" element={
                  <ErrorBoundary>
                    <ProductDetail />
                  </ErrorBoundary>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <UserProfile />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/submit" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <SubmitProduct />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/curated-lists" element={
                  <ErrorBoundary>
                    <CuratedLists />
                  </ErrorBoundary>
                } />
                <Route path="/curated-lists/:listId" element={
                  <ErrorBoundary>
                    <CuratedListDetail />
                  </ErrorBoundary>
                } />
                <Route path="/news" element={
                  <ErrorBoundary>
                    <NewsIndex />
                  </ErrorBoundary>
                } />
                <Route path="/news/:slug" element={
                  <ErrorBoundary>
                    <NewsArticle />
                  </ErrorBoundary>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminDashboard />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/list/new" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminCuratedListForm />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/list/:listId" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminCuratedListForm />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/list/:listId/select-products" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminProductSelector />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/news/new" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminNewsEditor />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/news/:newsId" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminNewsEditor />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/admin/news" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <AdminNews />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="/stacks/:stackId" element={
                  <ErrorBoundary>
                    <StackDetail />
                  </ErrorBoundary>
                } />
                <Route path="/stacks/:stackId/edit" element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <StackEdit />
                    </ErrorBoundary>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            
            {/* Render the ProductDetailModal at the application root level */}
            <ProductDetailModal />
          </ProductModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
