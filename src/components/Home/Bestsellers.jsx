import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, X, ArrowRight, ShoppingCart } from 'lucide-react';
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
  const isOutOfStock = product.stock === 0 || product.stock_status === 'Out of Stock';

  const handleAction = async (e, type) => {
    e.preventDefault();
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

  const rating = product.rating || (4.5 + (idx % 5) * 0.1);
  const badgeText = product.tag || (idx % 2 === 0 ? 'BEST SELLER' : 'NEW');
  const displayedImage = isHovered && product.images && product.images.length > 1
    ? product.images[1]
    : (product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative cursor-pointer flex flex-col bg-transparent transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#151515] border border-white/[0.04]">
        <img
          src={displayedImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
            <span className="bg-white text-black font-bold uppercase text-[9px] tracking-[0.2em] px-3.5 py-2">
              Out of Stock
            </span>
          </div>
        )}

        {/* Top-left Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-white text-black font-extrabold uppercase text-[8px] tracking-[0.18em] px-2.5 py-1 shadow-sm">
            {badgeText}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => handleAction(e, 'wishlist')}
          className="absolute top-2.5 right-2.5 z-30 text-white hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-auto cursor-pointer"
        >
          <Heart 
            size={15} 
            strokeWidth={2} 
            fill={isWishlisted ? "#ef4444" : "none"} 
            stroke={isWishlisted ? "#ef4444" : "#ffffff"} 
            className="transition-colors duration-300"
          />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3.5 flex flex-col flex-grow">
        {product.category && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#c9a962] font-semibold mb-1">
            {product.category}
          </span>
        )}
        <h3 className="text-[12px] font-light text-white uppercase tracking-wider mb-1 line-clamp-1 group-hover:text-[#c9a962] transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Stars - Minimal */}
        <div className="flex items-center gap-1 mb-2.5 text-[10px] text-white/40">
          <span className="text-[#c9a962]">★</span>
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>

        {/* Price & Cart row */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-white/[0.04]">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-wide text-white">₹{displayPrice?.toLocaleString('en-IN')}</span>
            {originalPrice !== displayPrice && (
              <span className="text-[11px] text-white/30 line-through">₹{originalPrice?.toLocaleString('en-IN')}</span>
            )}
            {savingsPercent > 0 && (
              <span className="hidden md:inline text-red-400 text-[9px] font-bold">
                ({savingsPercent}% OFF)
              </span>
            )}
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={(e) => handleAction(e, 'cart')}
            disabled={isOutOfStock}
            className={`w-9 h-9 border flex items-center justify-center transition-all duration-300 z-30 cursor-pointer relative pointer-events-auto ${
              isOutOfStock
                ? 'bg-transparent text-white/20 border-white/5 cursor-not-allowed'
                : isInCart
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/80 border-white/10 hover:bg-white hover:text-black hover:border-white'
            }`}
          >
            <ShoppingCart size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
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
              <div className="h-3 w-24 bg-white/5 mb-4 animate-pulse" />
              <div className="h-8 w-52 bg-white/10 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-white/5 animate-pulse" />
                <div className="h-3 bg-white/5 animate-pulse w-2/3" />
                <div className="h-3 bg-white/5 animate-pulse w-1/3" />
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
        />

        {/* Desktop 4-col grid */}
        <div className="hidden md:grid grid-cols-4 gap-5 lg:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
          ))}
        </div>

        {/* Mobile 2-col Grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
            ))}
          </div>
        </div>

        {/* Centered View More Button */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full sm:w-auto text-center"
          >
            View More
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
