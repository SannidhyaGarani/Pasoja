import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

const CollectionHighlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const pillars = [
    {
      id: "01",
      tag: "Pure Flax",
      title: "The Raw Linen Edit",
      desc: "Harvested ethically, unbleached, and woven loosely to preserve structural airflow. Designed for natural, dynamic drapes.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?fabric=linen"
    },
    {
      id: "02",
      tag: "Monochrome",
      title: "Architectural Neutrals",
      desc: "An exploration of geometric silhouettes draped in raw canvas, charcoal sand, and deep obsidian hues.",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?collection=neutrals"
    },
    {
      id: "03",
      tag: "Handmade",
      title: "The Artisanal Atelier",
      desc: "Small-batch pieces featuring hand-finished selvedge edges and mother-of-pearl buttons, crafted by master artisans.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?collection=atelier"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        
        <SectionHeader 
          title="Curated Collections"
          subtitle="The Blueprint"
        />

        {/* Master Showcase - Image first on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center mt-6 md:mt-10">
          
          {/* Image Block */}
          <div className="order-first lg:order-last">
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#F7F2EA] rounded-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={pillars[activeIndex].image}
                    alt={pillars[activeIndex].title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#5A2D0C]/15 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              
              {/* Active collection tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A2D0C]">
                  {pillars[activeIndex].tag}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation List */}
          <div className="divide-y divide-[#E6D8C3]/60 w-full">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`py-6 sm:py-7 first:pt-0 last:pb-0 cursor-pointer group transition-all duration-300 ${
                  activeIndex === idx ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-4 sm:gap-6">
                  <div className="space-y-2.5 max-w-md flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold tracking-wider text-[#A85721] font-mono">
                        {pillar.id}
                      </span>
                      <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase text-[#5A2D0C] bg-[#F7F2EA] px-2 py-0.5 rounded-sm">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold tracking-wide transition-colors duration-300 ${
                      activeIndex === idx ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]'
                    }`}>
                      {pillar.title}
                    </h3>
                    
                    {/* Expandable content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeIndex === idx ? 'max-h-[200px] opacity-100 pt-1' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-[13px] sm:text-sm text-[#333333]/70 leading-relaxed mb-3">
                        {pillar.desc}
                      </p>
                      <Link 
                        to={pillar.link}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-[#A85721] hover:text-[#5A2D0C] transition-colors group/link"
                      >
                        <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-[#A85721] after:origin-left hover:after:scale-x-0 after:transition-transform after:duration-300">
                          View Collection
                        </span>
                        <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-400 shrink-0 mt-1 ${
                    activeIndex === idx 
                      ? 'bg-[#5A2D0C] border-[#5A2D0C] text-white rotate-[-45deg]' 
                      : 'border-[#E6D8C3] text-[#E6D8C3] group-hover:border-[#5A2D0C]/30 group-hover:text-[#5A2D0C]/30'
                  }`}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CollectionHighlights;