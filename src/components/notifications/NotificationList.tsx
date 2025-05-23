
import { useState } from "react";
import { Notification } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationList({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationListProps) {
  const { toast } = useToast();
  const hasUnreadNotifications = notifications.some(notification => !notification.read);
  
  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[400px]">
      {hasUnreadNotifications && (
        <div className="p-2 sticky top-0 z-10 bg-background border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
      )}
      
      <div className="overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
            onMarkAsRead={onMarkAsRead} 
          />
        ))}
      </div>
    </div>
  );
}
