import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EngagementMetrics } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface EngagementMetricsCardProps {
  metrics: EngagementMetrics;
}

export default function EngagementMetricsCard({ metrics }: EngagementMetricsCardProps) {
  const chartData = [
    { name: "Likes", value: metrics.metrics.likes },
    { name: "Comments", value: metrics.metrics.comments },
    { name: "Shares", value: metrics.metrics.shares },
    { name: "Subs", value: metrics.metrics.subscriptions },
  ];

  const formatTooltipValue = (value: number) => {
    return [formatNumber(value), 'Count'];
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Engagement Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={formatTooltipValue} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Key Metrics</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Engagement Rate</span>
                    <span className="text-sm font-medium text-primary">
                      {(metrics.engagementRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={metrics.engagementRate * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {metrics.engagementRateAvgDiff > 0 
                      ? `Above average by ${(metrics.engagementRateAvgDiff * 100).toFixed(1)}%` 
                      : `Below average by ${Math.abs(metrics.engagementRateAvgDiff * 100).toFixed(1)}%`}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Like-to-View Ratio</span>
                    <span className="text-sm font-medium text-primary">
                      {(metrics.likeToViewRatio * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={metrics.likeToViewRatio * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {metrics.likeToViewRatioAvgDiff === 0 
                      ? "Average for this channel" 
                      : metrics.likeToViewRatioAvgDiff > 0 
                        ? `Above average by ${(metrics.likeToViewRatioAvgDiff * 100).toFixed(1)}%` 
                        : `Below average by ${Math.abs(metrics.likeToViewRatioAvgDiff * 100).toFixed(1)}%`}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Comment-to-View Ratio</span>
                    <span className="text-sm font-medium text-primary">
                      {(metrics.commentToViewRatio * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Progress value={metrics.commentToViewRatio * 100 * 5} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {metrics.commentToViewRatioAvgDiff > 0 
                      ? `Above average by ${(metrics.commentToViewRatioAvgDiff * 100).toFixed(2)}%` 
                      : `Below average by ${Math.abs(metrics.commentToViewRatioAvgDiff * 100).toFixed(2)}%`}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Audience Retention</span>
                    <span className="text-sm font-medium text-primary">{metrics.audienceRetention}%</span>
                  </div>
                  <Progress value={metrics.audienceRetention} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{metrics.audienceRetentionStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
