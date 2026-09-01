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
    {
      id: 'ig-1',
      caption: 'Neapolitan Sourdough & Craft Drinks',
      imgUrl: '/assets/afterdark/sourdough_pizza.jpg',
      sizeClass: 'col-span-1 row-span-1',
      rotateClass: 'rotate-[-1deg]',
      imageSlotId: 'afterdark01',
    },
    {
      id: 'ig-2',
      caption: 'Precision Espresso Extraction on Green La Marzocco',
      imgUrl: '/assets/coffee/espresso_shot.jpg',
      sizeClass: 'col-span-1 md:col-span-1 row-span-1 md:scale-105 border-ciro-olive z-20',
      rotateClass: 'rotate-[0deg]',
      imageSlotId: 'afterdark_center',
    },
    {
      id: 'ig-3',
      caption: 'Hand-pressed Tacos & Hibiscus Paloma',
      imgUrl: '/assets/afterdark/tacos_platter.jpg',
      sizeClass: 'col-span-1 row-span-1',
      rotateClass: 'rotate-[2deg]',
      imageSlotId: 'afterdark02',
    },
    {
      id: 'ig-4',
      caption: 'Fresh Creamy Burrata & Garden Salad',
      imgUrl: '/assets/afterdark/burrata_salad.jpg',
      sizeClass: 'col-span-1 row-span-1',
      rotateClass: 'rotate-[-2deg]',
      imageSlotId: 'afterdark03',
    },
    {
      id: 'ig-5',
      caption: 'Crispy Calamari Rings & House Salsa',
      imgUrl: '/assets/afterdark/calamari_rings.jpg',
      sizeClass: 'col-span-1 row-span-1',
      rotateClass: 'rotate-[1deg]',
      imageSlotId: 'afterdark04',
    },
    {
      id: 'ig-6',
      caption: 'Wood-fired Pizza Slices & Tiki Elixirs',
      imgUrl: '/assets/afterdark/pizza_slice.jpg',
      sizeClass: 'col-span-1 row-span-1',
      rotateClass: 'rotate-[-2deg]',
      imageSlotId: 'afterdark05',
    },
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
            EVENING CULINARY SHOWCASE
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-7xl uppercase mt-2 leading-none tracking-tight">
            CIRO AFTER
            <br />
            DARK.
          </h2>
          <p className="font-sans font-medium text-base text-ciro-espresso mt-4 max-w-xl leading-relaxed">
            As the sun sets over Jaipur, our kitchen ignites. From wood-fired Neapolitan sourdough pizzas and hand-pressed tacos to precision-extracted espresso and vibrant evening cocktails.
          </p>
        </div>

        <a
          href="#menu"
          className="bg-[#829375] text-[#FEF7EC] border-2 border-ciro-dark px-6 py-3 font-display font-black text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-cream transition-colors duration-300 self-start md:self-end"
        >
          EXPLORE FOOD MENU
        </a>
      </div>

      {/* Masonry Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] relative z-10">
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
              <div className="absolute inset-0 bg-ciro-dark/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-ciro-cream">
                <span className="text-[10px] font-display font-black uppercase text-ciro-saffron tracking-widest">
                  CIRO SPECIALTY
                </span>
                <p className="font-serif italic font-bold text-base mt-1 leading-snug text-ciro-cream">
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
