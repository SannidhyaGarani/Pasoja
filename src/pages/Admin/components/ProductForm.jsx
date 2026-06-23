import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../Admin";

const ClothingProductForm = ({ onSuccess, isEdit = false, product = null }) => {
  // Initialize size_prices from existing product or default with empty array
  const initialSizePrices = product?.size_prices || [];
  const [sizePrices, setSizePrices] = useState(initialSizePrices.length > 0 ? initialSizePrices : [{ size: "", price: 0, original_price: 0 }]);

  const { register, handleSubmit, reset, formState, setValue, watch } = useForm({
    defaultValues: {
      name: product?.name || "",
      category: product?.category || "",
      description: product?.description || "",
      price: product?.price || 0,
      original_price: product?.original_price || 0,
      stock_status: product?.stock_status || "In Stock",
      sizes: product?.sizes || "",
      colors: product?.colors || "",
      material: product?.material || "",
      rating: product?.rating || 4.5,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Jackets",
    "Dresses",
    "Skirts",
    "Shorts",
    "Sweaters",
    "Accessories"
  ];

  const addSizePrice = () => {
    setSizePrices([...sizePrices, { size: "", price: 0, original_price: 0 }]);
  };

  const removeSizePrice = (index) => {
    setSizePrices(sizePrices.filter((_, i) => i !== index));
  };

  const updateSizePrice = (index, field, value) => {
    const updated = [...sizePrices];
    updated[index][field] = value;
    setSizePrices(updated);
  };

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);
    try {
      const files = values.images?.[0] ? Array.from(values.images) : [];
      const uploadUrls = [];
      if (files.length > 0) {
        for (const file of files) {
          const url = await uploadToCloudinary(file);
          uploadUrls.push(url);
        }
      }

      // Process size_prices - filter out empty sizes
      const validSizePrices = sizePrices.filter(sp => sp.size.trim() !== "");
      
      // Use the first size price as default price if available
      const defaultPrice = validSizePrices.length > 0 ? validSizePrices[0].price : Number(values.price) || 0;
      const defaultOriginalPrice = validSizePrices.length > 0 ? validSizePrices[0].original_price : Number(values.original_price) || 0;

      const docData = {
        name: values.name,
        category: values.category,
        description: values.description,
        price: defaultPrice,
        original_price: defaultOriginalPrice,
        size_prices: validSizePrices,
        stock_status: values.stock_status,
        sizes: validSizePrices.map(sp => sp.size).join(", "),
        colors: values.colors,
        material: values.material,
        rating: Number(values.rating) || 4.5,
        images: uploadUrls,
        image: uploadUrls[0] || (product?.image || ""),
      };

      if (onSuccess) {
        onSuccess(docData);
      }
      reset();
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Product Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            placeholder="e.g. Premium Cotton T-Shirt"
            {...register("name", { required: true })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Category
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
          Description
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white min-h-[100px]"
          placeholder="Describe the clothing item, materials, and style..."
          rows={4}
          {...register("description")}
        />
      </div>

      {/* Size-Price Pairs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Size & Price
          </label>
          <button
            type="button"
            onClick={addSizePrice}
            className="px-4 py-2 bg-[#c9a962]/10 text-[#c9a962] text-sm font-bold rounded-lg hover:bg-[#c9a962]/20 transition-colors"
          >
            + Add Size
          </button>
        </div>

        {sizePrices.map((sp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white border border-gray-200 p-4 rounded-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Size</label>
              <input
                type="text"
                value={sp.size}
                onChange={(e) => updateSizePrice(index, "size", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none text-sm"
                placeholder="e.g. S"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Original Price</label>
              <input
                type="number"
                value={sp.original_price}
                onChange={(e) => updateSizePrice(index, "original_price", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none text-sm"
                placeholder="2999"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sale Price</label>
              <input
                type="number"
                value={sp.price}
                onChange={(e) => updateSizePrice(index, "price", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none text-sm"
                placeholder="1999"
              />
            </div>
            {sizePrices.length > 1 && (
              <button
                type="button"
                onClick={() => removeSizePrice(index)}
                className="px-3 py-2 bg-red-100 text-red-600 text-sm font-bold rounded-lg hover:bg-red-200 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Stock Status
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            {...register("stock_status")}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Colors
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            placeholder="e.g. Black, White, Blue"
            {...register("colors")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Material
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            placeholder="e.g. 100% Cotton"
            {...register("material")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] outline-none transition-all text-sm bg-white"
            placeholder="4.5"
            {...register("rating")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wide">
          Product Images
        </label>
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full px-4 py-3 rounded-xl border border-dashed border-[#c9a962] hover:border-[#1a1a1a] transition-colors text-sm file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#c9a962]/10 file:text-[#c9a962] cursor-pointer bg-white"
            {...register("images")}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-300 mt-4">
        {formState.isSubmitted && !loading && !error && (
          <span className="flex items-center gap-1.5 text-sm font-bold text-[#c9a962]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a962]" />
            Product {isEdit ? "Updated" : "Created"} Successfully
          </span>
        )}
        {error && (
          <span className="text-sm font-bold text-red-600">
            Error: {error}
          </span>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-[#c9a962] text-[#1a1a1a] text-sm font-bold shadow-lg shadow-[#c9a962]/20 hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-[#1a1a1a]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isEdit ? "Saving..." : "Uploading..."}
            </span>
          ) : isEdit ? "Save Changes" : "Publish Product"}
        </button>
      </div>
    </form>
  );
};

export default ClothingProductForm;
