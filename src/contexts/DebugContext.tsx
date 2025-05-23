
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DebugState {
  isDebugMode: boolean;
  isPanelOpen: boolean;
  errors: DebugError[];
  networkRequests: NetworkRequest[];
  performanceMetrics: PerformanceMetric[];
  componentRenders: ComponentRender[];
}

interface DebugError {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  component?: string;
  type: 'error' | 'warning' | 'info';
}

interface NetworkRequest {
  id: string;
  timestamp: Date;
  url: string;
  method: string;
  status?: number;
  duration?: number;
  error?: string;
}

interface PerformanceMetric {
  id: string;
  timestamp: Date;
  name: string;
  value: number;
  unit: string;
}

interface ComponentRender {
  id: string;
  timestamp: Date;
  component: string;
  props?: any;
  renderTime: number;
}

interface DebugContextType extends DebugState {
  togglePanel: () => void;
  addError: (error: Omit<DebugError, 'id' | 'timestamp'>) => void;
  addNetworkRequest: (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => void;
  addPerformanceMetric: (metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) => void;
  addComponentRender: (render: Omit<ComponentRender, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

interface DebugProviderProps {
  children: ReactNode;
}

export function DebugProvider({ children }: DebugProviderProps) {
  // Only enable debug mode in development
  const isDebugMode = import.meta.env.DEV;
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [errors, setErrors] = useState<DebugError[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [componentRenders, setComponentRenders] = useState<ComponentRender[]>([]);

  // Keyboard shortcut handler
  useEffect(() => {
    if (!isDebugMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setIsPanelOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDebugMode]);

  // Error boundary integration
  useEffect(() => {
    if (!isDebugMode) return;

    const handleError = (event: ErrorEvent) => {
      addError({
        message: event.message,
        stack: event.error?.stack,
        type: 'error'
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      addError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        type: 'error'
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isDebugMode]);

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const togglePanel = () => setIsPanelOpen(prev => !prev);

  const addError = (error: Omit<DebugError, 'id' | 'timestamp'>) => {
    if (!isDebugMode) return;
    const newError: DebugError = {
      ...error,
      id: generateId(),
      timestamp: new Date()
    };
    setErrors(prev => [newError, ...prev].slice(0, 100)); // Keep last 100 errors
  };

  const addNetworkRequest = (request: Omit<NetworkRequest, 'id' | 'timestamp'>) => {
    if (!isDebugMode) return;
    const newRequest: NetworkRequest = {
      ...request,
      id: generateId(),
      timestamp: new Date()
    };
    setNetworkRequests(prev => [newRequest, ...prev].slice(0, 50)); // Keep last 50 requests
  };

  const addPerformanceMetric = (metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) => {
    if (!isDebugMode) return;
    const newMetric: PerformanceMetric = {
      ...metric,
      id: generateId(),
      timestamp: new Date()
    };
    setPerformanceMetrics(prev => [newMetric, ...prev].slice(0, 100));
  };

  const addComponentRender = (render: Omit<ComponentRender, 'id' | 'timestamp'>) => {
    if (!isDebugMode) return;
    const newRender: ComponentRender = {
      ...render,
      id: generateId(),
      timestamp: new Date()
    };
    setComponentRenders(prev => [newRender, ...prev].slice(0, 100));
  };

  const clearLogs = () => {
    setErrors([]);
    setNetworkRequests([]);
    setPerformanceMetrics([]);
    setComponentRenders([]);
  };

  const value: DebugContextType = {
    isDebugMode,
    isPanelOpen,
    errors,
    networkRequests,
    performanceMetrics,
    componentRenders,
    togglePanel,
    addError,
    addNetworkRequest,
    addPerformanceMetric,
    addComponentRender,
    clearLogs
  };

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
}
