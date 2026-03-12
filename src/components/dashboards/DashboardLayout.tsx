import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Clock, 
  Heart, 
  User, 
  BarChart3, 
  UtensilsCrossed, 
  Calendar, 
  Users, 
  Tag, 
  Star, 
  Settings,
  ChefHat,
  Map,
  Truck,
  History,
  LogOut,
  Menu as MenuIcon,
  X,
  Bell,
  Search,
  LayoutGrid
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'customer' | 'admin' | 'staff' | 'delivery';
  activeTab: string;
  setActiveTab: (id: string) => void;
  onLogout: () => void;
  onRoleChange: (role: 'customer' | 'admin' | 'staff' | 'delivery') => void;
}

const navItemsByRole: Record<string, NavItem[]> = {
  customer: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'tracking', label: 'Track Order', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ],
  admin: [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'hub', label: 'System Hub', icon: LayoutGrid },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  staff: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Kitchen Queue', icon: ChefHat },
    { id: 'kds', label: 'KDS', icon: UtensilsCrossed },
    { id: 'tables', label: 'Table Map', icon: Map },
    { id: 'checkin', label: 'Check-in', icon: Users },
  ],
  delivery: [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'list', label: 'Deliveries', icon: Truck },
    { id: 'map', label: 'Route Map', icon: Map },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Profile', icon: User },
  ],
};

export const DashboardLayout = ({ children, role, activeTab, setActiveTab, onLogout, onRoleChange }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const navItems = navItemsByRole[role] || [];

  const roles: { id: 'customer' | 'admin' | 'staff' | 'delivery'; label: string; icon: any }[] = [
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'admin', label: 'Admin', icon: Settings },
    { id: 'staff', label: 'Staff', icon: ChefHat },
    { id: 'delivery', label: 'Delivery', icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-brand-brown text-white fixed h-full z-50 flex flex-col shadow-2xl"
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.h1 
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif text-2xl text-brand-gold italic"
              >
                Gourmet Haven
              </motion.h1>
            ) : (
              <motion.div 
                key="logo-short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center font-serif text-xl italic"
              >
                G
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-white'} />
              {isSidebarOpen && (
                <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="relative">
            <button 
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-brand-gold hover:bg-brand-gold/10 transition-all border border-brand-gold/20 ${!isSidebarOpen ? 'justify-center' : ''}`}
              title="Switch Role"
            >
              <LayoutDashboard size={20} />
              {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest flex-1 text-left">Switch Role</span>}
            </button>

            <AnimatePresence>
              {showRoleSwitcher && (
                <motion.div 
                  initial={{ opacity: 0, x: isSidebarOpen ? 0 : 20, y: isSidebarOpen ? 10 : 0 }}
                  animate={{ opacity: 1, x: isSidebarOpen ? 0 : 10, y: 0 }}
                  exit={{ opacity: 0, x: isSidebarOpen ? 0 : 20, y: isSidebarOpen ? 10 : 0 }}
                  className={`absolute mb-2 bg-[#3D342E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 ${
                    isSidebarOpen 
                      ? 'bottom-full left-0 w-full' 
                      : 'left-full bottom-0 ml-4 w-48'
                  }`}
                >
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onRoleChange(r.id);
                        setShowRoleSwitcher(false);
                      }}
                      className={`w-full flex items-center gap-3 p-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                        role === r.id ? 'bg-brand-orange text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <r.icon size={16} />
                      {r.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a 
            href="/"
            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-stone-400 hover:bg-white/5 transition-all ${!isSidebarOpen ? 'justify-center' : ''}`}
            title="Go to Website"
          >
            <UtensilsCrossed size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">Go to Website</span>}
          </a>

          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-rose-400 hover:bg-rose-400/10 transition-all ${!isSidebarOpen ? 'justify-center' : ''}`}
            title="Logout"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-[280px]' : 'pl-[80px]'}`}>
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-brand-orange transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-stone-50 rounded-2xl text-stone-600 hover:bg-stone-100 transition-all relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-white" />
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-stone-100 p-6 z-50"
                  >
                    <h4 className="font-serif text-xl mb-4">Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { title: 'Order Delivered', time: '2 mins ago', desc: 'Your order #ORD-9281 has been delivered.' },
                        { title: 'New Promotion', time: '1 hour ago', desc: 'Get 20% off on your next reservation.' },
                      ].map((n, i) => (
                        <div key={i} className="p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer">
                          <h5 className="font-bold text-sm">{n.title}</h5>
                          <p className="text-xs text-stone-400 mb-1">{n.time}</p>
                          <p className="text-xs text-stone-500">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-stone-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-brand-brown">Julianne Moore</p>
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">{role}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-brown font-bold">
                JM
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
