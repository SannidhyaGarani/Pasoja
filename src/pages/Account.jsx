import React, { useState, useEffect } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  User, Package, Heart, LogOut, ChevronRight, Settings, ShoppingBag,
  CreditCard, MapPin, Bell, Award
} from "lucide-react";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({ cart: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const fetchData = async () => {
      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) setUserData(userSnap.data());
        const cartSnap = await getDocs(collection(db, "users", user.uid, "cart"));
        const wishlistSnap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        const ordersSnap = await getDocs(query(collection(db, "orders"), where("userId", "==", user.uid)));
        const ordersList = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        ordersList.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setRecentOrders(ordersList.slice(0, 5));
        setStats({ cart: cartSnap.size, wishlist: wishlistSnap.size });
      } catch (error) { console.error("Error fetching account data:", error); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try { await logout(); navigate("/"); }
    catch (error) { console.error("Logout failed:", error); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E6D8C3] border-t-[#A85721] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] pt-28 md:pt-36 pb-24 px-5 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">

        {/* ACCOUNT HEADER */}
        <div className="bg-[#5A2D0C] rounded-sm p-6 sm:p-8 md:p-10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A85721]/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="relative">
                <div className="w-18 h-18 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white overflow-hidden p-0.5">
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={30} strokeWidth={1.2} className="text-white/50" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#A85721] rounded-full flex items-center justify-center text-white border-2 border-[#5A2D0C]">
                  <Award size={11} strokeWidth={1.5} />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {userData?.displayName || "Member"}
                </h1>
                <p className="text-sm text-white/60 font-medium">{user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-sm bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">Member</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="h-10 px-5 rounded-sm bg-white text-[#5A2D0C] font-bold text-[11px] uppercase tracking-[0.15em] hover:bg-red-50 hover:text-red-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <LogOut size={13} strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: Stats & Nav */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Link to="/cart" className="group bg-[#F7F2EA] p-5 rounded-sm border border-[#E6D8C3]/40 hover:border-[#A85721]/20 transition-all">
                <div className="w-9 h-9 rounded-full bg-white border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mb-3 group-hover:bg-[#5A2D0C] group-hover:text-white group-hover:border-[#5A2D0C] transition-all">
                  <ShoppingBag size={15} strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{stats.cart}</p>
                <p className="text-[10px] font-bold text-[#A85721] uppercase tracking-wider mt-0.5">In Cart</p>
              </Link>
              <Link to="/wishlist" className="group bg-[#F7F2EA] p-5 rounded-sm border border-[#E6D8C3]/40 hover:border-[#A85721]/20 transition-all">
                <div className="w-9 h-9 rounded-full bg-white border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mb-3 group-hover:bg-[#5A2D0C] group-hover:text-white group-hover:border-[#5A2D0C] transition-all">
                  <Heart size={15} strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-bold text-[#1a1a1a]">{stats.wishlist}</p>
                <p className="text-[10px] font-bold text-[#A85721] uppercase tracking-wider mt-0.5">Wishlist</p>
              </Link>
            </div>

            <div className="bg-[#F7F2EA] rounded-sm border border-[#E6D8C3]/40 p-1.5">
              <span className="block px-3 py-2 text-[10px] font-bold text-[#A85721] uppercase tracking-[0.2em]">Quick Links</span>
              {[
                { icon: Settings, label: "Profile Settings" },
                { icon: Package, label: "Order History" },
                { icon: CreditCard, label: "Payment Methods" },
                { icon: MapPin, label: "Addresses" },
                { icon: Bell, label: "Notifications" },
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-3 rounded-sm hover:bg-white transition-all group text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#E6D8C3]/40 text-[#A85721] flex items-center justify-center group-hover:bg-[#5A2D0C] group-hover:text-white group-hover:border-[#5A2D0C] transition-colors">
                      <item.icon size={12} strokeWidth={1.5} />
                    </div>
                    <span className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</span>
                  </div>
                  <ChevronRight size={12} className="text-[#5A2D0C]/20 group-hover:text-[#A85721] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Recent Orders */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#F7F2EA] rounded-sm border border-[#E6D8C3]/40 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E6D8C3]/40">
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">Recent Orders</h3>
                  <p className="text-[12px] text-[#5A2D0C]/40 mt-0.5">Track and manage your latest purchases</p>
                </div>
                <Link to="/orders" className="self-start h-8 px-4 border border-[#E6D8C3] bg-white rounded-sm text-[10px] font-bold text-[#5A2D0C] uppercase tracking-wider hover:border-[#5A2D0C] hover:bg-[#5A2D0C] hover:text-white transition-all flex items-center">
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="divide-y divide-[#E6D8C3]/30">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="group py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#E6D8C3]/40 flex items-center justify-center text-[#A85721]">
                          <Package size={16} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1a1a1a] group-hover:text-[#A85721] transition-colors">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-[11px] text-[#5A2D0C]/35 font-medium">
                            {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto flex sm:flex-col justify-between sm:items-end items-center gap-1">
                        <p className="text-sm font-bold text-[#1a1a1a]">₹{order.total}</p>
                        <span className={`px-2.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border ${
                          order.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : order.status === 'failed' ? 'bg-red-50 text-red-700 border-red-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14">
                  <div className="w-14 h-14 rounded-full bg-white border border-[#E6D8C3] flex items-center justify-center text-[#A85721]/40 mx-auto mb-4">
                    <ShoppingBag size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-bold text-[#1a1a1a] mb-1">No orders yet</h4>
                  <p className="text-[12px] text-[#5A2D0C]/40 mb-5">Start shopping to see your orders here.</p>
                  <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A2D0C] text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded-sm hover:bg-[#A85721] transition-all">
                    Browse Shop <ChevronRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
