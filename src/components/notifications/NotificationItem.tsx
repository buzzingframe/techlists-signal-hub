
import { useState } from "react";
import { Notification } from "@/types/notification";
import { 
  MessageSquare, 
  AtSign, 
  FileCheck, 
  Star, 
  Bell,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
    toast({
      title: "Notification marked as read",
      duration: 2000,
    });
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'review_reply':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'mention':
        return <AtSign className="w-4 h-4 text-purple-500" />;
      case 'submission_status':
        return <FileCheck className="w-4 h-4 text-green-500" />;
      case 'product_review':
        return <Star className="w-4 h-4 text-amber-500" />;
      case 'system':
        return <Bell className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
  const fullDate = format(new Date(notification.createdAt), 'PPp');

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 border-b hover:bg-muted/50 transition-colors cursor-pointer relative",
        !notification.read && "bg-muted/30"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => notification.link && (window.location.href = notification.link)}
    >
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm",
          !notification.read && "font-medium"
        )}>
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1" title={fullDate}>
          {timeAgo}
        </p>
      </div>
      
      {!notification.read && (
        <div className={cn(
          "absolute right-2 top-2 transition-opacity",
          isHovering ? "opacity-100" : "opacity-0"
        )}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={handleMarkAsRead}
          >
            <Check className="w-3 h-3" />
            <span className="sr-only">Mark as read</span>
          </Button>
        </div>
      )}
      
      {!notification.read && (
        <div className={cn(
          "absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 transition-opacity",
          isHovering ? "opacity-0" : "opacity-100"
        )} />
      )}
    </div>
  );
}
