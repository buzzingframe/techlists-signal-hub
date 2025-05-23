
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { Bell } from "lucide-react";

interface ProductCardHeaderProps {
  logo: string;
  name: string;
  category: string;
  signalScore: number;
}

export function ProductCardHeader({ logo, name, category, signalScore }: ProductCardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">{logo}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <Badge variant="secondary" className="text-xs mt-1">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <SignalScoreBadge score={signalScore} size="sm" />
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
