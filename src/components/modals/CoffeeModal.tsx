import React, { useState, useEffect } from 'react';
import { X, Coffee, Disc, Clock, Flame, Heart, Play, Pause, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';
import logoImg from '../../assets/Portfolio/03_Assets/logo/logo.webp';
import { audioManager, COFFEE_TRACKS } from '../../lib/AudioManager';

interface CoffeeModalProps {
  onClose: () => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(audioManager.coffeePlaying);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(audioManager.coffeeTrackIndex);
  const [isMuted, setIsMuted] = useState<boolean>(audioManager.coffeeMuted);

  const selectedTrack = COFFEE_TRACKS[selectedTrackIndex] || COFFEE_TRACKS[0];

  useEffect(() => {
    audioManager.openCoffeeModal();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioManager.closeCoffeeModal();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const unsubscribe = audioManager.subscribe(() => {
      setIsPlaying(audioManager.coffeePlaying);
      setSelectedTrackIndex(audioManager.coffeeTrackIndex);
      setIsMuted(audioManager.coffeeMuted);
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      audioManager.closeCoffeeModal();
      unsubscribe();
    };
  }, [onClose]);

  const handleTogglePlay = () => {
    audioManager.toggleCoffeeMusic();
  };

  const handleSelectTrack = (index: number) => {
    audioManager.playCoffeeTrack(index);
  };

  const handleToggleMute = () => {
    audioManager.toggleCoffeeMute();
  };

  const handleClose = () => {
    audioManager.closeCoffeeModal();
    onClose();
  };


  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Кофейная пауза"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] bg-[#121215] border border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Логотип" className="w-full h-full object-contain select-none pointer-events-none p-0.5" referrerPolicy="no-referrer" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-semibold font-sans-ui text-stone-100 truncate">Кофейная пауза • Режим работы</h2>
              <p className="text-[11px] sm:text-xs text-stone-400 font-serif-book italic truncate">
                Черный свежесваренный кофе &amp; Музыка для глубокой фокусировки
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 rounded-full bg-stone-900 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-3.5 sm:p-6 space-y-3.5 sm:space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* Coffee Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-900/80 border border-stone-800">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-0.5 sm:mb-1" />
              <div className="text-sm sm:text-lg font-mono font-bold text-stone-100">2-3</div>
              <div className="text-[9px] sm:text-[10px] text-stone-400 font-sans-ui leading-tight">Чашки в день</div>
            </div>

            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-900/80 border border-stone-800">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-0.5 sm:mb-1" />
              <div className="text-sm sm:text-lg font-mono font-bold text-stone-100">10:00</div>
              <div className="text-[9px] sm:text-[10px] text-stone-400 font-sans-ui leading-tight">Начало работы</div>
            </div>

            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-900/80 border border-stone-800">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-0.5 sm:mb-1" />
              <div className="text-sm sm:text-lg font-mono font-bold text-stone-100">100%</div>
              <div className="text-[9px] sm:text-[10px] text-stone-400 font-sans-ui leading-tight">Арабика Эфиопия</div>
            </div>
          </div>

          {/* Deep Focus Music Section */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-900/60 border border-amber-500/30 space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-amber-400 leading-tight">
                <Disc className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span className="truncate">САУНДТРЕК &bull; ФОКУС-ПЛЕЙЛИСТ</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleToggleMute}
                  className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 transition-colors"
                  title={isMuted ? 'Включить звук' : 'Выключить звук'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />}
                </button>
              </div>
            </div>

            {/* Currently Playing / Selected Main Card */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-950 border border-amber-500/40 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <button
                  onClick={handleTogglePlay}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-transform active:scale-95 sm:hover:scale-105 shrink-0 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-stone-100 font-sans-ui truncate">{selectedTrack.title}</span>
                    {selectedTrack.isMain && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] sm:text-[9px] font-mono font-semibold flex items-center gap-0.5 shrink-0">
                        <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> Основной
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-stone-400 font-serif-book italic mt-0.5 truncate">{selectedTrack.artist}</div>
                </div>
              </div>

              {/* Animated Audio Equalizer Visualizer */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-4 sm:h-5 px-1 shrink-0">
                  <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full animate-bounce h-2.5 sm:h-3" style={{ animationDuration: '0.6s' }} />
                  <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full animate-bounce h-4 sm:h-5" style={{ animationDuration: '0.4s' }} />
                  <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full animate-bounce h-2 sm:h-2" style={{ animationDuration: '0.8s' }} />
                  <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full animate-bounce h-3 sm:h-4" style={{ animationDuration: '0.5s' }} />
                </div>
              )}
            </div>

            {/* Track Selector List */}
            <div className="space-y-1 pt-1">
              <div className="text-[9px] sm:text-[10px] uppercase font-mono text-stone-400 tracking-wider">Плейлист студии:</div>
              {COFFEE_TRACKS.map((t, idx) => {
                const isSelected = idx === selectedTrackIndex;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`w-full p-2 sm:p-2.5 rounded-lg border text-left flex items-center justify-between gap-2 transition-all min-h-[42px] ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:bg-stone-900/60 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isSelected ? <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-stone-700 shrink-0" />}
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-medium font-sans-ui truncate">{t.title}</div>
                        <div className="text-[9px] sm:text-[10px] text-stone-500 font-serif-book italic truncate">{t.artist}</div>
                      </div>
                    </div>

                    {t.isMain && (
                      <span className="text-[8px] sm:text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
                        Основной
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-400 font-serif-book italic text-center leading-relaxed">
            «Каждый успешный проект начинается со свежей идеи, тихой студии и идеальной чашки черного кофе.»
          </p>
        </div>

      </div>
    </div>
  );
};

