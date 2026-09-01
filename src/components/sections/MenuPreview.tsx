import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  bgColorClass: string;
  textColorClass: string;
  buttonActiveColor: string;
  imageUrl: string;
  imageSlotId: string;
  items: MenuItem[];
}

export const MenuPreview: React.FC = () => {
  const categories: MenuCategory[] = [
    {
      id: 'pasta',
      label: 'PASTA',
      bgColorClass: 'bg-[#829375]',
      textColorClass: 'text-ciro-cream',
      buttonActiveColor: 'bg-[#FBF5EB] text-ciro-dark',
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'italianFood03',
      items: [
        { name: 'CARAMELLE', price: '₹825', desc: 'Four-cheese stuffed candy-shaped pasta tossed in fresh basil pesto sauce.', tag: 'Handmade' },
        { name: 'SUNFLOWER RAVIOLI', price: '₹825', desc: 'Sundried tomato & cream cheese stuffed ravioli, sage butter emulsion.' },
        { name: 'SPAGHETTI AGLIO E OLIO PEPPERONCINO', price: '₹749', desc: 'Pecorino Romano, sundried tomato, fresh paprika, EVOO, vegan caviar.' }
      ]
    },
    {
      id: 'pizza',
      label: 'PIZZA',
      bgColorClass: 'bg-[#FBF5EB]',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-[#829375] text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'italianFood04',
      items: [
        { name: 'SUN MARGHERITA', price: '₹749', desc: 'Pomodoro sauce, sundried tomatoes, fresh mozzarella, fresh basil, Pecorino Romano, Parmesan.', tag: 'Classic' },
        { name: 'SICILIA', price: '₹825', desc: 'Pomodoro Pelati, mushroom, garlic, pickled onions, sun-dried tomato, chilli oil, fresh mozzarella & basil.' },
        { name: 'TRUFFLE CACIO E PEPE', price: '₹899', desc: 'Mushroom veloute, arugula, truffle oil, crispy mushrooms, fresh black pepper, Pecorino.', tag: 'Gourmet' }
      ]
    },
    {
      id: 'mexican',
      label: 'MEXICAN',
      bgColorClass: 'bg-[#829375]',
      textColorClass: 'text-ciro-cream',
      buttonActiveColor: 'bg-[#FBF5EB] text-ciro-dark',
      imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'mexicanFood03',
      items: [
        { name: 'FUNGO AL PASTOR TACOS', price: '₹589', desc: 'Enoki & Shiitake mushrooms, house Al Pastor sauce, crema, Pico de Gallo.' },
        { name: 'BIRRIA NACHOS', price: '₹545', desc: 'House special Birria, spiced soy mince, cheese sauce, jalapenos & Pico de Gallo.', tag: 'House Special' },
        { name: 'GARDEN FIESTA ENCHILADAS', price: '₹649', desc: 'Garden fresh veggies wrapped in tortillas, rojo red sauce, melted cheese, sour cream, beans & rice.' }
      ]
    },
    {
      id: 'smallplates',
      label: 'SMALL PLATES',
      bgColorClass: 'bg-[#FBF5EB]',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-[#829375] text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'signatureDish05',
      items: [
        { name: 'TRUFFLE PARMESAN FRIES', price: '₹399', desc: 'Double-cooked fries tossed in white truffle oil and grated pecorino.' },
        { name: 'NACHOS GRANDE', price: '₹499', desc: 'Homemade tortilla chips, fresh Guacamole, Salsa, Lime Crema & Queso cheese sauce.', tag: 'Loaded' },
        { name: 'SHIMJI MELT', price: '₹499', desc: 'Mushroom Fricassee, Truffle Oil, Crispy Enoki, Melted Cheese, Sourdough Bread.' }
      ]
    },
    {
      id: 'coffee',
      label: 'COFFEE',
      bgColorClass: 'bg-[#829375]',
      textColorClass: 'text-ciro-cream',
      buttonActiveColor: 'bg-[#FBF5EB] text-ciro-dark',
      imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'coffee02',
      items: [
        { name: 'CIROCO VELVET FLAT WHITE', price: '₹225', desc: 'Velvety micro-foamed milk folded into single-origin medium roast espresso.', tag: 'Barista Spec' },
        { name: 'ICED POUR-OVER V60', price: '₹195', desc: 'Slow-brewed specialty single-origin roast highlighting clean, crisp acidity.' },
        { name: 'SPICED SAFFRON ESPRESSO LATTE', price: '₹245', desc: 'Double shot espresso combined with milk, organic honey, and local saffron strands.' }
      ]
    },
    {
      id: 'dessert',
      label: 'DESSERT',
      bgColorClass: 'bg-[#FBF5EB]',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-[#829375] text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'signatureDish06',
      items: [
        { name: 'CLASSIC TIRAMISU', price: '₹495', desc: 'Chocolate soil crumbles, airy coffee cloud, creamy mascarpone layers.', tag: 'Signature' },
        { name: 'MIDNIGHT LECHES', price: '₹445', desc: 'Coffee Espuma, espresso-soaked sponge cake, dusting of rich cacao.' },
        { name: 'BLUSH BERRY COTTA', price: '₹445', desc: 'Berry coulis, fresh berry salsa served on a silky, cold cream base.' }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>('pasta');
  const currentCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section
      className={`relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-between transition-colors duration-700 ease-in-out ${currentCategory.bgColorClass} ${currentCategory.textColorClass}`}
      id="menu"
    >
      <div className={`absolute inset-0 ${currentCategory.textColorClass === 'text-ciro-cream' ? 'bg-grid-dots-light' : 'bg-grid-dots'} opacity-5 pointer-events-none`} />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full text-center mb-16 relative z-10">
        <span className="font-display font-black text-xs uppercase tracking-[0.25em] border border-current px-3 py-1">
          THE PALATE PREVIEW
        </span>
        <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl mt-4 uppercase leading-none">
          PICK YOUR MOOD.
        </h2>
      </div>

      {/* Grid Layout: Tabs vs Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
        
        {/* Left column: Categories Tabs Panel */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-none sticky top-28">
          {categories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 text-left px-6 py-4 font-display font-black text-xs uppercase tracking-widest border-2 border-ciro-dark rounded-[16px] transition-all duration-300 ${
                  isActive ? cat.buttonActiveColor : 'bg-ciro-cream text-ciro-dark'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Center column: Image Slide */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-[340px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentCategory.id}
                src={currentCategory.imageUrl}
                alt={currentCategory.label}
                id={currentCategory.imageSlotId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full h-80 md:h-[450px] object-cover rounded-[32px] border-3 border-ciro-dark"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right column: Menu Items List */}
        <div className="lg:col-span-4 flex flex-col justify-between min-h-[380px]">
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                {currentCategory.items.map((item, idx) => (
                  <div key={idx} className="border-b border-current/25 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-serif italic font-extrabold text-lg md:text-xl leading-none">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-sans font-bold text-xs opacity-80 leading-relaxed">
                      {item.desc}
                    </p>
                    {item.tag && (
                      <span className="inline-block mt-2 font-display font-black text-[8px] tracking-wider bg-current/10 px-2 py-0.5 uppercase">
                        {item.tag}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <a
            href="#full-menu"
            className={`mt-8 border-3 border-ciro-dark text-center font-display font-black text-xs uppercase tracking-widest py-4 rounded-[16px] transition-all duration-300 ${
              currentCategory.textColorClass === 'text-ciro-cream'
                ? 'bg-[#FEF7EC] text-ciro-dark hover:bg-ciro-dark hover:text-[#FEF7EC]'
                : 'bg-[#829375] text-[#FEF7EC] hover:bg-[#FEF7EC] hover:text-[#829375]'
            }`}
          >
            VIEW FULL MENU →
          </a>
        </div>

      </div>
    </section>
  );
};

export default MenuPreview;
