export interface DatabaseMessage {
  rowid: number;
  sender: string;
  timestamp: string;
  message: string;
}

export interface PaginatedMessages {
  messages: DatabaseMessage[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SearchResult {
  messages: DatabaseMessage[];
  total: number;
  query: string;
}

export interface ChatItem {
  type: 'msg' | 'date';
  rowid?: number;
  sender?: string;
  timestamp?: string;
  message?: string;
  date?: string;
}
