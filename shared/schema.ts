import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (keep existing structure)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Add VideoAnalysis model for storing analysis results
export const videoAnalyses = pgTable("video_analyses", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull().unique(),
  videoDetails: jsonb("video_details").notNull(),
  sentimentAnalysis: jsonb("sentiment_analysis").notNull(),
  topComments: jsonb("top_comments").notNull(),
  engagementMetrics: jsonb("engagement_metrics").notNull(),
  recommendation: jsonb("recommendation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVideoAnalysisSchema = createInsertSchema(videoAnalyses).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVideoAnalysis = z.infer<typeof insertVideoAnalysisSchema>;
export type VideoAnalysis = typeof videoAnalyses.$inferSelect;

// Update storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video analysis methods
  getVideoAnalysis(videoId: string): Promise<any | undefined>;
  saveVideoAnalysis(analysis: any): Promise<any>;
}
