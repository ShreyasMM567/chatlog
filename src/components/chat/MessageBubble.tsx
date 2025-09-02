import React from 'react';
import { MessageBubbleProps } from '@/types/chat';

export function MessageBubble({ html, className }: MessageBubbleProps) {
  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
