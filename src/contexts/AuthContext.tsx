
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    success: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: any | null;
    success: boolean;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: any | null;
    success: boolean;
  }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session ? 'has session' : 'no session');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle specific auth events
        switch (event) {
          case 'SIGNED_OUT':
            setAuthError(null);
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed successfully');
            setAuthError(null);
            break;
          case 'USER_UPDATED':
            console.log('User updated');
            break;
          case 'PASSWORD_RECOVERY':
            console.log('Password recovery initiated');
            break;
        }
      }
    );

    // THEN check for existing session
    const checkSession = async () => {
      try {
        if (!isOnline) {
          // Try to get cached session from localStorage
          const cachedSession = localStorage.getItem('sb-nsccivnoxffgpzlbbizb-auth-token');
          if (cachedSession) {
            console.log('Using cached session while offline');
          } else {
            setAuthError('No internet connection. Please check your connection and try again.');
          }
          setIsLoading(false);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setAuthError('Failed to restore session. Please log in again.');
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          setAuthError(null);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setAuthError('Authentication system unavailable. Please try again later.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isOnline]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    
    if (!isOnline) {
      const error = { message: "No internet connection. Please check your connection and try again." };
      setAuthError(error.message);
      return { error, success: false };
    }

    if (!validateEmail(email)) {
      const error = { message: "Please enter a valid email address." };
      setAuthError(error.message);
      return { error, success: false };
    }

    if (password.length < 6) {
      const error = { message: "Password must be at least 6 characters long." };
      setAuthError(error.message);
      return { error, success: false };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        let friendlyMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          friendlyMessage = "Incorrect email or password. Please try again.";
        } else if (error.message.includes('Email not confirmed')) {
          friendlyMessage = "Please check your email and click the confirmation link before signing in.";
        } else if (error.message.includes('Too many requests')) {
          friendlyMessage = "Too many login attempts. Please wait a few minutes before trying again.";
        }
        
        setAuthError(friendlyMessage);
        throw error;
      }

      navigate("/");
      return { error: null, success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error, success: false };
    }
  };

  const signUp = async (email: string, password: string) => {
    setAuthError(null);
    
    if (!isOnline) {
      const error = { message: "No internet connection. Please check your connection and try again." };
      setAuthError(error.message);
      return { error, success: false };
    }

    if (!validateEmail(email)) {
      const error = { message: "Please enter a valid email address." };
      setAuthError(error.message);
      return { error, success: false };
    }

    if (password.length < 6) {
      const error = { message: "Password must be at least 6 characters long." };
      setAuthError(error.message);
      return { error, success: false };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        let friendlyMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          friendlyMessage = "An account with this email already exists. Try signing in instead.";
        } else if (error.message.includes('Password should be')) {
          friendlyMessage = "Password is too weak. Please choose a stronger password.";
        }
        
        setAuthError(friendlyMessage);
        throw error;
      }

      return { error: null, success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error, success: false };
    }
  };

  const signOut = async () => {
    setAuthError(null);
    
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      console.error("Error signing out:", error);
      setAuthError("Failed to sign out. Please try again.");
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    
    if (!isOnline) {
      const error = { message: "No internet connection. Please check your connection and try again." };
      setAuthError(error.message);
      return { error, success: false };
    }

    if (!validateEmail(email)) {
      const error = { message: "Please enter a valid email address." };
      setAuthError(error.message);
      return { error, success: false };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) {
        setAuthError(error.message);
        throw error;
      }
      
      return { error: null, success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { error, success: false };
    }
  };

  const clearError = () => {
    setAuthError(null);
  };

  const value = {
    session,
    user,
    isLoading,
    authError,
    signIn,
    signUp,
    signOut,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
