import * as fs from 'fs';
import * as path from 'path';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

interface ParsedMessage {
  id: number;
  sender: string;
  timestamp: string;
  message: string;
}

class ChatDatabaseBuilder {
  private db: sqlite3.Database;
  private dbPath: string;

  constructor(chatFilePath: string) {
    const chatDir = path.dirname(chatFilePath);
    const chatFileName = path.basename(chatFilePath, '.txt');
    this.dbPath = path.join(chatDir, `${chatFileName}.db`);
    
    this.db = new sqlite3.Database(this.dbPath);
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Enable WAL mode for better performance
      this.db.run('PRAGMA journal_mode = WAL', (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Create FTS5 virtual table
        const createTableSQL = `
          CREATE VIRTUAL TABLE IF NOT EXISTS messages USING fts5(
            id UNINDEXED,
            sender,
            timestamp,
            message
          );
        `;

        this.db.run(createTableSQL, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  parseChatLine(line: string): ParsedMessage | null {
    // WhatsApp format: 12/08/2023, 10:15 - John Doe: Hello there!
    const regex = /^(\d{1,2}\/\d{1,2}\/\d{4}),\s*(\d{1,2}:\d{2})\s*-\s*(.+?):\s*(.+)$/;
    const match = line.match(regex);

    if (!match) {
      return null;
    }

    const [, date, time, sender, message] = match;
    const timestamp = `${date} ${time}`;

    return {
      id: 0, // Will be set by SQLite
      sender: sender.trim(),
      timestamp: timestamp.trim(),
      message: message.trim()
    };
  }

  async insertMessage(message: ParsedMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO messages (sender, timestamp, message) VALUES (?, ?, ?)';
      this.db.run(sql, [message.sender, message.timestamp, message.message], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async processChatFile(chatFilePath: string): Promise<void> {
    console.log(`Processing chat file: ${chatFilePath}`);
    
    const content = fs.readFileSync(chatFilePath, 'utf-8');
    const lines = content.split('\n');
    
    let processedCount = 0;
    let skippedCount = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const parsedMessage = this.parseChatLine(trimmedLine);
      if (parsedMessage) {
        await this.insertMessage(parsedMessage);
        processedCount++;
        
        if (processedCount % 1000 === 0) {
          console.log(`Processed ${processedCount} messages...`);
        }
      } else {
        skippedCount++;
      }
    }

    console.log(`\nProcessing complete!`);
    console.log(`- Processed: ${processedCount} messages`);
    console.log(`- Skipped: ${skippedCount} lines`);
    console.log(`- Database saved to: ${this.dbPath}`);
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: npm run build-db <path-to-chat.txt>');
    console.error('Example: npm run build-db public/chat/WhatsApp Chat with Saanu The Kiddo.txt');
    process.exit(1);
  }

  const chatFilePath = args[0];
  
  if (!fs.existsSync(chatFilePath)) {
    console.error(`Error: Chat file not found: ${chatFilePath}`);
    process.exit(1);
  }

  try {
    const builder = new ChatDatabaseBuilder(chatFilePath);
    await builder.initialize();
    await builder.processChatFile(chatFilePath);
    await builder.close();
    
    console.log('\n✅ Database build completed successfully!');
  } catch (error) {
    console.error('❌ Error building database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { ChatDatabaseBuilder };
