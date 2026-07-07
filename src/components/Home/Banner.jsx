import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const EditorialStory = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F2EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

        {/* Editorial Frame Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Double Image Panel */}
          <div className="grid grid-cols-12 gap-3 sm:gap-5 relative">
            
            {/* Primary Large Image */}
            <motion.div 
              {...fadeInUp}
              className="col-span-7 aspect-[3/4] overflow-hidden rounded-sm relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Premium textile craftsmanship"
                className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A2D0C]/15 via-transparent to-transparent" />
            </motion.div>

            {/* Secondary Offset Image */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="col-span-5 aspect-[3/4] overflow-hidden rounded-sm mt-12 sm:mt-16 relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                alt="Artisanal fashion silhouette"
                className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A2D0C]/15 via-transparent to-transparent" />
            </motion.div>

            {/* Floating accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:-right-6 lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 z-10 bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3 rounded-sm shadow-lg"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold block text-[#A85721]">Since</span>
              <span className="text-xl font-bold">2024</span>
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy & Call to Action */}
          <div className="space-y-6 lg:pl-6">
            <motion.div {...fadeInUp}>
              <span className="text-[#A85721] font-semibold tracking-[0.3em] uppercase text-[10px] sm:text-[11px] mb-3 block">
                Our Philosophy
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-[1.2] tracking-tight">
                Conscious Craft,<br />Timeless Design
              </h3>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="space-y-4 text-[14px] sm:text-[15px] text-[#333333]/80 leading-relaxed"
            >
              <p>
                We believe premium garments should breathe with the skin. Every piece in our core collection originates from natural, raw materials — sourced responsibly and refined through precision craftsmanship.
              </p>
              <p className="hidden sm:block text-[#333333]/60">
                No rushed trends. No compromises. Just timeless pieces designed to outlast seasons while retaining architectural movement and structural integrity.
              </p>
            </motion.div>

            {/* Metadata Stats */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.15 }}
              className="grid grid-cols-2 gap-6 py-6 border-y border-[#5A2D0C]/10"
            >
              <div>
                <span className="block text-[10px] font-bold text-[#A85721] uppercase tracking-[0.25em] mb-1.5">Traceability</span>
                <span className="text-sm text-[#1a1a1a] font-bold">100% Verified Origins</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#A85721] uppercase tracking-[0.25em] mb-1.5">Production</span>
                <span className="text-sm text-[#1a1a1a] font-bold">Small-Batch Curated</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#5A2D0C] group-hover:text-[#A85721] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#A85721] after:origin-left after:scale-x-100 group-hover:after:scale-x-0 after:transition-transform after:duration-300">
                  Read Our Story
                </span>
                <div className="w-9 h-9 rounded-full border border-[#E6D8C3] flex items-center justify-center group-hover:bg-[#5A2D0C] group-hover:border-[#5A2D0C] transition-all duration-300">
                  <ArrowUpRight size={15} className="text-[#5A2D0C] group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialStory;