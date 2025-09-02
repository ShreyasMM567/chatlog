import { useState, useEffect, useCallback } from 'react';
import { DatabaseMessage, PaginatedMessages, SearchResult, ChatItem } from '@/types/database';

interface UseDatabaseChatReturn {
  messages: ChatItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isLoadingMoreNewer: boolean;
  hasMore: boolean;
  hasMoreNewer: boolean;
  currentPage: number;
  totalMessages: number;
  searchQuery: string;
  isSearching: boolean;
  searchResults: SearchResult | null;
  highlightedMessageIds: number[];
  currentSearchIndex: number;
  isSearchNavigation: boolean;
  searchPosition: { rowId: number; page: number } | null;
  loadMore: () => void;
  loadMoreNewer: () => void;
  search: (query: string) => void;
  clearSearch: () => void;
  navigateToSearchResult: (direction: 'next' | 'prev') => void;
  scrollToSearchResult: (rowId: number) => void;
  maintainScrollPosition: () => void;
  user1: string;
  user2: string;
}

export function useDatabaseChat(): UseDatabaseChatReturn {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingMoreNewer, setIsLoadingMoreNewer] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [hasMoreNewer, setHasMoreNewer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [highlightedMessageIds, setHighlightedMessageIds] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [shouldMaintainScrollPosition, setShouldMaintainScrollPosition] = useState(false);
  const [searchPosition, setSearchPosition] = useState<{ rowId: number; page: number } | null>(null);
  
  // Convert database messages to chat items with date notes
  const convertToChatItems = useCallback((dbMessages: DatabaseMessage[]): ChatItem[] => {
    const chatItems: ChatItem[] = [];
    let currentDate = '';

    dbMessages.forEach((msg) => {
      const messageDate = msg.timestamp.split(' ')[0]; // Extract date part
      
      // Add date note if date changes
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        chatItems.push({
          type: 'date',
          date: messageDate
        });
      }

      // Add message
      chatItems.push({
        type: 'msg',
        rowid: msg.rowid,
        sender: msg.sender,
        timestamp: msg.timestamp,
        message: msg.message
      });
    });

    return chatItems;
  }, []);

  // Load initial messages
  const loadMessages = useCallback(async (page: number = 1) => {
    try {
      const response = await fetch(`/api/messages?page=${page}&limit=50`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data: PaginatedMessages = await response.json();
      
      const chatItems = convertToChatItems(data.messages);
      
      if (page === 1) {
        setMessages(chatItems);
        setCurrentPage(1);
        
        // Extract user names from first few messages only on initial load
        if (data.messages.length > 0) {
          const uniqueSenders = Array.from(new Set(data.messages.map(m => m.sender)));
          setUser1(uniqueSenders[0] || '');
          setUser2(uniqueSenders[1] || '');
          
          // Check if there are newer messages available
          const maxRowId = Math.max(...data.messages.map(m => m.rowid));
          const newerResponse = await fetch(`/api/messages?limit=1&afterRowId=${maxRowId}`);
          if (newerResponse.ok) {
            const newerData: PaginatedMessages = await newerResponse.json();
            setHasMoreNewer(newerData.messages.length > 0);
          }
        }
      } else {
        // For bottom-up loading, prepend older messages
        setMessages(prev => [...chatItems, ...prev]);
        setCurrentPage(page);
      }
      
      setHasMore(data.hasMore);
      setTotalMessages(data.total);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }, [convertToChatItems]);

  // Load messages around a specific search result
  const loadMessagesAroundSearchResult = useCallback(async (searchResultRowId: number) => {
    try {
      // Get messages around the search result (5 before, 5 after)
      const response = await fetch(`/api/messages-around?rowId=${searchResultRowId}&context=5`);
      if (!response.ok) throw new Error('Failed to fetch messages around search result');
      
      const data = await response.json();
      const chatItems = convertToChatItems(data.messages);
      
      setMessages(chatItems);
      setHighlightedMessageIds([searchResultRowId]);
      setHasMore(data.hasMore);
      setCurrentPage(1); // Reset to page 1 since we're starting fresh
      
      // Track the search position for infinite scroll continuation
      setSearchPosition({ rowId: searchResultRowId, page: 1 });
    } catch (error) {
      console.error('Error loading messages around search result:', error);
    }
  }, [convertToChatItems]);

  // Load more messages
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    try {
      if (searchPosition) {
        // Continue infinite scroll from search position
        const nextPage = searchPosition.page + 1;
        const response = await fetch(`/api/messages?page=${nextPage}&limit=50&beforeRowId=${searchPosition.rowId}`);
        if (!response.ok) throw new Error('Failed to fetch more messages');
        
        const data: PaginatedMessages = await response.json();
        const chatItems = convertToChatItems(data.messages);
        
        // Prepend older messages
        setMessages(prev => [...chatItems, ...prev]);
        setHasMore(data.hasMore);
        setSearchPosition(prev => prev ? { ...prev, page: nextPage } : null);
      } else {
        // Normal infinite scroll from most recent messages
        await loadMessages(currentPage + 1);
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, currentPage, loadMessages, searchPosition, convertToChatItems]);

  // Load more newer messages (downward infinite scroll)
  const loadMoreNewer = useCallback(async () => {
    if (isLoadingMoreNewer || !hasMoreNewer || messages.length === 0) return;
    
    setIsLoadingMoreNewer(true);
    
    try {
      // Find the highest rowId in current messages
      const maxRowId = Math.max(...messages
        .filter(item => item.type === 'msg')
        .map(item => item.rowid || 0)
      );
      
      if (maxRowId > 0) {
        const response = await fetch(`/api/messages?limit=50&afterRowId=${maxRowId}`);
        if (!response.ok) throw new Error('Failed to fetch newer messages');
        
        const data: PaginatedMessages = await response.json();
        const chatItems = convertToChatItems(data.messages);
        
        // Append newer messages
        setMessages(prev => [...prev, ...chatItems]);
        
        // Check if there are more newer messages available
        if (data.messages.length > 0) {
          const newMaxRowId = Math.max(...data.messages.map(m => m.rowid));
          const newerResponse = await fetch(`/api/messages?limit=1&afterRowId=${newMaxRowId}`);
          if (newerResponse.ok) {
            const newerData: PaginatedMessages = await newerResponse.json();
            setHasMoreNewer(newerData.messages.length > 0);
          } else {
            setHasMoreNewer(false);
          }
        } else {
          setHasMoreNewer(false);
        }
      }
    } catch (error) {
      console.error('Error loading newer messages:', error);
    } finally {
      setIsLoadingMoreNewer(false);
    }
  }, [isLoadingMoreNewer, hasMoreNewer, messages, convertToChatItems]);

  // Clear search - just clear search state, keep current messages
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults(null);
    setHighlightedMessageIds([]);
    setCurrentSearchIndex(0);
    setIsSearching(false);
    setShouldMaintainScrollPosition(false);
    setSearchPosition(null); // Reset search position
  }, []);

  // Navigate to next/previous search result
  const navigateToSearchResult = useCallback((direction: 'next' | 'prev') => {
    if (!searchResults || searchResults.messages.length === 0) return;

    let newIndex: number;
    if (direction === 'next') {
      newIndex = (currentSearchIndex + 1) % searchResults.messages.length;
    } else {
      newIndex = currentSearchIndex === 0 ? searchResults.messages.length - 1 : currentSearchIndex - 1;
    }

    setCurrentSearchIndex(newIndex);
    const targetMessage = searchResults.messages[newIndex];
    loadMessagesAroundSearchResult(targetMessage.rowid);
  }, [searchResults, currentSearchIndex, loadMessagesAroundSearchResult]);

  // Scroll to a specific search result
  const scrollToSearchResult = useCallback((rowId: number) => {
    // This will be handled by the component using refs
    // The message will be highlighted and the component will scroll to it
    setHighlightedMessageIds([rowId]);
  }, []);

  // Search messages - jump to search result
  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      
      const result: SearchResult = await response.json();
      setSearchResults(result);
      
             if (result.messages.length > 0) {
         // Jump to the first search result
         setCurrentSearchIndex(0);
         await loadMessagesAroundSearchResult(result.messages[0].rowid);
       } else {
        // No results found - stay in current state
        setHighlightedMessageIds([]);
      }
    } catch (error) {
      console.error('Error searching messages:', error);
    } finally {
      setIsSearching(false);
    }
  }, [clearSearch, loadMessagesAroundSearchResult]);

  // Load initial data
  useEffect(() => {
    loadMessages(1).finally(() => setIsLoading(false));
  }, [loadMessages]);

  return {
    messages,
    isLoading,
    isLoadingMore,
    isLoadingMoreNewer,
    hasMore,
    hasMoreNewer,
    currentPage,
    totalMessages,
    searchQuery,
    isSearching,
    searchResults,
    highlightedMessageIds,
    currentSearchIndex,
    isSearchNavigation: shouldMaintainScrollPosition,
    searchPosition,
    loadMore,
    loadMoreNewer,
    search,
    clearSearch,
    navigateToSearchResult,
    scrollToSearchResult,
    maintainScrollPosition: () => {
      setShouldMaintainScrollPosition(true);
      setTimeout(() => {
        setShouldMaintainScrollPosition(false);
      }, 100);
    },
    user1,
    user2
  };
}
