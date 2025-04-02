import { 
  Comment, 
  SentimentAnalysis,
  EngagementMetrics,
  Recommendation,
  SentimentType
} from "../../client/src/lib/types";

// Simple sentiment analysis service
export class SentimentService {
  // Analyze array of comments for sentiment
  async analyzeComments(comments: Comment[], deepAnalysis: boolean): Promise<SentimentAnalysis> {
    let positive = 0;
    let neutral = 0;
    let negative = 0;
    
    // Common positive words
    const positiveWords = [
      'good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'best', 'helpful',
      'clear', 'informative', 'useful', 'interesting', 'perfect', 'fantastic',
      'recommend', 'worth', 'enjoyed', 'thanks', 'thank you', 'bravo', 'liked',
      'appreciate', 'impressive', 'outstanding', 'superb', 'phenomenal', 'brilliant'
    ];
    
    // Common negative words
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor', 'useless',
      'boring', 'waste', 'confusing', 'disappointed', 'misleading', 'skip', 'dislike',
      'wrong', 'error', 'fail', 'problem', 'issue', 'difficult', 'sucks', 'clickbait',
      'annoying', 'frustrating', 'awful', 'stupid', 'disappointing'
    ];
    
    // For each comment, determine sentiment
    for (const comment of comments) {
      const text = comment.text.toLowerCase();
      let posScore = 0;
      let negScore = 0;
      
      // Simple rule-based sentiment analysis
      for (const word of positiveWords) {
        if (text.includes(word)) {
          posScore += 1;
        }
      }
      
      for (const word of negativeWords) {
        if (text.includes(word)) {
          negScore += 1;
        }
      }
      
      if (posScore > negScore) {
        comment.sentiment = 'Positive';
        positive++;
      } else if (negScore > posScore) {
        comment.sentiment = 'Negative';
        negative++;
      } else {
        comment.sentiment = 'Neutral';
        neutral++;
      }
      
      // If deep analysis is requested, use a more sophisticated approach
      if (deepAnalysis) {
        // In a real implementation, this would call an NLP service
        // For now, we'll simulate deeper analysis with a more nuanced approach
        
        // Context checks (often negation changes sentiment)
        if (text.includes('not good') || text.includes('not great')) {
          comment.sentiment = 'Negative';
          positive--;
          negative++;
        }
        
        // Check for intensity markers
        const intensifiers = ['very', 'really', 'extremely', 'absolutely'];
        const hasIntensifier = intensifiers.some(word => text.includes(word));
        
        if (hasIntensifier) {
          // Strengthen the existing sentiment
          if (comment.sentiment === 'Positive') {
            positive++;
          } else if (comment.sentiment === 'Negative') {
            negative++;
          }
        }
      }
    }
    
    // Calculate percentages
    const total = comments.length || 1; // Avoid division by zero
    const positiveRatio = positive / total;
    const neutralRatio = neutral / total;
    const negativeRatio = negative / total;
    
    // Generate summary feedback for each category
    const positiveFeedback = this.generateFeedbackSummary(comments, 'Positive');
    const neutralFeedback = this.generateFeedbackSummary(comments, 'Neutral');
    const negativeFeedback = this.generateFeedbackSummary(comments, 'Negative');
    
    return {
      positive: positiveRatio,
      neutral: neutralRatio,
      negative: negativeRatio,
      positiveFeedback,
      neutralFeedback,
      negativeFeedback
    };
  }
  
  // Generate recommendation based on sentiment and engagement
  generateRecommendation(
    sentiment: SentimentAnalysis, 
    engagement: EngagementMetrics
  ): Recommendation {
    // Score ranges from 0 to 100
    let score = 0;
    
    // Sentiment has 70% weight
    score += sentiment.positive * 70;
    score += sentiment.neutral * 35; // Neutral gets half points
    // Negative sentiment doesn't contribute to score
    
    // Engagement metrics have 30% weight
    const engagementScore = (
      (engagement.likeToViewRatio * 3000) +  // Like-to-view ratio (0.01 = 30 points)
      (engagement.commentToViewRatio * 10000) + // Comment-to-view ratio (0.001 = 10 points)
      (engagement.audienceRetention / 100 * 10) // Retention (50% = 5 points)
    );
    
    score += Math.min(engagementScore, 30); // Cap engagement at 30 points
    
    // Determine verdict based on score
    let verdict: 'Highly Recommended' | 'Neutral' | 'Not Recommended';
    
    if (score >= 70) {
      verdict = 'Highly Recommended';
    } else if (score >= 40) {
      verdict = 'Neutral';
    } else {
      verdict = 'Not Recommended';
    }
    
    return {
      verdict,
      score
    };
  }
  
  // Get a selection of the most relevant comments
  getTopComments(comments: Comment[], sentiment: SentimentAnalysis): Comment[] {
    // Sort by like count (more popular comments first)
    const sortedComments = [...comments].sort((a, b) => b.likeCount - a.likeCount);
    
    // Get top positive, neutral and negative comments
    const positiveComments = sortedComments.filter(c => c.sentiment === 'Positive').slice(0, 3);
    const neutralComments = sortedComments.filter(c => c.sentiment === 'Neutral').slice(0, 2);
    const negativeComments = sortedComments.filter(c => c.sentiment === 'Negative').slice(0, 2);
    
    // Combine and ensure we have at least some of each type
    const result = [...positiveComments, ...neutralComments, ...negativeComments];
    
    // If we don't have enough comments, fill with more from the most prevalent sentiment
    if (result.length < 5) {
      const maxSentiment = this.getMaxSentiment(sentiment);
      const moreComments = sortedComments
        .filter(c => c.sentiment === maxSentiment && !result.includes(c))
        .slice(0, 5 - result.length);
      
      result.push(...moreComments);
    }
    
    return result;
  }
  
  // Helper to get the sentiment with the highest percentage
  private getMaxSentiment(sentiment: SentimentAnalysis): SentimentType {
    if (sentiment.positive >= sentiment.neutral && sentiment.positive >= sentiment.negative) {
      return 'Positive';
    } else if (sentiment.neutral >= sentiment.positive && sentiment.neutral >= sentiment.negative) {
      return 'Neutral';
    } else {
      return 'Negative';
    }
  }
  
  // Generate a summary of feedback for a given sentiment
  private generateFeedbackSummary(comments: Comment[], sentimentType: SentimentType): string {
    const sentimentComments = comments.filter(c => c.sentiment === sentimentType);
    
    if (sentimentComments.length === 0) {
      return sentimentType === 'Positive' 
        ? "No positive feedback was found in the comments."
        : sentimentType === 'Neutral'
          ? "No neutral feedback was found in the comments."
          : "No negative feedback was found in the comments.";
    }
    
    // For a real implementation, this would use NLP to extract topics and summarize
    // For this demo, we'll use a simulated approach with common patterns
    
    switch (sentimentType) {
      case 'Positive':
        return sentimentComments.length > 10
          ? "Most viewers praised the content, finding it informative and well-presented. The clear explanations and practical examples were frequently highlighted as strengths."
          : "Some viewers appreciated the content and found it useful. The explanations were noted as being clear and helpful.";
      
      case 'Neutral':
        return sentimentComments.length > 5
          ? "Several viewers provided balanced feedback, suggesting improvements while acknowledging the value of the content. Some requested additional examples or follow-up videos."
          : "A few viewers had mixed opinions, appreciating certain aspects while suggesting improvements for others.";
      
      case 'Negative':
        return sentimentComments.length > 5
          ? "Multiple viewers expressed disappointment with aspects of the video. Common concerns included pacing issues, audio quality problems, or content that didn't meet expectations."
          : sentimentComments.length > 0
            ? "A small number of viewers mentioned issues with the video, including concerns about production quality or content accuracy."
            : "Very few negative comments were found.";
      
      default:
        return "Comment analysis unavailable.";
    }
  }
}
