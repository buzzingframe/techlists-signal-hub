
import { useState } from 'react';
import { useDebug } from '@/contexts/DebugContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Bug, Network, BarChart3, Settings, Trash2, Eye, EyeOff } from 'lucide-react';

export function DebugPanel() {
  const debug = useDebug();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!debug.isDebugMode || !debug.isPanelOpen) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] w-96 max-h-[80vh] bg-background border border-border rounded-lg shadow-2xl">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Debug Panel
              <Badge variant="outline" className="text-xs">DEV</Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={debug.clearLogs}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={debug.togglePanel}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-2">
            <Tabs defaultValue="errors" className="h-full">
              <TabsList className="grid w-full grid-cols-4 text-xs">
                <TabsTrigger value="errors" className="text-xs">
                  Errors {debug.errors.length > 0 && (
                    <Badge variant="destructive" className="ml-1 text-xs px-1">
                      {debug.errors.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="network" className="text-xs">
                  Network {debug.networkRequests.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs px-1">
                      {debug.networkRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="performance" className="text-xs">
                  Perf
                </TabsTrigger>
                <TabsTrigger value="state" className="text-xs">
                  State
                </TabsTrigger>
              </TabsList>

              <TabsContent value="errors" className="mt-2">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {debug.errors.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No errors logged
                      </p>
                    ) : (
                      debug.errors.map((error) => (
                        <div key={error.id} className="p-2 border rounded text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <Badge 
                              variant={error.type === 'error' ? 'destructive' : 
                                     error.type === 'warning' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {error.type}
                            </Badge>
                            <span className="text-muted-foreground text-xs">
                              {formatTime(error.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs break-words">{error.message}</p>
                          {error.component && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Component: {error.component}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="network" className="mt-2">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {debug.networkRequests.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No network requests logged
                      </p>
                    ) : (
                      debug.networkRequests.map((request) => (
                        <div key={request.id} className="p-2 border rounded text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {request.method}
                              </Badge>
                              {request.status && (
                                <Badge 
                                  variant={request.status < 400 ? 'default' : 'destructive'}
                                  className="text-xs"
                                >
                                  {request.status}
                                </Badge>
                              )}
                            </div>
                            <span className="text-muted-foreground text-xs">
                              {formatTime(request.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs break-all mb-1">{request.url}</p>
                          {request.duration && (
                            <p className="text-xs text-muted-foreground">
                              Duration: {request.duration}ms
                            </p>
                          )}
                          {request.error && (
                            <p className="text-xs text-destructive">
                              Error: {request.error}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="performance" className="mt-2">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {debug.performanceMetrics.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No performance metrics logged
                      </p>
                    ) : (
                      debug.performanceMetrics.map((metric) => (
                        <div key={metric.id} className="p-2 border rounded text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{metric.name}</span>
                            <span className="text-muted-foreground text-xs">
                              {formatTime(metric.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs">
                            {metric.value} {metric.unit}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="state" className="mt-2">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    <div className="p-2 border rounded text-xs">
                      <h4 className="font-medium mb-2">Current Environment</h4>
                      <div className="space-y-1">
                        <p>Mode: {import.meta.env.MODE}</p>
                        <p>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
                        <p>URL: {window.location.pathname}</p>
                        <p>User Agent: {navigator.userAgent.slice(0, 50)}...</p>
                      </div>
                    </div>
                    
                    <div className="p-2 border rounded text-xs">
                      <h4 className="font-medium mb-2">Component Renders</h4>
                      {debug.componentRenders.slice(0, 5).map((render) => (
                        <div key={render.id} className="mb-1">
                          <div className="flex justify-between">
                            <span>{render.component}</span>
                            <span>{render.renderTime}ms</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
