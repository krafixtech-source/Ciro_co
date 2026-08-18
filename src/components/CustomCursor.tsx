import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const checkDevice = () => {
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(touchDevice);
      setIsVisible(!touchDevice);
    };

    checkDevice();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Watch hover types on elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]');
      if (cursorAttr) {
        setHoverType(cursorAttr.getAttribute('data-cursor'));
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Handle prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  if (isMobile || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] flex items-center justify-center font-display font-extrabold text-[10px] tracking-widest text-ciro-dark uppercase transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      } ${
        hoverType === 'view'
          ? 'w-16 h-16 bg-ciro-saffron border-2 border-ciro-dark'
          : hoverType === 'book'
          ? 'w-16 h-16 bg-ciro-lime border-2 border-ciro-dark'
          : 'w-4 h-4 bg-ciro-red border-none mix-blend-difference'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {hoverType === 'view' && 'VIEW'}
      {hoverType === 'book' && 'BOOK'}
    </div>
  );
};
export default CustomCursor;
