import React from 'react';
import { Layers, Shirt, Smile, RotateCcw, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: "PREMIUM FABRIC",
    desc: "240 GSM Cotton"
  },
  {
    icon: Shirt,
    title: "PERFECT FIT",
    desc: "Oversized Fit"
  },
  {
    icon: Smile,
    title: "QUALITY PRINT",
    desc: "Long Lasting Print"
  },
  {
    icon: RotateCcw,
    title: "EASY RETURNS",
    desc: "7 Days Return"
  },
  {
    icon: CreditCard,
    title: "SECURE PAYMENT",
    desc: "100% Safe Payment"
  }
];

const FeaturesStrip = () => {
  return (
    <section className="bg-[#0a0a0a] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
        {/* Rounded dark grey container with border */}
        <div className="bg-[#121212]/95 border border-white/[0.04] p-6 lg:p-8 rounded-[24px] grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2 items-center relative overflow-hidden">
          {/* Subtle gradient highlights */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none" />

          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLast = idx === features.length - 1;
            return (
              <div 
                key={feature.title} 
                className={`flex items-center gap-4 ${isLast ? 'col-span-2 md:col-span-1 justify-center md:justify-start' : 'justify-start'} md:justify-center md:border-r border-white/5 last:border-none`}
              >
                {/* Icon */}
                <div className="text-white/85 shrink-0 flex items-center justify-center">
                  <Icon size={24} strokeWidth={1.5} className="text-white/80" />
                </div>
                
                {/* Details */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase leading-none mb-1">
                    {feature.title}
                  </span>
                  <span className="text-[10px] text-white/45 font-medium leading-tight">
                    {feature.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesStrip;
