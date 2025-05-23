
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface NetworkErrorProps {
  isOffline?: boolean;
  onRetry?: () => void;
  message?: string;
}

export function NetworkError({ isOffline, onRetry, message }: NetworkErrorProps) {
  if (isOffline) {
    return (
      <Alert className="border-destructive">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>No Internet Connection</AlertTitle>
        <AlertDescription className="mt-2">
          You're currently offline. Some features may not be available until your connection is restored.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="text-center py-8">
      <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
      <p className="text-muted-foreground mb-4">
        {message || "Unable to load data. Please check your internet connection and try again."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <Wifi className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
