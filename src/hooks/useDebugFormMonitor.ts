
import { useEffect } from 'react';
import { useDebug } from '@/contexts/DebugContext';
import { UseFormReturn } from 'react-hook-form';

export function useDebugFormMonitor(form: UseFormReturn<any>, formName: string) {
  const debug = useDebug();

  useEffect(() => {
    if (!debug.isDebugMode) return;

    // Monitor form state changes
    const subscription = form.watch((data) => {
      debug.addPerformanceMetric({
        name: `${formName} - Form State Update`,
        value: Object.keys(data).length,
        unit: 'fields'
      });
    });

    // Monitor form errors
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      debug.addError({
        message: `Form validation errors in ${formName}`,
        component: formName,
        type: 'warning'
      });
    }

    return () => subscription.unsubscribe();
  }, [form, formName, debug]);

  // Helper to log form submission attempts
  const logFormSubmission = (isValid: boolean, values?: any) => {
    if (!debug.isDebugMode) return;

    debug.addPerformanceMetric({
      name: `${formName} - Submission Attempt`,
      value: isValid ? 1 : 0,
      unit: 'success'
    });

    if (!isValid) {
      debug.addError({
        message: `Form submission failed validation in ${formName}`,
        component: formName,
        type: 'warning'
      });
    }
  };

  return { logFormSubmission };
}
