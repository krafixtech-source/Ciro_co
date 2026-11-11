import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ItalianMexican: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const jaipurTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !leftRef.current ||
      !rightRef.current ||
      !centerRef.current ||
      !jaipurTextRef.current
    )
      return;

    // Split screen collision animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: '+=100%',
        invalidateOnRefresh: true,
      },
    });

    tl.to(leftRef.current, { x: '0%', ease: 'none' }, 0)
      .to(rightRef.current, { x: '0%', ease: 'none' }, 0)
      .fromTo(centerRef.current, { scale: 0.2, rotate: -180 }, { scale: 1, rotate: 0, ease: 'back.out(1.7)' }, 0.2)
      .fromTo(jaipurTextRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5);

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-ciro-cream flex flex-col justify-between p-6 md:p-12 border-b-3 border-ciro-dark"
      id="collision"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Top Section Headline */}
      <div className="relative z-10 text-center max-w-xl mx-auto mt-12">
        <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-olive">
          THE SIGNATURE COLLISION
        </span>
        <h2 className="font-serif italic font-extrabold text-5xl md:text-7xl mt-2 leading-none">
          One Table.
          <br />
          Two Worlds.
        </h2>
      </div>

      {/* Split Panels Container */}
      <div className="absolute inset-0 flex items-center justify-between w-full h-full px-6 md:px-12 select-none">
        
        {/* Left Side (Italian): Starts shifted left */}
        <div
          ref={leftRef}
          className="w-[45vw] h-[60vh] -translate-x-[40%] flex justify-end items-center pr-4 md:pr-12 relative z-10"
        >
          <div className="w-full max-w-[340px] aspect-square bg-ciro-lime border-3 border-ciro-dark p-2 rotate-[-4deg] overflow-hidden">
            <div className="w-full h-full bg-ciro-dark/10 border-2 border-ciro-dark relative">
              <img
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
                alt="Italian Pizza Slabs"
                className="w-full h-full object-cover"
                id="italianFood02"
              />
              <div className="absolute top-4 left-4 bg-ciro-cream border-2 border-ciro-dark px-3 py-1 font-display font-black text-[9px] uppercase tracking-wider text-ciro-dark">
                PASTA / PIZZA / ESPRESSO
              </div>
            </div>
          </div>
        </div>

        {/* Center collision indicator */}
        <div
          ref={centerRef}
          className="w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-ciro-dark bg-ciro-olive flex items-center justify-center font-display font-black text-base md:text-xl text-ciro-light relative z-20 scale-0 origin-center"
        >
          ×
        </div>

        {/* Right Side: Starts shifted right */}
        <div
          ref={rightRef}
          className="w-[45vw] h-[60vh] translate-x-[40%] flex justify-start items-center pl-4 md:pl-12 relative z-10"
        >
          <div className="w-full max-w-[340px] aspect-square bg-ciro-orange border-3 border-ciro-dark p-2 rotate-[4deg] overflow-hidden">
            <div className="w-full h-full bg-ciro-dark/10 border-2 border-ciro-dark relative">
              <img
                src="/assets/tiramisu_latte.jpg"
                alt="Mocha Tiramisu Latte"
                className="w-full h-full object-cover"
                id="mexicanFood02"
              />
              <div className="absolute bottom-4 right-4 bg-ciro-cream border-2 border-ciro-dark px-3 py-1 font-display font-black text-[9px] uppercase tracking-wider text-ciro-dark">
                MOCHA / TIRAMISU / LATTE
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Reveal Text: Triggers when colliding */}
      <div
        ref={jaipurTextRef}
        className="relative z-10 text-center mb-12 opacity-0 transform translate-y-12"
      >
        <span className="font-display font-black text-xs uppercase tracking-widest text-ciro-espresso">
          Best Pizzas' And Taccos'
        </span>
        <h3 className="font-serif italic font-extrabold text-4xl md:text-6xl text-ciro-olive uppercase mt-1">
          JAIPUR.
        </h3>
      </div>
    </section>
  );
};
export default ItalianMexican;
