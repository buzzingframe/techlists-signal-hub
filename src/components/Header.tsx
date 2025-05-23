
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/header/Logo";
import { NavigationItems } from "@/components/header/NavigationItems";
import { ThemeToggle } from "@/components/header/ThemeToggle";
import { NotificationsDropdown } from "@/components/notifications/NotificationsDropdown";
import { MobileMenu } from "@/components/header/MobileMenu";
import { UserActions } from "@/components/header/UserActions";
import { useToast } from "@/components/ui/use-toast";

export function Header() {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogin = () => {
    // This would be replaced with actual authentication logic
    toast({
      title: "Login functionality",
      description: "Sign in/up flow would open here",
    });
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />

          {!isMobile && <NavigationItems />}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationsDropdown />

          {!isMobile && <UserActions />}
          {isMobile && <MobileMenu onLogin={handleLogin} />}
        </div>
      </div>
    </header>
  );
}
