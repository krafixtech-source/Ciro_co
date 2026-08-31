import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const WideVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax for the video to keep it feeling premium and alive
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-ciro-dark select-none"
      id="cinematic-showcase"
    >
      {/* Background Video */}
      <motion.div
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Mobile Video */}
        <video
          src="/Got_it_👍_So_the_animation_sho.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover pointer-events-none"
        />
        {/* Desktop/Tablet Video */}
        <video
          src="/Create_a_wide_horizontal_anima.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover pointer-events-none"
        />
      </motion.div>

      {/* Elegant green text overlay (Pasta themed) - positioned at the top */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start text-center p-6 pt-16 md:pt-24 pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.3em] text-[#819273] mb-3"
        >
          Ciroco's
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#819273] uppercase tracking-tight max-w-[280px] sm:max-w-md md:max-w-none leading-none md:whitespace-nowrap"
        >
          Signature Handmade Pasta
        </motion.h2>
        
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-bristol text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#819273] block mt-3 -rotate-1"
        >
          Coming Right Up!
        </motion.span>
      </div>
    </section>
  );
};

export default WideVideoSection;
