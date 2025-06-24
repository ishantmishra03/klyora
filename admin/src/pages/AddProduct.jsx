import { useState } from "react";
import {
  LogOut,
  PlusCircle,
  ShoppingBag,
  BaggageClaim,
  X,
  HomeIcon,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import axios from "../config/axios";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const { navigate, logout } = useAppContext();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports & Fitness",
    "Beauty & Care",
    "Books & Media",
    "Accessories",
    "Furniture",
  ];

  const badgeSuggestions = [
    "Best Seller",
    "Trending",
    "Limited Edition",
    "Hot Deal",
    "New Arrival",
    "Exclusive",
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subCategory: "",
    badge: "",
    images: [],
    inStock: true,
    isNew: false,
    onSale: false,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setForm({ ...form, images: files });
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("originalPrice", form.originalPrice);
      formData.append("category", form.category);
      formData.append("subCategory", form.subCategory);
      formData.append("badge", form.badge);
      formData.append("inStock", form.inStock);
      formData.append("isNew", form.isNew);
      formData.append("onSale", form.onSale);

      
      form.images.forEach((image) => {
        formData.append("images", image);
      });

      const { data } = await axios.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        // Optionally reset form here
        setForm({
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "",
          subCategory: "",
          badge: "",
          images: [],
          inStock: true,
          isNew: false,
          onSale: false,
        });
        setImagePreviews([]);
      } else {
        toast.error(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white text-midnight-blue">
      {/* Navbar */}
      <nav className="bg-midnight-blue text-soft-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-wide font-serif">
          Klyora
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-soft-white text-midnight-blue px-4 py-2 rounded-full hover:bg-lavender-tint transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </nav>

      {/* Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-lavender-tint/40 border-r border-cool-gray p-4 space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl"
          >
            <HomeIcon size={18} />
            Dashboard
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl"
          >
            <BaggageClaim size={18} />
            Products
          </button>
          <button
            onClick={() => navigate("/add-product")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-lavender-tint"
          >
            <PlusCircle size={18} />
            Add Product
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-lavender-tint transition"
          >
            <ShoppingBag size={18} />
            Orders
          </button>
        </aside>

        {/* Form */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-serif font-bold mb-6">
            Add New Product
          </h2>
          <form
          encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-cool-gray rounded-lg p-3 w-full"
            />

            {/* Category Dropdown */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="border border-cool-gray rounded-lg p-3 w-full bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="subCategory"
              placeholder="Subcategory"
              value={form.subCategory}
              onChange={handleChange}
              className="border border-cool-gray rounded-lg p-3 w-full"
            />

            {/* Badge with Suggestions */}
            <div className="relative">
              <input
                type="text"
                name="badge"
                list="badge-options"
                placeholder="Badge (e.g. Best Seller)"
                value={form.badge}
                onChange={handleChange}
                className="border border-cool-gray rounded-lg p-3 w-full"
              />
              <datalist id="badge-options">
                {badgeSuggestions.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="border border-cool-gray rounded-lg p-3 w-full"
            />

            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price"
              value={form.originalPrice}
              onChange={handleChange}
              required
              className="border border-cool-gray rounded-lg p-3 w-full"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="md:col-span-2 border border-cool-gray rounded-lg p-3 w-full resize-none"
              rows={4}
            />

            {/* Checkboxes */}
            <div className="flex items-center gap-4 col-span-1 md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={form.inStock}
                  onChange={handleChange}
                />
                In Stock
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={form.isNew}
                  onChange={handleChange}
                />
                New Arrival
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="onSale"
                  checked={form.onSale}
                  onChange={handleChange}
                />
                On Sale
              </label>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Upload up to 4 Images
              </label>
              <input
                type="file"
                accept="image/*"
                name="images"
                multiple
                onChange={handleImageUpload}
                className="border border-cool-gray rounded-lg p-3 w-full"
              />
              <div className="flex gap-4 mt-4 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <X
                      size={16}
                      onClick={() => {
                        const newPreviews = [...imagePreviews];
                        const newImages = [...form.images];
                        newPreviews.splice(i, 1);
                        newImages.splice(i, 1);
                        setImagePreviews(newPreviews);
                        setForm({ ...form, images: newImages });
                      }}
                      className="absolute top-1 right-1 text-red-600 bg-white rounded-full cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="md:col-span-2 bg-midnight-blue text-soft-white py-3 rounded-full hover:bg-royal-indigo transition"
            >
              Add Product
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
