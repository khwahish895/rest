import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Star, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Tag, 
  MessageSquare, 
  Settings as SettingsIcon,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  Camera,
  ChefHat,
  Truck,
  LayoutGrid
} from 'lucide-react';
import { SectionHeader, GlassCard, StatCard } from '../UI';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface AdminDashboardProps {
  activeTab: string;
  onRoleChange: (role: 'customer' | 'admin' | 'staff' | 'delivery') => void;
}

export const AdminDashboard = ({ activeTab, onRoleChange }: AdminDashboardProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'analytics': return <Analytics />;
      case 'menu': return <MenuManagement />;
      case 'orders': return <OrdersManagement />;
      case 'reservations': return <ReservationManagement />;
      case 'customers': return <CustomerManagement />;
      case 'promotions': return <PromotionManagement />;
      case 'reviews': return <ReviewsModeration />;
      case 'settings': return <SettingsPage />;
      case 'hub': return <SystemHub onRoleChange={onRoleChange} />;
      default: return <Analytics />;
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

const Analytics = () => {
  const salesData = [
    { name: 'Mon', sales: 4000, orders: 120 },
    { name: 'Tue', sales: 3000, orders: 98 },
    { name: 'Wed', sales: 2000, orders: 86 },
    { name: 'Thu', sales: 2780, orders: 110 },
    { name: 'Fri', sales: 1890, orders: 75 },
    { name: 'Sat', sales: 2390, orders: 95 },
    { name: 'Sun', sales: 3490, orders: 130 },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Analytics Overview" subtitle="Admin Control Center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Daily Revenue" value="$12,450" icon={TrendingUp} trend="+12%" delay={0.1} />
        <StatCard label="Total Orders" value="1,240" icon={ShoppingBag} trend="+5%" delay={0.2} />
        <StatCard label="Active Users" value="8,420" icon={Users} trend="+8%" delay={0.3} />
        <StatCard label="Avg. Rating" value="4.9" icon={Star} delay={0.4} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white h-[450px]" delay={0.5}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl">Revenue & Orders</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-stone-50 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-400">Weekly</button>
              <button className="px-4 py-2 bg-brand-orange rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-orange/20">Monthly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '20px' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#F27D26" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="bg-white" delay={0.6}>
          <h3 className="font-serif text-2xl mb-8">Popular Dishes</h3>
          <div className="space-y-6">
            {[
              { name: "Truffle Pasta", sales: "420", growth: "+15%", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=100" },
              { name: "Wagyu Burger", sales: "380", growth: "+8%", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100" },
              { name: "Burrata Salad", sales: "310", growth: "-2%", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=100" },
              { name: "Red Wine", sales: "280", growth: "+22%", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100" },
            ].map((dish, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <img src={dish.img} className="w-14 h-14 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h5 className="font-bold text-sm">{dish.name}</h5>
                  <p className="text-xs text-stone-400">{dish.sales} orders this week</p>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${dish.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {dish.growth.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {dish.growth}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 mt-8 border border-stone-100 rounded-2xl text-xs font-bold uppercase tracking-widest text-stone-400 hover:bg-stone-50 transition-all">
            View Full Report
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

const MenuManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const menuItems = [
    { id: 1, name: "Truffle Pasta", category: "Main Course", price: "$24.00", status: "Active", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=100" },
    { id: 2, name: "Wagyu Burger", category: "Main Course", price: "$32.00", status: "Active", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100" },
    { id: 3, name: "Burrata Salad", category: "Appetizer", price: "$18.00", status: "Out of Stock", img: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=100" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <SectionHeader title="Menu Management" subtitle="Inventory Control" />
        <button 
          onClick={() => setShowAddModal(true)}
          className="mb-12 px-8 py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-brand-orange/20 hover:bg-orange-600 transition-all"
        >
          <Plus size={18} /> Add New Dish
        </button>
      </div>

      <GlassCard className="bg-white">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input type="text" placeholder="Search dishes..." className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-sm" />
          </div>
          <button className="px-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-stone-600 flex items-center gap-2 text-sm font-bold">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-stone-100">
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Dish</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Category</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Price</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Status</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {menuItems.map(item => (
                <tr key={item.id} className="group">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.img} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <span className="font-bold text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-stone-500">{item.category}</td>
                  <td className="py-4 text-sm font-bold">{item.price}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-stone-50 rounded-xl text-stone-400 hover:text-brand-orange transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-rose-50 rounded-xl text-stone-400 hover:text-rose-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-brand-brown/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-12">
                <h3 className="font-serif text-3xl mb-8">Add New Dish</h3>
                <form className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="w-full aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center text-stone-400 cursor-pointer hover:border-brand-orange hover:text-brand-orange transition-all group">
                      <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-bold uppercase tracking-widest">Upload Dish Image</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Dish Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="e.g. Lobster Risotto" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Category</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all">
                      <option>Appetizer</option>
                      <option>Main Course</option>
                      <option>Dessert</option>
                      <option>Beverage</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Price ($)</label>
                    <input type="number" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Status</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Out of Stock</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Description</label>
                    <textarea rows={3} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" placeholder="Describe the dish..."></textarea>
                  </div>
                  <div className="md:col-span-2 flex gap-4 mt-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-stone-100 text-stone-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-200 transition-all">Cancel</button>
                    <button type="submit" className="flex-[2] py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/20">Save Dish</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OrdersManagement = () => {
  const orders = [
    { id: "#ORD-9285", customer: "Julianne Moore", items: 3, total: "$112.50", status: "Preparing", time: "10 mins ago" },
    { id: "#ORD-9284", customer: "Robert Downey", items: 1, total: "$24.00", status: "New", time: "2 mins ago" },
    { id: "#ORD-9283", customer: "Emma Stone", items: 5, total: "$245.00", status: "Delivering", time: "25 mins ago" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Order Management" subtitle="System Operations" />
      
      <GlassCard className="bg-white">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input type="text" placeholder="Search orders..." className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-sm" />
          </div>
          <div className="flex gap-2">
            {['All', 'New', 'Preparing', 'Delivering', 'Completed'].map(s => (
              <button key={s} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-stone-100 hover:bg-stone-50 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-stone-100">
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Order ID</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Customer</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Items</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Total</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Status</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Time</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.map(order => (
                <tr key={order.id} className="group">
                  <td className="py-4 font-bold text-sm">{order.id}</td>
                  <td className="py-4 text-sm text-stone-600">{order.customer}</td>
                  <td className="py-4 text-sm text-stone-500">{order.items} items</td>
                  <td className="py-4 text-sm font-bold">{order.total}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'New' ? 'bg-blue-50 text-blue-600' :
                      order.status === 'Preparing' ? 'bg-amber-50 text-amber-600' :
                      order.status === 'Delivering' ? 'bg-purple-50 text-purple-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-stone-400">{order.time}</td>
                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-stone-50 rounded-xl transition-all">
                      <MoreVertical size={18} className="text-stone-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

const ReservationManagement = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Reservations" subtitle="Booking Control" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 bg-white h-[600px] relative">
          <div className="p-8 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-serif text-2xl">Calendar View</h3>
            <div className="flex gap-4">
              <button className="p-2 hover:bg-stone-50 rounded-xl transition-all"><ArrowUpRight className="rotate-[-135deg]" size={20} /></button>
              <span className="font-bold text-sm uppercase tracking-widest">October 2025</span>
              <button className="p-2 hover:bg-stone-50 rounded-xl transition-all"><ArrowUpRight className="rotate-[45deg]" size={20} /></button>
            </div>
          </div>
          <div className="p-8 grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">{d}</div>
            ))}
            {[...Array(31)].map((_, i) => (
              <div key={i} className={`aspect-square rounded-2xl border border-stone-50 flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition-all relative ${
                i + 1 === 12 ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'bg-stone-50/50'
              }`}>
                <span className="text-sm font-bold">{i + 1}</span>
                {i % 5 === 0 && <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-brand-orange" />}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <h3 className="font-serif text-2xl">Pending Approval</h3>
          {[
            { name: "Scarlett Johansson", guests: 6, time: "20:00", date: "Oct 15" },
            { name: "Chris Evans", guests: 2, time: "19:00", date: "Oct 16" },
          ].map((res, i) => (
            <GlassCard key={i} className="bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-bold text-sm">{res.name}</h5>
                  <p className="text-xs text-stone-400">{res.date} • {res.time} • {res.guests} Guests</p>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl text-stone-400"><Calendar size={16} /></div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10">Approve</button>
                <button className="flex-1 py-3 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-100 transition-all">Decline</button>
              </div>
            </GlassCard>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-stone-100 rounded-2xl text-stone-400 hover:text-brand-orange hover:border-brand-orange transition-all text-xs font-bold uppercase tracking-widest">
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: "Julianne Moore", email: "julianne@example.com", orders: 24, total: "$1,250", joined: "Jan 2024" },
    { id: 2, name: "Robert Downey", email: "robert@example.com", orders: 12, total: "$680", joined: "Mar 2024" },
    { id: 3, name: "Emma Stone", email: "emma@example.com", orders: 42, total: "$3,400", joined: "Dec 2023" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Customer Directory" subtitle="CRM Portal" />
      
      <GlassCard className="bg-white">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input type="text" placeholder="Search customers..." className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-sm" />
          </div>
          <button className="px-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-stone-600 flex items-center gap-2 text-sm font-bold">
            <Filter size={18} /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-stone-100">
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Customer</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Orders</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Total Spent</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Joined</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {customers.map(customer => (
                <tr key={customer.id} className="group">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-brown font-bold text-xs">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">{customer.name}</h5>
                        <p className="text-xs text-stone-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-stone-600">{customer.orders}</td>
                  <td className="py-4 text-sm font-bold">{customer.total}</td>
                  <td className="py-4 text-sm text-stone-500">{customer.joined}</td>
                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-stone-50 rounded-xl transition-all">
                      <Mail size={18} className="text-stone-400 hover:text-brand-orange" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

const PromotionManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <SectionHeader title="Promotions" subtitle="Marketing Hub" />
        <button className="mb-12 px-8 py-4 bg-brand-orange text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-brand-orange/20 hover:bg-orange-600 transition-all">
          <Plus size={18} /> Create Offer
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <GlassCard className="bg-brand-brown text-white p-10 relative overflow-hidden">
          <div className="relative z-10">
            <span className="px-3 py-1 bg-brand-orange rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Active Banner</span>
            <h3 className="font-serif text-4xl mb-4 italic text-brand-gold">Autumn Flavors Festival</h3>
            <p className="text-white/60 mb-8 max-w-md">Celebrate the season with our exclusive 3-course tasting menu. Available for a limited time only.</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-brand-brown rounded-xl font-bold uppercase tracking-widest text-[10px]">Edit Banner</button>
              <button className="px-8 py-3 bg-white/10 rounded-xl font-bold uppercase tracking-widest text-[10px]">Pause Campaign</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </GlassCard>

        <div className="space-y-6">
          <h3 className="font-serif text-2xl">Discount Codes</h3>
          {[
            { code: "WELCOME20", discount: "20% OFF", usage: "1,240 times", status: "Active" },
            { code: "HAVENFREE", discount: "Free Dessert", usage: "850 times", status: "Active" },
            { code: "SUMMER10", discount: "10% OFF", usage: "3,100 times", status: "Expired" },
          ].map((promo, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-stone-100 flex items-center justify-between group hover:border-brand-orange transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-stone-50 rounded-xl text-stone-400 group-hover:text-brand-orange transition-colors">
                  <Tag size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm tracking-widest">{promo.code}</h5>
                  <p className="text-xs text-stone-400">{promo.discount} • {promo.usage}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                promo.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-50 text-stone-400'
              }`}>
                {promo.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewsModeration = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="Reviews Moderation" subtitle="Customer Feedback" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {[
            { user: "Julianne Moore", rating: 5, date: "2 hours ago", comment: "The truffle pasta was absolutely divine! The atmosphere is unmatched in the city.", status: "Pending" },
            { user: "Robert Downey", rating: 4, date: "1 day ago", comment: "Great food, but the wait time for the main course was a bit longer than expected.", status: "Pending" },
          ].map((review, i) => (
            <GlassCard key={i} className="bg-white p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 font-bold">
                    {review.user[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{review.user}</h5>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < review.rating ? 'text-brand-orange fill-brand-orange' : 'text-stone-200'} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-stone-400">{review.date}</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-8 italic">"{review.comment}"</p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} /> Approve
                </button>
                <button className="flex-1 py-3 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-100 transition-all flex items-center justify-center gap-2">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-brand-brown text-white p-10">
            <h3 className="font-serif text-2xl mb-8">Rating Summary</h3>
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h4 className="text-6xl font-serif text-brand-gold">4.9</h4>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-brand-orange fill-brand-orange" />)}
                </div>
                <p className="text-xs text-white/40 mt-2 uppercase tracking-widest font-bold">Based on 1,240 reviews</p>
              </div>
              {[5, 4, 3, 2, 1].map(r => (
                <div key={r} className="flex items-center gap-4">
                  <span className="text-xs font-bold w-4">{r}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange" style={{ width: `${r === 5 ? 85 : r === 4 ? 10 : 5}%` }} />
                  </div>
                  <span className="text-[10px] text-white/40 w-8">{r === 5 ? '85%' : r === 4 ? '10%' : '5%'}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <SectionHeader title="System Settings" subtitle="Restaurant Configuration" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white p-10">
            <h3 className="font-serif text-2xl mb-8">Restaurant Details</h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-stone-50 border-2 border-dashed border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-brand-orange group-hover:text-brand-orange transition-all cursor-pointer overflow-hidden">
                    <Camera size={32} />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-brand-orange text-white rounded-2xl shadow-xl">
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Restaurant Name</label>
                <input type="text" defaultValue="Gourmet Haven" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="text" defaultValue="www.gourmethaven.com" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="email" defaultValue="hello@gourmethaven.com" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="tel" defaultValue="+1 (212) 555-0198" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                  <input type="text" defaultValue="742 5th Ave, New York, NY 10019" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all" />
                </div>
              </div>
              <button className="md:col-span-2 py-4 bg-brand-brown text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl shadow-brand-brown/10 mt-4">
                Save Changes
              </button>
            </form>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-white p-10">
            <h3 className="font-serif text-2xl mb-8">Opening Hours</h3>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                  <span className="text-sm font-bold text-stone-600">{day}</span>
                  <div className="flex items-center gap-2">
                    <input type="text" defaultValue="11:00" className="w-16 px-2 py-1 bg-stone-50 border border-stone-100 rounded-lg text-xs text-center" />
                    <span className="text-stone-300">-</span>
                    <input type="text" defaultValue="23:00" className="w-16 px-2 py-1 bg-stone-50 border border-stone-100 rounded-lg text-xs text-center" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-rose-50 border-rose-100 p-10">
            <h3 className="font-serif text-2xl text-rose-900 mb-4">Danger Zone</h3>
            <p className="text-xs text-rose-600 mb-8 leading-relaxed">Once you delete your restaurant data, there is no going back. Please be certain.</p>
            <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/10">
              Delete All Data
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const SystemHub = ({ onRoleChange }: { onRoleChange: (role: any) => void }) => {
  const modules = [
    { id: 'customer', title: 'Customer Portal', desc: 'View the platform as a customer. Track orders, manage favorites, and update profile.', icon: Users, color: 'bg-blue-500' },
    { id: 'staff', title: 'Kitchen & Staff', desc: 'Manage the kitchen queue, KDS, and table reservations in real-time.', icon: ChefHat, color: 'bg-emerald-500' },
    { id: 'delivery', title: 'Logistics & Delivery', desc: 'Monitor active deliveries, route maps, and driver performance.', icon: Truck, color: 'bg-purple-500' },
    { id: 'admin', title: 'Admin Control', desc: 'Full system access, analytics, menu management, and global settings.', icon: SettingsIcon, color: 'bg-brand-orange' },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="System Hub" subtitle="Module Interconnectivity" />
      
      <div className="grid md:grid-cols-2 gap-8">
        {modules.map((m, i) => (
          <GlassCard key={i} className="bg-white p-10 group hover:border-brand-orange transition-all cursor-pointer" delay={i * 0.1}>
            <div className="flex gap-6">
              <div className={`w-16 h-16 rounded-[2rem] ${m.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <m.icon size={32} />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl mb-2">{m.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">{m.desc}</p>
                <button 
                  onClick={() => onRoleChange(m.id)}
                  className="px-6 py-3 bg-stone-50 rounded-xl text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:bg-brand-orange group-hover:text-white transition-all"
                >
                  Launch Module
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-brand-brown text-white p-12 mt-12 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="font-serif text-3xl mb-4 italic text-brand-gold">Developer & Demo Mode</h3>
          <p className="text-white/60 max-w-2xl mb-8">
            This hub allows administrators to seamlessly jump between different operational modules of the Gourmet Haven platform. 
            In a production environment, these would be restricted by granular permissions.
          </p>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest">API Status: Online</div>
            <div className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest">WebSocket: Connected</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </GlassCard>
    </div>
  );
};
