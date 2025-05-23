import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  useCase: z.string().min(10, {
    message: "Use case must be at least 10 characters.",
  }),
  price: z.enum(["Free", "$", "$$", "Freemium"], {
    required_error: "Please select a pricing model.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function SubmitProduct() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      category: "",
      description: "",
      useCase: "",
      price: undefined,
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Product submitted",
        description: "Your product has been submitted for review.",
      });
    }, 1500);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Submit a Product</h1>
          <p className="text-muted-foreground mb-8">
            Help the community discover great tools by submitting a product
          </p>
          
          {isSubmitted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Submission Received</CardTitle>
                </div>
                <CardDescription>
                  Thank you for your contribution to the community!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTitle>What happens next?</AlertTitle>
                  <AlertDescription>
                    Our team will review your submission and publish it if it meets our guidelines.
                    You'll receive an email notification when the review is complete.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Submit Another
                  </Button>
                  <Button>View Your Submissions</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Please provide details about the product you're submitting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
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
                            <FormLabel>Website</FormLabel>
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
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="wallet">Wallet</SelectItem>
                                <SelectItem value="defi">DeFi</SelectItem>
                                <SelectItem value="nft">NFT</SelectItem>
                                <SelectItem value="dao">DAO</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
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
                            <FormLabel>Pricing Model</FormLabel>
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
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe what this product does" 
                              className="min-h-[100px]"
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
                          <FormLabel>Use Case</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How and why would someone use this product?" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="email@example.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            We'll notify you when your submission is reviewed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Product
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
