import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { User, Search, Menu, X, Heart, ArrowRight, ShoppingBag, Sparkles, Compass, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useStore } from './StoreProvider';

const luxuryEasing = [0.22, 1, 0.36, 1];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { cart, wishlist } = useStore();
  const { scrollY } = useScroll();

  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  // Smooth scroll transitions for a premium glassmorphic effect
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(247,242,234,1)', 'rgba(247,242,234,1)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(230,216,195,0)', 'rgba(230,216,195,0.6)']
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 30px rgba(90,45,12,0.08)']
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  // Topbar collapse (Height increased to support 14px text)
  const topbarHeight = useTransform(scrollY, [0, 60], ['48px', '0px']);
  const topbarOpacity = useTransform(scrollY, [0, 40], [1, 0]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const leftNavLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Collections', path: '/collections' },
  ];

  const rightNavLinks = [
    { name: 'Our Story', path: '/about' },
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
          className="bg-[#5A2D0C] text-[#F7F2EA] text-[14px] font-medium tracking-[0.15em] uppercase px-6 md:px-14 flex justify-between items-center relative z-50 select-none hidden md:flex overflow-hidden origin-top w-full"
        >
          {/* Left: Ticker */}
          <div className="w-1/2 overflow-hidden relative flex items-center h-full">
            <motion.div
              animate={{ x: [0, -800] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-12 whitespace-nowrap pr-12 items-center text-[#F7F2EA]/90"
            >
              <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#A85721] rounded-full" /> COMPLIMENTARY SHIPPING OVER ₹1999</span>
              <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#A85721] rounded-full" /> SLOW FASHION • ETHICALLY SOURCED</span>
              <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#A85721] rounded-full" /> NEW ARRIVALS — SHOP NOW</span>
            </motion.div>
          </div>

          {/* Right: Utility Actions */}
          <div className="flex items-center gap-7 font-semibold h-full">
            <Link to="/account" className="hover:text-[#A85721] transition-colors duration-300 flex items-center gap-2">
              <User size={16} strokeWidth={2} />
              <span>{user ? user.name?.split(' ')[0] : 'Sign In'}</span>
            </Link>
            <span className="text-[#F7F2EA]/20">|</span>
            <Link to="/wishlist" className="hover:text-[#A85721] transition-colors duration-300 flex items-center gap-2 relative">
              <Heart size={16} strokeWidth={2} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="ml-1 bg-[#A85721] text-[#F7F2EA] text-[14px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <span className="text-[#F7F2EA]/20">|</span>
            <Link to="/cart" className="hover:text-[#A85721] transition-colors duration-300 flex items-center gap-2 relative">
              <ShoppingBag size={16} strokeWidth={2} />
              <span>Bag ({cartCount})</span>
            </Link>
          </div>
        </motion.div>

        {/* MAIN NAVIGATION */}
        <motion.nav
          style={{
            backgroundColor: headerBg,
            borderBottomWidth: '1px',
            borderBottomColor: headerBorder,
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: headerShadow,
          }}
          className="h-[88px] md:h-[96px] px-6 md:px-14 flex items-center transition-all duration-500 w-full"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-3 items-center">
            
            {/* Left Nav Links */}
            <div className="hidden lg:flex items-center gap-10 justify-start">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-[14px] font-medium uppercase tracking-[0.15em] text-[#5A2D0C]/80 relative group transition-all hover:text-[#5A2D0C]"
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="luxuryNavLine"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A85721]"
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A85721] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                </Link>
              ))}
            </div>

            {/* Mobile: Burger */}
            <div className="flex lg:hidden justify-start">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#5A2D0C] p-2 -ml-2 hover:bg-[#E6D8C3]/40 rounded-xl transition-colors duration-300"
                aria-label="Open Navigation Menu"
              >
                <Menu size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <motion.div style={{ scale: logoScale }} className="transition-transform duration-500 ease-out">
                <Link to="/" className="flex items-center group relative z-[110]">
                  <img
                    src="/img/Pasoja option-01.png"
                    alt="Pasoja"
                    className="h-12 md:h-[60px] w-auto object-contain transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Right Nav Links */}
            <div className="hidden lg:flex items-center gap-10 justify-end">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-[14px] font-medium uppercase tracking-[0.15em] text-[#5A2D0C]/80 relative group transition-all hover:text-[#5A2D0C]"
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="luxuryNavLineR"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A85721]"
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A85721] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                </Link>
              ))}
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="text-[#5A2D0C]/80 hover:text-[#A85721] p-2 ml-4 transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={22} strokeWidth={1.8} />
              </button>
            </div>

            {/* Mobile Right: Icons */}
            <div className="flex lg:hidden justify-end items-center gap-2">
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="text-[#5A2D0C] p-2 hover:bg-[#E6D8C3]/40 rounded-xl transition-colors duration-300"
              >
                <Search size={24} strokeWidth={1.5} />
              </button>
              <Link to="/cart" className="text-[#5A2D0C] p-2 -mr-2 hover:bg-[#E6D8C3]/40 rounded-xl transition-colors duration-300 relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#A85721] text-[#F7F2EA] text-[14px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-[#F7F2EA]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </motion.nav>

        {/* REFINED SEARCH OVERLAY */}
        <AnimatePresence>
          {isSearchActive && (
            <motion.div 
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: luxuryEasing }}
              className="absolute left-0 top-full w-full bg-[#F7F2EA]/95 backdrop-blur-xl border-b border-[#E6D8C3] px-6 md:px-14 py-8 shadow-2xl z-[90]"
            >
              <div className="max-w-4xl mx-auto flex items-center gap-5">
                <Search size={28} className="text-[#5A2D0C]/40 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Discover our collections..." 
                  className="bg-transparent border-none outline-none w-full text-[20px] md:text-[24px] text-[#5A2D0C] placeholder-[#5A2D0C]/30 font-light"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchActive(false)} 
                  className="text-[14px] uppercase tracking-[0.15em] text-[#5A2D0C]/60 hover:text-[#A85721] font-bold shrink-0 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LUXURIOUS MOBILE FULL-SCREEN MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.6, ease: luxuryEasing }}
              className="fixed inset-0 bg-[#F7F2EA] z-[200] flex flex-col"
            >
              {/* Menu Header */}
              <div className="w-full px-6 h-[88px] flex items-center justify-between border-b border-[#E6D8C3]/50 bg-[#F7F2EA] shrink-0">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/img/Pasoja option-01.png" alt="Pasoja" className="h-11 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#5A2D0C] p-3 -mr-3 rounded-full hover:bg-[#E6D8C3]/50 transition-colors duration-300"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="px-8 pt-10 space-y-2 flex-1 overflow-y-auto pb-36">
                <p className="text-[14px] uppercase tracking-[0.2em] text-[#5A2D0C]/40 font-bold mb-6">Menu</p>
                {[...leftNavLinks, ...rightNavLinks].map((link, idx) => (
                  <motion.div 
                    key={link.name} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.5, ease: luxuryEasing }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="flex items-center justify-between py-4 border-b border-[#E6D8C3]/30 group"
                    >
                      <span className="text-2xl font-medium tracking-wide text-[#5A2D0C] group-hover:text-[#A85721] transition-colors duration-300">
                        {link.name}
                      </span>
                      <ArrowRight size={22} className="text-[#A85721]/0 group-hover:text-[#A85721] group-hover:translate-x-2 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}

                {/* Secondary links */}
                <div className="pt-12 space-y-5">
                  <p className="text-[14px] uppercase tracking-[0.2em] text-[#5A2D0C]/40 font-bold mb-4">Support</p>
                  <div className="flex items-center gap-4 text-[#5A2D0C]/70 text-[16px] font-medium">
                    <Compass size={20} />
                    <Link to="/stores" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A85721] transition-colors duration-300">Find a Store</Link>
                  </div>
                  <div className="flex items-center gap-4 text-[#5A2D0C]/70 text-[16px] font-medium">
                    <HelpCircle size={20} />
                    <Link to="/support" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A85721] transition-colors duration-300">Help & Support</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ELEVATED MOBILE BOTTOM DOCK */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[480px] h-[80px] bg-white/90 backdrop-blur-3xl rounded-[2rem] border border-[#E6D8C3]/60 md:hidden z-[150] shadow-[0_12px_40px_rgba(90,45,12,0.15)] flex items-center justify-around px-4">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isHome = item.name === 'Home';
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full select-none"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1.5 relative transition-colors duration-300 ${
                  isActive ? 'text-[#A85721]' : 'text-[#5A2D0C]/50 hover:text-[#5A2D0C]/80'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-[#A85721]/10' : ''}`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} className="transition-all duration-300" />
                </div>
                
                <span className={`text-[14px] tracking-wide font-semibold leading-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {item.name}
                </span>

                {/* Scaled Badge */}
                {item.count > 0 && (
                  <span className="absolute -top-1 right-2 bg-[#A85721] text-[#F7F2EA] text-[14px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {item.count}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Header;