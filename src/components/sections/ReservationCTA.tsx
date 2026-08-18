import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ReservationCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    vibe: 'both',
    date: '',
    time: '7:30 PM',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    // Set min date input to today
    const dateInput = document.getElementById('res-date') as HTMLInputElement;
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      setFormData(prev => ({ ...prev, date: today }));
    }

    // Parallax floating items
    const items = gsap.utils.toArray('.res-floating-item');
    items.forEach((item: any) => {
      const depth = item.getAttribute('data-depth') || 0.2;
      gsap.to(item, {
        y: -(120 * parseFloat(depth)),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, string> = {
      'res-name': 'name',
      'res-phone': 'phone',
      'res-guests': 'guests',
      'res-vibe': 'vibe',
      'res-date': 'date',
      'res-time': 'time',
    };
    setFormData(prev => ({ ...prev, [fieldMap[id]]: value }));
    // Clear error
    setErrors(prev => ({ ...prev, [fieldMap[id]]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit number.';
    }

    if (!formData.date) {
      newErrors.date = 'Select a date.';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      selected.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Select a future date.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Mock db write
      try {
        const bookings = JSON.parse(localStorage.getItem('ciroco_bookings') || '[]');
        bookings.push({ ...formData, timestamp: new Date() });
        localStorage.setItem('ciroco_bookings', JSON.stringify(bookings));
      } catch (err) {
        console.error(err);
      }
      setBookingSuccess(true);
    }
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setFormData(prev => ({
      ...prev,
      name: '',
      phone: '',
      guests: '2',
      vibe: 'both',
    }));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-ciro-olive text-ciro-light py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b-3 border-ciro-dark"
      id="reserve"
    >
      <div className="absolute inset-0 bg-grid-dots-light opacity-5 pointer-events-none" />

      {/* Parallax Floating Items */}
      <div className="res-floating-item absolute top-[10%] left-[5%] w-10 h-10 text-ciro-light opacity-75 pointer-events-none" data-depth="0.3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(-30 12 12)" />
        </svg>
      </div>

      <div className="res-floating-item absolute bottom-[15%] left-[8%] w-12 h-12 text-ciro-saffron opacity-75 pointer-events-none" data-depth="0.1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C10.5 4 8 4 6 5c-3 1.5-5 5.5-3.5 9s6 7 11 8.5 7.5-.5 9-4.5c2-5-1-10-3-12-1.5-1.5-2.5-3-2.5-4h-5z" />
        </svg>
      </div>

      <div className="res-floating-item absolute top-[15%] right-[10%] w-14 h-14 text-ciro-light opacity-75 pointer-events-none" data-depth="0.4">
        {/* Coffee Cup outline */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        </svg>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
        
        {/* Left Col: Headings */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-display font-black text-xs uppercase tracking-[0.25em] text-ciro-saffron">
            SECURE A SPOT
          </span>
          <h2 className="font-serif italic font-extrabold text-5xl md:text-8xl uppercase mt-4 leading-none tracking-tight">
            YOUR TABLE
            <br />
            IS WAITING.
          </h2>
          <p className="mt-6 font-sans font-bold text-lg md:text-xl text-ciro-light/80 max-w-sm uppercase">
            COME HUNGRY. BRING FRIENDS. ENJOY LIFE.
          </p>
        </div>

        {/* Right Col: Booking Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-ciro-cream text-ciro-dark border-3 border-ciro-dark p-8 shadow-retro-lg relative overflow-hidden">
            
            {!bookingSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <h3 className="font-serif italic font-extrabold text-2xl border-b border-ciro-dark/20 pb-4 mb-2 uppercase">
                  Reserve Table
                </h3>

                <div className="flex flex-col gap-1">
                  <label htmlFor="res-name" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    id="res-name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive"
                    placeholder="Rahul Sharma"
                  />
                  {errors.name && <span className="text-[10px] font-extrabold text-ciro-orange uppercase">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="res-phone" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    id="res-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive"
                    placeholder="10-digit mobile"
                  />
                  {errors.phone && <span className="text-[10px] font-extrabold text-ciro-orange uppercase">{errors.phone}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="res-guests" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Guests</label>
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive cursor-pointer"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8">8 Guests</option>
                      <option value="10">10+ Guests</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="res-vibe" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Vibe</label>
                    <select
                      id="res-vibe"
                      value={formData.vibe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive cursor-pointer"
                    >
                      <option value="both">Both Worlds</option>
                      <option value="italian">Italian focus</option>
                      <option value="mexican">Mexican focus</option>
                      <option value="coffee">Coffee focus</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="res-date" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Date</label>
                    <input
                      type="date"
                      id="res-date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive cursor-pointer"
                    />
                    {errors.date && <span className="text-[10px] font-extrabold text-ciro-orange uppercase">{errors.date}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="res-time" className="font-display font-extrabold text-[10px] uppercase tracking-wider">Time Slot</label>
                    <select
                      id="res-time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-ciro-dark bg-ciro-light font-sans font-bold text-xs uppercase tracking-wider outline-none focus:bg-white focus:border-ciro-olive cursor-pointer"
                    >
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-ciro-dark text-ciro-light font-display font-black text-xs uppercase tracking-widest border-2 border-ciro-dark py-4 shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 cursor-pointer"
                >
                  CONFIRM BOOKING
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-ciro-olive border-2 border-ciro-dark flex items-center justify-center text-ciro-light font-black text-2xl mb-4 animate-scale-up">
                  ✓
                </div>
                <h3 className="font-serif italic font-extrabold text-3xl uppercase text-ciro-dark">
                  Table Booked!
                </h3>
                <p className="font-sans font-semibold text-xs opacity-75 mt-2 max-w-xs">
                  Your reservation for <span className="text-ciro-olive">{formData.guests} {formData.guests === '1' ? 'Guest' : 'Guests'}</span> on <span className="text-ciro-olive">{formData.date}</span> at <span className="text-ciro-olive">{formData.time}</span> is set.
                </p>
                
                <div className="mt-6 border-2 border-ciro-dark bg-ciro-light p-4 text-left text-xs font-display font-bold w-full flex flex-col gap-1">
                  <p>NAME: {formData.name}</p>
                  <p>CONTACT: +91 {formData.phone}</p>
                  <p>VIBE: {formData.vibe.toUpperCase()} FOCUS</p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-8 bg-ciro-dark text-ciro-light font-display font-black text-xs uppercase tracking-widest border-2 border-ciro-dark py-4 px-6 w-full shadow-retro hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 cursor-pointer"
                >
                  BOOK ANOTHER TABLE
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
export default ReservationCTA;
