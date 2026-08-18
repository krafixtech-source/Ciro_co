import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logoImg from '../assets/ciro-co.webp';

export const FloatingNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Menu', href: '#full-menu' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#jaipur' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-ciro-light/95 backdrop-blur-md py-3 border-b border-ciro-dark/10 shadow-sm'
            : 'bg-ciro-light py-5 border-b border-ciro-dark/5'
        }`}
      >
        <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between md:grid md:grid-cols-3">
          {/* Left links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.slice(0, 2).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-display font-bold text-xs tracking-widest text-ciro-olive uppercase hover:text-ciro-red transition-colors duration-300 relative py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Center: Brand Logo Image */}
          <div className="flex md:justify-center items-center">
            <a
              href="#"
              className="flex items-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logoImg}
                alt="CIRO CO"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'h-8' : 'h-10'
                }`}
              />
            </a>
          </div>

          {/* Right links & CTA - Desktop */}
          <div className="hidden md:flex items-center justify-end gap-8">
            <a
              href="#about"
              className="font-display font-bold text-xs tracking-widest text-ciro-olive uppercase hover:text-ciro-red transition-colors duration-300 relative py-1"
            >
              About
            </a>
            <a
              href="#reserve"
              className="bg-ciro-olive text-ciro-light border border-ciro-dark px-5 py-2 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-light transition-all duration-200"
              data-cursor="book"
            >
              Reserve Table
            </a>
          </div>

          {/* Hamburger Menu - Mobile */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-4 z-50 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-full h-[2px] bg-ciro-dark transition-all duration-300 origin-left ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[1px]' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-ciro-dark transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-ciro-dark transition-all duration-300 origin-left ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Full screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-ciro-light z-35 flex flex-col justify-between p-8 pt-24"
          >
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />

            <div className="flex flex-col gap-8 mt-12 relative z-10">
              {menuItems.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif italic font-extrabold text-5xl text-ciro-olive hover:text-ciro-orange transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <a
                href="#reserve"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-ciro-olive text-ciro-light border border-ciro-dark py-4 text-center font-display font-black text-sm uppercase tracking-widest shadow-sm rounded-full active:translate-y-[2px] hover:bg-ciro-dark hover:text-ciro-light transition-all duration-200"
              >
                RESERVE A TABLE
              </a>

              <div className="flex justify-between items-center text-ciro-olive text-xs font-semibold uppercase tracking-wider border-t border-ciro-olive/10 pt-6">
                <span>CIRO CO</span>
                <span>JAIPUR, IN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
