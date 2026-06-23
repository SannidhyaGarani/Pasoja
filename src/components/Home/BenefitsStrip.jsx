import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const benefits = [
  {
    num: "01",
    title: "Premium Quality",
    desc: "Crafted from the finest materials",
    icon: <Sparkles className="w-5 h-5 stroke-[1.25]" />
  },
  {
    num: "02",
    title: "Free Shipping",
    desc: "On all orders over ₹1999",
    icon: <Truck className="w-5 h-5 stroke-[1.25]" />
  },
  {
    num: "03",
    title: "Easy Returns",
    desc: "30-day hassle-free framework",
    icon: <RotateCcw className="w-5 h-5 stroke-[1.25]" />
  },
  {
    num: "04",
    title: "Secure Checkout",
    desc: "Encrypted payment gateways",
    icon: <Shield className="w-5 h-5 stroke-[1.25]" />
  },
  {
    num: "05",
    title: "Studio Support",
    desc: "Dedicated 24/7 concierge assistance",
    icon: <Zap className="w-5 h-5 stroke-[1.25]" />
  }
];

const BenefitsStrip = () => {
  return (
    <section className="py-28 bg-white border-t border-neutral-100 relative overflow-hidden">
      {/* Subtle Editorial Grid Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="The Studio Standard"
          subtitle="A seamless, luxury shopping experience reimagined"
        />

        {/* Minimalist, borderless-feel premium layout row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 mt-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="group relative flex flex-col items-start text-left pt-6 border-t border-neutral-100/80 hover:border-neutral-900 transition-colors duration-500 ease-out"
            >
              {/* Top Row Index Header */}
              <div className="w-full flex items-center justify-between mb-5">
                <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors duration-500 text-neutral-800">
                  {benefit.icon}
                </div>
                <span className="text-[10px] tracking-widest font-medium text-neutral-300 font-mono group-hover:text-neutral-400 transition-colors">
                  {benefit.num}
                </span>
              </div>
              
              {/* Text Configurations */}
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-[240px]">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsStrip;


















