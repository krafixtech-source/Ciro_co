import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play } from 'lucide-react';

interface FlavorItem {
  id: string;
  name: string;
  shortLabel: string;
  flavorNumber: string;
  heading: string;
  tagline: string;
  description: string;
  bgColor: string;
  accentColor: string;
  pillColor: string;
  textColor: string;
  pizzaImage: string;
  decorImage: string;
  price: string;
  badgeText: string;
  ingredients: string[];
}

const FLAVORS: FlavorItem[] = [
  {
    id: 'kiwi',
    name: 'KIWI PIE',
    shortLabel: 'KIWI',
    flavorNumber: '01',
    heading: 'KIWI PIE',
    tagline: 'Fresh • Zesty • Unconventional',
    description:
      'Artisan mascarpone base topped with ripe emerald SunGold kiwi slices, wild mountain mint leaves, and blossom honey reduction over wood-fired sweet crust.',
    bgColor: '#809172', // Olive Green
    accentColor: '#D8EDB8',
    pillColor: '#6B7C5E',
    textColor: '#FFFFFF',
    pizzaImage: '/assets/pizzas/kiwi_pizza.jpg',
    decorImage: '/assets/pizzas/kiwi_decor.jpg',
    price: '$24',
    badgeText: 'SEASONAL HERO',
    ingredients: ['Zespri Green Kiwi', 'Vanilla Mascarpone', 'Wild Peppermint', 'Blossom Honey'],
  },
  {
    id: 'orange',
    name: 'ORANGE PIE',
    shortLabel: 'ORANGE',
    flavorNumber: '02',
    heading: 'ORANGE PIE',
    tagline: 'Vibrant • Citrus • Caramelized',
    description:
      'Caramelized blood orange and sweet Valencia citrus cartwheels over whipped Sicilian ricotta, roasted citrus zest, and aromatic garden rosemary oil.',
    bgColor: '#E87524', // Warm Orange
    accentColor: '#FFE0B2',
    pillColor: '#C95E14',
    textColor: '#FFFFFF',
    pizzaImage: '/assets/pizzas/orange_pizza.jpg',
    decorImage: '/assets/pizzas/orange_decor.jpg',
    price: '$26',
    badgeText: 'CITRUS HARVEST',
    ingredients: ['Blood Orange', 'Valencia Slices', 'Whipped Ricotta', 'Candied Zest'],
  },
  {
    id: 'blueberry',
    name: 'BLUEBERRY PIE',
    shortLabel: 'BLUEBERRY',
    flavorNumber: '03',
    heading: 'BLUEBERRY PIE',
    tagline: 'Rich • Muted • Velvety',
    description:
      'Wild mountain blueberries hand-folded into Madagascar sweet vanilla cream, glistening violet berry reduction, and delicate confectioner’s dusting.',
    bgColor: '#344C73', // Deep Muted Blue
    accentColor: '#B8D2FF',
    pillColor: '#243754',
    textColor: '#FFFFFF',
    pizzaImage: '/assets/pizzas/blueberry_pizza.jpg',
    decorImage: '/assets/pizzas/blueberry_decor.jpg',
    price: '$28',
    badgeText: 'INDULGENT DESSERT',
    ingredients: ['Wild Mountain Berries', 'Sweet Vanilla Cream', 'Violet Reduction', 'Mint Dust'],
  },
  {
    id: 'strawberry',
    name: 'STRAWBERRY PIE',
    shortLabel: 'STRAWBERRY',
    flavorNumber: '04',
    heading: 'STRAWBERRY PIE',
    tagline: 'Juicy • Romantic • Decadent',
    description:
      'Sun-ripened field strawberries and strawberry nectar glaze layered over velvety mascarpone, wild strawberry coulis, and edible crystalline mint blossoms.',
    bgColor: '#A92F35', // Rich Berry Red
    accentColor: '#FFCCD0',
    pillColor: '#871D22',
    textColor: '#FFFFFF',
    pizzaImage: '/assets/pizzas/strawberry_pizza.jpg',
    decorImage: '/assets/pizzas/strawberry_decor.jpg',
    price: '$26',
    badgeText: 'CHEF SELECTION',
    ingredients: ['Ruby Strawberries', 'Sweet Mascarpone', 'Wild Berry Coulis', 'Organic Mint'],
  },
];

export const PizzaShowcaseHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
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

  const tiltX = useTransform(smoothMouseY, [-300, 300], [8, -8]);
  const tiltY = useTransform(smoothMouseX, [-400, 400], [-10, 10]);
  const shadowOffsetX = useTransform(smoothMouseX, [-400, 400], [15, -15]);
  const shadowOffsetY = useTransform(smoothMouseY, [-300, 300], [25, 45]);

  // Handle slide progression
  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = FLAVORS.length - 1;
        if (next >= FLAVORS.length) next = 0;
        return next;
      });
    },
    []
  );

  const setFlavorByIndex = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    const newDir = targetIndex > currentIndex ? 1 : -1;
    setDirection(newDir);
    setCurrentIndex(targetIndex);
  };

  // Auto-cycle timer
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isDragging, paginate]);

  // Mouse move handler for 3D tilt
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

  // Drag physics variants for pizza
  const pizzaVariants = {
    enter: (dir: number) => ({
      scale: 0.82,
      rotateZ: dir * 65,
      x: dir * 320,
      y: 40,
      opacity: 0,
    }),
    center: {
      scale: 1,
      rotateZ: 0,
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 120, damping: 18 },
        scale: { type: 'spring' as const, stiffness: 140, damping: 20 },
        rotateZ: { type: 'spring' as const, stiffness: 110, damping: 17 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      scale: 1.08,
      rotateZ: dir * -65,
      x: dir * -320,
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100vh] lg:min-h-[960px] flex flex-col justify-between items-center overflow-hidden transition-colors duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none py-12 md:py-16 px-4 md:px-8"
      style={{ backgroundColor: activeFlavor.bgColor }}
      id="philosophy"
    >
      {/* 1. Subtle Radial Vignette & Texture */}
      <div className="absolute inset-0 bg-radial from-black/0 via-black/10 to-black/35 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-dots-light opacity-10 pointer-events-none z-0" />

      {/* 2. Floating Corner Ingredient Decorations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`decor-tl-${activeFlavor.id}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -20, y: -30 }}
          animate={{ opacity: 0.85, scale: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 20, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute -top-10 -left-10 md:top-6 md:left-8 w-48 md:w-80 aspect-square pointer-events-none z-10 filter drop-shadow-2xl"
        >
          <img
            src={activeFlavor.decorImage}
            alt={`${activeFlavor.name} Ingredients`}
            className="w-full h-full object-cover rounded-full opacity-90 rotate-12"
            style={{
              clipPath: 'circle(44% at 50% 50%)',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`decor-tr-${activeFlavor.id}`}
          initial={{ opacity: 0, scale: 0.8, rotate: 20, y: -30 }}
          animate={{ opacity: 0.85, scale: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -20, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
          className="absolute -top-10 -right-10 md:top-6 md:right-8 w-48 md:w-80 aspect-square pointer-events-none z-10 filter drop-shadow-2xl"
        >
          <img
            src={activeFlavor.decorImage}
            alt={`${activeFlavor.name} Ingredients`}
            className="w-full h-full object-cover rounded-full opacity-90 -rotate-45"
            style={{
              clipPath: 'circle(44% at 50% 50%)',
              filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 3. Top Header / Brand Badge */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            {activeFlavor.badgeText}
          </span>
          <span className="hidden sm:inline-block text-white/70 text-xs font-mono tracking-widest">
            CIRO CO • SIGNATURE COLLECTION
          </span>
        </div>

        {/* Play/Pause Auto Timer & Counter */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/80 font-bold tracking-widest">
            {activeFlavor.flavorNumber} <span className="text-white/40">/ 04</span>
          </span>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white transition-all duration-200"
            title={isAutoPlay ? 'Pause Auto Rotation' : 'Resume Auto Rotation'}
            aria-label="Toggle Auto Rotation"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 4. Center Typography: Large Editorial Serif Heading */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mt-6 md:mt-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`text-${activeFlavor.id}`}
            custom={direction}
            initial={{ opacity: 0, y: direction * 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction * -25, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Tagline */}
            <motion.span
              className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/85 mb-2 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {activeFlavor.tagline}
            </motion.span>

            {/* Main Editorial Heading */}
            <h2 className="font-serif font-black italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-[0.08em] md:tracking-[0.12em] uppercase leading-none drop-shadow-md">
              {activeFlavor.heading}
            </h2>

            {/* Small Refined Description */}
            <p className="mt-3 md:mt-4 font-sans text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-medium">
              {activeFlavor.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. Center 16:9 Composition: Concentric Orbital Rings + Rotational Pizza */}
      <div className="relative z-10 w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] flex items-center justify-center my-auto">
        {/* Orbital Ring 1 (Outer) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[85%] md:w-[75%] max-w-[700px] aspect-square rounded-full border border-white/15 pointer-events-none flex items-center justify-center"
        >
          {/* Orbital Dot Marker */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/40 shadow-glow" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-white/25" />
        </motion.div>

        {/* Orbital Ring 2 (Middle - Dashed) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[70%] md:w-[62%] max-w-[580px] aspect-square rounded-full border border-dashed border-white/20 pointer-events-none"
        />

        {/* Orbital Ring 3 (Inner Glow) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[55%] md:w-[50%] max-w-[460px] aspect-square rounded-full border border-white/25 pointer-events-none"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/60" />
        </motion.div>

        {/* Directional Nav Triggers (Left / Right Subtle Controls) */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 md:left-8 z-30 p-3.5 md:p-4 rounded-full bg-black/20 hover:bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group shadow-lg"
          aria-label="Previous Flavor"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-2 md:right-8 z-30 p-3.5 md:p-4 rounded-full bg-black/20 hover:bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group shadow-lg"
          aria-label="Next Flavor"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Realistic Pizza Container with 3D Tilt & Direct Drag Interaction */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          className="relative w-[78%] sm:w-[62%] md:w-[50%] max-w-[480px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            if (info.offset.x < -60) {
              paginate(1);
            } else if (info.offset.x > 60) {
              paginate(-1);
            }
          }}
        >
          {/* Dynamic Under-Pizza Shadow */}
          <motion.div
            style={{
              x: shadowOffsetX,
              y: shadowOffsetY,
            }}
            className="absolute w-[86%] h-[86%] rounded-full bg-black/45 blur-2xl pointer-events-none -z-10 transform scale-y-75"
          />

          {/* Rotational Pizza Carousel Animation */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeFlavor.id}
              custom={direction}
              variants={pizzaVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center origin-center select-none"
              style={{
                clipPath: 'circle(46% at 50% 50%)',
                filter:
                  'drop-shadow(0 25px 35px rgba(0,0,0,0.4)) drop-shadow(0 10px 15px rgba(0,0,0,0.25))',
              }}
            >
              <img
                src={activeFlavor.pizzaImage}
                alt={activeFlavor.name}
                className="w-full h-full object-cover rounded-full transform scale-[1.04] pointer-events-none select-none transition-transform duration-700 ease-out hover:scale-[1.08]"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 6. Flavor Carousel Navigation Pills & Ingredient Badges */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center gap-5 mt-4">
        {/* Active Flavor Ingredients Bar */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/90">
          <span className="font-bold uppercase tracking-wider text-white/60">Crafted with:</span>
          {activeFlavor.ingredients.map((ing, i) => (
            <span
              key={ing}
              className="inline-flex items-center bg-black/25 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
            >
              {ing}
              {i < activeFlavor.ingredients.length - 1 && (
                <span className="ml-2 text-white/30">•</span>
              )}
            </span>
          ))}
        </div>

        {/* 4 Flavor Buttons Pill Strip */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 p-1.5 rounded-full bg-black/30 backdrop-blur-lg border border-white/20 shadow-xl">
          {FLAVORS.map((flavor, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={flavor.id}
                onClick={() => setFlavorByIndex(index)}
                className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-ciro-dark shadow-md scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute inset-0 rounded-full bg-white shadow-lg -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-ciro-dark' : 'bg-white/40'
                  }`}
                />
                <span>{flavor.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PizzaShowcaseHero;
