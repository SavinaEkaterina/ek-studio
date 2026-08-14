import React, { memo } from 'react';
import coffeeImg from '../../assets/Portfolio/03_Assets/Coffee/coffee.webp';

interface MugItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MugItem: React.FC<MugItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('☕ Белая керамическая кружка • Атмосфера & Кофейная пауза')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer overflow-visible transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 active:brightness-110 touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '120px', height: '120px' }}
    >
      {/* Realistic Multi-Stream Steam Overlay */}
      <div className="absolute -top-16 inset-x-0 h-20 pointer-events-none flex justify-center items-end gap-1 z-30 transition-opacity duration-500 opacity-90 group-hover:opacity-100 overflow-visible">
        <div className="w-2.5 h-12 bg-gradient-to-t from-stone-100/45 via-amber-100/25 to-transparent rounded-full blur-[3px] animate-steam-stream-1" />
        <div className="w-2 h-14 bg-gradient-to-t from-amber-100/40 via-stone-100/20 to-transparent rounded-full blur-[4px] animate-steam-stream-2" />
        <div className="w-3 h-10 bg-gradient-to-t from-stone-100/38 via-amber-200/25 to-transparent rounded-full blur-[3px] animate-steam-stream-3" />
        <div className="w-1.5 h-13 bg-gradient-to-t from-amber-100/42 via-stone-100/22 to-transparent rounded-full blur-[4px] animate-steam-stream-4" />
        <div className="w-2.5 h-11 bg-gradient-to-t from-stone-100/35 via-amber-100/20 to-transparent rounded-full blur-[3px] animate-steam-stream-5" />
      </div>

      {/* Coffee Mug WebP Image Asset */}
      <img
        src={coffeeImg}
        alt="Кружка кофе"
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer transition-all duration-300"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

MugItem.displayName = 'MugItem';

