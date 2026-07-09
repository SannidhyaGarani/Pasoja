import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useStore } from '../../components/StoreProvider';
import SectionHeader from '../Home/SectionHeader';

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
  const originalPrice = product.original_price || Math.round((displayPrice || 999) * 1.25);
  const savingsPercent = displayPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : 0;

  const cartItemId = defaultSize ? `${product.id}-${defaultSize.size}` : product.id;
  const isInCart = cart.some(item => (item.cartId || item.id) === cartItemId);

  const handleAction = async (e, type) => {
    e.stopPropagation();
    if (type === 'cart') {
      if (isInCart) return;
      await addToCart(product, defaultSize);
      triggerToast('Added to bag');
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast('Removed from wishlist');
      } else {
        await addToWishlist(product);
        triggerToast('Saved to wishlist');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
        <img
          src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Discount badge */}
        {savingsPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white text-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
              -{savingsPercent}%
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => handleAction(e, 'wishlist')}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-white text-black'
              : 'bg-black/50 text-white/70 hover:bg-white hover:text-black backdrop-blur-sm'
          }`}
        >
          <Heart size={13} strokeWidth={isWishlisted ? 0 : 1.8} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Add to bag overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 hidden md:block ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => handleAction(e, 'cart')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                isInCart
                  ? 'bg-white/20 text-white cursor-default backdrop-blur-md'
                  : 'bg-white text-black hover:bg-white/90 backdrop-blur-md'
              }`}
            >
              <ShoppingBag size={11} strokeWidth={2.5} />
              {isInCart ? 'In Bag' : 'Add to Bag'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
              className="w-10 flex items-center justify-center bg-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
            >
              <Eye size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 flex flex-col flex-grow">
        {product.category && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-semibold mb-1">
            {product.category}
          </span>
        )}
        <h3 className="text-[13px] font-semibold text-white/85 leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm font-bold text-white">₹{displayPrice?.toLocaleString('en-IN')}</span>
          {originalPrice !== displayPrice && (
            <span className="text-xs text-white/30 line-through">₹{originalPrice?.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>

      {/* Mobile quick add */}
      <button
        onClick={(e) => handleAction(e, 'cart')}
        className={`md:hidden w-full py-2.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 mt-1 ${
          isInCart
            ? 'bg-white/10 text-white/60'
            : 'bg-white/5 text-white/70 border border-white/10 active:bg-white active:text-black'
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
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 8));
      } catch {
        setProducts([
          { id: '1', name: 'Classic Woolen Coat', price: 4999, category: 'Coats' },
          { id: '2', name: 'Premium Cotton T-Shirt', price: 1299, category: 'T-Shirts' },
          { id: '3', name: 'Slim Fit Denim Jeans', price: 2999, category: 'Jeans' },
          { id: '4', name: 'Italian Leather Jacket', price: 7999, category: 'Jackets' },
          { id: '5', name: 'Cashmere Blend Sweater', price: 3999, category: 'Sweaters' },
          { id: '6', name: 'Oxford Formal Shirt', price: 1899, category: 'Shirts' },
          { id: '7', name: 'Structured Cargo Pants', price: 2499, category: 'Pants' },
          { id: '8', name: 'Premium Fleece Hoodie', price: 2299, category: 'Hoodies' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="h-3 w-24 bg-white/5 rounded mb-4 animate-pulse" />
              <div className="h-8 w-52 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-white/5 animate-pulse" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14">

        {/* Section header */}
        <SectionHeader 
          subtitle="Most Loved"
          title="Bestsellers"
          action={
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition-colors group"
            >
              View All
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {/* Desktop 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-5 lg:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
          ))}
        </div>

        {/* Mobile 2-col grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 6).map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-8 flex items-center justify-center gap-2 w-full py-4 border border-white/15 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
          >
            View All Products
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white text-black px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3"
          >
            <p className="text-[12px] font-black uppercase tracking-wider whitespace-nowrap">{feedbackMessage}</p>
            <button onClick={() => setFeedbackMessage(null)} className="opacity-40 hover:opacity-100 ml-1">
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BestsellerProducts;
export { BestsellerProducts as Bestsellers };
