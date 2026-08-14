import React, { memo } from 'react';
import smartphoneImg from '../../assets/Portfolio/03_Assets/Smartphone/Smartphone.webp';

interface SmartphoneItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SmartphoneItem: React.FC<SmartphoneItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('📱 Смартфон • Контакты & Быстрая связь')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 active:brightness-110 rotate-0 touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '150px', height: '280px' }}
    >
      {/* Smartphone Image Asset */}
      <img
        src={smartphoneImg}
        alt="Смартфон"
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer transition-all duration-300"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

SmartphoneItem.displayName = 'SmartphoneItem';

