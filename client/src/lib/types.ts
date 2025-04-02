export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export interface VideoAnalysis {
  videoId: string;
  videoDetails: VideoDetails;
  sentimentAnalysis: SentimentAnalysis;
  topComments: Comment[];
  engagementMetrics: EngagementMetrics;
  recommendation: Recommendation;
}

export interface VideoDetails {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  duration: number;
}

export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
  positiveFeedback: string;
  neutralFeedback: string;
  negativeFeedback: string;
}

export interface Comment {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  publishedAt: string;
  text: string;
  likeCount: number;
  replyCount: number;
  sentiment: SentimentType;
}

export interface EngagementMetrics {
  engagementRate: number;
  engagementRateAvgDiff: number;
  likeToViewRatio: number;
  likeToViewRatioAvgDiff: number;
  commentToViewRatio: number;
  commentToViewRatioAvgDiff: number;
  audienceRetention: number;
  audienceRetentionStatus: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    subscriptions: number;
  };
}

export interface Recommendation {
  verdict: 'Highly Recommended' | 'Neutral' | 'Not Recommended';
  score: number;
}
