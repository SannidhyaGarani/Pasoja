import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="max-w-3xl mx-auto mb-10 md:mb-14 relative">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/25 block mb-3"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionHeader;
