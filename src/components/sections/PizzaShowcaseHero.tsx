import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface FlavorItem {
  id: string;
  name: string;
  shortLabel: string;
  flavorNumber: string;
  heading: string;
  description: string;
  bgColor: string;
  accentColor: string;
  pieImage: string;
  angle: number; // Angle on top orbit arc in degrees (-42, -14, 14, 42)
}

const FLAVORS: FlavorItem[] = [
  {
    id: 'kiwi',
    name: 'KIWI PIE',
    shortLabel: 'KIWI',
    flavorNumber: '01',
    heading: 'KIWI PIE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,',
    bgColor: '#809172', // Olive Green
    accentColor: '#D8EDB8',
    pieImage: '/assets/pizzas/kiwi_pie.jpg',
    angle: -44,
  },
  {
    id: 'orange',
    name: 'ORANGE PIE',
    shortLabel: 'ORANGE',
    flavorNumber: '02',
    heading: 'ORANGE PIE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,',
    bgColor: '#E87524', // Warm Orange
    accentColor: '#FFE0B2',
    pieImage: '/assets/pizzas/orange_pie.jpg',
    angle: -15,
  },
  {
    id: 'blueberry',
    name: 'BLUEBERRY PIE',
    shortLabel: 'BLUEBERRY',
    flavorNumber: '03',
    heading: 'BLUEBERRY PIE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,',
    bgColor: '#344C73', // Deep Muted Blue
    accentColor: '#B8D2FF',
    pieImage: '/assets/pizzas/blueberry_pie.jpg',
    angle: 15,
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY PIE',
    shortLabel: 'STRAWBERRY',
    flavorNumber: '04',
    heading: 'STRAWBERRY PIE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,',
    bgColor: '#A92F35', // Rich Berry Red
    accentColor: '#FFCCD0',
    pieImage: '/assets/pizzas/strawberry_pie.jpg',
    angle: 44,
  },
];

export const PizzaShowcaseHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start on ORANGE PIE
  const [rotationDegrees, setRotationDegrees] = useState(90);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFlavor = FLAVORS[currentIndex];

  // Mouse tilt parallax coordinates (subtle on desktop, auto-zero on touch/mobile)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-300, 300], [4, -4]);
  const tiltY = useTransform(smoothMouseX, [-400, 400], [-5, 5]);

  // Navigate to previous/next flavor
  const paginate = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = FLAVORS.length - 1;
      if (next >= FLAVORS.length) next = 0;
      return next;
    });
    setRotationDegrees((prev) => prev + dir * 90);
  }, []);

  const selectFlavor = (index: number) => {
    if (index === currentIndex) return;
    const diff = index - currentIndex;
    setCurrentIndex(index);
    setRotationDegrees((prev) => prev + diff * 90);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isDragging, paginate]);

  // Mouse move handler (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100vh] flex flex-col justify-between items-center overflow-hidden transition-colors duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8"
      style={{ backgroundColor: activeFlavor.bgColor }}
      id="philosophy"
    >
      {/* 1. Clean Background Grid Dots */}
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none z-0" />

      {/* 2. Top Center Typography (Fully Responsive on Mobile / iPad / Desktop) */}
      <div className="relative z-30 text-center max-w-xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`heading-${activeFlavor.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight">
              {activeFlavor.heading}
            </h2>
            <p className="mt-2 sm:mt-3 md:mt-4 font-sans text-[11px] sm:text-xs md:text-sm text-white/90 leading-relaxed font-normal max-w-[290px] sm:max-w-md md:max-w-lg mx-auto">
              {activeFlavor.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Center-Bottom Main Composition (Fluid Scaled for Mobile, iPad, and Desktop) */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-end overflow-visible z-20 px-2 sm:px-4">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 sm:left-6 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-40 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 shadow-lg group cursor-pointer"
          aria-label="Previous Pie"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 sm:right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-40 w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 shadow-lg group cursor-pointer"
          aria-label="Next Pie"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Outer Orbital Ring 1 */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[112vw] sm:w-[96vw] md:w-[780px] lg:w-[980px] xl:w-[1140px] aspect-square rounded-full border border-white/15 pointer-events-none z-10" />

        {/* Primary Orbital Ring 2 (Holds the Active Indicator Dot with 100% accurate responsive pinning) */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[98vw] sm:w-[86vw] md:w-[680px] lg:w-[860px] xl:w-[980px] aspect-square rounded-full border border-white/25 pointer-events-none z-20">
          
          {/* Active Dot Rotator (Centered to ring so dot stays locked to ring circumference across all screen sizes) */}
          <motion.div
            className="absolute inset-0 flex justify-center items-start pointer-events-none"
            animate={{
              rotate: activeFlavor.angle,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)] -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Inner Orbital Ring 3 (Dashed) */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[84vw] sm:w-[74vw] md:w-[580px] lg:w-[740px] xl:w-[840px] aspect-square rounded-full border border-dashed border-white/20 pointer-events-none z-10" />

        {/* 4 Flavor Text Labels Curved Along the Top Arch */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[98vw] sm:w-[86vw] md:w-[680px] lg:w-[860px] xl:w-[980px] aspect-square rounded-full pointer-events-none z-30">
          {FLAVORS.map((flavor, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={flavor.id}
                style={{
                  transform: `rotate(${flavor.angle}deg)`,
                  transformOrigin: 'center center',
                }}
                className="absolute inset-0 flex justify-center items-start pointer-events-none"
              >
                <button
                  onClick={() => selectFlavor(index)}
                  style={{
                    transform: `rotate(${-flavor.angle}deg)`, // Counter-rotate text so it stays upright
                  }}
                  className={`-translate-y-7 sm:-translate-y-9 md:-translate-y-11 pointer-events-auto cursor-pointer transition-all duration-300 font-display font-black tracking-widest uppercase text-[10px] sm:text-xs md:text-sm lg:text-base flex flex-col items-center gap-1 sm:gap-1.5 ${
                    isActive
                      ? 'text-white scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] font-black'
                      : 'text-white/65 hover:text-white hover:scale-105'
                  }`}
                >
                  <span>{flavor.shortLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeOrbitDotPill"
                      className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                      transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Large Round Pie: Fully Responsive on Mobile, iPad, and Desktop */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative w-[78vw] sm:w-[68vw] md:w-[520px] lg:w-[680px] xl:w-[780px] aspect-square flex items-center justify-center translate-y-[20%] sm:translate-y-[18%] md:translate-y-[15%] z-20 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            if (info.offset.x < -40) {
              paginate(1);
            } else if (info.offset.x > 40) {
              paginate(-1);
            }
          }}
        >
          {/* Rotating Pie Wrapper (Rotates smoothly on its own center axis) */}
          <motion.div
            animate={{
              rotate: rotationDegrees,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 16,
              mass: 1,
            }}
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center origin-center select-none"
            style={{
              clipPath: 'circle(44% at 50% 50%)', // Completely excludes background checkerboard
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFlavor.id}
                src={activeFlavor.pieImage}
                alt={activeFlavor.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.25 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Bottom Controls Bar: Auto-Play Indicator + Step Indicator */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 pt-2">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
        >
          {isAutoPlay ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          <span>{isAutoPlay ? 'AUTOPLAY ON' : 'AUTOPLAY OFF'}</span>
        </button>

        <div className="font-mono text-[10px] sm:text-xs text-white/80 font-bold tracking-widest bg-white/15 px-3 py-1 sm:py-1.5 rounded-full border border-white/20 backdrop-blur-md">
          {activeFlavor.flavorNumber} <span className="text-white/40">/ 04</span>
        </div>
      </div>
    </section>
  );
};

export default PizzaShowcaseHero;
