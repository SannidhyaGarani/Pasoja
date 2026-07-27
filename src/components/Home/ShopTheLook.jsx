import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';

import 'swiper/css';

const ShopTheLook = () => {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchLooks = async () => {
      try {
        const q = query(collection(db, 'shop_the_look'), orderBy('sort_order', 'asc'));
        const snap = await getDocs(q);
        if (snap.empty) {
          // Auto-seed default campaign look cards if collection is empty
          const defaults = [
            { id: 'look_1', title: 'TEES', image: '/img/look_tees.jpg', link: '/shop?category=T-Shirts', sort_order: 1, is_active: true },
            { id: 'look_2', title: 'JEANS', image: '/img/look_jeans.jpg', link: '/shop?category=Jeans', sort_order: 2, is_active: true },
            { id: 'look_3', title: 'HOODIES', image: '/img/look_hoodies.jpg', link: '/shop?category=Hoodies', sort_order: 3, is_active: true },
            { id: 'look_4', title: 'SETS', image: '/img/look_sets.jpg', link: '/shop?category=Sets', sort_order: 4, is_active: true }
          ];
          for (const item of defaults) {
            await setDoc(doc(db, 'shop_the_look', item.id), item);
          }
          setLooks(defaults);
        } else {
          const list = snap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.is_active !== false);
          setLooks(list);
        }
      } catch (error) {
        console.error("Error loading Shop The Look data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLooks();
  }, []);

  if (loading || looks.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden relative border-t border-white/[0.03]">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] text-zinc-500 uppercase mb-2 font-medium">
                SHOP THE LOOK
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-[0.15em] text-white uppercase whitespace-nowrap leading-none">
                CURATED FITS. MADE TO STAND OUT.
              </h2>
            </div>
            <div className="hidden md:block flex-1 h-[1px] bg-zinc-800/80 mb-2" />
          </div>
          
          <div className="flex items-center gap-6 self-start md:self-auto">
            <p className="text-zinc-400 text-xs sm:text-sm tracking-wide max-w-[280px] font-light leading-relaxed text-left md:text-right">
              Handpicked pieces styled for impact. Explore the looks.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-300 cursor-pointer lg:hidden"
              >
                &larr;
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-300 cursor-pointer lg:hidden"
              >
                &rarr;
              </button>
              {/* Desktop minimalist arrow element */}
              <div className="hidden lg:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/60">
                <span className="text-sm">&rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Banner Panels */}
        {/* Desktop View: 4 Columns side-by-side with very small gaps */}
        <div className="hidden lg:grid grid-cols-4 gap-[8px] w-full">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              <Link
                to={look.link}
                className="relative group block overflow-hidden bg-[#111] aspect-[3/4] w-full"
              >
                {/* Campaign Image */}
                <img
                  src={look.image}
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.03] group-hover:brightness-[1.05]"
                />

                {/* Subtle dark gradient overlay at bottom for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Left Content */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] text-white uppercase font-semibold">
                    {look.title}
                  </span>
                  <span className="text-white/80 text-sm transform transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tablet/Mobile View: Swiper Carousel (1.15 visible panels) */}
        <div className="lg:hidden w-full">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={8}
            slidesPerView={1.15}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 8,
              },
            }}
            className="w-full overflow-visible"
          >
            {looks.map((look) => (
              <SwiperSlide key={look.id}>
                <Link
                  to={look.link}
                  className="relative group block overflow-hidden bg-[#111] aspect-[3/4] w-full"
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
                    <span className="text-[10px] tracking-[0.25em] text-white uppercase font-semibold">
                      {look.title}
                    </span>
                    <span className="text-white/80 text-sm">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default ShopTheLook;
