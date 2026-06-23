import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { User, Search, Menu, X, Heart, ArrowRight, ShoppingBag, Sparkles, Compass, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useStore } from './StoreProvider';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { cart, wishlist } = useStore();
  const { scrollY } = useScroll();

  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  // Premium fluid scroll transitions
  const headerHeight = useTransform(scrollY, [0, 100], ['90px', '76px']);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(247,242,234,0)', 'rgba(247,242,234,0.96)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(230,216,195,0)', 'rgba(230,216,195,0.4)']
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);
  
  // FIXED: Smoothly collapse topbar space natively to prevent layout gaps on scroll
  const topbarHeight = useTransform(scrollY, [0, 50], ['42px', '0px']);
  const topbarOpacity = useTransform(scrollY, [0, 40], [1, 0]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Symmetrically Split Navigation Configurations
  const leftNavLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Collections', path: '/collections' },
  ];

  const rightNavLinks = [
    { name: 'Our Story', path: '/about' },
    { name: 'Journal', path: '/journal' },
    { name: 'Contact', path: '/contact' },
  ];

  const mobileNavItems = [
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist', count: wishlistCount },
    { name: 'Home', icon: Sparkles, path: '/' },
    { name: 'Cart', icon: ShoppingBag, path: '/cart', count: cartCount },
    { name: 'Profile', icon: User, path: '/account' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-poppins flex flex-col justify-start pointer-events-auto">
        {/* PREMIUM UTILITY TOPBAR */}
        <motion.div 
          style={{ height: topbarHeight, opacity: topbarOpacity }}
          className="bg-[#5A2D0C] text-[#F7F2EA] text-[11px] font-medium tracking-[0.2em] uppercase px-4 sm:px-8 md:px-12 flex justify-between items-center border-b border-[#E6D8C3]/10 relative z-50 select-none hidden md:flex overflow-hidden origin-top w-full"
        >
          {/* Left Side: Auto Ticker */}
          <div className="w-1/2 overflow-hidden relative flex items-center h-full">
            <motion.div
              animate={{ x: [0, -400] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-12 whitespace-nowrap pr-12 items-center text-[#F7F2EA]/90"
            >
              <span className="flex items-center gap-2"><Sparkles size={11} className="text-[#A85721]" /> COMPLIMENTARY SHIPPING OVER ₹1999</span>
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#A85721] rotate-45" /> SLOW FASHION • ETHICALLY SOURCED</span>
            </motion.div>
          </div>

          {/* Right Side: Primary Utility Actions */}
          <div className="flex items-center gap-6 font-semibold h-full">
            <Link to="/account" className="hover:text-[#A85721] transition-colors flex items-center gap-1.5 lowercase first-letter:uppercase">
              <User size={13} strokeWidth={2} />
              <span>{user ? user.name?.split(' ')[0] : 'Sign In'}</span>
            </Link>
            <span className="text-[#F7F2EA]/30">|</span>
            <Link to="/wishlist" className="hover:text-[#A85721] transition-colors flex items-center gap-1.5 relative">
              <Heart size={13} strokeWidth={2} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="ml-1 bg-[#A85721] text-[#F7F2EA] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <span className="text-[#F7F2EA]/30">|</span>
            <Link to="/cart" className="hover:text-[#A85721] transition-colors flex items-center gap-1.5 relative">
              <ShoppingBag size={13} strokeWidth={2} />
              <span>Shopping Bag</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-[#A85721] text-[#F7F2EA] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </motion.div>

        {/* MAIN NAVIGATION HEADER */}
        <motion.nav
          style={{
            height: headerHeight,
            backgroundColor: headerBg,
            borderBottomWidth: '1px',
            borderBottomColor: headerBorder,
            backdropFilter: 'blur(20px)'
          }}
          className="px-4 sm:px-8 md:px-12 flex items-center transition-all duration-300 w-full"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
            
            {/* 1. Left Nav Link Cluster */}
            <div className="hidden lg:flex items-center gap-8 justify-start">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-[#5A2D0C]/80 relative group transition-all hover:text-[#A85721]"
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="luxuryNavLine"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#A85721]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Left Element: Burger Menu */}
            <div className="flex lg:hidden justify-start">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#5A2D0C] p-2 hover:bg-[#E6D8C3]/30 rounded-full transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* 2. Absolute Centered Brand Logo */}
            <div className="flex justify-center">
              <motion.div style={{ scale: logoScale }} className="transition-transform duration-300">
                <Link to="/" className="flex items-center group relative z-[110]">
                  <img
                    src="/img/Pasoja option-01.png"
                    alt="Pasoja Luxury Apparel Logo"
                    className="h-11 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  />
                </Link>
              </motion.div>
            </div>

            {/* 3. Right Nav Link Cluster */}
            <div className="hidden lg:flex items-center gap-8 justify-end">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-[12px] font-medium uppercase tracking-[0.25em] text-[#5A2D0C]/80 relative group transition-all hover:text-[#A85721]"
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="luxuryNavLine"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#A85721]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="text-[#5A2D0C]/80 hover:text-[#A85721] p-1 transition-colors ml-4"
                aria-label="Search Collection"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>
            </div>

            {/* Mobile Right Element: Contextual Micro Actions */}
            <div className="flex lg:hidden justify-end items-center gap-2">
              <button className="text-[#5A2D0C] p-2 hover:bg-[#E6D8C3]/30 rounded-full transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link to="/cart" className="text-[#5A2D0C] p-2 hover:bg-[#E6D8C3]/30 rounded-full transition-colors relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#A85721] text-[#F7F2EA] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </motion.nav>

        {/* FULL OVERLAY INTERACTIVE SEARCH BAR CONTAINER */}
        <AnimatePresence>
          {isSearchActive && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 top-[100%] w-full bg-[#F7F2EA] border-b border-[#E6D8C3] px-12 py-6 hidden lg:block shadow-xl"
            >
              <div className="max-w-3xl mx-auto flex items-center gap-4">
                <Search size={20} className="text-[#5A2D0C]/50" />
                <input 
                  type="text" 
                  placeholder="Search curated premium collections..." 
                  className="bg-transparent border-none outline-none w-full text-[16px] text-[#5A2D0C] placeholder-[#5A2D0C]/40 font-light font-poppins"
                  autoFocus
                />
                <button onClick={() => setIsSearchActive(false)} className="text-[11px] uppercase tracking-widest text-[#5A2D0C]/60 hover:text-[#A85721]">
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE FULL-SCREEN MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: "tween", duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-0 bg-[#F7F2EA] z-[200] flex flex-col justify-between pt-[76px]"
            >
              {/* Header inside overlay */}
              <div className="w-full px-6 h-[76px] flex items-center justify-between border-b border-[#E6D8C3]/40 absolute top-0 left-0 bg-[#F7F2EA]">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/img/Pasoja option-01.png" alt="Pasoja Logo" className="h-10 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#5A2D0C] p-2 rounded-full hover:bg-[#E6D8C3]/40 transition-colors"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Main Core Navigation Links */}
              <div className="px-8 pt-12 space-y-7 flex-1 overflow-y-auto">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#5A2D0C]/40 font-bold mb-2">Curated Runway</p>
                {[...leftNavLinks, ...rightNavLinks].map((link, idx) => (
                  <motion.div 
                    key={link.name} 
                    initial={{ opacity: 0, x: -15 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="text-2xl font-light tracking-wide text-[#5A2D0C] flex items-center justify-between group font-poppins"
                    >
                      <span className="hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      <ArrowRight size={16} className="text-[#A85721]/60" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Minimalist Sub-Footer Context */}
              <div className="p-8 border-t border-[#E6D8C3]/60 bg-[#E6D8C3]/20 space-y-4 pb-28">
                <div className="flex items-center gap-3 text-[#5A2D0C]/70 text-[13px]">
                  <Compass size={16} />
                  <Link to="/stores" onClick={() => setIsMobileMenuOpen(false)}>Find Boutique Store</Link>
                </div>
                <div className="flex items-center gap-3 text-[#5A2D0C]/70 text-[13px]">
                  <HelpCircle size={16} />
                  <Link to="/support" onClick={() => setIsMobileMenuOpen(false)}>Client Assistance</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE BOTTOM ULTRA-PREMIUM GLASS DOCK NAVIGATION */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[430px] h-[66px] bg-[#F7F2EA]/80 backdrop-blur-2xl rounded-2xl border border-[#5A2D0C]/5 md:hidden z-[150] shadow-[0_20px_50px_rgba(90,45,12,0.1)] flex items-center justify-around px-3">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full select-none"
            >
              <motion.div
                whileTap={{ scale: 0.90 }}
                className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 relative ${isActive ? "text-[#A85721]" : "text-[#5A2D0C]/50"}`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.6} className="transition-transform duration-300" />
                <span className="text-[8px] tracking-[0.15em] uppercase font-bold font-poppins scale-[0.9] origin-center">
                  {item.name}
                </span>

                {/* Micro-Counter Badge */}
                {item.count > 0 && (
                  <span className="absolute -top-1 right-2 bg-[#5A2D0C] text-[#F7F2EA] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#F7F2EA] shadow-xs">
                    {item.count}
                  </span>
                )}
              </motion.div>

              {/* High-End Soft Geometric Active Dot Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDockLine"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-[#A85721]"
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Header;