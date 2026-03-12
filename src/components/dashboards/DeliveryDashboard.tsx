import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  History, 
  User, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Star,
  Map as MapIcon,
  ShieldCheck,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { SectionHeader, GlassCard, StatCard } from '../UI';

interface DeliveryDashboardProps {
  activeTab: string;
}

export const DeliveryDashboard = ({ activeTab }: DeliveryDashboardProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'list': return <DeliveriesList />;
      case 'map': return <RouteMap />;
      case 'history': return <DeliveryHistory />;
      case 'settings': return <ProfileSettings />;
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
      <SectionHeader title="Courier Dashboard" subtitle="Delivery Operations" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Today's Earnings" value="$145.20" icon={DollarSign} trend="+15%" delay={0.1} />
        <StatCard label="Completed" value="12" icon={CheckCircle2} trend="+2" delay={0.2} />
        <StatCard label="Active Orders" value="2" icon={Truck} delay={0.3} />
        <StatCard label="Avg. Rating" value="4.9" icon={Star} delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-serif text-2xl">Active Task</h3>
          <GlassCard className="bg-brand-brown text-white p-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="px-3 py-1 bg-brand-orange rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">In Progress</span>
                  <h4 className="font-serif text-4xl italic text-brand-gold">#ORD-9285</h4>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl text-brand-orange">
                  <Navigation size={32} />
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-brand-orange shadow-[0_0_15px_rgba(242,125,38,0.5)]" />
                    <div className="w-0.5 h-12 bg-white/10" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Pickup</p>
                    <p className="text-sm font-bold">Gourmet Haven, 742 5th Ave</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Dropoff</p>
                    <p className="text-sm font-bold">221B Baker Street, NY</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20">
                  Complete Delivery
                </button>
                <button className="p-4 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all">
                  <Phone size={20} />
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          </GlassCard>
        </div>

        <GlassCard className="bg-white">
          <h3 className="font-serif text-2xl mb-8">Nearby Requests</h3>
          <div className="space-y-6">
            {[
              { id: "#ORD-9288", dist: "0.8 miles", pay: "$8.50", time: "2 mins ago" },
              { id: "#ORD-9289", dist: "1.2 miles", pay: "$12.00", time: "5 mins ago" },
            ].map((req, i) => (
              <div key={i} className="p-6 rounded-3xl border border-stone-100 bg-stone-50 group hover:border-brand-orange transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="font-bold text-sm mb-1">{req.id}</h5>
                    <p className="text-xs text-stone-400">{req.dist} away • {req.time}</p>
                  </div>
                  <span className="text-lg font-serif text-brand-orange">{req.pay}</span>
                </div>
                <button className="w-full py-3 bg-white border border-stone-100 rounded-xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all">
                  Accept Delivery
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const DeliveriesList = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Available Deliveries" subtitle="Courier Portal" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <GlassCard key={i} className="bg-white p-8 group hover:border-brand-orange transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400">
                <Truck size={24} />
              </div>
              <span className="text-xl font-serif text-brand-orange">$1{i}.50</span>
            </div>
            <h4 className="font-bold text-lg mb-2">#ORD-929{i}</h4>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <MapPin size={14} className="text-stone-300" /> 1.5 miles from your location
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Clock size={14} className="text-stone-300" /> 15 mins estimated prep
              </div>
            </div>
            <button className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all shadow-xl shadow-stone-900/10">
              Accept Delivery
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const RouteMap = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Navigation" subtitle="Route Tracking" />
      
      <GlassCard className="bg-white p-0 overflow-hidden h-[700px] relative">
        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
          <div className="text-center">
            <MapIcon size={64} className="text-brand-orange mx-auto mb-4 opacity-20 animate-pulse" />
            <p className="text-stone-400 italic">Interactive navigation map is loading...</p>
          </div>
        </div>

        {/* Floating Map Controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          <GlassCard className="bg-brand-brown text-white p-6 shadow-2xl max-w-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center">
                <Navigation size={24} />
              </div>
              <div>
                <h5 className="font-bold text-sm">Turn Right in 200m</h5>
                <p className="text-xs text-white/40">Onto Broadway Ave</p>
              </div>
            </div>
          </GlassCard>
          
          <div className="flex flex-col gap-4">
            <button className="p-4 bg-white rounded-2xl shadow-xl text-stone-600 hover:text-brand-orange transition-all">
              <MapIcon size={24} />
            </button>
            <button className="p-4 bg-white rounded-2xl shadow-xl text-stone-600 hover:text-brand-orange transition-all">
              <Navigation size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-8 left-8 right-8">
          <GlassCard className="bg-white p-8 shadow-2xl">
            <div className="flex flex-wrap gap-12 items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Distance</p>
                  <p className="text-xl font-serif text-brand-brown">1.2 miles</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Time</p>
                  <p className="text-xl font-serif text-brand-brown">8 mins</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs">
                  Arrived at Pickup
                </button>
                <button className="px-8 py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-orange/20">
                  Contact Support
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </GlassCard>
    </div>
  );
};

const DeliveryHistory = () => {
  const history = [
    { id: "#ORD-9280", date: "Oct 12, 2025", earnings: "$14.50", status: "Completed", dist: "2.4 miles" },
    { id: "#ORD-9278", date: "Oct 12, 2025", earnings: "$12.00", status: "Completed", dist: "1.8 miles" },
    { id: "#ORD-9275", date: "Oct 11, 2025", earnings: "$18.20", status: "Completed", dist: "3.2 miles" },
    { id: "#ORD-9270", date: "Oct 11, 2025", earnings: "$9.50", status: "Completed", dist: "1.1 miles" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Delivery History" subtitle="Earnings & Stats" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-stone-100">
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Order ID</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Date</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Distance</th>
                  <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Earnings</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {history.map(item => (
                  <tr key={item.id} className="group">
                    <td className="py-6 font-bold text-sm">{item.id}</td>
                    <td className="py-6 text-sm text-stone-500">{item.date}</td>
                    <td className="py-6 text-sm text-stone-500">{item.dist}</td>
                    <td className="py-6 text-sm font-bold text-emerald-600">{item.earnings}</td>
                    <td className="py-6 text-right">
                      <button className="p-2 hover:bg-stone-50 rounded-xl transition-all">
                        <ChevronRight size={18} className="text-stone-300 group-hover:text-brand-orange" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="bg-brand-brown text-white p-10">
            <h3 className="font-serif text-2xl mb-8">Weekly Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Total Deliveries</span>
                <span className="text-xl font-serif">42</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Total Distance</span>
                <span className="text-xl font-serif">124.5 mi</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Total Earnings</span>
                <span className="text-2xl font-serif text-brand-orange">$542.80</span>
              </div>
            </div>
            <button className="w-full py-4 mt-8 bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
              Download Statement
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="space-y-8">
      <SectionHeader title="Driver Profile" subtitle="Account Settings" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-serif text-2xl">Availability Status</h3>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  isAvailable ? 'bg-emerald-500' : 'bg-stone-200'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                  isAvailable ? 'left-9' : 'left-1'
                }`} />
              </button>
            </div>
            <div className={`p-6 rounded-3xl border-2 border-dashed transition-all ${
              isAvailable ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-stone-50 border-stone-100 text-stone-400'
            }`}>
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-xl ${isAvailable ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-400'}`}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">You are currently {isAvailable ? 'Online' : 'Offline'}</h5>
                  <p className="text-xs opacity-60">
                    {isAvailable ? 'You are visible to new delivery requests nearby.' : 'Toggle online to start receiving new delivery tasks.'}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-white p-10">
            <h3 className="font-serif text-2xl mb-8">Driver Details</h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                <input type="text" defaultValue="Marcus Driver" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Vehicle Type</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all">
                  <option>Bicycle</option>
                  <option>E-Bike</option>
                  <option>Motorcycle</option>
                  <option>Car</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">License Number</label>
                <input type="text" defaultValue="NY-12345678" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                <input type="tel" defaultValue="+1 (212) 555-0199" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
              </div>
              <button className="md:col-span-2 py-4 bg-brand-brown text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl shadow-brand-brown/10 mt-4">
                Update Profile
              </button>
            </form>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-brand-brown text-white p-10">
            <h3 className="font-serif text-2xl mb-8">Safety Score</h3>
            <div className="text-center mb-10">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="36.4" className="text-brand-orange" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif">90</span>
                  <span className="text-[8px] uppercase font-bold text-white/40">Excellent</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-white/60">
                <CheckCircle2 size={14} className="text-emerald-500" /> On-time Delivery: 98%
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <CheckCircle2 size={14} className="text-emerald-500" /> Customer Rating: 4.9/5
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <AlertCircle size={14} className="text-brand-orange" /> 1 Reported Delay
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
