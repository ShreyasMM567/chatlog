import React from 'react';
import { MessageItemProps } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { 
  formatMessageWithTwemoji, 
  isMessageEdited, 
  isOneTimeMedia, 
  isDeletedMessage 
} from '@/lib/chatUtils';

export function MessageItem({ item, isUser1, isHighlighted }: MessageItemProps & { isHighlighted?: boolean }) {
  if (item.type === 'date') {
    return null; // Date notes are handled separately
  }

  const messageText = item.message || '';
  const { isEdited, cleanMessage } = isMessageEdited(messageText);
  const isOneTimeMediaMessage = isOneTimeMedia(messageText);
  const isDeleted = isDeletedMessage(messageText);

  // Handle one-time media messages
  if (isOneTimeMediaMessage) {
    return (
      <div className={`flex ${isUser1 ? 'justify-end' : 'justify-start'}`}>
        <div className="bg-[#f1f8e9] text-[#4b6043] rounded-2xl border border-[#c8e6c9] px-4 py-2 max-w-[80vw] sm:max-w-[350px] mb-1 text-center flex items-center gap-2 font-semibold shadow">
          {/* Media icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="mr-1 flex-shrink-0"
          >
            <rect x="2" y="4" width="12" height="8" rx="2" fill="#c8e6c9" />
            <circle cx="5.5" cy="8" r="1.2" fill="#fff" />
            <path 
              d="M7 10l2-2 3 3" 
              stroke="#4b6043" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          One time media
        </div>
      </div>
    );
  }

  // Handle deleted messages
  if (isDeleted) {
    return (
      <div className={`flex ${isUser1 ? 'justify-end' : 'justify-start'}`}>
        <div className="bg-gray-100 text-gray-400 rounded-2xl border border-gray-200 px-4 py-2 max-w-[80vw] sm:max-w-[350px] mb-1 text-center flex items-center gap-2 font-normal italic opacity-70">
          {/* Ban icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="mr-1 flex-shrink-0"
          >
            <circle cx="8" cy="8" r="7" stroke="#888" strokeWidth="1.5" fill="none" />
            <line x1="4.5" y1="11.5" x2="11.5" y2="4.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {messageText}
        </div>
      </div>
    );
  }

  // Handle regular messages
  return (
    <div className={`flex ${isUser1 ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-2xl px-4 py-2 max-w-[80vw] sm:max-w-[350px] mb-1 shadow-md whitespace-pre-line font-medium border ${
        isUser1 
          ? 'bg-[#dcf8c6] text-[#075e54] border-[#b2dfdb]' 
          : 'bg-white text-gray-900 border border-gray-200'
      } ${isHighlighted ? 'ring-2 ring-yellow-400 ring-opacity-75 shadow-lg' : ''}`}>
        <div className="text-xs mb-1 font-bold tracking-wide opacity-80">
          {item.sender}
        </div>
        <MessageBubble
          className="text-base whitespace-pre-line"
          html={formatMessageWithTwemoji(cleanMessage)}
        />
        <div className={`flex items-center mt-1 text-xs ${isUser1 ? 'justify-end' : 'justify-start'}`}>
          {isUser1 ? null : isEdited && (
            <span className="text-[#81c784] mr-2 font-semibold">Edited</span>
          )}
          <span className="text-gray-400">{item.time}</span>
          {isUser1 && isEdited && (
            <span className="text-[#81c784] ml-2 font-semibold">Edited</span>
          )}
        </div>
      </div>
    </div>
  );
}
