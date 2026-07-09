import React from 'react';
import Hero from '../Home/Hero';
import CategorySection from '../Home/CategorySection';
import Bestsellers from '../Home/Bestsellers';
import GenderBanner from '../Home/GenderBanner';
import Banner from '../Home/Banner';
import BenefitsStrip from '../Home/BenefitsStrip';
import Testimonials from '../Home/Testimonials';

const Home = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-white selection:text-black">
      <Hero />
      <BenefitsStrip />
      <CategorySection />
      <Bestsellers />
      <GenderBanner />
      <Banner />
      <Testimonials />
    </main>
  );
};

export default Home;
