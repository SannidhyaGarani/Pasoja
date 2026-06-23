import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../components/Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Import components
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import MetricCards from "./components/MetricCards";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import UsersTable from "./components/UsersTable";
import ClothingProductForm from "./components/ProductForm";
import { X } from "lucide-react";

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Mahanta_group");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dlsbj8nug/image/upload",
    data
  );

  return res.data.secure_url;
};

const Admin = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [users, setUsers] = useState([]);

  const loadProducts = async () => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setProducts(list);
  };

  const loadUsers = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(list);
    } catch (error) {
      console.log("Note: Users collection may not exist yet or error fetching users");
    }
  };

  useEffect(() => {
    loadProducts();
    loadUsers();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleAddProductSubmit = async (docData) => {
    await addDoc(collection(db, "products"), {
      ...docData,
      createdAt: serverTimestamp(),
    });
    setIsProductModalOpen(false);
    await loadProducts();
  };

  const handleEditProductSubmit = async (docData) => {
    if (!editingProduct?.id) return;
    await updateDoc(doc(db, "products", editingProduct.id), docData);
    setIsEditModalOpen(false);
    setEditingProduct(null);
    await loadProducts();
  };

  const renderMainContent = () => {
    switch (activeItem) {
      case "Products":
        return (
          <>
            <MetricCards />
            <ProductsTable
              products={products}
              onEdit={handleEditClick}
              onDelete={handleDeleteProduct}
            />
          </>
        );
      case "Orders":
        return (
          <>
            <MetricCards />
            <OrdersTable />
          </>
        );
      case "Users":
        return (
          <>
            <MetricCards />
            <UsersTable users={users} />
          </>
        );
      default:
        return (
          <>
            <MetricCards />
            <div className="grid gap-6 lg:grid-cols-2">
              <ProductsTable
                products={products}
                onEdit={handleEditClick}
                onDelete={handleDeleteProduct}
              />
              <OrdersTable />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-[#1a1a1a]">
      <AdminSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <main className="flex-1 px-6 py-8 md:px-10 lg:px-12 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <AdminHeader activeItem={activeItem} />

          {activeItem === "Products" && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#c9a962] text-[#1a1a1a] text-sm font-bold shadow-lg shadow-[#c9a962]/20 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Add New Product
              </button>
            </div>
          )}

          {renderMainContent()}
        </div>
      </main>

      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-7 py-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-poppins font-bold text-[#1a1a1a]">
                  Add New Clothing Product
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the details for your new clothing item
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="px-7 py-6">
              <ClothingProductForm
                onSuccess={handleAddProductSubmit}
              />
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-7 py-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-poppins font-bold text-[#1a1a1a]">
                  Edit Product
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update details for {editingProduct.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="px-7 py-6">
              <ClothingProductForm
                product={editingProduct}
                isEdit={true}
                onSuccess={handleEditProductSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
