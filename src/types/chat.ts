export interface ChatMessage {
  date: string;
  time: string;
  sender: string;
  message: string;
}

export interface ChatItem {
  type: 'msg' | 'date';
  date?: string;
  time?: string;
  sender?: string;
  message?: string;
}

export interface MessageBubbleProps {
  html: string;
  className?: string;
}

export interface ChatHeaderProps {
  title: string;
}

export interface DateNoteProps {
  date: string;
  isSticky?: boolean;
}

export interface MessageItemProps {
  item: ChatItem;
  isUser1: boolean;
  user1: string;
  user2: string;
  index: number;
}

export interface ChatContainerProps {
  children: React.ReactNode;
  onScroll: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface UseChatDataReturn {
  allMessages: ChatItem[];
  chat: ChatItem[];
  rawMessages: ChatMessage[];
  currentDate: string;
  loadedCount: number;
  setLoadedCount: (count: number) => void;
  senders: string[];
  user1: string;
  user2: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  setIsLoadingMore: (loading: boolean) => void;
}

export interface UseScrollLogicReturn {
  chatContainerRef: React.RefObject<HTMLDivElement>;
  messageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  isInitialLoad: React.MutableRefObject<boolean>;
  handleScroll: () => void;
}
