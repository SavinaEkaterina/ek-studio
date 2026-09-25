import React, { useState, useEffect } from 'react';
import { X, Image, ZoomIn } from 'lucide-react';

const logoImg = `${import.meta.env.BASE_URL}logo.png`;
import frontCoverImg from '../../assets/Portfolio/03_Assets/Camera/front-cover.webp';
import chapter19Img from '../../assets/Portfolio/03_Assets/Camera/chapter-01-page-19.webp';
import colorizationImg from '../../assets/Portfolio/03_Assets/Camera/colorization-after.webp';
import jubileeImg from '../../assets/Portfolio/03_Assets/Camera/jubilee-03.webp';
import piterVideo from '../../assets/Portfolio/03_Assets/Прогулка_по_Петербургу_для_портфолио.mp4';
import resnicLogoImg from '../../assets/Portfolio/03_Assets/arhitektura-resnic-logo.png';
import flyerImg from '../../assets/Portfolio/03_Assets/flyer-akciya-dzhinsy.png';
import denVospitatelyaCoverImg from '../../assets/Portfolio/03_Assets/den-vospitatelya-cover.png';
import denVospitatelyaPersonalImg from '../../assets/Portfolio/03_Assets/den-vospitatelya-personal.png';
import denVospitatelyaPackagingImg from '../../assets/Portfolio/03_Assets/den-vospitatelya-packaging.png';

interface CameraModalProps {
  onClose: () => void;
}

interface ShotItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  color: string;
  exif: string;
  author?: string;
  thumbUrl?: string;
imageUrl?: string;
    galleryImages?: string[];
  type?: 'image' | 'video';
  videoUrl?: string;
}

const GALLERY_SHOTS: ShotItem[] = [
{
  id: 1,
  title: '«Прогулка по Петербургу»',
  category: 'AI Video • Туристический контент',
  desc: 'Промо-видео для туроператора, приглашающее отправиться на прогулку по Санкт-Петербургу. В ролике исторический образ Петербурга соединён с современным AI-видеопродакшеном: дворцовые ансамбли, набережные, вода и узнаваемая атмосфера города превращаются в единое визуальное путешествие.',
  author: 'Екатерина Савина',
  color: 'from-slate-950/90 via-indigo-950/80 to-stone-900',
  exif: 'Промо-видео • Туризм • AI Video',
  type: 'video',
  videoUrl: piterVideo,
},
  {
  id: 2,
  title: '«Архитектура ресниц»',
  category: 'Logo Design • Branding',
  desc: 'Авторский логотип для мастера в сфере красоты. В основе айдентики — графичный образ металлической бабочки, объединённый со строгой типографикой и рукописным начертанием имени.',
  author: 'Екатерина Савина',
  color: 'from-stone-950/90 via-neutral-900 to-stone-950',
  exif: 'Логотип • Айдентика • Beauty',
  thumbUrl: resnicLogoImg,
  imageUrl: resnicLogoImg,
},
 {
  id: 3,
  title: '«Флаер для рекламной акции»',
  category: 'Graphic Design • Advertising',
  desc: 'Рекламный флаер для повторной акции магазина джинсовой одежды. Задача — сохранить визуальную концепцию первоначального промоматериала и адаптировать её для новой рекламной кампании с актуальными датами.',
  author: 'Екатерина Савина',
  color: 'from-blue-950/90 via-slate-900 to-stone-950',
  exif: 'Рекламный флаер • Digital Design',
  thumbUrl: flyerImg,
  imageUrl: flyerImg,
},
  {
  id: 4,
  title: '«Тёплое поздравление ко Дню дошкольного работника»',
  category: 'Graphic Design • Visual Project',
  desc: 'Комплексный визуальный проект ко Дню дошкольного работника: персонализированная поздравительная композиция, оформление внутреннего поздравления и упаковки. Задача — создать не просто открытку, а цельный эмоциональный подарок, в котором объединены иллюстрация, типографика, декоративные элементы и персональное обращение.',
  author: 'Екатерина Савина',
  color: 'from-rose-950/90 via-amber-950/70 to-stone-950',
  exif: 'Визуальный проект • Поздравление • Packaging Design',
  thumbUrl: denVospitatelyaCoverImg,
  imageUrl: denVospitatelyaCoverImg,
  galleryImages: [
    denVospitatelyaCoverImg,
    denVospitatelyaPersonalImg,
    denVospitatelyaPackagingImg,
  ],
},
];

export const CameraModal: React.FC<CameraModalProps> = ({ onClose }) => {
  const [selectedShot, setSelectedShot] = useState<ShotItem | null>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedShot) {
          setSelectedShot(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, selectedShot]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Галерея материалов"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl h-full max-h-[88vh] bg-[#121215] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-100">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
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
              <h2 className="text-base font-semibold font-sans-ui text-stone-100">Галерея материалов</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GALLERY_SHOTS.map((shot) => (
            <div
              key={shot.id}
              onClick={() => setSelectedShot(shot)}
              className={`group cursor-pointer p-5 rounded-2xl bg-gradient-to-br ${shot.color} border border-stone-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-[1.01]`}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] text-amber-300 font-mono mb-3">
                  <Image className="w-3 h-3 text-amber-400" />
                  {shot.category}
                </div>

                {/* Real Image Card Display */}
               <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3 border border-amber-500/20 bg-stone-950 flex items-center justify-center group-hover:border-amber-400/50 transition-all shadow-inner">
  {shot.type === 'video' && shot.videoUrl ? (
    <video
      src={shot.videoUrl}
      muted
      loop
      playsInline
      autoPlay
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  ) : (
    <img
      src={shot.thumbUrl}
      alt={shot.title}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  )}

  {/* Hover Overlay */}
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
    <ZoomIn className="w-6 h-6 text-amber-300" />
    <span className="text-xs font-medium text-amber-200">
      Открыть в полном размере
    </span>
  </div>
</div>

                <h3 className="text-base font-semibold font-serif-book text-stone-100 flex items-center justify-between">
                  <span>{shot.title}</span>
                </h3>
                <p className="text-xs text-stone-300 font-sans-ui mt-2 leading-relaxed">
                  {shot.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>{shot.exif}</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans-ui font-medium">
                  Нажмите для просмотра →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Full View Modal */}
      {selectedShot && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedShot(null)}
        >
          <div 
            className="relative max-w-3xl w-full max-h-[90vh] bg-stone-950 border border-stone-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Header */}
           <div className="w-full max-h-[70vh] rounded-xl overflow-y-auto border border-stone-800 bg-black/60 flex flex-col items-center justify-start my-2 shadow-2xl">
 {selectedShot.type === 'video' && selectedShot.videoUrl ? (
  <video
    src={selectedShot.videoUrl}
    controls
    autoPlay
    playsInline
    className="max-w-full max-h-[60vh] object-contain rounded-lg"
  />
) : selectedShot.galleryImages ? (
  <div className="w-full flex flex-col gap-4">
    {selectedShot.galleryImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`${selectedShot.title} — изображение ${index + 1}`}
        loading="eager"
        decoding="async"
        className="w-full max-h-[70vh] object-contain rounded-lg"
      />
    ))}
  </div>
) : (
  <img
    src={selectedShot.imageUrl}
    alt={selectedShot.title}
    loading="eager"
    decoding="async"
    className="max-w-full max-h-[60vh] object-contain rounded-lg"
  />
)}
</div>
            <p className="text-xs text-stone-300 font-sans-ui max-w-lg mt-3 leading-relaxed">{selectedShot.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
