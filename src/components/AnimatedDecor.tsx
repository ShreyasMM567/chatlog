'use client';

import React from 'react';
import useCursorPosition from '../hooks/useCursorPosition';

const AnimatedDecor = () => {
  const { x, y } = useCursorPosition();
  console.log('Cursor position:', x, y);

  // Movement multiplier (px) for subtle effect, now negative for opposite direction and smaller amplitude
  const move = (dx: number, dy: number) => ({
    transform: `translate(${-dx * 18}px, ${-dy * 18}px)`
  });

  // Movement for red blobs (opposite direction, subtle)
  const redMove = (dx: number, dy: number, mult = 14) => ({
    transform: `translate(${-dx * mult}px, ${-dy * mult}px)`
  });

  // Amplitudes for each red blob (expanded and more varied)
  const redAmplitudes = [18, 13, 10, 12, 10, 8, 16, 7, 14, 9, 21, 6, 17, 11, 15, 5];

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      {/* Top Left Blob (blue, passive) */}
      <svg
        className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] animate-float-slow opacity-80 blur-lg"
        style={{ filter: 'drop-shadow(0 0 40px #a78bfa88) drop-shadow(0 0 80px #38bdf899)' }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="200" cy="200" rx="180" ry="140" fill="url(#grad1)" />
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      {/* Bottom Right Orb (floats passively) */}
      <svg
        className="absolute bottom-[-100px] right-[-60px] w-[260px] h-[260px] animate-float-medium opacity-70 blur-md"
        style={{ ...move(0, 0), filter: 'drop-shadow(0 0 32px #f472b688) drop-shadow(0 0 60px #38bdf888)' }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="160" fill="url(#grad2)" />
        <defs>
          <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      {/* Center Right Small Orb (blue, passive) */}
      <svg
        className="absolute top-1/2 right-16 w-[120px] h-[120px] animate-float-fast opacity-60 blur"
        style={{ filter: 'drop-shadow(0 0 24px #a78bfa88)', transform: 'translateY(-50%)' }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" fill="url(#grad3)" />
        <defs>
          <radialGradient id="grad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      {/* Top Right Subtle Blob (floats passively) */}
      <svg
        className="absolute top-[-30px] right-[-30px] w-[220px] h-[220px] animate-float-medium opacity-50 blur"
        style={{ ...move(0, 0), filter: 'drop-shadow(0 0 32px #38bdf8aa)' }}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="110" cy="110" rx="100" ry="80" fill="url(#grad4)" />
        <defs>
          <radialGradient id="grad4" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
      {/* Bottom Left Subtle Blob (floats passively) */}
      <svg
        className="absolute bottom-[-30px] left-[-20px] w-[180px] h-[180px] animate-float-slow opacity-40 blur-sm"
        style={{ ...move(0, 0), filter: 'drop-shadow(0 0 24px #f472b6aa)' }}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="90" cy="90" rx="80" ry="60" fill="url(#grad5)" />
        <defs>
          <radialGradient id="grad5" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
          </radialGradient>
        </defs>
      </svg>
      {/* Far Left Subtle Blob (floats passively) */}
      <svg
        className="absolute top-1/3 left-[-40px] w-[140px] h-[140px] animate-float-fast opacity-35 blur-sm"
        style={{ ...move(0, 0), filter: 'drop-shadow(0 0 16px #a78bfa88)' }}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="70" cy="70" rx="60" ry="50" fill="url(#grad6)" />
        <defs>
          <radialGradient id="grad6" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.12" />
          </radialGradient>
        </defs>
      </svg>
      {/* --- RED BLOBS THAT FOLLOW CURSOR --- */}
      {/* Lowered and grouped red blobs */}
      <svg className="absolute top-[32%] left-[45%] w-[48px] h-[48px] opacity-70 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[0]), filter: 'drop-shadow(0 0 16px #f472b6cc)' }}
        viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="24" rx="22" ry="18" fill="url(#redgrad1)" />
        <defs>
          <radialGradient id="redgrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[38%] left-[53%] w-[36px] h-[36px] opacity-60 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[1]), filter: 'drop-shadow(0 0 12px #f472b6bb)' }}
        viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="18" cy="18" rx="16" ry="13" fill="url(#redgrad2)" />
        <defs>
          <radialGradient id="redgrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[38%] left-[39%] w-[32px] h-[32px] opacity-60 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[2]), filter: 'drop-shadow(0 0 10px #f472b6bb)' }}
        viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="14" ry="11" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      {/* Bottom Left Tiny Red Blob */}
      <svg className="absolute bottom-[22%] left-[22%] w-[36px] h-[36px] opacity-60 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[3]), filter: 'drop-shadow(0 0 12px #f472b6bb)' }}
        viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="18" cy="18" rx="16" ry="13" fill="url(#redgrad2)" />
        <defs>
          <radialGradient id="redgrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      {/* Bottom Right Tiny Red Blob */}
      <svg className="absolute bottom-[18%] right-[18%] w-[32px] h-[32px] opacity-60 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[4]), filter: 'drop-shadow(0 0 10px #f472b6bb)' }}
        viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="14" ry="11" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      {/* Extra tiny red blobs all around */}
      <svg className="absolute top-[10%] left-[80%] w-[18px] h-[18px] opacity-50 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[5]), filter: 'drop-shadow(0 0 6px #f472b6bb)' }}
        viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="9" cy="9" rx="8" ry="7" fill="url(#redgrad2)" />
        <defs>
          <radialGradient id="redgrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[80%] left-[70%] w-[22px] h-[22px] opacity-50 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[6]), filter: 'drop-shadow(0 0 8px #f472b6bb)' }}
        viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="11" cy="11" rx="10" ry="8" fill="url(#redgrad1)" />
        <defs>
          <radialGradient id="redgrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[60%] left-[10%] w-[20px] h-[20px] opacity-50 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[7]), filter: 'drop-shadow(0 0 7px #f472b6bb)' }}
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="10" cy="10" rx="9" ry="7" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[70%] left-[30%] w-[24px] h-[24px] opacity-50 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[8]), filter: 'drop-shadow(0 0 8px #f472b6bb)' }}
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="11" ry="9" fill="url(#redgrad1)" />
        <defs>
          <radialGradient id="redgrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[50%] left-[80%] w-[20px] h-[20px] opacity-50 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[9]), filter: 'drop-shadow(0 0 7px #f472b6bb)' }}
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="10" cy="10" rx="9" ry="7" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      {/* More new red blobs */}
      <svg className="absolute top-[15%] left-[10%] w-[14px] h-[14px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[10]), filter: 'drop-shadow(0 0 5px #f472b6bb)' }}
        viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="7" cy="7" rx="6" ry="5" fill="url(#redgrad2)" />
        <defs>
          <radialGradient id="redgrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[85%] left-[50%] w-[16px] h-[16px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[11]), filter: 'drop-shadow(0 0 5px #f472b6bb)' }}
        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="8" cy="8" rx="7" ry="6" fill="url(#redgrad1)" />
        <defs>
          <radialGradient id="redgrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[60%] left-[90%] w-[18px] h-[18px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[12]), filter: 'drop-shadow(0 0 6px #f472b6bb)' }}
        viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="9" cy="9" rx="8" ry="7" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[30%] left-[80%] w-[20px] h-[20px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[13]), filter: 'drop-shadow(0 0 7px #f472b6bb)' }}
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="10" cy="10" rx="9" ry="7" fill="url(#redgrad1)" />
        <defs>
          <radialGradient id="redgrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[75%] left-[15%] w-[18px] h-[18px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[14]), filter: 'drop-shadow(0 0 6px #f472b6bb)' }}
        viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="9" cy="9" rx="8" ry="7" fill="url(#redgrad2)" />
        <defs>
          <radialGradient id="redgrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute top-[45%] left-[60%] w-[14px] h-[14px] opacity-40 blur-sm"
        style={{ ...redMove(x, y, redAmplitudes[15]), filter: 'drop-shadow(0 0 5px #f472b6bb)' }}
        viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="7" cy="7" rx="6" ry="5" fill="url(#redgrad3)" />
        <defs>
          <radialGradient id="redgrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedDecor; 