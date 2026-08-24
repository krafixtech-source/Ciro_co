import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export const CustardUbeEditorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollShiftRow1 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const scrollShiftRow2 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const scrollShiftRow3 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const drinkScrollParallax = useTransform(scrollYProgress, [0, 1], [-15, 15]);

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

  const ubeMarqueeText = "CUSTURD UBE • CUSTURD UBE • CUSTURD UBE • CUSTURD UBE • ";
  const newArrivalMarqueeText = "NEW ARRIVAL • NEW ARRIVAL • NEW ARRIVAL • NEW ARRIVAL • ";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] overflow-hidden flex flex-col justify-between select-none py-4 sm:py-6 px-4 sm:px-8 border-y-3 border-ciro-dark"
      style={{
        backgroundColor: '#723385', // Rich, vibrant royal purple
      }}
    >
      {/* 1. Subtle Paper / Film Grain Overlay */}
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 pointer-events-none z-0" />

      {/* 2. Top Header Accent Micro-Labels */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[#F5E6FA]/85 font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5E6FA] animate-pulse" />
          <span className="hidden sm:inline">SIGNATURE DRINK</span>
          <span className="sm:hidden">SIGNATURE</span>
        </div>
        <div className="hidden sm:block text-[#F5E6FA]/65">
          CIRO CO • CRAFTED BEVERAGES
        </div>
        <div>
          <span>JAIPUR // 2026</span>
        </div>
      </div>

      {/* 3. THREE GIANT MOVING KINETIC TYPOGRAPHY ROWS (Behind the Ube Drink) */}
      <div className="absolute inset-0 flex flex-col justify-around py-8 sm:py-10 pointer-events-none overflow-hidden z-10 opacity-90">
        
        {/* ROW 1 (TOP): Giant CUSTURD UBE Marquee (Right -> Left) */}
        <motion.div
          style={{ x: scrollShiftRow1 }}
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
            <span className="font-display font-black text-[13vw] sm:text-[10vw] md:text-[100px] lg:text-[130px] xl:text-[150px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
            <span className="font-display font-black text-[13vw] sm:text-[10vw] md:text-[100px] lg:text-[130px] xl:text-[150px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
          </motion.div>
        </motion.div>

        {/* ROW 2 (MIDDLE): Giant CUSTURD UBE Stroked Outline (Right -> Left, Offset) */}
        <motion.div
          style={{ x: scrollShiftRow2 }}
          className="w-full flex whitespace-nowrap overflow-visible"
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
            <span
              className="font-display font-black text-[13vw] sm:text-[10vw] md:text-[100px] lg:text-[130px] xl:text-[150px] uppercase tracking-tighter text-transparent leading-none mr-6 sm:mr-8"
              style={{
                WebkitTextStroke: '2px rgba(245, 230, 250, 0.22)',
              }}
            >
              {ubeMarqueeText}
            </span>
            <span
              className="font-display font-black text-[13vw] sm:text-[10vw] md:text-[100px] lg:text-[130px] xl:text-[150px] uppercase tracking-tighter text-transparent leading-none mr-6 sm:mr-8"
              style={{
                WebkitTextStroke: '2px rgba(245, 230, 250, 0.22)',
              }}
            >
              {ubeMarqueeText}
            </span>
          </motion.div>
        </motion.div>

        {/* ROW 3 (BOTTOM): Giant NEW ARRIVAL Kinetic Marquee (Right -> Left) */}
        <motion.div
          style={{ x: scrollShiftRow3 }}
          className="w-full flex whitespace-nowrap overflow-visible"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 20,
            }}
            className="flex flex-nowrap shrink-0 items-center will-change-transform"
          >
            <span className="font-display font-black text-[11vw] sm:text-[8.5vw] md:text-[85px] lg:text-[110px] xl:text-[125px] uppercase tracking-wider text-[#F5E6FA]/20 leading-none mr-6 sm:mr-8">
              {newArrivalMarqueeText}
            </span>
            <span className="font-display font-black text-[11vw] sm:text-[8.5vw] md:text-[85px] lg:text-[110px] xl:text-[125px] uppercase tracking-wider text-[#F5E6FA]/20 leading-none mr-6 sm:mr-8">
              {newArrivalMarqueeText}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. HERO OBJECT: UBE DRINK (Centered in Front of All 3 Moving Rows) */}
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
          className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] aspect-[1/1] flex items-center justify-center translate-y-1 sm:translate-y-2"
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
            className="relative h-full w-auto flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
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

      {/* 5. BOTTOM CENTER BADGE & METADATA */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between text-[#F5E6FA]/85 font-mono text-[9px] sm:text-[11px] md:text-xs tracking-[0.2em] uppercase font-medium pt-2">
        {/* Left flavor info */}
        <div className="w-1/3 text-left">
          <span className="hidden md:inline">UBE • VELVET CREAM • VANILLA</span>
          <span className="md:hidden">100% ORGANIC</span>
        </div>

        {/* Center: Glowing NEW ARRIVAL Pill */}
        <div className="w-1/3 flex justify-center">
          <div className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase shadow-[0_4px_15px_rgba(0,0,0,0.25)] flex items-center gap-2 transition-all">
            <span className="w-2 h-2 rounded-full bg-[#FFF0FF] animate-ping" />
            <span>NEW ARRIVAL</span>
          </div>
        </div>

        {/* Right info */}
        <div className="w-1/3 text-right text-[#F5E6FA]/70">
          <span className="hidden sm:inline">HOUSE SPECIALTY // COLD PRESSED</span>
          <span className="sm:hidden">SPECIALTY</span>
        </div>
      </div>
    </section>
  );
};

export default CustardUbeEditorial;
