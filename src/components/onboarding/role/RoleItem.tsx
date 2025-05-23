
import { UserRole } from "@/types/user";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleItemProps {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export function RoleItem({ id, label, description, icon }: RoleItemProps) {
  return (
    <div key={id}>
      <RadioGroupItem
        value={id}
        id={id}
        className="peer sr-only"
      />
      <Label
        htmlFor={id}
        className="flex items-center gap-4 rounded-lg border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </Label>
    </div>
  );
}
