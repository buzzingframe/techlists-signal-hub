
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        yellow: 
          "border-yellow-200 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 dark:border-yellow-800/30",
        blue: 
          "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-800/30",
        green: 
          "border-green-200 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 dark:border-green-800/30",
        purple: 
          "border-purple-200 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500 dark:border-purple-800/30",
        orange: 
          "border-orange-200 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500 dark:border-orange-800/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
