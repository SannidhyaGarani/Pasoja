import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

const benefits = [
  { icon: Truck, text: 'Free Shipping Over ₹1999' },
  { icon: Zap, text: 'Fast Delivery 3–5 Days' },
  { icon: RotateCcw, text: '30-Day Easy Returns' },
  { icon: ShieldCheck, text: 'Secure Checkout' },
  { icon: Truck, text: 'Ethically Sourced' },
  { icon: Zap, text: 'Premium Quality' },
];

const BenefitsStrip = () => {
  return (
    <section className="bg-[#0a0a0a] border-y border-white/[0.06] py-4 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {[...benefits, ...benefits].map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              <Icon size={13} strokeWidth={2} className="text-white/30 flex-shrink-0" />
              {item.text}
              <span className="w-1 h-1 bg-white/15 rounded-full ml-2 flex-shrink-0" />
            </span>
          );
        })}
      </motion.div>
    </section>
  );
};

export default BenefitsStrip;
