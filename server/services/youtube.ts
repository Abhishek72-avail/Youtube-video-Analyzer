import { VideoDetails, Comment, EngagementMetrics } from "../../client/src/lib/types";

// YouTube API Client
export class YoutubeService {
  private apiKey: string;

  constructor() {
    // Get API key from environment
    this.apiKey = process.env.YOUTUBE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("YOUTUBE_API_KEY is not set. API requests will fail.");
    }
  }

  // Fetch video details from YouTube API
  async getVideoDetails(videoId: string): Promise<VideoDetails> {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error("Video not found");
      }
      
      const video = data.items[0];
      const snippet = video.snippet;
      const statistics = video.statistics;
      const contentDetails = video.contentDetails;
      
      // Parse duration from ISO 8601 format
      const duration = this.parseDuration(contentDetails.duration);
      
      return {
        id: video.id,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnailUrl: snippet.thumbnails.high.url,
        viewCount: parseInt(statistics.viewCount) || 0,
        likeCount: parseInt(statistics.likeCount) || 0,
        commentCount: parseInt(statistics.commentCount) || 0,
        publishedAt: snippet.publishedAt,
        duration // in seconds
      };
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw error;
    }
  }
  
  // Fetch comments from YouTube API
  async getVideoComments(videoId: string, maxResults: number = 100): Promise<Comment[]> {
    try {
      const comments: Comment[] = [];
      let nextPageToken: string | undefined = undefined;
      
      // Fetch comments in batches to respect maxResults
      while (comments.length < maxResults) {
        const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=100${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${this.apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          break;
        }
        
        // Map comment threads to our Comment type
        const fetchedComments = data.items.map((item: any) => {
          const snippet = item.snippet.topLevelComment.snippet;
          const replyCount = item.snippet.totalReplyCount || 0;
          
          return {
            id: item.id,
            authorDisplayName: snippet.authorDisplayName,
            authorProfileImageUrl: snippet.authorProfileImageUrl,
            publishedAt: snippet.publishedAt,
            text: snippet.textDisplay || snippet.textOriginal,
            likeCount: parseInt(snippet.likeCount) || 0,
            replyCount,
            sentiment: 'Neutral' // Default, will be determined by sentiment analysis
          };
        });
        
        comments.push(...fetchedComments);
        
        nextPageToken = data.nextPageToken;
        
        // Break if no more comments or we've reached our target
        if (!nextPageToken || comments.length >= maxResults) {
          break;
        }
      }
      
      // Trim to maxResults if we exceeded it
      return comments.slice(0, maxResults);
    } catch (error) {
      console.error("Error fetching video comments:", error);
      throw error;
    }
  }
  
  // Calculate engagement metrics based on video details and comments
  calculateEngagementMetrics(videoDetails: VideoDetails, comments: Comment[]): EngagementMetrics {
    // Calculate engagement rate (likes + comments) / views
    const engagementRate = (videoDetails.likeCount + videoDetails.commentCount) / videoDetails.viewCount;
    
    // Calculate like-to-view ratio
    const likeToViewRatio = videoDetails.likeCount / videoDetails.viewCount;
    
    // Calculate comment-to-view ratio
    const commentToViewRatio = videoDetails.commentCount / videoDetails.viewCount;
    
    // Estimate audience retention based on video length
    // This is an approximation since actual retention data requires channel owner access
    const durationMinutes = videoDetails.duration / 60;
    let audienceRetention = 0;
    
    if (durationMinutes <= 3) {
      // Short videos tend to have higher retention
      audienceRetention = 80;
    } else if (durationMinutes <= 10) {
      audienceRetention = 70;
    } else if (durationMinutes <= 20) {
      audienceRetention = 60;
    } else {
      audienceRetention = 50;
    }
    
    // Adjust retention based on engagement
    if (engagementRate > 0.1) {
      audienceRetention += 10;
    } else if (engagementRate > 0.05) {
      audienceRetention += 5;
    }
    
    // Cap retention at 95%
    audienceRetention = Math.min(audienceRetention, 95);
    
    // Estimate shares and subscriptions since these are not available via API
    const estimatedShares = Math.floor(videoDetails.viewCount * 0.003);
    const estimatedSubs = Math.floor(videoDetails.viewCount * 0.001);
    
    // Determine typical engagement rates for comparison
    // These values would ideally be calculated from channel averages
    const avgEngagementRate = 0.05;
    const avgLikeToViewRatio = 0.02;
    const avgCommentToViewRatio = 0.001;
    
    // Calculate differences from average
    const engagementRateAvgDiff = engagementRate - avgEngagementRate;
    const likeToViewRatioAvgDiff = likeToViewRatio - avgLikeToViewRatio;
    const commentToViewRatioAvgDiff = commentToViewRatio - avgCommentToViewRatio;
    
    return {
      engagementRate,
      engagementRateAvgDiff,
      likeToViewRatio,
      likeToViewRatioAvgDiff,
      commentToViewRatio,
      commentToViewRatioAvgDiff,
      audienceRetention,
      audienceRetentionStatus: audienceRetention > 70 ? "Strong retention rate" : "Average retention rate",
      metrics: {
        likes: videoDetails.likeCount,
        comments: videoDetails.commentCount,
        shares: estimatedShares,
        subscriptions: estimatedSubs
      }
    };
  }
  
  // Helper function to parse ISO 8601 duration to seconds
  private parseDuration(isoDuration: string): number {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    return hours * 3600 + minutes * 60 + seconds;
  }
}
