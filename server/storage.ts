import { users, type User, type InsertUser } from "@shared/schema";
import fs from 'fs';
import path from 'path';

// Storage interface with CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByTelegramId(telegramId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
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
          const [telegramId, walletAddress, createdAtStr] = line.split(',');
          return {
            id: index + 1,
            telegramId,
            walletAddress,
            createdAt: new Date(createdAtStr || Date.now())
          };
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
        .map(user => `${user.telegramId},${user.walletAddress},${user.createdAt.toISOString()}`)
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

  async createUser(insertUser: InsertUser): Promise<User> {
    // Check if user with this telegramId already exists
    const existingUser = await this.getUserByTelegramId(insertUser.telegramId);
    if (existingUser) {
      // Update existing user's wallet address
      existingUser.walletAddress = insertUser.walletAddress;
      existingUser.createdAt = insertUser.createdAt;
      this.saveUsers();
      return existingUser;
    }
    
    // Create new user
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.push(user);
    
    // Save to file
    this.saveUsers();
    
    return user;
  }
}

// Export storage instance
export const storage = new FileStorage();
