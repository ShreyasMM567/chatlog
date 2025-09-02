# Enhanced Search Functionality

This document describes the enhanced search functionality that allows users to navigate through search results and view messages in context around search hits.

## Features

### 1. Context-Aware Search Results
- When you search for a term, the chat window automatically loads and displays messages around the first search result
- Shows approximately 5 messages before and 5 messages after each search hit for context
- The search result message is highlighted with a yellow ring

### 2. Search Navigation
- Navigation controls appear below the header when search results are found
- Shows current result position (e.g., "Result 2 of 5")
- Previous/Next buttons to navigate between search results
- Buttons are disabled when at the first/last result

### 3. Automatic Scrolling
- When navigating between search results, the chat automatically scrolls to the highlighted message
- Smooth scrolling animation centers the search result in the viewport
- Search result messages are visually highlighted with a yellow border

### 4. Search State Management
- Search query is preserved in the header
- Search results count is displayed
- Clear search button to return to normal chat view
- Search state persists until manually cleared

## How to Use

### Basic Search
1. Click the search icon in the header or type in the search box
2. Enter your search query
3. Press Enter or click the search button
4. The chat will automatically load and display messages around the first search result

### Navigating Results
1. After a search, navigation controls appear below the header
2. Use "Previous" and "Next" buttons to move between search results
3. The chat automatically scrolls to each new result
4. Current result position is shown (e.g., "Result 3 of 7")

### Clearing Search
1. Click "Clear search" in the header
2. Or use the "Clear search" link in the search results info
3. The chat returns to normal view with recent messages

## Technical Implementation

### Backend Changes
- New API endpoint: `/api/messages-around?rowId=X&context=5`
- Enhanced database manager with `getMessagesAround()` method
- Improved search result handling

### Frontend Changes
- Enhanced `useDatabaseChat` hook with search navigation
- Updated `DatabaseChat` component with navigation controls
- Improved `ChatHeader` with better search form handling
- Auto-scroll functionality for search results

### Key Components
- `useDatabaseChat` - Manages search state and navigation
- `DatabaseChat` - Renders navigation controls and handles scrolling
- `ChatHeader` - Search input and form handling
- `MessageItem` - Highlights search result messages

## Search Algorithm

The search uses SQLite FTS5 (Full-Text Search) for efficient searching:

1. **Search Query**: User enters search term
2. **FTS5 Search**: Database finds all matching messages
3. **Context Loading**: Loads messages around the first result
4. **Navigation**: When user navigates, loads context around new result
5. **Highlighting**: Search result messages are visually highlighted

## Performance Considerations

- Search results are cached in memory
- Context loading is optimized to fetch only necessary messages
- Smooth scrolling prevents jarring user experience
- Search state is managed efficiently to avoid unnecessary re-renders

## Future Enhancements

Potential improvements:
- Search result preview in navigation controls
- Keyboard shortcuts for navigation (Ctrl+N, Ctrl+P)
- Search filters (date range, sender, etc.)
- Search result export functionality
- Real-time search suggestions
