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
    <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden pt-[72px] md:pt-[80px]">
      <div className="max-w-[1300px] mx-auto px-5 md:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[calc(100vh-80px)] relative z-10 py-16 lg:py-0 w-full">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          className="lg:w-1/2 space-y-6"
        >
          <Link to="/" className="inline-flex">
            <img src="/img/Pasoja option-01.png" alt="Pasoja" className="h-10 md:h-12 object-contain brightness-0 invert" />
          </Link>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-widest uppercase">
            Begin Your<br />Style Journey.
          </h1>
          <div className="w-10 h-[1px] bg-white/20" />
          <p className="text-[15px] text-white/35 leading-relaxed max-w-md">
            Create an account to track orders, save your wishlist, and enjoy a faster checkout experience.
          </p>
        </motion.div>

        {/* RIGHT: Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:w-[460px] w-full"
        >
          <div className="bg-[#0c0c0c] border border-white/[0.08] p-7 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-light text-white tracking-widest uppercase mb-1">Create Account</h2>
              <p className="text-[13px] text-white/30">Join us for a premium shopping experience</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-5 overflow-hidden">
                  <div className="p-3.5 bg-red-950/50 border border-red-800/40 flex items-start gap-3 text-red-400 text-[12px] font-medium">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" required
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" required
                    className="w-full pl-10 pr-10 py-3 bg-[#0a0a0a] border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-white hover:bg-white/85 text-black font-semibold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <><span>Create Account</span><ArrowRight size={14} /></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
              <p className="text-[13px] text-white/25">
                Already have an account?{" "}
                <Link to="/login" className="text-white font-bold hover:text-white/60 transition-colors">Sign in</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
