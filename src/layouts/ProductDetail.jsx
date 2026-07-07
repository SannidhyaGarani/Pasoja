import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../components/Firebase';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { useAuth } from '../components/useAuth';
import { Heart, ShoppingBag, Minus, Plus, ChevronRight, Star, Truck, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from "../components/StoreProvider";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('description');

  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === id);
  const currentCartId = selectedSize ? `${id}-${selectedSize.size}` : id;
  const isInCart = cart.some(item => (item.cartId || item.id) === currentCartId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          if (data.size_prices && data.size_prices.length > 0) {
            const lSize = data.size_prices.find(s => s.size?.toUpperCase() === 'L');
            setSelectedSize(lSize || data.size_prices[0]);
          }

          const q = query(collection(db, "products"), limit(4));
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(p => p.id !== id);
          setRelatedProducts(products);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const addToCollection = async (type) => {
    if (!product) return;

    if (type === 'cart') {
      const cartItemId = selectedSize ? `${product.id}-${selectedSize.size}` : product.id;
      const isInCartWithSize = cart.some(item => item.cartId === cartItemId);
      
      if (isInCartWithSize) {
        navigate('/cart');
        return;
      }
      
      for (let i = 0; i < quantity; i++) {
        await addToCart(product, selectedSize);
      }
      triggerToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to your bag!`);
    } else {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        triggerToast("Removed from your wishlist!");
      } else {
        await addToWishlist(product);
        triggerToast("Added to your wishlist!");
      }
    }
  };

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : [product?.image || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'];

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
          <div className="text-neutral-500 font-light tracking-widest text-[10px] uppercase">Loading Experience</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-sm font-light tracking-widest uppercase text-neutral-800 mb-4">Product Not Found</h3>
        <Link to="/shop" className="px-8 py-3 bg-[#5A2D0C] text-white tracking-widest text-[11px] uppercase font-semibold">
          Return To Collection
        </Link>
      </div>
    );
  }

  const discountPercent = selectedSize?.original_price 
    ? Math.round(((selectedSize.original_price - selectedSize.price) / selectedSize.original_price) * 100) 
    : product.original_price 
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
      : 0;

  const accordions = [
    { id: 'description', label: 'Description' },
    { id: 'size', label: 'Size Guide' },
    { id: 'spec', label: 'Product Specifications' },
    { id: 'style', label: 'Style Note' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'return', label: 'Returns & Exchanges' }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-24 md:pt-36 pb-20 selection:bg-neutral-100">
      {/* Premium Dynamic Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 bg-neutral-900 text-white px-6 py-3.5 shadow-xl flex items-center gap-4 min-w-[300px] max-w-md border border-neutral-800"
          >
            <ShoppingBag size={15} className="text-neutral-300" />
            <p className="text-xs font-light tracking-wide flex-1">{feedbackMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Preserved original 50:50 ratio layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Media Gallery (Now Sticky Top) */}
          <div className="lg:sticky lg:top-36 space-y-4">
            <div className="aspect-square bg-neutral-50 overflow-hidden relative group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden transition-all duration-300 bg-neutral-50 border ${
                      selectedImage === idx ? 'border-neutral-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Configurations Panel */}
          <div className="flex flex-col space-y-6">
            <div>
              {/* Context Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-xs">
                  Natural Fabrics
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 bg-amber-50 text-amber-900 rounded-xs flex items-center gap-1">
                  <Star size={10} fill="currentColor" strokeWidth={0} /> 4.8 Studio Choice
                </span>
              </div>
              
              <h1 className="text-xl md:text-2xl font-light tracking-wide text-neutral-900 uppercase mb-3">
                {product.name}
              </h1>

              {/* Advanced Pricing Row */}
              <div className="flex items-baseline gap-3.5 mt-2">
                <span className="text-xl font-medium tracking-wide text-neutral-900">
                  Rs. {(selectedSize?.price || product.price).toLocaleString()}
                </span>
                {(selectedSize?.original_price || product.original_price) && (
                  <span className="text-sm text-neutral-400 line-through font-light">
                    Rs. {(selectedSize?.original_price || product.original_price).toLocaleString()}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold uppercase text-amber-800 tracking-wider bg-amber-50 px-2 py-0.5 rounded-sm">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 tracking-wide mt-1">Tax included. Free shipping protected.</p>
            </div>

            {/* Custom Sizing Box */}
            {product.size_prices && product.size_prices.length > 0 && (
              <div className="border-t border-neutral-100 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Select Size</span>
                  <button className="text-xs text-neutral-400 hover:text-neutral-900 flex items-center gap-1 transition-colors group">
                    <Ruler size={12} className="text-neutral-400 group-hover:text-neutral-900" />
                    <span className="underline underline-offset-4">Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.size_prices.map((sizePrice, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sizePrice)}
                      className={`w-12 h-11 flex items-center justify-center border text-xs tracking-wider transition-all duration-200 ${
                        selectedSize?.size === sizePrice.size
                          ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {sizePrice.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Micro Interaction Stepper & Wishlist Row */}
            <div className="border-t border-neutral-100 pt-5 space-y-4">
              <div className="flex items-center gap-3">
                {/* Stepper Wrapper */}
                <div className="flex items-center justify-between border border-neutral-200 h-11 px-1 w-28 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-medium text-neutral-900 tabular-nums w-5 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Minimalist Wishlist UI */}
                <button
                  onClick={() => addToCollection('wishlist')}
                  className="flex-1 h-11 flex items-center justify-center border border-neutral-200 bg-white transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-neutral-700">
                    <Heart size={14} fill={isWishlisted ? '#5A2D0C' : 'none'} className={isWishlisted ? 'text-[#5A2D0C]' : 'text-neutral-400'} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </div>
                </button>
              </div>

              {/* Logistic Tracker Ribbon */}
              <div className="flex items-center gap-2 text-xs text-neutral-600 px-0.5">
                <Truck size={14} className="text-neutral-400" />
                <span>Delivery: Secured priority transit (Est. 3-5 open days)</span>
              </div>

              {/* Core Execution CTAs */}
              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  onClick={() => addToCollection('cart')}
                  className="w-full h-12 bg-white border-2 border-neutral-900 text-neutral-900 font-medium text-xs uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all duration-300"
                >
                  {isInCart ? "Item added to cart" : "Add to Shopping Bag"}
                </button>
                <button
                  onClick={() => addToCollection('cart')}
                  className="w-full h-12 bg-[#5A2D0C] text-white font-medium text-xs uppercase tracking-widest hover:bg-[#422008] transition-all duration-300"
                >
                  Buy it Now
                </button>
              </div>
            </div>

            {/* Fine Accents Minimal Accordions */}
            <div className="border-t border-neutral-100 pt-2 divide-y divide-neutral-100">
              {accordions.map((acc) => (
                <div key={acc.id} className="py-0.5">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between py-3.5 text-left group"
                  >
                    <span className="text-xs font-medium uppercase tracking-widest text-neutral-800 group-hover:text-neutral-500 transition-colors">
                      {acc.label}
                    </span>
                    <ChevronRight
                      size={13}
                      className={`text-neutral-400 transition-transform duration-300 ease-out ${activeAccordion === acc.id ? 'rotate-90 text-neutral-900' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeAccordion === acc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pt-0.5 text-xs text-neutral-500 leading-relaxed font-light space-y-1">
                          {acc.id === 'description' && (
                            <p>{product.description || 'Premium quality apparel constructed with precise detailing for standard architectural drapes and supreme comfort environments.'}</p>
                          )}
                          {acc.id === 'size' && (
                            <p>Fits accurate to standard premium metrics. If you favor dynamic layers or absolute strict contours, review the master grid sizing setup panel.</p>
                          )}
                          {acc.id === 'spec' && (
                            <div>
                              <p><strong>Composition Base:</strong> {product.material || 'Premium Eco Blend Material'}</p>
                              <p><strong>Care Parameters:</strong> Professional clean suggested / Machine gentle cold sequence.</p>
                            </div>
                          )}
                          {acc.id === 'style' && (
                            <p>Crafted to transition elegantly from refined morning workspaces into sophisticated evening configurations.</p>
                          )}
                          {acc.id === 'shipping' && (
                            <p>Complimentary secured routing granted on total cart values clearing over Rs. 1,999.</p>
                          )}
                          {acc.id === 'return' && (
                            <p>Return framework structured across a 30-day absolute window. Initiate collections directly inside your user profile hub.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Recommendations Carousels */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-neutral-100 pt-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-center text-neutral-400 mb-12">
              Complete the collection
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((item) => {
                const itemDiscount = item.original_price 
                  ? Math.round(((item.original_price - item.price) / item.original_price) * 100) 
                  : 0;
                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-neutral-50 mb-3 overflow-hidden">
                      <img
                        src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      />
                      {itemDiscount > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#5A2D0C] text-white text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5">
                            -{itemDiscount}%
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xs font-normal tracking-wide uppercase text-neutral-700 truncate mb-1 group-hover:text-neutral-950 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-900">Rs. {item.price.toLocaleString()}</span>
                      {item.original_price && (
                        <span className="text-[11px] text-neutral-400 line-through font-light">Rs. {item.original_price.toLocaleString()}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;