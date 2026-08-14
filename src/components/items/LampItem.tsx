import React, { memo } from 'react';
import lampImg from '../../assets/Portfolio/03_Assets/Lamp/lamp.webp';

interface LampItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  lampOn: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LampItem: React.FC<LampItemProps> = memo(({ onHover, onClick, lampOn, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('💡 Черная металлическая лампа • Нажмите для настройки освещения')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 active:brightness-110 touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '250px', height: '260px' }}
    >
      {/* Lamp Image Asset */}
      <img
        src={lampImg || '/Portfolio/03_Assets/Lamp/lamp.webp'}
        alt="Лампа"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'true';
            e.currentTarget.src = '/Portfolio/03_Assets/Lamp/lamp.webp';
          }
        }}
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

LampItem.displayName = 'LampItem';

