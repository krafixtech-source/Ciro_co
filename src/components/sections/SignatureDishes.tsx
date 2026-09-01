import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DishCard {
  id: string;
  name: string;
  category: string;
  desc: string;
  imgUrl: string;
  aspectClass: string;
  imageSlotId: string;
}

export const SignatureDishes: React.FC = () => {
  const dishes: DishCard[] = [
    {
      id: 'dish-1',
      name: 'Truffle Fettuccine Wild Mushroom',
      category: 'PASTA',
      desc: 'Hand-rolled fresh fettuccine, white truffle cream, wild mushrooms, and 24-month aged Parmigiano.',
      imgUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
      aspectClass: 'aspect-[3/4]',
      imageSlotId: 'signatureDish01',
    },
    {
      id: 'dish-2',
      name: 'Burrata & Parma Sourdough Pizza',
      category: 'PIZZA',
      desc: 'Sourdough crust, San Marzano marinara, creamy fresh burrata ball, parma ham, arugula, olive oil.',
      imgUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      aspectClass: 'aspect-square',
      imageSlotId: 'signatureDish02',
    },
    {
      id: 'dish-3',
      name: 'Birria Beef Soft Tacos',
      category: 'TACOS',
      desc: 'Three slow-braised beef tacos on hand-pressed corn tortillas with consome dip, fresh lime, and cilantro.',
      imgUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      aspectClass: 'aspect-[4/3]',
      imageSlotId: 'signatureDish03',
    },
    {
      id: 'dish-4',
      name: 'Signature Rose Tiramisu',
      category: 'DESSERTS',
      desc: 'Layers of espressoladyfingers, velvety mascarpone cream, rose syrup infusion, dusted with cocoa.',
      imgUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      aspectClass: 'aspect-[3/4]',
      imageSlotId: 'signatureDish04',
    },
  ];

  useEffect(() => {
    // Scroll tilt animation for all cards: start tilted and straighten to 0deg as they enter view, then stop
    const cards = gsap.utils.toArray('.dish-card-scroll');
    cards.forEach((card: any, idx: number) => {
      const startTilt = idx % 2 === 0 ? -6 : 6;

      gsap.fromTo(
        card,
        { rotate: startTilt },
        {
          rotate: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 95%',
            end: 'center 55%',
            scrub: 0.5,
          },
        }
      );
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-[#FBF5EB] text-ciro-dark py-24 px-6 md:px-12 border-b-3 border-ciro-dark"
      id="gallery"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-ciro-olive">
            CULINARY CURATION
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-7xl mt-2 text-ciro-dark leading-none">
            The Good Stuff.
          </h2>
          <span className="font-bristol text-2xl text-ciro-olive block mt-2 -rotate-1">
            Made with love, craft & fresh ingredients ~
          </span>
        </div>
        <p className="font-sans font-medium text-lg text-ciro-espresso max-w-sm">
          A visual journey through our kitchen. Fresh, colorful, and prepared with pure culinary excitement daily.
        </p>
      </div>

      {/* Irregular Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
        {dishes.map((dish, i) => (
          <div
            key={dish.id}
            className={`flex flex-col w-full max-w-lg mx-auto ${i % 2 === 1 ? 'md:translate-y-24' : ''
              }`}
          >
            {/* Clean image container that will tilt on scroll */}
            <div className="dish-card-scroll w-full flex flex-col group cursor-pointer origin-center">

              {/* Image with rounded corners and no frame/shadow */}
              <div className={`w-full ${dish.aspectClass} overflow-hidden rounded-[32px] bg-ciro-dark/5 relative`}>
                <img
                  src={dish.imgUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  id={dish.imageSlotId}
                />
                <span className="absolute top-4 left-4 bg-[#FBF5EB] text-ciro-dark border border-ciro-dark px-3 py-1 rounded-full font-display font-extrabold text-[9px] uppercase tracking-wider shadow-sm">
                  {dish.category}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="mt-5 text-ciro-dark flex flex-col gap-2">
                <h3 className="font-serif font-medium text-xl md:text-2xl leading-tight text-ciro-dark group-hover:text-ciro-olive transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="font-sans font-medium text-xs leading-relaxed text-ciro-espresso/80 border-t border-ciro-dark/10 pt-3">
                  {dish.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Section Bottom Clearance */}
      <div className="h-4 md:h-8" />
    </section>
  );
};

export default SignatureDishes;
