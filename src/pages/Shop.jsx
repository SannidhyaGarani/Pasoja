import React, { useState, useEffect } from "react";
import { db } from "../components/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, Heart, ArrowUpRight, X, Sparkles, ShoppingBag, Eye, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Home/PageHeader";
import { useStore } from "../components/StoreProvider";

const ProductCard = ({ product, idx, triggerToast }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } = useStore();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  const defaultSize = product.size_prices && product.size_prices.length > 0
    ? (product.size_prices.find(s => s.size?.toUpperCase() === 'L') || product.size_prices[0])
    : null;

  const displayPrice = defaultSize ? defaultSize.price : product.price;
  const originalPrice = product.mrp || product.original_price || Math.round(displayPrice * 1.25);
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
      transition={{ delay: idx * 0.04, duration: 0.5 }}
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

        {/* Wishlist Button */}
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

        {/* Quick Actions (desktop) */}
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

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const categories = ["All", "Men", "Women", "T-Shirts", "Jeans", "Jackets", "Sweaters", "Shirts", "Coats"];

  let filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Sort
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Shop All"
        subtitle={`Browse our curated collection of premium apparel`}
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pb-20 md:pb-24 pt-6 md:pt-10">

        {/* FILTER / SEARCH BAR */}
        <div className="flex flex-col gap-4 mb-8 md:mb-10">
          {/* Top Bar: Search + Sort + Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/30" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-[#F7F2EA] border border-[#E6D8C3]/50 rounded-sm pl-10 pr-4 py-3 text-[13px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A2D0C]/30 hover:text-[#5A2D0C] transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#F7F2EA] border border-[#E6D8C3]/50 rounded-sm px-4 py-3 pr-9 text-[12px] font-semibold uppercase tracking-wider text-[#5A2D0C] outline-none focus:border-[#A85721] transition-colors cursor-pointer w-full sm:w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A2D0C]/40 pointer-events-none" />
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-2 bg-[#F7F2EA] border border-[#E6D8C3]/50 rounded-sm px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-[#5A2D0C]"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-[#5A2D0C] text-[#F7F2EA] border-[#5A2D0C] shadow-sm"
                      : "bg-white text-[#5A2D0C]/60 border-[#E6D8C3]/50 hover:border-[#A85721]/30 hover:text-[#5A2D0C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-[11px] text-[#5A2D0C]/40 font-medium">
            <span>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</span>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="text-[#A85721] hover:text-[#5A2D0C] transition-colors uppercase tracking-wider font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-[#F7F2EA] animate-pulse rounded-sm" />
                <div className="h-3 bg-[#F7F2EA] rounded animate-pulse w-2/3" />
                <div className="h-3 bg-[#F7F2EA] rounded animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx}
                triggerToast={triggerToast}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#F7F2EA] border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mx-auto mb-5">
              <Search size={22} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
              No Products Found
            </h3>
            <p className="text-[13px] text-[#333333]/50 leading-relaxed mb-6">
              We couldn't find any products matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#A85721] hover:text-[#5A2D0C] transition-colors group"
            >
              <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-[#A85721]">Reset All Filters</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm w-auto"
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
    </div>
  );
};

export default Shop;
