import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  "Complimentary Shipping on all orders over ₹1999",
  "Ethically Sourced Materials",
  "30-Day Hassle-Free Returns",
  "Secure Encrypted Checkout",
  "Dedicated 24/7 Concierge Support",
  "Premium Slow Fashion"
];

const BenefitsStrip = () => {
  // Duplicate array for seamless infinite marquee
  const marqueeItems = [...benefits, ...benefits, ...benefits];

  return (
    <section className="py-2.5 sm:py-3 bg-[#F7F2EA] overflow-hidden select-none border-y border-[#E6D8C3]/50">
      <div className="flex overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-33.33%" }} // Translate exactly a third, making an infinite seamless loop
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear"
          }}
          className="flex whitespace-nowrap items-center"
        >
          {marqueeItems.map((text, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10px] md:text-[11px] font-bold text-[#5A2D0C] tracking-[0.25em] uppercase px-8">
                {text}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#A85721]/60 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsStrip;
