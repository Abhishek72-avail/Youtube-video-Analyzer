import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { EngagementMetrics } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, Heart, MessageCircle, Share2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EngagementMetricsCardProps {
  metrics: EngagementMetrics;
}

export default function EngagementMetricsCard({ metrics }: EngagementMetricsCardProps) {
  const chartData = [
    { name: "Likes", value: metrics.metrics.likes, icon: <Heart className="h-4 w-4" /> },
    { name: "Comments", value: metrics.metrics.comments, icon: <MessageCircle className="h-4 w-4" /> },
    { name: "Shares", value: metrics.metrics.shares, icon: <Share2 className="h-4 w-4" /> },
    { name: "Subs", value: metrics.metrics.subscriptions, icon: <UserPlus className="h-4 w-4" /> },
  ];

  // Determine overall performance status
  const getPerformanceStatus = () => {
    const avgDiff = metrics.engagementRateAvgDiff;
    if (avgDiff > 0.2) return { label: "Exceptional", color: "bg-green-500" };
    if (avgDiff > 0.05) return { label: "Good", color: "bg-green-400" };
    if (avgDiff > -0.05) return { label: "Average", color: "bg-yellow-400" };
    if (avgDiff > -0.2) return { label: "Below Average", color: "bg-orange-400" };
    return { label: "Poor", color: "bg-red-500" };
  };

  const performance = getPerformanceStatus();

  // Helper function to get progress bar colors
  const getProgressColor = (value: number) => {
    if (value > 75) return "bg-green-500";
    if (value > 50) return "bg-green-400";
    if (value > 25) return "bg-yellow-400";
    return "bg-red-400";
  };

  // Helper for diff badge
  const getDiffBadge = (diff: number, unit: string = "%") => {
    const isPositive = diff > 0;
    const classes = isPositive 
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
    
    return (
      <Badge variant="outline" className={`ml-2 ${classes}`}>
        {isPositive ? "+" : ""}{diff.toFixed(2)}{unit}
      </Badge>
    );
  };

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-lg font-bold text-primary">{formatNumber(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-primary to-red-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-6 w-6" />
            <h2 className="text-xl font-bold">Engagement Metrics</h2>
          </div>
          <Badge className={`${performance.color} text-white font-medium px-3`}>
            {performance.label}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <span>Engagement Breakdown</span>
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="url(#colorGradient)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-red-50 to-white p-5 rounded-xl border border-red-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Performance Metrics</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-800">Engagement Rate</span>
                      {metrics.engagementRateAvgDiff !== 0 && 
                        getDiffBadge(metrics.engagementRateAvgDiff * 100)
                      }
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {(metrics.engagementRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(metrics.engagementRate * 100)}`}
                      style={{ width: `${Math.min(100, metrics.engagementRate * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {metrics.engagementRateAvgDiff > 0 
                      ? `This video is outperforming the channel average` 
                      : `This video is underperforming compared to channel average`}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-800">Like-to-View Ratio</span>
                      {metrics.likeToViewRatioAvgDiff !== 0 && 
                        getDiffBadge(metrics.likeToViewRatioAvgDiff * 100)
                      }
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {(metrics.likeToViewRatio * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(metrics.likeToViewRatio * 100)}`}
                      style={{ width: `${Math.min(100, metrics.likeToViewRatio * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {metrics.likeToViewRatioAvgDiff === 0 
                      ? "Matches the average like ratio for this channel" 
                      : metrics.likeToViewRatioAvgDiff > 0 
                        ? `Audience is more engaged with likes than usual` 
                        : `Audience is less engaged with likes than usual`}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-800">Comment Engagement</span>
                      {metrics.commentToViewRatioAvgDiff !== 0 && 
                        getDiffBadge(metrics.commentToViewRatioAvgDiff * 100)
                      }
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {(metrics.commentToViewRatio * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(metrics.commentToViewRatio * 100 * 5)}`}
                      style={{ width: `${Math.min(100, metrics.commentToViewRatio * 100 * 5)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {metrics.commentToViewRatioAvgDiff > 0 
                      ? `Content is generating more discussion than usual` 
                      : `Content is generating less discussion than usual`}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">Audience Retention</span>
                    <span className="text-lg font-bold text-primary">{metrics.audienceRetention}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(metrics.audienceRetention)}`}
                      style={{ width: `${metrics.audienceRetention}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">{metrics.audienceRetentionStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
