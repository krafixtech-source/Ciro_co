import React, { useRef, useEffect } from 'react';
import { Star, Heart, ExternalLink, Award } from 'lucide-react';
import { reviewsData } from '../../data/reviewsData';

export const Reviews: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);

  // Sort reviews by relevance (highest quality and helpful reviews first)
  const allReviews = [...reviewsData].sort((a, b) => {
    const scoreA = (a.likes * 8) + (a.isLocalGuide ? 5 : 0) + (a.rating >= 4 ? 4 : 0) + Math.min(a.text.length / 40, 6);
    const scoreB = (b.likes * 8) + (b.isLocalGuide ? 5 : 0) + (b.rating >= 4 ? 4 : 0) + Math.min(b.text.length / 40, 6);
    return scoreB - scoreA;
  });

  // Continuous auto-scroll effect
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.6; // gentle smooth scroll speed

    const step = () => {
      const el = scrollContainerRef.current;
      if (el && !isHoveredRef.current && !isDraggingRef.current) {
        el.scrollLeft += speed;
        // If reached end, wrap back to start seamlessly
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Mouse drag handlers for effortless horizontal panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    isHoveredRef.current = false;
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? 'text-ciro-saffron fill-ciro-saffron'
                : 'text-white/20 fill-white/10'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative w-full py-24 overflow-hidden bg-[#FBF5EB] text-ciro-dark border-b-3 border-ciro-dark"
      id="reviews"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative z-10">
        <div>
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-[#829375]">
            PEOPLE TALK
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-4 leading-none tracking-tight">
            THE CHATTER.
          </h2>
        </div>
        
        {/* Google Reviews Badge */}
        <div className="border-2 border-ciro-dark bg-[#FEF7EC] text-ciro-dark p-4 shadow-retro flex items-center gap-4 rotate-[-1deg] rounded-[16px]">
          <div className="bg-[#829375] text-ciro-cream w-12 h-12 rounded-full border border-ciro-dark flex items-center justify-center font-display font-black text-lg">
            4.4
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-[10px] tracking-wider text-[#829375]">GOOGLE BUSINESS</span>
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">VERIFIED</span>
            </div>
            <span className="block font-serif italic text-lg leading-none font-bold mt-0.5">
              {reviewsData.length}+ Authentic Reviews
            </span>
          </div>
        </div>
      </div>

      {/* All Reviews - Continuous Smooth Horizontal Scrollable Track */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="w-full flex overflow-x-auto scrollbar-none py-6 px-6 md:px-12 select-none gap-6 cursor-grab active:cursor-grabbing snap-x relative z-10"
        style={{ scrollBehavior: 'auto' }}
      >
        {allReviews.map((rev) => (
          <div
            key={rev.id}
            className="inline-block whitespace-normal w-[320px] sm:w-[360px] md:w-[390px] p-6 border-3 border-ciro-dark shadow-retro-lg hover:shadow-retro-orange rounded-[24px] flex-shrink-0 bg-[#829375] text-ciro-cream flex flex-col justify-between transition-all duration-300 snap-start select-none"
          >
            <div>
              {/* Top Row: Stars + Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  {renderStars(rev.rating)}
                  <span className="font-mono text-xs font-bold text-ciro-cream/90 ml-1">
                    {rev.rating}.0
                  </span>
                </div>
                <span className="text-[10px] font-mono text-ciro-cream/70">
                  {rev.date}
                </span>
              </div>

              {/* Meal & Spend Badge if available */}
              {rev.meal && (
                <div className="mb-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider bg-ciro-cream/15 text-ciro-cream px-2 py-0.5 rounded border border-ciro-cream/20 inline-block font-semibold">
                    {rev.meal}
                  </span>
                </div>
              )}

              {/* Review Text */}
              <p className="font-serif italic font-medium text-sm md:text-base leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
                "{rev.text}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between border-t border-ciro-cream/20 pt-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border-2 border-ciro-dark bg-ciro-cream text-ciro-dark flex items-center justify-center font-display font-black text-xs flex-shrink-0 shadow-sm">
                  {rev.initials}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-display font-extrabold text-xs uppercase tracking-wide truncate max-w-[170px]">
                    {rev.name}
                  </h4>
                  {rev.isLocalGuide && (
                    <span className="text-[8px] text-ciro-saffron tracking-wider font-mono flex items-center gap-1">
                      <Award className="w-2.5 h-2.5" />
                      Local Guide
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {rev.likes > 0 && (
                  <span className="text-[10px] font-mono flex items-center gap-1 bg-ciro-cream/15 px-2 py-0.5 rounded-full border border-ciro-cream/20">
                    <Heart className="w-3 h-3 text-red-300 fill-red-300" />
                    {rev.likes}
                  </span>
                )}
                {rev.url && (
                  <a
                    href={rev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on Google Maps"
                    className="text-ciro-cream/60 hover:text-ciro-cream transition-colors p-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
