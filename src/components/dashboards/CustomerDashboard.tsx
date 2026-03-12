import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Clock, 
  Star, 
  Calendar, 
  ChefHat, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  CreditCard, 
  ChevronRight,
  Plus,
  Search,
  Truck,
  Package,
  Home,
  Briefcase,
  Lock,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { SectionHeader, GlassCard, StatCard } from '../UI';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CustomerDashboardProps {
  activeTab: string;
}

export const CustomerDashboard = ({ activeTab }: CustomerDashboardProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'orders': return <OrdersPage />;
      case 'tracking': return <TrackingPage />;
      case 'favorites': return <FavoritesPage />;
      case 'profile': return <ProfilePage />;
      default: return <Overview />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderContent()}
    </motion.div>
  );
};

const Overview = () => {
  const recentOrders = [
    { id: "#ORD-9281", date: "Oct 12, 2025", total: "$42.50", status: "Delivered" },
    { id: "#ORD-9275", date: "Oct 08, 2025", total: "$28.00", status: "Delivered" },
  ];

  const recommendedDishes = [
    { name: "Truffle Pasta", price: "$24", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400" },
    { name: "Wagyu Burger", price: "$32", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { name: "Burrata Salad", price: "$18", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Welcome back, Julianne" subtitle="Customer Overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value="24" icon={ShoppingBag} trend="+2" delay={0.1} />
        <StatCard label="Loyalty Points" value="1,250" icon={Star} trend="+150" delay={0.2} />
        <StatCard label="Reservations" value="2" icon={Calendar} delay={0.3} />
        <StatCard label="Saved Dishes" value="12" icon={ChefHat} delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white" delay={0.5}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-2xl">Recent Orders</h3>
            <button className="text-brand-orange text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-stone-100">
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Order ID</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Date</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Total</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Status</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {recentOrders.map(order => (
                  <tr key={order.id} className="group">
                    <td className="py-4 font-bold text-sm">{order.id}</td>
                    <td className="py-4 text-sm text-stone-500">{order.date}</td>
                    <td className="py-4 text-sm font-bold">{order.total}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 hover:bg-stone-50 rounded-xl transition-all">
                        <ArrowRight size={18} className="text-stone-400 group-hover:text-brand-orange" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="bg-brand-brown text-white" delay={0.6}>
          <h3 className="font-serif text-2xl mb-6">Upcoming Reservations</h3>
          <div className="space-y-6">
            {[
              { date: "Oct 24, 2025", time: "19:30", guests: "4 People", type: "Dinner" },
              { date: "Nov 02, 2025", time: "13:00", guests: "2 People", type: "Lunch" },
            ].map((res, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-brand-orange text-[10px] font-bold uppercase tracking-widest">{res.type}</span>
                  <span className="text-xs text-white/40">{res.date}</span>
                </div>
                <h5 className="font-bold text-sm mb-1">{res.time} - {res.guests}</h5>
                <button className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Manage Booking</button>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-2xl text-white/40 hover:text-white hover:border-white/40 transition-all text-xs font-bold uppercase tracking-widest">
              + New Reservation
            </button>
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="font-serif text-3xl mb-8">Recommended For You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedDishes.map((dish, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] mb-6">
                <img src={dish.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <button className="w-full py-4 bg-white text-brand-brown rounded-2xl font-bold uppercase tracking-widest text-xs">
                    Quick Order
                  </button>
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-brand-orange transition-all">
                  <Heart size={20} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-2xl text-brand-brown">{dish.name}</h4>
                  <p className="text-stone-400 text-sm italic">Chef's Special Recommendation</p>
                </div>
                <span className="text-xl font-serif text-brand-orange">{dish.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const [filter, setFilter] = useState('all');
  const orders = [
    { id: "#ORD-9281", date: "Oct 12, 2025", total: "$42.50", status: "Delivered", items: ["Truffle Pasta x2", "Red Wine x1"] },
    { id: "#ORD-9275", date: "Oct 08, 2025", total: "$28.00", status: "Delivered", items: ["Wagyu Burger x1", "Fries x1"] },
    { id: "#ORD-9260", date: "Sep 28, 2025", total: "$115.00", status: "Cancelled", items: ["Family Feast Bundle"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <SectionHeader title="Order History" subtitle="My Orders" />
        <div className="flex gap-2 mb-12">
          {['all', 'delivered', 'active', 'cancelled'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === f ? 'bg-brand-orange text-white' : 'bg-white text-stone-400 border border-stone-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order, i) => (
          <GlassCard key={order.id} className="bg-white" delay={i * 0.1}>
            <div className="flex flex-wrap gap-8 items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400">
                  <Package size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-lg">{order.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">{order.date} • {order.items.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Total Amount</p>
                  <p className="text-xl font-serif text-brand-brown">{order.total}</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 border border-stone-100 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all">
                    View Details
                  </button>
                  <button className="px-6 py-3 bg-brand-orange text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2">
                    <ShoppingBag size={14} /> Reorder
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const TrackingPage = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Track Your Meal" subtitle="Real-time Progress" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white h-[600px] relative overflow-hidden">
          <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={64} className="text-brand-orange mx-auto mb-4 opacity-20 animate-bounce" />
              <p className="text-stone-400 italic">Live tracking map is being updated...</p>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <GlassCard className="bg-brand-brown text-white p-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Truck size={24} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40">Estimated Arrival</p>
                    <h4 className="text-xl font-serif">12:45 PM (15 mins)</h4>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                  Contact Driver
                </button>
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <GlassCard className="bg-white">
          <h3 className="font-serif text-2xl mb-8">Order Status</h3>
          <div className="space-y-10 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-stone-100" />
            
            {[
              { title: 'Order Confirmed', time: '12:10 PM', icon: CheckCircle2, status: 'completed' },
              { title: 'Preparing Your Meal', time: '12:15 PM', icon: ChefHat, status: 'completed' },
              { title: 'Out for Delivery', time: '12:30 PM', icon: Truck, status: 'active' },
              { title: 'Arriving Soon', time: 'Pending', icon: MapPin, status: 'pending' },
              { title: 'Delivered', time: 'Pending', icon: Package, status: 'pending' },
            ].map((step, i) => (
              <div key={i} className={`flex gap-6 relative z-10 ${step.status === 'pending' ? 'opacity-30' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                  step.status === 'active' ? 'bg-brand-orange text-white animate-pulse' : 
                  'bg-stone-100 text-stone-400'
                }`}>
                  <step.icon size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">{step.title}</h5>
                  <p className="text-xs text-stone-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const favorites = [
    { name: "Truffle Pasta", price: "$24", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400" },
    { name: "Wagyu Burger", price: "$32", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { name: "Burrata Salad", price: "$18", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400" },
    { name: "Red Wine", price: "$12", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Your Favorites" subtitle="Saved Dishes" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {favorites.map((dish, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square mb-4">
              <img src={dish.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-4 bg-brand-orange text-white rounded-2xl shadow-xl">
                  <ShoppingBag size={24} />
                </button>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white rounded-xl text-rose-500 shadow-lg">
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
            <h5 className="font-serif text-xl text-brand-brown">{dish.name}</h5>
            <p className="text-brand-orange font-bold">{dish.price}</p>
          </motion.div>
        ))}
        <button className="aspect-square rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-brand-orange hover:text-brand-orange transition-all group">
          <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Add More</span>
        </button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="My Profile" subtitle="Personal Information" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white p-10">
            <h3 className="font-serif text-2xl mb-8">Personal Details</h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="text" defaultValue="Julianne Moore" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="email" defaultValue="julianne@example.com" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="tel" defaultValue="+1 (212) 555-0198" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="date" defaultValue="1990-05-15" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <button className="md:col-span-2 py-4 bg-brand-brown text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl shadow-brand-brown/10 mt-4">
                Update Information
              </button>
            </form>
          </GlassCard>

          <GlassCard className="bg-white p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif text-2xl">Saved Addresses</h3>
              <button className="text-brand-orange text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Plus size={14} /> Add New
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Home', address: '742 5th Ave, New York, NY 10019', icon: Home },
                { label: 'Work', address: '123 Broadway, New York, NY 10001', icon: Briefcase },
              ].map((addr, i) => (
                <div key={i} className="p-6 rounded-3xl border border-stone-100 bg-stone-50 hover:border-brand-orange transition-all cursor-pointer group">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-white rounded-xl text-stone-400 group-hover:text-brand-orange transition-colors">
                      <addr.icon size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm mb-1">{addr.label}</h5>
                      <p className="text-xs text-stone-500 leading-relaxed">{addr.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-brand-brown text-white p-10">
            <h3 className="font-serif text-2xl mb-8">Security</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <button className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20">
                Change Password
              </button>
            </form>
          </GlassCard>

          <GlassCard className="bg-white p-10">
            <h3 className="font-serif text-2xl mb-8">Payment Methods</h3>
            <div className="space-y-4">
              {[
                { type: 'Visa', last4: '4242', expiry: '12/26' },
                { type: 'Mastercard', last4: '8888', expiry: '08/25' },
              ].map((card, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-stone-200 rounded-lg flex items-center justify-center text-[8px] font-bold uppercase">
                      {card.type}
                    </div>
                    <div>
                      <p className="text-sm font-bold">•••• {card.last4}</p>
                      <p className="text-[10px] text-stone-400">Expires {card.expiry}</p>
                    </div>
                  </div>
                  <button className="text-stone-300 hover:text-rose-500 transition-colors">
                    <Plus size={18} className="rotate-45" />
                  </button>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-stone-100 rounded-2xl text-stone-400 hover:text-brand-orange hover:border-brand-orange transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Plus size={14} /> Add New Card
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
