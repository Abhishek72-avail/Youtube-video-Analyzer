import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Reply } from "lucide-react";
import { Comment, SentimentType } from "@/lib/types";
import { getElapsedTime, formatNumber } from "@/lib/utils";

interface KeyCommentsCardProps {
  comments: Comment[];
}

export default function KeyCommentsCard({ comments }: KeyCommentsCardProps) {
  const [visibleComments, setVisibleComments] = useState(3);
  
  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 3, comments.length));
  };
  
  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "Positive": return "bg-[hsl(var(--positive-color))]";
      case "Neutral": return "bg-[hsl(var(--neutral-color))]";
      case "Negative": return "bg-[hsl(var(--negative-color))]";
      default: return "bg-gray-500";
    }
  };
  
  const getBorderColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "Positive": return "border-[hsl(var(--positive-color))]";
      case "Neutral": return "border-[hsl(var(--neutral-color))]";
      case "Negative": return "border-[hsl(var(--negative-color))]";
      default: return "border-gray-300";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Comments</h2>
        
        <div className="space-y-4">
          {comments.slice(0, visibleComments).map((comment) => (
            <div 
              key={comment.id} 
              className={`border-l-4 ${getBorderColor(comment.sentiment)} p-4 bg-gray-50 rounded-r-lg`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={comment.authorProfileImageUrl} 
                    alt={comment.authorDisplayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a default avatar if image fails to load
                      (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + comment.authorDisplayName;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.authorDisplayName}</span>
                    <span className="text-xs text-gray-500">{getElapsedTime(comment.publishedAt)}</span>
                    <Badge className={`${getSentimentColor(comment.sentiment)} text-white`}>
                      {comment.sentiment}
                    </Badge>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <ThumbsUp className="mr-1 h-3 w-3" /> {formatNumber(comment.likeCount)}
                    </span>
                    <span className="flex items-center">
                      <Reply className="mr-1 h-3 w-3" /> {comment.replyCount} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {visibleComments < comments.length && (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={loadMoreComments}
            >
              Load More Comments
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
