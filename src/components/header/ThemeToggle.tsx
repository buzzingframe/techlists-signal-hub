
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full cursor-default"
      disabled
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
