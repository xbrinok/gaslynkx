import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { telegramAuthSchema, walletAddressSchema, type User } from "@shared/schema";
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

  // Get referral tracking data
  app.get('/api/referrals', async (req, res) => {
    try {
      // This is a protected endpoint, would typically use proper authentication
      // For demo purposes, we're keeping it simple
      
      const allUsers = await storage.getAllUsers();
      
      // Create a simple list of wallet addresses with referral info
      const walletData = allUsers.map((user: User) => {
        // Format: walletAddress ===> referrerCode (if referred by someone)
        const referralInfo = user.referredBy 
          ? `${user.walletAddress} ===> ${user.referredBy}`
          : user.walletAddress;
          
        return {
          walletInfo: referralInfo,
          referralCode: user.referralCode,
          hasReferrals: false, // We'll update this below
          referredAddresses: [] as string[] // Will store addresses this user referred
        };
      });
      
      // Mark which users have referred others
      allUsers.forEach((user: User) => {
        if (user.referredBy) {
          // Find the user who referred this one
          const referrer = walletData.find(w => w.referralCode === user.referredBy);
          if (referrer) {
            referrer.hasReferrals = true;
            referrer.referredAddresses.push(user.walletAddress);
          }
        }
      });
      
      // Just send the simple list with all wallet addresses and their referral info
      const walletList = walletData.map(item => item.walletInfo);
      
      res.status(200).json({ 
        success: true, 
        message: 'Referral data retrieved successfully',
        data: { walletList }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve referral data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
