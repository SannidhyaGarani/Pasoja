import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, X, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/Home/PageHeader';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const communicationChannels = [
    { icon: Mail, label: "Email Us", val: "hello@pasoja.com", href: "mailto:hello@pasoja.com", desc: "We reply within 24 hours" },
    { icon: Phone, label: "Call Us", val: "+91 98765 43210", href: "tel:+919876543210", desc: "Mon–Sat, 10am – 7pm IST" },
    { icon: MapPin, label: "Visit Us", val: "Mumbai, Maharashtra", href: "#", desc: "123 Fashion Street, 400001" }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Get In Touch"
        subtitle="We'd love to hear from you. Reach out anytime."
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Success Toast */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm w-auto"
          >
            <div className="w-7 h-7 rounded-full bg-[#A85721]/30 flex items-center justify-center shrink-0">
              <CheckCircle size={14} />
            </div>
            <p className="text-[13px] font-semibold">Message sent successfully! We'll respond shortly.</p>
            <button onClick={() => setFormSubmitted(false)} className="opacity-60 hover:opacity-100 transition-opacity ml-2 shrink-0">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Contact Channels */}
          <motion.div
            {...fadeInUp}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[#A85721] font-semibold tracking-[0.3em] uppercase text-[10px] sm:text-[11px] mb-3 block">
                — Reach Out —
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight leading-[1.15]">
                We're Here<br />to Help
              </h2>
              <p className="text-[14px] text-[#333333]/60 mt-3 leading-relaxed max-w-sm">
                Whether you have a question about sizing, need styling advice, or want to discuss a bulk order — our team is ready to assist.
              </p>
            </div>

            <div className="space-y-3">
              {communicationChannels.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    href={item.href}
                    key={i}
                    onMouseEnter={() => setActiveChannel(i)}
                    onMouseLeave={() => setActiveChannel(null)}
                    className="flex items-center gap-4 p-4 sm:p-5 bg-[#F7F2EA] border border-[#E6D8C3]/50 rounded-sm hover:border-[#A85721]/30 hover:shadow-md transition-all duration-400 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white border border-[#E6D8C3] text-[#A85721] group-hover:bg-[#5A2D0C] group-hover:text-white group-hover:border-[#5A2D0C] flex items-center justify-center transition-all duration-400 shrink-0">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85721] mb-0.5">{item.label}</p>
                      <p className="text-[15px] font-bold text-[#1a1a1a] truncate">{item.val}</p>
                      <p className="text-[11px] text-[#5A2D0C]/40 mt-0.5">{item.desc}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`text-[#A85721]/40 transition-all duration-300 shrink-0 ${activeChannel === i ? 'rotate-45 text-[#A85721]' : ''}`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="flex items-start gap-3 p-4 bg-[#F7F2EA]/50 border border-[#E6D8C3]/30 rounded-sm">
              <Clock size={15} className="text-[#A85721] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C] mb-0.5">Business Hours</p>
                <p className="text-[12px] text-[#5A2D0C]/50">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                <p className="text-[12px] text-[#5A2D0C]/50">Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Form */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#F7F2EA] border border-[#E6D8C3]/50 rounded-sm p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={16} className="text-[#A85721]" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A85721]">Send a Message</h3>
              </div>

              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border border-[#E6D8C3] rounded-sm px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white border border-[#E6D8C3] rounded-sm px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Subject</label>
                  <select className="w-full bg-white border border-[#E6D8C3] rounded-sm px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors appearance-none cursor-pointer">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Sizing Help</option>
                    <option>Returns & Exchanges</option>
                    <option>Wholesale / B2B</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Your Message</label>
                  <textarea
                    rows="5"
                    required
                    className="w-full bg-white border border-[#E6D8C3] rounded-sm px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors resize-none placeholder:text-[#5A2D0C]/25"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5A2D0C] hover:bg-[#A85721] text-[#F7F2EA] font-bold text-[12px] uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-sm"
                >
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* MAP SECTION */}
      <section className="bg-[#F7F2EA] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <span className="text-[#A85721] font-semibold tracking-[0.35em] uppercase text-[10px] sm:text-[11px] mb-3 block">
              — Find Us —
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] tracking-tight">
              Visit Our Store
            </h2>
          </div>
          <div className="w-full h-[280px] sm:h-[350px] bg-[#E6D8C3] rounded-sm overflow-hidden border border-[#E6D8C3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.116396!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) sepia(10%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pasoja Store Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
