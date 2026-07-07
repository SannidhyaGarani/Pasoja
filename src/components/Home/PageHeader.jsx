import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, breadcrumbItems = [] }) => {
  return (
    <section className="relative w-full bg-[#F7F2EA] mt-[76px] md:mt-[118px] overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A85721]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-4"
        >
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            if (isLast) {
              return (
                <React.Fragment key={index}>
                  <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#A85721]">
                    {item.label}
                  </span>
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={index}>
                <Link
                  to={item.path || "/"}
                  className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.15em] text-[#5A2D0C]/50 hover:text-[#5A2D0C] transition-colors"
                >
                  {isFirst && <Home size={13} strokeWidth={2} />}
                  <span>{item.label}</span>
                </Link>
                <ChevronRight size={12} className="text-[#5A2D0C]/25" strokeWidth={2.5} />
              </React.Fragment>
            );
          })}
        </nav>

        {/* Title */}
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight leading-[1.1]"
          >
            {title}
          </motion.h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] sm:text-[15px] text-[#5A2D0C]/50 font-medium mt-2 max-w-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom border */}
      <div className="h-[1px] bg-[#E6D8C3]/60" />
    </section>
  );
};

export default PageHeader;
