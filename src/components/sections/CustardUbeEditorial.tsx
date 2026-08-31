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
      className="relative w-full h-[440px] sm:h-[500px] md:h-[550px] overflow-hidden flex items-center justify-center select-none border-t-3 border-ciro-dark"
      style={{
        backgroundColor: '#723385', // Rich, vibrant royal purple
      }}
    >
      {/* 1. Subtle Paper / Film Grain Overlay */}
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 pointer-events-none z-0" />

      {/* 2. THREE GIANT MOVING KINETIC TYPOGRAPHY ROWS (Behind the Ube Drink) */}
      <div className="absolute inset-0 flex flex-col justify-around py-4 sm:py-6 pointer-events-none overflow-hidden z-10 opacity-90">
        
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
            <span className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
            <span className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
          </motion.div>
        </motion.div>

        {/* ROW 2 (MIDDLE): Giant Outlined/Stroked NEW ARRIVAL Kinetic Marquee (Moves Left -> Right) */}
        <motion.div
          style={{ x: scrollShiftRow2 }}
          className="w-full flex whitespace-nowrap overflow-visible"
        >
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 24,
            }}
            className="flex flex-nowrap shrink-0 items-center will-change-transform"
          >
            <span
              className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-wider text-transparent leading-none mr-6 sm:mr-8"
              style={{
                WebkitTextStroke: '2.5px rgba(245, 230, 250, 0.25)',
              }}
            >
              {newArrivalMarqueeText}
            </span>
            <span
              className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-wider text-transparent leading-none mr-6 sm:mr-8"
              style={{
                WebkitTextStroke: '2.5px rgba(245, 230, 250, 0.25)',
              }}
            >
              {newArrivalMarqueeText}
            </span>
          </motion.div>
        </motion.div>

        {/* ROW 3 (BOTTOM): Giant CUSTURD UBE Kinetic Marquee (Right -> Left) */}
        <motion.div
          style={{ x: scrollShiftRow3 }}
          className="w-full flex whitespace-nowrap overflow-visible"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 21,
            }}
            className="flex flex-nowrap shrink-0 items-center will-change-transform"
          >
            <span className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
            <span className="font-display font-black text-[14vw] sm:text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] uppercase tracking-tighter text-[#F5E6FA]/22 leading-none mr-6 sm:mr-8">
              {ubeMarqueeText}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. HERO OBJECT: UBE DRINK (Centered in Front of All 3 Moving Rows) */}
      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        <motion.div
          style={{
            rotateX: drinkTiltX,
            rotateY: drinkTiltY,
            x: drinkShiftX,
            y: drinkScrollParallax,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] aspect-[1/1] flex items-center justify-center"
        >
          {/* Subtle Glass Contact Shadow */}
          <div className="absolute bottom-3 w-44 sm:w-52 md:w-60 h-8 bg-black/45 blur-xl rounded-full transform scale-x-125 pointer-events-none -z-10" />

          {/* Floating Ube Drink Image */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
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
    </section>
  );
};

export default CustardUbeEditorial;
