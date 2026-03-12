import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader, GlassCard } from './UI';
import { 
  History, 
  ChefHat, 
  Users, 
  Calendar, 
  Music, 
  Utensils, 
  Star, 
  ChevronDown, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// --- ABOUT PAGE ---
export const AboutPage = () => (
  <div className="pt-32 pb-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeader title="Our Culinary Journey" subtitle="The Story of Gourmet Haven" centered />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
          <h3 className="font-serif text-4xl text-brand-brown mb-6 italic">Crafting Memories Since 1998</h3>
          <p className="text-stone-600 leading-relaxed mb-6">
            What started as a modest family kitchen in the heart of Manhattan has evolved into a sanctuary for food lovers. Our journey has been one of relentless passion, sourcing the finest ingredients from local artisans and blending them with time-honored techniques.
          </p>
          <div className="space-y-4">
            {[
              { year: "1998", event: "First location opened in Greenwich Village" },
              { year: "2005", event: "Awarded first Michelin Star" },
              { year: "2015", event: "Expanded to our current flagship location" },
              { year: "2023", event: "Named 'Restaurant of the Year' by Culinary Arts" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="font-serif text-brand-orange font-bold">{item.year}</span>
                <span className="text-stone-500 text-sm">{item.event}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1550966842-2849a220276c?w=600" className="rounded-3xl aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" className="rounded-3xl aspect-[4/5] object-cover mt-12" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="bg-brand-brown rounded-[4rem] p-16 md:p-24 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <ChefHat size={48} className="text-brand-orange mx-auto mb-8" />
          <h3 className="font-serif text-5xl mb-8 italic text-brand-gold">Meet Chef Alessandro</h3>
          <p className="text-white/60 text-lg leading-relaxed mb-12">
            "Cooking is not just about recipes; it's about the soul you pour into the ingredients. At Gourmet Haven, we don't just serve food; we serve emotions on a plate."
          </p>
          <div className="h-px w-24 bg-brand-orange mx-auto mb-8" />
          <p className="font-bold uppercase tracking-widest text-xs">Executive Chef & Founder</p>
        </div>
      </div>
    </div>
  </div>
);

// --- GALLERY PAGE ---
const galleryCategories = [
  { id: 'all', label: 'All Collection' },
  { id: 'drinks', label: 'Signature Drinks' },
  { id: 'desserts', label: 'Fine Desserts' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'ambiance', label: 'Ambiance' },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", category: 'drinks', title: 'Midnight Martini' },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800", category: 'mains', title: 'Truffle Tagliatelle' },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", category: 'ambiance', title: 'The Grand Hall' },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800", category: 'mains', title: 'Wagyu Perfection' },
  { src: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=800", category: 'desserts', title: 'Gold Leaf Soufflé' },
  { src: "https://images.unsplash.com/photo-1553243772-0a913168a296?w=800", category: 'drinks', title: 'Vintage Negroni' },
  { src: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800", category: 'desserts', title: 'Berry Panna Cotta' },
  { src: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=800", category: 'ambiance', title: 'Private Terrace' },
  { src: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800", category: 'drinks', title: 'Elderflower Spritz' },
];

const GalleryCarousel = ({ images }: { images: typeof galleryImages }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Automatic rotation every 3 seconds
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Reset index when images change (category change)
  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden perspective-1000">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          {images.map((img, i) => {
            const offset = (i - index + images.length) % images.length;
            const normalizedOffset = offset > images.length / 2 ? offset - images.length : offset;
            
            if (Math.abs(normalizedOffset) > 2) return null;

            return (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.5, x: normalizedOffset * 300, rotateY: normalizedOffset * -45, z: -200 }}
                animate={{
                  opacity: 1 - Math.abs(normalizedOffset) * 0.3,
                  scale: 1 - Math.abs(normalizedOffset) * 0.2,
                  x: normalizedOffset * 250,
                  rotateY: normalizedOffset * -35,
                  z: Math.abs(normalizedOffset) * -150,
                  zIndex: 10 - Math.abs(normalizedOffset),
                }}
                exit={{ opacity: 0, scale: 0.5, x: normalizedOffset * 300, rotateY: normalizedOffset * -45, z: -200 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-[280px] md:w-[450px] aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <img src={img.src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-1">{img.category}</span>
                  <p className="text-white font-serif text-2xl italic">{img.title}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <button 
          onClick={prev}
          className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-orange transition-all"
        >
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <button 
          onClick={next}
          className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-brand-orange transition-all"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Visual Feast" subtitle="3D Gallery Experience" centered />
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.id 
                  ? 'bg-brand-brown text-white shadow-xl shadow-brand-brown/20' 
                  : 'bg-white text-stone-400 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mb-24">
          <GalleryCarousel images={filteredImages} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer relative"
              >
                <img 
                  src={img.src} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-serif text-lg italic">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- EVENTS PAGE ---
export const EventsPage = () => (
  <div className="pt-32 pb-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeader title="Unforgettable Nights" subtitle="Upcoming Events" centered />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Jazz & Wine Night", date: "Oct 24, 2025", icon: Music, desc: "Live jazz performance paired with our finest Italian vintage selections." },
          { title: "Chef's Table Experience", date: "Nov 02, 2025", icon: ChefHat, desc: "An intimate 7-course tasting menu curated live by Chef Alessandro." },
          { title: "Mediterranean Festival", date: "Nov 15, 2025", icon: Utensils, desc: "A weekend celebration of coastal flavors and traditional music." },
        ].map((event, i) => (
          <GlassCard key={i} className="bg-white p-8" delay={i * 0.1}>
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
              <event.icon size={32} />
            </div>
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-2 block">{event.date}</span>
            <h4 className="font-serif text-2xl text-brand-brown mb-4">{event.title}</h4>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">{event.desc}</p>
            <button className="text-brand-brown font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-brand-orange transition-colors">
              Book Spot <ArrowRight size={14} />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

// --- FAQ PAGE ---
export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Do you have vegan options?", a: "Yes, we have a dedicated vegan menu featuring plant-based Italian classics." },
    { q: "What is your reservation policy?", a: "We recommend booking at least 48 hours in advance for weekends." },
    { q: "Do you host private events?", a: "Absolutely. We have a private dining room that can accommodate up to 40 guests." },
    { q: "Is there a dress code?", a: "We maintain a smart casual dress code to ensure a premium atmosphere for all guests." },
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader title="Common Questions" subtitle="FAQ" centered />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-brand-brown">{faq.q}</span>
                <ChevronDown className={`text-stone-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
export const ContactPage = () => (
  <div className="pt-32 pb-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeader title="Get in Touch" subtitle="Contact Us" centered />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="bg-white p-8">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange"><MapPin size={20} /></div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Our Location</h5>
                  <p className="text-xs text-stone-500">742 5th Ave, New York, NY 10019</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange"><Phone size={20} /></div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Phone Number</h5>
                  <p className="text-xs text-stone-500">+1 (212) 555-0198</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange"><Mail size={20} /></div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Email Address</h5>
                  <p className="text-xs text-stone-500">hello@gourmethaven.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange"><Clock size={20} /></div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Opening Hours</h5>
                  <p className="text-xs text-stone-500">Mon - Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div className="lg:col-span-2">
          <GlassCard className="bg-white p-12">
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                <input type="email" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button className="md:col-span-2 py-5 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all shadow-xl shadow-stone-900/10">
                Send Message
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
);

// --- RESERVATIONS PAGE ---
export const ReservationsPage = () => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader title="Book Your Table" subtitle="Reservations" centered />
        
        <GlassCard className="bg-white p-12">
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-100 -translate-y-1/2 z-0" />
            {[1, 2, 3].map(i => (
              <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= i ? 'bg-brand-orange text-white' : 'bg-stone-100 text-stone-400'
              }`}>
                {i}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date</label>
                    <input type="date" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Time</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100">
                      <option>18:00</option>
                      <option>19:00</option>
                      <option>20:00</option>
                      <option>21:00</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Guests</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100">
                      <option>2 People</option>
                      <option>4 People</option>
                      <option>6 People</option>
                      <option>8+ People</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all">
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100" placeholder="+1 (212) 000-0000" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-5 bg-stone-100 text-stone-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-200 transition-all">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all">
                    Confirm Reservation
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-serif text-4xl text-brand-brown mb-4 italic">Reservation Confirmed!</h3>
                <p className="text-stone-500 mb-12">We've sent a confirmation email with all the details. We look forward to seeing you!</p>
                <button onClick={() => setStep(1)} className="px-10 py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all">
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
};
