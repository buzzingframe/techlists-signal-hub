
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  console.log("ProtectedRoute - isLoading:", isLoading, "user:", user ? "authenticated" : "not authenticated");

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("ProtectedRoute - Redirecting to /auth (user not authenticated)");
    return <Navigate to="/auth" replace />;
  }

  console.log("ProtectedRoute - User authenticated, rendering protected content");
  // Render children if authenticated
  return <>{children}</>;
}
