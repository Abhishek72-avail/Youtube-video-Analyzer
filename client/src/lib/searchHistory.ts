import { VideoDetails } from "./types";

// Maximum number of searches to store in history
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  id: string;
  title: string;
  thumbnailUrl?: string;
  timestamp: number;
}

/**
 * Add a new video search to the search history
 */
export function addToSearchHistory(videoDetails: VideoDetails): void {
  try {
    // Get existing history
    const history = getSearchHistory();
    
    // Check if this video is already in history
    const existingIndex = history.findIndex(item => item.id === videoDetails.id);
    
    // Create new history item
    const newItem: SearchHistoryItem = {
      id: videoDetails.id,
      title: videoDetails.title,
      thumbnailUrl: videoDetails.thumbnailUrl,
      timestamp: Date.now()
    };
    
    // If item exists, remove it so we can add it to the top
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    // Add new item to the beginning
    history.unshift(newItem);
    
    // Limit history size
    const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    // Save back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Failed to save search history', error);
  }
}

/**
 * Get the search history
 */
export function getSearchHistory(): SearchHistoryItem[] {
  try {
    const historyJSON = localStorage.getItem('searchHistory');
    if (!historyJSON) return [];
    
    const history = JSON.parse(historyJSON) as SearchHistoryItem[];
    return history;
  } catch (error) {
    console.error('Failed to retrieve search history', error);
    return [];
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem('searchHistory');
  } catch (error) {
    console.error('Failed to clear search history', error);
  }
}