import React, { memo } from 'react';
import laptopImg from '../../assets/Portfolio/03_Assets/Laptop/laptop.webp';

interface LaptopItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const LaptopItem: React.FC<LaptopItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('💻 Ноутбук • Нажмите для полного просмотра портфолио')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] active:brightness-110 touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '806px', height: '576px' }}
    >
      {/* Laptop Image Asset */}
      <img
        src={laptopImg || '/Portfolio/03_Assets/Laptop/laptop.webp'}
        alt="Ноутбук"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = '/Portfolio/03_Assets/Laptop/laptop.webp';
          }
        }}
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

LaptopItem.displayName = 'LaptopItem';

