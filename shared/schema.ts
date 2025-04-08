import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model with Telegram ID and wallet address
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramId: text("telegram_id").notNull().unique(),
  walletAddress: text("wallet_address").notNull(),
  createdAt: timestamp("created_at").notNull()
});

// Schema for inserting a user
export const insertUserSchema = createInsertSchema(users).omit({
  id: true
});

// Telegram authentication schema
export const telegramAuthSchema = z.object({
  id: z.string().min(1, "Telegram ID is required"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  photo_url: z.string().optional(),
  auth_date: z.number().optional(),
  hash: z.string().optional()
});

// Schema for submitting wallet address
export const walletAddressSchema = z.object({
  telegramId: z.string().min(1, "Telegram ID is required"),
  walletAddress: z.string().min(32, "Invalid Solana wallet address")
    .max(64, "Invalid Solana wallet address")
    .regex(/^[a-zA-Z0-9]{32,64}$/, "Invalid Solana wallet address format")
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TelegramAuth = z.infer<typeof telegramAuthSchema>;
export type WalletAddress = z.infer<typeof walletAddressSchema>;
