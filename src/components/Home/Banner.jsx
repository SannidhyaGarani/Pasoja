import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const EditorialStory = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <section className="py-24 bg-white border-t border-neutral-100 overflow-hidden selection:bg-[#5A2D0C] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          title="Conscious Lines, Uncompromised Structure"
          subtitle="Our Design Philosophy"
        />

        {/* Editorial Frame Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetrical Double Image Panel (Cols 1-7) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 sm:gap-6 relative">
            
            {/* Background Structural Text Indicator */}
            <div className="absolute -left-4 top-10 text-[100px] font-sans font-bold text-neutral-50 tracking-tighter select-none pointer-events-none hidden xl:block uppercase">
              STUDIO
            </div>

            {/* Primary Large Image */}
            <motion.div 
              {...fadeInUp}
              className="col-span-8 aspect-[3/4] bg-neutral-50 overflow-hidden rounded-2xl shadow-sm relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Organic linen textile detail close-up"
                className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-950/5 transition-opacity duration-500 group-hover:opacity-10" />
            </motion.div>

            {/* Secondary Offset Image */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="col-span-4 aspect-[2/3] bg-neutral-50 overflow-hidden rounded-2xl shadow-md mt-20 sm:mt-28 relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                alt="Minimalist tailored apparel movement silhouette"
                className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-950/5 transition-opacity duration-500 group-hover:opacity-10" />
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy & Call to Action (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-8 lg:pl-4">
            <motion.div {...fadeInUp} className="space-y-4">
             
             
              <h3 className="text-2xl font-bold text-black leading-snug">
                Sustainable Craftsmanship
              </h3>
            </motion.div>

            {/* Editorial Paragraphs */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="space-y-4 text-sm text-[#333333] font-medium leading-relaxed"
            >
              <p>
                We believe premium garments should breathe with the skin. Every piece in our core collection originates from natural, raw structural elements—sourced responsibly and refined carefully through precision engineering.
              </p>
              <p className="hidden sm:block">
                No rushed trends. No chemical micro-glues. Just timeless drapes mapped explicitly to outlast seasonal metrics while retaining architectural movement integrity.
              </p>
            </motion.div>

            {/* Interactive Luxury Metadata Tracker */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.15 }}
              className="grid grid-cols-2 gap-4 border-t border-b border-neutral-100 py-6"
            >
              <div>
                <span className="block text-xs font-bold text-[#A85721] uppercase tracking-widest mb-1">Traceability</span>
                <span className="text-sm text-black font-semibold">100% Verified Origins</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-[#A85721] uppercase tracking-widest mb-1">Production Loop</span>
                <span className="text-sm text-black font-semibold">Small-Batch Curated</span>
              </div>
            </motion.div>

            {/* Action Frame */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="pt-2"
            >
              <Link
                to="/sustainability"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-bold text-[#5A2D0C] group"
              >
                <span className="relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#A85721] after:transform after:scale-x-100 group-hover:after:scale-x-0 after:origin-left after:transition-transform after:duration-300">
                  Read Our Framework Story
                </span>
                <div className="w-10 h-10 rounded-full border border-[#D9D3C7] flex items-center justify-center group-hover:bg-[#5A2D0C] group-hover:border-[#5A2D0C] transition-all duration-300">
                  <ArrowUpRight size={18} className="text-[#5A2D0C] group-hover:text-white transition-colors duration-300" />
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