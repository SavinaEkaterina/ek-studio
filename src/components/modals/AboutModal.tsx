import React, { useEffect } from 'react';
import { X, Sparkles, User, Award, Layers, Heart, Palette, Code, CheckCircle2, Send, Mail } from 'lucide-react';
import logoImg from '../../assets/Portfolio/03_Assets/logo/logo.webp';

interface AboutModalProps {
  onClose: () => void;
  onOpenPortfolio?: () => void;
  onOpenContact?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, onOpenPortfolio, onOpenContact }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Обо мне • Екатерина Савина"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl h-full max-h-[88vh] bg-[#121215] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800/80 flex items-center justify-between bg-stone-950/70 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-inner">
              <img src={logoImg} alt="Екатерина Савина" className="w-full h-full object-contain select-none pointer-events-none" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-sans-ui text-stone-100">Екатерина Савина</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3 h-3" /> Designer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-sans-ui mt-0.5">
                Веб-дизайнер • AI-Иллюстратор • UX/UI Архитектор
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors flex items-center justify-center shrink-0"
            aria-label="Закрыть модальное окно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Main Personal Bio Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-950/20 via-stone-900/60 to-stone-950 border border-amber-500/20 space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-amber-200 font-serif-book flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              История & Подход
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans-ui">
              <p className="text-sm sm:text-base font-medium text-amber-100">
                Привет! Меня зовут Екатерина Савина.
              </p>
              <p>
                Я веб-дизайнер, который верит, что хороший сайт начинается не с красивых картинок, а с понимания человека и его истории.
              </p>
              <p>
                Для меня дизайн — это не просто оформление страниц. Это возможность создать пространство, в котором посетителю будет комфортно, интересно и понятно.
              </p>
              <p>
                Каждый проект я начинаю с идеи, изучения задачи и поиска решений, которые помогут сайту работать, а не просто выглядеть красиво.
              </p>
              <p>
                Особое внимание уделяю атмосфере, деталям и эмоциям. Именно они делают каждый проект живым и запоминающимся.
              </p>
              <p className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 font-medium italic">
                Помимо веб-дизайна, я — мама четверых детей. Возможно, именно поэтому умею видеть главное, находить нестандартные решения и доводить начатое до результата.
              </p>
              <p>
                Я постоянно учусь, развиваюсь и убеждена, что лучшие проекты рождаются там, где сочетаются логика, творчество и искреннее желание помочь.
              </p>
              <p className="font-serif-book text-sm sm:text-base text-amber-300 font-semibold pt-1">
                «Я создаю сайты, которые хочется не просто посмотреть, а исследовать. Потому что хороший дизайн — это история, рассказанная через детали.»
              </p>
            </div>
          </div>

          {/* Key Principles & Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-medium text-xs sm:text-sm font-sans-ui">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Логика & Творчество</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Глубокий анализ задач и понятная структура, подчеркнутые эстетикой и аккуратной типографикой.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-medium text-xs sm:text-sm font-sans-ui">
                <Heart className="w-4 h-4 text-amber-400" />
                <span>Атмосфера & Эмоции</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Живые детали и внимание к ощущениям посетителя, создающие атмосферу погружения.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-medium text-xs sm:text-sm font-sans-ui">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Фокус на Результат</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Умение видеть главное, находить гибкие решения и доводить начатый проект до финиша.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-400 font-sans-ui">
            Готова к обсуждению новых проектов и коллабораций.
          </div>

          <div className="flex items-center gap-2">
            {onOpenPortfolio && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPortfolio();
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Смотреть работы
              </button>
            )}

            {onOpenContact && (
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                Написать мне
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
