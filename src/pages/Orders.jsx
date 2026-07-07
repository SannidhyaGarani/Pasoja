import React, { useState, useEffect } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Package, ChevronRight, ShoppingBag, ArrowLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/Home/PageHeader";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login?redirect=orders"); return; }
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const ordersList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        ordersList.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setOrders(ordersList);
      } catch (error) { console.error("Error fetching orders:", error); }
      finally { setLoading(false); }
    };
    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E6D8C3] border-t-[#A85721] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="My Orders"
        subtitle="Track and manage your purchases"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Account", path: "/account" },
          { label: "Orders" }
        ]}
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <Link to="/account" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#A85721] mb-6 hover:text-[#5A2D0C] transition-colors">
          <ArrowLeft size={13} />
          Back to Account
        </Link>

        {orders.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F7F2EA] border border-[#E6D8C3] flex items-center justify-center text-[#A85721] mx-auto mb-5">
              <ShoppingBag size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">No orders found</h3>
            <p className="text-[13px] text-[#333333]/50 leading-relaxed mb-6">
              You haven't placed any orders yet. Start shopping to see them here.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A2D0C] text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#A85721] transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#F7F2EA] rounded-sm border border-[#E6D8C3]/40 overflow-hidden hover:border-[#A85721]/15 transition-all">
                <div className="p-5 md:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#E6D8C3]/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E6D8C3]/40 flex items-center justify-center text-[#A85721]">
                        <Package size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A85721]">Order ID</p>
                        <p className="text-[13px] font-bold text-[#1a1a1a]">#{order.id.slice(0, 10).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A85721]">Placed On</p>
                        <p className="text-[12px] font-medium text-[#1a1a1a]">
                          {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently'}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-sm text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                        order.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : order.status === 'failed' ? 'bg-red-50 text-red-700 border-red-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {order.status === 'confirmed' ? <CheckCircle2 size={11} /> :
                         order.status === 'failed' ? <XCircle size={11} /> :
                         <Clock size={11} />}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-1.5">
                        <div className="w-14 h-14 bg-white rounded-sm p-1.5 border border-[#E6D8C3]/30 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[13px] font-bold text-[#1a1a1a]">{item.name}</h4>
                          <p className="text-[11px] text-[#5A2D0C]/35 font-medium">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="text-[13px] font-bold text-[#1a1a1a]">₹{item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-[#E6D8C3]/40 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A85721]">Total</p>
                      <p className="text-xl font-bold text-[#1a1a1a]">₹{order.total}</p>
                    </div>
                    <Link to="/shop" className="text-[11px] font-bold text-[#A85721] hover:text-[#5A2D0C] flex items-center gap-1 group uppercase tracking-wider">
                      Reorder
                      <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
