import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { telegramAuthSchema, walletAddressSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // All API routes are prefixed with /api
  
  // Validate Telegram authentication
  app.post('/api/auth/telegram', async (req, res) => {
    try {
      const authData = telegramAuthSchema.parse(req.body);
      
      // In a real implementation, you would verify the Telegram auth data
      // with the Telegram Bot API, but for now we'll just validate the schema
      
      res.status(200).json({ 
        success: true, 
        message: 'Telegram authentication successful',
        data: { id: authData.id, username: authData.username }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: 'Invalid authentication data',
          error: validationError.message
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Authentication failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });

  // Submit wallet address
  app.post('/api/submit/wallet', async (req, res) => {
    try {
      // Only validate telegramId and walletAddress, make referralCode optional
      const { telegramId, walletAddress } = walletAddressSchema.omit({ referralCode: true }).parse(req.body);
      
      // Get optional referral code from body if present
      const referralCode = req.body.referralCode;
      
      // Look up the referrer by referral code if one was provided
      let referredBy = null;
      if (referralCode) {
        const referrer = await storage.getUserByReferralCode(referralCode);
        if (referrer) {
          referredBy = referrer.referralCode;
        }
      }
      
      // Generate user's own referral code from wallet address (last 6 chars)
      const userReferralCode = walletAddress.slice(-6);
      
      // Store user wallet data
      const user = await storage.createUser({
        telegramId,
        walletAddress,
        referralCode: userReferralCode,
        referredBy,
        createdAt: new Date()
      });
      
      res.status(201).json({ 
        success: true, 
        message: 'Wallet address submitted successfully',
        data: { 
          userId: user.id,
          walletAddress: user.walletAddress,
          referralCode: user.referralCode
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: 'Invalid wallet data',
          error: validationError.message
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to submit wallet address',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
