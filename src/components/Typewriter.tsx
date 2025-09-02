"use client";
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character
  pauseTime?: number; // ms to pause on full word
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1200,
  className = "",
}) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullWord = words[currentWord];

    if (!isDeleting && displayed.length < fullWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullWord.slice(0, displayed.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullWord.slice(0, displayed.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && displayed.length === fullWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, words, currentWord, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`bg-gradient-to-r from-purple-400 via-blue-400 via-60% to-pink-400 to-90% to-red-400 text-transparent bg-clip-text ${className}`}>
      {displayed}
      <span className="inline-block w-2 h-[1em] align-middle bg-white ml-1 animate-pulse rounded-sm" />
    </span>
  );
};

export default Typewriter; 