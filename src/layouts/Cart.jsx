import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ShieldCheck, Truck, RotateCcw, ChevronRight, Gift, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Home/PageHeader";
import { useStore } from "../components/StoreProvider";
import { useAuth } from "../components/useAuth";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, loading } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const total = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E6D8C3] border-t-[#A85721] rounded-full animate-spin" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A2D0C]/40">Loading your bag...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Shopping Bag"
        subtitle="Review your selections before checkout"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Cart" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* CART ITEMS */}
          <div className="lg:col-span-8 w-full">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 max-w-md mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F7F2EA] border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mx-auto mb-5">
                    <ShoppingBag size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Your bag is empty</h3>
                  <p className="text-[13px] text-[#333333]/50 leading-relaxed mb-6">
                    Looks like you haven't added anything yet. Start exploring our collection.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#5A2D0C] text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#A85721] transition-all shadow-sm"
                  >
                    Continue Shopping
                    <ArrowRight size={13} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6D8C3]/40">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A85721]">
                      {cart.length} {cart.length === 1 ? "Item" : "Items"}
                    </h2>
                  </div>

                  <motion.div layout className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item, idx) => (
                        <motion.div
                          key={`${item.cartId || item.id}-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.4 }}
                          className="group bg-[#F7F2EA] rounded-sm p-4 flex flex-col sm:flex-row items-center gap-4 border border-[#E6D8C3]/30 hover:border-[#A85721]/15 transition-all"
                        >
                          <Link to={`/product/${item.id}`} className="w-20 h-24 bg-white rounded-sm shrink-0 overflow-hidden border border-[#E6D8C3]/30 p-1.5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </Link>

                          <div className="flex-1 text-center sm:text-left space-y-0.5">
                            {item.category && (
                              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A85721]">{item.category}</span>
                            )}
                            <h3 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#A85721] transition-colors leading-tight">
                              {item.name}
                            </h3>
                            {item.size && (
                              <p className="text-[11px] font-medium text-[#5A2D0C]/65 uppercase tracking-wider">
                                Size: {item.size}
                              </p>
                            )}
                            <p className="text-sm font-semibold text-[#1a1a1a] mt-1">
                              ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="flex items-center bg-white border border-[#E6D8C3]/40 rounded-sm h-9">
                            <button
                              onClick={() => updateQuantity(item.cartId || item.id, -1)}
                              className="w-8 h-full flex items-center justify-center text-[#5A2D0C]/40 hover:text-[#A85721] transition-colors text-sm font-bold"
                            >−</button>
                            <span className="w-7 text-center text-[13px] font-bold text-[#1a1a1a]">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId || item.id, 1)}
                              className="w-8 h-full flex items-center justify-center text-[#5A2D0C]/40 hover:text-[#A85721] transition-colors text-sm font-bold"
                            >+</button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartId || item.id)}
                            className="p-2.5 rounded-sm bg-white text-[#5A2D0C]/30 border border-[#E6D8C3]/30 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ORDER SUMMARY */}
          {cart.length > 0 && (
            <aside className="lg:col-span-4 w-full sticky top-32">
              <div className="bg-[#F7F2EA] rounded-sm border border-[#E6D8C3]/50 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-[#1a1a1a] mb-5 pb-3 border-b border-[#E6D8C3]/40">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-[12px] text-[#5A2D0C]/50">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1a1a1a]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-[#5A2D0C]/50">
                    <span>Shipping</span>
                    <span className="text-[#A85721] font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-[#5A2D0C]/50">
                    <span>GST (Included)</span>
                    <span className="font-bold text-[#1a1a1a]">₹0</span>
                  </div>

                  {/* Gift Note */}
                  <div className="pt-2 border-t border-[#E6D8C3]/30">
                    <button
                      onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
                      className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#A85721] hover:text-[#5A2D0C] transition-colors"
                    >
                      <Gift size={13} strokeWidth={1.5} />
                      <span>{isGiftNoteOpen ? "Remove gift note" : "Add a gift note"}</span>
                    </button>
                    <AnimatePresence>
                      {isGiftNoteOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-2"
                        >
                          <textarea
                            value={giftNote}
                            onChange={(e) => setGiftNote(e.target.value)}
                            placeholder="Write your message..."
                            maxLength={180}
                            className="w-full h-16 bg-white border border-[#E6D8C3] rounded-sm p-2.5 text-[12px] text-[#1a1a1a] placeholder-[#5A2D0C]/25 focus:outline-none focus:border-[#A85721] resize-none"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-4 mt-2 border-t border-dashed border-[#E6D8C3] flex justify-between items-end">
                    <span className="text-[11px] font-bold text-[#A85721] uppercase tracking-[0.15em]">Total</span>
                    <span className="text-2xl font-bold text-[#1a1a1a]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#5A2D0C] hover:bg-[#A85721] text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm mb-5"
                >
                  <span>Checkout</span>
                  <ChevronRight size={14} />
                </button>

                <div className="space-y-3 pt-4 border-t border-[#E6D8C3]/30">
                  {[
                    { icon: ShieldCheck, title: "Secure Checkout", sub: "256-bit encryption" },
                    { icon: Truck, title: "Free Shipping", sub: "On orders ₹1999+" },
                    { icon: RotateCcw, title: "Easy Returns", sub: "30-day hassle-free" },
                  ].map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#E6D8C3]/40 flex items-center justify-center text-[#A85721] shrink-0">
                          <Icon size={13} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wide">{badge.title}</p>
                          <p className="text-[10px] text-[#5A2D0C]/35">{badge.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;