import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export default function GlassContainer({ children, className = "", padding = "p-8" }: GlassContainerProps) {
  return (
    <div className={`${padding} rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${className}`}>
      {children}
    </div>
  );
} 