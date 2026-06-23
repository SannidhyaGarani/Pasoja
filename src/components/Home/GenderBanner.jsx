import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GenderBanner = () => {
  const categories = [
    {
      title: "Women",
      subtitle: "The Fluid Collection",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
      path: "/shop?category=Women"
    },
    {
      title: "Men",
      subtitle: "The Structural Form",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
      path: "/shop?category=Men"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative group overflow-hidden bg-neutral-50"
            >
              <Link to={category.path} className="block relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full">
                {/* Background Image Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.title} editorial campaign`}
                    className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle editorial cinematic overlay */}
                  <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
                </div>

                {/* Minimalist Editorial Content HUD */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end items-start text-white">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-200/90 font-medium mb-1.5 block transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    {category.subtitle}
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-5">
                    {category.title}
                  </h2>
                  
                  {/* Premium Underline Link Reveal */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium group/btn">
                    <span className="relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-100 group-hover/btn:after:scale-x-0 after:origin-left after:transition-transform after:duration-300">
                      Discover Collection
                    </span>
                    <ArrowRight 
                      size={13} 
                      className="transform -translate-x-1 group-hover/btn:translate-x-0.5 transition-transform duration-300" 
                    />
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