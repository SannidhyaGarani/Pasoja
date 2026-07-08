import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GenderBanner = () => {
  const categories = [
    {
      title: 'Women',
      subtitle: 'The Fluid Collection',
      desc: 'Graceful silhouettes for every occasion',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop',
      path: '/shop?category=Women'
    },
    {
      title: 'Men',
      subtitle: 'The Structural Form',
      desc: 'Refined essentials, tailored precision',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
      path: '/shop?category=Men'
    }
  ];

  return (
    <section className="bg-[#0a0a0a] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="relative group overflow-hidden"
          >
            <Link to={category.path} className="block relative aspect-[3/4] sm:aspect-[4/5] w-full">
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.title} collection`}
                  className="w-full h-full object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 sm:p-10 lg:p-14 flex flex-col justify-end">
                <motion.span
                  className="text-[9px] tracking-[0.35em] uppercase text-white/40 font-bold mb-3 block"
                >
                  {category.subtitle}
                </motion.span>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3 leading-none uppercase">
                  {category.title}
                </h2>

                <p className="text-white/45 text-[13px] font-light mb-7">
                  {category.desc}
                </p>

                <div className="flex items-center gap-3 group/cta">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-black text-white/70 group-hover/cta:text-white transition-colors duration-300">
                    Shop {category.title}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover/cta:bg-white group-hover/cta:border-white transition-all duration-400">
                    <ArrowRight size={11} className="text-white group-hover/cta:text-black transition-colors duration-400" />
                  </div>
                </div>
              </div>

              {/* Divider line on left for second panel */}
              {idx === 1 && (
                <div className="absolute inset-y-0 left-0 w-[1px] bg-white/[0.06] hidden md:block" />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GenderBanner;