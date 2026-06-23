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
      desc: "Harvested ethically, unbleached, and woven loosely to preserve structural airflow. Designed to dynamic drapes.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?fabric=linen"
    },
    {
      id: "02",
      tag: "Monochrome",
      title: "Architectural Neutrals",
      desc: "An exploration of geometric silhouettes draped entirely in raw canvas, charcoal sand, and deep obsidian hues.",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?collection=neutrals"
    },
    {
      id: "03",
      tag: "Handmade",
      title: "The Artisanal Atelier",
      desc: "Small-batch pieces featuring hand-finished selvedge edges and mother-of-pearl buttons attached by master hands.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?collection=atelier"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-100 overflow-hidden selection:bg-[#5A2D0C] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          title="The Blueprint of Our Design Philosophy"
          subtitle="Curated Foundations"
        />

        {/* Master Showcase Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8 sm:mt-12">
          
          {/* Right Block: High-End Cinematic Frame (Now Order First on Mobile) */}
          <div className="order-first lg:order-last lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-md aspect-square bg-[#F7F2EA] rounded-3xl overflow-hidden border border-neutral-100 p-3 sm:p-4 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="w-full h-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={pillars[activeIndex].image}
                    alt={pillars[activeIndex].title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Premium atmospheric subtle grading overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#5A2D0C]/20 via-transparent to-transparent mix-blend-multiply" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Left Block: Interactive Navigation List (Cols 1-6) */}
          <div className="lg:col-span-6 divide-y divide-neutral-100 w-full mt-4 lg:mt-0">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)} // Enables crisp tap changing targets for mobile screens
                className="py-6 sm:py-8 first:pt-0 last:pb-0 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4 sm:gap-6">
                  <div className="space-y-3 max-w-md flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-wider text-[#A85721]">
                        {pillar.id}
                      </span>
                      <span className="text-[10px] tracking-widest font-bold uppercase text-[#5A2D0C] bg-[#F7F2EA] px-2 py-0.5 rounded-sm">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-wide text-black transition-colors group-hover:text-[#A85721]">
                      {pillar.title}
                    </h3>
                    
                    {/* Collapsible Content Frame tied to index */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeIndex === idx ? 'max-h-[160px] opacity-100 pt-1' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-[#333333] font-medium leading-relaxed">
                        {pillar.desc}
                      </p>
                      <Link 
                        to={pillar.link}
                        className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-[#5A2D0C] mt-4 group/link underline underline-offset-4 decoration-[#A85721]"
                      >
                        <span>View Artifacts</span>
                        <ArrowUpRight size={14} className="text-[#A85721] group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Minimal indicator circle arrow */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
                    activeIndex === idx ? 'bg-[#5A2D0C] border-[#5A2D0C] text-white rotate-45' : 'border-[#D9D3C7] text-[#D9D3C7]'
                  }`}>
                    <ArrowRight size={15} />
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