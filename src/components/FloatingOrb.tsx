interface FloatingOrbProps {
  position: string;
  size: string;
  color: string;
  delay?: string;
}

export default function FloatingOrb({ position, size, color, delay = "" }: FloatingOrbProps) {
  return (
    <div 
      className={`absolute ${position} ${size} ${color} rounded-full animate-pulse ${delay}`}
    />
  );
} 