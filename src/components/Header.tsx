
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "./notifications/NotificationsDropdown";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-web3 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <span className="font-bold text-xl">TechLists</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Input
            type="search"
            placeholder="Search Web3 tools..."
            className="w-full bg-muted/50 border-0 focus:bg-background transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-9 h-9 p-0"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Notifications Dropdown */}
          <NotificationsDropdown />

          {/* Profile */}
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
