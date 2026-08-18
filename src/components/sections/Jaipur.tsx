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
              className="bg-ciro-olive text-ciro-light border-2 border-ciro-dark px-6 py-3 font-display font-extrabold text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-cream transition-all duration-150"
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
              className="bg-ciro-olive text-ciro-light border-2 border-ciro-dark px-6 py-3 font-display font-extrabold text-xs uppercase tracking-widest hover:bg-ciro-dark hover:text-ciro-cream transition-all duration-150"
              data-cursor="book"
            >
              BOOK TABLE
            </a>
          </div>
        </div>

        {/* Right Side: Live Interactive Map Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[420px] aspect-[4/5] bg-ciro-cream border-3 border-ciro-dark p-2 shadow-retro-lg rounded-[32px] overflow-hidden relative select-none">
            {/* Live Google Map embed */}
            <div className="w-full h-full rounded-[24px] overflow-hidden border-2 border-ciro-dark relative bg-ciro-dark/5">
              <iframe
                src="https://maps.google.com/maps?q=Ciro%20Co,%20Malviya%20Nagar,%20Jaipur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Jaipur;
