
import { UserRole } from "@/types/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Code, LineChart, Laptop, Briefcase, Search } from "lucide-react";

interface Step2RoleProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function Step2Role({ selectedRole, onChange }: Step2RoleProps) {
  const roles: { id: UserRole; label: string; description: string; icon: React.ReactNode }[] = [
    { 
      id: "developer", 
      label: "Developer", 
      description: "Building applications or infrastructure", 
      icon: <Code className="w-5 h-5" /> 
    },
    { 
      id: "founder", 
      label: "Founder / Project Lead", 
      description: "Leading a web3 project or business", 
      icon: <Briefcase className="w-5 h-5" /> 
    },
    { 
      id: "researcher", 
      label: "Researcher", 
      description: "Analyzing protocols and technologies", 
      icon: <Search className="w-5 h-5" /> 
    },
    { 
      id: "trader", 
      label: "Trader", 
      description: "Trading or investing in digital assets", 
      icon: <LineChart className="w-5 h-5" /> 
    },
    { 
      id: "explorer", 
      label: "Curious Explorer", 
      description: "Learning about web3 technologies", 
      icon: <Laptop className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold">How do you identify?</h2>
        <p className="text-muted-foreground mt-2">
          Select the role that best describes you to help us tailor your experience.
        </p>
      </div>

      <RadioGroup 
        value={selectedRole} 
        onValueChange={(value) => onChange(value as UserRole)}
        className="grid gap-4 mt-6"
      >
        {roles.map((role) => (
          <div key={role.id}>
            <RadioGroupItem
              value={role.id}
              id={role.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={role.id}
              className="flex items-center gap-4 rounded-lg border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50/50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                {role.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{role.label}</div>
                <div className="text-sm text-muted-foreground">{role.description}</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
