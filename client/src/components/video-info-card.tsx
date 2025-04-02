import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, MessagesSquare, ThumbsUp } from "lucide-react";
import { formatNumber, getElapsedTime, formatDuration } from "@/lib/utils";
import { VideoDetails, SentimentAnalysis, Recommendation } from "@/lib/types";

interface VideoInfoCardProps {
  videoDetails: VideoDetails;
  recommendation: Recommendation;
  sentimentAnalysis: SentimentAnalysis;
}

export default function VideoInfoCard({ 
  videoDetails, 
  recommendation, 
  sentimentAnalysis 
}: VideoInfoCardProps) {
  const getBadgeColor = (verdict: string) => {
    switch (verdict) {
      case "Highly Recommended": return "bg-[hsl(var(--positive-color))]";
      case "Neutral": return "bg-[hsl(var(--neutral-color))]";
      case "Not Recommended": return "bg-[hsl(var(--negative-color))]";
      default: return "bg-primary";
    }
  };

  const positivePercent = Math.round(sentimentAnalysis.positive * 100);
  const neutralPercent = Math.round(sentimentAnalysis.neutral * 100);
  const negativePercent = Math.round(sentimentAnalysis.negative * 100);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="sm:w-48 h-28 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={videoDetails.thumbnailUrl} 
                alt={videoDetails.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                {videoDetails.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{videoDetails.channelTitle}</span>
                <span className="mx-2">•</span>
                <span>{formatNumber(videoDetails.viewCount)} views • {getElapsedTime(videoDetails.publishedAt)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{formatNumber(videoDetails.likeCount)}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <MessagesSquare className="h-3.5 w-3.5" />
                  <span>{formatNumber(videoDetails.commentCount)}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDuration(videoDetails.duration)}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-6 border-t border-indigo-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-700 mb-1">Overall Recommendation</h3>
              <div className="flex items-center">
                <div className={`${getBadgeColor(recommendation.verdict)} text-white font-medium rounded-full px-4 py-1 text-sm flex items-center`}>
                  {recommendation.verdict === "Highly Recommended" && (
                    <ThumbsUp className="mr-1.5 h-4 w-4" />
                  )}
                  {recommendation.verdict === "Not Recommended" && (
                    <ThumbsUp className="mr-1.5 h-4 w-4 rotate-180" />
                  )}
                  {recommendation.verdict === "Neutral" && (
                    <BarChart3 className="mr-1.5 h-4 w-4" />
                  )}
                  {recommendation.verdict}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{positivePercent}%</div>
                <div className="text-xs text-gray-500">Positive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{neutralPercent}%</div>
                <div className="text-xs text-gray-500">Neutral</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{negativePercent}%</div>
                <div className="text-xs text-gray-500">Negative</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
