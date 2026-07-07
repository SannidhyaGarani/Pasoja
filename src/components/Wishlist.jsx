import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, ArrowRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "./Home/PageHeader";
import { useStore } from "./StoreProvider";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, loading } = useStore();
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleMoveToCart = async (product) => {
    const defaultSize = product.size_prices && product.size_prices.length > 0
      ? (product.size_prices.find(s => s.size?.toUpperCase() === 'L') || product.size_prices[0])
      : null;
    await addToCart(product, defaultSize);
    await removeFromWishlist(product.id);
    triggerToast("Moved to your bag!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E6D8C3] border-t-[#A85721] rounded-full animate-spin" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A2D0C]/40">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Wishlist"
        subtitle="Your saved favourites"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Wishlist" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14">
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[#F7F2EA] border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mx-auto mb-5">
              <Heart size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Your wishlist is empty</h3>
            <p className="text-[13px] text-[#333333]/50 leading-relaxed mb-6">
              Save items you love to your wishlist and come back to them anytime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#5A2D0C] text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#A85721] transition-all shadow-sm"
            >
              Explore Collection
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6D8C3]/40">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85721]">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} Saved
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
              {wishlist.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="group relative flex flex-col"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => { removeFromWishlist(item.id); triggerToast("Removed from wishlist"); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#5A2D0C]/40 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <X size={14} strokeWidth={2} />
                  </button>

                  {/* Image */}
                  <div
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="relative w-full aspect-[3/4] overflow-hidden bg-[#F7F2EA] rounded-sm cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="pt-3 flex-grow flex flex-col">
                    {item.category && (
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#A85721] font-semibold mb-1">{item.category}</span>
                    )}
                    <h3
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="text-[13px] sm:text-sm font-semibold text-[#1a1a1a] leading-snug mb-2 group-hover:text-[#A85721] transition-colors cursor-pointer line-clamp-2"
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-bold text-[#1a1a1a]">₹{Number(item.price).toLocaleString("en-IN")}</span>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-9 h-9 bg-[#5A2D0C] text-white rounded-full flex items-center justify-center hover:bg-[#A85721] transition-all shadow-sm"
                      >
                        <ShoppingBag size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm w-auto"
          >
            <Sparkles size={13} />
            <p className="text-[13px] font-semibold whitespace-nowrap">{feedbackMessage}</p>
            <button onClick={() => setFeedbackMessage(null)} className="opacity-60 hover:opacity-100 ml-2"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;
