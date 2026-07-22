import React from 'react';
import Hero from '../Home/Hero';
import CategorySection from '../Home/CategorySection';
import Bestsellers from '../Home/Bestsellers';
import FeaturesStrip from '../Home/FeaturesStrip';
import GallerySwiper from '../Home/GallerySwiper';
import GenderBanner from '../Home/GenderBanner';
import BenefitsStrip from '../Home/BenefitsStrip';
import Testimonials from '../Home/Testimonials';

const Home = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-white selection:text-black">
      <Hero />
      <BenefitsStrip />
      <GallerySwiper />
      <CategorySection />
      <Bestsellers />
      <FeaturesStrip />
      <GenderBanner />
      <Testimonials />
    </main>
  );
};

export default Home;
