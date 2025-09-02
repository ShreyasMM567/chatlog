import React, { useRef, useEffect } from 'react';
import { ChatHeader, ChatContainer, ChatMessages } from './index';
import { ChatLoading } from './ChatLoading';
import { LoadingMoreIndicator } from './LoadingMoreIndicator';
import { useDatabaseChat } from '@/hooks/useDatabaseChat';

export function DatabaseChat() {
  const {
    messages,
    isLoading,
    isLoadingMore,
    isLoadingMoreNewer,
    hasMore,
    hasMoreNewer,
    currentPage,
    searchQuery,
    isSearching,
    searchResults,
    highlightedMessageIds,
    currentSearchIndex,
    isSearchNavigation,
    searchPosition,
    loadMore,
    loadMoreNewer,
    search,
    clearSearch,
    navigateToSearchResult,
    maintainScrollPosition,
    user1,
    user2
  } = useDatabaseChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const savedScrollPosition = useRef<{ top: number; height: number } | null>(null);
  
  // Add refs for infinite scroll position maintenance
  const prevScrollHeight = useRef<number | null>(null);
  const prevScrollTop = useRef<number | null>(null);
  const prevMessageCount = useRef<number | null>(null);

  // Handle infinite scroll
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Debounce scroll events
      scrollTimeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const scrollBottom = scrollTop + clientHeight;
        const isNearTop = scrollTop < 200;
        const isNearBottom = scrollHeight - scrollBottom < 200;
        
        // Load more when user scrolls near the top (for older messages)
        if (isNearTop && hasMore && !isLoadingMore && !isSearching) {
          // Save scroll position before loading more messages
          prevScrollHeight.current = container.scrollHeight;
          prevScrollTop.current = container.scrollTop;
          prevMessageCount.current = messages.length;
          
          loadMore();
        }
        
        // Load more when user scrolls near the bottom (for newer messages)
        if (isNearBottom && hasMoreNewer && !isLoadingMoreNewer && !isSearching) {
          loadMoreNewer();
        }
      }, 150); // 150ms debounce
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hasMore, hasMoreNewer, isLoadingMore, isLoadingMoreNewer, isSearching, loadMore, loadMoreNewer, messages.length]);

  // Update message refs array
  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, messages.length);
  }, [messages.length]);

  // Restore scroll position after infinite scroll loads more messages
  useEffect(() => {
    if (
      prevScrollHeight.current !== null &&
      prevScrollTop.current !== null &&
      prevMessageCount.current !== null &&
      chatContainerRef.current &&
      messages.length > prevMessageCount.current &&
      !isLoadingMore
    ) {
      const container = chatContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const scrollHeightDifference = newScrollHeight - prevScrollHeight.current;
      
      // Restore scroll position by adding the height difference
      container.scrollTop = prevScrollTop.current + scrollHeightDifference;
      
      // Reset refs
      prevScrollHeight.current = null;
      prevScrollTop.current = null;
      prevMessageCount.current = null;
    }
  }, [messages.length, isLoadingMore]);

  // Save scroll position before search navigation
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (isSearchNavigation) {
      // Save current scroll position when search navigation starts
      savedScrollPosition.current = {
        top: container.scrollTop,
        height: container.scrollHeight
      };
    }
  }, [isSearchNavigation]);

  // Restore scroll position after search navigation
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || !savedScrollPosition.current || isSearchNavigation) return;

    // Restore scroll position when search navigation is complete
    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;
      const scrollHeightDifference = newScrollHeight - savedScrollPosition.current!.height;
      container.scrollTop = savedScrollPosition.current!.top + scrollHeightDifference;
      savedScrollPosition.current = null; // Clear saved position
    });
  }, [isSearchNavigation]);

  // Scroll to bottom on initial load only (since we load from bottom up)
  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current && currentPage === 1 && !isLoadingMore) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages.length, currentPage, isLoadingMore]);

  // Scroll to highlighted message when search results change
  useEffect(() => {
    if (highlightedMessageIds.length > 0 && messages.length > 0) {
      const highlightedIndex = messages.findIndex(
        item => item.type === 'msg' && highlightedMessageIds.includes(item.rowid || 0)
      );
      
      if (highlightedIndex !== -1 && messageRefs.current[highlightedIndex]) {
        setTimeout(() => {
          messageRefs.current[highlightedIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }
  }, [highlightedMessageIds, messages]);

  // Show loading component while data is being fetched
  if (isLoading) {
    return <ChatLoading />;
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#e8f5e9] via-[#f0f4c3] to-[#fff] flex flex-col overflow-hidden">
      {/* Header Section - Fixed height, no overflow */}
      <div className="flex-shrink-0">
        <ChatHeader 
          title="WhatsApp Chat" 
          onSearch={(query) => {
            maintainScrollPosition();
            search(query);
          }}
          onClearSearch={clearSearch}
          searchQuery={searchQuery}
          isSearching={isSearching}
          searchResults={searchResults}
        />
        
        {/* Search navigation controls - Fixed height */}
        {searchResults && searchResults.total > 0 && (
          <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Found {searchResults.total} result{searchResults.total !== 1 ? 's' : ''} for &quot;{searchResults.query}&quot;
                </div>
                <div className="text-sm text-gray-500">
                  Result {currentSearchIndex + 1} of {searchResults.total}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    maintainScrollPosition();
                    navigateToSearchResult('prev');
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSearchIndex === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    maintainScrollPosition();
                    navigateToSearchResult('next');
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentSearchIndex === searchResults.total - 1}
                >
                  Next →
                </button>
                <button
                  onClick={clearSearch}
                  className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Section - Takes remaining space, scrollable */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col items-center justify-start w-full overflow-hidden">
          <ChatContainer
            onScroll={() => {}} // Scroll handling is done in useEffect
            containerRef={chatContainerRef}
          >
            {/* Loading more indicator */}
            {isLoadingMore && <LoadingMoreIndicator />}
            
            {/* Search status */}
            {isSearching && (
              <div className="text-center py-4 text-gray-600">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600 mx-auto mb-2"></div>
                Searching...
              </div>
            )}
            
            {/* No search results */}
            {searchResults && searchResults.total === 0 && searchQuery && (
              <div className="text-center py-8 text-gray-600">
                <p className="text-lg font-medium mb-2">No results found</p>
                <p className="text-sm">Try different keywords or check your spelling</p>
              </div>
            )}
            
            <ChatMessages
              chat={messages}
              user1={user1}
              user2={user2}
              messageRefs={messageRefs}
              highlightedMessageIds={highlightedMessageIds}
            />
            
            {/* Loading more newer messages indicator */}
            {isLoadingMoreNewer && (
              <div className="text-center py-4 text-gray-600">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600 mx-auto mb-2"></div>
                Loading newer messages...
              </div>
            )}
            
            {/* End of messages indicator */}
            {!hasMore && messages.length > 0 && !isSearching && (
              <div className="text-center py-4 text-gray-500 text-sm">
                End of messages
              </div>
            )}
          </ChatContainer>
        </div>
      </div>
    </div>
  );
}
