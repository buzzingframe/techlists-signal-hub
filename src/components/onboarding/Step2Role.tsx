
import { UserRole } from "@/types/user";
import { RoleHeader } from "./role/RoleHeader";
import { RoleSelector } from "./role/RoleSelector";
import { roles } from "./role/roleData";

interface Step2RoleProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export function Step2Role({ selectedRole, onChange }: Step2RoleProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <RoleHeader />
      <RoleSelector 
        roles={roles}
        selectedRole={selectedRole}
        onChange={onChange}
      />
    </div>
  );
}
