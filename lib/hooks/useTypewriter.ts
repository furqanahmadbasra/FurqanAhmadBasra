'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(
  lines: string[],
  typingSpeed = 40,
  lineDelay = 500,
  loop = false
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (loop) {
        const timeout = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
          setIsComplete(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setIsComplete(true), 0);
      return () => clearTimeout(timeout);
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLineIndex((l) => l + 1);
      setCurrentCharIndex(0);
    }, lineDelay);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay, loop]);

  const reset = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
  }, []);

  return { displayedLines, isComplete, reset };
}
