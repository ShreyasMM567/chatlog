import React, { useState, useCallback, useEffect } from 'react';
import { ChatHeaderProps } from '@/types/chat';

interface ExtendedChatHeaderProps extends ChatHeaderProps {
  onSearch?: (query: string) => void;
  onClearSearch?: () => void;
  searchQuery?: string;
  isSearching?: boolean;
  searchResults?: { total: number; query: string } | null;
}

export function ChatHeader({ 
  title, 
  onSearch, 
  onClearSearch, 
  searchQuery = '', 
  isSearching = false,
  searchResults 
}: ExtendedChatHeaderProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Sync local search query with prop
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && localSearchQuery.trim()) {
      onSearch(localSearchQuery.trim());
    }
  }, [onSearch, localSearchQuery]);

  const handleClearSearch = useCallback(() => {
    setLocalSearchQuery('');
    if (onClearSearch) {
      onClearSearch();
    }
  }, [onClearSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && localSearchQuery.trim()) {
      e.preventDefault();
      if (onSearch) {
        onSearch(localSearchQuery.trim());
      }
    }
  }, [onSearch, localSearchQuery]);

  return (
    <header className="w-full bg-[#075e54] shadow-md flex flex-col">
      {/* Main header */}
      <div className="flex items-center px-4 py-3">
        <svg 
          className="w-6 h-6 text-white mr-2" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 12h18M3 6h18M3 18h18" 
          />
        </svg>
        <span className="text-white text-lg font-bold tracking-wide flex-1">
          {title}
        </span>
        
        {/* Search toggle button */}
        {onSearch && (
          <button
            onClick={() => setLocalSearchQuery('')}
            className="text-white p-1 hover:bg-white/10 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Search bar */}
      {onSearch && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search messages..."
              className="w-full px-4 py-2 pr-10 bg-white/10 text-white placeholder-white/70 rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
            />
            
            {/* Search status */}
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
              </div>
            )}
            
            {/* Clear button */}
            {localSearchQuery && !isSearching && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
}
