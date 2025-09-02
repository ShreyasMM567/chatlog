import React, { useState } from 'react';
import { ChatHeader, ChatContainer, ChatMessages, DateNote } from './index';
import { ChatLoading } from './ChatLoading';
import { LoadingMoreIndicator } from './LoadingMoreIndicator';
import { useChatData } from '@/hooks/useChatData';
import { useScrollLogic } from '@/hooks/useScrollLogic';

export function Chat() {
  const {
    allMessages,
    chat,
    currentDate,
    loadedCount,
    setLoadedCount,
    user1,
    user2,
    isLoading,
    isLoadingMore,
    setIsLoadingMore,
  } = useChatData();

  const [currentDateState, setCurrentDateState] = useState(currentDate);

  const {
    chatContainerRef,
    messageRefs,
    handleScroll,
  } = useScrollLogic(
    chat,
    allMessages,
    loadedCount,
    setLoadedCount,
    setCurrentDateState,
    setIsLoadingMore
  );

  // Show loading component while data is being fetched
  if (isLoading) {
    return <ChatLoading />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e8f5e9] via-[#f0f4c3] to-[#fff] flex flex-col">
      <ChatHeader title="WhatsApp Chat" />
      
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        <ChatContainer
          onScroll={handleScroll}
          containerRef={chatContainerRef}
        >
          {/* Loading more indicator */}
          {isLoadingMore && <LoadingMoreIndicator />}
          
          {/* Sticky date note */}
          <DateNote date={currentDateState} isSticky={true} />
          
          <ChatMessages
            chat={chat}
            user1={user1}
            user2={user2}
            messageRefs={messageRefs}
          />
        </ChatContainer>
      </main>
    </div>
  );
}
