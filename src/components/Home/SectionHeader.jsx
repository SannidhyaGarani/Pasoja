import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 relative px-4">
      {subtitle && (
        <span className="text-[#A85721] font-bold tracking-[0.3em] uppercase text-[12px] mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-sans font-bold text-black tracking-tight leading-tight mb-0">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
