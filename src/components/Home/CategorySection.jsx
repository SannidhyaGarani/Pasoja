import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';

const CategorySection = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'shop_by_category'), orderBy('sort_order', 'asc'));
        const snap = await getDocs(q);
        if (snap.empty) {
          // Auto-seed default categories if empty
          const defaults = [
            { id: 'cat_1', title: 'MENS', image: '/img/mens_category.jpg', link: '/shop?category=Men', sort_order: 1, is_active: true, position: 'left' },
            { id: 'cat_2', title: 'WOMENS', image: '/img/womens_category.jpg', link: '/shop?category=Women', sort_order: 2, is_active: true, position: 'right' }
          ];
          for (const item of defaults) {
            await setDoc(doc(db, 'shop_by_category', item.id), item);
          }
          setBanners(defaults);
        } else {
          const list = snap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.is_active !== false);
          // Set positions dynamically for rendering (first is left, second is right)
          const positionedList = list.map((item, index) => ({
            ...item,
            position: index % 2 === 0 ? 'left' : 'right'
          }));
          setBanners(positionedList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading || banners.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden relative border-t border-white/[0.03]">
      {/* Ambient lighting backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-zinc-500 uppercase mb-2 font-medium">
            THE COLLECTION
          </p>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
            <div className="flex items-center flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-[0.15em] text-white uppercase whitespace-nowrap">
                SHOP BY CATEGORY
              </h2>
              <div className="hidden md:block flex-1 h-[1px] bg-zinc-800/80 ml-8 mr-4 self-center mt-1" />
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm tracking-wide max-w-[320px] text-left md:text-right font-light leading-relaxed">
              Curated separates crafted for uncompromising quality and fit.
            </div>
          </div>
        </div>

        {/* Category Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] md:gap-[14px]">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full"
            >
              <Link
                to={banner.link}
                className="relative group block overflow-hidden bg-[#111] w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[1.3/1] border border-white/[0.03]"
              >
                {/* Hero Product Image */}
                <img
                  src={banner.image}
                  alt={`${banner.title} collection`}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 transition-all duration-[700ms] ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08] group-hover:opacity-90"
                />

                {/* Subtle dark gradient overlay at bottom for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Decorative Details: Large Outlined Number */}
                <span
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 font-light leading-none select-none text-[7rem] sm:text-[9rem] md:text-[11rem] pointer-events-none"
                  style={{
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                    color: 'transparent'
                  }}
                >
                  {`0${index + 1}`}
                </span>

                {/* Decorative Details: Vertically Rotated NEW COLLECTION */}
                {banner.position === 'left' ? (
                  <div
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center select-none pointer-events-none"
                    style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg) translateY(50%)' }}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-white/20 uppercase font-mono">
                      NEW COLLECTION
                    </span>
                  </div>
                ) : (
                  <div
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center select-none pointer-events-none"
                    style={{ writingMode: 'vertical-lr' }}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-white/20 uppercase font-mono">
                      NEW COLLECTION
                    </span>
                  </div>
                )}

                {/* Bottom Left Content */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex flex-col items-start pointer-events-none">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white uppercase tracking-[0.15em] leading-none mb-3">
                    {banner.title}
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-white uppercase font-semibold border-b border-white/60 pb-0.5">
                      SHOP NOW
                    </span>
                    <span className="text-white/80 text-sm transform transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                      &rarr;
                    </span>
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

export default CategorySection;
