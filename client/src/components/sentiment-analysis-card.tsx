import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { SentimentAnalysis } from "@/lib/types";

interface SentimentAnalysisCardProps {
  sentimentAnalysis: SentimentAnalysis;
}

export default function SentimentAnalysisCard({ 
  sentimentAnalysis 
}: SentimentAnalysisCardProps) {
  const positivePercent = Math.round(sentimentAnalysis.positive * 100);
  const neutralPercent = Math.round(sentimentAnalysis.neutral * 100);
  const negativePercent = Math.round(sentimentAnalysis.negative * 100);

  const chartData = [
    { name: "Positive", value: positivePercent },
    { name: "Neutral", value: neutralPercent },
    { name: "Negative", value: negativePercent },
  ];

  const COLORS = [
    "hsl(var(--positive-color))",
    "hsl(var(--neutral-color))",
    "hsl(var(--negative-color))",
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="w-full max-w-xs h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[hsl(var(--positive-color))] bg-opacity-10 p-4 rounded-lg border border-[hsl(var(--positive-color))] border-opacity-20">
              <h3 className="font-medium text-[hsl(var(--positive-color))] flex items-center mb-2">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Positive Feedback
              </h3>
              <p className="text-gray-700 text-sm">{sentimentAnalysis.positiveFeedback}</p>
            </div>
            
            <div className="bg-[hsl(var(--neutral-color))] bg-opacity-10 p-4 rounded-lg border border-[hsl(var(--neutral-color))] border-opacity-20">
              <h3 className="font-medium text-[hsl(var(--neutral-color))] flex items-center mb-2">
                <Minus className="mr-2 h-4 w-4" />
                Neutral Feedback
              </h3>
              <p className="text-gray-700 text-sm">{sentimentAnalysis.neutralFeedback}</p>
            </div>
            
            <div className="bg-[hsl(var(--negative-color))] bg-opacity-10 p-4 rounded-lg border border-[hsl(var(--negative-color))] border-opacity-20">
              <h3 className="font-medium text-[hsl(var(--negative-color))] flex items-center mb-2">
                <ThumbsDown className="mr-2 h-4 w-4" />
                Negative Feedback
              </h3>
              <p className="text-gray-700 text-sm">{sentimentAnalysis.negativeFeedback}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
