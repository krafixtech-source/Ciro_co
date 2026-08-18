import React from 'react';

export const Jaipur: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-ciro-cream text-ciro-dark py-24 px-6 md:px-12 flex flex-col justify-center border-b-3 border-ciro-dark"
      id="jaipur"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-5 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Address Details & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-olive">
            FIND OUR CAFE
          </span>
          
          <h2 className="font-serif italic font-extrabold text-5xl md:text-7xl uppercase mt-4 leading-tight tracking-tight">
            JAIPUR,
            <br />
            WE SAVED YOU
            <br />
            A SEAT.
          </h2>

          <div className="mt-8 border-l-3 border-ciro-olive pl-6 flex flex-col gap-2 font-display">
            <h4 className="font-black text-xl text-ciro-espresso">CIRO CO</h4>
            <p className="font-sans font-bold text-sm text-ciro-dark/80 max-w-sm leading-relaxed">
              C11, Jawahar Lal Nehru Marg,
              <br />
              Lal Bahadur Nagar, Mata Colony,
              <br />
              Jaipur, Rajasthan 302018
            </p>
            <p className="font-display font-black text-lg text-ciro-olive mt-2">
              Phone: +91 99821 99988
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ciro-olive text-ciro-light border-2 border-ciro-dark px-6 py-3 font-display font-extrabold text-xs uppercase tracking-widest shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
            >
              GET DIRECTIONS
            </a>
            <a
              href="tel:+919982199988"
              className="bg-transparent text-ciro-dark border-2 border-ciro-dark px-6 py-3 font-display font-extrabold text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-cream transition-colors duration-300"
            >
              CALL US
            </a>
            <a
              href="#reserve"
              className="bg-ciro-olive text-ciro-light border-2 border-ciro-dark px-6 py-3 font-display font-extrabold text-xs uppercase tracking-widest shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
              data-cursor="book"
            >
              BOOK TABLE
            </a>
          </div>
        </div>

        {/* Right Side: Stylized Map Inspired Vector Graphic */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[420px] bg-ciro-espresso border-3 border-ciro-dark p-6 shadow-retro-lg text-ciro-cream relative overflow-hidden select-none">
            {/* Dots background overlay */}
            <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />

            {/* Stylized Jaipur Arch outline & layout grid representing a Map */}
            <div className="relative border border-ciro-cream/20 p-8 h-80 flex flex-col justify-between rounded-none bg-ciro-dark">
              {/* Fake grid map elements */}
              <div className="absolute top-4 left-[20%] w-[2px] h-[75%] bg-ciro-saffron/20 border-dashed border-l" />
              <div className="absolute top-[40%] left-4 w-[75%] h-[2px] bg-ciro-lime/20 border-dashed border-t" />

              {/* Archetypal arch vector indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-3 border-ciro-olive/40 bg-transparent flex items-center justify-center rounded-t-full">
                <div className="w-4 h-4 rounded-full bg-ciro-olive animate-ping" />
                <div className="absolute w-3 h-3 rounded-full bg-ciro-olive border border-ciro-dark" />
              </div>

              <div className="text-[10px] font-display font-bold text-ciro-cream/50 tracking-wider flex justify-between">
                <span>N 26.8504°</span>
                <span>E 75.8203°</span>
              </div>

              <div className="text-center font-display font-black text-xs text-ciro-saffron tracking-widest uppercase">
                * CIRO CO JAIPUR *
              </div>

              <div className="text-[10px] font-display font-bold text-ciro-cream/50 text-right tracking-wider">
                MATA COLONY, JLN MARG
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs font-display font-black uppercase tracking-wider text-ciro-saffron">
              <span>CONTEMPORARY JAIPUR</span>
              <span className="text-ciro-olive"><i className="fa-solid fa-map-location-dot"></i> LOCALIZED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Jaipur;
