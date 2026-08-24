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
  decorLeft: string;
  decorRight: string;
  angle: number; // Angle on the top arc in degrees (-45, -15, 15, 45)
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
    decorLeft: '/assets/pizzas/kiwi_decor.jpg',
    decorRight: '/assets/pizzas/kiwi_decor.jpg',
    angle: -48,
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
    decorLeft: '/assets/pizzas/orange_decor.jpg',
    decorRight: '/assets/pizzas/orange_decor.jpg',
    angle: -16,
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
    decorLeft: '/assets/pizzas/blueberry_decor.jpg',
    decorRight: '/assets/pizzas/blueberry_decor.jpg',
    angle: 16,
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
    decorLeft: '/assets/pizzas/strawberry_decor.jpg',
    decorRight: '/assets/pizzas/strawberry_decor.jpg',
    angle: 48,
  },
];

export const PizzaShowcaseHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with ORANGE PIE as in the reference
  const [rotationDegrees, setRotationDegrees] = useState(90); // Pie rotational angle on its own axis
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFlavor = FLAVORS[currentIndex];

  // Mouse tilt parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothMouseY, [-300, 300], [5, -5]);
  const tiltY = useTransform(smoothMouseX, [-400, 400], [-6, 6]);

  // Navigate to previous/next flavor
  const paginate = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = FLAVORS.length - 1;
      if (next >= FLAVORS.length) next = 0;
      return next;
    });
    // Rotate pie on its own center axis by 90 degrees per switch with spin momentum
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

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
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
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] flex flex-col justify-between items-center overflow-hidden transition-colors duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pt-12 md:pt-16 pb-0"
      style={{ backgroundColor: activeFlavor.bgColor }}
      id="philosophy"
    >
      {/* 1. Subtle Radial Vignette & Texture */}
      <div className="absolute inset-0 bg-radial from-black/0 via-black/5 to-black/30 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none z-0" />

      {/* 2. Floating Corner Fruits */}
      {/* Top-Left Floating Corner Fruit */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`decor-left-${activeFlavor.id}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -35, x: -40, y: -40 }}
          animate={{ opacity: 0.95, scale: 1, rotate: -15, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10, x: -30, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 sm:top-10 left-4 sm:left-12 w-36 sm:w-52 md:w-64 lg:w-72 aspect-square pointer-events-none z-20"
        >
          <img
            src={activeFlavor.decorLeft}
            alt={`${activeFlavor.name} left decor`}
            className="w-full h-full object-cover rounded-full"
            style={{
              clipPath: 'circle(46% at 50% 50%)',
              filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.35))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top-Right Floating Corner Fruit with Leaves */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`decor-right-${activeFlavor.id}`}
          initial={{ opacity: 0, scale: 0.8, rotate: 35, x: 40, y: -40 }}
          animate={{ opacity: 0.95, scale: 1, rotate: 20, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -10, x: 30, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="absolute top-6 sm:top-10 right-4 sm:right-12 w-36 sm:w-52 md:w-64 lg:w-72 aspect-square pointer-events-none z-20"
        >
          <img
            src={activeFlavor.decorRight}
            alt={`${activeFlavor.name} right decor`}
            className="w-full h-full object-cover rounded-full -rotate-45"
            style={{
              clipPath: 'circle(46% at 50% 50%)',
              filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.35))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 3. Top Center Typography: Heading + 3-line description */}
      <div className="relative z-30 text-center max-w-xl mx-auto px-6 mt-4 sm:mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`heading-${activeFlavor.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-tight drop-shadow-md">
              {activeFlavor.heading}
            </h2>
            <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal max-w-md sm:max-w-lg mx-auto">
              {activeFlavor.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Center-Bottom Main Composition: Huge Pie + Concentric Rings + Arc Navigation */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-end overflow-visible z-20 pb-0">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 z-40 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 shadow-xl group cursor-pointer"
          aria-label="Previous Pie"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-40 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-90 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 shadow-xl group cursor-pointer"
          aria-label="Next Pie"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Outer Orbital Arch 1 */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[820px] sm:w-[1050px] md:w-[1240px] aspect-square rounded-full border border-white/15 pointer-events-none z-10" />

        {/* Primary Orbital Arch with Flavor Labels (Ring 2) */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[720px] sm:w-[920px] md:w-[1080px] aspect-square rounded-full border border-white/25 pointer-events-none z-20">
          
          {/* Active Dot Indicator on the Ring Line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-30"
            animate={{
              rotate: activeFlavor.angle,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
              transformOrigin: 'center 360px', // Matches radius
            }}
          />
        </div>

        {/* Inner Orbital Arch 3 (Dashed) */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[620px] sm:w-[780px] md:w-[920px] aspect-square rounded-full border border-dashed border-white/20 pointer-events-none z-10" />

        {/* 4 Flavor Text Labels Arranged Along the Arch Orbit */}
        <div className="absolute bottom-0 translate-y-[22%] sm:translate-y-[20%] md:translate-y-[18%] w-[720px] sm:w-[920px] md:w-[1080px] aspect-square rounded-full pointer-events-none z-30">
          {FLAVORS.map((flavor, index) => {
            const isActive = index === currentIndex;
            // Place each label along the top arc
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
                  className={`-translate-y-9 sm:-translate-y-12 pointer-events-auto cursor-pointer transition-all duration-300 font-display font-black tracking-widest uppercase text-xs sm:text-sm md:text-base flex flex-col items-center gap-1.5 ${
                    isActive
                      ? 'text-white scale-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
                      : 'text-white/65 hover:text-white hover:scale-105'
                  }`}
                >
                  <span>{flavor.shortLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeOrbitDot"
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Large Round Pie: Centered at Bottom with Much More Height Exposed, Rotating on Its Own Axis */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative w-[540px] sm:w-[700px] md:w-[840px] lg:w-[960px] aspect-square flex items-center justify-center translate-y-[20%] sm:translate-y-[18%] md:translate-y-[15%] z-20 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            if (info.offset.x < -50) {
              paginate(1);
            } else if (info.offset.x > 50) {
              paginate(-1);
            }
          }}
        >
          {/* Under-Pie Deep Contact Shadow */}
          <div className="absolute inset-6 rounded-full bg-black/60 blur-3xl pointer-events-none -z-10" />

          {/* Rotating Pie Wrapper (Rotates on its own center axis) */}
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
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center origin-center select-none shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            style={{
              clipPath: 'circle(44% at 50% 50%)', // Tight clip path to cleanly exclude any background checkerboard
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFlavor.id}
                src={activeFlavor.pieImage}
                alt={activeFlavor.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.14 }} // Slight scale ensures pie fills edge to edge with zero border artifacts
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Bottom Controls Bar: Auto-Play Indicator + Step Indicator */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between px-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-3 py-1.5 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlay ? 'AUTOPLAY ON' : 'AUTOPLAY OFF'}</span>
          </button>
        </div>

        <div className="font-mono text-xs text-white/80 font-bold tracking-widest">
          {activeFlavor.flavorNumber} <span className="text-white/40">/ 04</span>
        </div>
      </div>
    </section>
  );
};

export default PizzaShowcaseHero;
