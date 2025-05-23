
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NetworkError } from "@/components/error/NetworkError";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductErrorBoundaryProps {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  productId?: string;
  children: ReactNode;
}

export function ProductErrorBoundary({
  isLoading,
  hasError,
  errorMessage = "Product not found",
  productId,
  children
}: ProductErrorBoundaryProps) {
  const { isOnline } = useNetworkStatus();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (hasError) {
    const isNotFound = errorMessage.toLowerCase().includes('not found') || 
                     errorMessage.toLowerCase().includes('404');
    const isNetworkError = !isOnline || 
                          errorMessage.toLowerCase().includes('network') ||
                          errorMessage.toLowerCase().includes('connection');

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            {isNetworkError ? (
              <NetworkError 
                isOffline={!isOnline}
                onRetry={() => window.location.reload()}
                message={isOnline ? errorMessage : undefined}
              />
            ) : isNotFound ? (
              <>
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  {productId 
                    ? `The product with ID "${productId}" doesn't exist or may have been removed.`
                    : "The product you're looking for doesn't exist."
                  }
                </p>
                <div className="space-x-2">
                  <Button onClick={() => navigate('/')} variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    <Search className="h-4 w-4 mr-2" />
                    Browse Products
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                <p className="text-muted-foreground mb-6">{errorMessage}</p>
                <div className="space-x-2">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Try Again
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    Go Home
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
