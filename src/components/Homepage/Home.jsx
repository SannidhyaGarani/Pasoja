import React from 'react';
import Hero from '../Home/Hero';
import BenefitsStrip from '../Home/BenefitsStrip';
import Bestsellers from '../Home/Bestsellers';
import Banner from '../Home/Banner';
import GenderBanner from '../Home/GenderBanner';
import Features from '../Home/Features';
import Testimonials from '../Home/Testimonials';

const Home = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Hero />
      <BenefitsStrip />
      <Bestsellers />
      <GenderBanner />
      <Banner />
      <Features />
      <Testimonials />
    </main>
  );
};

export default Home;
