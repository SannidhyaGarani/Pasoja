import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Hero = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop',
      title: 'Autumn/Winter 2024',
      subtitle: 'Elevate your style with our latest collection',
      cta: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
      title: 'New Arrivals',
      subtitle: 'Fresh styles to refresh your wardrobe',
      cta: 'Explore'
    },
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop',
      title: 'End of Season Sale',
      subtitle: 'Up to 50% off on selected items',
      cta: 'Discover Deals'
    }
  ];

  return (
    <section className="relative h-[70vh] sm:h-[85vh] lg:h-[calc(100vh-140px)] w-full overflow-hidden mt-[90px] md:mt-[120px]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2EA] via-[#F7F2EA]/60 to-transparent" />
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-start px-6 md:px-12 lg:px-20">
              <div className="max-w-2xl">
                <p className="text-[#A85721] font-semibold tracking-[0.3em] uppercase text-sm mb-4">
                  New Season
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#5A2D0C] mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-[#333333] mb-10 max-w-lg">
                  {slide.subtitle}
                </p>
                <button className="group flex items-center gap-3 bg-[#A85721] text-[#F7F2EA] px-8 py-4 font-semibold text-lg hover:bg-[#C87A3A] transition-all duration-300">
                  {slide.cta}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20" />
    </section>
  );
};

export default Hero;
