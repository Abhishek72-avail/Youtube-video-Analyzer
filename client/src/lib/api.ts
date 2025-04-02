import { apiRequest } from "./queryClient";
import { VideoAnalysis } from "./types";
import { extractVideoId } from "./utils";

export async function analyzeVideo(
  url: string, 
  options: { commentCount: number; deepAnalysis: boolean }
): Promise<string> {
  const videoId = extractVideoId(url);
  
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }
  
  const response = await apiRequest("POST", "/api/analyze", {
    videoId,
    commentCount: options.commentCount,
    deepAnalysis: options.deepAnalysis,
  });
  
  const data = await response.json();
  return data.videoId;
}

export async function getAnalysisProgress(videoId: string): Promise<number> {
  const response = await fetch(`/api/analyze/${videoId}/progress`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to get analysis progress");
  }
  
  const data = await response.json();
  return data.progress;
}

export async function getVideoAnalysis(videoId: string): Promise<VideoAnalysis> {
  const response = await fetch(`/api/analyze/${videoId}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to get video analysis");
  }
  
  return await response.json();
}
