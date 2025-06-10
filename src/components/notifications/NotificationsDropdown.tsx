
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationList } from "./NotificationList";
import { Notification } from "@/types/notification";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

// Mock notifications data - in a real app, this would come from an API or database
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "review_reply",
    title: "New reply to your review",
    message: "@marko replied to your review on WalletX",
    link: "/product/1",
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned",
    message: "@alice mentioned you in a comment on MetaMask",
    link: "/product/2",
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "3",
    type: "submission_status",
    title: "Submission approved",
    message: "Your product submission 'Ethereum Explorer' was approved",
    link: "/product/3",
    read: true,
    createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: "4",
    type: "product_review",
    title: "New review on saved product",
    message: "Someone added a new review to Uniswap",
    link: "/product/4",
    read: true,
    createdAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
  },
  {
    id: "5",
    type: "system",
    title: "Welcome to TechLists",
    message: "Thank you for joining our community of Web3 enthusiasts",
    read: true,
    createdAt: new Date(Date.now() - 604800000).toISOString() // 7 days ago
  }
];

export function NotificationsDropdown() {
  const { user } = useAuth();
  
  // Don't render notifications for unauthenticated users - move this check to the very beginning
  if (!user) {
    return null;
  }

  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] pt-6">
          <SheetHeader className="mb-2">
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <NotificationList 
            notifications={notifications} 
            onMarkAsRead={handleMarkAsRead} 
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 font-medium border-b">
          Notifications
        </div>
        <NotificationList 
          notifications={notifications} 
          onMarkAsRead={handleMarkAsRead} 
          onMarkAllAsRead={handleMarkAllAsRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
