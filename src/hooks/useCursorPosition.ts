import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number; // normalized 0-1
  y: number; // normalized 0-1
}

const useCursorPosition = (): CursorPosition => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setPosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export default useCursorPosition; 