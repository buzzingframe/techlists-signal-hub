
import { UserRole } from "@/types/user";
import { RadioGroup } from "@/components/ui/radio-group";
import { RoleItem } from "./RoleItem";
import { RoleOption } from "./roleData";

interface RoleSelectorProps {
  roles: RoleOption[];
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function RoleSelector({ roles, selectedRole, onChange }: RoleSelectorProps) {
  return (
    <RadioGroup 
      value={selectedRole} 
      onValueChange={(value) => onChange(value as UserRole)}
      className="grid gap-4 mt-6"
    >
      {roles.map((role) => (
        <RoleItem
          key={role.id}
          id={role.id}
          label={role.label}
          description={role.description}
          icon={role.icon}
        />
      ))}
    </RadioGroup>
  );
}
