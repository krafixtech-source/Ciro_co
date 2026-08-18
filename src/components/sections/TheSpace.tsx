import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpacePhoto {
  id: string;
  caption: string;
  imgUrl: string;
  aspectClass: string;
  rotateClass: string;
  offsetClass: string;
  imageSlotId: string;
  bgColorClass?: string;
}

export const TheSpace: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const photos: SpacePhoto[] = [
    { id: 'sp-1', caption: 'MORNING LIGHT', imgUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', aspectClass: 'aspect-[3/4]', rotateClass: 'rotate-[-2deg]', offsetClass: 'md:translate-y-4', imageSlotId: 'interior01' },
    { id: 'sp-2', caption: 'LONG LUNCHES', imgUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80', aspectClass: 'aspect-square', rotateClass: 'rotate-[3deg]', offsetClass: 'md:-translate-y-8', imageSlotId: 'interior02' },
    { id: 'sp-3', caption: 'LATE COFFEE', imgUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', aspectClass: 'aspect-[4/3]', rotateClass: 'rotate-[-1deg]', offsetClass: 'md:translate-y-12', imageSlotId: 'interior03' },
    { id: 'sp-4', caption: 'GOOD MUSIC', imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', aspectClass: 'aspect-[3/4]', rotateClass: 'rotate-[2deg]', offsetClass: 'md:-translate-y-4', imageSlotId: 'people01' },
    { id: 'sp-5', caption: 'JAIPUR NIGHTS', imgUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80', aspectClass: 'aspect-square', rotateClass: 'rotate-[-3deg]', offsetClass: 'md:translate-y-6', imageSlotId: 'people02' },
  ];

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop/Tablet Landscape: Pin and vertical scroll scrub
    mm.add('(min-width: 768px)', () => {
      const pin = gsap.to(scrollContainerRef.current, {
        x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollContainerRef.current!.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        pin.scrollTrigger?.kill();
      };
    });

    // Mobile/Tablet Portrait: Free horizontal swipe
    mm.add('(max-width: 767px)', () => {
      // No pinning or scroll-jacking, let users swipe natively
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden w-full h-auto py-16 md:py-0 md:h-screen border-b-3 border-ciro-dark bg-[#FBF5EB]">
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Main pinned scroll track */}
      <div ref={scrollContainerRef} className="flex flex-row flex-nowrap overflow-x-auto scrollbar-none snap-x h-auto items-center py-6 gap-6 pl-6 pr-6 w-full md:w-[220vw] md:h-full md:pl-12 md:pr-[30vw] md:gap-12 md:overflow-visible">
        
        {/* Title Panel */}
        <div className="flex-shrink-0 w-[85vw] md:w-[40vw] flex flex-col justify-center select-none pr-6 md:pr-12">
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-olive">
            THE AMBIENCE
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl text-ciro-dark uppercase leading-none tracking-tight">
            TAKE A
            <br />
            SEAT.
          </h2>
          <p className="mt-6 font-sans font-bold text-sm text-ciro-dark/80 max-w-xs uppercase">
            A visual overview of our tables, bar, lighting, and cozy corners.
          </p>
        </div>

        {/* Photos list */}
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`snap-center flex-shrink-0 w-[280px] md:w-[350px] relative transition-transform duration-300 hover:scale-102 ${photo.offsetClass}`}
          >
            <div className={`w-full ${photo.bgColorClass || 'bg-ciro-cream'} border-3 border-ciro-dark p-3 shadow-retro-lg ${photo.rotateClass}`}>
              <div className={`w-full ${photo.aspectClass} overflow-hidden border-2 border-ciro-dark bg-ciro-dark/10`}>
                <img
                  src={photo.imgUrl}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  id={photo.imageSlotId}
                />
              </div>
              <div className="mt-4 flex justify-between items-center text-xs font-display font-black uppercase text-ciro-dark tracking-wider">
                <span>{photo.caption}</span>
                <span className="text-ciro-olive"><i className="fa-solid fa-camera"></i></span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
export default TheSpace;
