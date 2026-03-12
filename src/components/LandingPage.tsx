import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader, GlassCard, TiltCard, ParallaxSection } from './UI';

const featuredDishes = [
  { id: 1, name: "Truffle Tagliatelle", price: "$28", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800", category: "Pasta" },
  { id: 2, name: "Wagyu Ribeye", price: "$65", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=800", category: "Steak" },
  { id: 3, name: "Lobster Thermidor", price: "$52", image: "https://images.unsplash.com/photo-1553243772-0a913168a296?w=800", category: "Seafood" },
  { id: 4, name: "Burrata Salad", price: "$18", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800", category: "Appetizer" },
];

const reviews = [
  { name: "Julianne Moore", role: "Food Critic", text: "The most authentic Italian experience I've had outside of Tuscany. The truffle pasta is life-changing.", rating: 5 },
  { name: "Marcus Chen", role: "Regular Guest", text: "Exceptional service and an atmosphere that makes you want to stay for hours. Highly recommended.", rating: 5 },
];

export const LandingPage = () => {
  const [activeDish, setActiveDish] = useState(0);

  return (
    <div className="bg-brand-cream">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParallaxSection speed={-0.2}>
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 w-screen h-screen"
          >
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920"
              alt="Hero"
              className="w-full h-full object-cover brightness-[0.3]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </ParallaxSection>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] uppercase tracking-[0.5em] mb-6 bg-brand-orange/5 backdrop-blur-sm">
              Michelin Star Experience
            </span>
            <h1 className="font-serif text-7xl md:text-9xl text-white mb-8 leading-[0.9] tracking-tighter">
              A Symphony of <br />
              <span className="italic text-brand-gold">Flavors</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light tracking-wide">
              Where traditional culinary arts meet modern gastronomic innovation. 
              Experience the finest ingredients curated by Chef Alessandro.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/order" className="px-10 py-5 bg-brand-orange text-white rounded-full font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl shadow-brand-orange/20 flex items-center gap-3 group">
              Order Online <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/reservation" className="px-10 py-5 glass text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3">
              Book a Table <Clock size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 px-8 flex flex-wrap justify-center gap-12 text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
          <div className="flex items-center gap-3"><MapPin size={14} className="text-brand-orange" /> Manhattan, 5th Ave</div>
          <div className="flex items-center gap-3"><Star size={14} className="text-brand-orange" /> 4.9 Google Rating</div>
          <div className="flex items-center gap-3"><Clock size={14} className="text-brand-orange" /> Open 11:00 - 23:00</div>
        </div>
      </section>

      {/* 3D Circular Carousel (Simulated) */}
      <section className="py-32 bg-brand-brown overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeader title="Signature Creations" subtitle="Chef's Selection" centered />
          
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDish}
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateY: 45 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative w-full max-w-2xl aspect-square"
              >
                <TiltCard className="w-full h-full">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 animate-spin-slow" />
                  <img
                    src={featuredDishes[activeDish].image}
                    alt={featuredDishes[activeDish].name}
                    className="w-full h-full object-cover rounded-full border-8 border-brand-brown shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center bg-brand-brown/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-full max-w-sm shadow-2xl" style={{ transform: "translateZ(50px)" }}>
                    <span className="text-brand-gold text-xs uppercase tracking-widest mb-2 block">{featuredDishes[activeDish].category}</span>
                    <h3 className="font-serif text-3xl text-white mb-2">{featuredDishes[activeDish].name}</h3>
                    <p className="text-brand-orange font-bold text-xl">{featuredDishes[activeDish].price}</p>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={() => setActiveDish((prev) => (prev === 0 ? featuredDishes.length - 1 : prev - 1))}
              className="absolute left-4 p-4 rounded-full glass-dark text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setActiveDish((prev) => (prev === featuredDishes.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 p-4 rounded-full glass-dark text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Background Text Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
          GOURMET HAVEN
        </div>
      </section>

      {/* Story Preview */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000"
                alt="Chef"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-orange rounded-full flex flex-col items-center justify-center text-white p-8 text-center shadow-2xl z-20"
            >
              <span className="text-5xl font-serif mb-2">25</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Years of Culinary Excellence</span>
            </motion.div>
          </div>

          <div>
            <SectionHeader title="A Legacy of Taste" subtitle="Our Story" />
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Founded in 1998, Gourmet Haven began as a small family trattoria. Today, it stands as a beacon of fine dining, where every dish tells a story of heritage, passion, and the pursuit of perfection.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-serif text-2xl text-brand-brown mb-2">Organic</h4>
                <p className="text-sm text-stone-500">Sourced from local sustainable farms daily.</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-brand-brown mb-2">Artisan</h4>
                <p className="text-sm text-stone-500">Handcrafted pasta and aged specialty meats.</p>
              </div>
            </div>
            <Link to="/about" className="inline-flex items-center gap-3 text-brand-orange font-bold uppercase tracking-widest text-sm group">
              Read Full Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews & Banner */}
      <section className="py-32 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="What They Say" subtitle="Testimonials" centered />
          
          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, i) => (
              <TiltCard key={i} delay={i * 0.2} className="bg-white">
                <div className="p-12">
                  <div className="flex gap-1 text-brand-orange mb-6">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-xl font-serif italic text-stone-700 mb-8 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-stone-200" />
                    <div>
                      <h5 className="font-bold text-brand-brown">{review.name}</h5>
                      <p className="text-xs text-stone-400 uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto rounded-[3rem] bg-brand-orange p-12 md:p-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="text-white/80 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Limited Time Offer</span>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">Join Our <br /> <span className="italic">Wine Tasting</span> Night</h2>
            <p className="text-white/80 text-lg mb-10">Get 20% off on premium selections every Thursday evening. Reserve your spot now.</p>
            <Link to="/specials" className="px-10 py-5 bg-white text-brand-orange rounded-full font-bold uppercase tracking-widest hover:bg-stone-100 transition-all shadow-xl">
              Claim Offer
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
