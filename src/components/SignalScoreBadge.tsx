
import { cn } from "@/lib/utils";

interface SignalScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SignalScoreBadge({ score, size = "md", className }: SignalScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (score >= 6) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    return "bg-gradient-to-r from-red-500 to-pink-500";
  };

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base"
  };

  return (
    <div
      className={cn(
        "relative group cursor-help",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-all duration-200 hover:scale-110",
          getScoreColor(score),
          sizeClasses[size]
        )}
      >
        {score.toFixed(1)}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        Score based on reviews, editorial input, and trust metrics
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}
