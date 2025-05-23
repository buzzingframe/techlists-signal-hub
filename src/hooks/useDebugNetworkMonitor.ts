
import { useEffect } from 'react';
import { useDebug } from '@/contexts/DebugContext';

export function useDebugNetworkMonitor() {
  const debug = useDebug();

  useEffect(() => {
    if (!debug.isDebugMode) return;

    // Intercept fetch requests
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const [url, options] = args;
      const method = options?.method || 'GET';
      
      try {
        const response = await originalFetch(...args);
        const duration = Math.round(performance.now() - startTime);
        
        debug.addNetworkRequest({
          url: url.toString(),
          method,
          status: response.status,
          duration
        });
        
        return response;
      } catch (error) {
        const duration = Math.round(performance.now() - startTime);
        
        debug.addNetworkRequest({
          url: url.toString(),
          method,
          duration,
          error: error instanceof Error ? error.message : 'Network error'
        });
        
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [debug]);
}
