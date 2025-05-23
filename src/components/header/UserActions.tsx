
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function UserActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    // This would be replaced with actual authentication logic
    toast({
      title: "Login functionality",
      description: "Sign in/up flow would open here",
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => navigate("/profile")}>
        Profile
      </Button>
      <Button onClick={handleLogin}>Sign In</Button>
    </>
  );
}
