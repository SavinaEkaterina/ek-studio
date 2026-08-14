import React, { memo } from 'react';
import cameraImg from '../../assets/Portfolio/03_Assets/Camera/Top.webp';

interface CameraItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CameraItem: React.FC<CameraItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('📷 Фотоаппарат • Галерея фотопроектов & Кейсов')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 active:brightness-110 rotate-[-12deg] touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '190px', height: '138px' }}
    >
      {/* Camera Image Asset */}
      <img
        src={cameraImg}
        alt="Фотоаппарат"
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

CameraItem.displayName = 'CameraItem';

