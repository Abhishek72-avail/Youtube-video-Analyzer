import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video analysis methods
  getVideoAnalysis(videoId: string): Promise<any | undefined>;
  saveVideoAnalysis(analysis: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videoAnalyses: Map<string, any>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.videoAnalyses = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVideoAnalysis(videoId: string): Promise<any | undefined> {
    return this.videoAnalyses.get(videoId);
  }

  async saveVideoAnalysis(analysis: any): Promise<any> {
    // Ensure analysis has a videoId
    if (!analysis.videoId) {
      throw new Error("Video analysis must have a videoId");
    }
    
    this.videoAnalyses.set(analysis.videoId, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
