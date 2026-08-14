import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ActiveItem, LightMood } from '../types';
import { LaptopItem } from './items/LaptopItem';
import { CameraItem } from './items/CameraItem';
import { NotebookItem } from './items/NotebookItem';
import { PenItem } from './items/PenItem';
import { MugItem } from './items/MugItem';
import { SmartphoneItem } from './items/SmartphoneItem';
import { MouseItem } from './items/MouseItem';
import { LampItem } from './items/LampItem';
import { PolaroidItem } from './items/PolaroidItem';

import { PortfolioModal } from './modals/PortfolioModal';
import { CameraModal } from './modals/CameraModal';
import { NotebookModal } from './modals/NotebookModal';
import { ContactModal } from './modals/ContactModal';
import { CoffeeModal } from './modals/CoffeeModal';
import { PenModal } from './modals/PenModal';
import { AboutModal } from './modals/AboutModal';
import { BackgroundMusic } from './BackgroundMusic';

import { Sparkles, Compass, Eye, Sun, Moon } from 'lucide-react';
import logoImg from '/logo.webp';

// Pre-generated static particle config to avoid re-creation on render
const STATIC_PARTICLES = [...Array(24)].map((_, i) => ({
  top: `${(i * 15) % 65 + 15}%`,
  left: `${(i * 19) % 45 + 8}%`,
  width: `${(i % 3) + 1}px`,
  height: `${(i % 3) + 1}px`,
  animationDuration: `${4 + (i % 4)}s`,
  animationDelay: `${i * 0.3}s`,
}));

const DustParticles: React.FC<{ lampOn: boolean }> = React.memo(({ lampOn }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ease-in-out ${
      lampOn ? 'opacity-100' : 'opacity-0'
    }`}>
      {STATIC_PARTICLES.map((styleObj, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-200/40 blur-[0.4px] animate-pulse"
          style={styleObj}
        />
      ))}
    </div>
  );
});
DustParticles.displayName = 'DustParticles';

export const DeskScene: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [lampOn, setLampOn] = useState<boolean>(true);

  const handleHover = useCallback((text: string | null) => {
    setHoverText(text);
  }, []);

  const handleSelectLaptop = useCallback(() => setActiveItem('laptop'), []);
  const handleSelectCamera = useCallback(() => setActiveItem('camera'), []);
  const handleSelectNotebook = useCallback(() => setActiveItem('notebook'), []);
  const handleSelectPhone = useCallback(() => setActiveItem('phone'), []);
  const handleSelectMug = useCallback(() => setActiveItem('mug'), []);
  const handleSelectPen = useCallback(() => setActiveItem('pen'), []);
  const handleSelectMouse = useCallback(() => setActiveItem('mouse'), []);
  const handleSelectPolaroid = useCallback(() => setActiveItem('polaroid'), []);
  const handleToggleLamp = useCallback(() => setLampOn(prev => !prev), []);
  const handleCloseModal = useCallback(() => setActiveItem(null), []);

  // Direct DOM ambient tilt tracking for zero-rerender 60fps performance
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (animFrameRef.current !== null) return;
      animFrameRef.current = requestAnimationFrame(() => {
        if (ambientGlowRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 8;
          const y = (e.clientY / window.innerHeight - 0.5) * 6;
          ambientGlowRef.current.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
        }
        animFrameRef.current = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden wood-desk-base select-none text-amber-100 flex flex-col justify-between p-2 sm:p-6">
      
      {/* Wood Fibers, Knots & Hand-worn Sheen Overlays */}
      <div className="absolute inset-0 wood-fibers pointer-events-none opacity-60" />
      <div className="absolute inset-0 wood-knots pointer-events-none opacity-70" />
      <div className="absolute inset-0 hand-worn-sheen pointer-events-none" />

      {/* Soft Ambient Room Glow from Lamp */}
      <div 
        ref={ambientGlowRef}
        className={`absolute inset-0 lamp-ambient-room-light pointer-events-none transition-opacity duration-500 ease-in-out ${
          lampOn ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Dust Particles dancing in Lamp Beam */}
      <DustParticles lampOn={lampOn} />

      {/* TOP COMPACT ARCHITECTURAL BAR */}
      <header className="relative z-40 w-full min-h-[80px] sm:min-h-[86px] px-3 py-2 sm:px-6 sm:py-3.5 flex items-center justify-between bg-stone-950/80 backdrop-blur-md rounded-2xl border border-stone-800/80 shadow-2xl shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 pr-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 overflow-hidden flex items-center justify-center shadow-md shrink-0 transition-all duration-300">
            <img 
              src={logoImg || `${import.meta.env.BASE_URL}logo.webp`} 
              alt="Екатерина Савина - Логотип" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = 'true';
                  e.currentTarget.src = `${import.meta.env.BASE_URL}logo.webp`;
                }
              }}
              className="w-full h-full object-contain select-none pointer-events-none p-0.5" 
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h1 className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-stone-200 font-sans-ui leading-tight min-w-0">
              <span className="block truncate">ЕКАТЕРИНА САВИНА</span>
              <span className="block text-[9px] sm:text-xs text-amber-200/90 tracking-normal font-normal truncate max-w-[220px] xs:max-w-[340px] sm:max-w-none">
                ВЕБ-ДИЗАЙН • САЙТЫ • UX/UI • ИНТЕРАКТИВНЫЕ ПРОЕКТЫ
              </span>
            </h1>
            <p className="text-xs sm:text-base text-amber-300/90 font-serif-book italic mt-0.5 truncate hidden sm:block">
              Каждый проект — отдельная история, рассказанная через дизайн.
            </p>
          </div>
        </div>

        {/* Controls Compact Section */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <BackgroundMusic />

          <button
            onClick={handleToggleLamp}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-sans-ui transition-all border ${
              lampOn
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-stone-900 text-stone-400 border-stone-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lampOn ? 'Лампа ВКЛ' : 'Лампа ВЫКЛ'}</span>
          </button>
        </div>
      </header>

      {/* MAIN DESK CANVAS SWITCHER */}
      <main className="relative flex-1 w-full flex items-center justify-center p-1 sm:p-4 xl:p-6 my-auto overflow-hidden">
        
        {/* 1. DESKTOP DESK CANVAS (>= 1200px) */}
        <div className="hidden xl:flex relative flex-1 w-full items-center justify-center my-auto">
          <div className="relative w-full max-w-[1480px] h-[82vh] min-h-[680px] max-h-[840px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl thick-tabletop-edge border-t border-x border-amber-800/30 overflow-hidden flex items-center justify-center p-14 shadow-2xl">
              {/* Dark Base Vignette / Evening Shadow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/85 via-stone-900/40 to-amber-500/05 pointer-events-none" />

              {/* Primary Tabletop Light Pool (Originates directly under lamp shade) */}
              <div 
                className={`absolute inset-0 lamp-tabletop-light-pool transition-opacity duration-500 ease-in-out pointer-events-none ${
                  lampOn ? 'opacity-100' : 'opacity-0'
                }`} 
              />

              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
                <div className="absolute top-[35%] left-[18%] w-36 h-[1px] bg-amber-100/40 rotate-12 blur-[0.2px]" />
                <div className="absolute bottom-[25%] right-[22%] w-44 h-[1px] bg-amber-200/30 -rotate-6 blur-[0.3px]" />
              </div>

              {/* ITEM 8: Lamp */}
              <div className={`absolute top-8 left-0 z-20 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
                <LampItem lampOn={lampOn} onHover={handleHover} onClick={handleToggleLamp} />
              </div>

              {/* ITEM 2: Camera */}
              <div className={`absolute top-6 left-48 z-30 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
                <CameraItem onHover={handleHover} onClick={handleSelectCamera} />
              </div>

              {/* ITEM 3: Notebook */}
              <div className={`absolute bottom-6 left-28 z-30 transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.02]' : 'brightness-100'}`}>
                <NotebookItem onHover={handleHover} onClick={handleSelectNotebook} />
              </div>

              {/* ITEM 4: Pen */}
              <div className={`absolute bottom-10 left-64 z-40 transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.01]' : 'brightness-100'}`}>
                <PenItem onHover={handleHover} onClick={handleSelectPen} />
              </div>

              {/* ITEM 1: Laptop */}
              <div className={`relative z-10 flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_25px_rgba(251,191,36,0.18)]' : 'brightness-100'}`}>
                <LaptopItem onHover={handleHover} onClick={handleSelectLaptop} />
              </div>

              {/* ITEM 9: Polaroid Photo (In open area between Laptop, Mug, and Mouse) */}
              <div className={`absolute top-[36%] right-[19%] z-35 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
                <PolaroidItem
                  onHover={handleHover}
                  onClick={handleSelectPolaroid}
                  style={{ width: '155px', height: '186px' }}
                />
              </div>

              {/* ITEM 5: Mug */}
              <div className={`absolute top-6 right-36 z-30 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
                <MugItem onHover={handleHover} onClick={handleSelectMug} />
              </div>

              {/* ITEM 6: Smartphone */}
              <div className={`absolute top-28 right-4 z-30 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
                <SmartphoneItem onHover={handleHover} onClick={handleSelectPhone} />
              </div>

              {/* ITEM 7: Mouse */}
              <div className={`absolute bottom-[22%] right-[23%] z-30 transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
                <MouseItem onHover={handleHover} onClick={handleSelectMouse} />
              </div>

              {/* Delicate 5-10% item reflection overlay */}
              <div className={`absolute inset-0 lamp-item-reflection-layer transition-opacity duration-500 ease-in-out pointer-events-none z-35 ${lampOn ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <div className="absolute bottom-0 inset-x-0 h-8 rounded-b-2xl front-thickness-bevel pointer-events-none" />
          </div>
        </div>

        {/* 2. TABLET DESK CANVAS (768px - 1199px) */}
        <div className="hidden md:flex xl:hidden relative flex-1 w-full items-center justify-center my-auto">
          <div className="relative w-full max-w-5xl h-[72vh] min-h-[500px] max-h-[640px] flex items-center justify-center rounded-2xl thick-tabletop-edge border-t border-x border-amber-800/30 overflow-hidden p-4 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/85 via-stone-900/40 to-amber-500/05 pointer-events-none" />

            {/* Tablet Lamp Light Pool */}
            <div className={`absolute inset-0 lamp-tabletop-light-pool-tablet transition-opacity duration-500 ease-in-out pointer-events-none ${lampOn ? 'opacity-100' : 'opacity-0'}`} />

            {/* CENTER: LAPTOP */}
            <div className={`relative z-10 flex items-center justify-center w-[72vw] max-w-[590px] aspect-[600/430] transition-all duration-500 ${lampOn ? 'brightness-[1.05] contrast-[1.01]' : 'brightness-100'}`}>
              <LaptopItem
                onHover={handleHover}
                onClick={handleSelectLaptop}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* TOP CENTER: POLAROID PHOTO / BADGE (In open space above laptop screen lid, between Camera & Mug) */}
            <div className={`absolute top-3 left-[36%] z-35 w-[16vw] max-w-[115px] aspect-[168/202] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <PolaroidItem
                onHover={handleHover}
                onClick={handleSelectPolaroid}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* TOP LEFT: CAMERA */}
            <div className={`absolute top-3 left-4 z-30 w-[18vw] max-w-[130px] aspect-[210/153] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <CameraItem
                onHover={handleHover}
                onClick={handleSelectCamera}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* TOP RIGHT: COFFEE MUG */}
            <div className={`absolute top-3 right-6 z-30 w-[12vw] max-w-[90px] aspect-square flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.05] contrast-[1.01]' : 'brightness-100'}`}>
              <MugItem
                onHover={handleHover}
                onClick={handleSelectMug}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MIDDLE LEFT: LAMP */}
            <div className={`absolute top-[22%] -left-8 z-20 w-[26vw] max-w-[210px] aspect-[380/320] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <LampItem
                lampOn={lampOn}
                onHover={handleHover}
                onClick={handleToggleLamp}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MIDDLE RIGHT: SMARTPHONE */}
            <div className={`absolute top-[24%] right-4 z-30 w-[14vw] max-w-[110px] aspect-[220/412] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
              <SmartphoneItem
                onHover={handleHover}
                onClick={handleSelectPhone}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM LEFT: NOTEBOOK */}
            <div className={`absolute bottom-3 left-[12%] z-30 w-[20vw] max-w-[145px] aspect-[188/262] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.02]' : 'brightness-100'}`}>
              <NotebookItem
                onHover={handleHover}
                onClick={handleSelectNotebook}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM LEFT: PEN */}
            <div className={`absolute bottom-5 left-[32vw] z-40 w-[7vw] max-w-[43px] aspect-[45/190] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.01]' : 'brightness-100'}`}>
              <PenItem
                onHover={handleHover}
                onClick={handleSelectPen}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM RIGHT: MOUSE */}
            <div className={`absolute bottom-[18%] right-[18%] z-30 w-[13vw] max-w-[90px] aspect-[114/180] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
              <MouseItem
                onHover={handleHover}
                onClick={handleSelectMouse}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Item reflection overlay */}
            <div className={`absolute inset-0 lamp-item-reflection-layer transition-opacity duration-500 ease-in-out pointer-events-none z-35 ${lampOn ? 'opacity-100' : 'opacity-0'}`} />

            <div className="absolute bottom-0 inset-x-0 h-6 rounded-b-2xl front-thickness-bevel pointer-events-none" />
          </div>
        </div>

        {/* 3. MOBILE DESK CANVAS (<= 767px) */}
        <div className="flex md:hidden relative flex-1 w-full items-center justify-center my-auto overflow-hidden py-1">
          <div className="relative w-full h-[78vh] min-h-[480px] max-h-[640px] rounded-2xl thick-tabletop-edge border border-amber-800/40 overflow-hidden flex items-center justify-center p-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/85 via-stone-900/50 to-amber-500/05 pointer-events-none" />

            {/* Mobile Lamp Light Pool */}
            <div className={`absolute inset-0 lamp-tabletop-light-pool-mobile transition-opacity duration-500 ease-in-out pointer-events-none ${lampOn ? 'opacity-100' : 'opacity-0'}`} />

            {/* CENTER: LAPTOP */}
            <div className={`relative z-10 flex items-center justify-center w-[90vw] max-w-[388px] aspect-[600/430] transition-all duration-500 ${lampOn ? 'brightness-[1.05] contrast-[1.01]' : 'brightness-100'}`}>
              <LaptopItem
                onHover={handleHover}
                onClick={handleSelectLaptop}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* POLAROID PHOTO (Top center open area above laptop lid, between Camera and Mug) */}
            <div className={`absolute top-2 left-[36%] z-35 w-[22vw] max-w-[84px] aspect-[168/202] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <PolaroidItem
                onHover={handleHover}
                onClick={handleSelectPolaroid}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* TOP LEFT: CAMERA */}
            <div className={`absolute top-2 left-2 z-30 w-[22vw] max-w-[80px] aspect-[210/153] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <CameraItem
                onHover={handleHover}
                onClick={handleSelectCamera}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* TOP RIGHT: COFFEE MUG */}
            <div className={`absolute top-2 right-2 z-30 w-[18vw] max-w-[66px] aspect-square flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.05] contrast-[1.01]' : 'brightness-100'}`}>
              <MugItem
                onHover={handleHover}
                onClick={handleSelectMug}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MIDDLE LEFT: LAMP */}
            <div className={`absolute top-[26%] -left-5 z-20 w-[26vw] max-w-[98px] aspect-[380/320] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02]' : 'brightness-100'}`}>
              <LampItem
                lampOn={lampOn}
                onHover={handleHover}
                onClick={handleToggleLamp}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MIDDLE RIGHT: SMARTPHONE */}
            <div className={`absolute top-[26%] right-2 z-30 w-[15vw] max-w-[58px] aspect-[220/412] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_18px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
              <SmartphoneItem
                onHover={handleHover}
                onClick={handleSelectPhone}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM LEFT: NOTEBOOK */}
            <div className={`absolute bottom-2 left-[12%] z-30 w-[28vw] max-w-[102px] aspect-[188/262] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.02]' : 'brightness-100'}`}>
              <NotebookItem
                onHover={handleHover}
                onClick={handleSelectNotebook}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM LEFT: PEN */}
            <div className={`absolute bottom-3 left-[38vw] z-40 w-[9vw] max-w-[38px] aspect-[45/190] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.06] contrast-[1.01]' : 'brightness-100'}`}>
              <PenItem
                onHover={handleHover}
                onClick={handleSelectPen}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* BOTTOM RIGHT: MOUSE */}
            <div className={`absolute bottom-[16%] right-[14%] z-30 w-[18vw] max-w-[66px] aspect-[114/180] flex items-center justify-center transition-all duration-500 ${lampOn ? 'brightness-[1.08] contrast-[1.02] drop-shadow-[0_0_18px_rgba(251,191,36,0.15)]' : 'brightness-100'}`}>
              <MouseItem
                onHover={handleHover}
                onClick={handleSelectMouse}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Item reflection overlay */}
            <div className={`absolute inset-0 lamp-item-reflection-layer transition-opacity duration-500 ease-in-out pointer-events-none z-35 ${lampOn ? 'opacity-100' : 'opacity-0'}`} />

            <div className="absolute bottom-0 inset-x-0 h-4 rounded-b-2xl front-thickness-bevel pointer-events-none" />
          </div>
        </div>

      </main>

      {/* BOTTOM HOVER STATUS BANNER */}
      <footer className="relative z-40 px-4 py-2.5 sm:px-6 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-800/80 shadow-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-300 font-sans-ui min-w-0">
          <Eye className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium text-amber-200 text-[11px] sm:text-xs truncate">
            {hoverText || 'Нажмите или наведите на предмет, чтобы открыть информацию и проекты.'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-500 font-serif-book italic shrink-0">
          <span>9 предметов рабочего стола</span>
        </div>
      </footer>

      {/* INTERACTIVE ITEM MODALS */}
      {activeItem === 'laptop' && <PortfolioModal onClose={handleCloseModal} />}
      {activeItem === 'camera' && <CameraModal onClose={handleCloseModal} />}
      {activeItem === 'notebook' && <NotebookModal onClose={handleCloseModal} />}
      {activeItem === 'phone' && <ContactModal onClose={handleCloseModal} />}
      {activeItem === 'mug' && <CoffeeModal onClose={handleCloseModal} />}
      {activeItem === 'pen' && <PenModal onClose={handleCloseModal} />}
      {activeItem === 'mouse' && <PortfolioModal onClose={handleCloseModal} />}
      {activeItem === 'polaroid' && (
        <AboutModal
          onClose={handleCloseModal}
          onOpenPortfolio={handleSelectLaptop}
          onOpenContact={handleSelectPhone}
        />
      )}

    </div>
  );
};
