import React, { useState, useEffect } from 'react';
import { X, Mail, Copy, Check, MessageCircle, Send, Globe } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}logo.webp`;

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const email = 'ekaterinabelaia@yandex.ru';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Контакты"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-[#121215] border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Smartphone Screen Styled Container */}
        <div className="p-6 border-b border-stone-800 bg-gradient-to-b from-stone-900 via-stone-950 to-[#121215] text-center space-y-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-500/10 border-2 border-amber-500/40 mx-auto flex items-center justify-center shadow-lg overflow-hidden shrink-0">
            <img 
              src={logoImg} 
              alt="Логотип" 
              className="w-full h-full object-contain rounded-2xl select-none pointer-events-none p-1" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = 'true';
                  e.currentTarget.src = './logo.webp';
                }
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold font-sans-ui text-stone-100">Екатерина Савина</h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-sans-ui">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Открыта к новым проектам (Q3/Q4 2026)
          </div>
        </div>

        {/* Contact Links */}
        <div className="p-6 space-y-3 bg-[#121215]">
          
          {/* Email Copy Card */}
          <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-stone-800 text-amber-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-stone-500 font-mono uppercase">Электронная почта</div>
                <div className="text-xs font-semibold text-stone-200">{email}</div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* VK Direct */}
          <a
            href="https://vk.me/savinkl"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-stone-500 font-mono uppercase">ВКонтакте</div>
                <div className="text-xs font-semibold text-stone-200">vk.me/savinkl</div>
              </div>
            </div>

            <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform">Написать →</span>
          </a>

          {/* Telegram & MAX links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://t.me/savinaek"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center hover:border-amber-500/40 transition-colors block"
            >
              <div className="text-xs font-semibold text-stone-200 font-sans-ui">Telegram</div>
              <div className="text-[10px] text-stone-500">t.me/savinaek</div>
            </a>

            <a
              href="https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center hover:border-amber-500/40 transition-colors block"
            >
              <div className="text-xs font-semibold text-stone-200 font-sans-ui">MAX</div>
              <div className="text-[10px] text-stone-500">Профиль MAX</div>
            </a>
          </div>

        </div>

        {/* Modal Close */}
        <div className="p-4 border-t border-stone-800 text-center bg-stone-950">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs font-sans-ui transition-colors"
          >
            Закрыть окно контактов
          </button>
        </div>

      </div>
    </div>
  );
};
