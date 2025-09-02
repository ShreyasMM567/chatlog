import { useRef, useLayoutEffect, useEffect } from 'react';
import { UseScrollLogicReturn, ChatItem } from '@/types/chat';

export function useScrollLogic(
  chat: ChatItem[],
  allMessages: ChatItem[],
  loadedCount: number,
  setLoadedCount: (count: number) => void,
  setCurrentDate: (date: string) => void,
  setIsLoadingMore: (loading: boolean) => void
): UseScrollLogicReturn {
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const prevScrollHeight = useRef<number | null>(null);
  const prevScrollTop = useRef<number | null>(null);
  const prevMessageCount = useRef<number | null>(null);
  const isLoadingMore = useRef(false);

  // Scroll to bottom on initial load only
  useLayoutEffect(() => {
    if (chatContainerRef.current && chat.length > 0 && isInitialLoad.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      isInitialLoad.current = false;
    }
  }, [chat.length]);

  // Infinite scroll up: load more when scrolled to top
  const handleScroll = () => {
    if (!chatContainerRef.current || isLoadingMore.current) return;
    
    const container = chatContainerRef.current;
    if (container.scrollTop === 0 && loadedCount < allMessages.length) {
      isLoadingMore.current = true;
      setIsLoadingMore(true);
      
      // Record scrollHeight and scrollTop before loading more
      prevScrollHeight.current = container.scrollHeight;
      prevScrollTop.current = container.scrollTop;
      prevMessageCount.current = chat.length;
      
      // Add a small delay to show the loading indicator
      setTimeout(() => {
        setLoadedCount(Math.min(loadedCount + 50, allMessages.length));
      }, 300);
    }
  };

  // Restore scroll position after loading more messages
  useLayoutEffect(() => {
    if (
      prevScrollHeight.current !== null &&
      chatContainerRef.current &&
      chat.length > (prevMessageCount.current ?? 0) &&
      isLoadingMore.current
    ) {
      // Calculate the difference in scrollHeight
      const container = chatContainerRef.current;
      const newScrollHeight = container.scrollHeight;
      const diff = newScrollHeight - (prevScrollHeight.current ?? 0);
      
      // Restore scroll position
      container.scrollTop = (prevScrollTop.current ?? 0) + diff;
      
      // Reset refs and loading state
      prevScrollHeight.current = null;
      prevScrollTop.current = null;
      prevMessageCount.current = null;
      isLoadingMore.current = false;
      setIsLoadingMore(false);
    }
  }, [chat, setIsLoadingMore]);

  // Sticky date note logic: sync with the date of the topmost visible message or date note
  useEffect(() => {
    const updateStickyDate = () => {
      if (!chatContainerRef.current) return;
      const containerTop = chatContainerRef.current.getBoundingClientRect().top;
      let foundDate = '';
      for (let i = 0; i < chat.length; i++) {
        const el = messageRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - containerTop <= 8) {
            // Use the date for this item (date note or message)
            const itemDate = chat[i].date;
            if (itemDate) {
              foundDate = itemDate;
            }
          }
        }
      }
      if (foundDate) setCurrentDate(foundDate);
    };
    
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateStickyDate);
    }
    // Initial call
    updateStickyDate();
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateStickyDate);
      }
    };
  }, [chat, setCurrentDate]);

  return {
    chatContainerRef,
    messageRefs,
    isInitialLoad,
    handleScroll,
  };
}
