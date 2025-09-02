import React from 'react';
import { DateNoteProps } from '@/types/chat';
import { formatDateNote } from '@/lib/chatUtils';

export function DateNote({ date, isSticky = false }: DateNoteProps) {
  const baseClasses = "inline-block bg-[#e2f7cb] text-[#075e54] px-5 py-1 rounded-full font-semibold text-xs shadow border border-[#b2dfdb] tracking-wide";
  
  if (isSticky) {
    return (
      <div className="sticky top-0 z-10 text-center mb-3 pointer-events-none flex justify-center">
        <span className={baseClasses}>
          {formatDateNote(date)}
        </span>
      </div>
    );
  }

  return (
    <div className="text-center my-4 text-[#388e3c] text-xs font-semibold tracking-wide">
      <span className={baseClasses}>
        {formatDateNote(date)}
      </span>
    </div>
  );
}
