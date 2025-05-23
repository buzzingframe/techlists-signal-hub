
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import * as React from "react";
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip 
} from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

export function AdminStats() {
  // Mock stats data
  const stats = {
    pendingProducts: 12,
    pendingProductsChange: 3,
    flaggedReviews: 5,
    flaggedReviewsChange: -2,
    weeklySubmissions: 28,
    weeklySubmissionsChange: 6,
    activeLists: 8,
    activeListsChange: 1,
  };

  // Mock chart data for submissions over time
  const submissionsChartData = [
    { name: "Mon", submissions: 4 },
    { name: "Tue", submissions: 6 },
    { name: "Wed", submissions: 8 },
    { name: "Thu", submissions: 3 },
    { name: "Fri", submissions: 5 },
    { name: "Sat", submissions: 1 },
    { name: "Sun", submissions: 2 },
  ];

  const categoryChartData = [
    { category: "Wallet", count: 12 },
    { category: "DeFi", count: 24 },
    { category: "NFT", count: 18 },
    { category: "DAO", count: 9 },
    { category: "Dev", count: 15 },
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Products Pending"
          value={stats.pendingProducts}
          change={stats.pendingProductsChange}
          description="Waiting for review"
        />
        <StatCard
          title="Reviews Flagged"
          value={stats.flaggedReviews}
          change={stats.flaggedReviewsChange}
          description="Needs moderation"
        />
        <StatCard
          title="Weekly Submissions"
          value={stats.weeklySubmissions}
          change={stats.weeklySubmissionsChange}
          description="Last 7 days"
        />
        <StatCard
          title="Active Lists"
          value={stats.activeLists}
          change={stats.activeListsChange}
          description="Published curated lists"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Submissions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="aspect-[4/3]"
              config={{
                submissions: {
                  label: "Submissions",
                  color: "#2563eb",
                }
              }}
            >
              <RechartsLineChart data={submissionsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="var(--color-submissions, #2563eb)" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }}
                />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="aspect-[4/3]"
              config={{
                count: {
                  label: "Products",
                  color: "#8b5cf6",
                }
              }}
            >
              <RechartsBarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-count, #8b5cf6)" 
                  radius={[4, 4, 0, 0]} 
                />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  description: string;
}

function StatCard({ title, value, change, description }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            {Math.abs(change)}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
