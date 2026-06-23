import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Blogger",
    text: "The quality is amazing! The fabrics feel so premium and the fit is perfect. This has quickly become my go-to brand for all my fashion needs.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Rahul Mehta",
    role: "Verified Buyer",
    text: "Fast delivery, excellent customer service, and the clothes are exactly as pictured. I've already ordered multiple times and never been disappointed.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Ananya Patel",
    role: "Designer",
    text: "The attention to detail is impeccable. From the stitching to the packaging, everything screams luxury. Worth every penny!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Vikram Singh",
    role: "Verified Buyer",
    text: "Great selection and amazing prices. The return process was super easy too. Highly recommend to anyone looking for quality apparel.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Real Reviews"
        />

        <div className="relative mt-16">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.testimonial-next',
              prevEl: '.testimonial-prev',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testimonial-pagination' }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative h-full"
                >
                  <div className="bg-white border border-neutral-100 rounded-2xl p-8 h-full">
                    {/* Quote Icon */}
                    <div className="text-[#A85721]/30 mb-4">
                      <Quote size={32} />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#A85721] text-[#A85721]" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-[#333333] leading-relaxed mb-8 text-lg">
                      "{item.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full border-2 border-neutral-100 overflow-hidden bg-gray-100">
                        <img src={item.avatar} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div>
                        <h4 className="font-poppins font-bold text-black">{item.name}</h4>
                        <p className="text-[12px] text-[#A85721] uppercase tracking-[0.2em] font-semibold">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button className="testimonial-prev w-12 h-12 bg-white border border-neutral-200 text-neutral-700 rounded-full flex items-center justify-center hover:bg-[#A85721] hover:text-white hover:border-[#A85721] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="testimonial-pagination flex justify-center gap-2" />
            <button className="testimonial-next w-12 h-12 bg-white border border-neutral-200 text-neutral-700 rounded-full flex items-center justify-center hover:bg-[#A85721] hover:text-white hover:border-[#A85721] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
