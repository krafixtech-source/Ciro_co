import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import FloatingNav from './components/FloatingNav';
import Hero from './components/sections/Hero';
import BrandIntro from './components/sections/BrandIntro';
import PizzaShowcaseHero from './components/sections/PizzaShowcaseHero';
import ItalianMexican from './components/sections/ItalianMexican';
import CustardUbeEditorial from './components/sections/CustardUbeEditorial';
import WideVideoSection from './components/sections/WideVideoSection';
import SignatureDishes from './components/sections/SignatureDishes';
import CinematicDrinks from './components/sections/CinematicDrinks';
import MenuPreview from './components/sections/MenuPreview';
import FoodCinema from './components/sections/FoodCinema';
import CoffeeCulture from './components/sections/CoffeeCulture';
import TheSpace from './components/sections/TheSpace';
import Jaipur from './components/sections/Jaipur';
import Reviews from './components/sections/Reviews';
import SocialInstagram from './components/sections/SocialInstagram';
import ReservationCTA from './components/sections/ReservationCTA';
import Footer from './components/sections/Footer';
import FullMenu from './components/sections/FullMenu';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // 1. If entering the menu page, kill homepage ScrollTriggers to clean up pins
      if (hash === '#full-menu') {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        ScrollTrigger.clearScrollMemory();
      }

      // 2. Change routing state
      setCurrentHash(hash);

      // 3. Reset scroll only for top level routes (#full-menu or home)
      if (hash === '#full-menu' || hash === '' || hash === '#') {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }

      // 4. Resize Lenis after a short delay to account for DOM changes
      if (lenisRef.current) {
        setTimeout(() => {
          lenisRef.current?.resize();
        }, 100);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // 1. Initialize Lenis Momentum Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Scroll trigger update connection to Lenis
    lenis.on('scroll', () => {
      // Connect custom trigger refresh if needed
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Whenever currentHash points to a home anchor (not full-menu), wait for mount and scroll smoothly
    if (currentHash && currentHash !== '#full-menu') {
      const targetId = currentHash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150); // wait for React render/mount cycle

      return () => clearTimeout(timer);
    }
  }, [currentHash]);

  const isMenuPage = currentHash === '#full-menu';

  return (
    <div className="relative min-h-screen bg-ciro-cream font-sans overflow-x-hidden selection-bg">
      {/* 1. Cinematic Film Grain Backdrop Overlay */}
      <div className="film-grain" />

      {/* 2. Global Tactical Mouse Cursor */}
      <CustomCursor />

      {/* 3. Floating Compact Header */}
      <FloatingNav />

      {/* 4. Core Storytelling Sections Sequence */}
      <main>
        {isMenuPage ? (
          <FullMenu />
        ) : (
          <>
            {/* ARRIVE */}
            <Hero />

            {/* DISCOVER */}
            <BrandIntro />

            {/* ROTATIONAL PIZZA SHOWCASE HERO CAROUSEL */}
            <PizzaShowcaseHero />

            {/* COLLISION - Split Screen converging */}
            <ItalianMexican />

            {/* CUSTURD UBE - Luxury kinetic editorial drink section */}
            <CustardUbeEditorial />

            {/* WIDE CINEMATIC VIDEO */}
            <WideVideoSection />

            {/* FOOD - Signature showcases & Menu previews */}
            <SignatureDishes />

            {/* CINEMATIC DRINKS SHOWCASE */}
            <CinematicDrinks />

            <MenuPreview />

            {/* FOOD CINEMA - toss, stretch, blend */}
            <FoodCinema />

            {/* COFFEE - beans, repeat, strip */}
            <CoffeeCulture />

            {/* SPACE - interiors, evening lights */}
            <TheSpace />

            {/* JAIPUR - coordinates, addresses, vector map */}
            <Jaipur />

            {/* PEOPLE - reviews quote scroller & social masonry */}
            <Reviews />
            <SocialInstagram />

            {/* RESERVE - red/orange form */}
            <ReservationCTA />
          </>
        )}
      </main>

      {/* 5. Editorial Footer sign-off */}
      <Footer />
    </div>
  );
};
export default App;
