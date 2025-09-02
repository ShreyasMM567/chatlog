import { useState, useEffect } from 'react';
import { ChatMessage, ChatItem, UseChatDataReturn } from '@/types/chat';
import { parseChatFile, insertDateNotes, getSendersFromMessages } from '@/lib/chatUtils';

export function useChatData(): UseChatDataReturn {
  const [allMessages, setAllMessages] = useState<ChatItem[]>([]);
  const [chat, setChat] = useState<ChatItem[]>([]);
  const [rawMessages, setRawMessages] = useState<ChatMessage[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [loadedCount, setLoadedCount] = useState(50); // Number of messages to show
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch chat file and parse on mount
  useEffect(() => {
    setIsLoading(true);
    fetch('/chat/WhatsApp Chat with Saanu The Kiddo.txt')
      .then(res => res.text())
      .then(content => {
        const raw = parseChatFile(content);
        setRawMessages(raw);
        setAllMessages(insertDateNotes(raw));
        // Set initial date
        const firstDate = raw.find(item => item.date)?.date || '';
        setCurrentDate(firstDate);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading chat:', error);
        setIsLoading(false);
      });
  }, []);

  // Update chat when allMessages or loadedCount changes
  useEffect(() => {
    if (allMessages.length > 0) {
      const newChat = allMessages.slice(Math.max(0, allMessages.length - loadedCount));
      setChat(newChat);
      // Set sticky date note to the last visible date
      for (let i = newChat.length - 1; i >= 0; i--) {
        if (newChat[i].type === 'date') {
          setCurrentDate(newChat[i].date!);
          break;
        }
      }
    }
  }, [allMessages, loadedCount]);

  // Get all senders for alignment
  const senders = getSendersFromMessages(rawMessages);
  const user1 = senders[0] || '';
  const user2 = senders[1] || '';

  return {
    allMessages,
    chat,
    rawMessages,
    currentDate,
    loadedCount,
    setLoadedCount,
    senders,
    user1,
    user2,
    isLoading,
    isLoadingMore,
    setIsLoadingMore,
  };
}
