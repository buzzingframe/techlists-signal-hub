
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center overflow-hidden isolate">
      {/* Background Effects (with isolation) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 -z-10" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            🚀 Now featuring 500+ Web3 tools
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            No Hype.
            <br />
            Just Honest Web3 Tools.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover, compare, and choose the best Web3 tools based on real user feedback, 
            expert reviews, and transparency metrics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
            >
              Explore Today's Signals
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>500+ Tools Reviewed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Real-time Signals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Community Driven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
