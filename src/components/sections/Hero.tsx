import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Organic Leaf SVG illustrations to frame the food image card
const LeftLeafDecoration: React.FC = () => (
  <svg
    viewBox="0 0 240 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hero-leaf-left absolute left-[0%] md:left-[11%] bottom-[8%] w-[32%] md:w-[22%] max-w-[240px] z-20 pointer-events-none select-none origin-bottom-left"
  >
    {/* Smooth flowing main stem */}
    <path
      d="M 40 320 C 60 220 20 140 120 70"
      stroke="#819273"
      strokeWidth="4"
      strokeLinecap="round"
    />
    
    {/* Large bottom leaf */}
    <path
      d="M 55 260 C 20 240 -10 200 15 185 C 40 170 65 210 55 260 Z"
      fill="#819273"
    />
    
    {/* Middle leaf pointing left-up */}
    <path
      d="M 60 190 C 25 170 15 120 45 115 C 75 110 85 150 60 190 Z"
      fill="#5E753B"
    />

    {/* Upper-middle leaf pointing right-up */}
    <path
      d="M 85 130 C 60 90 65 50 95 60 C 125 70 115 105 85 130 Z"
      fill="#819273"
    />

    {/* Top leaf */}
    <path
      d="M 120 70 C 110 40 120 20 140 30 C 160 40 145 65 120 70 Z"
      fill="#F0DEAF"
    />

    {/* Floating cream/beige seed shapes */}
    <path
      d="M 25 130 C 20 120 28 110 35 115 C 42 120 34 135 25 130 Z"
      fill="#E6D3B3"
    />
    <path
      d="M 95 215 C 90 205 98 195 105 200 C 112 205 104 220 95 215 Z"
      fill="#E6D3B3"
    />
    <path
      d="M 155 80 C 150 70 158 60 165 65 C 172 70 164 85 155 80 Z"
      fill="#E6D3B3"
    />
  </svg>
);

const RightLeafDecoration: React.FC = () => (
  <svg
    viewBox="0 0 240 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hero-leaf-right absolute right-[0%] md:right-[11%] top-[8%] w-[32%] md:w-[22%] max-w-[240px] z-20 pointer-events-none select-none origin-top-right"
  >
    {/* Smooth flowing main stem */}
    <path
      d="M 200 0 C 180 100 220 180 120 250"
      stroke="#819273"
      strokeWidth="4"
      strokeLinecap="round"
    />
    
    {/* Large top-right leaf */}
    <path
      d="M 185 60 C 220 80 250 120 225 135 C 205 150 175 110 185 60 Z"
      fill="#819273"
    />
    
    {/* Middle leaf pointing right-down */}
    <path
      d="M 180 130 C 215 150 225 200 195 205 C 165 210 155 170 180 130 Z"
      fill="#5E753B"
    />

    {/* Lower-middle leaf pointing left-down */}
    <path
      d="M 155 190 C 180 230 175 270 145 260 C 115 250 125 215 155 190 Z"
      fill="#819273"
    />

    {/* Bottom leaf */}
    <path
      d="M 120 250 C 130 280 120 300 100 290 C 80 280 95 255 120 250 Z"
      fill="#F0DEAF"
    />

    {/* Floating cream/beige seed shapes */}
    <path
      d="M 215 190 C 220 200 212 210 205 205 C 198 200 206 185 215 190 Z"
      fill="#E6D3B3"
    />
    <path
      d="M 145 105 C 150 115 142 125 135 120 C 128 115 136 100 145 105 Z"
      fill="#E6D3B3"
    />
    <path
      d="M 85 240 C 90 250 82 260 75 255 C 68 250 76 235 85 240 Z"
      fill="#E6D3B3"
    />
  </svg>
);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Page Load Animation
    const tl = gsap.timeline();
    tl.fromTo('.hero-text-anim', 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      }
    )
    .fromTo('.hero-card-anim', {
      y: 60,
      opacity: 0,
      scale: 0.95,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.9')
    .fromTo('.hero-leaf-left', {
      x: -60,
      opacity: 0,
      rotate: -15,
    }, {
      x: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.8')
    .fromTo('.hero-leaf-right', {
      x: 60,
      opacity: 0,
      rotate: 15,
    }, {
      x: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1.2');

    let scrollTl: gsap.core.Timeline | null = null;

    // 2. GSAP ScrollTrigger timeline (Scale card to full viewport & fade elements)
    if (
      containerRef.current &&
      pinnedRef.current &&
      textContainerRef.current &&
      cardRef.current &&
      titleRef.current &&
      btnRef.current &&
      overlayRef.current
    ) {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinnedRef.current, // Pin the h-screen child viewport
          scrub: 1,
          start: 'top top',
          end: 'bottom bottom', // Unpins exactly when trigger container reaches bottom
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        // Scale card to fill screen, flatten corners, remove border
        .to(cardRef.current, {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          ease: 'none',
        }, 0)
        // Translate the ENTIRE text container down together to overlay on the card
        .to(textContainerRef.current, {
          y: '20vh',
          scale: 0.9,
          ease: 'none',
        }, 0)
        // Transition title color to ivory to stay readable on image overlay
        .to(titleRef.current, {
          color: '#FEF7EC',
          ease: 'none',
        }, 0)
        // Adjust button colors for the overlay state
        .to(btnRef.current, {
          backgroundColor: '#FEF7EC',
          color: '#171512',
          ease: 'none',
        }, 0)
        // Make card dark overlay stronger for text contrast
        .to(overlayRef.current, {
          opacity: 0.45,
          ease: 'none',
        }, 0)
        // Fade out leaf decorations as card expands
        .to('.hero-leaf-left', {
          opacity: 0,
          x: -120,
          rotate: -15,
          ease: 'none',
        }, 0)
        .to('.hero-leaf-right', {
          opacity: 0,
          x: 120,
          rotate: 15,
          ease: 'none',
        }, 0);
    }

    return () => {
      tl.kill();
      if (scrollTl) {
        scrollTl.scrollTrigger?.kill();
        scrollTl.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[180vh] bg-ciro-light"
      id="hero-container"
    >
      {/* Pinned viewport segment */}
      <div
        ref={pinnedRef}
        className="w-full h-screen flex flex-col justify-between items-center relative overflow-hidden py-12 px-6 bg-ciro-light"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />

        {/* Spacer for Floating Nav */}
        <div className="h-24 flex-shrink-0" />

        {/* Center: Title & CTA button in a single container */}
        <div 
          ref={textContainerRef}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full mb-auto mt-2"
        >
          <h1
            ref={titleRef}
            className="hero-text-anim opacity-0 font-serif font-normal text-[5.5vw] md:text-[3.6vw] lg:text-[3.8vw] leading-[1.15] tracking-tight text-ciro-olive"
          >
            <span className="whitespace-nowrap">Italian Heart. Mexican Soul.</span>
            <br />
            <span className="italic">Jaipur Energy.</span>
          </h1>

          <a
            ref={btnRef}
            href="#menu"
            className="hero-text-anim opacity-0 mt-4 md:mt-5 bg-[#829475] text-white px-9 py-2 rounded-full font-bristol text-2xl md:text-3xl tracking-wide hover:scale-105 hover:bg-[#718264] transition-all duration-200 relative z-30 inline-flex items-center justify-center -rotate-1 hover:rotate-0"
            data-cursor="view"
          >
            Explore
          </a>
        </div>

        {/* Bottom: Card & Decorative Organic Leaves */}
        <div className="relative z-10 flex justify-center items-end w-full h-[42vh] md:h-[50vh] mt-4 flex-shrink-0">
          
          {/* Leaf decorations framing the card */}
          <LeftLeafDecoration />
          <RightLeafDecoration />

          {/* The Expanding Media Card */}
          <div
            ref={cardRef}
            className="hero-card-anim w-[90%] md:w-[68vw] h-full rounded-[40px] md:rounded-[54px] overflow-hidden relative shadow-sm bg-ciro-dark flex items-center justify-center select-none"
          >
            {/* Dark contrast overlay inside card */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-ciro-dark opacity-[0.05] z-10 transition-opacity duration-300 pointer-events-none"
            />

            {/* Food Grid Image */}
            <img
              src="/hero-food.jpg"
              alt="Ciroco Mexican and Italian Culinary Dishes"
              className="w-full h-full object-cover"
              id="heroImage"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
