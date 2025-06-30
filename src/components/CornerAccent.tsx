interface CornerAccentProps {
  position: string;
  size: string;
  color: string;
  borderStyle: string;
}

export default function CornerAccent({ position, size, color, borderStyle }: CornerAccentProps) {
  return (
    <div
      className={`absolute ${position} ${size} ${borderStyle} ${color} ${color.includes('purple') ? 'rounded-tl-lg' : 'rounded-br-lg'}`}
    />
  );
} 