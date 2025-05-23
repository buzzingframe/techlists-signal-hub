
import { UserRole } from "@/types/user";
import { Code, LineChart, Laptop, Briefcase, Search } from "lucide-react";
import React from "react";

export interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const roles: RoleOption[] = [
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
