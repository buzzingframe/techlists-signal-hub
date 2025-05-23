
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminSubmissions } from "@/components/admin/AdminSubmissions";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { AdminListManager } from "@/components/admin/AdminListManager";
import { AdminTags } from "@/components/admin/AdminTags";
import { AdminNewsManager } from "@/components/admin/AdminNewsManager";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user has admin permissions
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to home if not logged in
          navigate("/");
          toast({
            title: "Access denied",
            description: "Please log in to continue.",
            variant: "destructive",
          });
          return;
        }
        
        // For demonstration, we assume admin check would query a user_roles table
        // In a real app, replace this with actual admin role verification
        const isAdmin = true; // Replace with real admin check
        
        if (!isAdmin) {
          // Redirect to 404 if not admin
          navigate("/404");
          toast({
            title: "Access denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate, toast]);
  
  // Show loading state while checking permissions
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading admin panel...</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Only render if user is admin
  if (!isAdmin) return null;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="bg-muted/50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-3">
              <Button variant="default" size="sm" onClick={() => navigate("/curated-lists/create")}>
                <Plus className="w-4 h-4 mr-1" />
                Create New List
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/admin/news/new")}>
                <Plus className="w-4 h-4 mr-1" />
                Add News Article
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "dashboard" && <AdminStats />}
          {activeTab === "submissions" && <AdminSubmissions />}
          {activeTab === "reviews" && <AdminReviews />}
          {activeTab === "lists" && <AdminListManager />}
          {activeTab === "news" && <AdminNewsManager />}
          {activeTab === "tags" && <AdminTags />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
