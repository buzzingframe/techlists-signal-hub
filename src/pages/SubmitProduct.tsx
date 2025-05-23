import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { submissionService, SubmissionWithMedia } from "@/services/submissionService";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "@/components/submission/MultiStepForm";
import { BasicInfoStep } from "@/components/submission/steps/BasicInfoStep";
import { MediaStep } from "@/components/submission/steps/MediaStep";
import { FeaturesStep } from "@/components/submission/steps/FeaturesStep";
import { ReviewStep } from "@/components/submission/steps/ReviewStep";
import { ProductFeature } from "@/components/submission/FeatureBuilder";
import { useDebugFormMonitor } from "@/hooks/useDebugFormMonitor";
import { useDebugComponentMonitor } from "@/hooks/useDebugComponentMonitor";
import { useDebug } from "@/contexts/DebugContext";

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  website: z.string().url("Please enter a valid URL."),
  category: z.string({ required_error: "Please select a category." }),
  description: z.string().min(10, "Description must be at least 10 characters."),
  useCase: z.string().min(10, "Use case must be at least 10 characters."),
  price: z.enum(["Free", "$", "$$", "Freemium"], {
    required_error: "Please select a pricing model.",
  }),
  email: z.string().email("Please enter a valid email address."),
  demoVideo: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  technicalDetails: z.string().optional(),
  integrations: z.string().optional(),
});

export default function SubmitProduct() {
  const { toast } = useToast();
  const debug = useDebug();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<ProductFeature[]>([]);

  // Debug monitoring
  useDebugComponentMonitor('SubmitProduct', { isSubmitting, isSubmitted });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      category: "",
      description: "",
      useCase: "",
      email: "",
      demoVideo: "",
      githubUrl: "",
      technicalDetails: "",
      integrations: "",
    },
  });

  // Debug form monitoring
  const { logFormSubmission } = useDebugFormMonitor(form, 'ProductSubmission');

  // Check if each step can proceed
  const canProceed: boolean[] = [
    // Step 1: Basic info - all required fields filled
    Boolean(form.watch("name") && form.watch("website") && form.watch("category") && 
    form.watch("description") && form.watch("useCase") && form.watch("price")),
    
    // Step 2: Media - no strict requirements, optional
    true,
    
    // Step 3: Features - no strict requirements, optional  
    true,
    
    // Step 4: Review - email is required
    Boolean(form.watch("email"))
  ];

  const steps = [
    {
      title: "Basic Information",
      component: <BasicInfoStep form={form} />
    },
    {
      title: "Media & Branding", 
      component: (
        <MediaStep 
          form={form}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
        />
      )
    },
    {
      title: "Features & Details",
      component: (
        <FeaturesStep 
          form={form}
          features={features}
          setFeatures={setFeatures}
        />
      )
    },
    {
      title: "Review & Submit",
      component: (
        <ReviewStep 
          form={form}
          logoFile={logoFile}
          mediaFiles={mediaFiles}
          features={features}
        />
      )
    }
  ];

  async function onSubmit() {
    const startTime = performance.now();
    
    if (!form.formState.isValid) {
      logFormSubmission(false);
      toast({
        variant: "destructive",
        title: "Form validation failed",
        description: "Please check all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const values = form.getValues();
      
      // Debug logging
      if (debug.isDebugMode) {
        debug.addPerformanceMetric({
          name: 'Submission - Data Preparation',
          value: Math.round(performance.now() - startTime),
          unit: 'ms'
        });
      }
      
      const submission: SubmissionWithMedia = {
        name: values.name,
        website: values.website,
        category: values.category,
        description: values.description,
        useCase: values.useCase,
        price: values.price,
        email: values.email,
        demoVideo: values.demoVideo || undefined,
        githubUrl: values.githubUrl || undefined,
        technicalDetails: values.technicalDetails || undefined,
        integrations: values.integrations || undefined,
        logoFile: logoFile || undefined,
        mediaFiles: mediaFiles.length > 0 ? mediaFiles : undefined,
        features: features.length > 0 ? features : undefined,
      };
      
      await submissionService.submitProduct(submission);
      
      const totalTime = Math.round(performance.now() - startTime);
      if (debug.isDebugMode) {
        debug.addPerformanceMetric({
          name: 'Submission - Total Time',
          value: totalTime,
          unit: 'ms'
        });
      }
      
      logFormSubmission(true, values);
      setIsSubmitted(true);
      toast({
        title: "Product submitted successfully",
        description: "Your product has been submitted for review and will appear in the admin dashboard.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      
      if (debug.isDebugMode) {
        debug.addError({
          message: `Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          component: 'SubmitProduct',
          type: 'error'
        });
      }
      
      logFormSubmission(false);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "There was a problem submitting your product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetForm = () => {
    setIsSubmitted(false);
    form.reset();
    setLogoFile(null);
    setMediaFiles([]);
    setFeatures([]);
    
    if (debug.isDebugMode) {
      debug.addPerformanceMetric({
        name: 'Form Reset',
        value: 1,
        unit: 'action'
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit a Product</h1>
            <p className="text-muted-foreground">
              Help the community discover great tools by submitting a product
            </p>
          </div>
          
          {isSubmitted ? (
            <Card className="max-w-2xl mx-auto">
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
                  <Button variant="outline" onClick={resetForm}>
                    Submit Another
                  </Button>
                  <Button>View Your Submissions</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <MultiStepForm
                steps={steps}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                canProceed={canProceed}
              />
            </Form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
