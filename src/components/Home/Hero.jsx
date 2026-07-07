import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop',
      tag: 'AW 2025 Collection',
      title: 'Define\nYour Elegance',
      subtitle: 'Curated silhouettes crafted from the finest fabrics for the modern connoisseur.',
      cta: 'Shop the Collection',
      ctaLink: '/shop'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
      tag: 'Just Dropped',
      title: 'New Season\nArrivals',
      subtitle: 'Fresh perspectives on timeless design. Explore pieces that transcend trends.',
      cta: 'Explore Now',
      ctaLink: '/shop?filter=new'
    },
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop',
      tag: 'Limited Edition',
      title: 'The Artisan\nEdit',
      subtitle: 'Handcrafted exclusives with meticulous detailing. Up to 50% off select pieces.',
      cta: 'Discover Deals',
      ctaLink: '/shop?filter=sale'
    }
  ];

  const startAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    startAutoplay();
  };

  const goNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoplay();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoplay();
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, scale: 1.08, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, scale: 0.95, x: dir > 0 ? -60 : 60 }),
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[85vh] sm:h-[90vh] lg:h-[calc(100vh-80px)] w-full overflow-hidden mt-[76px] md:mt-[118px]">
      {/* Background Image with Ken Burns */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
        >
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Sophisticated gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1a0e05]/70 via-[#1a0e05]/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1a0e05]/40 via-transparent to-[#1a0e05]/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span className="w-8 h-[1px] bg-[#A85721]" />
                  <span className="text-[#A85721] font-semibold tracking-[0.3em] uppercase text-[10px] sm:text-[11px]">
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-base sm:text-lg text-white/75 mb-8 max-w-md leading-relaxed font-light"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Link
                    to={slide.ctaLink}
                    className="group inline-flex items-center gap-3 bg-[#A85721] hover:bg-[#C87A3A] text-white px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-[15px] font-semibold tracking-wide uppercase transition-all duration-400 rounded-sm shadow-lg shadow-[#A85721]/20"
                  >
                    {slide.cta}
                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-8 sm:pb-10">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="relative group"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`h-[2px] transition-all duration-500 ${
                    idx === currentSlide ? 'w-10 bg-[#A85721]' : 'w-5 bg-white/30 group-hover:bg-white/60'
                  }`} />
                </button>
              ))}
              <span className="text-white/50 text-[11px] tracking-wider font-medium ml-3 hidden sm:inline">
                {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 text-white/70 hover:border-[#A85721] hover:text-[#A85721] hover:bg-white/5 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 text-white/70 hover:border-[#A85721] hover:text-[#A85721] hover:bg-white/5 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
