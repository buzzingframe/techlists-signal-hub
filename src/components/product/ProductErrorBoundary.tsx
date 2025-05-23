
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ProductErrorBoundaryProps {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  children: ReactNode;
}

export function ProductErrorBoundary({
  isLoading,
  hasError,
  errorMessage = "Product not found",
  children
}: ProductErrorBoundaryProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading product details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">{errorMessage}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
