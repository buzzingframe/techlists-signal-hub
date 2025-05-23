
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "@/components/notifications/NotificationsDropdown";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      duration: 1500,
    });
  };

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
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Signal</span>
            <Badge>Beta</Badge>
          </Link>

          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Signal Home
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover the most reliable tools in the web3
                              ecosystem
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem to="/curated-lists" title="Curated Lists">
                        Explore topic-specific collections by our experts
                      </ListItem>
                      <ListItem to="/" title="Trending Tools">
                        See what's gaining traction in the community
                      </ListItem>
                      <ListItem to="/" title="Compare Products">
                        Side-by-side feature analysis of similar tools
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/news" className={navigationMenuTriggerStyle()}>
                    News
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/submit" className={navigationMenuTriggerStyle()}>
                    Submit
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          <NotificationsDropdown />

          {!isMobile && (
            <>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Profile
              </Button>
              <Button onClick={handleLogin}>Sign In</Button>
            </>
          )}

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="border-b">
          <nav className="container mx-auto py-4 px-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/curated-lists"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Curated Lists
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/submit"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Submit
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button onClick={handleLogin} className="w-full">
                  Sign In
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, to, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as any}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
