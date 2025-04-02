import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ThumbsUp, ThumbsDown, Minus, BarChart2 } from "lucide-react";
import { SentimentAnalysis } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

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

  // Enhanced color palette
  const COLORS = ["#4ade80", "#94a3b8", "#f87171"];
  
  // Get dominant sentiment for the header styling
  const dominantSentiment = [
    { type: "Positive", value: positivePercent },
    { type: "Neutral", value: neutralPercent },
    { type: "Negative", value: negativePercent },
  ].reduce((prev, current) => (prev.value > current.value) ? prev : current);
  
  // Determine the color for the header based on dominant sentiment
  const getHeaderColor = () => {
    switch(dominantSentiment.type) {
      case "Positive": return "from-green-500 to-green-600";
      case "Neutral": return "from-slate-500 to-slate-600";
      case "Negative": return "from-red-500 to-red-600";
      default: return "from-primary to-primary-dark";
    }
  };
  
  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium">{data.name} Sentiment</p>
          <p className="text-lg font-bold">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className={`bg-gradient-to-r ${getHeaderColor()} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="mr-2 h-6 w-6" />
            <h2 className="text-xl font-bold">Sentiment Analysis</h2>
          </div>
          <Badge className="bg-white text-gray-800 hover:bg-gray-100">
            {dominantSentiment.type} {dominantSentiment.value}%
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner flex items-center justify-center">
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
                    strokeWidth={2}
                    stroke="#ffffff"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index]} 
                        className="drop-shadow-md" 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center" 
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-green-700 flex items-center mb-2 text-lg">
                <ThumbsUp className="mr-2 h-5 w-5" />
                <span>Positive Feedback</span>
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                  {positivePercent}%
                </Badge>
              </h3>
              <p className="text-gray-700">{sentimentAnalysis.positiveFeedback}</p>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-5 rounded-xl border-l-4 border-slate-400 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-600 flex items-center mb-2 text-lg">
                <Minus className="mr-2 h-5 w-5" />
                <span>Neutral Feedback</span>
                <Badge variant="outline" className="ml-2 bg-slate-100 text-slate-700 border-slate-300">
                  {neutralPercent}%
                </Badge>
              </h3>
              <p className="text-gray-700">{sentimentAnalysis.neutralFeedback}</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-red-700 flex items-center mb-2 text-lg">
                <ThumbsDown className="mr-2 h-5 w-5" />
                <span>Negative Feedback</span>
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-300">
                  {negativePercent}%
                </Badge>
              </h3>
              <p className="text-gray-700">{sentimentAnalysis.negativeFeedback}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
