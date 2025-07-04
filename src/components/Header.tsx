
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/header/Logo";
import { NavigationItems } from "@/components/header/NavigationItems";
import { NotificationsDropdown } from "@/components/notifications/NotificationsDropdown";
import { MobileMenu } from "@/components/header/MobileMenu";
import { UserActions } from "@/components/header/UserActions";
import { useToast } from "@/hooks/use-toast";

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
      <div className="page-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          {!isMobile && <NavigationItems />}
        </div>

        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          {!isMobile && <UserActions />}
          {isMobile && <MobileMenu onLogin={handleLogin} />}
        </div>
      </div>
    </header>
  );
}
