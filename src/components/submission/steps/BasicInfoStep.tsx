
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
}

const categories = [
  { value: "wallet", label: "Wallet" },
  { value: "defi", label: "DeFi" },
  { value: "nft", label: "NFT & Digital Assets" },
  { value: "dao", label: "DAO & Governance" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "development", label: "Development Tools" },
  { value: "analytics", label: "Analytics & Data" },
  { value: "trading", label: "Trading & Exchange" },
  { value: "gaming", label: "Gaming & Metaverse" },
  { value: "security", label: "Security & Privacy" },
  { value: "education", label: "Education & Learning" },
  { value: "other", label: "Other" },
];

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. MetaMask" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website *</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing Model *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="$">Paid ($)</SelectItem>
                  <SelectItem value="$$">Premium ($$)</SelectItem>
                  <SelectItem value="Freemium">Freemium</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Briefly describe what this product does and its main value proposition" 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="useCase"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Use Case & Target Audience *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Who would use this product and why? What problems does it solve?" 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
