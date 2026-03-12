import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Map as MapIcon, 
  UtensilsCrossed, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowRight,
  UserPlus,
  Calendar,
  Timer,
  Flame,
  Coffee,
  Wine,
  Plus
} from 'lucide-react';
import { SectionHeader, GlassCard, StatCard } from '../UI';

interface StaffDashboardProps {
  activeTab: string;
}

export const StaffDashboard = ({ activeTab }: StaffDashboardProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'orders': return <KitchenQueue />;
      case 'kds': return <KitchenDisplaySystem />;
      case 'tables': return <TableManagement />;
      case 'checkin': return <ReservationCheckIn />;
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
  return (
    <div className="space-y-8">
      <SectionHeader title="Today's Service" subtitle="Staff Operations" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Orders" value="12" icon={ChefHat} trend="+2" delay={0.1} />
        <StatCard label="Avg. Prep Time" value="18m" icon={Timer} trend="-2m" delay={0.2} />
        <StatCard label="Tables Occupied" value="18/24" icon={MapIcon} delay={0.3} />
        <StatCard label="Upcoming Bookings" value="8" icon={Calendar} delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white" delay={0.5}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl">Live Kitchen Queue</h3>
            <button className="text-brand-orange text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              View Full Queue <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: "#ORD-102", items: ["Truffle Pasta x2", "Red Wine x1"], time: "12 mins ago", status: "Preparing", priority: "High" },
              { id: "#ORD-103", items: ["Wagyu Burger x1", "Fries x1"], time: "5 mins ago", status: "New", priority: "Medium" },
              { id: "#ORD-104", items: ["Burrata Salad x1"], time: "2 mins ago", status: "New", priority: "Low" },
            ].map((order, i) => (
              <div key={i} className="p-6 rounded-3xl border border-stone-100 bg-stone-50 flex items-center justify-between group hover:border-brand-orange transition-all">
                <div className="flex gap-6 items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    order.priority === 'High' ? 'bg-rose-50 text-rose-500' : 
                    order.priority === 'Medium' ? 'bg-amber-50 text-amber-500' : 
                    'bg-emerald-50 text-emerald-500'
                  }`}>
                    {order.priority === 'High' ? <Flame size={24} /> : order.priority === 'Medium' ? <Timer size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-sm">{order.id}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                        order.status === 'Preparing' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">{order.items.join(', ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-stone-600 mb-1">{order.time}</p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Update Status</button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="bg-brand-brown text-white" delay={0.6}>
          <h3 className="font-serif text-2xl mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'New Order', icon: Plus, color: 'bg-brand-orange' },
              { label: 'Check-in', icon: UserPlus, color: 'bg-white/10' },
              { label: 'Table Map', icon: MapIcon, color: 'bg-white/10' },
              { label: 'Kitchen', icon: ChefHat, color: 'bg-white/10' },
            ].map((action, i) => (
              <button key={i} className={`p-6 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 ${action.color}`}>
                <action.icon size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{action.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-3xl bg-white/5 border border-white/10">
            <h5 className="font-bold text-sm mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-brand-orange" /> System Alerts
            </h5>
            <div className="space-y-3">
              <p className="text-xs text-white/40 leading-relaxed">• Table 4 has been waiting for 15 mins.</p>
              <p className="text-xs text-white/40 leading-relaxed">• Low stock alert: Burrata Cheese.</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const KitchenQueue = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Kitchen Queue" subtitle="Order Preparation" />
      
      <div className="grid lg:grid-cols-4 gap-6">
        {['New', 'Preparing', 'Ready', 'Completed'].map(status => (
          <div key={status} className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-sm uppercase tracking-widest text-stone-400">{status}</h4>
              <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400">3</span>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <GlassCard key={i} className="bg-white p-6 border-l-4 border-brand-orange">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-bold text-sm">#ORD-10{i}</h5>
                    <span className="text-[10px] text-stone-400">12:4{i} PM</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-xs text-stone-600 flex items-center gap-2">• Truffle Pasta x2</p>
                    <p className="text-xs text-stone-600 flex items-center gap-2">• Red Wine x1</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Details</button>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Move Next</button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KitchenDisplaySystem = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <SectionHeader title="Kitchen Display" subtitle="KDS Monitor" />
        <div className="flex gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold uppercase tracking-widest">
            <Flame size={14} /> 2 Urgent
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold uppercase tracking-widest">
            <CheckCircle2 size={14} /> 12 Ready
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { id: "#ORD-102", table: "T-04", timer: "12:45", items: [{ name: "Truffle Pasta", qty: 2, status: "cooking" }, { name: "Red Wine", qty: 1, status: "ready" }] },
          { id: "#ORD-103", table: "T-12", timer: "08:12", items: [{ name: "Wagyu Burger", qty: 1, status: "cooking" }, { name: "Fries", qty: 1, status: "cooking" }] },
          { id: "#ORD-104", table: "T-08", timer: "02:30", items: [{ name: "Burrata Salad", qty: 1, status: "ready" }] },
        ].map((order, i) => (
          <GlassCard key={i} className="bg-brand-brown text-white p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-3xl font-serif text-brand-gold mb-1">{order.table}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono text-brand-orange">{order.timer}</p>
                <p className="text-[10px] uppercase font-bold text-white/40">Elapsed Time</p>
              </div>
            </div>
            <div className="space-y-4 mb-10">
              {order.items.map((item, j) => (
                <div key={j} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-bold text-sm">{item.qty}</span>
                    <span className="font-bold text-sm">{item.name}</span>
                  </div>
                  {item.status === 'ready' ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20">
              Mark All Ready
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const TableManagement = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Table Management" subtitle="Floor Map" />
      
      <div className="grid lg:grid-cols-4 gap-8">
        <GlassCard className="lg:col-span-3 bg-white p-12 min-h-[600px] relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
            {[...Array(24)].map((_, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center border-2 transition-all cursor-pointer relative ${
                  i % 3 === 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                  i % 4 === 0 ? 'bg-rose-50 border-rose-100 text-rose-700' : 
                  'bg-white border-stone-100 text-stone-400'
                }`}
              >
                <span className="text-3xl font-serif mb-1">{i + 1}</span>
                <span className="text-[8px] uppercase font-bold tracking-widest">
                  {i % 3 === 0 ? 'Free' : i % 4 === 0 ? 'Occupied' : 'Reserved'}
                </span>
                {i % 4 === 0 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold border-4 border-white">
                    4
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stone-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Reserved</span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <h3 className="font-serif text-2xl">Table Details</h3>
          <GlassCard className="bg-brand-brown text-white">
            <div className="text-center mb-8">
              <h4 className="text-6xl font-serif text-brand-gold">T-12</h4>
              <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest mt-2">Occupied since 12:15 PM</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-xs text-white/40">Guests</span>
                <span className="text-sm font-bold">4 People</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-xs text-white/40">Current Bill</span>
                <span className="text-sm font-bold text-brand-orange">$142.50</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-xs text-white/40">Status</span>
                <span className="text-sm font-bold text-emerald-500">Main Course</span>
              </div>
            </div>
            <button className="w-full py-4 bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all mb-3">
              Print Bill
            </button>
            <button className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all">
              Clear Table
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const ReservationCheckIn = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Guest Check-in" subtitle="Arrival Management" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input type="text" placeholder="Search guest name..." className="w-full pl-12 pr-4 py-4 bg-white border border-stone-100 rounded-2xl text-sm shadow-sm" />
            </div>
            <button className="px-8 py-4 bg-brand-brown text-white rounded-2xl font-bold uppercase tracking-widest text-xs">Search</button>
          </div>

          <h3 className="font-serif text-2xl mb-6">Arriving Soon</h3>
          {[
            { name: "Julianne Moore", time: "19:30", guests: 4, status: "Arrived" },
            { name: "Robert Downey", time: "19:45", guests: 2, status: "Pending" },
            { name: "Emma Stone", time: "20:00", guests: 6, status: "Pending" },
          ].map((res, i) => (
            <GlassCard key={i} className="bg-white p-8 group hover:border-brand-orange transition-all">
              <div className="flex justify-between items-center">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 font-bold text-xl">
                    {res.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">{res.name}</h5>
                    <p className="text-xs text-stone-400">{res.time} • {res.guests} Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${
                    res.status === 'Arrived' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-50 text-stone-400'
                  }`}>
                    {res.status}
                  </span>
                  <button className="p-3 bg-stone-50 rounded-xl text-stone-400 hover:text-brand-orange transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-brand-brown text-white p-10">
            <h3 className="font-serif text-2xl mb-8">Walk-in Entry</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Guest Name</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-orange transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Guests</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-brand-orange transition-all">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                </select>
              </div>
              <button className="w-full py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20">
                Assign Table
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
