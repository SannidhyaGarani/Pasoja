import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, ShoppingBag, ArrowRight, Heart, X, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useStore } from '../../components/StoreProvider';
import SectionHeader from './SectionHeader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ProductCard = ({ product, idx, triggerToast }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  // Dynamic Price Calculations based on reference card metrics
  const displayPrice = product.price;
  const originalPrice = product.original_price || Math.round(product.price * 1.25);
  const savingsAmount = originalPrice - displayPrice;
  const savingsPercent = Math.round((savingsAmount / originalPrice) * 100);

  const handleAction = async (e, type) => {
    e.stopPropagation();
    if (type === 'cart') {
      if (isInCart) return;
      await addToCart(product);
      triggerToast("Added to your cart!");
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast("Removed from wishlist");
      } else {
        await addToWishlist(product);
        triggerToast("Added to wishlist!");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border-none p-0 relative cursor-pointer transition-all duration-300 flex flex-col h-full"
    >
      {/* Discount Badge */}
      {savingsPercent > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-[#8B4513] text-white px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
            {savingsPercent}% OFF
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="text-sm font-medium text-black mb-2 text-center">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto justify-center">
          <span className="text-sm font-semibold text-black">
            Rs. {displayPrice}
          </span>
          {originalPrice !== displayPrice && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {originalPrice}
            </span>
          )}
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
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
        // Mock data if no products
        setProducts([
          { id: '1', name: 'Classic Woolen Coat', price: 4999, category: 'Coats' },
          { id: '2', name: 'Premium Cotton T-Shirt', price: 1299, category: 'T-Shirts' },
          { id: '3', name: 'Slim Fit Denim Jeans', price: 2999, category: 'Jeans' },
          { id: '4', name: 'Leather Jacket', price: 7999, category: 'Jackets' },
          { id: '5', name: 'Cashmere Sweater', price: 3999, category: 'Sweaters' },
          { id: '6', name: 'Formal Shirt', price: 1899, category: 'Shirts' },
          { id: '7', name: 'Cargo Pants', price: 2499, category: 'Pants' },
          { id: '8', name: 'Hoodie', price: 2299, category: 'Hoodies' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            title="BEST SELLER"
            subtitle=""
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="relative mb-12">
          <SectionHeader
            title="BEST SELLER"
            subtitle=""
          />
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6 group">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} triggerToast={triggerToast} />
          ))}
        </div>

        {/* Mobile & Tablet Carousel */}
        <div className="block lg:hidden !-mr-6 md:!-mr-12 mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
            className="pb-10"
          >
            {products.map((product, idx) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} idx={idx} triggerToast={triggerToast} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 15, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[200] bg-[#A85721] text-[#F7F2EA] px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 max-w-sm w-[90%]"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <p className="text-sm font-semibold flex-1">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BestsellerProducts;
export { BestsellerProducts as Bestsellers };
