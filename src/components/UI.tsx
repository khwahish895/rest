import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'motion/react';

export const TiltCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-3xl ${className}`}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export const ParallaxSection = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export const GlassCard = ({ children, className = "", delay = 0, ...props }: { children: React.ReactNode, className?: string, delay?: number, [key: string]: any }) => (
  <motion.div
    {...props}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`glass rounded-3xl p-6 shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

export const StatCard = ({ label, value, icon: Icon, trend, delay = 0 }: { label: string, value: string, icon: any, trend?: string, delay?: number }) => (
  <GlassCard delay={delay} className="flex items-center justify-between bg-white/40">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">{label}</p>
      <h3 className="text-2xl font-serif font-bold text-brand-brown">{value}</h3>
      {trend && <p className={`text-xs mt-1 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{trend} from last month</p>}
    </div>
    <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
      <Icon size={24} />
    </div>
  </GlassCard>
);

export const SectionHeader = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-brand-orange font-sans text-xs uppercase tracking-[0.3em] mb-3 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="font-serif text-4xl md:text-5xl text-brand-brown"
    >
      {title}
    </motion.h2>
  </div>
);
