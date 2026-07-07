import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, addDoc, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, MapPin, User, Phone, Mail, CheckCircle, Sparkles, X, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Home/PageHeader";

const Checkout = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
    paymentMethod: "online",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const load = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "cart"));
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setFormData(prev => ({ ...prev, name: user.displayName || "", email: user.email || "" }));
      } catch (error) { console.error("Error loading cart:", error); }
      finally { setLoading(false); }
    };
    load();
    return () => { document.body.removeChild(script); };
  }, [user]);

  const triggerToast = (msg) => { setFeedbackMessage(msg); setTimeout(() => setFeedbackMessage(null), 4000); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  const clearCart = async () => {
    try {
      const snap = await getDocs(collection(db, "users", user.uid, "cart"));
      await Promise.all(snap.docs.map(d => deleteDoc(doc(db, "users", user.uid, "cart", d.id))));
    } catch (e) { console.error("Error clearing cart:", e); }
  };

  const saveOrder = async (paymentId = "COD", status = "confirmed", paymentStatus = "captured") => {
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid, userEmail: user.email, items, total,
        shipping: formData, paymentMethod: formData.paymentMethod,
        paymentId, status, paymentStatus, createdAt: serverTimestamp(),
      });
      if (status === "confirmed") { await clearCart(); setOrderStatus("success"); }
      else { setOrderStatus("failed"); }
    } catch (error) {
      console.error("Error saving order:", error);
      triggerToast("Order save failed. Please contact support.");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) { triggerToast("Your bag is empty!"); return; }
    setIsProcessing(true);
    if (formData.paymentMethod === "online") {
      const options = {
        key: "rzp_test_YOUR_KEY_HERE", amount: total * 100, currency: "INR",
        name: "Pasoja", description: "Premium Apparel Order", image: "/img/Pasoja option-01.png",
        handler: async (response) => { await saveOrder(response.razorpay_payment_id, "confirmed", "captured"); setIsProcessing(false); },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#5A2D0C" },
        modal: { ondismiss: () => setIsProcessing(false) }
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async (response) => { await saveOrder(response.error.metadata.payment_id, "failed", "failed"); setIsProcessing(false); });
      rzp.open();
    } else {
      await saveOrder("COD", "confirmed", "pending");
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E6D8C3] border-t-[#A85721] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="Checkout" subtitle="Secure your order" breadcrumbItems={[{ label: "Home", path: "/" }, { label: "Checkout" }]} />
        <div className="flex flex-col items-center justify-center py-28 px-6 text-center">
          <div className="w-16 h-16 bg-[#F7F2EA] rounded-full flex items-center justify-center mb-5 border border-[#E6D8C3]">
            <ShieldCheck size={28} strokeWidth={1.2} className="text-[#A85721]" />
          </div>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Sign in Required</h2>
          <p className="text-[13px] text-[#333]/50 max-w-xs mb-6 leading-relaxed">Please sign in to proceed with your order.</p>
          <Link to="/login?redirect=checkout" className="px-8 py-3 bg-[#5A2D0C] text-white rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-[#A85721] transition-all shadow-sm">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (orderStatus === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center py-20">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
            <CheckCircle size={36} className="text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Order Confirmed!</h2>
          <p className="text-[14px] text-[#333]/50 mb-8 leading-relaxed">Thank you for your purchase. We're preparing your order for shipment.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders" className="px-6 py-3 bg-[#5A2D0C] text-white rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#A85721] transition-all">View Orders</Link>
            <Link to="/shop" className="px-6 py-3 bg-white border border-[#E6D8C3] text-[#5A2D0C] rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#F7F2EA] transition-all">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderStatus === "failed") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center py-20">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
            <X size={36} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Payment Failed</h2>
          <p className="text-[14px] text-[#333]/50 mb-8 leading-relaxed">The transaction could not be completed. Please try again.</p>
          <button onClick={() => setOrderStatus(null)} className="px-8 py-3 bg-[#5A2D0C] text-white rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-[#A85721] transition-all">Try Again</button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-[#F7F2EA] border border-[#E6D8C3] rounded-sm px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25";

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Checkout" subtitle="Complete your purchase" breadcrumbItems={[{ label: "Home", path: "/" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* FORM */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5A2D0C] text-white flex items-center justify-center"><MapPin size={16} /></div>
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/20" />
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={`${inputClass} pl-10`} placeholder="Your name" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Email</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/20" />
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={`${inputClass} pl-10`} placeholder="email@example.com" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Phone Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/20" />
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className={`${inputClass} pl-10`} placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Full Address</label>
                  <textarea name="address" required rows={3} value={formData.address} onChange={handleInputChange} className={`${inputClass} resize-none`} placeholder="Street, house number, area" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {["city", "state", "pincode"].map((field) => (
                    <div key={field} className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60 capitalize">{field}</label>
                      <input type="text" name={field} required value={formData[field]} onChange={handleInputChange} className={inputClass} placeholder={field === 'pincode' ? "000000" : ""} />
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-5 pt-6 border-t border-[#E6D8C3]/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5A2D0C] text-white flex items-center justify-center"><CreditCard size={16} /></div>
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Payment Method</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "online", label: "Online Payment", desc: "Cards, UPI, Netbanking", icon: Zap },
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when delivered", icon: Sparkles }
                  ].map((method) => {
                    const Icon = method.icon;
                    const active = formData.paymentMethod === method.id;
                    return (
                      <button key={method.id} type="button" onClick={() => setFormData(p => ({ ...p, paymentMethod: method.id }))}
                        className={`p-4 rounded-sm border-2 transition-all flex items-start gap-3 text-left ${active ? 'border-[#5A2D0C] bg-[#F7F2EA]' : 'border-[#E6D8C3]/50 bg-white hover:border-[#A85721]/30'}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-[#5A2D0C] text-white' : 'bg-[#F7F2EA] text-[#A85721]'}`}><Icon size={16} /></div>
                        <div>
                          <p className={`text-[12px] font-bold uppercase tracking-wider ${active ? 'text-[#5A2D0C]' : 'text-[#5A2D0C]/50'}`}>{method.label}</p>
                          <p className="text-[11px] text-[#5A2D0C]/40 mt-0.5">{method.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <button type="submit" disabled={isProcessing}
                className="w-full py-3.5 bg-[#5A2D0C] hover:bg-[#A85721] text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-sm transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2.5 shadow-sm">
                {isProcessing ? <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Processing...</> : <>Place Order</>}
              </button>
            </form>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-[#F7F2EA] rounded-sm border border-[#E6D8C3]/50 p-6 shadow-sm sticky top-32">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-5 pb-3 border-b border-[#E6D8C3]/40">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-white rounded-sm shrink-0 p-1.5 border border-[#E6D8C3]/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 py-0.5">
                      <h4 className="text-[13px] font-bold text-[#1a1a1a] line-clamp-1">{item.name}</h4>
                      {item.size && (
                        <p className="text-[11px] text-[#5A2D0C]/65 uppercase tracking-wider mt-0.5">
                          Size: {item.size}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[13px] font-semibold text-[#1a1a1a]">₹{item.price}</span>
                        <span className="text-[10px] text-[#5A2D0C]/40 bg-white px-1.5 py-0.5 rounded-sm border border-[#E6D8C3]/30">×{item.quantity || 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5 pt-4 border-t border-dashed border-[#E6D8C3]">
                <div className="flex justify-between text-[12px]"><span className="text-[#5A2D0C]/50">Subtotal</span><span className="font-bold text-[#1a1a1a]">₹{total}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-[#5A2D0C]/50">Delivery</span><span className="text-[#A85721] font-semibold">Free</span></div>
                <div className="flex justify-between pt-3 border-t border-[#E6D8C3]/40 items-baseline">
                  <span className="text-[11px] font-bold text-[#A85721] uppercase tracking-[0.15em]">Total</span>
                  <span className="text-2xl font-bold text-[#1a1a1a]">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#5A2D0C] text-[#F7F2EA] px-5 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 max-w-sm w-auto">
            <Sparkles size={13} className="text-[#A85721]" />
            <p className="text-[13px] font-semibold">{feedbackMessage}</p>
            <button onClick={() => setFeedbackMessage(null)} className="opacity-60 hover:opacity-100 ml-2"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
