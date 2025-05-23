
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Extract ListItem as a separate component
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

export function NavigationItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background shadow-lg border rounded-md">
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
  );
}
