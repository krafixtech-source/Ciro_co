import React from 'react';

interface InstagramPost {
  id: string;
  imgUrl: string;
  caption: string;
  sizeClass: string;
  rotateClass: string;
  imageSlotId: string;
}

export const SocialInstagram: React.FC = () => {
  const posts: InstagramPost[] = [
    { id: 'ig-1', caption: 'Neapolitan Sourdough prep', imgUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-1 row-span-1', rotateClass: 'rotate-[-1deg]', imageSlotId: 'instagram01' },
    { id: 'ig-2', caption: 'Cocktail mixing behind the bar', imgUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-1 row-span-2', rotateClass: 'rotate-[2deg]', imageSlotId: 'instagram02' },
    { id: 'ig-3', caption: 'Slow-drip single origin brews', imgUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-2 row-span-1', rotateClass: 'rotate-[-2deg]', imageSlotId: 'instagram03' },
    { id: 'ig-4', caption: 'Vibrant street tacos platter', imgUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-1 row-span-1', rotateClass: 'rotate-[1deg]', imageSlotId: 'instagram04' },
    { id: 'ig-5', caption: 'Cafe interior glow', imgUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-1 row-span-1', rotateClass: 'rotate-[-3deg]', imageSlotId: 'instagram05' },
    { id: 'ig-6', caption: 'Fresh basil & mozzarella', imgUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', sizeClass: 'col-span-2 row-span-1', rotateClass: 'rotate-[2deg]', imageSlotId: 'instagram06' },
  ];

  return (
    <section
      className="relative w-full min-h-screen bg-ciro-cream text-ciro-dark py-24 px-6 md:px-12 border-b-3 border-ciro-dark"
      id="instagram"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-olive">
            SOCIAL WALL
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-7xl uppercase mt-2 leading-none tracking-tight">
            CIRO AFTER
            <br />
            DARK.
          </h2>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#829375] text-[#FEF7EC] border-2 border-ciro-dark px-6 py-3 font-display font-black text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-cream transition-colors duration-300"
        >
          FOLLOW @CIROCO
        </a>
      </div>

      {/* Masonry Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] relative z-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`group relative overflow-hidden border-2 border-ciro-dark p-2 bg-ciro-light shadow-retro hover:rotate-0 transition-transform duration-300 ${post.sizeClass} ${post.rotateClass}`}
            data-cursor="view"
          >
            <div className="w-full h-full border border-ciro-dark overflow-hidden relative">
              <img
                src={post.imgUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                id={post.imageSlotId}
              />
              {/* Hover overlay caption */}
              <div className="absolute inset-0 bg-ciro-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-ciro-cream">
                <span className="text-[9px] font-display font-black uppercase text-ciro-olive tracking-widest">
                  @CIROCO
                </span>
                <p className="font-sans font-semibold text-xs mt-1 leading-snug">
                  {post.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SocialInstagram;
