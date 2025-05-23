
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MultiStepFormProps {
  steps: {
    title: string;
    component: React.ReactNode;
  }[];
  onSubmit: () => void;
  isSubmitting?: boolean;
  canProceed: boolean[];
}

export function MultiStepForm({ steps, onSubmit, isSubmitting, canProceed }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const goNext = () => {
    if (currentStep < steps.length - 1 && canProceed[currentStep]) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="min-h-[400px]">
          {steps[currentStep].component}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {isLastStep ? (
            <Button 
              onClick={onSubmit} 
              disabled={!canProceed[currentStep] || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Product"}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!canProceed[currentStep]}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
