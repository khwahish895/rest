import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GlassCard } from './UI';
import { User, Lock, Mail, ChevronRight } from 'lucide-react';

type Role = 'customer' | 'staff' | 'delivery' | 'admin';

export const AuthPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('customer');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    const user = { name: 'Julianne Moore', role };
    onLogin(user);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream relative overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <GlassCard className="bg-white/80 p-12 shadow-2xl border-white/40">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center text-white font-serif text-3xl font-bold shadow-xl shadow-brand-orange/20 mx-auto mb-6">
              GH
            </div>
            <h2 className="font-serif text-4xl text-brand-brown mb-2 italic">
              {isLogin ? 'Welcome Back' : 'Join the Haven'}
            </h2>
            <p className="text-stone-400 text-xs uppercase tracking-[0.2em] font-bold">
              {isLogin ? 'Sign in to your account' : 'Create your culinary profile'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-2">Select Portal</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all appearance-none text-sm font-medium"
                  >
                    <option value="customer">Customer Portal</option>
                    <option value="staff">Staff Portal</option>
                    <option value="delivery">Delivery Portal</option>
                    <option value="admin">Admin Portal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 ml-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-brand-brown text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-orange transition-all shadow-xl shadow-brand-brown/20 flex items-center justify-center gap-3 group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:text-brand-orange transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
