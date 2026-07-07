import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Shield, Heart, Compass, Leaf, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/Home/PageHeader';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Our Story"
        subtitle="Crafted with intention, designed for the modern wardrobe."
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
      />

      {/* HERO EDITORIAL SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image Grid */}
            <motion.div {...fadeInUp} className="grid grid-cols-12 gap-3 sm:gap-4">
              <div className="col-span-7 aspect-[3/4] overflow-hidden rounded-sm relative group">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop"
                  alt="Pasoja craftsmanship"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A2D0C]/10 via-transparent to-transparent" />
              </div>
              <div className="col-span-5 aspect-[3/4] overflow-hidden rounded-sm mt-10 sm:mt-14 relative group">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
                  alt="Pasoja studio"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A2D0C]/10 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-6 lg:pl-4">
              <motion.div {...fadeInUp}>
                <span className="text-[#A85721] font-semibold tracking-[0.3em] uppercase text-[10px] sm:text-[11px] mb-3 block">
                  — Our Philosophy —
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-[1.15] tracking-tight">
                  Fashion That Speaks<br />to Your Soul
                </h2>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="space-y-4 text-[14px] sm:text-[15px] text-[#333333]/75 leading-relaxed"
              >
                <p>
                  At Pasoja, we believe that fashion is more than fabric — it's an expression of identity. Every piece in our collection is thoughtfully designed to bridge the gap between contemporary style and timeless elegance.
                </p>
                <p>
                  We work directly with skilled artisans and ethically-conscious manufacturers, ensuring every stitch carries the weight of purpose and the lightness of effortless style.
                </p>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.15 }}
                className="grid grid-cols-2 gap-6 py-6 border-y border-[#E6D8C3]/60"
              >
                <div>
                  <span className="text-3xl font-bold text-[#A85721]">500+</span>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#5A2D0C]/50 font-semibold mt-1">Curated Designs</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-[#A85721]">10K+</span>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#5A2D0C]/50 font-semibold mt-1">Happy Customers</p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#5A2D0C] group-hover:text-[#A85721] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1.5px] after:bg-[#A85721] after:origin-left after:scale-x-100 group-hover:after:scale-x-0 after:transition-transform after:duration-300">
                    Explore Our Collection
                  </span>
                  <div className="w-9 h-9 rounded-full border border-[#E6D8C3] flex items-center justify-center group-hover:bg-[#5A2D0C] group-hover:border-[#5A2D0C] transition-all duration-300">
                    <ArrowUpRight size={15} className="text-[#5A2D0C] group-hover:text-white transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-16 md:py-20 bg-[#F7F2EA]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#A85721] font-semibold tracking-[0.35em] uppercase text-[10px] sm:text-[11px] mb-4 block"
            >
              — What Defines Us —
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight"
            >
              Our Core Values
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-12 h-[2px] bg-[#A85721] mx-auto mt-5 origin-center"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                icon: Gem,
                title: "Premium Quality",
                desc: "Every garment is crafted with the finest fabrics, rigorously tested for durability and comfort."
              },
              {
                icon: Leaf,
                title: "Sustainable Fashion",
                desc: "We prioritize ethical sourcing and eco-friendly production to minimize our environmental footprint."
              },
              {
                icon: Heart,
                title: "Crafted with Love",
                desc: "Our artisans pour passion into every stitch, creating pieces that are truly one-of-a-kind."
              },
              {
                icon: Compass,
                title: "Timeless Design",
                desc: "We design beyond trends — creating versatile pieces that remain stylish season after season."
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group bg-white rounded-sm p-6 sm:p-7 border border-[#E6D8C3]/40 hover:border-[#A85721]/20 hover:shadow-md transition-all duration-400"
                >
                  <div className="w-11 h-11 rounded-full bg-[#F7F2EA] border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mb-5 group-hover:bg-[#5A2D0C] group-hover:text-white group-hover:border-[#5A2D0C] transition-all duration-400">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wide mb-2 group-hover:text-[#A85721] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[13px] text-[#333333]/60 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL WIDTH IMAGE BANNER */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop"
          alt="Pasoja atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a0e05]/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/70 text-[11px] uppercase tracking-[0.4em] font-semibold mb-4">Our Promise</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-[1.15] tracking-tight">
              Designed to Inspire.<br />Built to Last.
            </h2>
            <div className="w-10 h-[2px] bg-[#A85721] mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[#A85721] font-semibold tracking-[0.35em] uppercase text-[10px] sm:text-[11px] mb-4 block">
              — Our Journey —
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">
              Milestones That Define Us
            </h2>
          </div>

          <div className="space-y-0">
            {[
              { year: "2024", title: "The Beginning", desc: "Pasoja was born from a vision to redefine affordable luxury in Indian fashion." },
              { year: "2024", title: "First Collection", desc: "Launched our debut collection with 50+ handcrafted pieces, sold out within weeks." },
              { year: "2025", title: "Growing Community", desc: "Reached 10,000+ satisfied customers and expanded our collection to 500+ designs." },
              { year: "2025", title: "Looking Ahead", desc: "Expanding into new categories while staying true to our commitment to quality and sustainability." },
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-5 sm:gap-8 group py-6 border-b border-[#E6D8C3]/40 last:border-0"
              >
                <div className="shrink-0 pt-1">
                  <span className="text-[11px] font-bold text-[#A85721] tracking-wider font-mono bg-[#F7F2EA] px-2.5 py-1 rounded-sm">
                    {milestone.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-base font-bold text-[#1a1a1a] mb-1 group-hover:text-[#A85721] transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="text-[13px] text-[#333333]/60 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
