import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Blogger",
    text: "The quality is truly remarkable. The fabrics feel incredibly premium and the fit is perfect. Pasoja has become my absolute go-to brand.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Rahul Mehta",
    role: "Verified Buyer",
    text: "Fast delivery, excellent customer service, and the clothes are exactly as pictured. I've ordered multiple times and never been disappointed.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Ananya Patel",
    role: "Style Consultant",
    text: "The attention to detail is impeccable. From the stitching to the packaging, everything exudes luxury. Worth every single penny!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Vikram Singh",
    role: "Verified Buyer",
    text: "Outstanding selection and incredible value. The return process was seamless too. Highly recommend for anyone who values quality apparel.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#F7F2EA]">
      {/* Subtle decorative elements */}
      <div className="absolute top-12 right-12 text-[#A85721]/5 hidden lg:block">
        <Quote size={180} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Testimonials"
        />

        <div className="relative mt-8 md:mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testimonial-dots' }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1200: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-14"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <div className="bg-white rounded-sm p-6 sm:p-7 h-full flex flex-col border border-[#E6D8C3]/40 shadow-sm hover:shadow-md transition-shadow duration-400">
                    {/* Stars Row */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#A85721] text-[#A85721]" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-[14px] sm:text-[15px] text-[#333333]/80 leading-relaxed flex-1 mb-6">
                      "{item.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-[#E6D8C3]/40">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F7F2EA] shrink-0 ring-2 ring-[#E6D8C3]/30 ring-offset-1">
                        <img src={item.avatar} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{item.name}</h4>
                        <p className="text-[10px] text-[#A85721] uppercase tracking-[0.2em] font-semibold mt-0.5">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination Dots */}
          <div className="testimonial-dots flex justify-center gap-2 mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
