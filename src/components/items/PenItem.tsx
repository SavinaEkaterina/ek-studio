import React, { memo } from 'react';
import penImg from '../../assets/Portfolio/03_Assets/Pen/pen.webp';

interface PenItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PenItem: React.FC<PenItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('✒️ Черная гелевая ручка • Заметки & Процесс создания идеи')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 active:brightness-110 rotate-[34deg] touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '80px', height: '336px' }}
    >
      {/* Pen Image Asset */}
      <img
        src={penImg || '/Portfolio/03_Assets/Pen/pen.webp'}
        alt="Ручка"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = '/Portfolio/03_Assets/Pen/pen.webp';
          }
        }}
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

PenItem.displayName = 'PenItem';

