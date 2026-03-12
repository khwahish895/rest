import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Sparkles } from 'lucide-react';

export const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-cream relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 px-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-20 h-20 bg-brand-brown rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-brown/20"
        >
          <ChefHat className="text-brand-gold" size={32} />
        </motion.div>

        <h1 className="font-serif text-6xl md:text-8xl text-brand-brown mb-2 italic tracking-tight">
          {title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-brand-gold/30" />
          <p className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-brand-gold">
            Coming Soon
          </p>
          <div className="h-[1px] w-12 bg-brand-gold/30" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-4"
        >
          <p className="font-serif text-2xl md:text-3xl text-stone-500 italic max-w-lg mx-auto leading-relaxed">
            "We're crafting something special for you."
          </p>
          
          <div className="flex items-center justify-center gap-2 text-brand-orange/60">
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Culinary Excellence in Progress</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <a 
            href="/menu" 
            className="px-10 py-4 bg-brand-brown text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-orange transition-all shadow-xl shadow-brand-brown/10"
          >
            Explore Current Menu
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative side text */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 vertical-text opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-brown">Gourmet Haven • Est. 2024</span>
      </div>
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 vertical-text opacity-20 rotate-180">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-brown">Fine Dining Experience</span>
      </div>
    </div>
  );
};
