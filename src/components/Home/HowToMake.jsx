import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SectionHeader from './SectionHeader';
import 'swiper/css';
import 'swiper/css/pagination';

const steps = [
  {
    number: "01",
    title: "Browse Our Collection",
    subtitle: "Discover your style",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Select Your Size",
    subtitle: "Find the perfect fit",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Add to Cart & Checkout",
    subtitle: "Secure payment",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Receive & Enjoy",
    subtitle: "Style delivered",
    image: "https://images.unsplash.com/photo-1475178626719-271054e29e96?q=80&w=800&auto=format&fit=crop"
  }
];

const HowToMake = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#E6D8C3]">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#5A2D0C_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          title="How It Works"
          subtitle="Simple & Easy Shopping"
        />

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative mt-16">
          {/* Connecting Line */}
          <div className="absolute top-16 left-8 right-8 h-[1px] bg-[#E6D8C3] pointer-events-none z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.8 }}
              className="group flex flex-col items-center w-full text-center relative z-10"
            >
              {/* Step Number */}
              <div className="w-12 h-12 rounded-full bg-[#A85721] text-[#F7F2EA] flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-[#A85721]/20">
                {step.number}
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[3/4] max-w-xs bg-[#F7F2EA] border border-[#E6D8C3] rounded-2xl p-2 mb-6 group-hover:border-[#A85721] transition-all duration-300 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <p className="text-[12px] font-poppins font-bold uppercase tracking-[0.25em] text-[#A85721] mb-2">
                {step.subtitle}
              </p>
              <h3 className="font-poppins text-xl font-bold text-[#5A2D0C] leading-tight">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Carousel */}
        <div className="block lg:hidden mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.8 },
              1024: { slidesPerView: 3.2 },
            }}
            className="pb-10"
          >
            {steps.map((step) => (
              <SwiperSlide key={step.number} className="h-auto">
                <div className="group flex flex-col items-center w-full text-center px-2">
                  <div className="w-12 h-12 rounded-full bg-[#A85721] text-[#F7F2EA] flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-[#A85721]/20">
                    {step.number}
                  </div>
                  
                  <div className="relative w-full aspect-[3/4] max-w-xs bg-[#F7F2EA] border border-[#E6D8C3] rounded-2xl p-2 mb-6 overflow-hidden mx-auto">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <p className="text-[12px] font-poppins font-bold uppercase tracking-[0.25em] text-[#A85721] mb-2">
                    {step.subtitle}
                  </p>
                  <h3 className="font-poppins text-lg font-bold text-[#5A2D0C] leading-tight">
                    {step.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HowToMake;
