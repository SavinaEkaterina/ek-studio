import React, { memo } from 'react';
import mouseImg from '../../assets/Portfolio/03_Assets/Mouse/Mouse.webp';

interface MouseItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MouseItem: React.FC<MouseItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('🖱️ Беспроводная мышь • Навигация по галерее')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 active:brightness-110 rotate-[6deg] touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '106px', height: '168px' }}
    >
      {/* Mouse Image Asset */}
      <img
        src={mouseImg || '/Portfolio/03_Assets/Mouse/Mouse.webp'}
        alt="Беспроводная мышь"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = '/Portfolio/03_Assets/Mouse/Mouse.webp';
          }
        }}
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer transition-all duration-300"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

MouseItem.displayName = 'MouseItem';

