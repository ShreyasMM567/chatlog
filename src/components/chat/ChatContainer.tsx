import React from 'react';
import { ChatContainerProps } from '@/types/chat';

export function ChatContainer({ children, onScroll, containerRef }: ChatContainerProps) {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px #0001',
        padding: 20,
        height: '90vh',
        overflowY: 'auto',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={containerRef}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
}
