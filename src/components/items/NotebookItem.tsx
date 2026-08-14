import React, { memo } from 'react';
import notebookImg from '../../assets/Portfolio/03_Assets/Notebook/OpenNotes.webp';

interface NotebookItemProps {
  onHover: (text: string | null) => void;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const NotebookItem: React.FC<NotebookItemProps> = memo(({ onHover, onClick, className, style }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover('📓 Наша философия • Подход к работе')}
      onMouseLeave={() => onHover(null)}
      className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 active:brightness-110 rotate-[-8deg] touch-manipulation min-w-[44px] min-h-[44px] select-none ${className || ''}`}
      style={style || { width: '212px', height: '295px' }}
    >
      {/* Notebook Image Asset */}
      <img
        src={notebookImg}
        alt="Блокнот"
        className="relative w-full h-full object-contain pointer-events-none select-none cursor-pointer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
});

NotebookItem.displayName = 'NotebookItem';

