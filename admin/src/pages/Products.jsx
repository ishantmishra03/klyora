import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from '../config/axios';
import {toast} from 'react-hot-toast';
import { LogOut, PlusCircle, ShoppingBag, Trash2, HomeIcon, BaggageClaim } from "lucide-react";



export default function Products() {
  const { navigate, logout } = useAppContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product');
      if(data.success){
        setProducts(data.products);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteProduct = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="min-h-screen bg-soft-white text-midnight-blue">
      {/* Navbar */}
      <nav className="bg-midnight-blue text-soft-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold tracking-wide font-serif">Klyora</div>
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
        <aside className="w-full md:w-64  border-r border-cool-gray p-4 space-y-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 w-full px-4 py-2 rounded-xl">
            <HomeIcon size={18} />
            Dashboard
          </button>
           <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-lavender-tint"
          >
            <BaggageClaim size={18} />
            Products
          </button>
          <button 
            onClick={() => navigate("/add-product")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl">
            <PlusCircle size={18} />
            Add Product
          </button>
          <button 
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl hover:bg-lavender-tint transition">
            <ShoppingBag size={18} />
            Orders
          </button>
        </aside>

        {/* Product List */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">Manage Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-cool-gray shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className={`text-sm ${product.inStock ? "text-green-500" : "text-red-500"}`}>Stock: {product.inStock ? "In Stock" : "Out of Stock"}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                  <div className="text-lg font-medium">${product.price.toFixed(2)}</div>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
