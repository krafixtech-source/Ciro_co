import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text words on scroll
    if (textRef.current) {
      gsap.fromTo(
        '.reveal-char',
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }

    // Scroll tilt animation for the salad bowl (tilted more, scrubs on scroll up/down, not on hover)
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { rotate: -12 },
        {
          rotate: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-ciro-cream text-ciro-dark py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b-3 border-ciro-dark"
      id="about"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area */}
        <div ref={textRef} className="md:col-span-7 flex flex-col justify-center">

          
          <h2 className="font-serif font-medium text-4xl md:text-7xl mt-4 leading-snug tracking-tight text-ciro-dark">
            Not Just a Cafe.
          </h2>

          <div className="mt-8 text-2xl md:text-4xl font-serif text-ciro-espresso leading-snug">
            {['CIRO', 'CO', 'is', 'where', 'cucina,', 'culture', 'and', 'coffee', 'meet.'].map((word, i) => (
              <span key={i} className="reveal-char inline-block mr-3">
                {word}
              </span>
            ))}
          </div>

          <p className="mt-6 font-sans font-medium text-lg leading-relaxed text-ciro-dark/80 max-w-xl">
            Born in Jaipur, inspired by everywhere. Italian comfort, Mexican soul, and a love for good coffee — served with a little CIRO attitude. We build flavors that break rules.
          </p>
        </div>

        {/* Oversized Parallax Image Slot */}
        <div className="md:col-span-5 relative min-h-[280px] md:min-h-[440px]">
          {/* Spacer block to hold layout structure */}
        </div>

      </div>

      {/* Absolutely positioned salad bowl bleeding off the bottom-right corner of the section */}
      <div
        ref={imageRef}
        className="absolute right-[-100px] bottom-[-120px] md:right-[-220px] md:bottom-[-260px] w-[440px] md:w-[850px] aspect-square z-20 select-none max-w-none group cursor-pointer"
        data-cursor="view"
      >
        <img
          src="/salad-bowl.png"
          alt="CIRO CO Culinary Intro"
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-750 ease-out"
          id="introImage"
        />
      </div>
    </section>
  );
};
export default BrandIntro;
