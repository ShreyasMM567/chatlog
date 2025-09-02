import React from 'react';
import { ChatItem } from '@/types/chat';
import { MessageItem } from './MessageItem';
import { DateNote } from './DateNote';

interface ChatMessagesProps {
  chat: ChatItem[];
  user1: string;
  user2: string;
  messageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  highlightedMessageIds?: number[];
}

export function ChatMessages({ chat, user1, user2, messageRefs, highlightedMessageIds = [] }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-2">
      {chat.map((item, i) => {
        if (item.type === 'date') {
          return (
            <div
              key={i}
              ref={el => { messageRefs.current[i] = el; }}
            >
              <DateNote date={item.date!} />
            </div>
          );
        }

        const isUser1 = item.sender === user1;
        const isHighlighted = highlightedMessageIds.includes(item.rowid || 0);
        
        return (
          <div
            key={i}
            ref={el => { messageRefs.current[i] = el; }}
          >
            <MessageItem
              item={item}
              isUser1={isUser1}
              user1={user1}
              user2={user2}
              index={i}
              isHighlighted={isHighlighted}
            />
          </div>
        );
      })}
    </div>
  );
}
