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
      bgColorClass: 'bg-ciro-olive',
      textColorClass: 'text-ciro-cream',
      buttonActiveColor: 'bg-ciro-lime text-ciro-dark',
      imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'italianFood03',
      items: [
        { name: 'Truffle Fettuccine Wild Mushroom', price: '₹495', desc: 'Fresh hand-rolled pasta, white truffle butter, forest mushroom, aged parmesan.', tag: 'Chef Special' },
        { name: 'Pesto Alla Genovese Gnocchi', price: '₹425', desc: 'Soft potato gnocchi, fragrant basil pesto, cherry tomatoes, toasted pine nuts, fresh burrata.' },
        { name: 'Spicy Arrabbiata Penne', price: '₹395', desc: 'Penne pasta tossed in a fiery San Marzano tomato sauce, fresh garlic, bird chili, and parsley.', tag: 'Spicy' }
      ]
    },
    {
      id: 'pizza',
      label: 'PIZZA',
      bgColorClass: 'bg-ciro-espresso',
      textColorClass: 'text-ciro-cream',
      buttonActiveColor: 'bg-ciro-cream text-ciro-dark',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'italianFood04',
      items: [
        { name: 'Margherita Verace Sourdough', price: '₹445', desc: '48-hour fermented crust, San Marzano tomatoes, fresh mozzarella, extra virgin olive oil, basil.', tag: 'Classic' },
        { name: 'Burrata & Parma Sourdough Pizza', price: '₹545', desc: 'Creamy burrata ball, parma ham, organic wild arugula, olive oil drizzle.' },
        { name: 'Diavola Spicy Pepperoni', price: '₹495', desc: 'Fiery Italian pepperoni salami, spicy spreadable nduja, jalapeño slices.', tag: 'Hot' }
      ]
    },
    {
      id: 'mexican',
      label: 'MEXICAN',
      bgColorClass: 'bg-ciro-orange',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-ciro-dark text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'mexicanFood03',
      items: [
        { name: 'Chipotle Chicken Soft Shell Tacos', price: '₹395', desc: 'Three corn tortillas, pulled chipotle chicken, house salsa, avocado crema, pickled onions.', tag: 'Popular' },
        { name: 'Three-Cheese Loaded Quesadillas', price: '₹375', desc: 'Flour tortilla stuffed with mozzarella, Monterey Jack, cheddar, sour cream, house guac.' },
        { name: 'Guac & Chips Platter', price: '₹295', desc: 'Fresh hand-mashed avocado, sea salt, lime, fresh tortilla chips cooked in-house.', tag: 'Fresh' }
      ]
    },
    {
      id: 'smallplates',
      label: 'SMALL PLATES',
      bgColorClass: 'bg-ciro-saffron',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-ciro-dark text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'signatureDish05',
      items: [
        { name: 'Truffle Parmesan Hand-Cut Fries', price: '₹245', desc: 'Double-cooked potato wedges, truffle oil spray, grated parmesan, fresh parsley.' },
        { name: 'Charred Corn Street Nachos', price: '₹325', desc: 'House tortilla chips, charred sweet corn, spicy jalapeño nacho cheese, black beans, pico.' },
        { name: 'Garlic Butter Focaccia Slabs', price: '₹225', desc: 'In-house baked fluffy focaccia, roasted garlic butter, rosemary leaves.', tag: 'Baked Daily' }
      ]
    },
    {
      id: 'coffee',
      label: 'COFFEE',
      bgColorClass: 'bg-ciro-cream',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-ciro-olive text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'coffee02',
      items: [
        { name: 'CIROCO Velvet Flat White', price: '₹225', desc: 'Velvety micro-foamed milk folded into single-origin medium roast espresso.', tag: 'Barista Spec' },
        { name: 'Iced Pour-Over V60', price: '₹195', desc: 'Slow-brewed specialty single-origin roast highlighting clean, crisp acidity.' },
        { name: 'Spiced Saffron Espresso Latte', price: '₹245', desc: 'Double shot espresso combined with milk, organic honey, and local saffron strands.' }
      ]
    },
    {
      id: 'dessert',
      label: 'DESSERT',
      bgColorClass: 'bg-ciro-lime',
      textColorClass: 'text-ciro-dark',
      buttonActiveColor: 'bg-ciro-dark text-ciro-cream',
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      imageSlotId: 'signatureDish06',
      items: [
        { name: 'Jaipur Rose & Berry Tart', price: '₹275', desc: 'Sweet pastry shell, rose water cream, wild strawberries, glazed organic berries.', tag: 'Voted Best' },
        { name: 'Classic Espresso Tiramisu', price: '₹295', desc: 'Whipped mascarpone layers, espresso ladyfingers, rich organic cocoa powder.' },
        { name: 'Burnt Butter Cinnamon Roll', price: '₹185', desc: 'Flaky rolled sourdough bun, cinnamon sugar glaze, burnt butter icing.' }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>('pasta');
  const currentCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section
      className={`relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-between border-b-3 border-ciro-dark transition-colors duration-700 ease-in-out ${currentCategory.bgColorClass} ${currentCategory.textColorClass}`}
      id="menu"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

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
                className={`flex-shrink-0 text-left px-6 py-4 font-display font-black text-xs uppercase tracking-widest border-2 border-ciro-dark shadow-retro transition-all duration-300 ${
                  isActive ? cat.buttonActiveColor : 'bg-ciro-cream text-ciro-dark'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Center column: Static Image representation */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-[280px] aspect-[4/5] bg-ciro-cream border-3 border-ciro-dark shadow-retro-lg p-2 rotate-[2deg] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 2 }}
                exit={{ opacity: 0, rotate: 5 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full border border-ciro-dark overflow-hidden bg-ciro-dark/10"
              >
                <img
                  src={currentCategory.imageUrl}
                  alt={currentCategory.label}
                  className="w-full h-full object-cover"
                  id={currentCategory.imageSlotId}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right column: Menu Items list */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              {currentCategory.items.map((item, idx) => (
                <div key={idx} className="border-b border-current pb-4 flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif italic font-extrabold text-xl">
                      {item.name}
                    </h3>
                  </div>
                  <p className="font-sans font-medium text-xs opacity-90 leading-relaxed">
                    {item.desc}
                  </p>
                  {item.tag && (
                    <div className="mt-2 flex">
                      <span className="bg-ciro-olive text-ciro-light border border-ciro-dark font-display font-extrabold text-[8px] tracking-widest uppercase px-2 py-0.5">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <a
            href="#full-menu"
            className="mt-8 border-3 border-ciro-dark bg-ciro-dark text-ciro-cream text-center font-display font-black text-xs uppercase tracking-widest py-4 shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
          >
            VIEW FULL MENU →
          </a>
        </div>

      </div>
    </section>
  );
};
export default MenuPreview;
