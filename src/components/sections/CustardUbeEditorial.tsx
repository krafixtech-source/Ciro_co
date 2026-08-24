import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export const CustardUbeEditorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollMarqueeShift = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const drinkScrollParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // 3D Mouse Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const drinkTiltX = useTransform(smoothMouseY, [-200, 200], [5, -5]);
  const drinkTiltY = useTransform(smoothMouseX, [-300, 300], [-6, 6]);
  const drinkShiftX = useTransform(smoothMouseX, [-300, 300], [-10, 10]);

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

  const marqueeText = "CUSTURD UBE • CUSTURD UBE • CUSTURD UBE • CUSTURD UBE • ";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[420px] sm:h-[480px] md:h-[550px] overflow-hidden bg-[#6F4A7E] flex flex-col justify-between select-none py-6 px-4 sm:px-8 border-y-3 border-ciro-dark"
      style={{
        backgroundColor: '#6F4A7E',
      }}
    >
      {/* 1. Subtle Paper / Film Grain Overlay */}
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 pointer-events-none z-0" />

      {/* 2. Top Header Accent Labels */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[#E8D8E8]/75 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E8D8E8] animate-pulse" />
          <span>SIGNATURE DRINK</span>
        </div>
        <div className="hidden sm:block text-[#E8D8E8]/60">
          CIRO CO • CRAFTED BEVERAGES
        </div>
        <div>
          <span>JAIPUR // 2026</span>
        </div>
      </div>

      {/* 3. GIANT KINETIC TYPOGRAPHY (Moving Seamlessly Right -> Left in Background) */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden z-10 opacity-90">
        
        {/* Row 1: Giant Outlined / Filled Kinetic Marquee (Right to Left) */}
        <motion.div
          style={{ x: scrollMarqueeShift }}
          className="w-full flex whitespace-nowrap overflow-visible"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 22,
            }}
            className="flex flex-nowrap shrink-0 items-center will-change-transform"
          >
            <span className="font-display font-black text-[18vw] sm:text-[14vw] md:text-[150px] lg:text-[190px] xl:text-[230px] uppercase tracking-tighter text-[#E8D8E8]/20 leading-none mr-8">
              {marqueeText}
            </span>
            <span className="font-display font-black text-[18vw] sm:text-[14vw] md:text-[150px] lg:text-[190px] xl:text-[230px] uppercase tracking-tighter text-[#E8D8E8]/20 leading-none mr-8">
              {marqueeText}
            </span>
          </motion.div>
        </motion.div>

        {/* Row 2: Secondary Offset Kinetic Marquee (Moving Slightly Faster) */}
        <motion.div
          style={{ x: scrollMarqueeShift }}
          className="w-full flex whitespace-nowrap overflow-visible -mt-6 sm:-mt-10 md:-mt-14"
        >
          <motion.div
            animate={{ x: ['-25%', '-75%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 26,
            }}
            className="flex flex-nowrap shrink-0 items-center will-change-transform"
          >
            <span className="font-display font-black text-[16vw] sm:text-[12vw] md:text-[130px] lg:text-[170px] xl:text-[210px] uppercase tracking-tighter text-transparent leading-none mr-8"
              style={{
                WebkitTextStroke: '2px rgba(232, 216, 232, 0.18)',
              }}
            >
              {marqueeText}
            </span>
            <span className="font-display font-black text-[16vw] sm:text-[12vw] md:text-[130px] lg:text-[170px] xl:text-[210px] uppercase tracking-tighter text-transparent leading-none mr-8"
              style={{
                WebkitTextStroke: '2px rgba(232, 216, 232, 0.18)',
              }}
            >
              {marqueeText}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. HERO OBJECT: UBE DRINK (Positioned Prominently in Front of Typography) */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            rotateX: drinkTiltX,
            rotateY: drinkTiltY,
            x: drinkShiftX,
            y: drinkScrollParallax,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative h-[250px] sm:h-[310px] md:h-[370px] lg:h-[410px] aspect-[1/1] flex items-center justify-center translate-y-2 sm:translate-y-4"
        >
          {/* Subtle Glass Contact Shadow */}
          <div className="absolute bottom-4 w-40 sm:w-48 md:w-56 h-8 bg-black/45 blur-xl rounded-full transform scale-x-125 pointer-events-none -z-10" />

          {/* Floating Ube Drink Image */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
              rotate: [-0.6, 0.6, -0.6],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative h-full w-auto flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
          >
            <img
              src="/assets/ube_drink.png"
              alt="Ciro Custard Ube Signature Drink"
              className="h-full w-auto object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Bottom Editorial Metadata Labels */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[#E8D8E8]/75 font-mono text-[9px] sm:text-[11px] md:text-xs tracking-[0.2em] uppercase font-medium pt-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold">
            NEW
          </span>
          <span className="hidden sm:inline">UBE • VELVET CREAM • VANILLA</span>
          <span className="sm:hidden">UBE • CREAM</span>
        </div>

        <div className="text-right text-[#E8D8E8]/60">
          <span>HOUSE SPECIALTY // 100% ORGANIC</span>
        </div>
      </div>
    </section>
  );
};

export default CustardUbeEditorial;
