
import React from 'react';
import { useDebug } from '@/contexts/DebugContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Bug, Network, Gauge, Database } from 'lucide-react';

export function DebugPanel() {
  const debug = useDebug();

  if (!debug.isDebugMode || !debug.isPanelOpen) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getErrorTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-gray-500';
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 400) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-background border border-border rounded-lg shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bug className="h-4 w-4" />
          <span className="font-semibold text-sm">Debug Panel</span>
          <Badge variant="secondary" className="text-xs">DEV</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={debug.clearLogs}
            className="h-6 px-2 text-xs"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={debug.togglePanel}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="errors" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 h-8">
          <TabsTrigger value="errors" className="text-xs flex items-center gap-1">
            <Bug className="h-3 w-3" />
            Errors ({debug.errors.length})
          </TabsTrigger>
          <TabsTrigger value="network" className="text-xs flex items-center gap-1">
            <Network className="h-3 w-3" />
            Network ({debug.networkRequests.length})
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            Perf ({debug.performanceMetrics.length})
          </TabsTrigger>
          <TabsTrigger value="state" className="text-xs flex items-center gap-1">
            <Database className="h-3 w-3" />
            State
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="errors" className="h-full m-0">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-2">
                {debug.errors.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No errors logged</p>
                ) : (
                  debug.errors.map((error) => (
                    <Card key={error.id} className="p-2">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full ${getErrorTypeColor(error.type)} mt-1`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <Badge variant={error.type === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                              {error.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{formatTime(error.timestamp)}</span>
                          </div>
                          <p className="text-xs font-mono break-words">{error.message}</p>
                          {error.component && (
                            <p className="text-xs text-muted-foreground mt-1">Component: {error.component}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="network" className="h-full m-0">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-2">
                {debug.networkRequests.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No network requests logged</p>
                ) : (
                  debug.networkRequests.map((request) => (
                    <Card key={request.id} className="p-2">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(request.status)} mt-1`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{request.method}</Badge>
                              {request.status && (
                                <Badge variant={request.status >= 400 ? 'destructive' : 'secondary'} className="text-xs">
                                  {request.status}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{formatTime(request.timestamp)}</span>
                          </div>
                          <p className="text-xs font-mono break-all">{request.url}</p>
                          {request.duration && (
                            <p className="text-xs text-muted-foreground mt-1">{request.duration}ms</p>
                          )}
                          {request.error && (
                            <p className="text-xs text-red-500 mt-1">{request.error}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="performance" className="h-full m-0">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-2">
                {debug.performanceMetrics.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No performance metrics logged</p>
                ) : (
                  debug.performanceMetrics.map((metric) => (
                    <Card key={metric.id} className="p-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-medium">{metric.name}</span>
                        <span className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono">{metric.value} {metric.unit}</span>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="state" className="h-full m-0">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-2">
                <Card className="p-2">
                  <h4 className="text-xs font-medium mb-2">Component Renders</h4>
                  {debug.componentRenders.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No component renders logged</p>
                  ) : (
                    <div className="space-y-1">
                      {debug.componentRenders.slice(0, 5).map((render) => (
                        <div key={render.id} className="flex items-center justify-between">
                          <span className="text-xs">{render.component}</span>
                          <span className="text-xs text-muted-foreground">{render.renderTime}ms</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
                
                <Card className="p-2">
                  <h4 className="text-xs font-medium mb-2">Debug Info</h4>
                  <div className="space-y-1 text-xs">
                    <div>Mode: Development</div>
                    <div>Panel Open: {debug.isPanelOpen ? 'Yes' : 'No'}</div>
                    <div>Total Errors: {debug.errors.length}</div>
                    <div>Network Requests: {debug.networkRequests.length}</div>
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      <div className="p-2 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Press Ctrl+Shift+D to toggle panel
        </p>
      </div>
    </div>
  );
}
