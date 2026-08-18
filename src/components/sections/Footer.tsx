import React from 'react';
import logoImg from '../../assets/ciro-co.webp';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-ciro-cream text-ciro-dark py-20 px-6 md:px-12 border-t border-ciro-dark/10">
      <div className="absolute inset-0 bg-grid-dots opacity-[0.02] pointer-events-none" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Col 1: Logo & Tagline */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <img 
              src={logoImg} 
              alt="CIRO CO" 
              className="h-10 w-auto object-contain" 
            />
            <span className="font-sans font-bold text-xs tracking-[0.25em] text-ciro-olive uppercase mt-3 block">
              CUCINA / CULTURE / COFFEE
            </span>
          </div>

          <div className="mt-8 font-sans font-semibold text-xs text-ciro-dark/40 tracking-wider">
            &copy; 2026 CIRO CO. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-display font-black text-xs uppercase tracking-widest text-ciro-olive border-b border-ciro-dark/10 pb-2">
            NAVIGATION
          </h4>
          <div className="flex flex-col gap-2 font-display font-extrabold text-sm uppercase tracking-wider">
            <a href="#menu" className="hover:text-ciro-olive transition-colors duration-300">Menu</a>
            <a href="#about" className="hover:text-ciro-olive transition-colors duration-300">About</a>
            <a href="#philosophy" className="hover:text-ciro-olive transition-colors duration-300">Experience</a>
            <a href="#reserve" className="hover:text-ciro-olive transition-colors duration-300">Reserve</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ciro-olive transition-colors duration-300">Instagram</a>
          </div>
        </div>

        {/* Col 3: Address & Info */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-display font-black text-xs uppercase tracking-widest text-ciro-olive border-b border-ciro-dark/10 pb-2">
            ADDRESS & HOURS
          </h4>
          <div className="font-sans font-semibold text-xs leading-relaxed text-ciro-dark/80 flex flex-col gap-3">
            <p>
              C11, Jawahar Lal Nehru Marg,
              <br />
              Lal Bahadur Nagar, Mata Colony,
              <br />
              Jaipur, Rajasthan 302018
            </p>
            <p>
              Phone: <a href="tel:+919982199988" className="text-ciro-olive hover:underline">+91 99821 99988</a>
            </p>
            <p className="border border-dashed border-ciro-olive/30 p-3 bg-ciro-olive/5 text-ciro-olive">
              OPENING: 11:00 AM ONWARDS DAILY
            </p>
          </div>
        </div>

      </div>

      {/* Massive Sign-off */}
      <div className="max-w-7xl mx-auto w-full mt-20 border-t border-ciro-dark/5 pt-12 relative z-10 select-none text-center">
        <h1 className="font-serif italic font-extrabold text-[12vw] leading-none uppercase tracking-tighter text-ciro-dark/[0.04] hover:text-ciro-olive transition-colors duration-1000">
          SEE YOU AT CIRO.
        </h1>
      </div>
    </footer>
  );
};
export default Footer;
