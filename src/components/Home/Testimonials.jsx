import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Fashion Blogger',
    text: 'The quality is truly remarkable. The fabrics feel incredibly premium and the fit is perfect. Pasoja has become my absolute go-to brand.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Rahul Mehta',
    role: 'Verified Buyer',
    text: 'Fast delivery, excellent customer service, and the clothes are exactly as pictured. I\'ve ordered multiple times and never been disappointed.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Ananya Patel',
    role: 'Style Consultant',
    text: 'The attention to detail is impeccable. From the stitching to the packaging, everything exudes luxury. Worth every single penny!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    name: 'Vikram Singh',
    role: 'Verified Buyer',
    text: 'Outstanding selection and incredible value. The return process was seamless too. Highly recommend for anyone who values quality apparel.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-[#111111] overflow-hidden relative">
      {/* Decorative large text */}
      <div className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] leading-none select-none pointer-events-none hidden lg:block" aria-hidden>
        ★
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 relative z-10">

        {/* Header */}
        <div className="pb-10 border-b border-white/[0.06] mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-bold block mb-3">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testimonial-dots' }}
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="h-full"
                >
                  <div className="bg-[#191919] border border-white/[0.06] p-7 h-full flex flex-col hover:border-white/[0.12] transition-colors duration-400">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-white text-white" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-[14px] text-white/50 leading-relaxed flex-1 mb-7">
                      "{item.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                      <div className="w-10 h-10 overflow-hidden bg-white/5 shrink-0 rounded-sm">
                        <img src={item.avatar} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-white leading-tight">{item.name}</h4>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-semibold mt-0.5">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="testimonial-dots flex justify-center gap-2 mt-2 [&>.swiper-pagination-bullet]:w-1 [&>.swiper-pagination-bullet]:h-1 [&>.swiper-pagination-bullet]:rounded-none [&>.swiper-pagination-bullet]:bg-white/20 [&>.swiper-pagination-bullet-active]:bg-white [&>.swiper-pagination-bullet-active]:w-6" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
