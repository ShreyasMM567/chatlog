import sqlite3 from 'sqlite3';
import * as path from 'path';

export interface Message {
  rowid: number;
  sender: string;
  timestamp: string;
  message: string;
}

export interface PaginatedMessages {
  messages: Message[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchResult {
  messages: Message[];
  total: number;
  query: string;
}

class DatabaseManager {
  private db: sqlite3.Database | null = null;
  private dbPath: string;

  constructor() {
    // Default to the main chat database
    this.dbPath = path.join(process.cwd(), 'public', 'chat', 'WhatsApp Chat with Saanu The Kiddo.db');
  }

  async getDatabase(): Promise<sqlite3.Database> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.db!);
        }
      });
    });
  }

  async getMessages(page: number = 1, limit: number = 50): Promise<PaginatedMessages> {
    const db = await this.getDatabase();
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
      // Get total count
      db.get('SELECT COUNT(*) as total FROM messages', (err, result: { total: number } | undefined) => {
        if (err) {
          reject(err);
          return;
        }

        const total = result?.total || 0;

        // Get paginated messages from bottom up (most recent first)
        const sql = `
          SELECT rowid, sender, timestamp, message 
          FROM messages 
          ORDER BY rowid DESC 
          LIMIT ? OFFSET ?
        `;

        db.all(sql, [limit, offset], (err, messages: Message[]) => {
          if (err) {
            reject(err);
          } else {
            // Reverse the messages to maintain chronological order for display
            const orderedMessages = messages.reverse();
            resolve({
              messages: orderedMessages,
              total,
              page,
              limit,
              hasMore: offset + limit < total
            });
          }
        });
      });
    });
  }

  async getMessagesBefore(rowId: number, limit: number = 50): Promise<PaginatedMessages> {
    const db = await this.getDatabase();

    return new Promise((resolve, reject) => {
      // Get total count of messages before this rowId
      db.get('SELECT COUNT(*) as total FROM messages WHERE rowid < ?', [rowId], (err, result: { total: number } | undefined) => {
        if (err) {
          reject(err);
          return;
        }

        const total = result?.total || 0;

        // Get messages before the specified rowId
        const sql = `
          SELECT rowid, sender, timestamp, message 
          FROM messages 
          WHERE rowid < ? 
          ORDER BY rowid DESC 
          LIMIT ?
        `;

        db.all(sql, [rowId, limit], (err, messages: Message[]) => {
          if (err) {
            reject(err);
          } else {
            // Reverse the messages to maintain chronological order for display
            const orderedMessages = messages.reverse();
            resolve({
              messages: orderedMessages,
              total,
              page: 1, // Always page 1 for this type of query
              limit,
              hasMore: total > limit
            });
          }
        });
      });
    });
  }

  async searchMessages(query: string): Promise<SearchResult> {
    const db = await this.getDatabase();

    return new Promise((resolve, reject) => {
      // Get search results only
      const searchSql = `
        SELECT rowid, sender, timestamp, message 
        FROM messages 
        WHERE messages MATCH ? 
        ORDER BY rowid ASC
      `;

      db.all(searchSql, [query], (err, searchResults: Message[]) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          messages: searchResults,
          total: searchResults.length,
          query
        });
      });
    });
  }

  async getSearchResultsOnly(query: string): Promise<{ results: Message[] }> {
    const db = await this.getDatabase();

    return new Promise((resolve, reject) => {
      // Use FTS5 search without context
      const sql = `
        SELECT rowid, sender, timestamp, message 
        FROM messages 
        WHERE messages MATCH ? 
        ORDER BY rowid ASC
      `;

      db.all(sql, [query], (err, results: Message[]) => {
        if (err) {
          reject(err);
        } else {
          resolve({ results });
        }
      });
    });
  }

  async loadMoreAroundSearch(query: string, currentMinRowId: number, currentMaxRowId: number, direction: 'up' | 'down'): Promise<{ messages: Message[], hasMore: boolean }> {
    const db = await this.getDatabase();

    return new Promise((resolve, reject) => {
      let sql: string;
      let params: (string | number)[];

      if (direction === 'up') {
        // Load more messages before the current range
        sql = `
          SELECT rowid, sender, timestamp, message 
          FROM messages 
          WHERE rowid < ? 
          ORDER BY rowid DESC 
          LIMIT 50
        `;
        params = [currentMinRowId];
      } else {
        // Load more messages after the current range
        sql = `
          SELECT rowid, sender, timestamp, message 
          FROM messages 
          WHERE rowid > ? 
          ORDER BY rowid ASC 
          LIMIT 50
        `;
        params = [currentMaxRowId];
      }

      db.all(sql, params, (err, messages: Message[]) => {
        if (err) {
          reject(err);
        } else {
          // Reverse the order for 'up' direction to maintain chronological order
          const orderedMessages = direction === 'up' ? messages.reverse() : messages;
          resolve({
            messages: orderedMessages,
            hasMore: messages.length === 50
          });
        }
      });
    });
  }

  async getMessagesAround(rowId: number, context: number = 5): Promise<{ messages: Message[], hasMore: boolean }> {
    const db = await this.getDatabase();

    return new Promise((resolve, reject) => {
      // Get messages around the specified rowId (context before and after)
      const sql = `
        SELECT rowid, sender, timestamp, message 
        FROM messages 
        WHERE rowid BETWEEN ? AND ? 
        ORDER BY rowid ASC
      `;
      
      const startRowId = Math.max(1, rowId - context);
      const endRowId = rowId + context;
      
      db.all(sql, [startRowId, endRowId], (err, messages: Message[]) => {
        if (err) {
          reject(err);
        } else {
          // Check if there are more messages available
          const hasMore = endRowId < Number.MAX_SAFE_INTEGER; // Simplified check
          resolve({
            messages,
            hasMore
          });
        }
      });
    });
  }

  async close(): Promise<void> {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db!.close((err) => {
          if (err) {
            reject(err);
          } else {
            this.db = null;
            resolve();
          }
        });
      });
    }
  }
}

// Export a singleton instance
export const dbManager = new DatabaseManager();
