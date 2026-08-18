import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax floating food objects
    const items = gsap.utils.toArray('.floating-item');
    items.forEach((item: any) => {
      const depth = item.getAttribute('data-depth') || 0.2;
      gsap.to(item, {
        y: -(150 * parseFloat(depth)),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

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

    // Image drift on scroll
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-ciro-cream text-ciro-dark py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b-3 border-ciro-dark"
      id="about"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Sparse Editorial Floating Food Elements */}
      <div
      className="floating-item absolute top-[15%] left-[8%] w-12 h-12 text-ciro-olive opacity-70 pointer-events-none"
        data-depth="0.3"
      >
        {/* Chili SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C10.5 4 8 4 6 5c-3 1.5-5 5.5-3.5 9s6 7 11 8.5 7.5-.5 9-4.5c2-5-1-10-3-12-1.5-1.5-2.5-3-2.5-4h-5z" />
          <path d="M16 2c0 2-2 3-4 3" />
        </svg>
      </div>

      <div
        className="floating-item absolute top-[25%] right-[10%] w-16 h-16 text-ciro-lime opacity-70 pointer-events-none"
        data-depth="0.5"
      >
        {/* Lime/Lemon SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(-30 12 12)" />
          <path d="M7 8l10 8" />
        </svg>
      </div>

      <div
        className="floating-item absolute bottom-[15%] left-[12%] w-10 h-10 text-ciro-orange opacity-70 pointer-events-none"
        data-depth="0.1"
      >
        {/* Tomato/Orange SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 5c-1-1-2-2-4-2M12 5c1-1 2-2 4-2" />
        </svg>
      </div>

      <div
        className="floating-item absolute bottom-[25%] right-[15%] w-8 h-8 text-ciro-espresso opacity-70 pointer-events-none"
        data-depth="0.4"
      >
        {/* Coffee Bean SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(45 12 12)" />
          <path d="M7 17C9 13 15 11 17 7" />
        </svg>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area */}
        <div ref={textRef} className="md:col-span-8 flex flex-col justify-center">
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-olive">
            DISCOVER THE VIBE
          </span>
          
          <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl mt-4 leading-none uppercase">
            NOT JUST A CAFE.
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
        <div className="md:col-span-4 flex justify-center md:justify-end relative">
          <div
            ref={imageRef}
            className="w-full max-w-[320px] bg-ciro-saffron border-3 border-ciro-dark shadow-retro-lg p-3 transition-transform duration-300 hover:rotate-[-2deg] relative z-20 translate-y-12"
            data-cursor="view"
          >
            <div className="w-full aspect-[3/4] bg-ciro-dark/10 overflow-hidden border-2 border-ciro-dark">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                alt="CIRO CO Culinary Intro"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                id="introImage"
              />
            </div>
            <div className="mt-4 flex justify-between items-center text-xs font-display font-black uppercase text-ciro-dark tracking-wider">
              <span>CIRO CULINARY</span>
              <span className="text-ciro-olive">#01 INTRO</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default BrandIntro;
