import React from 'react';

interface ReviewItem {
  id: string;
  name: string;
  avatarLetter: string;
  quote: string;
  rating: string;
  bgClass: string;
  textClass: string;
}

export const Reviews: React.FC = () => {
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      name: 'Shaily Mody Bhargava',
      avatarLetter: 'SM',
      quote: '“Very very tasty Italian food, good ambience, good service, good music. Must visit.”',
      rating: '★★★★★',
      bgClass: 'bg-[#829375]',
      textClass: 'text-ciro-cream',
    },
    {
      id: 'rev-2',
      name: 'Pihu Jalan',
      avatarLetter: 'PJ',
      quote: '“Delicious pastries, enchanting ambiance, unbeatable prices.”',
      rating: '★★★★★',
      bgClass: 'bg-[#FEF7EC]',
      textClass: 'text-ciro-dark',
    },
    {
      id: 'rev-3',
      name: 'The Filmy Munda',
      avatarLetter: 'FM',
      quote: '“Good place to hangout with friends, food & drinks are amazing…”',
      rating: '★★★★★',
      bgClass: 'bg-[#829375]',
      textClass: 'text-ciro-cream',
    },
  ];

  return (
    <section
      className="relative w-full py-24 overflow-hidden bg-[#FBF5EB] text-ciro-dark border-b-3 border-ciro-dark"
      id="reviews"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-10">
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
            <span className="block font-display font-extrabold text-[10px] tracking-wider text-[#829375]">GOOGLE BUSINESS</span>
            <span className="block font-serif italic text-lg leading-none font-bold">132+ Google Reviews</span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Reviews Scroller */}
      <div className="w-full flex overflow-hidden py-4 select-none">
        {/* Double-loop for infinite scroll visual seamlessness */}
        <div className="flex gap-8 whitespace-nowrap animate-marquee-loop hover:animation-play-state-paused">
          {[...reviews, ...reviews, ...reviews].map((rev, idx) => (
            <div
              key={rev.id + '-' + idx}
              className={`inline-block whitespace-normal w-[320px] md:w-[380px] p-6 border-3 border-ciro-dark shadow-retro-lg rounded-[24px] flex-shrink-0 ${rev.bgClass} ${rev.textClass}`}
            >
              <div className="flex flex-col justify-between h-full gap-6">
                <div>
                  <div className={`${rev.textClass === 'text-ciro-cream' ? 'text-ciro-saffron' : 'text-[#829375]'} text-sm tracking-widest font-black mb-4`}>
                    {rev.rating}
                  </div>
                  <p className="font-serif italic font-extrabold text-lg leading-relaxed">
                    {rev.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 border-t border-current/20 pt-4 mt-2">
                  <div className="w-10 h-10 rounded-full border-2 border-ciro-dark bg-[#FEF7EC] text-ciro-dark flex items-center justify-center font-display font-black text-xs">
                    {rev.avatarLetter}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs uppercase tracking-wide">
                      {rev.name}
                    </h4>
                    <span className="block text-[8px] opacity-70 tracking-widest uppercase font-bold">
                      Verified Reviewer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
