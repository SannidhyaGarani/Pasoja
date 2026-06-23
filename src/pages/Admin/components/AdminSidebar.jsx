import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Shirt
} from 'lucide-react';

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingCart },
  { name: "Users", icon: Users },
];

const AdminSidebar = ({ activeItem, setActiveItem }) => {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col shadow-sm">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#c9a962] text-[#1a1a1a] flex items-center justify-center shadow-md">
            <Shirt size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-poppins font-bold tracking-tight text-[#1a1a1a]">
              Clothing Admin
            </p>
            <p className="text-sm text-gray-500">Product Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = item.name === activeItem;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? "bg-[#c9a962] text-[#1a1a1a] shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#1a1a1a]"
                }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-5 border-t border-gray-200 bg-gray-50">
        <p className="text-sm font-semibold text-[#1a1a1a] mb-1">Session</p>
        <p className="text-sm text-gray-500">Changes are auto-saved to Firestore</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
