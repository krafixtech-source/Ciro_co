import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DrinkItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: string;
  imgUrl: string;
}

const drinksData: DrinkItem[] = [
  {
    id: 'drink-1',
    name: 'Saffron Sunrise',
    category: 'VIBRANT ELIXIR',
    desc: 'Artisanal citrus blend with saffron infusion, fresh hand-pressed lime, and organic agave nectar.',
    price: '₹550',
    imgUrl: '/assets/drink1.png',
  },
  {
    id: 'drink-2',
    name: 'Hibiscus Paloma',
    category: 'VIBRANT ELIXIR',
    desc: 'Bold hibiscus flower tea, grapefruit juice, sparkling soda water, and a pink salt rim.',
    price: '₹580',
    imgUrl: '/assets/drink2.png',
  },
  {
    id: 'drink-3',
    name: 'Espresso Carajillo',
    category: 'DESSERT COFFEE',
    desc: 'Freshly pulled espresso shot shaken over ice with Licor 43 and sweet orange zest.',
    price: '₹480',
    imgUrl: '/assets/drink3.png',
  },
];

export const CinematicDrinks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // References for GSAP animations
  const bgYellowRef = useRef<HTMLDivElement>(null);
  const drink1WrapperRef = useRef<HTMLDivElement>(null);
  const drink2WrapperRef = useRef<HTMLDivElement>(null);
  const drink3WrapperRef = useRef<HTMLDivElement>(null);
  const drink3CircleRef = useRef<HTMLDivElement>(null);

  // Part 1 Text & Button
  const part1LeftRef = useRef<HTMLDivElement>(null);

  // Part 2 Text
  const part2RightRef = useRef<HTMLDivElement>(null);

  // Part 3 Typography
  const text3SipRef = useRef<HTMLDivElement>(null);
  const text3SlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !bgYellowRef.current ||
      !drink1WrapperRef.current ||
      !drink2WrapperRef.current ||
      !drink3WrapperRef.current ||
      !drink3CircleRef.current ||
      !part1LeftRef.current ||
      !part2RightRef.current ||
      !text3SipRef.current ||
      !text3SlowRef.current
    )
      return;

    const mm = gsap.matchMedia();

    // 1. Idle Floating Animations
    const float1 = gsap.to(drink1WrapperRef.current, {
      y: '-=15',
      x: '+=3',
      rotate: '+=1',
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const float2 = gsap.to(drink2WrapperRef.current, {
      y: '+=12',
      x: '-=3',
      rotate: '-=1',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const float3 = gsap.to(drink3WrapperRef.current, {
      y: '-=12',
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // 2. Main Pinned Scroll Timeline for Desktop / Tablet
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: '+=140%',
          invalidateOnRefresh: true,
        },
      });

      tl
        // === PART 1: Subtle push-in ===
        .to(drink1WrapperRef.current, {
          scale: 1.03,
          duration: 1,
          ease: 'none',
        }, 0)
        .to(part1LeftRef.current, {
          y: '-10',
          duration: 1,
          ease: 'none',
        }, 0)

        // === TRANSITION 1: Drink 1 -> Drink 2 ===
        .to(part1LeftRef.current, {
          x: '-30vw',
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 1)
        .to(drink1WrapperRef.current, {
          x: '-60vw',
          scale: 1.25,
          filter: 'blur(16px)',
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 1)

        .fromTo(drink2WrapperRef.current, {
          x: '60vw',
          scale: 0.75,
          filter: 'blur(20px)',
          opacity: 0,
        }, {
          x: '0vw',
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.8,
          ease: 'power2.out',
        }, 1.2)
        .fromTo(part2RightRef.current, {
          x: '40',
          opacity: 0,
        }, {
          x: '0',
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
        }, 1.5)

        // === TRANSITION 2: Drink 2 -> Drink 3 ===
        .to(drink2WrapperRef.current, {
          x: '-60vw',
          scale: 1.25,
          filter: 'blur(16px)',
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 2.5)
        .to(part2RightRef.current, {
          x: '-30vw',
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 2.5)
        .to(bgYellowRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 2.5)

        .fromTo(drink3WrapperRef.current, {
          x: '60vw',
          scale: 0.75,
          filter: 'blur(20px)',
          opacity: 0,
        }, {
          x: '0vw',
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.8,
          ease: 'power2.out',
        }, 2.7)
        .fromTo(drink3CircleRef.current, {
          scale: 0.8,
          opacity: 0,
        }, {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power2.out',
        }, 2.8)

        .fromTo(text3SipRef.current, {
          opacity: 0,
          x: '-80',
        }, {
          opacity: 1,
          x: '0',
          duration: 1.4,
          ease: 'power2.out',
        }, 3.0)
        .fromTo(text3SlowRef.current, {
          opacity: 0,
          x: '80',
        }, {
          opacity: 1,
          x: '0',
          duration: 1.4,
          ease: 'power2.out',
        }, 3.1)

        // === PART 3: Drink 3 Hero state push-in and parallax typography ===
        .to(drink3WrapperRef.current, {
          scale: 1.06,
          duration: 1.2,
          ease: 'none',
        }, 4.2)
        .to(drink3CircleRef.current, {
          scale: 1.04,
          duration: 1.2,
          ease: 'none',
        }, 4.2)
        .to(text3SipRef.current, {
          x: '-15',
          scale: 1.02,
          duration: 1.2,
          ease: 'none',
        }, 4.2)
        .to(text3SlowRef.current, {
          x: '15',
          scale: 1.02,
          duration: 1.2,
          ease: 'none',
        }, 4.2);
    });

    return () => {
      float1.kill();
      float2.kill();
      float3.kill();
      mm.revert();
    };
  }, []);

  return (
    <div className="w-full relative bg-ciro-light">
      
      {/* ============================================================ */}
      {/* DESKTOP / TABLET PINNED INTERACTIVE EXPERIENCE               */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="hidden md:block w-full h-screen relative overflow-hidden select-none bg-[#FEF7EC] border-b-3 border-ciro-dark"
      >
        
        {/* Yellow closing background overlay */}
        <div
          ref={bgYellowRef}
          className="absolute inset-0 w-full h-full opacity-0 z-0 pointer-events-none bg-[#F5D17B]"
        />

        {/* Grid dots backdrop decoration */}
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none z-1" />

        {/* ============================== */}
        {/* PART 1: Drink 1 Hero           */}
        {/* ============================== */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between z-2 pointer-events-none h-full">
          
          {/* Left Column Text & Button */}
          <div
            ref={part1LeftRef}
            className="w-1/2 flex flex-col items-start justify-center pointer-events-auto"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-ciro-olive mb-3">
              Mixology Curation
            </span>
            <h2 className="font-sans font-black text-6xl lg:text-[6.8rem] leading-[0.9] text-ciro-dark uppercase tracking-tight text-left">
              Ciroco
              <br />
              Drinks.
            </h2>
            <p className="font-sans font-medium text-sm text-ciro-espresso mt-3">
              Fresh pours, bold flavours.
            </p>
            <a
              href="#menu"
              className="bg-[#F5D17B] text-ciro-dark px-8 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wider mt-6 hover:scale-105 transition-all duration-200 shadow-sm border border-ciro-dark/10"
            >
              Explore More
            </a>
          </div>

          {/* Right Column: Drink 1 and description */}
          <div className="w-1/2 flex flex-col items-end justify-center h-full relative">
            <div
              ref={drink1WrapperRef}
              className="w-[300px] lg:w-[380px] aspect-[1/1.5] flex flex-col items-center justify-center relative -rotate-[6deg] -translate-y-8"
            >
              <div className="absolute bottom-[-15px] w-32 lg:w-40 h-5 bg-black/35 blur-lg rounded-full transform scale-x-125 -z-10" />
              <img
                src={drinksData[0].imgUrl}
                alt={drinksData[0].name}
                className="w-full h-auto object-contain"
                draggable={false}
              />
              {/* Description text attached underneath */}
              <div className="absolute top-[102%] w-[260px] text-center pointer-events-auto">
                <h4 className="font-sans font-bold text-sm text-ciro-dark">
                  {drinksData[0].name}
                </h4>
                <p className="font-sans font-medium text-xs text-ciro-espresso/80 mt-1">
                  {drinksData[0].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ============================== */}
        {/* PART 2: Drink 2 Showcase       */}
        {/* ============================== */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between z-2 pointer-events-none h-full">
          
          {/* Left Column: Drink 2 */}
          <div className="w-1/2 flex flex-col items-start justify-center h-full relative">
            <div
              ref={drink2WrapperRef}
              className="w-[300px] lg:w-[380px] aspect-[1/1.5] flex flex-col items-center justify-center relative rotate-[6deg] -translate-y-8 opacity-0"
            >
              <div className="absolute bottom-[-15px] w-32 lg:w-40 h-5 bg-black/35 blur-lg rounded-full transform scale-x-125 -z-10" />
              <img
                src={drinksData[1].imgUrl}
                alt={drinksData[1].name}
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column: Drink 2 text details */}
          <div
            ref={part2RightRef}
            className="w-1/2 flex flex-col items-start justify-center pl-16 pointer-events-auto opacity-0"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-ciro-olive mb-3">
              {drinksData[1].category}
            </span>
            <h2 className="font-sans font-black text-5xl lg:text-[4.5rem] leading-[0.9] text-ciro-dark uppercase tracking-tight text-left">
              {drinksData[1].name}
            </h2>
            <p className="font-sans font-medium text-sm text-ciro-espresso mt-3 max-w-md">
              {drinksData[1].desc}
            </p>
          </div>

        </div>

        {/* ============================== */}
        {/* PART 3: Drink 3 Closing        */}
        {/* ============================== */}

        {/* Cream circle behind Drink 3 */}
        <div
          ref={drink3CircleRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[460px] max-h-[460px] rounded-full bg-[#FEF7EC]/35 z-2 opacity-0 pointer-events-none"
        />

        {/* Flanking Typography FRESH / POUR flanking Drink 3 */}
        <div className="absolute inset-x-0 mx-auto max-w-6xl px-6 md:px-12 flex items-center justify-between z-3 pointer-events-none select-none h-full">
          {/* FRESH (Left Flank) */}
          <div ref={text3SipRef} className="opacity-0">
            <h3 className="font-sans font-black text-[11vw] md:text-[9vw] leading-none text-ciro-dark uppercase tracking-tighter">
              FRESH
            </h3>
          </div>
          {/* POUR (Right Flank) */}
          <div ref={text3SlowRef} className="opacity-0">
            <h3 className="font-sans font-black text-[11vw] md:text-[9vw] leading-none text-ciro-dark uppercase tracking-tighter">
              POUR
            </h3>
          </div>
        </div>

        {/* Drink 3 (Centered) */}
        <div
          ref={drink3WrapperRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] sm:w-[300px] md:w-[340px] lg:w-[380px] aspect-[1/1.5] flex flex-col items-center justify-center z-10 pointer-events-none opacity-0"
        >
          <div className="absolute bottom-[-15px] w-28 sm:w-36 md:w-44 h-6 bg-black/45 blur-lg rounded-full transform scale-x-125 -z-10" />
          <img
            src={drinksData[2].imgUrl}
            alt={drinksData[2].name}
            className="w-full h-auto object-contain"
            draggable={false}
          />
          {/* Description text attached underneath */}
          <div className="absolute top-[102%] w-[260px] text-center pointer-events-auto bg-[#FEF7EC]/80 border border-ciro-dark/10 px-4 py-2 rounded-2xl backdrop-blur-sm shadow-sm">
            <h4 className="font-sans font-bold text-sm text-ciro-dark">
              {drinksData[2].name}
            </h4>
            <p className="font-sans font-medium text-[11px] leading-relaxed text-ciro-espresso mt-1">
              {drinksData[2].desc}
            </p>
          </div>
        </div>

        {/* Glassmorphic Section Badge */}
        <div className="absolute top-6 left-6 z-25 pointer-events-none select-none">
          <span className="bg-black/45 backdrop-blur-md border border-ciro-cream/20 text-ciro-cream text-xs font-display tracking-widest px-3 py-1 uppercase rounded-full">
            Beverage Cinema
          </span>
        </div>

      </div>

      {/* ============================================================ */}
      {/* MOBILE NATURAL VERTICAL EXPERIENCE                           */}
      {/* ============================================================ */}
      <div className="block md:hidden w-full bg-ciro-light py-16 px-6 border-b-3 border-ciro-dark">
        
        {/* Mobile Section Header */}
        <div className="mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-ciro-olive">
            Mixology Curation
          </span>
          <h2 className="font-sans font-black text-5xl leading-none text-ciro-dark uppercase mt-2">
            Ciroco
            <br />
            Drinks.
          </h2>
          <p className="font-sans font-medium text-sm text-ciro-espresso mt-3">
            Fresh pours, bold flavours.
          </p>
        </div>

        {/* Vertical stacked drink cards */}
        <div className="flex flex-col gap-10">
          {drinksData.map((drink) => (
            <div
              key={drink.id}
              className="flex flex-col items-center bg-[#FEF7EC]/60 border border-ciro-dark/15 rounded-[32px] p-6 shadow-sm relative overflow-hidden"
            >
              {/* Category tag */}
              <span className="absolute top-4 left-6 bg-ciro-cream border border-ciro-dark/10 px-3 py-1 rounded-full font-sans font-bold text-[9px] uppercase tracking-wider text-ciro-olive">
                {drink.category}
              </span>
              
              {/* Product Image */}
              <div className="w-[160px] aspect-[1/1.5] flex items-center justify-center my-6">
                <img
                  src={drink.imgUrl}
                  alt={drink.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Title, desc & price */}
              <div className="w-full text-center">
                <h3 className="font-serif font-black text-2xl text-ciro-dark">
                  {drink.name}
                </h3>
                <p className="font-sans font-medium text-xs leading-relaxed text-ciro-espresso/80 mt-2 px-2">
                  {drink.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Section 3 Closing Frame */}
        <div className="mt-16 bg-[#F5D17B] border border-ciro-dark/15 rounded-[40px] p-8 flex flex-col items-center justify-center relative overflow-hidden h-[380px]">
          {/* Backing Circle */}
          <div className="absolute w-56 h-56 rounded-full bg-[#FEF7EC]/35 z-0" />
          
          {/* Flanking mobile texts (Stacked) */}
          <span className="font-sans font-black text-4xl text-ciro-dark uppercase tracking-tight z-10 mb-2">
            FRESH
          </span>

          {/* drink 3 centered */}
          <div className="w-[120px] aspect-[1/1.5] z-10 my-2 relative">
            <img
              src={drinksData[2].imgUrl}
              alt={drinksData[2].name}
              className="w-full h-auto object-contain"
            />
          </div>

          <span className="font-sans font-black text-4xl text-ciro-dark uppercase tracking-tight z-10 mt-2">
            POUR
          </span>
        </div>

      </div>

    </div>
  );
};

export default CinematicDrinks;
