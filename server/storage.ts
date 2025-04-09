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
          // Handle the special format with ====> Referred by: syntax
          let referredBy = null;
          if (line.includes('====> Referred by:')) {
            const [mainPart, referralPart] = line.split('====> Referred by:');
            line = mainPart;
            referredBy = referralPart.trim();
          }
          
          const parts = line.split(',');
          
          // Handle different format versions
          if (parts.length >= 4) {
            // New format with referral data
            const [telegramId, walletAddress, referralCode, createdAtStr] = parts;
            return {
              id: index + 1,
              telegramId,
              walletAddress,
              referralCode: referralCode || null,
              referredBy: referredBy || parts[3] || null,
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
              referredBy,
              createdAt: new Date(createdAtStr || Date.now())
            } as User;
          }
        });
        
        // Update currentId to be greater than the highest existing id
        if (this.users.length > 0) {
          this.currentId = Math.max(...this.users.map(user => user.id)) + 1;
        }
        
        // Debug: Log loaded users
        console.log('Loaded users:', this.users);
      }
    } catch (error) {
      console.error('Error loading users from file:', error);
      // Continue with empty users array if file can't be read
    }
  }

  private saveUsers(): void {
    try {
      // Create a line for each wallet submission
      const lines = this.users.map(user => {
        // Create a basic entry with comma separated values
        let line = `${user.telegramId},${user.walletAddress},${user.referralCode || ''},${user.referredBy || ''},${user.createdAt.toISOString()}`;
        
        // Add referral information if present
        if (user.referredBy) {
          line += ` ====> Referred by: ${user.referredBy}`;
        }
        
        return line;
      });
      
      // Join all lines with newlines and write to file
      const fileContent = lines.join('\n');
      
      // Ensure the data directory exists
      ensureDataDir();
      
      // Write the file
      fs.writeFileSync(WALLET_FILE_PATH, fileContent);
      
      // Debug info
      console.log(`Saved ${this.users.length} wallet entries to file`);
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
    
    // Always create a new entry for each wallet submission
    // This allows multiple wallet addresses per Telegram user
    const id = this.currentId++;
    const user: User = { 
      id,
      telegramId: insertUser.telegramId,
      walletAddress: insertUser.walletAddress,
      referralCode: referralCode,
      referredBy: insertUser.referredBy || null,
      createdAt: insertUser.createdAt
    };
    
    // Add to users array
    this.users.push(user);
    
    // Debug info
    console.log(`Adding new wallet: ${insertUser.walletAddress}, Referral: ${insertUser.referredBy || 'None'}`);
    
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
