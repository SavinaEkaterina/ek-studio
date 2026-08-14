import React, { useEffect } from 'react';
import { X, Lightbulb, PenTool } from 'lucide-react';
import logoImg from '../../assets/Portfolio/03_Assets/logo/logo.webp';

interface PenModalProps {
  onClose: () => void;
}

export const PenModal: React.FC<PenModalProps> = ({ onClose }) => {
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
      aria-label="Как рождается проект"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-[#121215] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100 max-h-[88vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Логотип" className="w-full h-full object-contain select-none pointer-events-none p-0.5" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-base font-semibold font-sans-ui text-stone-100">Черная гелевая ручка • Как рождается проект</h2>
              <p className="text-xs text-stone-400 font-serif-book italic">
                Мысли, структура и логика до первого пикселя
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-stone-300 font-sans-ui">
          
          {/* Main Thought Intro */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-amber-200">
              До появления первого макета рождается идея
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              Каждый проект начинается не с компьютера и не с редактора дизайна. Он начинается с вопросов, заметок и небольших набросков на бумаге.
            </p>
            <p className="text-sm text-stone-300 leading-relaxed">
              Именно здесь появляется будущая структура сайта, рождаются первые решения и складывается история, которую затем увидит пользователь.
            </p>
          </div>

          {/* How a project is born section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Как рождается проект</span>
            </div>

            <div className="grid gap-3">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                  <span>01.</span>
                  <span className="text-stone-100 text-sm font-semibold font-sans-ui">Слушаю</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Каждый проект начинается с разговора. Я изучаю бизнес, задаю вопросы, узнаю цели, аудиторию и пытаюсь понять, какую задачу должен решить будущий сайт.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                  <span>02.</span>
                  <span className="text-stone-100 text-sm font-semibold font-sans-ui">Думаю</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Не открываю Figma сразу. Сначала фиксирую мысли, ищу идеи, строю связи между разделами и представляю путь пользователя.
                </p>
                <p className="text-xs text-amber-300/80 italic pt-1 border-t border-stone-800/60">
                  Хороший дизайн начинается с понимания, а не с красивых картинок.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                  <span>03.</span>
                  <span className="text-stone-100 text-sm font-semibold font-sans-ui">Планирую</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Появляется структура. Какие страницы нужны? Что увидит человек первым? Куда он пойдёт дальше?
                </p>
                <p className="text-xs text-stone-400 font-medium">
                  Каждое решение должно быть логичным.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                  <span>04.</span>
                  <span className="text-stone-100 text-sm font-semibold font-sans-ui">Только потом рисую</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Лишь после этого начинается работа над дизайном. Когда идея уже понятна, остаётся подобрать форму, которая поможет рассказать её максимально ясно и красиво.
                </p>
              </div>
            </div>
          </div>

          {/* Rule Section */}
          <div className="p-4 rounded-xl bg-stone-950/80 border-l-4 border-amber-500 flex items-start gap-3">
            <PenTool className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Моё правило</span>
              <p className="text-sm sm:text-base font-semibold text-stone-100 italic">
                «Хороший сайт начинается не с первого пикселя. Он начинается с первой мысли, записанной на бумаге.»
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

