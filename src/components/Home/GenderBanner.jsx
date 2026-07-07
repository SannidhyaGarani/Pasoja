import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GenderBanner = () => {
  const categories = [
    {
      title: "Women",
      subtitle: "The Fluid Collection",
      desc: "Graceful silhouettes for every occasion",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
      path: "/shop?category=Women"
    },
    {
      title: "Men",
      subtitle: "The Structural Form",
      desc: "Refined essentials, tailored precision",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
      path: "/shop?category=Men"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative group overflow-hidden rounded-sm"
            >
              <Link to={category.path} className="block relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[5/6] w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.title} collection`}
                    className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                  />
                  {/* Cinematic overlay layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e05]/70 via-[#1a0e05]/10 to-transparent" />
                  <div className="absolute inset-0 bg-[#5A2D0C]/5 mix-blend-multiply" />
                </div>

                {/* Content HUD */}
                <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end text-white">
                  {/* Subtitle reveal on hover */}
                  <motion.span
                    className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#A85721] font-semibold mb-2 block"
                  >
                    {category.subtitle}
                  </motion.span>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 leading-none">
                    {category.title}
                  </h2>

                  <p className="text-white/60 text-[13px] sm:text-sm font-light mb-5 max-w-[250px]">
                    {category.desc}
                  </p>
                  
                  {/* CTA Link */}
                  <div className="flex items-center gap-2.5 group/cta">
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-bold text-white/90 group-hover/cta:text-[#A85721] transition-colors duration-300 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-white/30 after:origin-left group-hover/cta:after:bg-[#A85721] after:transition-colors after:duration-300">
                      Shop {category.title}
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/25 flex items-center justify-center group-hover/cta:bg-[#A85721] group-hover/cta:border-[#A85721] transition-all duration-300">
                      <ArrowRight size={12} className="text-white transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenderBanner;