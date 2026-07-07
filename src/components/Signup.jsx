import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate("/");
    } catch {
      setError("Failed to create account. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex relative overflow-hidden pt-16 md:pt-0">
      <div className="max-w-[1300px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-screen relative z-10 py-20 lg:py-0 w-full">

        {/* LEFT: Brand Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 space-y-6"
        >
          <Link to="/" className="inline-flex">
            <img src="/img/Pasoja option-01.png" alt="Pasoja" className="h-10 md:h-12 object-contain" />
          </Link>

          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
            Begin your<br />
            style journey with{" "}
            <span className="text-[#A85721]">Pasoja.</span>
          </h1>

          <div className="w-12 h-[2px] bg-[#A85721]" />

          <p className="text-[15px] text-[#333333]/60 leading-relaxed max-w-md">
            Create an account to track orders, save your wishlist, and enjoy a faster checkout experience.
          </p>
        </motion.div>

        {/* RIGHT: Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:w-[460px] w-full"
        >
          <div className="bg-white border border-[#E6D8C3]/50 rounded-sm p-7 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-1">
                Create Account
              </h2>
              <p className="text-[13px] text-[#5A2D0C]/40">
                Join us for a premium shopping experience
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 overflow-hidden"
                >
                  <div className="p-3.5 bg-red-50 border border-red-100 rounded-sm flex items-start gap-3 text-red-700 text-[13px] font-medium">
                    <AlertCircle size={15} className="shrink-0 text-red-500 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/25" />
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="w-full pl-10 pr-4 py-3 bg-[#F7F2EA] border border-[#E6D8C3] rounded-sm text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/25" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full pl-10 pr-4 py-3 bg-[#F7F2EA] border border-[#E6D8C3] rounded-sm text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5A2D0C]/60">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/25" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full pl-10 pr-10 py-3 bg-[#F7F2EA] border border-[#E6D8C3] rounded-sm text-[14px] text-[#1a1a1a] outline-none focus:border-[#A85721] transition-colors placeholder:text-[#5A2D0C]/25" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A2D0C]/25 hover:text-[#5A2D0C] transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#5A2D0C] hover:bg-[#A85721] text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-sm mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[13px] text-[#5A2D0C]/40">
                Already have an account?{" "}
                <Link to="/login" className="text-[#A85721] font-bold hover:text-[#5A2D0C] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
