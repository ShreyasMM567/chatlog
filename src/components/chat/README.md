# Chat Components

This directory contains the componentized chat functionality, broken down into reusable, maintainable parts.

## Structure

### Types (`src/types/chat.ts`)
- `ChatMessage`: Interface for raw message data
- `ChatItem`: Interface for processed chat items (messages and date separators)
- `MessageBubbleProps`: Props for message bubble component
- `ChatHeaderProps`: Props for chat header component
- `DateNoteProps`: Props for date separator component
- `MessageItemProps`: Props for individual message component
- `ChatContainerProps`: Props for chat container component
- `UseChatDataReturn`: Return type for chat data hook (includes loading state)
- `UseScrollLogicReturn`: Return type for scroll logic hook

### Utilities (`src/lib/chatUtils.ts`)
- `parseLine()`: Parse individual chat line
- `parseChatFile()`: Parse entire chat file
- `insertDateNotes()`: Insert date separators between messages
- `formatDateNote()`: Format date for display
- `formatMessageWithTwemoji()`: Format message with emoji support
- `getSendersFromMessages()`: Extract unique senders
- `isMessageEdited()`: Check if message was edited
- `isOneTimeMedia()`: Check if message is one-time media
- `isDeletedMessage()`: Check if message was deleted

### Hooks
- `useChatData()` (`src/hooks/useChatData.ts`): Manages chat data state, fetching, and loading state
- `useScrollLogic()` (`src/hooks/useScrollLogic.ts`): Manages scroll behavior and infinite loading

### Components

#### `ChatLoading` (`src/components/chat/ChatLoading.tsx`)
- Displays a loading screen while chat data is being fetched
- Features a rotating WhatsApp icon using Framer Motion
- Includes animated loading dots and smooth transitions
- Matches the chat design with proper header and container styling

#### `ChatHeader` (`src/components/chat/ChatHeader.tsx`)
- Displays the chat header with title and menu icon
- Sticky positioning with WhatsApp green theme

#### `MessageBubble` (`src/components/chat/MessageBubble.tsx`)
- Renders message content with Twemoji support
- Uses `dangerouslySetInnerHTML` for emoji rendering

#### `DateNote` (`src/components/chat/DateNote.tsx`)
- Displays date separators in the chat
- Supports both regular and sticky positioning
- Formatted date display with proper suffixes

#### `ChatContainer` (`src/components/chat/ChatContainer.tsx`)
- Wraps the chat messages with proper styling
- Handles scroll container behavior
- Responsive design with max-width and shadows

#### `MessageItem` (`src/components/chat/MessageItem.tsx`)
- Renders individual messages with different types:
  - Regular messages with Twemoji support
  - Deleted messages with ban icon
  - One-time media messages with media icon
- Handles message alignment (left/right) based on sender
- Shows edit indicators and timestamps

#### `ChatMessages` (`src/components/chat/ChatMessages.tsx`)
- Renders the list of messages and date separators
- Manages refs for scroll tracking
- Orchestrates message and date note rendering

#### `Chat` (`src/components/chat/Chat.tsx`)
- Main orchestrator component
- Combines all hooks and components
- Manages overall chat state and layout
- Shows loading component while data is being fetched

## Usage

```tsx
import { Chat } from '@/components/chat/Chat';

export default function ChatPage() {
  return <Chat />;
}
```

## Features

- **Loading State**: Beautiful loading animation with rotating WhatsApp icon
- **Infinite Scroll**: Load more messages when scrolling to top
- **Sticky Date Notes**: Date separators that stick to top while scrolling
- **Message Types**: Support for regular, deleted, and one-time media messages
- **Twemoji Support**: Emoji rendering with Twemoji library
- **Responsive Design**: Works on mobile and desktop
- **Type Safety**: Full TypeScript support with proper interfaces
- **Clean Architecture**: Separation of concerns with hooks, utilities, and components
- **Smooth Animations**: Framer Motion animations for enhanced UX

## File Structure

```
src/
├── types/
│   └── chat.ts                 # TypeScript interfaces
├── lib/
│   └── chatUtils.ts            # Utility functions
├── hooks/
│   ├── useChatData.ts          # Chat data management with loading state
│   └── useScrollLogic.ts       # Scroll behavior
└── components/
    └── chat/
        ├── index.ts            # Component exports
        ├── Chat.tsx            # Main orchestrator
        ├── ChatLoading.tsx     # Loading component with animations
        ├── ChatHeader.tsx      # Header component
        ├── ChatContainer.tsx   # Container wrapper
        ├── ChatMessages.tsx    # Messages list
        ├── MessageItem.tsx     # Individual message
        ├── MessageBubble.tsx   # Message content
        ├── DateNote.tsx        # Date separator
        └── README.md           # This documentation
```

## Loading Animation Features

The `ChatLoading` component includes:
- **Rotating WhatsApp Icon**: Smooth 360° rotation animation
- **Staggered Animations**: Text and dots appear with delays for smooth UX
- **Pulsing Dots**: Three animated dots with scale and opacity changes
- **Consistent Styling**: Matches the main chat design perfectly
- **Error Handling**: Graceful fallback if chat data fails to load

## Benefits of Componentization

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the app
3. **Testability**: Individual components can be tested in isolation
4. **Type Safety**: Proper TypeScript interfaces prevent runtime errors
5. **Performance**: Better code splitting and optimization opportunities
6. **Developer Experience**: Easier to understand and modify specific functionality
7. **User Experience**: Smooth loading states and animations enhance UX
