import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import SectionHeader from '../Home/SectionHeader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden relative border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
        
        <SectionHeader 
          subtitle="The Collection"
          title="Explore By Category"
          description="Curated separates crafted for uncompromising quality and fit."
        />

        {/* Swiper Slider */}
        <div className="relative group category-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={false}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: '.cat-next',
              prevEl: '.cat-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 48,
              },
            }}
            className="w-full !overflow-visible"
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={cat.id} className="transition-all duration-700">
                <Link to={cat.link} className="block relative group/slide overflow-hidden cursor-pointer">
                  {/* Aspect Ratio Container (Portrait fashion look) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111111]">
                    <img 
                      src={cat.image} 
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/slide:opacity-100 group-hover/slide:scale-105 transition-all duration-1000 ease-[0.25,0.46,0.45,0.94]"
                    />
                    
                    {/* Number styling top right */}
                    <div className="absolute top-6 right-6 z-20 text-[10px] font-black tracking-widest text-white/40 uppercase group-hover/slide:text-white transition-colors duration-500">
                      0{index + 1}
                    </div>

                    {/* Gradient overlay specifically for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-700 group-hover/slide:opacity-80" />
                  </div>
                  
                  {/* Content block outside image for cleaner editorial layout on large screens, or inside. Let's do inside for impact */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 mb-2 transform translate-y-4 opacity-0 group-hover/slide:translate-y-0 group-hover/slide:opacity-100 transition-all duration-500 delay-100">
                      {cat.subtitle}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-light text-white uppercase tracking-widest leading-none transform translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500 ease-out">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <div className="flex items-center gap-4 mt-12 justify-end w-full">
            <button className="cat-prev w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white pointer-events-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </button>
            <button className="cat-next w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white pointer-events-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CategorySection;
