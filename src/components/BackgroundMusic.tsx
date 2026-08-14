import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Disc, Play, Pause } from 'lucide-react';
import { audioManager } from '../lib/AudioManager';

interface BackgroundMusicProps {
  isPaused?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(audioManager.bgPlaying);
  const [isMuted, setIsMuted] = useState<boolean>(audioManager.bgMuted);

  useEffect(() => {
    audioManager.initUserGestureHandler();

    const unsubscribe = audioManager.subscribe(() => {
      setIsPlaying(audioManager.bgPlaying);
      setIsMuted(audioManager.bgMuted);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const togglePlay = () => {
    audioManager.toggleBgMusic();
  };

  const toggleMute = () => {
    audioManager.toggleBgMute();
  };

  return (
    <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-800 p-1 rounded-full shadow-lg">
      <button
        onClick={togglePlay}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
          isPlaying
            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
            : 'bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-700/60'
        }`}
        title={isPlaying ? 'Пауза фоновой музыки' : 'Включить фоновую музыку'}
      >
        <Disc
          className={`w-3.5 h-3.5 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '4s' }}
        />
        {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-amber-400" />}
      </button>

      <button
        onClick={toggleMute}
        className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
        title={isMuted ? 'Включить звук' : 'Выключить звук'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
      </button>
    </div>
  );
};


