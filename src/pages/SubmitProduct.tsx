
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Check, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Define form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  websiteUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  oneLiner: z.string().max(120, {
    message: "One-liner must be 120 characters or less.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  useCases: z.array(z.string()).optional(),
  pricingModel: z.enum(["Free", "Freemium", "Subscription", "One-Time", "Token-Gated"], {
    required_error: "Please select a pricing model.",
  }),
  priceSummary: z.string().optional(),
  features: z.array(z.string()).optional(),
  uniqueFeatures: z.string().optional(),
  competitorNames: z.string().optional(),
  pitchText: z.string().min(20, {
    message: "Please provide a brief explanation of at least 20 characters.",
  }).max(500, {
    message: "Please keep your pitch under 500 characters."
  }),
  submitterName: z.string().min(2, {
    message: "Please enter your name."
  }),
  submitterRole: z.string({
    required_error: "Please select your role.",
  }),
  isAffiliated: z.boolean().default(false),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  }),
});

// Define available options for form selects
const categories = [
  "Wallet",
  "DAO Tool",
  "NFT Platform",
  "DeFi Protocol",
  "Development Infrastructure",
  "Analytics",
  "Security",
  "Gaming",
  "Marketplace",
  "Social",
  "Other",
];

const useCaseOptions = [
  { id: "solo-devs", label: "Solo Developers" },
  { id: "daos", label: "DAOs" },
  { id: "nft-projects", label: "NFT Projects" },
  { id: "defi-protocols", label: "DeFi Protocols" },
  { id: "enterprise", label: "Enterprise" },
  { id: "investors", label: "Investors" },
  { id: "creators", label: "Creators" },
  { id: "communities", label: "Communities" },
];

const featureOptions = [
  { id: "mobile-support", label: "Mobile Support" },
  { id: "self-custody", label: "Self-Custody" },
  { id: "multi-chain", label: "Multi-Chain Support" },
  { id: "open-source", label: "Open Source" },
  { id: "api-access", label: "API Access" },
  { id: "audited", label: "Security Audited" },
  { id: "team-collab", label: "Team Collaboration" },
  { id: "analytics-dash", label: "Analytics Dashboard" },
  { id: "ai-powered", label: "AI-Powered" },
  { id: "permissionless", label: "Permissionless" },
];

const roleOptions = [
  { value: "founder", label: "Founder/Team Member" },
  { value: "marketer", label: "Marketing/PR" },
  { value: "user", label: "User/Community Member" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
];

export default function SubmitProduct() {
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      oneLiner: "",
      useCases: [],
      priceSummary: "",
      features: [],
      uniqueFeatures: "",
      competitorNames: "",
      pitchText: "",
      submitterName: "",
      isAffiliated: false,
      agreeToTerms: false,
    },
  });

  function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (mediaFiles.length + newFiles.length > 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }
      
      // Validate file types and sizes
      const validFiles = newFiles.filter(file => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB max
          toast.error(`${file.name} exceeds 5MB size limit`);
          return false;
        }
        return true;
      });

      setMediaFiles(prev => [...prev, ...validFiles]);
    }
  }

  function removeMedia(index: number) {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log({
        ...values,
        mediaCount: mediaFiles.length
      });
      
      toast.success("Product submitted for review!");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  }

  return (
    <div className="container max-w-3xl py-8 px-4 md:px-0 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit a Product</h1>
        <p className="text-muted-foreground">
          Help us grow the directory by submitting your favorite Web3 tools and products.
          Our editors will review your submission before publishing.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. MetaMask, Uniswap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oneLiner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-liner</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brief description of what your product does" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A short marketing pitch (120 characters max)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Category & Use Case Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Category & Use Case</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                name="useCases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Use Cases</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {useCaseOptions.map((useCase) => (
                        <div key={useCase.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={useCase.id}
                            checked={field.value?.includes(useCase.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), useCase.id]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (value) => value !== useCase.id
                                  ) || []
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={useCase.id}
                            className="text-sm cursor-pointer"
                          >
                            {useCase.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormDescription>
                      Select all that apply
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Pricing Information Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Pricing Information</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pricingModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a pricing model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Freemium">Freemium</SelectItem>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        <SelectItem value="One-Time">One-Time Purchase</SelectItem>
                        <SelectItem value="Token-Gated">Token-Gated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Summary (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. $9/mo for Pro, Free up to 1 project" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly explain your pricing structure
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Feature Checklist Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Common Features</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {featureOptions.map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature.id}
                            checked={field.value?.includes(feature.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), feature.id]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (value) => value !== feature.id
                                  ) || []
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={feature.id}
                            className="text-sm cursor-pointer"
                          >
                            {feature.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormDescription>
                      Select all features that apply
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uniqueFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Features (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What makes your product stand out?" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      List any features that make your product unique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Media Uploads Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            
            <div className="space-y-4">
              {/* Media Upload Area */}
              <div className="space-y-2">
                <FormLabel>Screenshots (Up to 5)</FormLabel>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Input
                    type="file"
                    id="media-upload"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleMediaUpload}
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 5MB each
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Preview of uploaded images */}
                {mediaFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Uploaded Media ({mediaFiles.length}/5)</h4>
                    <div className="flex flex-wrap gap-2">
                      {mediaFiles.map((file, index) => (
                        <div 
                          key={index}
                          className="relative group border rounded-md overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="h-20 w-20 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video URL Input */}
              <div>
                <FormLabel htmlFor="video-url">Video URL (Optional)</FormLabel>
                <Input 
                  id="video-url"
                  placeholder="YouTube, Vimeo, or IPFS URL" 
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Add a demo or explainer video
                </p>
              </div>
            </div>
          </div>

          {/* Competitor / Alternatives Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Alternatives & Comparison</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="competitorNames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Similar Tools</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. MetaMask, Rainbow Wallet" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      List tools users might compare this product with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Pitch: Why Now? Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">Why This Product Matters</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pitchText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why Now?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Explain the relevance and timing of this product" 
                        className="resize-none min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      What problem does this product solve? Why is it relevant now?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submitter Info Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4">About You</h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="submitterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="submitterRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
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
                name="isAffiliated"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I'm affiliated with this product
                      </FormLabel>
                      <FormDescription>
                        Check this if you're a team member, founder, or marketer.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Terms & Submission Section */}
          <div className="p-6 border rounded-lg shadow-sm bg-card">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the terms and conditions
                    </FormLabel>
                    <FormDescription>
                      By submitting, you agree that the information provided is accurate
                      and that our editors may edit or reject submissions.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end">
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Submit for Review
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-900 mb-2">
                Moderation Process
              </Badge>
              <p>
                All submissions are reviewed by our editorial team before publishing.
                This usually takes 1-2 business days.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
