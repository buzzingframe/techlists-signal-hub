
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { mockDataService } from "@/services/mockDataService";
import { Database, Users, List, MessageSquare, CheckCircle } from "lucide-react";

export function AdminDataSetup() {
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const { toast } = useToast();

  const handleSetupMockData = async () => {
    setIsLoading(true);
    try {
      await mockDataService.setupMockData();
      setSetupComplete(true);
      toast({
        title: "Mock data created successfully!",
        description: "You can now test all admin features with sample data.",
      });
    } catch (error) {
      console.error('Error setting up mock data:', error);
      toast({
        title: "Error setting up mock data",
        description: "Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (setupComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <div>
              <h3 className="font-medium">Mock Data Setup Complete!</h3>
              <p className="text-sm text-green-600">
                Your database now contains sample products, curated lists, and reviews for testing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Setup Mock Data for Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Click the button below to populate your database with sample data for testing admin features.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>6 Sample Products</span>
          </div>
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-green-500" />
            <span>3 Curated Lists</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-orange-500" />
            <span>5 Reviews (2 flagged)</span>
          </div>
        </div>

        <Button 
          onClick={handleSetupMockData} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Setting up...' : 'Setup Mock Data'}
        </Button>
      </CardContent>
    </Card>
  );
}
