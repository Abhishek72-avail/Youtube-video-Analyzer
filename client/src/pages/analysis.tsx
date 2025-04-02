import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/header";
import Footer from "@/components/footer";
import LoadingState from "@/components/loading-state";
import VideoInfoCard from "@/components/video-info-card";
import SentimentAnalysisCard from "@/components/sentiment-analysis-card";
import KeyCommentsCard from "@/components/key-comments-card";
import EngagementMetricsCard from "@/components/engagement-metrics-card";

import { getVideoAnalysis, getAnalysisProgress } from "@/lib/api";
import { VideoAnalysis } from "@/lib/types";

export default function Analysis() {
  const [_, params] = useRoute<{ videoId: string }>('/analysis/:videoId');
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isPolling, setIsPolling] = useState(true);

  const videoId = params?.videoId || '';

  // Poll for analysis progress
  useEffect(() => {
    if (!videoId || !isPolling) return;

    const checkProgress = async () => {
      try {
        const currentProgress = await getAnalysisProgress(videoId);
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          setIsPolling(false);
        }
      } catch (error) {
        console.error("Error checking progress:", error);
      }
    };

    checkProgress();
    const interval = setInterval(checkProgress, 2000);
    
    return () => clearInterval(interval);
  }, [videoId, isPolling]);

  // Fetch analysis results when ready
  const { data: analysis, isLoading, error } = useQuery<VideoAnalysis>({
    queryKey: [`/api/analyze/${videoId}`],
    enabled: !isPolling,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load analysis results. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const isComplete = !isPolling && !isLoading && analysis;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(isPolling || isLoading) && (
            <LoadingState progress={progress} />
          )}
          
          {isComplete && analysis && (
            <div className="space-y-8">
              <VideoInfoCard 
                videoDetails={analysis.videoDetails} 
                recommendation={analysis.recommendation}
                sentimentAnalysis={analysis.sentimentAnalysis}
              />
              
              <SentimentAnalysisCard 
                sentimentAnalysis={analysis.sentimentAnalysis} 
              />
              
              <KeyCommentsCard 
                comments={analysis.topComments} 
              />
              
              <EngagementMetricsCard 
                metrics={analysis.engagementMetrics} 
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
