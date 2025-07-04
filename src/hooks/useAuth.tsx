
import { useContext } from "react";
import { useAuth as useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  return useAuthContext();
}

// Hook to check if user is admin
export function useIsAdmin() {
  const { user } = useAuth();
  
  // TODO: Replace with actual admin check from database/user roles
  // For now, we'll check if the user email is in a list of admin emails
  const adminEmails = ['admin@example.com', 'admin@techlists.com'];
  
  const isAdmin = user ? adminEmails.includes(user.email || '') : false;
  
  return { isAdmin, isLoading: false };
}
