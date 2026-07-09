import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import SectionHeader from './SectionHeader';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    title: 'Neo-Street Edit',
    subtitle: 'Fall/Winter Campaign'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    title: 'Luxury Silhouette',
    subtitle: 'Atelier Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    title: 'Summer Atelier',
    subtitle: 'Raw Linen Focus'
  },
  {
    image: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=800&auto=format&fit=crop',
    title: 'Structured Tailoring',
    subtitle: 'Architectural Cuts'
  },
  {
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop',
    title: 'Monochrome Canvas',
    subtitle: 'Minimalist Separates'
  },
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    title: 'Avant Garde Fit',
    subtitle: 'Limited Editions'
  },
  {
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    title: 'Sartorial Form',
    subtitle: 'Tailored Men Edit'
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    title: 'The Divine Drape',
    subtitle: 'Classic Fluid Silhouettes'
  }
];

const GallerySwiper = () => {
  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden relative border-t border-white/[0.03]">
      {/* Premium ambient decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#fff/[0.01],transparent_40%)] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-white/[0.005] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
        
        <SectionHeader 
          subtitle="Editorial Visuals"
          title="Campaign Showcase"
          description="A photographic narrative exploring architectural forms, raw fabric grains, and high-contrast styling."
        />

        <div className="relative w-full py-8 gallery-swiper">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: -20,
              depth: 250,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full overflow-visible"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx} className="relative rounded-[24px] overflow-hidden border border-white/[0.05] bg-[#0c0c0c] shadow-2xl">
                {/* Image */}
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
                />

                {/* Dark Vignette Wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 z-10" />

                {/* Coverflow content overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-white/50 mb-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {slide.subtitle}
                  </span>
                  <h4 className="text-xl md:text-2xl font-light text-white tracking-widest uppercase leading-none">
                    {slide.title}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Styled overrides for the custom swiper structure */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-swiper .swiper {
            overflow: visible !important;
          }
          .gallery-swiper .swiper-slide {
            width: 260px;
            height: 380px;
            opacity: 1;
            filter: brightness(0.9);
            transform: scale(0.9);
            transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          @media (min-width: 640px) {
            .gallery-swiper .swiper-slide {
              width: 360px;
              height: 480px;
            }
          }
          .gallery-swiper .swiper-slide-active {
            opacity: 1;
            filter: brightness(1.05);
            transform: scale(1.05);
            border-color: rgba(255, 255, 255, 0.3);
            box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8), 0 0 50px rgba(255,255,255,0.05);
            z-index: 10;
          }
          .gallery-swiper .swiper-pagination {
            position: relative !important;
            bottom: 0 !important;
            margin-top: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
          }
          .gallery-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.15) !important;
            width: 5px;
            height: 5px;
            opacity: 1;
            margin: 0 !important;
            transition: all 0.4s ease;
          }
          .gallery-swiper .swiper-pagination-bullet-active {
            background: #ffffff !important;
            width: 24px;
            border-radius: 3px;
          }
        `
      }} />
    </section>
  );
};

export default GallerySwiper;
