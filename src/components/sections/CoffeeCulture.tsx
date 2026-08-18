import React from 'react';

export const CoffeeCulture: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-[#829375] text-ciro-cream py-24 flex flex-col justify-between overflow-hidden border-b-3 border-ciro-dark"
      id="coffee"
    >
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-saffron">
            THE DAILY ROAST
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-4 leading-none tracking-tight">
            COFFEE.
            <br />
            CONVERSATIONS.
            <br />
            REPEAT.
          </h2>
        </div>
        <p className="font-sans font-bold text-lg max-w-sm text-ciro-cream/70 leading-relaxed uppercase">
          SLOW MORNINGS, LONG DISCUSSIONS, AND BARISTA CRAFTS IN JAIPUR.
        </p>
      </div>

      {/* Center Layout: Graphic Slots */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 my-16 relative z-10">
        {/* Left Card */}
        <div className="flex flex-col gap-4 text-ciro-cream max-w-md w-full rotate-[-1deg] hover:rotate-0 transition-transform duration-300 group cursor-pointer">
          <div className="w-full aspect-video overflow-hidden rounded-[32px] bg-ciro-dark/10">
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80"
              alt="Artisan Brew"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              id="coffee02"
            />
          </div>
          <div className="px-2">
            <h4 className="font-serif font-medium text-xl text-ciro-cream group-hover:text-ciro-saffron transition-colors duration-300">
              The Espresso Extraction
            </h4>
            <p className="font-sans font-medium text-xs text-ciro-cream/70 mt-2 border-t border-ciro-cream/10 pt-2">
              Single-origin medium roasts loaded with complex cocoa tones.
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex flex-col gap-4 text-ciro-cream max-w-md w-full justify-self-end rotate-[1deg] hover:rotate-0 transition-transform duration-300 group cursor-pointer">
          <div className="w-full aspect-video overflow-hidden rounded-[32px] bg-ciro-dark/10">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80"
              alt="Velvety Latte Art"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              id="coffee03"
            />
          </div>
          <div className="px-2">
            <h4 className="font-serif font-medium text-xl text-ciro-cream group-hover:text-ciro-saffron transition-colors duration-300">
              Velvety Latte Art
            </h4>
            <p className="font-sans font-medium text-xs text-ciro-cream/70 mt-2 border-t border-ciro-cream/10 pt-2">
              Cappuccinos and lattes micro-foamed to smooth, creamy textures.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Coffee Strip */}
      <div className="relative w-full bg-ciro-lime text-ciro-dark py-4 border-t-3 border-b-3 border-ciro-dark select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee-loop">
          <div className="flex gap-16 font-display font-black text-xs uppercase tracking-widest px-8">
            <span>Come for the coffee. Stay for everything else •</span>
            <span>Come for the coffee. Stay for everything else •</span>
            <span>Come for the coffee. Stay for everything else •</span>
            <span>Come for the coffee. Stay for everything else •</span>
            <span>Come for the coffee. Stay for everything else •</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeCulture;
