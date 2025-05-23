
import { useEffect, useRef } from 'react';
import { useDebug } from '@/contexts/DebugContext';

export function useDebugComponentMonitor(componentName: string, props?: any) {
  const debug = useDebug();
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    if (!debug.isDebugMode) return;

    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    if (!debug.isDebugMode) return;

    const renderTime = Math.round(performance.now() - renderStartTime.current);
    
    debug.addComponentRender({
      component: componentName,
      props: props ? Object.keys(props) : undefined,
      renderTime
    });
  });

  // Log component mount/unmount
  useEffect(() => {
    if (!debug.isDebugMode) return;

    debug.addPerformanceMetric({
      name: `${componentName} - Mount`,
      value: 1,
      unit: 'mount'
    });

    return () => {
      debug.addPerformanceMetric({
        name: `${componentName} - Unmount`,
        value: 1,
        unit: 'unmount'
      });
    };
  }, [componentName, debug]);
}
