import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}logo.png`;

interface NotebookModalProps {
  onClose: () => void;
}

export const NotebookModal: React.FC<NotebookModalProps> = ({ onClose }) => {
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
      aria-label="Философия Moleskine"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl h-full max-h-[85vh] bg-[#121215] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={logoImg} 
                alt="Логотип" 
                className="w-full h-full object-contain select-none pointer-events-none p-0.5" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = 'true';
                    e.currentTarget.src = './logo.png';
                  }
                }}
              />
            </div>
            <div>
              <h2 className="text-base font-semibold font-sans-ui text-stone-100">Moleskine • Наша философия</h2>
              <p className="text-xs text-stone-400 font-serif-book italic">
                Принципы работы, подход к созданию сайтов и UX-философия
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

        {/* Moleskine Pages Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-serif-book">
          
          {/* Main Approach Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ФИЛОСОФИЯ И ПОДХОД</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans-ui text-amber-200">
              Мы создаём сайты иначе
            </h3>

            <div className="space-y-4 text-stone-300 font-sans-ui text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-xl bg-stone-900/80 border-l-4 border-amber-500/60 space-y-1">
                <p className="text-xs text-stone-400 uppercase tracking-wider font-mono">Большинство начинают с вопроса:</p>
                <p className="text-stone-200 italic font-serif-book text-base">«Какой сайт вы хотите?»</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider font-mono">Мы задаём другой вопрос:</p>
                <p className="text-amber-100 font-semibold text-base sm:text-lg">
                  «Каких результатов вы хотите достичь с помощью сайта?»
                </p>
                <p className="text-xs text-stone-300">И только после этого начинаем проектирование.</p>
              </div>

              <p className="text-stone-200">
                Мы изучаем бизнес, цели, аудиторию, продукт, конкурентов и путь клиента. Проектируем структуру, продумываем каждое действие пользователя, создаём дизайн, который помогает принимать решения, а затем анализируем результаты и развиваем сайт дальше.
              </p>

              <div className="pt-3 border-t border-stone-800 text-stone-100 font-medium">
                <p className="text-amber-300/90 font-semibold">Потому что для нас сайт — это не набор страниц.</p>
                <p className="text-stone-300 text-sm mt-0.5">Это инструмент, который помогает бизнесу расти.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
