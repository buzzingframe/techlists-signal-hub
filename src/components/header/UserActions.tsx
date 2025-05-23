
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, Shield } from "lucide-react";

export function UserActions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, isLoading } = useAuth();

  const handleLogout = async () => {
    console.log("UserActions - Logging out user");
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleProtectedNavigation = (path: string) => {
    console.log(`UserActions - Navigating to protected route: ${path}`);
    navigate(path);
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse bg-muted rounded h-8 w-16"></div>
        <div className="animate-pulse bg-muted rounded h-8 w-16"></div>
      </div>
    );
  }

  if (user) {
    console.log("UserActions - User authenticated, showing user menu");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Account</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleProtectedNavigation("/profile")}>
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleProtectedNavigation("/submit")}>
            <Shield className="mr-2 h-4 w-4" />
            Submit Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleProtectedNavigation("/admin")}>
            <Shield className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleProtectedNavigation("/profile?tab=settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  console.log("UserActions - User not authenticated, showing login/signup buttons");
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => navigate("/auth")}>
        Login
      </Button>
      <Button onClick={() => navigate("/auth?tab=signup")}>Sign Up</Button>
    </div>
  );
}
