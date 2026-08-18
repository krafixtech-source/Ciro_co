import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FoodCinema: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    // Scale video slowly on scroll
    const scaleAnimation = gsap.to(videoRef.current, {
      scale: 1.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      scaleAnimation.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden bg-ciro-dark text-ciro-cream flex items-center justify-center border-b-3 border-ciro-dark"
      id="cinema"
    >
      {/* Background Video with scaling */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity scale-100"
        poster="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
        id="foodCinemaVideo"
      >
        {/* Later actual source: <source src="foodCinema.mp4" type="video/mp4" /> */}
      </video>

      {/* Subtle overlay film-grain block */}
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />

      {/* Large Overlapping Typography */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <span className="font-display font-black text-xs md:text-sm uppercase tracking-[0.3em] text-ciro-lime block mb-4">
          THE ART OF GATHERING
        </span>
        <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl leading-[0.95] uppercase tracking-tight">
          MADE TO BE
          <br />
          SHARED.
        </h2>
      </div>
    </section>
  );
};
export default FoodCinema;
