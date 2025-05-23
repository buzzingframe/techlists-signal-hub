
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Info, Pencil, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Define the review schema with Zod
const reviewSchema = z.object({
  score: z.number().min(1).max(10),
  pros: z.string().min(10, { message: "Please provide at least 10 characters about what you liked" }),
  cons: z.string().min(10, { message: "Please provide at least 10 characters about what didn't work" }),
  verdict: z.string().optional(),
  reviewerType: z.enum([
    "web3_developer", 
    "founder", 
    "power_user", 
    "casual_user", 
    "reviewer"
  ]),
  pricingFeedback: z.enum([
    "got_free", 
    "paid", 
    "would_pay", 
    "not_worth"
  ]),
  comparedProduct: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewModalProps {
  productId: string;
  productName: string;
  onReviewSubmitted?: () => void;
}

export function ReviewModal({ productId, productName, onReviewSubmitted }: ReviewModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Set up form with Zod schema
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      score: 7,
      pros: "",
      cons: "",
      verdict: "",
      reviewerType: "power_user",
      pricingFeedback: "would_pay",
      comparedProduct: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: ReviewFormValues) => {
    try {
      // Here you would submit the review to Supabase
      // const { error } = await supabase.from('reviews').insert({
      //   product_id: productId,
      //   score: data.score,
      //   pros: data.pros,
      //   cons: data.cons,
      //   verdict: data.verdict,
      //   reviewer_type: data.reviewerType,
      //   pricing_feedback: data.pricingFeedback,
      //   compared_product: data.comparedProduct,
      //   status: 'needs_moderation' // or 'active' if auto-approved
      // });
      
      // if (error) throw error;

      // Success notification
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your feedback.",
      });

      // Close the modal and reset form
      setOpen(false);
      form.reset();
      
      // Trigger callback if provided
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was a problem submitting your review.",
      });
    }
  };

  // Format the score as a number with one decimal place
  const formattedScore = (form.watch("score") / 2).toFixed(1);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Write Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Review {productName}</DialogTitle>
          <DialogDescription>
            Share your honest feedback to help others make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Score Input */}
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="flex items-center">
                      Rating
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 p-0 ml-1">
                            <Info className="h-3 w-3" />
                            <span className="sr-only">Rating info</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <p className="text-sm text-muted-foreground">
                            This rating will influence the product's overall Signal Score.
                            <br />1 = Poor, 10 = Excellent
                          </p>
                        </PopoverContent>
                      </Popover>
                    </FormLabel>
                    <div className="text-lg font-semibold bg-primary/10 px-3 py-1 rounded-md text-primary">
                      {formattedScore} / 5
                    </div>
                  </div>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Slider 
                        defaultValue={[field.value]} 
                        min={1} 
                        max={10} 
                        step={1} 
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pros */}
            <FormField
              control={form.control}
              name="pros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" /> 
                    What did you like?
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Great user experience, intuitive interface..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cons */}
            <FormField
              control={form.control}
              name="cons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4 text-red-500" /> 
                    What didn't work?
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Limited integrations, slow performance..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Final Verdict */}
            <FormField
              control={form.control}
              name="verdict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" /> 
                    Final Verdict (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="One-line takeaway (e.g., 'Great for small DAOs, but limited integrations.')" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reviewer Type */}
              <FormField
                control={form.control}
                name="reviewerType"
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
                        <SelectItem value="web3_developer">Web3 Developer</SelectItem>
                        <SelectItem value="founder">Founder / Project Lead</SelectItem>
                        <SelectItem value="power_user">Power User</SelectItem>
                        <SelectItem value="casual_user">Casual User</SelectItem>
                        <SelectItem value="reviewer">Reviewer (admin)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing Feedback */}
              <FormField
                control={form.control}
                name="pricingFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Feedback</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing feedback" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="got_free">Got it for free</SelectItem>
                        <SelectItem value="paid">Paid for it</SelectItem>
                        <SelectItem value="would_pay">Would pay for it</SelectItem>
                        <SelectItem value="not_worth">Not worth the price</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Compared Product */}
            <FormField
              control={form.control}
              name="comparedProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compared to (optional)</FormLabel>
                  <FormControl>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Product name..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Compared to another product you've used
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mt-4">
                Cancel
              </Button>
              <Button type="submit" className="mt-4">
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
