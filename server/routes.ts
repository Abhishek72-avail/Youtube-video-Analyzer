import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { YoutubeService } from "./services/youtube";
import { SentimentService } from "./services/sentiment";

// Validate request schema for analysis
const analyzeSchema = z.object({
  videoId: z.string().min(1),
  commentCount: z.number().int().min(1).max(1000).default(100),
  deepAnalysis: z.boolean().default(false)
});

// YouTube service for fetching video data
const youtubeService = new YoutubeService();
// Sentiment analysis service
const sentimentService = new SentimentService();

// Map to track analysis progress
const analysisProgress = new Map<string, number>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Start video analysis
  app.post('/api/analyze', async (req, res) => {
    try {
      const validated = analyzeSchema.parse(req.body);
      const { videoId, commentCount, deepAnalysis } = validated;

      // Initialize progress tracking
      analysisProgress.set(videoId, 0);

      // Start analysis in background
      analyzeVideoBackground(videoId, commentCount, deepAnalysis);

      res.status(202).json({ videoId, message: "Analysis started" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error starting analysis:", error);
        res.status(500).json({ error: "Failed to start analysis" });
      }
    }
  });

  // Get analysis progress
  app.get('/api/analyze/:videoId/progress', (req, res) => {
    const { videoId } = req.params;
    const progress = analysisProgress.get(videoId) || 0;
    res.json({ videoId, progress });
  });

  // Get analysis results
  app.get('/api/analyze/:videoId', async (req, res) => {
    try {
      const { videoId } = req.params;
      const analysis = await storage.getVideoAnalysis(videoId);

      if (!analysis) {
        // If analysis is not complete or doesn't exist
        const progress = analysisProgress.get(videoId) || 0;
        if (progress < 100) {
          return res.status(202).json({ 
            videoId, 
            message: "Analysis in progress", 
            progress 
          });
        }
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ error: "Failed to fetch analysis results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to perform the video analysis in the background
async function analyzeVideoBackground(
  videoId: string, 
  commentCount: number,
  deepAnalysis: boolean
): Promise<void> {
  try {
    // Update progress to 10%
    analysisProgress.set(videoId, 10);
    
    // Fetch video details
    const videoDetails = await youtubeService.getVideoDetails(videoId);
    analysisProgress.set(videoId, 20);
    
    // Fetch comments
    const comments = await youtubeService.getVideoComments(videoId, commentCount);
    analysisProgress.set(videoId, 40);
    
    // Analyze sentiment of comments
    const commentSentiment = await sentimentService.analyzeComments(comments, deepAnalysis);
    analysisProgress.set(videoId, 60);
    
    // Get engagement metrics
    const engagementMetrics = youtubeService.calculateEngagementMetrics(videoDetails, comments);
    analysisProgress.set(videoId, 70);
    
    // Get final recommendation
    const recommendation = sentimentService.generateRecommendation(commentSentiment, engagementMetrics);
    analysisProgress.set(videoId, 80);
    
    // Get top comments
    const topComments = sentimentService.getTopComments(comments, commentSentiment);
    analysisProgress.set(videoId, 90);
    
    // Store complete analysis
    await storage.saveVideoAnalysis({
      videoId,
      videoDetails,
      sentimentAnalysis: commentSentiment,
      topComments,
      engagementMetrics,
      recommendation
    });
    
    // Mark as complete
    analysisProgress.set(videoId, 100);
  } catch (error) {
    console.error(`Error analyzing video ${videoId}:`, error);
    // Set progress to -1 to indicate error
    analysisProgress.set(videoId, -1);
  }
}
