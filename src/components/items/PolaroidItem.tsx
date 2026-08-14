import React, { memo } from 'react';
import polaroidImg from '../../assets/Portfolio/03_Assets/Polaroid/Polaroid.webp';

interface PolaroidItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PolaroidItem: React.FC<PolaroidItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('📸 Снимок Polaroid • Екатерина Савина — Обо мне')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer overflow-visible transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:brightness-110 rotate-[6deg] touch-manipulation min-w-[36px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '168px', height: '202px' }}
    >
      {/* Polaroid WebP Image Asset */}
      <img
        src={polaroidImg || '/Portfolio/03_Assets/Polaroid/Polaroid.webp'}
        alt="Снимок Polaroid • Екатерина Савина"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = '/Portfolio/03_Assets/Polaroid/Polaroid.webp';
          }
        }}
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer transition-all duration-300"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

PolaroidItem.displayName = 'PolaroidItem';

