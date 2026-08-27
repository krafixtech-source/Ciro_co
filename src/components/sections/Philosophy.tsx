import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.horizontal-panel');
    if (!containerRef.current || !scrollRef.current || panels.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop/Tablet Landscape: Pinned Horizontal Scroll
    mm.add('(min-width: 768px)', () => {
      const scrollAnimation = gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollRef.current!.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel: any) => {
        const img = panel.querySelector('.panel-image');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.9, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollAnimation,
                start: 'left right',
                end: 'left center',
                scrub: true,
              },
            }
          );
        }
      });
    });

    // Mobile/Tablet Portrait: Normal Vertical Scroll Flow
    mm.add('(max-width: 767px)', () => {
      panels.forEach((panel: any) => {
        const img = panel.querySelector('.panel-image');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.95, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                end: 'top 60%',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-auto md:h-screen border-b-3 border-ciro-dark">
      <div ref={scrollRef} className="flex flex-col md:flex-row md:flex-nowrap h-auto md:h-full w-full md:w-[300vw]">
        
        {/* Panel 01: Cucina */}
        <section className="horizontal-panel flex-shrink-0 w-full md:w-screen h-auto md:h-full bg-[#829375] text-ciro-cream flex items-center p-6 py-20 md:py-0 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Numbers & Texts */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="font-display font-black text-6xl md:text-9xl text-ciro-saffron leading-none block">
                01
              </span>
              <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-2 text-ciro-cream tracking-tight">
                CUCINA
              </h2>
              <span className="font-bristol text-2xl text-ciro-saffron mt-1 block -rotate-1">
                ~ slow fermented dough & San Marzano tomatoes ~
              </span>
              <p className="mt-6 font-sans font-bold text-lg md:text-xl text-ciro-cream/80 max-w-xl leading-relaxed">
                Comforting, authentic, and unapologetic. Wood-fired sourdough pizzas, fresh hand-rolled pasta plates, and velvety tiramisu desserts—crafted using traditional Italian secrets.
              </p>
            </div>

            {/* Graphic card image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="panel-image w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[32px] origin-center">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
                  alt="CIRO Italian Cucina"
                  className="w-full h-full object-cover"
                  id="italianFood01"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Panel 02: Culture */}
        <section className="horizontal-panel flex-shrink-0 w-full md:w-screen h-auto md:h-full bg-[#FBF5EB] text-ciro-dark flex items-center p-6 py-20 md:py-0 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Graphic card image */}
            <div className="md:col-span-5 flex justify-center order-last md:order-first">
              <div className="panel-image w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[32px] origin-center">
                <img
                  src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
                  alt="CIRO Mexican Cultura"
                  className="w-full h-full object-cover"
                  id="mexicanFood01"
                />
              </div>
            </div>

            {/* Numbers & Texts */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="font-display font-black text-6xl md:text-9xl text-ciro-olive leading-none block">
                02
              </span>
              <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-2 tracking-tight">
                CULTURE
              </h2>
              <span className="font-bristol text-2xl text-ciro-olive mt-1 block -rotate-1">
                ~ street-style masa & vibrant house salsas ~
              </span>
              <p className="mt-6 font-sans font-bold text-lg md:text-xl text-ciro-espresso max-w-xl leading-relaxed">
                Bold, energetic, and highly social. Vibrant plates of street tacos, zesty fresh salsas, loaded quesadillas, and cold drinks—infused with the colorful rhythm of Jaipur nights.
              </p>
            </div>
          </div>
        </section>

        {/* Panel 03: Coffee */}
        <section className="horizontal-panel flex-shrink-0 w-full md:w-screen h-auto md:h-full bg-ciro-olive text-ciro-cream flex items-center p-6 py-20 md:py-0 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Numbers & Texts */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="font-display font-black text-6xl md:text-9xl text-ciro-lime leading-none block">
                03
              </span>
              <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-2 tracking-tight">
                COFFEE
              </h2>
              <span className="font-bristol text-2xl text-ciro-lime mt-1 block -rotate-1">
                ~ artisanal beans & specialty manual brews ~
              </span>
              <p className="mt-6 font-sans font-bold text-lg md:text-xl text-ciro-cream/90 max-w-xl leading-relaxed">
                Slow mornings, long conversations, and custom single-origin bean roasts. Velvety cappuccinos, signature spiced lattes, and artisan drips—brewed for curators of coffee.
              </p>
            </div>

            {/* Graphic card image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="panel-image w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[32px] origin-center">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80"
                  alt="CIRO Barista Coffee"
                  className="w-full h-full object-cover"
                  id="coffee01"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
export default Philosophy;
