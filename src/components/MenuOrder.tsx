import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShoppingBag, Star, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { SectionHeader, GlassCard, TiltCard } from './UI';

const categories = ["All", "Pizza", "Burgers", "Pasta", "Drinks", "Desserts"];

const menuItems = [
  { id: 1, name: "Margherita Royale", price: 22, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=800", rating: 4.8, description: "San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil." },
  { id: 2, name: "Truffle Burger", price: 26, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", rating: 4.9, description: "Dry-aged wagyu beef, black truffle aioli, caramelized onions, gruyère cheese." },
  { id: 3, name: "Carbonara Autentica", price: 24, category: "Pasta", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800", rating: 4.7, description: "Pecorino Romano, guanciale, egg yolk, black pepper, handmade spaghetti." },
  { id: 4, name: "Old Fashioned", price: 16, category: "Drinks", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", rating: 4.9, description: "Small batch bourbon, angostura bitters, orange peel, luxardo cherry." },
  { id: 5, name: "Tiramisu Classico", price: 14, category: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800", rating: 4.8, description: "Mascarpone cream, espresso-soaked ladyfingers, premium cocoa powder." },
  { id: 6, name: "Wild Mushroom Risotto", price: 28, category: "Pasta", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800", rating: 4.6, description: "Arborio rice, porcini mushrooms, parmesan crisp, truffle oil drizzle." },
];

export const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredItems = menuItems.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Our Culinary Menu" subtitle="Exquisite Selection" centered />

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                    : 'bg-white text-stone-500 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full bg-white border border-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <TiltCard
                key={item.id}
                delay={i * 0.05}
                className="group relative"
              >
                <div 
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      animate={{ scale: hoveredId === item.id ? 1.1 : 1 }}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <Star size={10} fill="currentColor" className="text-brand-orange" /> {item.rating}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white/80 text-xs leading-relaxed italic" style={{ transform: "translateZ(30px)" }}>"{item.description}"</p>
                    </div>
                  </div>
                  <div className="p-8" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                        <h3 className="font-serif text-2xl text-brand-brown">{item.name}</h3>
                      </div>
                      <span className="text-xl font-bold text-brand-brown">${item.price}</span>
                    </div>
                    <button className="w-full py-4 rounded-2xl bg-stone-50 text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                      Quick Order <ShoppingBag size={16} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const OrderPage = () => {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  const total = cart.reduce((acc, item) => {
    const menuItem = menuItems.find(m => m.id === item.id);
    return acc + (menuItem?.price || 0) * item.quantity;
  }, 0);

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item);
      return [...prev, {id, quantity: 1}];
    });
  };

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen flex flex-col lg:flex-row gap-8 px-4 max-w-7xl mx-auto">
      {/* Food Selection */}
      <div className="flex-1">
        <SectionHeader title="Order Online" subtitle="Fast & Fresh" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <GlassCard key={item.id} className="bg-white flex gap-4 p-4">
              <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <h4 className="font-serif text-xl text-brand-brown">{item.name}</h4>
                <p className="text-brand-orange font-bold mb-2">${item.price}</p>
                <button 
                  onClick={() => addToCart(item.id)}
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-96">
        <div className="sticky top-32">
          <GlassCard className="bg-white p-8">
            <h3 className="font-serif text-3xl text-brand-brown mb-8 flex items-center gap-3">
              Your Cart <ShoppingBag className="text-brand-orange" />
            </h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-stone-400 text-center py-12 italic">Your cart is empty</p>
              ) : (
                cart.map(item => {
                  const menuItem = menuItems.find(m => m.id === item.id);
                  return (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-sm text-brand-brown">{menuItem?.name}</h5>
                        <p className="text-xs text-stone-400">${menuItem?.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                        <button className="p-1 hover:text-brand-orange"><Minus size={14} /></button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button className="p-1 hover:text-brand-orange"><Plus size={14} /></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-stone-100 pt-6 space-y-4">
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-brand-brown font-bold text-xl pt-2">
                <span>Total</span>
                <span>${(total + (cart.length > 0 ? 5 : 0)).toFixed(2)}</span>
              </div>
              
              <button 
                disabled={cart.length === 0}
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-xl shadow-stone-900/10"
              >
                Checkout Now
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
