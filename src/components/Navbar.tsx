import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Order', path: '/order' },
  { name: 'Reservations', path: '/reservation' },
  { 
    name: 'Explore', 
    path: '#',
    submenu: [
      { name: 'About Us', path: '/about' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Events', path: '/events' },
      { name: 'Specials', path: '/specials' },
      { name: 'Reviews', path: '/reviews' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
    ]
  },
];

export const Navbar = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = scrolled || location.pathname !== '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4 bg-brand-brown/90 backdrop-blur-xl shadow-2xl' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white font-serif text-2xl font-bold shadow-lg shadow-brand-orange/20 group-hover:rotate-12 transition-transform">
              GH
            </div>
            <div className="hidden sm:block">
              <span className={`block font-serif text-xl font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-white'}`}>Gourmet Haven</span>
              <span className="block text-[8px] uppercase tracking-[0.4em] text-brand-orange font-bold">Fine Dining</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.submenu ? (
                  <button 
                    onMouseEnter={() => setActiveSubmenu(true)}
                    className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-white/70 hover:text-brand-orange' : 'text-white/70 hover:text-white'}`}
                  >
                    {link.name} <ChevronDown size={12} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                      location.pathname === link.path ? 'text-brand-orange' : isDark ? 'text-white/70 hover:text-brand-orange' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
                
                {link.submenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-brand-brown border border-white/10 rounded-[2rem] p-6 shadow-2xl w-56 backdrop-blur-2xl">
                      {link.submenu.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block py-3 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-brand-orange transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/order" className={`hidden sm:flex items-center gap-2 text-white/70 hover:text-brand-orange transition-colors`}>
              <ShoppingBag size={20} />
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={`/${user.role}/dashboard`} className="px-6 py-3 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-brand-orange/20 hover:bg-orange-600 transition-all">
                  Dashboard
                </Link>
                <button onClick={onLogout} className="text-white/40 hover:text-rose-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-8 py-3 glass text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all">
                Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 bg-brand-brown pt-32 px-8"
          >
            <div className="space-y-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <div className="space-y-4">
                      <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest">{link.name}</p>
                      {link.submenu.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="block text-2xl font-serif text-white/80"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-4xl font-serif text-white"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
