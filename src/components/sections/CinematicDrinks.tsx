import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DrinkItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  calVolume: string;
  tag: string;
  imgUrl: string;
  imgPositionClass: string;
  frameBgClass: string;
}

const drinksData: DrinkItem[] = [
  {
    id: 'drink-1',
    name: 'Custard Matcha',
    category: 'SIGNATURE CREATION',
    desc: 'Vibrant ceremonial Uji matcha layered over luscious house custard cream & condensed milk.',
    calVolume: '350 kcal · 260ml',
    tag: "Chef's Pick",
    imgUrl: '/assets/drinks/custard-matcha.jpg',
    imgPositionClass: 'object-bottom',
    frameBgClass: 'bg-[#B8D69A]',
  },
  {
    id: 'drink-2',
    name: 'Cranberry Espresso Tonic',
    category: '16-HOUR COLD BREW & BAR',
    desc: 'Vibrant ruby cranberry juice, crisp bubbly Indian tonic, a double espresso float & fresh skewered berries.',
    calVolume: '110 kcal · 270ml',
    tag: 'Zero-Proof Bar',
    imgUrl: '/assets/drinks/cranberry-espresso-tonic.jpg',
    imgPositionClass: 'object-[50%_70%]',
    frameBgClass: 'bg-[#FEF7EC]',
  },
  {
    id: 'drink-3',
    name: 'Night Sky Mocha',
    category: 'HOUSE SIGNATURE ROAST',
    desc: 'Single-origin espresso blended with Tenero 57% dark chocolate, steamed milk & activated edible charcoal.',
    calVolume: '260 kcal · 260ml',
    tag: 'House Signature',
    imgUrl: '/assets/drinks/night-sky-mocha.jpg',
    imgPositionClass: 'object-center',
    frameBgClass: 'bg-[#FEF7EC]',
  },
];

export const CinematicDrinks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stage transition background overlays
  const bgOliveRef = useRef<HTMLDivElement>(null);
  const bgEspressoRef = useRef<HTMLDivElement>(null);

  // Drink card wrappers
  const drink1WrapperRef = useRef<HTMLDivElement>(null);
  const drink2WrapperRef = useRef<HTMLDivElement>(null);
  const drink3WrapperRef = useRef<HTMLDivElement>(null);
  const drink3CircleRef = useRef<HTMLDivElement>(null);

  // Stage copy blocks
  const part1LeftRef = useRef<HTMLDivElement>(null);
  const part2RightRef = useRef<HTMLDivElement>(null);
  const text3LeftRef = useRef<HTMLDivElement>(null);
  const text3RightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !bgOliveRef.current ||
      !bgEspressoRef.current ||
      !drink1WrapperRef.current ||
      !drink2WrapperRef.current ||
      !drink3WrapperRef.current ||
      !drink3CircleRef.current ||
      !part1LeftRef.current ||
      !part2RightRef.current ||
      !text3LeftRef.current ||
      !text3RightRef.current
    )
      return;

    const mm = gsap.matchMedia();

    // 1. Subtle Idle Floating Animations
    const float1 = gsap.to(drink1WrapperRef.current, {
      y: '-=10',
      rotate: '-=1.2',
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const float2 = gsap.to(drink2WrapperRef.current, {
      y: '+=10',
      rotate: '+=1.2',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const float3 = gsap.to(drink3WrapperRef.current, {
      y: '-=9',
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // 2. Pinned 3-Stage Scroll Timeline for Desktop / Tablet
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: '+=170%',
          invalidateOnRefresh: true,
        },
      });

      tl
        // === PART 1: Custard Matcha subtle push-in ===
        .to(drink1WrapperRef.current, {
          scale: 1.03,
          duration: 1,
          ease: 'none',
        }, 0)
        .to(part1LeftRef.current, {
          y: '-8',
          duration: 1,
          ease: 'none',
        }, 0)

        // === TRANSITION 1: Cream -> Ciro Olive (#819273) & Drink 1 -> Drink 2 ===
        .to(bgOliveRef.current, {
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 1)
        .to(part1LeftRef.current, {
          x: '-30vw',
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        }, 1)
        .to(drink1WrapperRef.current, {
          x: '-55vw',
          scale: 1.15,
          filter: 'blur(14px)',
          autoAlpha: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 1)

        .fromTo(drink2WrapperRef.current, {
          x: '55vw',
          scale: 0.8,
          filter: 'blur(16px)',
          autoAlpha: 0,
        }, {
          x: '0vw',
          scale: 1,
          filter: 'blur(0px)',
          autoAlpha: 1,
          duration: 1.6,
          ease: 'power2.out',
        }, 1.2)
        .fromTo(part2RightRef.current, {
          x: '40',
          autoAlpha: 0,
        }, {
          x: '0',
          autoAlpha: 1,
          duration: 1.3,
          ease: 'power2.out',
        }, 1.5)

        // === TRANSITION 2: Ciro Olive -> Deep Roasted Espresso (#2D221D) & Drink 2 -> Drink 3 ===
        .to(drink2WrapperRef.current, {
          x: '-55vw',
          scale: 1.15,
          filter: 'blur(14px)',
          autoAlpha: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 2.7)
        .to(part2RightRef.current, {
          x: '-30vw',
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        }, 2.7)
        .to(bgEspressoRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        }, 2.7)

        .fromTo(drink3CircleRef.current, {
          scale: 0.75,
          opacity: 0,
        }, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        }, 3.0)
        .fromTo(drink3WrapperRef.current, {
          x: '55vw',
          scale: 0.8,
          filter: 'blur(16px)',
          autoAlpha: 0,
        }, {
          x: '0vw',
          scale: 1,
          filter: 'blur(0px)',
          autoAlpha: 1,
          duration: 1.6,
          ease: 'power2.out',
        }, 3.0)
        .fromTo(text3LeftRef.current, {
          opacity: 0,
          x: '-70',
        }, {
          opacity: 1,
          x: '0',
          duration: 1.3,
          ease: 'power2.out',
        }, 3.2)
        .fromTo(text3RightRef.current, {
          opacity: 0,
          x: '70',
        }, {
          opacity: 1,
          x: '0',
          duration: 1.3,
          ease: 'power2.out',
        }, 3.3)

        // === PART 3: Hold & subtle hero push-in ===
        .to(drink3WrapperRef.current, {
          scale: 1.04,
          duration: 1.1,
          ease: 'none',
        }, 4.5)
        .to(drink3CircleRef.current, {
          scale: 1.05,
          duration: 1.1,
          ease: 'none',
        }, 4.5)
        .to(text3LeftRef.current, {
          x: '-12',
          duration: 1.1,
          ease: 'none',
        }, 4.5)
        .to(text3RightRef.current, {
          x: '12',
          duration: 1.1,
          ease: 'none',
        }, 4.5);
    });

    return () => {
      float1.kill();
      float2.kill();
      float3.kill();
      mm.revert();
    };
  }, []);

  return (
    <div className="w-full relative bg-ciro-cream">

      {/* ============================================================ */}
      {/* DESKTOP / TABLET PINNED 3-STAGE BEVERAGE SHOWCASE            */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="hidden md:block w-full h-screen relative overflow-hidden select-none bg-[#FEF7EC] border-b-3 border-ciro-dark"
      >
        {/* Stage 2 Background Layer: Ciro Co. Signature Olive */}
        <div
          ref={bgOliveRef}
          className="absolute inset-0 w-full h-full opacity-0 z-0 pointer-events-none bg-[#819273]"
        >
          <div className="absolute inset-0 bg-grid-dots-light opacity-15 pointer-events-none" />
        </div>

        {/* Stage 3 Background Layer: Deep Roasted Espresso */}
        <div
          ref={bgEspressoRef}
          className="absolute inset-0 w-full h-full opacity-0 z-1 pointer-events-none bg-[#2D221D]"
        >
          <div className="absolute inset-0 bg-grid-dots-light opacity-10 pointer-events-none" />
        </div>

        {/* Base Stage 1 subtle grid dots */}
        <div className="absolute inset-0 bg-grid-dots opacity-[0.04] pointer-events-none z-1" />

        {/* ============================== */}
        {/* PART 1: Custard Matcha (Cream) */}
        {/* ============================== */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 pt-16 flex items-center justify-between z-10 pointer-events-none h-full">

          {/* Left Column Text & Button */}
          <div
            ref={part1LeftRef}
            className="w-1/2 flex flex-col items-start justify-center pointer-events-auto pr-8"
          >
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-[#819273] mb-3">
              HOUSE ALCHEMY • JAIPUR
            </span>
            <h2 className="font-serif italic font-extrabold text-6xl lg:text-[6.2rem] leading-[0.92] text-ciro-dark uppercase tracking-tight text-left">
              Ciroco
              <br />
              <span className="text-[#819273]">Drinks.</span>
            </h2>
            <p className="font-sans font-semibold text-sm lg:text-base text-ciro-espresso mt-4 max-w-md leading-relaxed">
              Ceremonial Uji matcha, 16-hour slow-steeped cold brews & handcrafted zero-proof pours.
            </p>
            <span className="font-bristol text-2xl text-[#819273] mt-2 -rotate-1 block">
              100% vegetarian & craft roasted ~
            </span>
            <a
              href="#drinks-menu"
              className="bg-[#819273] text-[#FEF7EC] px-8 py-3.5 rounded-full font-display font-black text-xs uppercase tracking-widest mt-6 hover:bg-ciro-dark hover:text-[#FEF7EC] transition-all duration-200 border-2 border-ciro-dark shadow-retro inline-flex items-center gap-2"
            >
              <span>Explore Beverage Menu</span>
              <span>→</span>
            </a>
          </div>

          {/* Right Column: Drink 1 Card + Description */}
          <div className="w-1/2 flex flex-col items-center lg:items-end justify-center h-full relative">
            <div
              ref={drink1WrapperRef}
              className="w-[240px] lg:w-[295px] flex flex-col items-center relative -rotate-[4deg]"
            >
              <div className={`w-full ${drinksData[0].frameBgClass} border-3 border-ciro-dark p-2.5 rounded-[30px] shadow-retro-lg relative`}>
                <div className="w-full aspect-[3/4] overflow-hidden rounded-[20px] border-2 border-ciro-dark bg-ciro-dark/10 relative">
                  <img
                    src={drinksData[0].imgUrl}
                    alt={drinksData[0].name}
                    className={`w-full h-full object-cover ${drinksData[0].imgPositionClass}`}
                    draggable={false}
                  />
                  <span className="absolute top-3 left-3 bg-[#FEF7EC] text-ciro-dark border border-ciro-dark px-2.5 py-1 rounded-full font-display font-extrabold text-[8px] uppercase tracking-wider shadow-sm">
                    {drinksData[0].tag}
                  </span>
                </div>
              </div>

              {/* Caption attached underneath */}
              <div className="mt-4 w-[280px] text-center pointer-events-auto">
                <h4 className="font-serif italic font-extrabold text-xl text-ciro-dark uppercase">
                  {drinksData[0].name}
                </h4>
                <p className="font-sans font-medium text-xs text-ciro-espresso mt-1 leading-relaxed">
                  {drinksData[0].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================= */}
        {/* PART 2: Cranberry Espresso Tonic (Olive)  */}
        {/* ========================================= */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 pt-16 flex items-center justify-between z-10 pointer-events-none h-full">

          {/* Left Column: Drink 2 Framed Photo */}
          <div className="w-1/2 flex flex-col items-center lg:items-start justify-center h-full relative">
            <div
              ref={drink2WrapperRef}
              className="w-[250px] lg:w-[310px] flex flex-col items-center relative rotate-[4deg] opacity-0"
            >
              <div className={`w-full ${drinksData[1].frameBgClass} border-3 border-ciro-dark p-2.5 rounded-[30px] shadow-retro-lg relative`}>
                <div className="w-full aspect-[3/4] overflow-hidden rounded-[20px] border-2 border-ciro-dark bg-ciro-dark/10 relative">
                  <img
                    src={drinksData[1].imgUrl}
                    alt={drinksData[1].name}
                    className={`w-full h-full object-cover ${drinksData[1].imgPositionClass}`}
                    draggable={false}
                  />
                  <span className="absolute top-3 right-3 bg-[#E6A89B] text-ciro-dark border border-ciro-dark px-2.5 py-1 rounded-full font-display font-extrabold text-[8px] uppercase tracking-wider shadow-sm">
                    {drinksData[1].tag}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Drink 2 Details */}
          <div
            ref={part2RightRef}
            className="w-1/2 flex flex-col items-start justify-center pl-10 lg:pl-16 pointer-events-auto opacity-0"
          >
            <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-[#F6E2B2] mb-3">
              {drinksData[1].category}
            </span>
            <h2 className="font-serif italic font-extrabold text-5xl lg:text-[4.6rem] leading-[0.95] text-[#FEF7EC] uppercase tracking-tight text-left">
              {drinksData[1].name}
            </h2>
            <p className="font-sans font-medium text-sm lg:text-base text-[#FEF7EC]/90 mt-4 max-w-md leading-relaxed">
              {drinksData[1].desc}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="bg-[#FEF7EC] text-ciro-dark border-2 border-ciro-dark px-3.5 py-1.5 rounded-full font-mono font-bold text-[10px] uppercase tracking-wider shadow-retro">
                {drinksData[1].calVolume}
              </span>
              <a
                href="#drinks-menu"
                className="bg-[#F6E2B2] text-ciro-dark border-2 border-ciro-dark px-5 py-1.5 rounded-full font-display font-black text-[10px] uppercase tracking-wider shadow-retro hover:bg-[#FEF7EC] transition-colors"
              >
                Full Bar Menu →
              </a>
            </div>
          </div>

        </div>

        {/* ========================================= */}
        {/* PART 3: Night Sky Mocha (Deep Espresso)   */}
        {/* ========================================= */}

        {/* Saffron Halo Ring behind Drink 3 */}
        <div
          ref={drink3CircleRef}
          className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 w-[56vw] h-[56vw] max-w-[430px] max-h-[430px] rounded-full bg-[#F6E2B2]/12 border border-[#F6E2B2]/25 z-8 opacity-0 pointer-events-none"
        />

        {/* Flanking Editorial Typography: SLOW / ROAST */}
        <div className="absolute inset-x-0 top-10 mx-auto max-w-6xl px-6 md:px-12 flex items-center justify-between z-9 pointer-events-none select-none h-full">
          <div ref={text3LeftRef} className="opacity-0">
            <h3 className="font-serif italic font-extrabold text-[10vw] md:text-[8.2vw] leading-none text-[#F6E2B2] uppercase tracking-tight">
              SLOW
            </h3>
          </div>
          <div ref={text3RightRef} className="opacity-0">
            <h3 className="font-serif italic font-extrabold text-[10vw] md:text-[8.2vw] leading-none text-[#F6E2B2] uppercase tracking-tight">
              ROAST
            </h3>
          </div>
        </div>

        {/* Drink 3 Centered Card & Info */}
        <div
          ref={drink3WrapperRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[235px] lg:w-[275px] flex flex-col items-center justify-center z-15 pointer-events-none opacity-0"
        >
          <div className="w-full bg-[#FEF7EC] border-3 border-ciro-dark p-2 rounded-[28px] shadow-[6px_6px_0px_0px_#819273] relative">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-[20px] border-2 border-ciro-dark bg-ciro-dark/10">
              <img
                src={drinksData[2].imgUrl}
                alt={drinksData[2].name}
                className={`w-full h-full object-cover ${drinksData[2].imgPositionClass}`}
                draggable={false}
              />
            </div>
          </div>

          {/* Card Badge Underneath */}
          <div className="mt-3.5 w-[290px] lg:w-[320px] text-center pointer-events-auto bg-[#FEF7EC] border-2 border-ciro-dark px-4 py-3 rounded-2xl shadow-retro">
            <span className="font-display font-black text-[9px] tracking-[0.2em] uppercase text-[#819273] block mb-0.5">
              {drinksData[2].tag} · {drinksData[2].calVolume}
            </span>
            <h4 className="font-serif italic font-extrabold text-lg text-ciro-dark uppercase leading-tight">
              {drinksData[2].name}
            </h4>
            <p className="font-sans font-medium text-[11px] leading-relaxed text-ciro-espresso mt-1">
              {drinksData[2].desc}
            </p>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* MOBILE NATURAL VERTICAL EXPERIENCE                           */}
      {/* ============================================================ */}
      <div className="block md:hidden w-full bg-[#FEF7EC] py-16 px-6 border-b-3 border-ciro-dark">

        {/* Mobile Section Header */}
        <div className="mb-10">
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-[#819273]">
            HOUSE ALCHEMY • JAIPUR
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl leading-none text-ciro-dark uppercase mt-2">
            Ciroco <span className="text-[#819273]">Drinks.</span>
          </h2>
          <p className="font-sans font-medium text-sm text-ciro-espresso mt-3">
            Ceremonial Uji matcha, 16-hour slow-steeped cold brews & bold zero-proof pours.
          </p>
        </div>

        {/* Vertical stacked drink cards matching authentic palette */}
        <div className="flex flex-col gap-8">
          {drinksData.map((drink, index) => {
            const isOliveCard = index === 1;
            const isEspressoCard = index === 2;

            return (
              <div
                key={drink.id}
                className={`flex flex-col items-center border-3 border-ciro-dark rounded-[32px] p-5 shadow-retro-lg relative overflow-hidden ${
                  isEspressoCard
                    ? 'bg-[#2D221D] text-[#FEF7EC]'
                    : isOliveCard
                      ? 'bg-[#819273] text-[#FEF7EC]'
                      : 'bg-[#FEF7EC] text-ciro-dark'
                }`}
              >
                <span
                  className={`self-start px-3 py-1 rounded-full font-display font-black text-[9px] uppercase tracking-wider border border-ciro-dark mb-4 ${
                    isEspressoCard
                      ? 'bg-[#F6E2B2] text-ciro-dark'
                      : isOliveCard
                        ? 'bg-[#FEF7EC] text-ciro-dark'
                        : 'bg-[#B8D69A] text-ciro-dark'
                  }`}
                >
                  {drink.category}
                </span>

                {/* Photo Frame */}
                <div className="w-full max-w-[260px] bg-[#FEF7EC] border-2 border-ciro-dark p-2 rounded-[24px] shadow-sm mb-5">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-[16px] border border-ciro-dark">
                    <img
                      src={drink.imgUrl}
                      alt={drink.name}
                      className={`w-full h-full object-cover ${drink.imgPositionClass}`}
                    />
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="w-full text-center px-2">
                  <h3 className="font-serif italic font-extrabold text-2xl uppercase">
                    {drink.name}
                  </h3>
                  <p
                    className={`font-sans font-medium text-xs leading-relaxed mt-2 ${
                      isEspressoCard || isOliveCard ? 'text-[#FEF7EC]/85' : 'text-ciro-espresso'
                    }`}
                  >
                    {drink.desc}
                  </p>
                  <span
                    className={`inline-block mt-3 font-mono text-[10px] font-bold px-3 py-1 rounded-full border ${
                      isEspressoCard || isOliveCard
                        ? 'border-[#F6E2B2]/40 text-[#F6E2B2] bg-white/10'
                        : 'border-ciro-dark/20 text-[#819273] bg-[#819273]/10'
                    }`}
                  >
                    {drink.calVolume}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA to full beverage menu */}
        <div className="mt-10 text-center">
          <a
            href="#drinks-menu"
            className="inline-flex items-center justify-center bg-[#819273] text-[#FEF7EC] border-2 border-ciro-dark px-8 py-4 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-retro w-full"
          >
            Explore Full Beverage Menu →
          </a>
        </div>

      </div>

    </div>
  );
};

export default CinematicDrinks;
