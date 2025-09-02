import twemoji from 'twemoji';
import { ChatMessage, ChatItem } from '@/types/chat';

// Helper to parse a single line
export function parseLine(line: string): ChatMessage | null {
  // Format: 11/12/2024, 19:56 - Name: Message
  const match = line.match(/^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+): (.*)$/);
  if (match) {
    return {
      date: match[1],
      time: match[2],
      sender: match[3],
      message: match[4],
    };
  }
  // System message or continuation
  return null;
}

export function parseChatFile(content: string): ChatMessage[] {
  const lines = content.split(/\r?\n/);
  const messages: ChatMessage[] = [];
  let lastMsg: ChatMessage | null = null;
  
  for (const line of lines) {
    const parsed = parseLine(line);
    if (parsed) {
      messages.push(parsed);
      lastMsg = parsed;
    } else if (lastMsg && line.trim() !== '') {
      // Continuation of previous message
      lastMsg.message += '\n' + line;
    }
  }
  return messages;
}

export function insertDateNotes(messages: ChatMessage[]): ChatItem[] {
  const result: ChatItem[] = [];
  let lastDate = '';
  
  for (const msg of messages) {
    if (msg.date !== lastDate) {
      result.push({ type: 'date', date: msg.date });
      lastDate = msg.date;
    }
    result.push({ type: 'msg', ...msg });
  }
  return result;
}

export function formatDateNote(dateStr: string): string {
  // dateStr: '11/12/2024' (DD/MM/YYYY)
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString('default', { month: 'long' });
  
  // Suffix logic
  const getSuffix = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${monthName} ${day}${getSuffix(day)}, ${year}`;
}

// Helper to format message with line breaks and Twemoji
export function formatMessageWithTwemoji(text: string): string {
  if (!text) return '';
  // Replace line breaks with <br>
  const withBreaks = text.replace(/\n/g, '<br>');
  // Parse with Twemoji
  return twemoji.parse(withBreaks, { folder: '72x72', ext: '.png', base: '/twemoji/' });
}

export function getSendersFromMessages(messages: ChatMessage[]): string[] {
  return Array.from(new Set(messages.map(m => m.sender)));
}

export function isMessageEdited(message: string): { isEdited: boolean; cleanMessage: string } {
  let isEdited = false;
  let cleanMessage = message;
  
  if (typeof message === 'string' && message.endsWith(' <This message was edited>')) {
    cleanMessage = message.replace(/ <This message was edited>$/, '');
    isEdited = true;
  }
  
  return { isEdited, cleanMessage };
}

export function isOneTimeMedia(message: string): boolean {
  return message === null || message === 'null';
}

export function isDeletedMessage(message: string): boolean {
  return message === 'This message was deleted';
}
