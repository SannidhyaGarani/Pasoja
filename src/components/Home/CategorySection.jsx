import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../Home/SectionHeader';

const categories = [
  {
    id: 1,
    title: 'T-Shirts',
    subtitle: 'Everyday Essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=tshirts',
  },
  {
    id: 2,
    title: 'Jeans',
    subtitle: 'Denim Refined',
    image: 'https://images.unsplash.com/photo-1542272604-780c8d52a5ce?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=jeans',
  },
  {
    id: 3,
    title: 'Trousers',
    subtitle: 'Modern Tailoring',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=trousers',
  },
  {
    id: 4,
    title: 'Shirts',
    subtitle: 'Classic Precision',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=shirts',
  },
  {
    id: 5,
    title: 'Jackets',
    subtitle: 'Contemporary Warmth',
    image: 'https://res.cloudinary.com/duzwys877/image/upload/v1783595079/ChatGPT_Image_Jul_9_2026_04_33_24_PM_nudlxb.png',
    link: '/shop?category=jackets',
  },
  {
    id: 6,
    title: 'Sweaters',
    subtitle: 'Finest Knitwear',
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=sweaters',
  },
  {
    id: 7,
    title: 'Coats',
    subtitle: 'Structured Outerwear',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=coats',
  },
  {
    id: 8,
    title: 'Accessories',
    subtitle: 'Complete The Look',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=accessories',
  },
  {
    id: 9,
    title: 'Dresses',
    subtitle: 'Elegant Silhouettes',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
    link: '/shop?category=dresses',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const CategorySection = () => {
  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[#0a0a0a] overflow-hidden relative border-t border-white/[0.03]">
      {/* Decorative ambient lighting backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#fff]/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
        
        <div className="-mb-8 md:-mb-10">
          <SectionHeader 
            subtitle="The Collection"
            title="Explore By Category"
            description="Curated separates crafted for uncompromising quality and fit."
          />
        </div>

        {/* Premium Grid Layout - 3 columns on mobile, 4 columns on larger devices */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-6 lg:gap-8"
        >
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id} 
              variants={itemVariants}
              className="relative group block"
            >
              <Link to={cat.link} className="block relative overflow-hidden cursor-pointer">
                {/* Aspect Ratio Container (Portrait fashion look) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111] border border-white/[0.04]">
                  {/* Image */}
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-[1500ms] ease-[0.25,0.46,0.45,0.94]"
                  />
                  
                  {/* Number styling top left */}
                  <div className="absolute top-2.5 left-2.5 sm:top-6 sm:left-6 z-20 text-[8px] sm:text-[10px] font-mono tracking-widest text-white/30 group-hover:text-white/80 transition-colors duration-500">
                    0{index + 1}
                  </div>

                  {/* Corner indicator button top right */}
                  <div className="absolute top-2.5 right-2.5 sm:top-6 sm:right-6 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ArrowUpRight size={10} className="transform group-hover:text-black transition-transform duration-300 sm:w-[12px] sm:h-[12px]" />
                  </div>

                  {/* Premium gradient overlay specifically for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-80" />
                  
                  {/* Inline micro border design inside the image box */}
                  <div className="absolute inset-2 sm:inset-3 border border-white/0 group-hover:border-white/5 z-20 transition-all duration-700 pointer-events-none" />
                </div>
                
                {/* Content details overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-2 sm:p-6 md:p-8 pointer-events-none">
                  <span className="text-[7px] sm:text-[9px] uppercase font-bold tracking-[0.18em] sm:tracking-[0.25em] text-white/40 mb-1 sm:mb-2 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-light text-white uppercase tracking-widest leading-none transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {cat.title}
                  </h3>
                  <div className="w-0 group-hover:w-10 h-[1px] bg-white/40 mt-2 sm:mt-3 transition-all duration-500 ease-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default CategorySection;
