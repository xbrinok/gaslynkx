import { users, type User, type InsertUser } from "@shared/schema";
import fs from 'fs';
import path from 'path';

// Storage interface with CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByTelegramId(telegramId: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
}

// File path for storing wallet addresses
const WALLET_FILE_PATH = path.join(process.cwd(), 'data', 'wallets.txt');

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Generates a referral code from a wallet address (last 6 chars)
const generateReferralCode = (walletAddress: string): string => {
  return walletAddress.slice(-6);
};

// File-based storage implementation
export class FileStorage implements IStorage {
  private users: User[];
  private currentId: number;

  constructor() {
    this.users = [];
    this.currentId = 1;
    
    // Ensure data directory exists
    ensureDataDir();
    
    // Load existing users from file if it exists
    this.loadUsers();
  }

  private loadUsers(): void {
    try {
      if (fs.existsSync(WALLET_FILE_PATH)) {
        const fileContent = fs.readFileSync(WALLET_FILE_PATH, 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim());
        
        this.users = lines.map((line, index) => {
          const parts = line.split(',');
          
          // Handle different format versions
          if (parts.length >= 5) {
            // New format with referral data
            const [telegramId, walletAddress, referralCode, referredBy, createdAtStr] = parts;
            return {
              id: index + 1,
              telegramId,
              walletAddress,
              referralCode: referralCode || null,
              referredBy: referredBy || null,
              createdAt: new Date(createdAtStr || Date.now())
            } as User;
          } else {
            // Legacy format
            const [telegramId, walletAddress, createdAtStr] = parts;
            // Generate referral code from wallet address
            const refCode = generateReferralCode(walletAddress);
            return {
              id: index + 1,
              telegramId,
              walletAddress,
              referralCode: refCode,
              referredBy: null,
              createdAt: new Date(createdAtStr || Date.now())
            } as User;
          }
        });
        
        // Update currentId to be greater than the highest existing id
        if (this.users.length > 0) {
          this.currentId = Math.max(...this.users.map(user => user.id)) + 1;
        }
      }
    } catch (error) {
      console.error('Error loading users from file:', error);
      // Continue with empty users array if file can't be read
    }
  }

  private saveUsers(): void {
    try {
      const fileContent = this.users
        .map(user => {
          const referralInfo = user.referredBy ? 
            `====> Referred by: ${user.referredBy}` : '';
          
          return `${user.telegramId},${user.walletAddress},${user.referralCode || ''},${user.referredBy || ''},${user.createdAt.toISOString()}${referralInfo}`;
        })
        .join('\n');
      
      fs.writeFileSync(WALLET_FILE_PATH, fileContent);
    } catch (error) {
      console.error('Error saving users to file:', error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByTelegramId(telegramId: string): Promise<User | undefined> {
    return this.users.find(user => user.telegramId === telegramId);
  }

  async getUserByReferralCode(referralCode: string): Promise<User | undefined> {
    return this.users.find(user => user.referralCode === referralCode);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Generate referral code from wallet address
    const referralCode = generateReferralCode(insertUser.walletAddress);
    
    // Check if user with this telegramId already exists
    const existingUser = await this.getUserByTelegramId(insertUser.telegramId);
    if (existingUser) {
      // Update existing user's wallet address and referral data
      existingUser.walletAddress = insertUser.walletAddress;
      existingUser.referralCode = referralCode;
      existingUser.referredBy = insertUser.referredBy || existingUser.referredBy;
      existingUser.createdAt = insertUser.createdAt;
      this.saveUsers();
      return existingUser;
    }
    
    // Create new user with referral code
    const id = this.currentId++;
    const user: User = { 
      id,
      telegramId: insertUser.telegramId,
      walletAddress: insertUser.walletAddress,
      referralCode: referralCode,
      referredBy: insertUser.referredBy || null,
      createdAt: insertUser.createdAt
    };
    
    this.users.push(user);
    
    // Save to file
    this.saveUsers();
    
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }
}

// Export storage instance
export const storage = new FileStorage();
