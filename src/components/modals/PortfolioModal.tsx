import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';

const logoImg = `${import.meta.env.BASE_URL}logo.png`;

interface PortfolioModalProps {
  onClose: () => void;
}

const PROJECTS: Project[] = [
  {
    id: 'evdokiya',
    title: '«Евдокия. Девочка лунного света»',
    category: 'Иллюстрация • Дизайн книги • AI Art',
    year: '2026',
    description: '«Евдокия. Девочка лунного света» — авторская иллюстрированная детская книга. Это сказка о принятии себя, доброте и внутреннем свете. Она создана, чтобы напомнить детям и взрослым: быть собой — это не слабость, а самый редкий и ценный дар.',
    role: 'Автор идеи, сценария и текста, художественный руководитель проекта, разработка концепции, дизайн макета, создание иллюстраций с использованием ИИ, подготовка книги к публикации.',
    tags: [
      'Детская книга', 'Storytelling', 'Book Design', 'Illustration',
      'AI Illustration', 'Character Design', 'Typography', 'Editorial Design', 'KDP', 'Publishing', 'Midjourney', 'DALL·E', 'Fantasy'
    ],
    metrics: 'Авторская детская книга • AI Art',
    client: 'Авторский проект',
    linkUrl: 'https://savinaekaterina.github.io/skaskaproEvdokiu/',
    imageBg: 'from-amber-950/80 via-indigo-950/70 to-stone-900',
    accentColor: '#f59e0b',
  },
  {
    id: 'hraniteli-pamyati',
    title: '«Хранители памяти»',
    category: 'UX/UI дизайн • Веб-дизайн • Landing Page',
    year: '2026',
    description: 'Сайт реставрационной мастерской семейных архивов. Это цифровой архив семейных воспоминаний, где каждый элемент интерфейса поддерживает общую идею сохранения памяти. Вместо привычных карточек используются образы архивных документов, почтовых конвертов, регистрационных журналов и музейных экспозиций.',
    role: 'Автор концепции, UX/UI-дизайнер, веб-дизайнер, разработчик интерфейса в Google AI Studio (исследование, UX-сценарии, айдентика, интерактивный дизайн, микроанимации, интеграция AI).',
    tags: [
      'UX/UI Design', 'Web Design', 'AI Development', 'Landing Page',
      'Google AI Studio', 'Интерактивный дизайн', 'Архивная эстетика', 'Storytelling', 'Микроанимации', 'Видеоинтеграция', 'Адаптивный дизайн'
    ],
    metrics: 'Архивная эстетика • Google AI Studio',
    client: 'Реставрационная мастерская',
    linkUrl: 'https://hranitelipamayti.ai.studio',
    imageBg: 'from-stone-900 via-amber-950/60 to-stone-950',
    accentColor: '#d97706',
  },
];

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

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
      aria-label="Портфолио"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      {/* Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[88vh] bg-[#121215] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800/80 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center shrink-0">
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
              <h2 className="text-base font-semibold font-sans-ui text-stone-100">Портфолио • Екатерины Савиной</h2>
              <p className="text-xs text-stone-400 font-serif-book italic">
                Избранные проекты в сфере веб-дизайна, UI/UX и продуктовых систем
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

        {/* Modal Body: Left Sidebar Projects List + Right Project Detail */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          
          {/* Projects List Sidebar */}
          <div className="md:col-span-5 p-4 sm:p-6 space-y-3 bg-stone-950/30">
            <div className="text-xs font-semibold text-amber-400/90 font-sans-ui uppercase tracking-wider mb-2">
              Избранные кейсы ({PROJECTS.length})
            </div>

            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedProject.id === proj.id
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg'
                    : 'bg-stone-900/40 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
                  <span>{proj.year}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                    {proj.client}
                  </span>
                </div>
                <div className="text-sm font-semibold text-stone-100 font-sans-ui">
                  {proj.title}
                </div>
                <div className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                  {proj.category}
                </div>
              </div>
            ))}
          </div>

          {/* Project Detail View */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Project Badge Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-sans-ui">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                {selectedProject.category}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-book font-bold text-stone-100">
                {selectedProject.title}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed font-sans-ui">
                {selectedProject.description}
              </p>

              {/* Role Section */}
              {selectedProject.role && (
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/20 text-xs space-y-1">
                  <div className="text-amber-400 font-semibold font-sans-ui">Моя роль в проекте:</div>
                  <div className="text-stone-300 leading-relaxed font-sans-ui">{selectedProject.role}</div>
                </div>
              )}

              {/* Metrics Badge */}
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-sans-ui">Формат / Категория:</span>
                <span className="font-semibold text-amber-400 font-mono">{selectedProject.metrics}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-stone-800/80 text-[11px] text-stone-300 border border-stone-700/60 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
              <div className="text-xs text-stone-500 font-serif-book italic">
                Проект: {selectedProject.client}
              </div>
              {selectedProject.linkUrl ? (
                <a
                  href={selectedProject.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-sans-ui transition-colors shadow-lg"
                >
                  Открыть интерактивный проект
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => alert(`Открытие демо-прототипа ${selectedProject.title}`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-sans-ui transition-colors shadow-lg"
                >
                  Исследовать интерактивный прототип
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
