import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Heart, ShoppingBag, Eye, X, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useStore } from '../../components/StoreProvider';
import SectionHeader from './SectionHeader';

import 'swiper/css';

const ProductCard = ({ product, idx, triggerToast }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  const defaultSize = product.size_prices && product.size_prices.length > 0
    ? (product.size_prices.find(s => s.size?.toUpperCase() === 'L') || product.size_prices[0])
    : null;

  const displayPrice = defaultSize ? defaultSize.price : product.price;
  const originalPrice = product.original_price || Math.round(displayPrice * 1.25);
  const savingsPercent = Math.round(((originalPrice - displayPrice) / originalPrice) * 100);

  const cartItemId = defaultSize ? `${product.id}-${defaultSize.size}` : product.id;
  const isInCart = cart.some(item => (item.cartId || item.id) === cartItemId);

  const handleAction = async (e, type) => {
    e.stopPropagation();
    if (type === 'cart') {
      if (isInCart) return;
      await addToCart(product, defaultSize);
      triggerToast("Added to your bag");
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast("Removed from wishlist");
      } else {
        await addToWishlist(product);
        triggerToast("Saved to wishlist");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F7F2EA] rounded-sm">
        <img
          src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        {savingsPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#A85721] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
              -{savingsPercent}%
            </span>
          </div>
        )}

        {/* Wishlist Button - always visible on mobile */}
        <button
          onClick={(e) => handleAction(e, 'wishlist')}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-sm ${
            isWishlisted
              ? 'bg-[#A85721] text-white'
              : 'bg-white/80 text-[#5A2D0C]/60 hover:bg-white hover:text-[#A85721]'
          }`}
        >
          <Heart size={15} strokeWidth={isWishlisted ? 0 : 1.5} fill={isWishlisted ? 'white' : 'none'} />
        </button>

        {/* Quick Actions Overlay on hover (desktop) */}
        <div className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-400 hidden md:block ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex gap-2">
            <button
              onClick={(e) => handleAction(e, 'cart')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md backdrop-blur-md ${
                isInCart
                  ? 'bg-[#5A2D0C] text-white cursor-default'
                  : 'bg-white/95 text-[#5A2D0C] hover:bg-[#A85721] hover:text-white'
              }`}
            >
              <ShoppingBag size={13} strokeWidth={2} />
              {isInCart ? 'In Bag' : 'Add to Bag'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
              className="w-10 flex items-center justify-center bg-white/95 text-[#5A2D0C] rounded-sm hover:bg-[#5A2D0C] hover:text-white transition-all duration-300 shadow-md backdrop-blur-md"
            >
              <Eye size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow pt-3.5 pb-1">
        {product.category && (
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A85721] font-semibold mb-1">
            {product.category}
          </span>
        )}
        <h3 className="text-[13px] sm:text-sm font-semibold text-[#1a1a1a] leading-snug mb-2 line-clamp-2 group-hover:text-[#A85721] transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm font-bold text-[#1a1a1a]">
            ₹{displayPrice?.toLocaleString('en-IN')}
          </span>
          {originalPrice !== displayPrice && (
            <span className="text-xs text-[#999] line-through font-medium">
              ₹{originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Quick Add */}
      <button
        onClick={(e) => handleAction(e, 'cart')}
        className={`md:hidden w-full py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 mt-1 ${
          isInCart
            ? 'bg-[#5A2D0C] text-white'
            : 'bg-[#F7F2EA] text-[#5A2D0C] border border-[#E6D8C3] active:bg-[#A85721] active:text-white active:border-[#A85721]'
        }`}
      >
        {isInCart ? 'In Your Bag' : 'Quick Add'}
      </button>
    </motion.div>
  );
};

const BestsellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([
          { id: '1', name: 'Classic Woolen Coat', price: 4999, category: 'Coats' },
          { id: '2', name: 'Premium Cotton T-Shirt', price: 1299, category: 'T-Shirts' },
          { id: '3', name: 'Slim Fit Denim Jeans', price: 2999, category: 'Jeans' },
          { id: '4', name: 'Italian Leather Jacket', price: 7999, category: 'Jackets' },
          { id: '5', name: 'Cashmere Blend Sweater', price: 3999, category: 'Sweaters' },
          { id: '6', name: 'Oxford Formal Shirt', price: 1899, category: 'Shirts' },
          { id: '7', name: 'Structured Cargo Pants', price: 2499, category: 'Pants' },
          { id: '8', name: 'Premium Fleece Hoodie', price: 2299, category: 'Hoodies' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <SectionHeader title="Bestsellers" subtitle="Most Loved" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[#F7F2EA] animate-pulse rounded-sm" />
                <div className="h-3 bg-[#F7F2EA] rounded animate-pulse w-2/3" />
                <div className="h-3 bg-[#F7F2EA] rounded animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div className="flex-1">
            <SectionHeader title="Bestsellers" subtitle="Most Loved" />
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-[#5A2D0C] hover:text-[#A85721] transition-colors group shrink-0 pb-1"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-5 lg:gap-7">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
          ))}
        </div>

        {/* Mobile: 2-column with horizontal scroll option */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 6).map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 border border-[#5A2D0C] text-[#5A2D0C] text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#5A2D0C] hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm w-auto"
          >
            <div className="w-7 h-7 rounded-full bg-[#A85721]/30 flex items-center justify-center shrink-0">
              <Sparkles size={13} />
            </div>
            <p className="text-[13px] font-semibold whitespace-nowrap">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-60 hover:opacity-100 transition-opacity ml-2 shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BestsellerProducts;
export { BestsellerProducts as Bestsellers };
